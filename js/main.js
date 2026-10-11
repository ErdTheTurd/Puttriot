(function () {
  var storeUrl = typeof APP_STORE_URL === "string" ? APP_STORE_URL.trim() : "#";
  var contact = typeof CONTACT_EMAIL === "string" ? CONTACT_EMAIL.trim() : "";
  var mobileQuery = window.matchMedia("(max-width: 760px)");
  var nav = document.querySelector(".nav");
  var toggle = document.querySelector(".nav-toggle");
  var panel = document.getElementById("nav-panel");
  var toast = document.querySelector(".toast");
  var toastTimer = 0;

  function isHttp(url) {
    return /^https?:\/\//i.test(url);
  }

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.hidden = false;
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      toast.hidden = true;
    }, 5000);
  }

  document.querySelectorAll("[data-store-link]").forEach(function (link) {
    if (isHttp(storeUrl)) {
      link.href = storeUrl;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      return;
    }
    link.href = "#";
    link.setAttribute("aria-label", "App Store, listing not up yet");
    link.addEventListener("click", function (event) {
      event.preventDefault();
      showToast("The App Store listing is not up yet. This link will go there when it is.");
    });
  });

  if (contact && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact)) {
    document.querySelectorAll("[data-contact]").forEach(function (slot) {
      var a = document.createElement("a");
      a.href = "mailto:" + contact;
      a.textContent = contact;
      slot.textContent = "";
      slot.appendChild(document.createTextNode("Write to "));
      slot.appendChild(a);
      slot.appendChild(document.createTextNode("."));
    });
  }

  function syncPanel() {
    if (!panel || !nav) return;
    var mobile = mobileQuery.matches;
    var open = nav.classList.contains("is-open");
    if ("inert" in panel) panel.inert = mobile && !open;
    panel.setAttribute("aria-hidden", mobile && !open ? "true" : "false");
  }

  function setMenu(open) {
    if (!nav || !toggle) return;
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    var label = toggle.querySelector(".nav-toggle-label");
    if (label) label.textContent = open ? "Close" : "Menu";
    document.body.classList.toggle("menu-lock", open && mobileQuery.matches);
    syncPanel();
  }

  if (toggle && panel && nav) {
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
    mobileQuery.addEventListener("change", function () {
      if (!mobileQuery.matches) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("menu-lock");
      }
      syncPanel();
    });
    syncPanel();
  }

  function onScroll() {
    if (!nav) return;
    var overHero = document.querySelector(".hero");
    var solid = window.scrollY > 10;
    if (overHero) solid = window.scrollY > overHero.offsetHeight - 80;
    nav.classList.toggle("is-solid", solid);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  var phone = document.querySelector(".phone");
  if (phone) {
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      phone.classList.add("is-in");
    } else {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        });
      }, { threshold: 0.35 });
      observer.observe(phone);
    }
  }
})();
