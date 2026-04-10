(function () {
  "use strict";

  var menuToggle = document.querySelector(".menu-toggle");
  var mainNav = document.querySelector(".main-nav");
  var navWrap = document.querySelector(".nav-wrap");
  var mqMobile = window.matchMedia("(max-width: 1024px)");

  function closeTopBarDropdowns() {
    document.querySelectorAll(".top-bar .has-dropdown.is-open").forEach(function (d) {
      d.classList.remove("is-open");
    });
    document.querySelectorAll(".top-bar .has-dropdown > button").forEach(function (b) {
      b.setAttribute("aria-expanded", "false");
    });
  }

  function bindTopBarDropdowns() {
    document.querySelectorAll(".top-bar .has-dropdown > button").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        var root = btn.closest(".has-dropdown");
        var wasOpen = root.classList.contains("is-open");
        closeTopBarDropdowns();
        if (!wasOpen) {
          root.classList.add("is-open");
          btn.setAttribute("aria-expanded", "true");
        }
      });
    });
  }

  bindTopBarDropdowns();

  document.addEventListener("click", function (e) {
    if (!e.target.closest(".top-bar .has-dropdown")) {
      closeTopBarDropdowns();
    }
    if (menuToggle && mainNav && navWrap && !navWrap.contains(e.target)) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    closeTopBarDropdowns();
    if (menuToggle && mainNav && mainNav.classList.contains("is-open")) {
      closeMenu();
      menuToggle.focus();
    }
  });

  function setMenuOpen(open) {
    if (!menuToggle || !mainNav) return;
    if (open) {
      closeTopBarDropdowns();
      mainNav.classList.add("is-open");
      menuToggle.setAttribute("aria-expanded", "true");
      menuToggle.setAttribute("aria-label", "Закрыть меню");
    } else {
      mainNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Открыть меню");
    }
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", function (e) {
      e.stopPropagation();
      var open = !mainNav.classList.contains("is-open");
      setMenuOpen(open);
    });

    function onViewportChange() {
      if (!mqMobile.matches) {
        closeMenu();
      }
    }

    if (mqMobile.addEventListener) {
      mqMobile.addEventListener("change", onViewportChange);
    } else {
      mqMobile.addListener(onViewportChange);
    }

    mainNav.addEventListener("click", function (e) {
      if (!mqMobile.matches) return;
      var a = e.target.closest("a[href]");
      if (!a || !mainNav.contains(a)) return;
      var href = a.getAttribute("href");
      if (!href || href === "#") return;
      var li = a.closest(".main-nav > ul > li");
      if (!li) return;
      var topLink = li.querySelector(":scope > a");
      var submenu = li.querySelector(":scope > .submenu");
      if (submenu && a === topLink) {
        return;
      }
      closeMenu();
    });
  }

  function bindMobileSubmenus() {
    var items = document.querySelectorAll(".main-nav > ul > li");
    items.forEach(function (li) {
      var submenu = li.querySelector(":scope > .submenu");
      var link = li.querySelector(":scope > a[href]");
      if (!submenu || !link || link.dataset.mobileSub === "1") return;
      link.dataset.mobileSub = "1";
      link.addEventListener("click", function (e) {
        if (!mqMobile.matches) return;
        e.preventDefault();
        var opening = !li.classList.contains("submenu-open");
        items.forEach(function (other) {
          other.classList.remove("submenu-open");
        });
        if (opening) li.classList.add("submenu-open");
      });
    });
  }

  bindMobileSubmenus();

  var backTop = document.querySelector(".back-to-top");
  if (backTop) {
    window.addEventListener(
      "scroll",
      function () {
        if (window.scrollY > 400) backTop.classList.add("visible");
        else backTop.classList.remove("visible");
      },
      { passive: true }
    );
    backTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  var revealItems = document.querySelectorAll(".reveal-up");
  if (revealItems.length) {
    var revealFallback = function () {
      revealItems.forEach(function (el) {
        el.classList.add("is-visible");
      });
    };

    if (!("IntersectionObserver" in window)) {
      revealFallback();
    } else {
      var revealObserver = new IntersectionObserver(
        function (entries, obs) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          });
        },
        { rootMargin: "0px 0px -12% 0px", threshold: 0.08 }
      );

      revealItems.forEach(function (el) {
        revealObserver.observe(el);
      });
    }
  }

  function initFaqAccordions() {
    var blocks = document.querySelectorAll(".meters-faq");
    if (!blocks.length) return;

    blocks.forEach(function (block, blockIndex) {
      var headings = Array.prototype.filter.call(block.children, function (el) {
        return el.tagName === "H3";
      });

      if (!headings.length) return;
      block.classList.add("faq-accordion");

      headings.forEach(function (heading, idx) {
        if (!heading.parentNode) return;

        var item = document.createElement("section");
        item.className = "faq-accordion__item";

        var trigger = document.createElement("button");
        trigger.type = "button";
        trigger.className = "faq-accordion__trigger";

        var panel = document.createElement("div");
        panel.className = "faq-accordion__panel";
        panel.hidden = true;

        var panelId = "faq-panel-" + blockIndex + "-" + idx;
        trigger.setAttribute("aria-controls", panelId);
        trigger.setAttribute("aria-expanded", "false");
        panel.id = panelId;

        var title = document.createElement("span");
        title.className = "faq-accordion__title";
        title.textContent = heading.textContent || "";
        trigger.appendChild(title);

        item.appendChild(trigger);
        item.appendChild(panel);
        heading.parentNode.insertBefore(item, heading);

        var node = heading.nextElementSibling;
        while (node && node.tagName !== "H3" && node.tagName !== "H2") {
          var next = node.nextElementSibling;
          panel.appendChild(node);
          node = next;
        }

        heading.remove();

        trigger.addEventListener("click", function () {
          var open = item.classList.contains("is-open");
          item.classList.toggle("is-open", !open);
          trigger.setAttribute("aria-expanded", String(!open));
          panel.hidden = open;
        });
      });
    });
  }

  initFaqAccordions();

  function initHeroCarousel() {
    var root = document.querySelector(".js-hero-carousel");
    if (!root) return;

    var slides = root.querySelectorAll(".hero-carousel__slide");
    var dots = root.querySelectorAll(".hero-carousel__dot");
    var prev = root.querySelector(".js-hero-prev");
    var next = root.querySelector(".js-hero-next");
    if (!slides.length) return;

    var index = 0;
    var timer = null;
    var AUTO_ADVANCE_MS = 15000;

    function queueFallbackAdvance() {
      stop();
      timer = window.setTimeout(function () {
        render(index + 1);
      }, AUTO_ADVANCE_MS);
    }

    function syncHeroVideos() {
      slides.forEach(function (slide, n) {
        var v = slide.querySelector("video");
        if (!v) return;
        v.onended = null;
        if (n === index) {
          try {
            v.currentTime = 0;
          } catch (e) {}
          v.play().catch(function () {});
          v.onended = function () {
            render(index + 1);
          };
        } else {
          v.pause();
          try {
            v.currentTime = 0;
          } catch (e) {}
        }
      });
    }

    function render(i) {
      index = (i + slides.length) % slides.length;
      slides.forEach(function (slide, n) {
        var forwardDist = (n - index + slides.length) % slides.length;
        var backwardDist = (index - n + slides.length) % slides.length;

        slide.classList.remove("is-before", "is-after", "is-active");
        if (n === index) {
          slide.classList.add("is-active");
        } else if (forwardDist <= backwardDist) {
          slide.classList.add("is-after");
        } else {
          slide.classList.add("is-before");
        }
      });
      dots.forEach(function (dot, n) {
        dot.classList.toggle("is-active", n === index);
      });
      syncHeroVideos();
      queueFallbackAdvance();
    }

    function start() {
      queueFallbackAdvance();
    }

    function stop() {
      if (timer) {
        window.clearTimeout(timer);
        timer = null;
      }
    }

    if (prev) {
      prev.addEventListener("click", function () {
        render(index - 1);
      });
    }

    if (next) {
      next.addEventListener("click", function () {
        render(index + 1);
      });
    }

    dots.forEach(function (dot, n) {
      dot.addEventListener("click", function () {
        render(n);
      });
    });

    root.addEventListener("mouseenter", stop);
    root.addEventListener("mouseleave", start);
    root.addEventListener("focusin", stop);
    root.addEventListener("focusout", start);

    render(0);
    start();
  }

  initHeroCarousel();

  /* ——— Поиск по сайту (клиентский индекс из nav-data) ——— */
  function escapeSearchHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function tokenizeSearchQuery(q) {
    var s = String(q || "")
      .toLowerCase()
      .trim();
    var parts;
    try {
      parts = s.split(/[^\p{L}\p{N}]+/u);
    } catch (e) {
      parts = s.split(/[^a-zа-яёәіңғүұқөһ0-9]+/i);
    }
    return parts.filter(function (w) {
      return w.length >= 2;
    });
  }

  function scoreSearchDoc(doc, words) {
    var titleLower = String(doc.title || "").toLowerCase();
    var hay = doc.haystack || "";
    var score = 0;
    var i;
    var w;
    var pos;
    for (i = 0; i < words.length; i++) {
      w = words[i];
      if (hay.indexOf(w) === -1) continue;
      score += 10;
      pos = titleLower.indexOf(w);
      if (pos !== -1) {
        score += 22;
        if (pos === 0) score += 8;
      }
    }
    return score;
  }

  function runSiteSearch(query, limit) {
    var getIdx = window.ALMATY_SU_getSearchIndex;
    if (typeof getIdx !== "function") return [];
    var words = tokenizeSearchQuery(query);
    if (!words.length) return [];
    var docs = getIdx();
    var ranked = [];
    var i;
    var sc;
    for (i = 0; i < docs.length; i++) {
      sc = scoreSearchDoc(docs[i], words);
      if (sc > 0) ranked.push({ doc: docs[i], score: sc });
    }
    ranked.sort(function (a, b) {
      return b.score - a.score;
    });
    if (limit && ranked.length > limit) ranked = ranked.slice(0, limit);
    return ranked;
  }

  function renderSearchResultsHtml(results, query) {
    if (!tokenizeSearchQuery(query).length) {
      return (
        '<p class="search-results__empty">Введите запрос в поле «Поиск» — не менее двух букв или цифр.</p>'
      );
    }
    if (!results.length) {
      return (
        '<p class="search-results__noresults" role="status">По запросу «' +
        escapeSearchHtml(query) +
        "» ничего не найдено. Попробуйте другие слова или проверьте написание.</p>"
      );
    }
    var parts = [];
    parts.push(
      '<p class="search-results__count" role="status">Найдено: ' +
        results.length +
        (results.length === 1 ? " страница" : " страниц") +
        "</p>"
    );
    parts.push('<ul class="search-results__list">');
    var i;
    var r;
    var doc;
    var snippet;
    for (i = 0; i < results.length; i++) {
      r = results[i];
      doc = r.doc;
      snippet = doc.breadcrumbs
        ? escapeSearchHtml(doc.breadcrumbs)
        : "Сайт ГКП «Алматы Су»";
      parts.push(
        '<li class="search-results__item">' +
          '<a href="' +
          escapeSearchHtml(doc.href) +
          '">' +
          '<p class="search-results__title">' +
          escapeSearchHtml(doc.title) +
          "</p>" +
          '<p class="search-results__snippet">' +
          snippet +
          "</p>" +
          "</a>" +
          "</li>"
      );
    }
    parts.push("</ul>");
    return parts.join("");
  }

  function renderSearchPageBlock(root) {
    var params = new URLSearchParams(window.location.search);
    var q = params.get("s") || params.get("q") || "";
    var results = runSiteSearch(q, 0);
    var inner =
      '<form class="search-results__form search-form" role="search" action="search.html" method="get">' +
      '<label class="visually-hidden" for="search-page-query">Запрос</label>' +
      '<input id="search-page-query" type="search" name="s" value="' +
      escapeSearchHtml(q) +
      '" placeholder="Поиск по сайту..." autocomplete="off" />' +
      '<button type="submit" aria-label="Искать">' +
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<circle cx="11" cy="11" r="8"/>' +
      '<path d="m21 21-4.3-4.3"/>' +
      "</svg></button></form>" +
      '<p class="search-results__hint">Поиск выполняется по разделам и названиям страниц. Для коротких запросов используйте не менее двух символов.</p>';
    inner += renderSearchResultsHtml(results, q);
    root.innerHTML = inner;
  }

  function closeSearchSuggestions(list) {
    if (!list) return;
    list.classList.remove("is-open");
    list.innerHTML = "";
    list.removeAttribute("aria-activedescendant");
  }

  function bindNavSearchSuggestions() {
    var form = document.querySelector(".search-form--nav");
    var input = document.getElementById("site-search");
    if (!form || !input) return;

    var slot = document.querySelector(".nav-search-slot");
    if (!slot) return;

    var list = document.getElementById("site-search-suggestions");
    if (!list) {
      list = document.createElement("ul");
      list.id = "site-search-suggestions";
      list.className = "search-suggestions";
      list.setAttribute("role", "listbox");
      list.setAttribute("aria-label", "Подсказки поиска");
      slot.appendChild(list);
    }

    var debounceTimer = null;
    var DEBOUNCE_MS = 220;
    var MAX_SUGGEST = 8;

    function scheduleCloseOthers() {
      document.addEventListener(
        "click",
        function onDoc(e) {
          if (!e.target.closest(".nav-search-slot")) {
            closeSearchSuggestions(list);
            document.removeEventListener("click", onDoc);
          }
        },
        { once: true }
      );
    }

    function openSuggestions(html) {
      list.innerHTML = html;
      if (!html) {
        list.classList.remove("is-open");
        return;
      }
      list.classList.add("is-open");
      scheduleCloseOthers();
    }

    function refreshSuggestions() {
      var q = input.value;
      var ranked = runSiteSearch(q, MAX_SUGGEST);
      if (!tokenizeSearchQuery(q).length) {
        closeSearchSuggestions(list);
        return;
      }
      if (!ranked.length) {
        openSuggestions(
          '<li class="search-suggestions__empty" role="option">Нет совпадений</li>'
        );
        return;
      }
      var html = ranked
        .map(function (r, idx) {
          var d = r.doc;
          var meta = d.breadcrumbs
            ? '<span class="search-suggestions__meta">' + escapeSearchHtml(d.breadcrumbs) + "</span>"
            : "";
          return (
            '<li role="option">' +
            '<a href="' +
            escapeSearchHtml(d.href) +
            '" id="search-sug-' +
            idx +
            '">' +
            escapeSearchHtml(d.title) +
            meta +
            "</a></li>"
          );
        })
        .join("");
      openSuggestions(html);
    }

    input.addEventListener("input", function () {
      if (debounceTimer) window.clearTimeout(debounceTimer);
      debounceTimer = window.setTimeout(function () {
        debounceTimer = null;
        refreshSuggestions();
      }, DEBOUNCE_MS);
    });

    input.addEventListener("focus", function () {
      refreshSuggestions();
    });

    input.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        closeSearchSuggestions(list);
      }
    });

    form.addEventListener("submit", function (e) {
      var q = input.value.trim();
      if (!tokenizeSearchQuery(q).length) {
        e.preventDefault();
        input.focus();
        return;
      }
      closeSearchSuggestions(list);
    });

    list.addEventListener("click", function (e) {
      var a = e.target.closest("a[href]");
      if (!a || !list.contains(a)) return;
      closeSearchSuggestions(list);
      if (menuToggle && mainNav && mqMobile.matches) {
        closeMenu();
      }
    });
  }

  function prefillSearchFromUrl() {
    var input = document.getElementById("site-search");
    if (!input) return;
    if (window.location.pathname.indexOf("search.html") === -1) return;
    var params = new URLSearchParams(window.location.search);
    var q = params.get("s") || params.get("q") || "";
    if (q) input.value = q;
  }

  function initSiteSearch() {
    prefillSearchFromUrl();
    bindNavSearchSuggestions();

    var resultsRoot = document.getElementById("search-results");
    if (resultsRoot && resultsRoot.getAttribute("data-search-page") === "1") {
      renderSearchPageBlock(resultsRoot);
    }
  }

  function initFeedbackForms() {
    var forms = document.querySelectorAll("form.feedback-form[data-form-type]");
    if (!forms.length) return;

    function showFeedback(el, text, isError) {
      if (!el) return;
      el.hidden = false;
      el.textContent = text;
      el.classList.toggle("form-feedback--error", !!isError);
      el.classList.toggle("form-feedback--ok", !isError);
    }

    forms.forEach(function (form) {
      var formType = form.getAttribute("data-form-type");
      if (!formType) return;
      var feedbackEl = form.querySelector(".form-feedback");

      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var btn = form.querySelector('button[type="submit"]');
        if (btn) {
          btn.disabled = true;
          btn.setAttribute("aria-busy", "true");
        }
        if (feedbackEl) {
          feedbackEl.hidden = true;
          feedbackEl.textContent = "";
        }

        var fd = new FormData(form);
        var payload = {
          form: formType,
          name: fd.get("name"),
          email: fd.get("email"),
          message: fd.get("message"),
          website: fd.get("website"),
        };
        if (formType === "question") {
          payload.phone = fd.get("phone");
        }
        if (formType === "lyuk") {
          payload.subject = fd.get("subject");
        }

        fetch("/api/feedback", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
          .then(function (r) {
            return r.text().then(function (text) {
              var data = {};
              if (text) {
                try {
                  data = JSON.parse(text);
                } catch (ignore) {
                  data = {};
                }
              }
              return { ok: r.ok, data: data };
            });
          })
          .then(function (result) {
            if (result.ok && result.data && result.data.ok) {
              showFeedback(
                feedbackEl,
                "Сообщение отправлено. Спасибо за обращение.",
                false
              );
              form.reset();
            } else {
              var msg =
                (result.data && result.data.error) ||
                "Не удалось отправить. Попробуйте позже или позвоните в call-центр.";
              showFeedback(feedbackEl, msg, true);
            }
          })
          .catch(function () {
            showFeedback(
              feedbackEl,
              "Сервер недоступен. Запустите сайт через «npm run server» или позвоните в диспетчерскую.",
              true
            );
          })
          .finally(function () {
            if (btn) {
              btn.disabled = false;
              btn.removeAttribute("aria-busy");
            }
          });
      });
    });
  }

  initSiteSearch();
  initFeedbackForms();
})();
