/**
 * Статика из web/ + POST /api/feedback
 * Запуск: npm run server  →  http://localhost:3330
 *
 * Опционально: FEEDBACK_WEBHOOK_URL — URL для пересылки JSON (Slack incoming, n8n, свой сервис).
 */

import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { parseFeedbackBody, deliverFeedback } from "./feedback-logic.mjs";
import { getSiteSettings, saveSiteSettings, verifyAdminToken } from "./site-settings-logic.mjs";
import { getHomeContent, saveHomeContent } from "./content-logic.mjs";
import { getPagesContent, savePagesContent } from "./pages-content-logic.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const webRoot = path.join(__dirname, "..", "web");
const PORT = Number(process.env.PORT) || 3330;

const app = express();
app.disable("x-powered-by");
app.use(express.json({ limit: "128kb" }));

app.post("/api/feedback", async function (req, res) {
  const parsed = parseFeedbackBody(req.body);
  if (!parsed.ok) {
    return res.status(parsed.status).json({ ok: false, error: parsed.error });
  }
  try {
    await deliverFeedback(parsed.payload, {
      webhookUrl: process.env.FEEDBACK_WEBHOOK_URL,
    });
    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ ok: false, error: "Не удалось обработать обращение" });
  }
});

app.get("/api/site-settings", async function (_req, res) {
  try {
    const settings = await getSiteSettings();
    return res.status(200).json({ ok: true, settings });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ ok: false, error: "Не удалось загрузить настройки сайта" });
  }
});

app.get("/api/admin/site-settings", async function (req, res) {
  if (!verifyAdminToken(req.get("x-admin-token"))) {
    return res.status(401).json({ ok: false, error: "Недостаточно прав" });
  }
  try {
    const settings = await getSiteSettings();
    return res.status(200).json({ ok: true, settings });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ ok: false, error: "Не удалось загрузить настройки сайта" });
  }
});

app.put("/api/admin/site-settings", async function (req, res) {
  if (!verifyAdminToken(req.get("x-admin-token"))) {
    return res.status(401).json({ ok: false, error: "Недостаточно прав" });
  }
  try {
    const saved = await saveSiteSettings(req.body || {});
    return res.status(200).json({ ok: true, settings: saved });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ ok: false, error: "Некорректные данные настроек" });
  }
});

app.get("/api/content/home", async function (_req, res) {
  try {
    const content = await getHomeContent();
    return res.status(200).json({ ok: true, content });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ ok: false, error: "Не удалось загрузить контент главной" });
  }
});

app.get("/api/admin/content/home", async function (req, res) {
  if (!verifyAdminToken(req.get("x-admin-token"))) {
    return res.status(401).json({ ok: false, error: "Недостаточно прав" });
  }
  try {
    const content = await getHomeContent();
    return res.status(200).json({ ok: true, content });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ ok: false, error: "Не удалось загрузить контент главной" });
  }
});

app.put("/api/admin/content/home", async function (req, res) {
  if (!verifyAdminToken(req.get("x-admin-token"))) {
    return res.status(401).json({ ok: false, error: "Недостаточно прав" });
  }
  try {
    const content = await saveHomeContent(req.body || {});
    return res.status(200).json({ ok: true, content });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ ok: false, error: "Некорректные данные контента главной" });
  }
});

app.get("/api/content/pages", async function (_req, res) {
  try {
    const content = await getPagesContent();
    return res.status(200).json({ ok: true, content });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ ok: false, error: "Не удалось загрузить контент страниц" });
  }
});

app.get("/api/admin/content/pages", async function (req, res) {
  if (!verifyAdminToken(req.get("x-admin-token"))) {
    return res.status(401).json({ ok: false, error: "Недостаточно прав" });
  }
  try {
    const content = await getPagesContent();
    return res.status(200).json({ ok: true, content });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ ok: false, error: "Не удалось загрузить контент страниц" });
  }
});

app.put("/api/admin/content/pages", async function (req, res) {
  if (!verifyAdminToken(req.get("x-admin-token"))) {
    return res.status(401).json({ ok: false, error: "Недостаточно прав" });
  }
  try {
    const content = await savePagesContent(req.body || {});
    return res.status(200).json({ ok: true, content });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ ok: false, error: "Некорректные данные контента страниц" });
  }
});

app.use(express.static(webRoot, { index: ["index.html"] }));

app.listen(PORT, function () {
  console.log("Алматы Су: http://localhost:" + PORT + " (статика + API)");
});
