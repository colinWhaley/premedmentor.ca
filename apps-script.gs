/**
 * Premed Mentor form backend (Google Apps Script).
 *
 * Setup (signed in as premedmentorbook@gmail.com):
 *  1. Create a Google Sheet named "Premed Mentor — Submissions".
 *  2. Extensions > Apps Script. Replace Code.gs with this file and save.
 *  3. Project Settings > Script Properties, add:
 *       FORM_SECRET            (optional) same value as FORM_SECRET in Cloudflare
 *       NOTIFY_EMAIL           (optional) where contact messages go; defaults to the script owner
 *       EMAILOCTOPUS_API_KEY   (optional) EmailOctopus API key
 *       EMAILOCTOPUS_LIST_ID   (optional) EmailOctopus list ID
 *  4. Deploy > New deployment > Web app. Execute as: Me. Who has access: Anyone.
 *  5. Copy the web app URL into Cloudflare as APPS_SCRIPT_URL, then redeploy the site.
 *
 * The site never calls this directly: Cloudflare (_worker.js) validates submissions and forwards them here.
 * Consumer Gmail accounts can send about 100 emails a day from Apps Script.
 */

const SHEETS = {
  contact: ['Submitted', 'Name', 'Email', 'Topic', 'Organization', 'Message', 'Newsletter opt-in', 'Country', 'Page'],
  access: ['Submitted', 'Name', 'Email', 'Got book from', 'Newsletter opt-in', 'Country'],
  newsletter: ['Submitted', 'Email', 'Name', 'Source form', 'Consent statement', 'EmailOctopus result', 'Country'],
};

const CONSENT_TEXT = 'Opted in to receive emails from Premed Mentor via an unticked checkbox on premedmentor.ca; can unsubscribe at any time.';

const TOPICS = {
  speaking: 'Speaking or event request',
  general: 'General inquiry',
  situation: 'Discuss my situation',
  suggest: 'Suggest a resource or product',
  media: 'Media or press',
  bulk: 'Bulk or group book orders',
  privacy: 'Privacy or data request',
  other: 'Something else',
};

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const props = PropertiesService.getScriptProperties();
    const secret = props.getProperty('FORM_SECRET');
    if (secret && data.secret !== secret) return reply({ ok: false, message: 'unauthorized' });

    const when = data.submittedAt ? new Date(data.submittedAt) : new Date();

    if (data.type === 'contact') {
      append('contact', [when, data.name, data.email, TOPICS[data.topic] || data.topic, data.organization, data.message, data.newsletter, data.country, data.page]);
      notifyContact(data, props);
    } else if (data.type === 'access') {
      append('access', [when, data.name, data.email, data.source, data.newsletter, data.country]);
      sendPassword(data);
    } else if (data.type !== 'newsletter') {
      return reply({ ok: false, message: 'unknown type' });
    }

    if (data.newsletter === 'yes') {
      const result = addToEmailOctopus(data, props);
      append('newsletter', [when, data.email, data.name || '', data.type, CONSENT_TEXT, result, data.country]);
    }
    return reply({ ok: true });
  } catch (err) {
    console.error(err);
    return reply({ ok: false, message: '' });
  }
}

function reply(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function append(kind, row) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const name = { contact: 'Contact', access: 'Password requests', newsletter: 'Newsletter' }[kind];
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.appendRow(SHEETS[kind]);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, SHEETS[kind].length).setFontWeight('bold');
  }
  // Prefix values that look like formulas so the sheet never executes submitted text.
  sheet.appendRow(row.map((v) => (typeof v === 'string' && /^[=+\-@]/.test(v) ? "'" + v : v == null ? '' : v)));
}

function esc(s) {
  return String(s || '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function notifyContact(d, props) {
  const to = props.getProperty('NOTIFY_EMAIL') || Session.getEffectiveUser().getEmail();
  const topic = TOPICS[d.topic] || d.topic || 'Message';
  MailApp.sendEmail({
    to: to,
    replyTo: d.email,
    subject: `[Premed Mentor] ${topic}: ${d.name}`,
    body: `${topic}\n\nFrom: ${d.name} <${d.email}>\nOrganization: ${d.organization || '-'}\nNewsletter opt-in: ${d.newsletter}\n\n${d.message}\n\n(Reply to this email to respond directly.)`,
  });
}

function sendPassword(d) {
  const pw = esc(d.readerPassword);
  MailApp.sendEmail({
    to: d.email,
    name: 'Premed Mentor',
    subject: 'Your Premed Mentor Web Extras password',
    body: `Hi ${d.name},\n\nThanks for reading Premed Mentor! Here's the password for the Web Extras:\n\n${d.readerPassword}\n\nUse it at https://premedmentor.ca/extras. Save this email so you can find it again.\n\nPlease don't share the password publicly.\n\nColin & Liam\nPremed Mentor\n\nYou're receiving this one-time email because you requested the Web Extras password at premedmentor.ca.`,
    htmlBody: `<p>Hi ${esc(d.name)},</p><p>Thanks for reading <em>Premed Mentor</em>! Here's the password for the Web Extras:</p>
      <p style="font-size:20px;font-weight:bold;letter-spacing:1px;background:#fbf8f3;border:1px solid #e6dfd3;padding:12px 16px;display:inline-block">${pw}</p>
      <p><a href="https://premedmentor.ca/extras">Open the Web Extras</a>. Save this email so you can find the password again.</p>
      <p>Please don't share the password publicly.</p><p>Colin &amp; Liam<br>Premed Mentor</p>
      <p style="color:#777;font-size:12px">You're receiving this one-time email because you requested the Web Extras password at premedmentor.ca.</p>`,
  });
}

function addToEmailOctopus(d, props) {
  const key = props.getProperty('EMAILOCTOPUS_API_KEY');
  const list = props.getProperty('EMAILOCTOPUS_LIST_ID');
  if (!key || !list) return 'not configured';
  const fields = {};
  if (d.name) fields.FirstName = d.name;
  const res = UrlFetchApp.fetch(`https://api.emailoctopus.com/lists/${encodeURIComponent(list)}/contacts`, {
    method: 'post',
    contentType: 'application/json',
    headers: { Authorization: 'Bearer ' + key },
    payload: JSON.stringify({ email_address: d.email, fields: fields, tags: [d.type], status: 'pending' }),
    muteHttpExceptions: true,
  });
  const code = res.getResponseCode();
  if (code >= 200 && code < 300) return 'added (pending confirmation)';
  if (code === 409) return 'already on list';
  return 'error ' + code + ': ' + res.getContentText().slice(0, 200);
}
