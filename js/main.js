(function () {
  var storeUrl = typeof APP_STORE_URL === "string" ? APP_STORE_URL.trim() : "#";
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var mobileQuery = window.matchMedia("(max-width: 860px)");

  var nav = document.querySelector(".nav");
  var toggle = document.querySelector(".nav-toggle");
  var panel = document.getElementById("nav-panel");
  var toast = document.querySelector(".toast");
  var toastTimer = 0;

  function isLiveStoreUrl(url) {
    return /^https?:\/\//i.test(url);
  }

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("is-on");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      toast.classList.remove("is-on");
    }, 4800);
  }

  document.querySelectorAll("[data-store-link]").forEach(function (link) {
    if (isLiveStoreUrl(storeUrl)) {
      link.href = storeUrl;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      return;
    }

    link.href = "#";
    link.setAttribute("aria-label", "Download on the App Store, coming soon");
    link.addEventListener("click", function (event) {
      event.preventDefault();
      showToast("Coming soon. This button opens the App Store the day Puttriot ships.");
    });
  });

  function syncPanel() {
    if (!panel) return;
    var mobile = mobileQuery.matches;
    var open = nav.classList.contains("is-open");
    if ("inert" in panel) panel.inert = mobile && !open;
    panel.setAttribute("aria-hidden", mobile && !open ? "true" : "false");
  }

  function setMenu(open) {
    if (!nav || !toggle) return;
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    var label = toggle.querySelector(".sr-only");
    if (label) label.textContent = open ? "Close menu" : "Open menu";
    document.body.classList.toggle("menu-lock", open && mobileQuery.matches);
    syncPanel();
    if (open) {
      var first = panel.querySelector("a");
      if (first) first.focus();
    }
  }

  if (toggle && panel) {
    toggle.addEventListener("click", function () {
      setMenu(!nav.classList.contains("is-open"));
    });

    panel.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        if (mobileQuery.matches) setMenu(false);
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        setMenu(false);
        toggle.focus();
      }
    });

    toggle.addEventListener("keydown", function (event) {
      if (event.key !== "Tab" || !nav.classList.contains("is-open") || !mobileQuery.matches) return;
      if (!event.shiftKey) return;
      var links = panel.querySelectorAll("a");
      if (!links.length) return;
      event.preventDefault();
      links[links.length - 1].focus();
    });

    panel.addEventListener("keydown", function (event) {
      if (event.key !== "Tab" || !mobileQuery.matches || !nav.classList.contains("is-open")) return;
      var links = panel.querySelectorAll("a");
      if (!links.length) return;
      var first = links[0];
      var last = links[links.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        toggle.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        toggle.focus();
      }
    });

    mobileQuery.addEventListener("change", function () {
      if (!mobileQuery.matches) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("menu-lock");
        var label = toggle.querySelector(".sr-only");
        if (label) label.textContent = "Open menu";
      }
      syncPanel();
    });

    syncPanel();
  }

  function onScroll() {
    if (!nav) return;
    nav.classList.toggle("is-stuck", window.scrollY > 12);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  var revealables = document.querySelectorAll(".reveal, .phone");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealables.forEach(function (el) { el.classList.add("is-in"); });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.22, rootMargin: "0px 0px -6% 0px" });
    revealables.forEach(function (el) { observer.observe(el); });
  }
})();
