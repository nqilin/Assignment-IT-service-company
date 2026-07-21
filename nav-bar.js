(function () {
  "use strict";

  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");
  const overlay = document.getElementById("navOverlay");
  const dropdowns = document.querySelectorAll(".navbar .dropdown");

  let isMenuOpen = false;

  function openMenu() {
    if (!navLinks || !hamburger || !overlay) return;
    isMenuOpen = true;
    navLinks.classList.add("open");
    hamburger.classList.add("active");
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
    hamburger.setAttribute("aria-expanded", "true");
  }

  function closeMenu() {
    if (!navLinks || !hamburger || !overlay) return;
    isMenuOpen = false;
    navLinks.classList.remove("open");
    hamburger.classList.remove("active");
    overlay.classList.remove("active");
    document.body.style.overflow = "";
    hamburger.setAttribute("aria-expanded", "false");
    dropdowns.forEach((d) => d.classList.remove("open"));
  }

  function toggleMenu() {
    if (isMenuOpen) closeMenu();
    else openMenu();
  }

  
  function toggleDropdown(e) {
    if (window.innerWidth > 992) return;
    e.preventDefault();
    const parent = this.closest(".dropdown");
    if (!parent) return;
    const isOpen = parent.classList.contains("open");
    dropdowns.forEach((d) => {
      if (d !== parent) d.classList.remove("open");
    });
    if (isOpen) {
      parent.classList.remove("open");
    } else {
      parent.classList.add("open");
    }
  }

  function handleNavLinkClick(e) {
    if (e.target.closest(".dropdown > a")) return;
    if (e.target.closest(".dropdown-menu")) {
      setTimeout(closeMenu, 150);
      return;
    }
    if (e.target.closest(".nav-links > a:not(.dropdown > a)")) {
      setTimeout(closeMenu, 150);
    }
  }

  hamburger.addEventListener("click", toggleMenu);
  overlay.addEventListener("click", closeMenu);

  dropdowns.forEach((drop) => {
    const trigger = drop.querySelector('a');
    if (trigger) {
      trigger.addEventListener("click", toggleDropdown);
    }
  });

  navLinks.addEventListener("click", handleNavLinkClick);

  let resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      if (window.innerWidth > 992 && isMenuOpen) {
        closeMenu();
      }
      if (window.innerWidth > 992) {
        dropdowns.forEach((d) => d.classList.remove("open"));
      }
    }, 150);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && isMenuOpen) {
      closeMenu();
    }
  });

  hamburger.setAttribute("aria-expanded", "false");
})();
