(function () {
  "use strict";

  var TOKEN_KEY = "almatySuAdminToken";
  var token = sessionStorage.getItem(TOKEN_KEY) || "";
  var authCard = document.getElementById("auth-card");
  var settingsCard = document.getElementById("settings-card");
  var authForm = document.getElementById("auth-form");
  var settingsForm = document.getElementById("settings-form");
  var homeContentForm = document.getElementById("home-content-form");
  var pagesContentForm = document.getElementById("pages-content-form");
  var mourningInput = document.getElementById("mourning-mode");
  var bannerList = document.getElementById("banner-list");
  var addBannerBtn = document.getElementById("add-banner-btn");
  var newsList = document.getElementById("news-list");
  var announcementList = document.getElementById("announcement-list");
  var heroSlideList = document.getElementById("hero-slide-list");
  var serviceList = document.getElementById("service-list");
  var govBannerFields = document.getElementById("gov-banner-fields");
  var addNewsBtn = document.getElementById("add-news-btn");
  var addAnnouncementBtn = document.getElementById("add-announcement-btn");
  var addHeroSlideBtn = document.getElementById("add-hero-slide-btn");
  var addServiceBtn = document.getElementById("add-service-btn");
  var filterServicesInput = document.getElementById("filter-services");
  var filterHeroSlidesInput = document.getElementById("filter-hero-slides");
  var filterHomeNewsInput = document.getElementById("filter-home-news");
  var filterHomeAnnouncementsInput = document.getElementById("filter-home-announcements");
  var filterNewsPageFeedInput = document.getElementById("filter-news-page-feed");
  var filterAntikorrDocsInput = document.getElementById("filter-antikorr-docs");
  var newsPageFeedList = document.getElementById("news-page-feed-list");
  var newsPageArchiveFields = document.getElementById("news-page-archive-fields");
  var antikorrContactFields = document.getElementById("antikorr-contact-fields");
  var antikorrDocumentsList = document.getElementById("antikorr-documents-list");
  var addNewsPageItemBtn = document.getElementById("add-news-page-item-btn");
  var addAntikorrDocBtn = document.getElementById("add-antikorr-doc-btn");
  var logoutBtn = document.getElementById("logout-btn");
  var statusEl = document.getElementById("status");
  var itemTemplate = document.getElementById("banner-item-template");
  var newsItemTemplate = document.getElementById("news-item-template");
  var announcementItemTemplate = document.getElementById("announcement-item-template");
  var heroSlideItemTemplate = document.getElementById("hero-slide-item-template");
  var serviceItemTemplate = document.getElementById("service-item-template");
  var govBannerTemplate = document.getElementById("gov-banner-template");
  var newsPageFeedItemTemplate = document.getElementById("news-page-feed-item-template");
  var newsPageArchiveTemplate = document.getElementById("news-page-archive-template");
  var antikorrContactTemplate = document.getElementById("antikorr-contact-template");
  var antikorrDocumentTemplate = document.getElementById("antikorr-document-template");

  function setStatus(text, isError) {
    statusEl.textContent = text || "";
    statusEl.style.color = isError ? "#b42318" : "#166534";
  }

  function createBannerItem(banner) {
    var node = itemTemplate.content.firstElementChild.cloneNode(true);
    node.dataset.id = banner.id || "";
    node.querySelector('[data-field="title"]').value = banner.title || "";
    node.querySelector('[data-field="text"]').value = banner.text || "";
    node.querySelector('[data-field="linkUrl"]').value = banner.linkUrl || "";
    node.querySelector('[data-field="linkLabel"]').value = banner.linkLabel || "";
    node.querySelector('[data-field="imageUrl"]').value = banner.imageUrl || "";
    node.querySelector('[data-action="remove"]').addEventListener("click", function () {
      node.remove();
    });
    return node;
  }

  function readBannersFromForm() {
    return Array.prototype.slice.call(bannerList.querySelectorAll(".banner-item")).map(function (item) {
      return {
        id: item.dataset.id || "",
        title: item.querySelector('[data-field="title"]').value.trim(),
        text: item.querySelector('[data-field="text"]').value.trim(),
        linkUrl: item.querySelector('[data-field="linkUrl"]').value.trim(),
        linkLabel: item.querySelector('[data-field="linkLabel"]').value.trim(),
        imageUrl: item.querySelector('[data-field="imageUrl"]').value.trim(),
      };
    });
  }

  function fillForm(settings) {
    mourningInput.checked = !!settings.mourningMode;
    bannerList.innerHTML = "";
    (settings.topBanners || []).forEach(function (banner) {
      bannerList.appendChild(createBannerItem(banner));
    });
  }

  function createEditableItem(template, data, fields) {
    var node = template.content.firstElementChild.cloneNode(true);
    node.dataset.id = data.id || "";
    fields.forEach(function (field) {
      node.querySelector('[data-field="' + field + '"]').value = data[field] || "";
    });
    var removeBtn = node.querySelector('[data-action="remove"]');
    if (removeBtn) {
      removeBtn.addEventListener("click", function () {
        node.remove();
      });
    }
    var moveUpBtn = node.querySelector('[data-action="move-up"]');
    if (moveUpBtn) {
      moveUpBtn.addEventListener("click", function () {
        var prev = node.previousElementSibling;
        if (prev) node.parentNode.insertBefore(node, prev);
      });
    }
    var moveDownBtn = node.querySelector('[data-action="move-down"]');
    if (moveDownBtn) {
      moveDownBtn.addEventListener("click", function () {
        var next = node.nextElementSibling;
        if (next) node.parentNode.insertBefore(next, node);
      });
    }
    return node;
  }

  function validateRequired(container, requiredFields) {
    var items = Array.prototype.slice.call(container.querySelectorAll(".banner-item"));
    for (var i = 0; i < items.length; i++) {
      for (var j = 0; j < requiredFields.length; j++) {
        var fieldName = requiredFields[j];
        var input = items[i].querySelector('[data-field="' + fieldName + '"]');
        if (!input) continue;
        var value = String(input.value || "").trim();
        if (!value) {
          input.focus();
          return { ok: false, message: 'Заполните обязательное поле "' + fieldName + '"' };
        }
      }
    }
    return { ok: true };
  }

  function applyFilter(container, query) {
    var q = String(query || "").trim().toLowerCase();
    Array.prototype.slice.call(container.querySelectorAll(".banner-item")).forEach(function (item) {
      if (!q) {
        item.hidden = false;
        return;
      }
      var titleInput =
        item.querySelector('[data-field="title"]') ||
        item.querySelector('[data-field="label"]') ||
        item.querySelector('[data-field="archiveText"]');
      var hay = titleInput ? String(titleInput.value || "").toLowerCase() : item.textContent.toLowerCase();
      item.hidden = hay.indexOf(q) === -1;
    });
  }

  function bindFilter(input, container) {
    if (!input || !container) return;
    input.addEventListener("input", function () {
      applyFilter(container, input.value);
    });
  }

  function createNewsItem(item) {
    return createEditableItem(newsItemTemplate, item || {}, ["title", "href", "dateIso", "dateLabel", "summary"]);
  }

  function createAnnouncementItem(item) {
    return createEditableItem(announcementItemTemplate, item || {}, ["title", "href", "summary"]);
  }

  function createHeroSlideItem(item) {
    return createEditableItem(heroSlideItemTemplate, item || {}, ["title", "subtitle", "href", "videoSrc", "videoLabel"]);
  }

  function createServiceItem(item) {
    return createEditableItem(serviceItemTemplate, item || {}, ["label", "href", "imageSrc", "imageAlt"]);
  }

  function createGovBannerItem(item) {
    return createEditableItem(govBannerTemplate, item || {}, [
      "title",
      "text",
      "linkUrl",
      "linkLabel",
      "mediaLabel",
      "mainImageSrc",
      "mainImageAlt",
      "qrImageSrc",
      "qrImageAlt",
    ]);
  }

  function createNewsPageFeedItem(item) {
    return createEditableItem(newsPageFeedItemTemplate, item || {}, [
      "title",
      "href",
      "dateIso",
      "dateLabel",
      "summary",
      "readMoreLabel",
    ]);
  }

  function createNewsPageArchiveItem(item) {
    return createEditableItem(newsPageArchiveTemplate, item || {}, ["archiveText", "archiveLinkUrl", "archiveLinkLabel"]);
  }

  function createAntikorrContactItem(item) {
    return createEditableItem(antikorrContactTemplate, item || {}, [
      "contactsPhone",
      "contactsEmailLinkUrl",
      "contactsEmailLinkLabel",
    ]);
  }

  function createAntikorrDocumentItem(item) {
    return createEditableItem(antikorrDocumentTemplate, item || {}, ["title", "href"]);
  }

  function readItems(container, fields) {
    return Array.prototype.slice.call(container.querySelectorAll(".banner-item")).map(function (item) {
      var payload = { id: item.dataset.id || "" };
      fields.forEach(function (field) {
        var input = item.querySelector('[data-field="' + field + '"]');
        payload[field] = input ? input.value.trim() : "";
      });
      return payload;
    });
  }

  function fillHomeContent(content) {
    govBannerFields.innerHTML = "";
    serviceList.innerHTML = "";
    heroSlideList.innerHTML = "";
    newsList.innerHTML = "";
    announcementList.innerHTML = "";
    govBannerFields.appendChild(createGovBannerItem(content.govBanner || {}));
    (content.services || []).forEach(function (item) {
      serviceList.appendChild(createServiceItem(item));
    });
    (content.heroSlides || []).forEach(function (item) {
      heroSlideList.appendChild(createHeroSlideItem(item));
    });
    (content.news || []).forEach(function (item) {
      newsList.appendChild(createNewsItem(item));
    });
    (content.announcements || []).forEach(function (item) {
      announcementList.appendChild(createAnnouncementItem(item));
    });
  }

  async function api(url, options) {
    var response = await fetch(url, {
      method: options.method || "GET",
      headers: {
        "Content-Type": "application/json",
        "x-admin-token": token,
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
    });
    var text = await response.text().catch(function () {
      return "";
    });
    var payload = {};
    if (text) {
      try {
        payload = JSON.parse(text);
      } catch (_ignore) {
        payload = {};
      }
    }
    if (!response.ok || !payload.ok) {
      var status = response.status || 0;
      if (status === 404 && String(url || "").indexOf("/api/") === 0) {
        throw new Error("API недоступен. Запустите сайт через «npm run server» (а не «npm run dev»).");
      }
      throw new Error((payload && payload.error) || ("Ошибка запроса (" + status + ")"));
    }
    return payload;
  }

  async function loadSettings() {
    var data = await api("/api/admin/site-settings", { method: "GET" });
    fillForm(data.settings || {});
  }

  async function loadHomeContent() {
    var data = await api("/api/admin/content/home", { method: "GET" });
    fillHomeContent(data.content || {});
  }

  async function loadPagesContent() {
    var data = await api("/api/admin/content/pages", { method: "GET" });
    fillPagesContentForm(data.content || {});
  }

  function fillPagesContentForm(content) {
    var newsPage = content.newsPage || {};
    var antiCorruptionPage = content.antiCorruptionPage || {};

    newsPageFeedList.innerHTML = "";
    newsPageArchiveFields.innerHTML = "";
    antikorrContactFields.innerHTML = "";
    antikorrDocumentsList.innerHTML = "";

    (newsPage.feed || []).forEach(function (item) {
      newsPageFeedList.appendChild(createNewsPageFeedItem(item));
    });
    newsPageArchiveFields.appendChild(
      createNewsPageArchiveItem({
        archiveText: newsPage.archiveText || "",
        archiveLinkUrl: newsPage.archiveLinkUrl || "",
        archiveLinkLabel: newsPage.archiveLinkLabel || "",
      })
    );
    antikorrContactFields.appendChild(
      createAntikorrContactItem({
        contactsPhone: antiCorruptionPage.contactsPhone || "",
        contactsEmailLinkUrl: antiCorruptionPage.contactsEmailLinkUrl || "",
        contactsEmailLinkLabel: antiCorruptionPage.contactsEmailLinkLabel || "",
      })
    );
    (antiCorruptionPage.documents || []).forEach(function (doc) {
      antikorrDocumentsList.appendChild(createAntikorrDocumentItem(doc));
    });
  }

  function readPagesContentForm() {
    var archive = readItems(newsPageArchiveFields, ["archiveText", "archiveLinkUrl", "archiveLinkLabel"])[0] || {};
    var contacts = readItems(antikorrContactFields, ["contactsPhone", "contactsEmailLinkUrl", "contactsEmailLinkLabel"])[0] || {};
    return {
      newsPage: {
        feed: readItems(newsPageFeedList, ["title", "href", "dateIso", "dateLabel", "summary", "readMoreLabel"]),
        archiveText: archive.archiveText || "",
        archiveLinkUrl: archive.archiveLinkUrl || "",
        archiveLinkLabel: archive.archiveLinkLabel || "",
      },
      antiCorruptionPage: {
        contactsPhone: contacts.contactsPhone || "",
        contactsEmailLinkUrl: contacts.contactsEmailLinkUrl || "",
        contactsEmailLinkLabel: contacts.contactsEmailLinkLabel || "",
        documents: readItems(antikorrDocumentsList, ["title", "href"]),
      },
    };
  }

  function setLoggedIn(on) {
    authCard.hidden = on;
    settingsCard.hidden = !on;
  }

  authForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    var formData = new FormData(authForm);
    token = String(formData.get("token") || "").trim();
    sessionStorage.setItem(TOKEN_KEY, token);
    try {
      await loadSettings();
      await loadHomeContent();
      await loadPagesContent();
      setLoggedIn(true);
      setStatus("Доступ подтвержден.", false);
    } catch (error) {
      sessionStorage.removeItem(TOKEN_KEY);
      token = "";
      setStatus(error.message, true);
    }
  });

  settingsForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    try {
      var bannersValidation = validateRequired(bannerList, ["title"]);
      if (!bannersValidation.ok) {
        setStatus(bannersValidation.message, true);
        return;
      }
      var data = await api("/api/admin/site-settings", {
        method: "PUT",
        body: {
          mourningMode: mourningInput.checked,
          topBanners: readBannersFromForm(),
        },
      });
      fillForm(data.settings || {});
      setStatus("Изменения сохранены.", false);
    } catch (error) {
      setStatus(error.message, true);
    }
  });

  addBannerBtn.addEventListener("click", function () {
    bannerList.appendChild(createBannerItem({}));
  });

  addNewsBtn.addEventListener("click", function () {
    newsList.appendChild(createNewsItem({}));
  });

  addAnnouncementBtn.addEventListener("click", function () {
    announcementList.appendChild(createAnnouncementItem({}));
  });

  addHeroSlideBtn.addEventListener("click", function () {
    heroSlideList.appendChild(createHeroSlideItem({}));
  });

  addServiceBtn.addEventListener("click", function () {
    serviceList.appendChild(createServiceItem({}));
  });

  addNewsPageItemBtn.addEventListener("click", function () {
    newsPageFeedList.appendChild(createNewsPageFeedItem({}));
  });

  addAntikorrDocBtn.addEventListener("click", function () {
    antikorrDocumentsList.appendChild(createAntikorrDocumentItem({}));
  });

  bindFilter(filterServicesInput, serviceList);
  bindFilter(filterHeroSlidesInput, heroSlideList);
  bindFilter(filterHomeNewsInput, newsList);
  bindFilter(filterHomeAnnouncementsInput, announcementList);
  bindFilter(filterNewsPageFeedInput, newsPageFeedList);
  bindFilter(filterAntikorrDocsInput, antikorrDocumentsList);

  homeContentForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    try {
      var servicesValidation = validateRequired(serviceList, ["label", "imageSrc"]);
      if (!servicesValidation.ok) {
        setStatus(servicesValidation.message, true);
        return;
      }
      var heroValidation = validateRequired(heroSlideList, ["title", "videoSrc"]);
      if (!heroValidation.ok) {
        setStatus(heroValidation.message, true);
        return;
      }
      var homeNewsValidation = validateRequired(newsList, ["title"]);
      if (!homeNewsValidation.ok) {
        setStatus(homeNewsValidation.message, true);
        return;
      }
      var homeAnnValidation = validateRequired(announcementList, ["title"]);
      if (!homeAnnValidation.ok) {
        setStatus(homeAnnValidation.message, true);
        return;
      }
      var data = await api("/api/admin/content/home", {
        method: "PUT",
        body: {
          govBanner: readItems(govBannerFields, [
            "title",
            "text",
            "linkUrl",
            "linkLabel",
            "mediaLabel",
            "mainImageSrc",
            "mainImageAlt",
            "qrImageSrc",
            "qrImageAlt",
          ])[0] || {},
          services: readItems(serviceList, ["label", "href", "imageSrc", "imageAlt"]),
          heroSlides: readItems(heroSlideList, ["title", "subtitle", "href", "videoSrc", "videoLabel"]),
          news: readItems(newsList, ["title", "href", "dateIso", "dateLabel", "summary"]),
          announcements: readItems(announcementList, ["title", "href", "summary"]),
        },
      });
      fillHomeContent(data.content || {});
      setStatus("Контент главной сохранен.", false);
    } catch (error) {
      setStatus(error.message, true);
    }
  });

  pagesContentForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    try {
      var pagesNewsValidation = validateRequired(newsPageFeedList, ["title"]);
      if (!pagesNewsValidation.ok) {
        setStatus(pagesNewsValidation.message, true);
        return;
      }
      var docsValidation = validateRequired(antikorrDocumentsList, ["title"]);
      if (!docsValidation.ok) {
        setStatus(docsValidation.message, true);
        return;
      }
      var payload = readPagesContentForm();
      var data = await api("/api/admin/content/pages", {
        method: "PUT",
        body: payload,
      });
      fillPagesContentForm(data.content || {});
      setStatus("Контент страниц сохранен.", false);
    } catch (error) {
      setStatus(error.message || "Не удалось сохранить контент страниц", true);
    }
  });

  logoutBtn.addEventListener("click", function () {
    sessionStorage.removeItem(TOKEN_KEY);
    token = "";
    setLoggedIn(false);
    setStatus("Сессия завершена.", false);
  });

  if (token) {
    Promise.all([loadSettings(), loadHomeContent(), loadPagesContent()])
      .then(function () {
        setLoggedIn(true);
      })
      .catch(function () {
        sessionStorage.removeItem(TOKEN_KEY);
        token = "";
      });
  } else {
    setLoggedIn(false);
  }
})();
