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
})();
