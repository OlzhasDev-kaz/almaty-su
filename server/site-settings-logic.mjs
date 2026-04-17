import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const storageDir = path.join(__dirname, "..", "data");
const storagePath = path.join(storageDir, "site-settings.json");

const DEFAULT_SETTINGS = Object.freeze({
  mourningMode: false,
  topBanners: [],
});

function isValidBanner(item) {
  if (!item || typeof item !== "object") return false;
  const hasText = typeof item.title === "string" && item.title.trim().length > 0;
  return hasText;
}

function normalizeBanner(item, index) {
  return {
    id: typeof item.id === "string" && item.id.trim() ? item.id.trim() : `banner-${Date.now()}-${index}`,
    title: String(item.title || "").trim(),
    text: String(item.text || "").trim(),
    linkUrl: String(item.linkUrl || "").trim(),
    linkLabel: String(item.linkLabel || "").trim(),
    imageUrl: String(item.imageUrl || "").trim(),
  };
}

function normalizeSettings(raw) {
  const mourningMode = !!raw?.mourningMode;
  const topBanners = Array.isArray(raw?.topBanners)
    ? raw.topBanners.filter(isValidBanner).slice(0, 20).map(normalizeBanner)
    : [];
  return { mourningMode, topBanners };
}

export async function getSiteSettings() {
  try {
    const text = await fs.readFile(storagePath, "utf8");
    return normalizeSettings(JSON.parse(text));
  } catch (error) {
    return { ...DEFAULT_SETTINGS };
  }
}

export async function saveSiteSettings(input) {
  const normalized = normalizeSettings(input);
  await fs.mkdir(storageDir, { recursive: true });
  await fs.writeFile(storagePath, JSON.stringify(normalized, null, 2), "utf8");
  return normalized;
}

export function verifyAdminToken(token) {
  const expected = process.env.ADMIN_TOKEN || "admin";
  return typeof token === "string" && token.length > 0 && token === expected;
}
