// Basic interactivity for Chill demo site

(function () {
  "use strict";

  function safeGetElement(selector) {
    return document.querySelector(selector);
  }

  function initLoginForm() {
    const form = safeGetElement("form[action='./home.html']");
    if (!form) return;

    const usernameInput = safeGetElement("#login-user");
    const passwordInput = safeGetElement("#login-pass");
    if (usernameInput) {
      const saved = localStorage.getItem("chill.username");
      if (saved && !usernameInput.value) usernameInput.value = saved;
    }

    form.addEventListener("submit", function () {
      const username = usernameInput ? usernameInput.value.trim() : "";
      if (username) {
        try {
          localStorage.setItem("chill.username", username);
        } catch (_) {}
      }
      if (passwordInput) {
        // Do not store password in localStorage
      }
    });
  }

  function initRegisterForm() {
    const form = safeGetElement("form[action='./index.html']");
    if (!form) return;
    const usernameInput = safeGetElement("#reg-user");
    const passInput = safeGetElement("#reg-pass");
    const confirmInput = safeGetElement("#reg-confirm");

    form.addEventListener("submit", function (e) {
      const pass = passInput ? passInput.value : "";
      const confirm = confirmInput ? confirmInput.value : "";
      if (pass !== confirm) {
        e.preventDefault();
        alert("Konfirmasi kata sandi tidak sama.");
        return;
      }
      const username = usernameInput ? usernameInput.value.trim() : "";
      if (username) {
        try { localStorage.setItem("chill.username", username); } catch (_) {}
      }
    });
  }

  function initAvatarName() {
    const topbar = safeGetElement(".topbar");
    if (!topbar) return;
    const username = localStorage.getItem("chill.username");
    if (!username) return;

    const existing = topbar.querySelector(".avatar-name");
    if (existing) return;

    const nameEl = document.createElement("span");
    nameEl.className = "avatar-name";
    nameEl.textContent = username;
    nameEl.setAttribute("aria-label", "Nama pengguna");
    const avatar = topbar.querySelector(".avatar");
    if (avatar && avatar.parentNode) {
      avatar.parentNode.insertBefore(nameEl, avatar.nextSibling);
      avatar.addEventListener('click', function(){ window.location.href = './profile.html'; });
    }
  }

  function initHorizontalScroll() {
    const scrollers = document.querySelectorAll(".scroller");
    scrollers.forEach(function (el) {
      el.addEventListener("wheel", function (e) {
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
          e.preventDefault();
          el.scrollLeft += e.deltaY;
        }
      }, { passive: false });

      let isDown = false;
      let startX = 0;
      let scrollLeft = 0;

      el.addEventListener("pointerdown", function (e) {
        isDown = true;
        startX = e.pageX - el.offsetLeft;
        scrollLeft = el.scrollLeft;
        el.setPointerCapture(e.pointerId);
        el.classList.add("dragging");
      });
      el.addEventListener("pointerleave", function () {
        isDown = false;
        el.classList.remove("dragging");
      });
      el.addEventListener("pointerup", function () {
        isDown = false;
        el.classList.remove("dragging");
      });
      el.addEventListener("pointermove", function (e) {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - el.offsetLeft;
        const walk = (x - startX) * 1.2; // drag speed
        el.scrollLeft = scrollLeft - walk;
      });
    });
  }

  function init() {
    initLoginForm();
    initRegisterForm();
    initAvatarName();
    initHorizontalScroll();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();


