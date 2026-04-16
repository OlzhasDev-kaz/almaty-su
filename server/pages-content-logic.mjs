import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const storagePath = path.join(__dirname, "..", "data", "pages-content.json");

function normDoc(item, index) {
  return {
    id: String(item?.id || `doc-${index + 1}`),
    title: String(item?.title || "").trim(),
    href: String(item?.href || "").trim() || "#",
  };
}

function normNews(item, index) {
  return {
    id: String(item?.id || `news-${index + 1}`),
    title: String(item?.title || "").trim(),
    href: String(item?.href || "").trim() || "#",
    dateIso: String(item?.dateIso || "").trim(),
    dateLabel: String(item?.dateLabel || "").trim(),
    summary: String(item?.summary || "").trim(),
    readMoreLabel: String(item?.readMoreLabel || "На сайте").trim(),
  };
}

function normalize(payload) {
  return {
    newsPage: {
      feed: Array.isArray(payload?.newsPage?.feed) ? payload.newsPage.feed.map(normNews).filter((x) => x.title) : [],
      archiveText: String(payload?.newsPage?.archiveText || "").trim(),
      archiveLinkUrl: String(payload?.newsPage?.archiveLinkUrl || "").trim() || "#",
      archiveLinkLabel: String(payload?.newsPage?.archiveLinkLabel || "").trim(),
    },
    antiCorruptionPage: {
      contactsPhone: String(payload?.antiCorruptionPage?.contactsPhone || "").trim(),
      contactsEmailLinkUrl: String(payload?.antiCorruptionPage?.contactsEmailLinkUrl || "").trim() || "#",
      contactsEmailLinkLabel: String(payload?.antiCorruptionPage?.contactsEmailLinkLabel || "").trim(),
      documents: Array.isArray(payload?.antiCorruptionPage?.documents)
        ? payload.antiCorruptionPage.documents.map(normDoc).filter((x) => x.title)
        : [],
    },
  };
}

export async function getPagesContent() {
  try {
    const text = await fs.readFile(storagePath, "utf8");
    return normalize(JSON.parse(text));
  } catch {
    return normalize({});
  }
}

export async function savePagesContent(payload) {
  const normalized = normalize(payload);
  await fs.writeFile(storagePath, JSON.stringify(normalized, null, 2), "utf8");
  return normalized;
}
