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
  var newsItemsList = document.getElementById("news-items-list");
  var newsListScreen = document.getElementById("news-list-screen");
  var newsEditorScreen = document.getElementById("news-editor-screen");
  var newsEditorBackBtn = document.getElementById("news-editor-back-btn");
  var newsEditorBackBtnBottom = document.getElementById("news-editor-back-btn-bottom");
  var newsEditorApplyBtn = document.getElementById("news-editor-apply-btn");
  var newsEditorDeleteBtn = document.getElementById("news-editor-delete-btn");
  var newsEditorTitleHead = document.getElementById("news-editor-title-head");
  var newsEditorTitleInput = document.getElementById("news-editor-title");
  var newsEditorHrefInput = document.getElementById("news-editor-href");
  var newsEditorDateIsoInput = document.getElementById("news-editor-date-iso");
  var newsEditorDateLabelInput = document.getElementById("news-editor-date-label");
  var newsEditorSummaryInput = document.getElementById("news-editor-summary");
  var serviceItemsList = document.getElementById("service-items-list");
  var serviceListScreen = document.getElementById("service-list-screen");
  var serviceEditorScreen = document.getElementById("service-editor-screen");
  var serviceEditorBackBtn = document.getElementById("service-editor-back-btn");
  var serviceEditorApplyBtn = document.getElementById("service-editor-apply-btn");
  var serviceEditorDeleteBtn = document.getElementById("service-editor-delete-btn");
  var serviceEditorLabelInput = document.getElementById("service-editor-label");
  var serviceEditorHrefInput = document.getElementById("service-editor-href");
  var serviceEditorImageInput = document.getElementById("service-editor-image");
  var serviceEditorAltInput = document.getElementById("service-editor-alt");
  var heroItemsList = document.getElementById("hero-items-list");
  var heroListScreen = document.getElementById("hero-list-screen");
  var heroEditorScreen = document.getElementById("hero-editor-screen");
  var heroEditorBackBtn = document.getElementById("hero-editor-back-btn");
  var heroEditorApplyBtn = document.getElementById("hero-editor-apply-btn");
  var heroEditorDeleteBtn = document.getElementById("hero-editor-delete-btn");
  var heroEditorTitleInput = document.getElementById("hero-editor-title");
  var heroEditorSubtitleInput = document.getElementById("hero-editor-subtitle");
  var heroEditorHrefInput = document.getElementById("hero-editor-href");
  var heroEditorVideoInput = document.getElementById("hero-editor-video");
  var heroEditorVideoLabelInput = document.getElementById("hero-editor-video-label");
  var announcementItemsList = document.getElementById("announcement-items-list");
  var announcementListScreen = document.getElementById("announcement-list-screen");
  var announcementEditorScreen = document.getElementById("announcement-editor-screen");
  var announcementEditorBackBtn = document.getElementById("announcement-editor-back-btn");
  var announcementEditorApplyBtn = document.getElementById("announcement-editor-apply-btn");
  var announcementEditorDeleteBtn = document.getElementById("announcement-editor-delete-btn");
  var announcementEditorTitleInput = document.getElementById("announcement-editor-title");
  var announcementEditorHrefInput = document.getElementById("announcement-editor-href");
  var announcementEditorSummaryInput = document.getElementById("announcement-editor-summary");
  var newsSelectAllBtn = document.getElementById("news-select-all-btn");
  var newsBulkDeleteBtn = document.getElementById("news-bulk-delete-btn");
  var newsBulkActivateBtn = document.getElementById("news-bulk-activate-btn");
  var newsBulkDeactivateBtn = document.getElementById("news-bulk-deactivate-btn");
  var newsBulkAddBtn = document.getElementById("news-bulk-add-btn");
  var serviceSelectAllBtn = document.getElementById("service-select-all-btn");
  var serviceBulkDeleteBtn = document.getElementById("service-bulk-delete-btn");
  var serviceBulkActivateBtn = document.getElementById("service-bulk-activate-btn");
  var serviceBulkDeactivateBtn = document.getElementById("service-bulk-deactivate-btn");
  var serviceBulkAddBtn = document.getElementById("service-bulk-add-btn");
  var heroSelectAllBtn = document.getElementById("hero-select-all-btn");
  var heroBulkDeleteBtn = document.getElementById("hero-bulk-delete-btn");
  var heroBulkActivateBtn = document.getElementById("hero-bulk-activate-btn");
  var heroBulkDeactivateBtn = document.getElementById("hero-bulk-deactivate-btn");
  var heroBulkAddBtn = document.getElementById("hero-bulk-add-btn");
  var announcementSelectAllBtn = document.getElementById("announcement-select-all-btn");
  var announcementBulkDeleteBtn = document.getElementById("announcement-bulk-delete-btn");
  var announcementBulkActivateBtn = document.getElementById("announcement-bulk-activate-btn");
  var announcementBulkDeactivateBtn = document.getElementById("announcement-bulk-deactivate-btn");
  var announcementBulkAddBtn = document.getElementById("announcement-bulk-add-btn");
  var filterNewsPageFeedInput = document.getElementById("filter-news-page-feed");
  var filterAntikorrDocsInput = document.getElementById("filter-antikorr-docs");
  var newsPageFeedList = document.getElementById("news-page-feed-list");
  var newsPageArchiveFields = document.getElementById("news-page-archive-fields");
  var antikorrContactFields = document.getElementById("antikorr-contact-fields");
  var antikorrDocumentsList = document.getElementById("antikorr-documents-list");
  var adminPrimaryColumn = document.getElementById("admin-primary-column");
  var adminSecondaryColumn = document.getElementById("admin-secondary-column");
  var addNewsPageItemBtn = document.getElementById("add-news-page-item-btn");
  var addAntikorrDocBtn = document.getElementById("add-antikorr-doc-btn");
  var logoutBtn = document.getElementById("logout-btn");
  var statusEl = document.getElementById("status");
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".admin-nav-link"));
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
  var sectionGeneral = document.getElementById("section-general");
  var sectionMainScreen = document.getElementById("section-main-screen");
  var sectionServices = document.getElementById("section-services");
  var sectionHero = document.getElementById("section-hero");
  var sectionNewsHome = document.getElementById("section-news-home");
  var sectionAnnouncementsHome = document.getElementById("section-announcements-home");
  var sectionNewsPage = document.getElementById("section-news-page");
  var sectionAntikorr = document.getElementById("section-antikorr");
  var currentEditingNewsIndex = -1;
  var currentEditingServiceIndex = -1;
  var currentEditingHeroIndex = -1;
  var currentEditingAnnouncementIndex = -1;
  var homeContentCache = null;
  var uidCounter = 1;
  var selectedNewsUids = new Set();
  var selectedServiceUids = new Set();
  var selectedHeroUids = new Set();
  var selectedAnnouncementUids = new Set();
  var showNewsSelection = false;
  var showServiceSelection = false;
  var showHeroSelection = false;
  var showAnnouncementSelection = false;

  function ensureNodeUid(node) {
    if (!node.dataset.adminUid) {
      node.dataset.adminUid = "adm-" + uidCounter++;
    }
    if (!node.dataset.active) {
      node.dataset.active = "true";
    }
    return node.dataset.adminUid;
  }

  function setSectionVisibility(panelId) {
    if (!settingsForm || !homeContentForm || !pagesContentForm) return;
    var isGeneral = panelId === "section-general";
    var isHomePanel =
      panelId === "section-main-screen" ||
      panelId === "section-services" ||
      panelId === "section-hero" ||
      panelId === "section-news-home" ||
      panelId === "section-announcements-home";
    var isPagesPanel = panelId === "section-news-page" || panelId === "section-antikorr";

    settingsForm.hidden = !isGeneral;
    homeContentForm.hidden = !isHomePanel;
    pagesContentForm.hidden = !isPagesPanel;

    if (sectionMainScreen) sectionMainScreen.hidden = panelId !== "section-main-screen";
    if (sectionServices) sectionServices.hidden = panelId !== "section-services";
    if (sectionHero) sectionHero.hidden = panelId !== "section-hero";
    if (sectionNewsHome) sectionNewsHome.hidden = panelId !== "section-news-home";
    if (sectionAnnouncementsHome) sectionAnnouncementsHome.hidden = panelId !== "section-announcements-home";
    if (sectionNewsPage) sectionNewsPage.hidden = panelId !== "section-news-page";
    if (sectionAntikorr) sectionAntikorr.hidden = panelId !== "section-antikorr";
    updateWorkspaceLayout(panelId);
  }

  function updateWorkspaceLayout(panelId) {
    if (!adminPrimaryColumn || !adminSecondaryColumn) return;
    var shouldUseWidePrimary =
      panelId === "section-main-screen" ||
      panelId === "section-services" ||
      panelId === "section-hero" ||
      panelId === "section-news-home" ||
      panelId === "section-announcements-home";
    var shouldShowSecondary = panelId === "section-news-page" || panelId === "section-antikorr";

    if (shouldUseWidePrimary) {
      adminPrimaryColumn.classList.remove("lg:col-span-1");
      adminPrimaryColumn.classList.add("lg:col-span-3");
      adminSecondaryColumn.hidden = true;
      return;
    }

    adminPrimaryColumn.classList.remove("lg:col-span-3");
    adminPrimaryColumn.classList.add("lg:col-span-1");
    adminSecondaryColumn.hidden = !shouldShowSecondary;
  }

  function setActiveNav(panelId) {
    navLinks.forEach(function (link) {
      var active = link.getAttribute("data-panel") === panelId;
      link.classList.toggle("active", active);
    });
  }

  function activatePanel(panelId) {
    var targetId = panelId || "section-general";
    setSectionVisibility(targetId);
    setActiveNav(targetId);
    if (targetId === "section-news-home") {
      if (filterHomeNewsInput) {
        filterHomeNewsInput.value = "";
      }
      closeNewsEditor();
      renderNewsManagementList();
      if (!getNewsNodes().length) {
        loadHomeContent().catch(function () {
          setStatus("Не удалось загрузить новости для редактирования.", true);
        });
      }
    }
    if (targetId === "section-services") {
      closeServiceEditor();
      renderServiceManagementList();
    }
    if (targetId === "section-hero") {
      closeHeroEditor();
      renderHeroManagementList();
    }
    if (targetId === "section-announcements-home") {
      closeAnnouncementEditor();
      renderAnnouncementManagementList();
    }
  }

  navLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      var panelId = link.getAttribute("data-panel");
      if (!panelId) return;
      event.preventDefault();
      activatePanel(panelId);
    });
  });

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

  function getNewsNodes() {
    return Array.prototype.slice.call(newsList.querySelectorAll(".banner-item"));
  }

  function closeNewsEditor() {
    currentEditingNewsIndex = -1;
    if (newsListScreen) {
      newsListScreen.hidden = false;
      newsListScreen.classList.remove("hidden");
    }
    if (newsEditorScreen) {
      newsEditorScreen.hidden = true;
      newsEditorScreen.classList.add("hidden");
    }
  }

  function openNewsEditor(index) {
    var items = getNewsNodes();
    if (index < 0 || index >= items.length) return;
    currentEditingNewsIndex = index;
    var node = items[index];
    if (newsEditorTitleInput) newsEditorTitleInput.value = node.querySelector('[data-field="title"]').value || "";
    if (newsEditorHrefInput) newsEditorHrefInput.value = node.querySelector('[data-field="href"]').value || "";
    if (newsEditorDateIsoInput) newsEditorDateIsoInput.value = node.querySelector('[data-field="dateIso"]').value || "";
    if (newsEditorDateLabelInput) newsEditorDateLabelInput.value = node.querySelector('[data-field="dateLabel"]').value || "";
    if (newsEditorSummaryInput) newsEditorSummaryInput.value = node.querySelector('[data-field="summary"]').value || "";
    if (newsEditorTitleHead) newsEditorTitleHead.textContent = (node.querySelector('[data-field="title"]').value || "").trim() || "Новая новость";
    if (newsListScreen) {
      newsListScreen.hidden = true;
      newsListScreen.classList.add("hidden");
    }
    if (newsEditorScreen) {
      newsEditorScreen.hidden = false;
      newsEditorScreen.classList.remove("hidden");
    }
  }

  function applyNewsEditorChanges() {
    var items = getNewsNodes();
    if (currentEditingNewsIndex < 0 || currentEditingNewsIndex >= items.length) return;
    var node = items[currentEditingNewsIndex];
    node.querySelector('[data-field="title"]').value = (newsEditorTitleInput && newsEditorTitleInput.value || "").trim();
    node.querySelector('[data-field="href"]').value = (newsEditorHrefInput && newsEditorHrefInput.value || "").trim();
    node.querySelector('[data-field="dateIso"]').value = (newsEditorDateIsoInput && newsEditorDateIsoInput.value || "").trim();
    node.querySelector('[data-field="dateLabel"]').value = (newsEditorDateLabelInput && newsEditorDateLabelInput.value || "").trim();
    node.querySelector('[data-field="summary"]').value = (newsEditorSummaryInput && newsEditorSummaryInput.value || "").trim();
  }

  function renderNewsManagementList() {
    if (!newsItemsList) return;
    var query = String((filterHomeNewsInput && filterHomeNewsInput.value) || "").trim().toLowerCase();
    var items = getNewsNodes();
    if (!items.length && homeContentCache && Array.isArray(homeContentCache.news) && homeContentCache.news.length) {
      newsList.innerHTML = "";
      homeContentCache.news.forEach(function (item) {
        newsList.appendChild(createNewsItem(item));
      });
      items = getNewsNodes();
    }
    newsItemsList.innerHTML = "";
    items.forEach(function (node, index) {
      var uid = ensureNodeUid(node);
      var title = String(node.querySelector('[data-field="title"]').value || "").trim();
      var dateLabel = String(node.querySelector('[data-field="dateLabel"]').value || "").trim();
      var summary = String(node.querySelector('[data-field="summary"]').value || "").trim();
      var isActive = node.dataset.active !== "false";
      var haystack = (title + " " + summary).toLowerCase();
      if (query && haystack.indexOf(query) === -1) return;

      var row = document.createElement("div");
      row.className = "w-full p-3 rounded-xl border border-slate-200 bg-white hover:border-primary/40 hover:shadow-sm transition-all";

      var topLine = document.createElement("div");
      topLine.className = "flex items-center justify-between gap-3";

      var contentBtn = document.createElement("button");
      contentBtn.type = "button";
      contentBtn.className = "flex-1 min-w-0 text-left";
      contentBtn.innerHTML =
        '<p class="text-sm font-bold text-slate-900 truncate">' + (title || "Без заголовка") + "</p>" +
        '<p class="text-xs text-slate-500 mt-1 line-clamp-2">' + (summary || "Без описания") + "</p>";
      contentBtn.addEventListener("click", function () {
        openNewsEditor(index);
      });

      var actions = document.createElement("div");
      actions.className = "flex items-center gap-2 shrink-0";

      var check = document.createElement("input");
      check.type = "checkbox";
      check.className =
        "h-4 w-4 rounded border-slate-300 accent-slate-700 focus:outline-none focus:ring-0 focus:ring-offset-0" +
        (showNewsSelection ? "" : " hidden");
      check.checked = selectedNewsUids.has(uid);
      check.addEventListener("change", function () {
        if (check.checked) selectedNewsUids.add(uid);
        else selectedNewsUids.delete(uid);
      });

      var dateBadge = document.createElement("span");
      dateBadge.className = "text-[10px] font-semibold text-slate-500 whitespace-nowrap mr-1";
      dateBadge.textContent = dateLabel || "Без даты";

      var stateBadge = document.createElement("span");
      stateBadge.className =
        "inline-block w-2.5 h-2.5 rounded-full mr-1 " +
        (isActive ? "bg-emerald-500" : "bg-rose-500");
      stateBadge.title = isActive ? "Активна" : "Неактивна";

      actions.appendChild(dateBadge);
      actions.appendChild(stateBadge);
      actions.appendChild(check);
      topLine.appendChild(contentBtn);
      topLine.appendChild(actions);
      row.appendChild(topLine);
      newsItemsList.appendChild(row);
    });

    if (!newsItemsList.children.length) {
      var empty = document.createElement("p");
      empty.className = "text-xs text-slate-400 py-2";
      empty.textContent = "Новости не найдены.";
      newsItemsList.appendChild(empty);
    }
  }

  function getServiceNodes() {
    return Array.prototype.slice.call(serviceList.querySelectorAll(".banner-item"));
  }

  function getHeroNodes() {
    return Array.prototype.slice.call(heroSlideList.querySelectorAll(".banner-item"));
  }

  function getAnnouncementNodes() {
    return Array.prototype.slice.call(announcementList.querySelectorAll(".banner-item"));
  }

  function toggleEditor(listScreen, editorScreen, open) {
    if (listScreen) {
      listScreen.hidden = !!open;
      listScreen.classList.toggle("hidden", !!open);
    }
    if (editorScreen) {
      editorScreen.hidden = !open;
      editorScreen.classList.toggle("hidden", !open);
    }
  }

  function renderSimpleManagementList(options) {
    var nodes = options.getNodes();
    var query = String((options.filterInput && options.filterInput.value) || "").trim().toLowerCase();
    options.itemsRoot.innerHTML = "";
    nodes.forEach(function (node, index) {
      var uid = ensureNodeUid(node);
      var title = String(node.querySelector(options.titleField).value || "").trim();
      var subtitle = options.subtitleField ? String(node.querySelector(options.subtitleField).value || "").trim() : "";
      var isActive = node.dataset.active !== "false";
      var searchText = (title + " " + subtitle).toLowerCase();
      if (query && searchText.indexOf(query) === -1) return;

      var row = document.createElement("div");
      row.className = "w-full p-3 rounded-xl border border-slate-200 bg-white hover:border-primary/40 hover:shadow-sm transition-all";
      row.innerHTML =
        '<div class="flex items-center justify-between gap-3">' +
        '<button type="button" class="js-open flex-1 min-w-0 text-left">' +
        '<p class="text-sm font-bold text-slate-900 truncate">' + (title || options.emptyTitle) + "</p>" +
        '<p class="text-xs text-slate-500 mt-1 line-clamp-2">' + (subtitle || options.emptySubtitle) + "</p>" +
        "</button>" +
        '<div class="flex items-center gap-2 shrink-0">' +
        '<span class="js-state text-[10px] font-semibold whitespace-nowrap mr-1"></span>' +
        '<input type="checkbox" class="js-select h-4 w-4 rounded border-slate-300 accent-slate-700 focus:outline-none focus:ring-0 focus:ring-offset-0' +
        (options.showSelection ? "" : " hidden") +
        '"/>' +
        "</div>" +
        "</div>";
      var selectEl = row.querySelector(".js-select");
      selectEl.checked = options.selectedSet.has(uid);
      selectEl.addEventListener("change", function () {
        if (selectEl.checked) options.selectedSet.add(uid);
        else options.selectedSet.delete(uid);
      });
      var stateEl = row.querySelector(".js-state");
      stateEl.textContent = "";
      stateEl.className =
        "js-state inline-block w-2.5 h-2.5 rounded-full mr-1 " +
        (isActive ? "bg-emerald-500" : "bg-rose-500");
      stateEl.title = isActive ? "Активна" : "Неактивна";
      row.querySelector(".js-open").addEventListener("click", function () {
        options.openEditor(index);
      });
      options.itemsRoot.appendChild(row);
    });

    if (!options.itemsRoot.children.length) {
      var empty = document.createElement("p");
      empty.className = "text-xs text-slate-400 py-2";
      empty.textContent = options.notFoundText;
      options.itemsRoot.appendChild(empty);
    }
  }

  function closeServiceEditor() {
    currentEditingServiceIndex = -1;
    toggleEditor(serviceListScreen, serviceEditorScreen, false);
  }

  function openServiceEditor(index) {
    var nodes = getServiceNodes();
    if (index < 0 || index >= nodes.length) return;
    currentEditingServiceIndex = index;
    var node = nodes[index];
    if (serviceEditorLabelInput) serviceEditorLabelInput.value = node.querySelector('[data-field="label"]').value || "";
    if (serviceEditorHrefInput) serviceEditorHrefInput.value = node.querySelector('[data-field="href"]').value || "";
    if (serviceEditorImageInput) serviceEditorImageInput.value = node.querySelector('[data-field="imageSrc"]').value || "";
    if (serviceEditorAltInput) serviceEditorAltInput.value = node.querySelector('[data-field="imageAlt"]').value || "";
    toggleEditor(serviceListScreen, serviceEditorScreen, true);
  }

  function applyServiceEditorChanges() {
    var nodes = getServiceNodes();
    if (currentEditingServiceIndex < 0 || currentEditingServiceIndex >= nodes.length) return;
    var node = nodes[currentEditingServiceIndex];
    node.querySelector('[data-field="label"]').value = (serviceEditorLabelInput && serviceEditorLabelInput.value || "").trim();
    node.querySelector('[data-field="href"]').value = (serviceEditorHrefInput && serviceEditorHrefInput.value || "").trim();
    node.querySelector('[data-field="imageSrc"]').value = (serviceEditorImageInput && serviceEditorImageInput.value || "").trim();
    node.querySelector('[data-field="imageAlt"]').value = (serviceEditorAltInput && serviceEditorAltInput.value || "").trim();
  }

  function renderServiceManagementList() {
    if (!serviceItemsList) return;
    renderSimpleManagementList({
      getNodes: getServiceNodes,
      filterInput: filterServicesInput,
      selectedSet: selectedServiceUids,
      showSelection: showServiceSelection,
      itemsRoot: serviceItemsList,
      titleField: '[data-field="label"]',
      subtitleField: '[data-field="href"]',
      emptyTitle: "Без названия",
      emptySubtitle: "Без ссылки",
      openEditor: openServiceEditor,
      closeEditor: closeServiceEditor,
      renderList: renderServiceManagementList,
      confirmText: "Удалить этот сервис?",
      deletedStatus: "Сервис удален. Нажмите «Сохранить контент главной».",
      notFoundText: "Сервисы не найдены.",
    });
  }

  function closeHeroEditor() {
    currentEditingHeroIndex = -1;
    toggleEditor(heroListScreen, heroEditorScreen, false);
  }

  function openHeroEditor(index) {
    var nodes = getHeroNodes();
    if (index < 0 || index >= nodes.length) return;
    currentEditingHeroIndex = index;
    var node = nodes[index];
    if (heroEditorTitleInput) heroEditorTitleInput.value = node.querySelector('[data-field="title"]').value || "";
    if (heroEditorSubtitleInput) heroEditorSubtitleInput.value = node.querySelector('[data-field="subtitle"]').value || "";
    if (heroEditorHrefInput) heroEditorHrefInput.value = node.querySelector('[data-field="href"]').value || "";
    if (heroEditorVideoInput) heroEditorVideoInput.value = node.querySelector('[data-field="videoSrc"]').value || "";
    if (heroEditorVideoLabelInput) heroEditorVideoLabelInput.value = node.querySelector('[data-field="videoLabel"]').value || "";
    toggleEditor(heroListScreen, heroEditorScreen, true);
  }

  function applyHeroEditorChanges() {
    var nodes = getHeroNodes();
    if (currentEditingHeroIndex < 0 || currentEditingHeroIndex >= nodes.length) return;
    var node = nodes[currentEditingHeroIndex];
    node.querySelector('[data-field="title"]').value = (heroEditorTitleInput && heroEditorTitleInput.value || "").trim();
    node.querySelector('[data-field="subtitle"]').value = (heroEditorSubtitleInput && heroEditorSubtitleInput.value || "").trim();
    node.querySelector('[data-field="href"]').value = (heroEditorHrefInput && heroEditorHrefInput.value || "").trim();
    node.querySelector('[data-field="videoSrc"]').value = (heroEditorVideoInput && heroEditorVideoInput.value || "").trim();
    node.querySelector('[data-field="videoLabel"]').value = (heroEditorVideoLabelInput && heroEditorVideoLabelInput.value || "").trim();
  }

  function renderHeroManagementList() {
    if (!heroItemsList) return;
    renderSimpleManagementList({
      getNodes: getHeroNodes,
      filterInput: filterHeroSlidesInput,
      selectedSet: selectedHeroUids,
      showSelection: showHeroSelection,
      itemsRoot: heroItemsList,
      titleField: '[data-field="title"]',
      subtitleField: '[data-field="subtitle"]',
      emptyTitle: "Без заголовка",
      emptySubtitle: "Без подзаголовка",
      openEditor: openHeroEditor,
      closeEditor: closeHeroEditor,
      renderList: renderHeroManagementList,
      confirmText: "Удалить этот hero-слайд?",
      deletedStatus: "Hero-слайд удален. Нажмите «Сохранить контент главной».",
      notFoundText: "Hero-слайды не найдены.",
    });
  }

  function closeAnnouncementEditor() {
    currentEditingAnnouncementIndex = -1;
    toggleEditor(announcementListScreen, announcementEditorScreen, false);
  }

  function openAnnouncementEditor(index) {
    var nodes = getAnnouncementNodes();
    if (index < 0 || index >= nodes.length) return;
    currentEditingAnnouncementIndex = index;
    var node = nodes[index];
    if (announcementEditorTitleInput) announcementEditorTitleInput.value = node.querySelector('[data-field="title"]').value || "";
    if (announcementEditorHrefInput) announcementEditorHrefInput.value = node.querySelector('[data-field="href"]').value || "";
    if (announcementEditorSummaryInput) announcementEditorSummaryInput.value = node.querySelector('[data-field="summary"]').value || "";
    toggleEditor(announcementListScreen, announcementEditorScreen, true);
  }

  function applyAnnouncementEditorChanges() {
    var nodes = getAnnouncementNodes();
    if (currentEditingAnnouncementIndex < 0 || currentEditingAnnouncementIndex >= nodes.length) return;
    var node = nodes[currentEditingAnnouncementIndex];
    node.querySelector('[data-field="title"]').value = (announcementEditorTitleInput && announcementEditorTitleInput.value || "").trim();
    node.querySelector('[data-field="href"]').value = (announcementEditorHrefInput && announcementEditorHrefInput.value || "").trim();
    node.querySelector('[data-field="summary"]').value = (announcementEditorSummaryInput && announcementEditorSummaryInput.value || "").trim();
  }

  function renderAnnouncementManagementList() {
    if (!announcementItemsList) return;
    renderSimpleManagementList({
      getNodes: getAnnouncementNodes,
      filterInput: filterHomeAnnouncementsInput,
      selectedSet: selectedAnnouncementUids,
      showSelection: showAnnouncementSelection,
      itemsRoot: announcementItemsList,
      titleField: '[data-field="title"]',
      subtitleField: '[data-field="summary"]',
      emptyTitle: "Без заголовка",
      emptySubtitle: "Без текста",
      openEditor: openAnnouncementEditor,
      closeEditor: closeAnnouncementEditor,
      renderList: renderAnnouncementManagementList,
      confirmText: "Удалить это объявление?",
      deletedStatus: "Объявление удалено. Нажмите «Сохранить контент главной».",
      notFoundText: "Объявления не найдены.",
    });
  }

  function markAllSelected(getNodes, selectedSet) {
    selectedSet.clear();
    getNodes().forEach(function (node) {
      selectedSet.add(ensureNodeUid(node));
    });
  }

  function clearAllSelected(selectedSet) {
    selectedSet.clear();
  }

  function bulkSetActive(getNodes, selectedSet, activeValue) {
    getNodes().forEach(function (node) {
      if (selectedSet.has(ensureNodeUid(node))) {
        node.dataset.active = activeValue ? "true" : "false";
      }
    });
  }

  function bulkDelete(getNodes, selectedSet) {
    getNodes().forEach(function (node) {
      if (selectedSet.has(ensureNodeUid(node))) {
        node.remove();
      }
    });
    selectedSet.clear();
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
      var payload = { id: item.dataset.id || "", active: item.dataset.active !== "false" };
      fields.forEach(function (field) {
        var input = item.querySelector('[data-field="' + field + '"]');
        payload[field] = input ? input.value.trim() : "";
      });
      return payload;
    });
  }

  function fillHomeContent(content) {
    homeContentCache = content || {};
    showNewsSelection = false;
    showServiceSelection = false;
    showHeroSelection = false;
    showAnnouncementSelection = false;
    selectedNewsUids.clear();
    selectedServiceUids.clear();
    selectedHeroUids.clear();
    selectedAnnouncementUids.clear();
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
    closeNewsEditor();
    closeServiceEditor();
    closeHeroEditor();
    closeAnnouncementEditor();
    renderNewsManagementList();
    renderServiceManagementList();
    renderHeroManagementList();
    renderAnnouncementManagementList();
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
    if (on) {
      activatePanel("section-general");
      renderNewsManagementList();
    }
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

  if (addNewsBtn) {
    addNewsBtn.addEventListener("click", function () {
      newsList.appendChild(
        createNewsItem({
          dateIso: new Date().toISOString().slice(0, 10),
        })
      );
      renderNewsManagementList();
      openNewsEditor(getNewsNodes().length - 1);
    });
  }

  addAnnouncementBtn.addEventListener("click", function () {
    announcementList.appendChild(createAnnouncementItem({}));
    renderAnnouncementManagementList();
    openAnnouncementEditor(getAnnouncementNodes().length - 1);
  });

  addHeroSlideBtn.addEventListener("click", function () {
    heroSlideList.appendChild(createHeroSlideItem({}));
    renderHeroManagementList();
    openHeroEditor(getHeroNodes().length - 1);
  });

  addServiceBtn.addEventListener("click", function () {
    serviceList.appendChild(createServiceItem({}));
    renderServiceManagementList();
    openServiceEditor(getServiceNodes().length - 1);
  });

  addNewsPageItemBtn.addEventListener("click", function () {
    newsPageFeedList.appendChild(createNewsPageFeedItem({}));
  });

  addAntikorrDocBtn.addEventListener("click", function () {
    antikorrDocumentsList.appendChild(createAntikorrDocumentItem({}));
  });

  if (filterServicesInput) {
    filterServicesInput.addEventListener("input", function () {
      renderServiceManagementList();
    });
  }
  if (filterHeroSlidesInput) {
    filterHeroSlidesInput.addEventListener("input", function () {
      renderHeroManagementList();
    });
  }
  if (filterHomeNewsInput) {
    filterHomeNewsInput.addEventListener("input", function () {
      renderNewsManagementList();
    });
  }
  if (filterHomeAnnouncementsInput) {
    filterHomeAnnouncementsInput.addEventListener("input", function () {
      renderAnnouncementManagementList();
    });
  }
  bindFilter(filterNewsPageFeedInput, newsPageFeedList);
  bindFilter(filterAntikorrDocsInput, antikorrDocumentsList);

  if (newsEditorBackBtn) {
    newsEditorBackBtn.addEventListener("click", function () {
      applyNewsEditorChanges();
      closeNewsEditor();
      renderNewsManagementList();
    });
  }

  if (newsEditorBackBtnBottom) {
    newsEditorBackBtnBottom.addEventListener("click", function () {
      applyNewsEditorChanges();
      closeNewsEditor();
      renderNewsManagementList();
    });
  }

  if (newsEditorApplyBtn) {
    newsEditorApplyBtn.addEventListener("click", function () {
      applyNewsEditorChanges();
      renderNewsManagementList();
      setStatus("Новость обновлена локально. Нажмите «Сохранить контент главной».", false);
    });
  }

  if (newsEditorDeleteBtn) {
    newsEditorDeleteBtn.addEventListener("click", function () {
      var items = getNewsNodes();
      if (currentEditingNewsIndex < 0 || currentEditingNewsIndex >= items.length) return;
      items[currentEditingNewsIndex].remove();
      closeNewsEditor();
      renderNewsManagementList();
      setStatus("Новость удалена локально. Нажмите «Сохранить контент главной».", false);
    });
  }

  if (serviceEditorBackBtn) {
    serviceEditorBackBtn.addEventListener("click", function () {
      applyServiceEditorChanges();
      closeServiceEditor();
      renderServiceManagementList();
    });
  }
  if (serviceEditorApplyBtn) {
    serviceEditorApplyBtn.addEventListener("click", function () {
      applyServiceEditorChanges();
      renderServiceManagementList();
      setStatus("Сервис обновлен. Нажмите «Сохранить контент главной».", false);
    });
  }
  if (serviceEditorDeleteBtn) {
    serviceEditorDeleteBtn.addEventListener("click", function () {
      var nodes = getServiceNodes();
      if (currentEditingServiceIndex < 0 || currentEditingServiceIndex >= nodes.length) return;
      if (!window.confirm("Удалить этот сервис?")) return;
      nodes[currentEditingServiceIndex].remove();
      closeServiceEditor();
      renderServiceManagementList();
      setStatus("Сервис удален. Нажмите «Сохранить контент главной».", false);
    });
  }

  if (heroEditorBackBtn) {
    heroEditorBackBtn.addEventListener("click", function () {
      applyHeroEditorChanges();
      closeHeroEditor();
      renderHeroManagementList();
    });
  }
  if (heroEditorApplyBtn) {
    heroEditorApplyBtn.addEventListener("click", function () {
      applyHeroEditorChanges();
      renderHeroManagementList();
      setStatus("Hero-слайд обновлен. Нажмите «Сохранить контент главной».", false);
    });
  }
  if (heroEditorDeleteBtn) {
    heroEditorDeleteBtn.addEventListener("click", function () {
      var nodes = getHeroNodes();
      if (currentEditingHeroIndex < 0 || currentEditingHeroIndex >= nodes.length) return;
      if (!window.confirm("Удалить этот hero-слайд?")) return;
      nodes[currentEditingHeroIndex].remove();
      closeHeroEditor();
      renderHeroManagementList();
      setStatus("Hero-слайд удален. Нажмите «Сохранить контент главной».", false);
    });
  }

  if (announcementEditorBackBtn) {
    announcementEditorBackBtn.addEventListener("click", function () {
      applyAnnouncementEditorChanges();
      closeAnnouncementEditor();
      renderAnnouncementManagementList();
    });
  }
  if (announcementEditorApplyBtn) {
    announcementEditorApplyBtn.addEventListener("click", function () {
      applyAnnouncementEditorChanges();
      renderAnnouncementManagementList();
      setStatus("Объявление обновлено. Нажмите «Сохранить контент главной».", false);
    });
  }
  if (announcementEditorDeleteBtn) {
    announcementEditorDeleteBtn.addEventListener("click", function () {
      var nodes = getAnnouncementNodes();
      if (currentEditingAnnouncementIndex < 0 || currentEditingAnnouncementIndex >= nodes.length) return;
      if (!window.confirm("Удалить это объявление?")) return;
      nodes[currentEditingAnnouncementIndex].remove();
      closeAnnouncementEditor();
      renderAnnouncementManagementList();
      setStatus("Объявление удалено. Нажмите «Сохранить контент главной».", false);
    });
  }

  if (newsSelectAllBtn) {
    newsSelectAllBtn.addEventListener("click", function () {
      showNewsSelection = !showNewsSelection;
      if (showNewsSelection) {
        markAllSelected(getNewsNodes, selectedNewsUids);
      } else {
        clearAllSelected(selectedNewsUids);
      }
      renderNewsManagementList();
    });
  }
  if (newsBulkDeleteBtn) {
    newsBulkDeleteBtn.addEventListener("click", function () {
      if (!window.confirm("Удалить выбранные новости?")) return;
      bulkDelete(getNewsNodes, selectedNewsUids);
      closeNewsEditor();
      renderNewsManagementList();
    });
  }
  if (newsBulkActivateBtn) {
    newsBulkActivateBtn.addEventListener("click", function () {
      bulkSetActive(getNewsNodes, selectedNewsUids, true);
      renderNewsManagementList();
    });
  }
  if (newsBulkDeactivateBtn) {
    newsBulkDeactivateBtn.addEventListener("click", function () {
      bulkSetActive(getNewsNodes, selectedNewsUids, false);
      renderNewsManagementList();
    });
  }
  if (newsBulkAddBtn) {
    newsBulkAddBtn.addEventListener("click", function () {
      newsList.appendChild(
        createNewsItem({
          dateIso: new Date().toISOString().slice(0, 10),
        })
      );
      renderNewsManagementList();
      openNewsEditor(getNewsNodes().length - 1);
    });
  }

  if (serviceSelectAllBtn) {
    serviceSelectAllBtn.addEventListener("click", function () {
      showServiceSelection = !showServiceSelection;
      if (showServiceSelection) {
        markAllSelected(getServiceNodes, selectedServiceUids);
      } else {
        clearAllSelected(selectedServiceUids);
      }
      renderServiceManagementList();
    });
  }
  if (serviceBulkDeleteBtn) {
    serviceBulkDeleteBtn.addEventListener("click", function () {
      if (!window.confirm("Удалить выбранные сервисы?")) return;
      bulkDelete(getServiceNodes, selectedServiceUids);
      closeServiceEditor();
      renderServiceManagementList();
    });
  }
  if (serviceBulkActivateBtn) {
    serviceBulkActivateBtn.addEventListener("click", function () {
      bulkSetActive(getServiceNodes, selectedServiceUids, true);
      renderServiceManagementList();
    });
  }
  if (serviceBulkDeactivateBtn) {
    serviceBulkDeactivateBtn.addEventListener("click", function () {
      bulkSetActive(getServiceNodes, selectedServiceUids, false);
      renderServiceManagementList();
    });
  }
  if (serviceBulkAddBtn) {
    serviceBulkAddBtn.addEventListener("click", function () {
      addServiceBtn.click();
    });
  }

  if (heroSelectAllBtn) {
    heroSelectAllBtn.addEventListener("click", function () {
      showHeroSelection = !showHeroSelection;
      if (showHeroSelection) {
        markAllSelected(getHeroNodes, selectedHeroUids);
      } else {
        clearAllSelected(selectedHeroUids);
      }
      renderHeroManagementList();
    });
  }
  if (heroBulkDeleteBtn) {
    heroBulkDeleteBtn.addEventListener("click", function () {
      if (!window.confirm("Удалить выбранные hero-слайды?")) return;
      bulkDelete(getHeroNodes, selectedHeroUids);
      closeHeroEditor();
      renderHeroManagementList();
    });
  }
  if (heroBulkActivateBtn) {
    heroBulkActivateBtn.addEventListener("click", function () {
      bulkSetActive(getHeroNodes, selectedHeroUids, true);
      renderHeroManagementList();
    });
  }
  if (heroBulkDeactivateBtn) {
    heroBulkDeactivateBtn.addEventListener("click", function () {
      bulkSetActive(getHeroNodes, selectedHeroUids, false);
      renderHeroManagementList();
    });
  }
  if (heroBulkAddBtn) {
    heroBulkAddBtn.addEventListener("click", function () {
      addHeroSlideBtn.click();
    });
  }

  if (announcementSelectAllBtn) {
    announcementSelectAllBtn.addEventListener("click", function () {
      showAnnouncementSelection = !showAnnouncementSelection;
      if (showAnnouncementSelection) {
        markAllSelected(getAnnouncementNodes, selectedAnnouncementUids);
      } else {
        clearAllSelected(selectedAnnouncementUids);
      }
      renderAnnouncementManagementList();
    });
  }
  if (announcementBulkDeleteBtn) {
    announcementBulkDeleteBtn.addEventListener("click", function () {
      if (!window.confirm("Удалить выбранные объявления?")) return;
      bulkDelete(getAnnouncementNodes, selectedAnnouncementUids);
      closeAnnouncementEditor();
      renderAnnouncementManagementList();
    });
  }
  if (announcementBulkActivateBtn) {
    announcementBulkActivateBtn.addEventListener("click", function () {
      bulkSetActive(getAnnouncementNodes, selectedAnnouncementUids, true);
      renderAnnouncementManagementList();
    });
  }
  if (announcementBulkDeactivateBtn) {
    announcementBulkDeactivateBtn.addEventListener("click", function () {
      bulkSetActive(getAnnouncementNodes, selectedAnnouncementUids, false);
      renderAnnouncementManagementList();
    });
  }
  if (announcementBulkAddBtn) {
    announcementBulkAddBtn.addEventListener("click", function () {
      addAnnouncementBtn.click();
    });
  }

  homeContentForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    try {
      // Flush any open inline editors so their unsaved changes are not lost on save
      if (currentEditingNewsIndex >= 0) applyNewsEditorChanges();
      if (currentEditingServiceIndex >= 0) applyServiceEditorChanges();
      if (currentEditingHeroIndex >= 0) applyHeroEditorChanges();
      if (currentEditingAnnouncementIndex >= 0) applyAnnouncementEditorChanges();

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
          services: readItems(serviceList, ["label", "href", "imageSrc", "imageAlt"]).filter(function (i) { return i.active; }),
          heroSlides: readItems(heroSlideList, ["title", "subtitle", "href", "videoSrc", "videoLabel"]).filter(function (i) { return i.active; }),
          news: readItems(newsList, ["title", "href", "dateIso", "dateLabel", "summary"]).filter(function (i) { return i.active; }),
          announcements: readItems(announcementList, ["title", "href", "summary"]).filter(function (i) { return i.active; }),
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
