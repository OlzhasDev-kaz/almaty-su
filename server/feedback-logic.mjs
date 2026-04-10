/**
 * Общая логика приёма обращений (используется HTTP-сервером и при необходимости — serverless).
 */

const MAX_MESSAGE = 12000;
const MAX_SUBJECT = 500;
const MAX_NAME = 200;

function trim(s) {
  return String(s == null ? "" : s).trim();
}

/**
 * @param {Record<string, unknown>} raw
 * @returns {{ ok: true, payload: object } | { ok: false, status: number, error: string }}
 */
export function parseFeedbackBody(raw) {
  if (!raw || typeof raw !== "object") {
    return { ok: false, status: 400, error: "Некорректное тело запроса" };
  }

  const hp = trim(raw.website);
  if (hp) {
    return { ok: false, status: 400, error: "Bad request" };
  }

  const form = trim(raw.form);
  if (form !== "question" && form !== "lyuk") {
    return { ok: false, status: 400, error: "Неизвестный тип формы" };
  }

  const name = trim(raw.name).slice(0, MAX_NAME);
  const email = trim(raw.email).slice(0, 254);
  const message = trim(raw.message).slice(0, MAX_MESSAGE);

  if (!name || !email || !message) {
    return { ok: false, status: 400, error: "Заполните обязательные поля" };
  }

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailOk) {
    return { ok: false, status: 400, error: "Укажите корректный e-mail" };
  }

  const base = {
    form,
    name,
    email,
    message,
    submittedAt: new Date().toISOString(),
  };

  if (form === "question") {
    const phone = trim(raw.phone).slice(0, 40);
    return { ok: true, payload: { ...base, phone: phone || undefined } };
  }

  const subject = trim(raw.subject).slice(0, MAX_SUBJECT);
  return { ok: true, payload: { ...base, subject: subject || undefined } };
}

/**
 * @param {object} payload
 * @param {{ webhookUrl?: string, log?: (msg: string) => void }} opts
 */
export async function deliverFeedback(payload, opts) {
  const log = opts.log || console.log;
  const line = JSON.stringify(payload);
  log("[feedback] " + line);

  const url = opts.webhookUrl || process.env.FEEDBACK_WEBHOOK_URL;
  if (!url) return;

  const ctrl = new AbortController();
  const t = setTimeout(function () {
    ctrl.abort();
  }, 12000);

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: line,
      signal: ctrl.signal,
    });
    if (!res.ok) {
      log("[feedback] webhook HTTP " + res.status);
    }
  } catch (e) {
    log("[feedback] webhook error: " + (e && e.message ? e.message : String(e)));
  } finally {
    clearTimeout(t);
  }
}
