// Hamburger menu untuk navbar mobile
function setupHamburgerMenu() {
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", function () {
      const isOpen = mobileMenu.classList.toggle("open");
      mobileMenu.style.maxHeight = isOpen
        ? mobileMenu.scrollHeight + "px"
        : "0";
      menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
    // Tutup menu saat link diklik
    mobileMenu.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        mobileMenu.classList.remove("open");
        mobileMenu.style.maxHeight = "0";
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  }
}

// Timeline animasi (semua item langsung muncul dengan animasi berurutan)
function revealAllTimeline() {
  const items = document.querySelectorAll(".timeline-item");
  items.forEach((item, i) => {
    setTimeout(() => {
      item.classList.add("visible");
    }, 150 * i);
  });
}

// Counter animasi untuk statistik (6 statistik: 3 index + 3 tambahan)
function animateCounter(id, to, duration = 1200, postfix = "") {
  const el = document.getElementById(id);
  if (!el) return;
  let start = null;
  const from = 0;
  function step(timestamp) {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    el.textContent = Math.floor(progress * (to - from) + from) + postfix;
    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      el.textContent = to + postfix;
    }
  }
  requestAnimationFrame(step);
}

// Aktifkan counter saat statistik terlihat
let statsAnimated = false;
function checkStatsInView() {
  const stats = document.getElementById("stats");
  if (!stats) return;
  const rect = stats.getBoundingClientRect();
  if (!statsAnimated && rect.top < window.innerHeight - 80) {
    statsAnimated = true;
    // 3 dari index.html (angka contoh, bisa disesuaikan)
    animateCounter("stat-users", 1688, 1100, "+"); // Pengguna
    animateCounter("stat-projects", 340, 1200, "+"); // Proyek Selesai
    animateCounter("stat-success", 98, 1300, "%"); // Tingkat Keberhasilan
    // 3 tambahan baru (dummy angka, bisa custom)
    animateCounter("stat-client", 400, 1100, "+"); // Klien
    animateCounter("stat-growth", 180, 1400, "%"); // Pertumbuhan (%)
    animateCounter("stat-award", 7, 1300, ""); // Penghargaan
  }
}

// Init
document.addEventListener("DOMContentLoaded", function () {
  setupHamburgerMenu();
  revealAllTimeline();
  document.addEventListener("scroll", checkStatsInView);
  checkStatsInView();
});
