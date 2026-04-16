(function () {
  "use strict";

  if (window.location.pathname.indexOf("index.html") === -1 && window.location.pathname !== "/") {
    return;
  }

  var newsRoot = document.getElementById("home-news-list");
  var annRoot = document.getElementById("home-announcements-list");
  var govBannerRoot = document.getElementById("home-gov-banner");
  var servicesRoot = document.getElementById("home-services-list");
  if (!newsRoot || !annRoot) return;

  function escapeHtml(text) {
    return String(text || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function renderNews(items) {
    return items
      .map(function (item) {
        var dateBlock =
          item.dateIso && item.dateLabel
            ? '<div class="content-card__meta"><svg class="content-card__meta-icon" width="14" height="14" aria-hidden="true" focusable="false"><use href="assets/icons.svg#as-calendar"></use></svg><time datetime="' +
              escapeHtml(item.dateIso) +
              '">' +
              escapeHtml(item.dateLabel) +
              "</time></div>"
            : "";
        return (
          '<article class="content-card">' +
          "<h3><a href=\"" +
          escapeHtml(item.href) +
          '">' +
          escapeHtml(item.title) +
          "</a></h3>" +
          dateBlock +
          "<p>" +
          escapeHtml(item.summary) +
          '</p><a class="read-more" href="' +
          escapeHtml(item.href) +
          '">Читать</a></article>'
        );
      })
      .join("");
  }

  function renderAnnouncements(items) {
    return items
      .map(function (item) {
        return (
          '<article class="content-card"><h3><a href="' +
          escapeHtml(item.href) +
          '">' +
          escapeHtml(item.title) +
          "</a></h3><p>" +
          escapeHtml(item.summary) +
          "</p></article>"
        );
      })
      .join("");
  }

  function renderHeroSlides(items) {
    return items
      .map(function (item, idx) {
        return (
          '<article class="hero-carousel__slide' +
          (idx === 0 ? " is-active" : "") +
          '" data-index="' +
          idx +
          '">' +
          '<video class="hero-carousel__media" muted playsinline preload="' +
          (idx === 0 ? "auto" : "metadata") +
          '" aria-label="' +
          escapeHtml(item.videoLabel || item.title) +
          '">' +
          '<source src="' +
          escapeHtml(item.videoSrc) +
          '" type="video/mp4" />' +
          "</video>" +
          '<div class="hero-carousel__overlay"></div>' +
          '<div class="hero-carousel__content"><h2>' +
          escapeHtml(item.title) +
          "</h2>" +
          (item.subtitle ? "<p>" + escapeHtml(item.subtitle) + "</p>" : "") +
          '<a class="hero-carousel__cta" href="' +
          escapeHtml(item.href) +
          '">Узнать больше</a></div></article>'
        );
      })
      .join("");
  }

  function renderHeroDots(count) {
    var dots = [];
    for (var i = 0; i < count; i++) {
      dots.push(
        '<button type="button" class="hero-carousel__dot' +
          (i === 0 ? " is-active" : "") +
          '" aria-label="Слайд ' +
          (i + 1) +
          '"></button>'
      );
    }
    return dots.join("");
  }

  function renderGovBanner(item) {
    if (!item || !item.title) return "";
    var textBlock = item.text
      ? "<p>" +
        escapeHtml(item.text) +
        (item.linkUrl
          ? ' <a href="' + escapeHtml(item.linkUrl) + '">' + escapeHtml(item.linkLabel || item.linkUrl) + "</a>"
          : "") +
        "</p>"
      : "";
    return (
      '<div class="gov-banner__inner">' +
      '<div class="gov-banner__text"><h2>' +
      escapeHtml(item.title) +
      "</h2>" +
      textBlock +
      '</div><div class="gov-banner__media" role="group" aria-label="' +
      escapeHtml(item.mediaLabel || "Информационные материалы") +
      '">' +
      (item.mainImageSrc
        ? '<img class="gov-banner__media-img gov-banner__media-img--referendum" src="' +
          escapeHtml(item.mainImageSrc) +
          '" alt="' +
          escapeHtml(item.mainImageAlt || "") +
          '" width="300" height="71" loading="lazy" decoding="async" />'
        : "") +
      (item.qrImageSrc
        ? '<img class="gov-banner__media-img gov-banner__media-img--qr" src="' +
          escapeHtml(item.qrImageSrc) +
          '" alt="' +
          escapeHtml(item.qrImageAlt || "") +
          '" width="300" height="295" loading="lazy" decoding="async" />'
        : "") +
      "</div></div>"
    );
  }

  function renderServices(items) {
    return items
      .map(function (item) {
        return (
          '<a class="tile" href="' +
          escapeHtml(item.href) +
          '"><div class="tile__media" aria-hidden="true"><img class="tile__icon" src="' +
          escapeHtml(item.imageSrc) +
          '" alt="' +
          escapeHtml(item.imageAlt || "") +
          '" loading="lazy" decoding="async" /></div><span class="tile__label">' +
          escapeHtml(item.label) +
          "</span></a>"
        );
      })
      .join("");
  }

  fetch("/api/content/home")
    .then(function (response) {
      if (!response.ok) throw new Error("fetch_failed");
      return response.json();
    })
    .then(function (payload) {
      if (!payload || !payload.ok || !payload.content) return;
      var content = payload.content;
      if (Array.isArray(content.heroSlides) && content.heroSlides.length) {
        var carouselRoot = document.querySelector(".js-hero-carousel");
        if (carouselRoot) {
          var track = carouselRoot.querySelector(".hero-carousel__track");
          var dotsWrap = carouselRoot.querySelector(".hero-carousel__dots");
          if (track && dotsWrap) {
            track.innerHTML = renderHeroSlides(content.heroSlides);
            dotsWrap.innerHTML = renderHeroDots(content.heroSlides.length);
            if (typeof window.ALMATY_SU_initHeroCarousel === "function") {
              window.ALMATY_SU_initHeroCarousel();
            }
          }
        }
      }
      if (govBannerRoot && content.govBanner && content.govBanner.title) {
        govBannerRoot.innerHTML = renderGovBanner(content.govBanner);
      }
      if (servicesRoot && Array.isArray(content.services) && content.services.length) {
        servicesRoot.innerHTML = renderServices(content.services);
      }
      if (Array.isArray(content.news) && content.news.length) {
        newsRoot.innerHTML = renderNews(content.news);
      }
      if (Array.isArray(content.announcements) && content.announcements.length) {
        annRoot.innerHTML = renderAnnouncements(content.announcements);
      }
    })
    .catch(function () {});
})();
