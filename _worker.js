// Cloudflare Pages "advanced mode" worker. Runs in front of every request.
//  - POST /api/form  -> validates form submissions and forwards them to Google Apps Script
//  - /reader         -> password gate for the reader resources page
//  - everything else -> static files
//
// Environment variables (Cloudflare dashboard > Pages project > Settings > Variables and Secrets):
//  READER_PASSWORD  the shared reader password (also emailed to people who request it)
//  APPS_SCRIPT_URL  the Google Apps Script web app URL (see apps-script.gs)
//  FORM_SECRET      optional shared secret, must match FORM_SECRET in the Apps Script

const COOKIE = 'pm_reader';
const HIDDEN = new Set(['/apps-script.gs', '/README.md']);
const TYPES = new Set(['contact', 'access', 'newsletter']);
const LIMITS = { name: 120, email: 200, organization: 200, topic: 40, source: 60, message: 5000, page: 200 };

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    if (path === '/api/form') {
      if (request.method !== 'POST') return json({ ok: false, error: 'method' }, 405);
      return handleForm(request, env);
    }
    if (path === '/reader' || path.startsWith('/reader.') || path.startsWith('/reader/')) {
      return handleReader(request, env, url);
    }
    if (HIDDEN.has(path)) return new Response('Not found', { status: 404 });
    return env.ASSETS.fetch(request);
  },
};

function json(obj, status = 200, headers = {}) {
  return new Response(JSON.stringify(obj), { status, headers: { 'Content-Type': 'application/json', ...headers } });
}

async function sha256(text) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

const normalize = (pw) => String(pw || '').trim().toLowerCase();

/* ---------------- Forms ---------------- */
async function handleForm(request, env) {
  let data;
  try { data = await request.json(); } catch (e) { return json({ ok: false, error: 'bad_request' }, 400); }
  if (!data || typeof data !== 'object') return json({ ok: false, error: 'bad_request' }, 400);

  // Honeypot: bots fill the hidden "website" field. Pretend success.
  if (data.website) return json({ ok: true });

  const type = String(data.type || '');
  if (!TYPES.has(type)) return json({ ok: false, error: 'bad_type' }, 400);

  const clean = { type };
  for (const [k, max] of Object.entries(LIMITS)) {
    if (data[k] != null) clean[k] = String(data[k]).trim().slice(0, max);
  }
  clean.newsletter = data.newsletter === 'yes' ? 'yes' : 'no';
  if (type === 'newsletter' && clean.newsletter !== 'yes') {
    return json({ ok: false, message: 'Please tick the box to confirm you want to receive emails.' }, 400);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(clean.email || '')) {
    return json({ ok: false, message: 'Please enter a valid email address.' }, 400);
  }
  if (type === 'contact' && (!clean.name || !clean.message)) {
    return json({ ok: false, message: 'Please include your name and a message.' }, 400);
  }
  if (type === 'access' && !clean.name) {
    return json({ ok: false, message: 'Please include your first name.' }, 400);
  }

  if (!env.APPS_SCRIPT_URL) return json({ ok: false, error: 'not_configured' }, 503);
  if (type === 'access' && !env.READER_PASSWORD) return json({ ok: false, error: 'not_configured' }, 503);

  const payload = {
    ...clean,
    secret: env.FORM_SECRET || '',
    submittedAt: new Date().toISOString(),
    country: (request.cf && request.cf.country) || '',
    userAgent: (request.headers.get('User-Agent') || '').slice(0, 300),
  };
  if (type === 'access') payload.readerPassword = env.READER_PASSWORD;

  try {
    const res = await fetch(env.APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      redirect: 'follow',
    });
    const out = await res.json().catch(() => null);
    if (out && out.ok) return json({ ok: true });
    return json({ ok: false, message: (out && out.message) || '' }, 502);
  } catch (e) {
    return json({ ok: false }, 502);
  }
}

/* ---------------- Reader gate ---------------- */
async function handleReader(request, env, url) {
  const password = env.READER_PASSWORD;
  if (!password) return gatePage({ soon: true });

  const token = await sha256('pm-reader:' + normalize(password));
  const cookies = Object.fromEntries((request.headers.get('Cookie') || '').split(';').map((c) => {
    const i = c.indexOf('=');
    return [c.slice(0, i).trim(), c.slice(i + 1).trim()];
  }));

  if (request.method === 'POST') {
    const form = await request.formData().catch(() => null);
    const given = form ? form.get('password') : '';
    if (normalize(given) && normalize(given) === normalize(password)) {
      return new Response(null, {
        status: 303,
        headers: {
          Location: '/reader',
          'Set-Cookie': `${COOKIE}=${token}; Path=/; Max-Age=31536000; HttpOnly; Secure; SameSite=Lax`,
        },
      });
    }
    await new Promise((r) => setTimeout(r, 600)); // slow down guessing
    return gatePage({ error: true });
  }

  if (cookies[COOKIE] === token) {
    const res = await env.ASSETS.fetch(new Request(new URL('/reader', url), request));
    const out = new Response(res.body, res);
    out.headers.set('Cache-Control', 'private, no-store');
    out.headers.set('X-Robots-Tag', 'noindex, nofollow');
    return out;
  }
  return gatePage({});
}

function gatePage({ error = false, soon = false }) {
  const body = soon
    ? `<p class="lead">Reader resources are coming soon. Check back shortly.</p>`
    : `<p class="lead">Enter the reader password to view the resources that accompany the book.</p>
      <form class="form form-card" method="post" action="/reader" style="margin-top:28px">
        <div>
          <label for="pw">Reader password</label>
          <input type="password" id="pw" name="password" required autocomplete="current-password" autofocus>
        </div>
        ${error ? '<div class="status show err" role="alert">That password didn\'t work. Check for typos and try again.</div>' : ''}
        <div><button class="btn" type="submit">Unlock</button></div>
      </form>
      <p class="note-small">Don't have it? <a href="/access">Get the password by email</a>. It's free for readers.</p>`;
  const html = `<!doctype html>
<html lang="en-CA">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Reader Resources — Premed Mentor</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/style.css">
</head>
<body>
<div id="site-header"></div>
<main>
  <div class="page-head" style="padding-bottom:72px">
    <div class="wrap narrow">
      <div class="eyebrow">For Readers</div>
      <h1>Reader resources</h1>
      ${body}
    </div>
  </div>
</main>
<div id="site-footer"></div>
<script src="/site.js"></script>
</body>
</html>`;
  return new Response(html, {
    status: error ? 401 : 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' },
  });
}
