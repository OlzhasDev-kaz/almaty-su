(function () {
  "use strict";

  var SU = window.ALMATY_SU;
  if (!SU) return;

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function escapeAttr(s) {
    return escapeHtml(s).replace(/'/g, "&#39;");
  }

  function applyMourningMode(enabled) {
    document.documentElement.classList.toggle("is-mourning-mode", !!enabled);
    document.documentElement.setAttribute("data-mourning-mode", enabled ? "true" : "false");
  }

  function buildTopBanner(settings) {
    var banners = (settings && settings.topBanners) || [];
    if (!banners.length) return "";
    var slides = banners
      .map(function (banner, idx) {
        var action = "";
        if (banner.linkUrl) {
          action =
            '<a class="site-top-banner__link" href="' +
            escapeAttr(banner.linkUrl) +
            '">' +
            escapeHtml(banner.linkLabel || "Подробнее") +
            "</a>";
        }
        var image = banner.imageUrl
          ? '<img class="site-top-banner__img" src="' + escapeAttr(banner.imageUrl) + '" alt="" loading="lazy" decoding="async" />'
          : "";
        return (
          '<article class="site-top-banner__slide' +
          (idx === 0 ? " is-active" : "") +
          '">' +
          '<div class="site-top-banner__text"><strong>' +
          escapeHtml(banner.title || "") +
          "</strong>" +
          (banner.text ? "<p>" + escapeHtml(banner.text) + "</p>" : "") +
          action +
          "</div>" +
          image +
          "</article>"
        );
      })
      .join("");
    return '<section class="site-top-banner js-site-top-banner" aria-label="Служебные объявления">' + slides + "</section>";
  }

  function buildTopBar() {
    var fc = SU.topContacts || [];
    var dd = fc
      .map(function (c) {
        return "<li><a href=\"" + c.href + "\">" + escapeHtml(c.label) + "</a></li>";
      })
      .join("");
    var extras = fc
      .map(function (c) {
        return "<a class=\"top-bar__link\" href=\"" + c.href + "\">" + escapeHtml(c.label) + "</a>";
      })
      .join("");
    return (
      '<div class="top-bar">' +
      '<div class="top-bar__inner">' +
      '<div class="top-bar__main">' +
      '<div class="top-bar__phones-rail">' +
      '<div class="top-bar__phones">' +
      '<svg class="top-bar__phones-icon" aria-hidden="true" focusable="false"><use href="assets/icons.svg#as-phone"></use></svg>' +
      "<strong>+7 727 3 777 444</strong><span>– call-центр</span><span>|</span>" +
      "<strong>+7 727 274-66-66</strong><span>аварийная диспетчерская</span>" +
      "</div></div>" +
      '<div class="top-bar__extras">' +
      extras +
      "</div></div>" +
      '<div class="top-bar__corner">' +
      '<div class="lang-switch lang-switch--top">' +
      '<a href="#" lang="kk">ҚАЗ</a><span class="sep">|</span>' +
      '<a href="index.html" lang="ru">РУС</a></div>' +
      '<button type="button" class="a11y-link a11y-link--top js-a11y-toggle" aria-pressed="false" title="Включить версию для слабовидящих" aria-label="Включить версию для слабовидящих">' +
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">' +
      '<path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" /><circle cx="12" cy="12" r="3" />' +
      "</svg></button></div></div></div>"
    );
  }

  function buildNavExtras() {
    return (
      '<div class="nav-extras">' +
      '<div class="nav-search-slot">' +
      '<form class="search-form search-form--nav" role="search" action="search.html" method="get">' +
      '<label class="visually-hidden" for="site-search">Поиск</label>' +
      '<input id="site-search" type="search" name="s" placeholder="Поиск..." autocomplete="off" />' +
      '<button type="submit" aria-label="Искать">' +
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<circle cx="11" cy="11" r="8"/>' +
      '<path d="m21 21-4.3-4.3"/>' +
      "</svg></button></form></div></div>"
    );
  }

  function renderMainNav(activeId) {
    var trail = window.ALMATY_SU_findTrail ? window.ALMATY_SU_findTrail(activeId) : [];
    var inTrail = {};
    trail.forEach(function (t) {
      inTrail[t.id] = true;
    });

    function submenu(ch) {
      var cur = ch.id === activeId ? ' aria-current="page"' : "";
      return "<li><a href=\"" + ch.href + "\"" + cur + ">" + escapeHtml(ch.label) + "</a></li>";
    }

    var top = SU.nav
      .map(function (item) {
        var hasCh = item.children && item.children.length;
        var liClass = inTrail[item.id] ? " class=\"is-active-branch\"" : "";
        var topCur = item.id === activeId ? ' aria-current="page"' : "";
        var sub = hasCh
          ? '<ul class="submenu">' + item.children.map(submenu).join("") + "</ul>"
          : "";
        return (
          "<li" +
          liClass +
          "><a href=\"" +
          item.href +
          "\"" +
          topCur +
          ">" +
          escapeHtml(item.label) +
          "</a>" +
          sub +
          "</li>"
        );
      })
      .join("");

    return (
      '<div class="nav-wrap"><div class="nav-wrap__inner">' +
      '<button type="button" class="menu-toggle" aria-expanded="false" aria-controls="primary-menu" aria-label="Открыть меню">' +
      '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">' +
      '<path stroke-linecap="round" d="M4 6h16M4 12h16M4 18h16" /></svg></button>' +
      '<span class="nav-wrap__spacer nav-wrap__spacer--before" aria-hidden="true"></span>' +
      '<nav class="main-nav" aria-label="Основное меню"><ul id="primary-menu">' +
      top +
      "</ul></nav>" +
      '<span class="nav-wrap__spacer nav-wrap__spacer--after" aria-hidden="true"></span>' +
      buildNavExtras() +
      "</div></div>"
    );
  }

  function buildChromeTop(activeId, settings) {
    return (
      '<a class="skip-link" href="#main">Перейти к содержимому</a>' +
      buildTopBanner(settings) +
      buildTopBar() +
      renderMainNav(activeId || "home")
    );
  }

  function buildChromeBottom() {
    return (
      '<footer class="site-footer site-footer--rich">' +
      '<div class="site-footer__inner">' +
      '<div class="site-footer__brand"><strong>ГКП «Алматы Су»</strong><span>Водоснабжение и канализация города Алматы</span></div>' +
      '<div class="site-footer__contacts">' +
      "<p><strong>Call-центр:</strong> +7 727 3 777 444</p>" +
      "<p><strong>Аварийная диспетчерская:</strong> +7 727 274-66-66</p>" +
      "</div></div>" +
      '<p class="site-footer__copy">© ГКП «АЛМАТЫ СУ», 2006-2026</p></footer>' +
      '<button type="button" class="back-to-top" aria-label="Наверх">' +
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
      '<path d="M12 19V5M5 12l7-7 7 7" /></svg></button>'
    );
  }

  var main = document.getElementById("main");
  if (!main) return;

  var activeId = document.body.getAttribute("data-active-nav") || "home";

  function initTopBannerRotation() {
    var root = document.querySelector(".js-site-top-banner");
    if (!root) return;
    var slides = root.querySelectorAll(".site-top-banner__slide");
    if (slides.length < 2) return;
    var index = 0;
    window.setInterval(function () {
      slides[index].classList.remove("is-active");
      index = (index + 1) % slides.length;
      slides[index].classList.add("is-active");
    }, 7000);
  }

  function withFallbackSettings() {
    return { mourningMode: false, topBanners: [] };
  }

  function renderLayout(settings) {
    applyMourningMode(settings.mourningMode);
    main.insertAdjacentHTML("beforebegin", buildChromeTop(activeId, settings));
    main.insertAdjacentHTML("afterend", buildChromeBottom());
    initTopBannerRotation();
  }

  fetch("/api/site-settings")
    .then(function (r) {
      if (!r.ok) throw new Error("settings");
      return r.json();
    })
    .then(function (payload) {
      var settings = payload && payload.ok ? payload.settings : withFallbackSettings();
      renderLayout(settings || withFallbackSettings());
    })
    .catch(function () {
      renderLayout(withFallbackSettings());
    });
})();
