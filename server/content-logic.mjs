import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const homeContentPath = path.join(__dirname, "..", "data", "home-content.json");

function sanitizeItem(item, withDate) {
  return {
    id: String(item?.id || ""),
    title: String(item?.title || "").trim(),
    href: String(item?.href || "").trim() || "#",
    summary: String(item?.summary || "").trim(),
    active: item?.active !== false,
    ...(withDate
      ? {
          dateIso: String(item?.dateIso || "").trim(),
          dateLabel: String(item?.dateLabel || "").trim(),
        }
      : {}),
  };
}

function sanitizeHeroSlide(item, index) {
  return {
    id: String(item?.id || `hero-${index + 1}`),
    title: String(item?.title || "").trim(),
    subtitle: String(item?.subtitle || "").trim(),
    href: String(item?.href || "").trim() || "#",
    videoSrc: String(item?.videoSrc || "").trim(),
    videoLabel: String(item?.videoLabel || "").trim(),
    active: item?.active !== false,
  };
}

function sanitizeServiceItem(item, index) {
  return {
    id: String(item?.id || `service-${index + 1}`),
    label: String(item?.label || "").trim(),
    href: String(item?.href || "").trim() || "#",
    imageSrc: String(item?.imageSrc || "").trim(),
    imageAlt: String(item?.imageAlt || "").trim(),
    active: item?.active !== false,
  };
}

function sanitizeGovBanner(item) {
  return {
    title: String(item?.title || "").trim(),
    text: String(item?.text || "").trim(),
    linkUrl: String(item?.linkUrl || "").trim(),
    linkLabel: String(item?.linkLabel || "").trim(),
    mediaLabel: String(item?.mediaLabel || "").trim(),
    mainImageSrc: String(item?.mainImageSrc || "").trim(),
    mainImageAlt: String(item?.mainImageAlt || "").trim(),
    qrImageSrc: String(item?.qrImageSrc || "").trim(),
    qrImageAlt: String(item?.qrImageAlt || "").trim(),
  };
}

function sanitizeHomeContent(raw) {
  const heroSlides = Array.isArray(raw?.heroSlides)
    ? raw.heroSlides
        .map((item, index) => sanitizeHeroSlide(item, index))
        .filter((item) => item.title && item.videoSrc && item.active !== false)
    : [];
  const govBanner = sanitizeGovBanner(raw?.govBanner || {});
  const services = Array.isArray(raw?.services)
    ? raw.services
        .map((item, index) => sanitizeServiceItem(item, index))
        .filter((item) => item.label && item.imageSrc && item.active !== false)
    : [];
  const news = Array.isArray(raw?.news) ? raw.news.map((item) => sanitizeItem(item, true)).filter((item) => item.title && item.active !== false) : [];
  const announcements = Array.isArray(raw?.announcements)
    ? raw.announcements.map((item) => sanitizeItem(item, false)).filter((item) => item.title && item.active !== false)
    : [];
  return { heroSlides, govBanner, services, news, announcements };
}

export async function getHomeContent() {
  try {
    const json = await fs.readFile(homeContentPath, "utf8");
    return sanitizeHomeContent(JSON.parse(json));
  } catch {
    return { heroSlides: [], govBanner: sanitizeGovBanner({}), services: [], news: [], announcements: [] };
  }
}

export async function saveHomeContent(input) {
  const normalized = sanitizeHomeContent(input);
  await fs.writeFile(homeContentPath, JSON.stringify(normalized, null, 2), "utf8");
  return normalized;
}
