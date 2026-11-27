(function () {
  var mobileQuery = window.matchMedia("(max-width: 760px)");
  var nav = document.querySelector(".nav");
  var toggle = document.querySelector(".nav-toggle");
  var panel = document.getElementById("nav-panel");

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

  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
