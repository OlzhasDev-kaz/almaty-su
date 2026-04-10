(function () {
  "use strict";

  var KEY = "almatySuA11yVis";
  var CLS = "is-a11y-vis";

  function apply(on) {
    document.documentElement.classList.toggle(CLS, on);
    document.documentElement.setAttribute("data-a11y-vis", on ? "true" : "false");
    try {
      localStorage.setItem(KEY, on ? "1" : "0");
    } catch (e) {}

    var offLabel = "Включить версию для слабовидящих";
    var onLabel = "Выключить версию для слабовидящих, обычный вид";
    document.querySelectorAll(".js-a11y-toggle").forEach(function (el) {
      el.setAttribute("aria-pressed", on ? "true" : "false");
      el.setAttribute("aria-label", on ? onLabel : offLabel);
      el.setAttribute("title", on ? onLabel : offLabel);
    });
  }

  function readInitial() {
    var q = new URLSearchParams(window.location.search).get("a11y");
    if (q === "1" || q === "on") return true;
    if (q === "0" || q === "off") return false;
    try {
      return localStorage.getItem(KEY) === "1";
    } catch (e) {
      return false;
    }
  }

  apply(readInitial());

  document.addEventListener(
    "click",
    function (e) {
      var t = e.target && e.target.closest ? e.target.closest(".js-a11y-toggle") : null;
      if (!t) return;
      e.preventDefault();
      apply(!document.documentElement.classList.contains(CLS));
    },
    true
  );
})();
