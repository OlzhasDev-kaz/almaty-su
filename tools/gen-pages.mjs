/**
 * Генерация HTML-страниц из web/js/nav-data.js (единый источник меню).
 *
 * По умолчанию не запускается — иначе перезапишет готовые страницы.
 * Только для восстановления заглушек: ALMATY_SU_SCAFFOLD=1 node tools/gen-pages.mjs
 */
import fs from "fs";
import path from "path";
import vm from "vm";
import pageContent from "./pages-content.mjs";
import { webRoot } from "./paths.mjs";

const root = webRoot;
const navPath = path.join(root, "js", "nav-data.js");

if (process.env.ALMATY_SU_SCAFFOLD !== "1") {
  console.log("gen-pages: пропуск (не задана среда ALMATY_SU_SCAFFOLD=1). См. README.md.");
  process.exit(0);
}

function loadNav() {
  const code = fs.readFileSync(navPath, "utf8");
  const ctx = { window: {} };
  vm.createContext(ctx);
  vm.runInContext(code, ctx);
  return ctx.window;
}

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function breadcrumbsHtml(trail, activeId) {
  const home = { id: "home", label: "Главная", href: "index.html" };
  const chain = trail.length && trail[0].id !== "home" ? [home, ...trail] : trail;
  const items = chain.length
    ? chain.map((t) => {
        const isLast = t.id === activeId;
        if (isLast) {
          return `<li><span aria-current="page">${esc(t.label)}</span></li>`;
        }
        return `<li><a href="${t.href}">${esc(t.label)}</a></li>`;
      })
    : [
        `<li><a href="index.html">Главная</a></li>`,
        `<li><span aria-current="page">Раздел</span></li>`,
      ];
  return `<nav class="breadcrumbs" aria-label="Навигационная цепочка"><ol>${items.join(
    ""
  )}</ol></nav>`;
}

const DEFAULT_LEAD =
  "Официальная информация ГКП «Алматы Су» для потребителей и партнёров.";

function pageIntroHtml(title, lead) {
  return `<header class="page-intro"><h1>${esc(title)}</h1><p class="lead">${esc(
    lead || DEFAULT_LEAD
  )}</p></header>`;
}

function leadForPage(p) {
  const c = pageContent[p.id];
  if (c?.type === "landing" && c.lead) return c.lead;
  if (c?.intro) return c.intro;
  return DEFAULT_LEAD;
}

function formatArticleBody(c) {
  if (!c || c.type === "landing") return "";
  let h = `<div class="prose prose--article">`;
  for (const s of c.sections || []) {
    h += `<h2>${esc(s.h2)}</h2>`;
    for (const para of s.p || []) h += `<p>${esc(para)}</p>`;
    if (s.ul) {
      h += "<ul>";
      for (const li of s.ul) h += `<li>${esc(li)}</li>`;
      h += "</ul>";
    }
  }
  h += "</div>";
  return h;
}

function sectionCards(children) {
  return children
    .map(
      (c) => `<a class="section-card-link" href="${c.href}">${esc(c.label)}<span>Перейти к разделу</span></a>`
    )
    .join("\n");
}

function proseStub(title, extra) {
  return (
    `<div class="prose">` +
    `<p>На этой странице размещается материал раздела «<strong>${esc(title)}</strong>» в соответствии с официальной структурой сайта ГКП «Алматы Су». ` +
    `Текст и документы при интеграции с CMS подставляются без изменения смысла и юридической силы.</p>` +
    (extra || "") +
    `<h2>Что можно сделать дальше</h2>` +
    `<ul>` +
    `<li>уточнить детали в call-центре: <strong>+7 727 3 777 444</strong>;</li>` +
    `<li>при аварийной ситуации звонить: <strong>+7 727 274-66-66</strong>;</li>` +
    `<li>задать вопрос онлайн: <a href="zadat-vopros.html">форма обратной связи</a>.</li>` +
    `</ul></div>`
  );
}

const scripts = `
    <script src="js/nav-data.js"></script>
    <script src="js/chrome.js"></script>
    <script src="js/a11y-mode.js"></script>
    <script src="js/main.js"></script>
`;

function pageShell({ title, description, activeId, inner }) {
  return `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="description" content="${esc(description)}" />
  <title>${esc(title)} — ГКП «Алматы Су»</title>
  <link rel="stylesheet" href="css/home.css" />
  <link rel="stylesheet" href="css/pages.css" />
  <link rel="stylesheet" href="css/a11y-vis.css" />
  <link rel="icon" href="assets/favicon.svg" type="image/svg+xml" />
</head>
<body data-active-nav="${esc(activeId)}">
  <main id="main" class="page-main">
    <div class="layout-container">
${inner}
    </div>
  </main>
${scripts}
</body>
</html>
`;
}

const w = loadNav();
const nav = w.ALMATY_SU.nav;

const seen = new Set();

function walk(items, acc) {
  for (const item of items) {
    const hasChildren = !!(item.children && item.children.length);
    if (item.href && item.href !== "index.html") {
      acc.push({
        id: item.id,
        label: item.label,
        href: item.href,
        children: hasChildren ? item.children : null,
      });
    }
    if (hasChildren) walk(item.children, acc);
  }
}

const flat = [];
walk(nav, flat);

const handBuilt = new Set([
  "tarify.html",
  "o-shetchikah.html",
  "qr-pu.html",
  "pokazaniya-schetchika.html",
  "centry-obsluzhivaniya.html",
  "centry-kontakty.html",
  "dogovor-kak.html",
  "dogovor.html",
  "litczevye-scheta-mkd.html",
  "administraciya.html",
  "istoriya-vodokanal.html",
  "zheltoksan-tulgalar.html",
  "ustav.html",
  "vakansii.html",
  "spisok-npa.html",
  "goszakupki.html",
  "otcheti-deyatelnosti.html",
  "protivodeystvie-korrupcii.html",
]);

for (const p of flat) {
  if (handBuilt.has(p.href)) continue;
  if (seen.has(p.href)) continue;
  seen.add(p.href);

  const trail = w.ALMATY_SU_findTrail(p.id);
  const crumbs = breadcrumbsHtml(trail, p.id);
  const intro = pageIntroHtml(p.label.replace(/\.$/, ""), leadForPage(p));

  let inner = crumbs + intro;

  if (p.children) {
    inner += `<div class="section-grid">\n${sectionCards(p.children)}\n</div>`;
    inner += `<div class="info-callout"><div><strong>Нужна помощь?</strong> Звоните в call-центр <a href="tel:+77273777444">+7 727 3 777 444</a> или оставьте обращение через <a href="zadat-vopros.html">форму обратной связи</a>.</div></div>`;
  } else if (p.href === "zadat-vopros.html") {
    inner += `<div class="prose prose--form">
<p class="lead-text">Напишите нам — ответ придёт на указанный e-mail или по телефону. Ниже представлен макет формы; при подключении к CMS поля связываются с сервером.</p>
<form class="feedback-form" action="#" method="post">
  <div class="form-grid">
    <div class="field"><label for="q-name">ФИО</label><input id="q-name" name="name" type="text" autocomplete="name" required /></div>
    <div class="field"><label for="q-phone">Телефон</label><input id="q-phone" name="phone" type="tel" autocomplete="tel" /></div>
    <div class="field field--wide"><label for="q-email">E-mail</label><input id="q-email" name="email" type="email" autocomplete="email" required /></div>
    <div class="field field--wide"><label for="q-msg">Вопрос</label><textarea id="q-msg" name="message" rows="5" required placeholder="Кратко опишите суть обращения"></textarea></div>
  </div>
  <div class="form-actions"><button type="submit" class="btn-primary">Отправить</button><p class="form-hint">Нажимая кнопку, вы соглашаетесь с обработкой персональных данных в рамках обращения.</p></div>
</form></div>`;
  } else if (p.href === "novosti.html") {
    inner += `<div class="two-col" style="margin-top:1rem;">
<section class="section-card" aria-labelledby="n1"><h2 id="n1" class="section-card__head">Новости</h2>
<div class="news-list">
<article class="content-card"><h3><a href="#">Акцию «Погаси долги — спишем пеню» запустили в Алматы для потребителей услуг холодного водоснабжения и канализации.</a></h3>
<div class="content-card__meta"><time datetime="2025-11-19">19.11.2025</time></div>
<p>Акция распространяется на физические лица (владельцев...</p>
<a class="read-more" href="#">Читать</a></article>
<article class="content-card"><h3><a href="#">В Алматы упрощена процедура оформления коммунальных услуг для новых владельцев жилья</a></h3>
<div class="content-card__meta"><time datetime="2025-11-19">19.11.2025</time></div>
<p>В Алматы внедрены новые цифровые решения,...</p>
<a class="read-more" href="#">Читать</a></article>
</div></section>
<section class="section-card"><h2 class="section-card__head">Архив</h2><p class="lead" style="padding:0 0.25rem;">Полный архив новостей переносится при подключении к системе управления контентом.</p></section>
</div>`;
  } else {
    const c = pageContent[p.id];
    inner += c ? formatArticleBody(c) : proseStub(p.label);
    inner += `<div class="info-callout"><div><strong>Срочно?</strong><a href="tel:+77273777444">+7 727 3 777 444</a> · <a href="tel:+77272746666">+7 727 274-66-66</a></div></div>`;
  }

  const html = pageShell({
    title: p.label.replace(/\.$/, ""),
    description: `${p.label} — ГКП «Алматы Су».`,
    activeId: p.id,
    inner,
  });

  fs.writeFileSync(path.join(root, p.href), html, "utf8");
  console.log("written", p.href);
}

/* Личный кабинет — плитка на главной, отдельная страница */
const lkCrumbs = breadcrumbsHtml(
  [
    { id: "home", label: "Главная", href: "index.html" },
    { id: "lichnyy-kabinet", label: "Личный кабинет", href: "lichnyy-kabinet.html" },
  ],
  "lichnyy-kabinet"
);
const lkBody = pageContent["lichnyy-kabinet"];
const lkHtml = pageShell({
  title: "Личный кабинет",
  description: "Вход в личный кабинет потребителя ГКП «Алматы Су».",
  activeId: "home",
  inner:
    lkCrumbs +
    pageIntroHtml("Личный кабинет", lkBody?.intro || "Передача показаний, оплата и обращения в электронном виде.") +
    (lkBody ? formatArticleBody(lkBody) : proseStub("Личный кабинет")) +
    `<div class="info-callout"><div><strong>Срочно?</strong><a href="tel:+77273777444">+7 727 3 777 444</a> · <a href="tel:+77272746666">+7 727 274-66-66</a></div></div>`,
});
fs.writeFileSync(path.join(root, "lichnyy-kabinet.html"), lkHtml, "utf8");
console.log("written lichnyy-kabinet.html");
