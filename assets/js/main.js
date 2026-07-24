/* Tables — progressive enhancement.
   Core content works without JS; this adds the accordion, the decorative
   mastery grid, scroll-reveal, and runtime email assembly. */
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  /* ---- Email: assembled at runtime to reduce scraping ------------------- */
  function emailAddress() {
    var user = ["c", "o", "l", "i", "n"].join("");
    var domain = ["challengr", "io"].join(".");
    return user + String.fromCharCode(64) + domain;
  }

  function wireEmails() {
    var addr = emailAddress();
    var links = document.querySelectorAll("[data-email]");
    for (var i = 0; i < links.length; i++) {
      var el = links[i];
      el.textContent = addr;
      el.setAttribute("href", "mailto:" + addr);
    }
  }

  /* ---- FAQ accordion ---------------------------------------------------- */
  function wireFaq() {
    var items = document.querySelectorAll(".faq-item");
    for (var i = 0; i < items.length; i++) {
      (function (item) {
        var btn = item.querySelector(".faq-item__q");
        if (!btn) return;
        btn.addEventListener("click", function () {
          var isOpen = item.classList.contains("is-open");
          // Close all, then open this one if it was closed (single-open accordion).
          var all = document.querySelectorAll(".faq-item");
          for (var j = 0; j < all.length; j++) {
            all[j].classList.remove("is-open");
            var b = all[j].querySelector(".faq-item__q");
            if (b) b.setAttribute("aria-expanded", "false");
          }
          if (!isOpen) {
            item.classList.add("is-open");
            btn.setAttribute("aria-expanded", "true");
          }
        });
      })(items[i]);
    }
  }

  /* ---- Mastery grid (decorative) ---------------------------------------
     Reproduces the deterministic fill pattern from the source design so the
     grid looks identical without any real practice data. */
  function buildMastery() {
    var host = document.getElementById("mastery-grid");
    if (!host) return;

    function state(r, c) {
      var h = (r * 31 + c * 17) % 10;
      if (r <= 5 || h > 7) return "m";
      if (h > 4) return "l";
      return "n";
    }

    var frag = document.createDocumentFragment();

    // top-left empty corner
    frag.appendChild(document.createElement("div"));

    // column headers 1..12
    for (var c = 1; c <= 12; c++) {
      var ch = document.createElement("div");
      ch.className = "head head--col";
      ch.textContent = c;
      frag.appendChild(ch);
    }

    // rows
    for (var r = 1; r <= 12; r++) {
      var rh = document.createElement("div");
      rh.className = "head head--row";
      rh.textContent = r;
      frag.appendChild(rh);
      for (var cc = 1; cc <= 12; cc++) {
        var cell = document.createElement("div");
        cell.className = "cell cell--" + state(r, cc);
        frag.appendChild(cell);
      }
    }

    host.appendChild(frag);
  }

  /* ---- Scroll reveal ---------------------------------------------------- */
  function wireReveal() {
    var els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window) || !els.length) {
      for (var i = 0; i < els.length; i++) els[i].classList.add("is-visible");
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    for (var j = 0; j < els.length; j++) io.observe(els[j]);
  }

  function init() {
    wireEmails();
    wireFaq();
    buildMastery();
    wireReveal();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
