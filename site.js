/* Premed Mentor — shared header, footer, cookie banner, analytics and forms.
   Edit SITE below to update links across every page. Empty strings show as "coming soon". */
const SITE = {
  // Google Analytics 4 measurement ID, e.g. 'G-ABC123XYZ'. Leave empty to disable GA.
  gaId: '',
  social: {
    instagram: '',
    x: '',
    tiktok: '',
    facebook: '',
    linkedin: '',
  },
  authors: {
    colin: {
      website: 'https://www.colinwhaley.com/',
      scholar: 'https://scholar.google.ca/citations?hl=en&user=ISBLxi0AAAAJ&view_op=list_works',
    },
    liam: {
      linkedin: 'https://www.linkedin.com/in/liamtaylorralph/',
      scholar: 'https://scholar.google.com/citations?user=iAjdF7oAAAAJ&hl=en',
    },
  },
};

const ICONS = {"scholar":"<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z\"/></svg>","instagram":"<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077\"/></svg>","x":"<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z\"/></svg>","tiktok":"<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z\"/></svg>","facebook":"<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z\"/></svg>","linkedin":"<svg viewBox=\"0 0 16 16\" aria-hidden=\"true\"><path d=\"M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z\"/></svg>","globe":"<svg viewBox=\"0 0 16 16\" aria-hidden=\"true\"><path d=\"M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m7.5-6.923c-.67.204-1.335.82-1.887 1.855q-.215.403-.395.872c.705.157 1.472.257 2.282.287zM4.249 3.539q.214-.577.481-1.078a7 7 0 0 1 .597-.933A7 7 0 0 0 3.051 3.05q.544.277 1.198.49zM3.509 7.5c.036-1.07.188-2.087.436-3.008a9 9 0 0 1-1.565-.667A6.96 6.96 0 0 0 1.018 7.5zm1.4-2.741a12.3 12.3 0 0 0-.4 2.741H7.5V5.091c-.91-.03-1.783-.145-2.591-.332M8.5 5.09V7.5h2.99a12.3 12.3 0 0 0-.399-2.741c-.808.187-1.681.301-2.591.332zM4.51 8.5c.035.987.176 1.914.399 2.741A13.6 13.6 0 0 1 7.5 10.91V8.5zm3.99 0v2.409c.91.03 1.783.145 2.591.332.223-.827.364-1.754.4-2.741zm-3.282 3.696q.18.469.395.872c.552 1.035 1.218 1.65 1.887 1.855V11.91c-.81.03-1.577.13-2.282.287zm.11 2.276a7 7 0 0 1-.598-.933 9 9 0 0 1-.481-1.079 8.4 8.4 0 0 0-1.198.49 7 7 0 0 0 2.276 1.522zm-1.383-2.964A13.4 13.4 0 0 1 3.508 8.5h-2.49a6.96 6.96 0 0 0 1.362 3.675c.47-.258.995-.482 1.565-.667m6.728 2.964a7 7 0 0 0 2.275-1.521 8.4 8.4 0 0 0-1.197-.49 9 9 0 0 1-.481 1.078 7 7 0 0 1-.597.933M8.5 11.909v3.014c.67-.204 1.335-.82 1.887-1.855q.216-.403.395-.872A12.6 12.6 0 0 0 8.5 11.91zm3.555-.401c.57.185 1.095.409 1.565.667A6.96 6.96 0 0 0 14.982 8.5h-2.49a13.4 13.4 0 0 1-.437 3.008M14.982 7.5a6.96 6.96 0 0 0-1.362-3.675c-.47.258-.995.482-1.565.667.248.92.4 1.938.437 3.008zM11.27 2.461q.266.502.482 1.078a8.4 8.4 0 0 0 1.196-.49 7 7 0 0 0-2.275-1.52c.218.283.418.597.597.932m-.488 1.343a8 8 0 0 0-.395-.872C9.835 1.897 9.17 1.282 8.5 1.077V4.09c.81-.03 1.577-.13 2.282-.287z\"/></svg>"};

const NAV = [
  ['/', 'The Book'],
  ['/resources', 'Free Resources'],
  ['/extras', 'Web Extras'],
  ['/about', 'Authors'],
  ['/contact', 'Contact'],
];

function store() {
  try { return window.localStorage; } catch (e) { return null; }
}
function getPref(k) { try { return store() ? store().getItem(k) : null; } catch (e) { return null; } }
function setPref(k, v) { try { if (store()) store().setItem(k, v); } catch (e) {} }

function iconLink(name, url, label) {
  const href = url || '#';
  const extra = url ? 'target="_blank" rel="noopener"' : 'data-soon title="Coming soon"';
  return `<a href="${href}" ${extra} aria-label="${label}${url ? '' : ' (coming soon)'}">${ICONS[name] || ''}</a>`;
}

function renderHeader() {
  const el = document.getElementById('site-header');
  if (!el) return;
  const path = location.pathname.replace(/\.html$/, '').replace(/\/$/, '') || '/';
  const links = NAV.map(([href, label]) => {
    const here = (href === '/' ? path === '/' || path === '/index' : path.startsWith(href));
    return `<a href="${href}"${here ? ' aria-current="page"' : ''}>${label}</a>`;
  }).join('');
  el.outerHTML = `
<header class="nav">
  <div class="wrap">
    <a class="brand" href="/">Premed<span>Mentor</span></a>
    <button class="menu-btn" aria-expanded="false" aria-controls="nav-links">Menu</button>
    <nav class="links" id="nav-links">${links}<a href="/#newsletter">Get Updates</a><a class="btn small nav-callout" href="https://mdnavigator.ca/" target="_blank" rel="noopener">MD Navigator <span aria-hidden="true">&#8599;</span><span class="sr-only"> (opens in a new tab)</span></a></nav>
  </div>
</header>`;
  const btn = document.querySelector('.menu-btn');
  const nav = document.getElementById('nav-links');
  btn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
  });
}

function renderFooter() {
  const el = document.getElementById('site-footer');
  if (!el) return;
  const s = SITE.social;
  el.outerHTML = `
<footer class="site">
  <div class="wrap">
    <div class="cols">
      <div>
        <a class="brand" href="/">Premed<span>Mentor</span></a>
        <p style="margin:10px 0 0;max-width:30em">A 100% Canadian guide, built for Canadian premeds, by Colin Whaley and Liam Taylor Ralph. Coming spring 2027 from <a href="https://brusheducation.ca/" target="_blank" rel="noopener" style="text-decoration:underline">Brush Education</a>.</p>
        <div class="social">
          ${iconLink('instagram', s.instagram, 'Instagram')}
          ${iconLink('x', s.x, 'X (Twitter)')}
          ${iconLink('tiktok', s.tiktok, 'TikTok')}
          ${iconLink('facebook', s.facebook, 'Facebook')}
          ${iconLink('linkedin', s.linkedin, 'LinkedIn')}
        </div>
      </div>
      <div>
        <h4>Explore</h4>
        <ul>
          <li><a href="/#buy">Where to Buy</a></li>
          <li><a href="/resources">Free Resources</a></li>
          <li><a href="/extras">Web Extras</a></li>
          <li><a href="/about">About the Authors</a></li>
          <li><a href="/contact">Contact &amp; Speaking</a></li>
        </ul>
      </div>
      <div>
        <h4>Legal</h4>
        <ul>
          <li><a href="/disclosures">Disclaimer &amp; Affiliate Disclosure</a></li>
          <li><a href="/privacy">Privacy Policy</a></li>
          <li><button class="linkish" data-cookie-settings>Cookie settings</button></li>
        </ul>
      </div>
    </div>
    <div class="legal">
      <div>&copy; ${new Date().getFullYear()} Premed Mentor &middot; premedmentor.ca</div>
      <div>Some links on this site are affiliate links. <a href="/disclosures#affiliate">Learn more</a>.</div>
    </div>
  </div>
</footer>`;
}

/* ---------- Cookie banner + Google Analytics (loaded only after consent) ---------- */
function loadGA() {
  if (!SITE.gaId || window.__gaLoaded) return;
  window.__gaLoaded = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag('consent', 'default', { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'granted' });
  window.gtag('js', new Date());
  window.gtag('config', SITE.gaId);
  const sc = document.createElement('script');
  sc.async = true;
  sc.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(SITE.gaId);
  document.head.appendChild(sc);
}

function cookieBanner() {
  const div = document.createElement('div');
  div.className = 'cookie';
  div.setAttribute('role', 'dialog');
  div.setAttribute('aria-label', 'Privacy choices');
  div.innerHTML = `<p>We use optional analytics cookies to understand how visitors use this site. No ads, no selling your data. See our <a href="/privacy">Privacy Policy</a>.</p>
    <div class="actions"><button class="btn small ghost" data-c="no">Decline</button><button class="btn small" data-c="yes">Accept</button></div>`;
  document.body.appendChild(div);
  const choice = getPref('pm_consent');
  if (!choice) div.classList.add('show');
  if (choice === 'yes') loadGA();
  div.addEventListener('click', (e) => {
    const c = e.target.getAttribute && e.target.getAttribute('data-c');
    if (!c) return;
    setPref('pm_consent', c);
    div.classList.remove('show');
    if (c === 'yes') loadGA();
    if (c === 'no' && window.__gaLoaded) location.reload();
  });
  document.addEventListener('click', (e) => {
    if (e.target.closest && e.target.closest('[data-cookie-settings]')) div.classList.add('show');
    const soon = e.target.closest && e.target.closest('[data-soon]');
    if (soon) e.preventDefault();
  });
}

/* ---------- Forms: posts to /api/form (see _worker.js) ---------- */
function initForms() {
  document.querySelectorAll('form[data-form]').forEach((form) => {
    const status = form.querySelector('.status');
    const btn = form.querySelector('button[type=submit]');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = { type: form.dataset.form, page: location.pathname };
      new FormData(form).forEach((v, k) => { data[k] = typeof v === 'string' ? v.trim() : v; });
      form.querySelectorAll('input[type=checkbox]').forEach((c) => { data[c.name] = c.checked ? 'yes' : 'no'; });
      btn.disabled = true;
      const show = (cls, msg) => { status.className = 'status show ' + cls; status.textContent = msg; };
      try {
        const res = await fetch('/api/form', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
        const out = await res.json().catch(() => ({}));
        if (res.ok && out.ok) {
          show('ok', form.dataset.success || 'Thanks! We received your submission.');
          form.reset();
        } else if (out.error === 'not_configured') {
          show('err', `This form is almost ready. Please check back again soon.`);
        } else {
          show('err', out.message || `Something went wrong. Please try again in a few minutes.`);
        }
      } catch (err) {
        show('err', `We couldn't send that. Please check your connection and try again.`);
      } finally {
        btn.disabled = false;
      }
    });
  });
  // Pre-select the contact topic from ?topic=...
  const topic = new URLSearchParams(location.search).get('topic');
  const sel = document.querySelector('select[name=topic]');
  if (topic && sel && [...sel.options].some((o) => o.value === topic)) sel.value = topic;
  // Show the "Discuss my situation" caveat only for that topic.
  const note = document.getElementById('situation-note');
  if (sel && note) {
    const sync = () => { note.hidden = sel.value !== 'situation'; };
    sel.addEventListener('change', sync);
    sync();
  }
}

/* ---------- Author links ---------- */
function initAuthorLinks() {
  document.querySelectorAll('[data-author-link]').forEach((a) => {
    const [who, kind] = a.dataset.authorLink.split('.');
    const url = (SITE.authors[who] || {})[kind];
    a.insertAdjacentHTML('afterbegin', ICONS[{ website: 'globe', scholar: 'scholar' }[kind] || 'linkedin'] || '');
    if (url) { a.href = url; a.target = '_blank'; a.rel = 'noopener'; }
    else { a.href = '#'; a.setAttribute('data-soon', ''); a.title = 'Coming soon'; a.append(' (coming soon)'); }
  });
}

renderHeader();
renderFooter();
cookieBanner();
initForms();
initAuthorLinks();
