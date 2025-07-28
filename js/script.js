(function () {
  // Dynamic typing effect untuk headline
  const TypingEffect = (function () {
    let instance;
    function init(words, mainStatic = "") {
      let i = 0,
        j = 0,
        isDeleting = false;
      function type() {
        const typing = document.getElementById("typing");
        if (!typing) return;
        const currentWord = words[i];
        typing.textContent = mainStatic + currentWord.substring(0, j);
        if (isDeleting) {
          j--;
          if (j < 0) {
            isDeleting = false;
            i = (i + 1) % words.length;
            setTimeout(type, 500);
          } else {
            setTimeout(type, 45);
          }
        } else {
          j++;
          if (j > currentWord.length) {
            isDeleting = true;
            setTimeout(type, 1200);
          } else {
            setTimeout(type, 85);
          }
        }
      }
      type();
    }
    return {
      start: function (words, mainStatic = "") {
        if (!instance) instance = init(words, mainStatic);
        return instance;
      },
    };
  })();

  // Hamburger menu untuk mobile
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

  // Statistik counter animasi
  function animateCounter(id, from, to, duration, postfix = "") {
    const el = document.getElementById(id);
    if (!el) return;
    let start = null;
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

  // Parallax ellipse ngikut scroll
  function setupParallaxEllipses() {
    const ellipses = [
      { el: document.querySelector(".ellipse-1"), parallax: 0.7 },
      { el: document.querySelector(".ellipse-2"), parallax: 0.7 },
      { el: document.querySelector(".ellipse-3"), parallax: 0.7 },
    ];
    window.addEventListener("scroll", () => {
      const scrollY = window.scrollY;
      ellipses.forEach(({ el, parallax }) => {
        if (el) {
          el.style.transform = `translateY(${scrollY * parallax}px)`;
        }
      });
    });
    // Inisialisasi posisi awal supaya langsung terlihat benar
    window.dispatchEvent(new Event("scroll"));
  }

  // Scroll halus untuk anchor & tombol CTA
  function setupSmoothScroll() {
    document.querySelectorAll(".smooth-scroll").forEach((el) => {
      el.addEventListener("click", function (e) {
        const href = this.getAttribute("href");
        if (href && href.startsWith("#")) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }
      });
    });
  }

  // Detail layanan buka/tutup satu per satu
  function setupServiceDisclosure() {
    const buttons = document.querySelectorAll(".service-more");
    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        buttons.forEach(function (otherBtn) {
          const otherDetail = otherBtn.nextElementSibling;
          if (otherBtn !== btn) {
            if (otherDetail && otherDetail.classList.contains("open")) {
              otherDetail.classList.remove("open");
              otherBtn.setAttribute("aria-expanded", "false");
              otherBtn.textContent = "Lihat Detail";
            }
          }
        });
        const detail = this.nextElementSibling;
        const expanded = this.getAttribute("aria-expanded") === "true";
        if (detail) {
          if (expanded) detail.classList.remove("open");
          else detail.classList.add("open");
          this.setAttribute("aria-expanded", !expanded);
          this.textContent = expanded ? "Lihat Detail" : "Tutup Detail";
        }
      });
    });
    document
      .querySelectorAll(".service-detail")
      .forEach((d) => d.classList.remove("open"));
  }

  // Testimonial carousel otomatis dan interaktif
  function setupTestimonialSection() {
    const testimonials = [
      {
        avatar: "https://randomuser.me/api/portraits/women/45.jpg",
        name: "Siti Aulia",
        role: "Owner UMKM Fashion",
        rating: 5,
        text: "Digital Market membantu kami naik kelas di dunia online. Omzet meningkat 2x lipat, timnya responsif dan kreatif!",
        ratingDetail: "Pelayanan sangat memuaskan!",
      },
      {
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        name: "Budi Santoso",
        role: "Marketing Manager, PT. Sejahtera",
        rating: 4,
        text: "Sudah coba beberapa agency, baru kali ini dapat hasil signifikan. SEO & Ads-nya beneran efektif.",
        ratingDetail: "Hasilnya signifikan, recommended.",
      },
      {
        avatar: "https://randomuser.me/api/portraits/men/12.jpg",
        name: "Rizky Firmansyah",
        role: "Founder StartUp Kuliner",
        rating: 5,
        text: "Konten viral, engagement sosmed kami naik, dan support konsultasi sangat membantu!",
        ratingDetail: "Support konsultasi sangat membantu.",
      },
    ];
    const carousel = document.querySelector(".testimonial-carousel");
    const prevBtn = document.querySelector(".testimonial-prev");
    const nextBtn = document.querySelector(".testimonial-next");
    let idx = 0,
      autoSlide = null;
    function renderTestimonial(i) {
      carousel.innerHTML = "";
      const item = testimonials[i];
      const wrap = document.createElement("div");
      wrap.className = "testimonial-item active";
      wrap.innerHTML = `
        <img src="${item.avatar}" alt="${item.name}" class="testimonial-avatar">
        <div class="testimonial-name">${item.name}</div>
        <div class="testimonial-role">${item.role}</div>
        <div class="testimonial-rating">
          ${[...Array(5)]
            .map(
              (_, star) => `
            <span class="star${
              star < item.rating ? " filled" : ""
            }" tabindex="0">
              ★
              <span class="star-detail">${item.ratingDetail || ""}</span>
            </span>
          `
            )
            .join("")}
        </div>
        <div class="testimonial-text">"${item.text}"</div>
      `;
      carousel.appendChild(wrap);
      wrap.querySelectorAll(".star").forEach((star) => {
        star.addEventListener("mouseenter", function () {
          this.querySelector(".star-detail").style.display = "block";
        });
        star.addEventListener("mouseleave", function () {
          this.querySelector(".star-detail").style.display = "none";
        });
        star.addEventListener("focus", function () {
          this.querySelector(".star-detail").style.display = "block";
        });
        star.addEventListener("blur", function () {
          this.querySelector(".star-detail").style.display = "none";
        });
      });
    }
    function show(idxNew) {
      idx = (idxNew + testimonials.length) % testimonials.length;
      renderTestimonial(idx);
    }
    prevBtn.onclick = () => show(idx - 1);
    nextBtn.onclick = () => show(idx + 1);
    function auto() {
      show(idx + 1);
      autoSlide = setTimeout(auto, 5000);
    }
    show(0);
    if (autoSlide) clearTimeout(autoSlide);
    autoSlide = setTimeout(auto, 5000);
    carousel.onmouseenter = () => clearTimeout(autoSlide);
    carousel.onmouseleave = () => {
      autoSlide = setTimeout(auto, 5000);
    };
  }

  // Init semua fitur saat halaman siap
  document.addEventListener("DOMContentLoaded", function () {
    TypingEffect.start(
      [
        "Personal.",
        "Tepat Sasaran & Hemat Biaya.",
        "Kreatif, Bisnismu Makin Aktif.",
        "Tumbuh Bersama Bisnismu.",
        "Prioritas Kami.",
      ],
      "Strategi Digital yang "
    );
    setupHamburgerMenu();
    animateCounter("users-count", 0, 1688, 1400, "+");
    animateCounter("projects-count", 0, 340, 1200, "+");
    animateCounter("success-count", 0, 98, 1300, "%");
    setupParallaxEllipses();
    setupSmoothScroll();
    setupServiceDisclosure();
    setupTestimonialSection();
  });
})();
