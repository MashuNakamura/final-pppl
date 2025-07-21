// Encapsulate all logic to avoid polluting global namespace
(function () {
  // Singleton Pattern for Typing Effect
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
        // Gabungkan kata utama dan typing effect
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

  // Modular Hamburger Menu with Event Delegation
  function setupHamburgerMenu() {
    const menuToggle = document.getElementById("menu-toggle");
    const mobileMenu = document.getElementById("mobile-menu");
    if (!menuToggle || !mobileMenu) return;
    menuToggle.addEventListener("click", function () {
      const isOpen = mobileMenu.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
    // Event Delegation for mobile menu links
    mobileMenu.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        mobileMenu.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Modular Counter
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

  // Parallax Effect for Shapes
  function setupParallaxShapes() {
    const shapes = document.querySelectorAll(".parallax-shape");
    let lastScrollY = 0;
    let ticking = false;
    function updateParallax() {
      shapes.forEach((shape, idx) => {
        const scrollY = lastScrollY;
        const speed = (idx + 1) * 0.17 + 0.09;
        let floatY = parseFloat(
          getComputedStyle(shape).getPropertyValue("--floatY") || 0
        );
        shape.style.transform = `translateY(${scrollY * speed + floatY}px)`;
      });
      ticking = false;
    }
    window.addEventListener("scroll", () => {
      lastScrollY = window.scrollY;
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    });
    // Animate floating shapes (update CSS variable --floatY)
    function animateShapes() {
      const now = Date.now();
      shapes.forEach((shape, idx) => {
        const phase = idx * 1000;
        const amplitude = 18 + idx * 6;
        const period = 4200 + idx * 900;
        const floatY =
          Math.sin(((now + phase) / period) * Math.PI * 2) * amplitude;
        shape.style.setProperty("--floatY", floatY);
      });
      requestAnimationFrame(animateShapes);
    }
    animateShapes();
  }

  // Modular Smooth Scroll
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

  // DOMContentLoaded main entry
  document.addEventListener("DOMContentLoaded", function () {
    // Kata utama
    const mainStatic = "Strategi Digital yang ";
    // Kata belakang untuk typing effect
    TypingEffect.start(
      [
        "Personal.",
        "Tepat Sasaran & Hemat Biaya.",
        "Kreatif, Bisnismu Makin Aktif.",
        "Tumbuh Bersama Bisnismu.",
        "Prioritas Kami.",
      ],
      mainStatic
    );
    setupHamburgerMenu();
    animateCounter("users-count", 0, 1688, 1400, "+");
    animateCounter("projects-count", 0, 340, 1200, "+");
    animateCounter("success-count", 0, 98, 1300, "%");
    setupParallaxShapes();
    setupSmoothScroll();
  });
})();
