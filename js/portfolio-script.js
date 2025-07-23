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

// Dummy Data Portfolio
const portfolioData = [
  {
    id: "p1",
    title: "Website Company ABC",
    type: "website",
    desc: "Redesign website perusahaan ABC agar lebih modern dan mobile responsive.",
    img: "../images/website-abc.jpg",
    gallery: ["../images/website-abc-1.jpg", "../images/website-abc-2.jpg"],
    client: "ABC Corp",
    testimonial: {
      star: 5,
      text: "Hasilnya profesional dan supportnya cepat. Website kami jadi lebih mudah diakses pelanggan.",
      client: "Budi, CEO ABC Corp",
    },
  },
  {
    id: "p2",
    title: "Campaign Digital Ads XYZ",
    type: "ads",
    desc: "Strategi iklan Google dan Facebook untuk meningkatkan leads bisnis XYZ.",
    img: "../images/digital-xyz.jpg",
    gallery: ["../images/digital-xyz-1.avif", "../images/digital-xyz-2.jpg"],
    client: "XYZ Solutions",
    testimonial: {
      star: 4,
      text: "Leads naik signifikan, budget iklan sangat efisien.",
      client: "Siti, Marketing XYZ Solutions",
    },
  },
  {
    id: "p3",
    title: "Branding & Logo UMKM Jaya",
    type: "branding",
    desc: "Desain identitas visual dan logo untuk UMKM Jaya agar lebih menarik.",
    img: "../images/umkm-logo.webp",
    gallery: ["../images/umkm-logo-1.jpg", "../images/umkm-logo-2.jpg"],
    client: "UMKM Jaya",
    testimonial: {
      star: 5,
      text: "Logo baru sangat disukai pelanggan, branding makin kuat di pasar.",
      client: "Pak Andi, Owner UMKM Jaya",
    },
  },
  // Tambah data lain sesuai kebutuhan
];

// Format jenis project
function formatType(type) {
  switch (type) {
    case "website":
      return "Website";
    case "ads":
      return "Digital Ads";
    case "branding":
      return "Branding";
    case "creative":
      return "Kreatif";
    default:
      return "Lainnya";
  }
}

// Render Portfolio Grid
function renderPortfolioGrid(filter = "all") {
  const grid = document.getElementById("portfolio-grid");
  let filtered =
    filter === "all"
      ? portfolioData
      : portfolioData.filter((p) => p.type === filter);
  grid.innerHTML = "";

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full flex justify-center">
        <div class="bg-[#f3f0ff] border border-[#ececff] rounded-xl shadow p-8 flex flex-col items-center w-full max-w-md mx-auto">
          <svg width="44" height="44" fill="#b1a3ff" viewBox="0 0 24 24" class="mb-3">
            <path d="M12 2a10 10 0 1 0 0 20 10 10 0 1 0 0-20zm1 16h-2v-2h2v2zm1.07-7.75l-.9.92C11.45 12.9 11 13.5 11 15h2v-.5c0-.55.22-1.05.59-1.41l1.2-1.2A2.004 2.004 0 0 0 13 7a2 2 0 0 0-2 2h2c0-.55.45-1 1-1s1 .45 1 1c0 .55-.45 1-1 1z"/>
          </svg>
          <div class="text-[#8e6fff] font-bold text-lg mb-2">Segera hadir</div>
          <div class="text-[#514a7f] text-center text-base opacity-90">Belum ada proyek di kategori ini. Nantikan update terbaru dari tim kami!</div>
        </div>
      </div>
    `;
    return;
  }

  filtered.forEach((project) => {
    const card = document.createElement("div");
    card.className = "portfolio-card";
    card.innerHTML = `
      <img src="${project.img}" class="portfolio-img" alt="${
      project.title
    }" data-gallery="${project.gallery[0]}">
      <div class="portfolio-title">${project.title}</div>
      <div class="portfolio-type">${formatType(project.type)}</div>
      <div class="portfolio-desc">${project.desc}</div>
      <button class="portfolio-detail-btn" data-id="${
        project.id
      }">Detail Proyek</button>
    `;
    // Gallery click (thumbnail to lightbox)
    card.querySelector(".portfolio-img").addEventListener("click", function () {
      showLightbox(project.gallery[0]);
    });
    // Detail modal
    card
      .querySelector(".portfolio-detail-btn")
      .addEventListener("click", function () {
        showPortfolioModal(project);
      });
    grid.appendChild(card);
  });
}

// Filter Button Logic
document.addEventListener("DOMContentLoaded", function () {
  renderPortfolioGrid();
  document.querySelectorAll(".portfolio-filter-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      document
        .querySelectorAll(".portfolio-filter-btn")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderPortfolioGrid(btn.dataset.filter);
    });
  });
  setupHamburgerMenu();
});

// Modal Project Detail
function showPortfolioModal(project) {
  const modal = document.getElementById("portfolio-modal");
  const content = document.getElementById("portfolio-modal-content");
  content.innerHTML = `
    <div class="font-bold text-xl text-[#8e6fff] mb-1">${project.title}</div>
    <div class="text-[#b1a3ff] font-medium mb-2">${formatType(
      project.type
    )} | ${project.client}</div>
    <img src="${
      project.img
    }" class="w-full rounded mb-3" style="max-height:180px;object-fit:cover;">
    <div class="mb-3 text-[#514a7f]">${project.desc}</div>
    <div class="mb-2">
      <span class="font-semibold text-[#3d347d]">Gallery:</span>
      ${project.gallery
        .map(
          (url, i) =>
            `<img src="${url}" class="inline-block rounded cursor-pointer mx-1" style="width:60px;height:40px;object-fit:cover;border:2px solid #e5e1fa;" onclick="showLightbox('${url}')">`
        )
        .join("")}
    </div>
    <div class="mt-3 bg-[#f3f0ff] rounded p-3 flex gap-3 items-center">
      <div class="flex gap-1">${renderStar(project.testimonial.star)}</div>
      <div>
        <div class="font-medium text-[#8e6fff] mb-1">&ldquo;${
          project.testimonial.text
        }&rdquo;</div>
        <div class="text-xs text-[#3d347d]">- ${
          project.testimonial.client
        }</div>
      </div>
    </div>
  `;
  modal.classList.remove("hidden");
}
// Close Detail Modal
document.getElementById("portfolio-modal-close").onclick = function () {
  document.getElementById("portfolio-modal").classList.add("hidden");
};

// Star Rating
function renderStar(star) {
  let html = "";
  for (let i = 0; i < 5; i++) {
    html += `<svg width="20" height="20" fill="${
      i < star ? "#ffce44" : "#ececff"
    }" stroke="#8e6fff" viewBox="0 0 24 24"><polygon points="12,2 15,9 22,9.5 17,15 18,22 12,18.5 6,22 7,15 2,9.5 9,9"/></svg>`;
  }
  return html;
}

// Lightbox Logic
function showLightbox(url) {
  const lightbox = document.getElementById("portfolio-lightbox");
  document.getElementById("portfolio-lightbox-img").src = url;
  lightbox.classList.remove("hidden");
}
document.getElementById("portfolio-lightbox-close").onclick = function () {
  document.getElementById("portfolio-lightbox").classList.add("hidden");
};
document.getElementById("portfolio-lightbox").onclick = function (e) {
  if (e.target.id === "portfolio-lightbox") this.classList.add("hidden");
};
