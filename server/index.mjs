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

app.use(express.static(webRoot, { index: ["index.html"] }));

app.listen(PORT, function () {
  console.log("Алматы Су: http://localhost:" + PORT + " (статика + /api/feedback)");
});
