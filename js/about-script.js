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
// function revealAllTimeline() {
//   const items = document.querySelectorAll(".timeline-item");
//   items.forEach((item, i) => {
//     setTimeout(() => {
//       item.classList.add("visible");
//     }, 150 * i);
//   });
// }

// Timeline animasi saat scroll: 3 item sekaligus muncul saat masuk viewport
function animateTimelineOnScroll() {
  const items = document.querySelectorAll(".timeline-item:not(.visible)");
  if (items.length === 0) return;

  // Kalau item pertama sudah masuk viewport, langsung munculkan 3 sekaligus (atau sisa yang ada)
  const rect = items[0].getBoundingClientRect();
  if (rect.top < window.innerHeight - 80) {
    for (let i = 0; i < 3 && i < items.length; i++) {
      items[i].classList.add("visible");
    }
  }
}
document.addEventListener("scroll", animateTimelineOnScroll);
document.addEventListener("DOMContentLoaded", animateTimelineOnScroll);

// Counter animasi untuk statistik
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
    animateCounter("stat-users", 1688, 1100, "+"); // Pengguna
    animateCounter("stat-projects", 340, 1200, "+"); // Proyek Selesai
    animateCounter("stat-success", 98, 1300, "%"); // Tingkat Keberhasilan
    animateCounter("stat-client", 400, 1100, "+"); // Klien
    animateCounter("stat-growth", 180, 1400, "%"); // Pertumbuhan (%)
    animateCounter("stat-award", 7, 1300, ""); // Penghargaan
  }
}

// Init
document.addEventListener("DOMContentLoaded", function () {
  setupHamburgerMenu();
  // revealAllTimeline();
  animateTimelineOnScroll();
  document.addEventListener("scroll", checkStatsInView);
  checkStatsInView();
});
