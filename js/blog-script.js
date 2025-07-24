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

const ARTICLES_PER_PAGE = 6;
const blogArticles = [
  {
    id: 1,
    title: "Strategi Digital Marketing untuk UMKM",
    desc: "Panduan praktis meningkatkan bisnis UMKM dengan digital marketing efektif dan efisien.",
    category: "digital",
    author: "Fajar Ramadhan",
    date: "2025-07-10",
    content: "Artikel lengkap strategi digital marketing...",
    words: 550,
  },
  {
    id: 2,
    title: "Tips Desain Konten yang Menarik",
    desc: "Bagaimana membuat desain konten visual yang menarik untuk media sosial dan promosi.",
    category: "design",
    author: "Nadia Salsabila",
    date: "2025-07-15",
    content: "Artikel tips desain konten...",
    words: 430,
  },
  {
    id: 3,
    title: "Update Tren Berita Digital Market",
    desc: "Berita terbaru, tren, dan insight seputar dunia digital marketing Indonesia.",
    category: "news",
    author: "Mega Putri",
    date: "2025-07-18",
    content: "Berita terbaru digital market...",
    words: 380,
  },
  {
    id: 4,
    title: "Tutorial Membuat Landing Page Cepat",
    desc: "Langkah-langkah membuat landing page profesional dengan waktu singkat.",
    category: "tips",
    author: "Rizky Maulana",
    date: "2025-07-19",
    content: "Tutorial landing page...",
    words: 600,
  },
  {
    id: 5,
    title: "SEO 2025: Apa yang Berubah?",
    desc: "Rahasia dan update terbaru teknik SEO di tahun 2025 untuk website bisnis.",
    category: "digital",
    author: "Bimo Pradipta",
    date: "2025-07-20",
    content: "Update SEO 2025...",
    words: 510,
  },
  {
    id: 6,
    title: "Cara Memaksimalkan Iklan Facebook",
    desc: "Strategi dan tips agar iklan Facebook Anda menghasilkan ROI maksimal.",
    category: "digital",
    author: "Mega Putri",
    date: "2025-07-21",
    content: "Tips iklan facebook...",
    words: 370,
  },
  {
    id: 7,
    title: "Manajemen Social Media Efektif",
    desc: "Langkah-langkah mengelola social media bisnis agar engagement meningkat.",
    category: "tips",
    author: "Ayu Maharani",
    date: "2025-07-21",
    content: "Manajemen social media...",
    words: 440,
  },
  {
    id: 8,
    title: "Branding: Kunci Bisnis Bertahan Lama",
    desc: "Kenapa branding sangat penting untuk bisnis jangka panjang.",
    category: "design",
    author: "Nadia Salsabila",
    date: "2025-07-22",
    content: "Branding bisnis...",
    words: 390,
  },
];

const categoryMap = {
  digital: "Digital Marketing",
  design: "Desain",
  news: "Berita",
  tips: "Tips & Tutorial",
};

function calcReadTime(words) {
  const wpm = 200;
  return Math.max(1, Math.round(words / wpm));
}

function renderBlogList(filterCategory = "all", searchQuery = "", page = 1) {
  let filtered = blogArticles.filter((art) => {
    const categoryMatch =
      filterCategory === "all" || art.category === filterCategory;
    const searchMatch =
      !searchQuery ||
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.author.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && searchMatch;
  });
  const totalPages = Math.max(
    1,
    Math.ceil(filtered.length / ARTICLES_PER_PAGE)
  );
  page = Math.max(1, Math.min(page, totalPages));
  const pagedData = filtered.slice(
    (page - 1) * ARTICLES_PER_PAGE,
    page * ARTICLES_PER_PAGE
  );

  const container = document.getElementById("blog-list");
  container.innerHTML = "";

  if (filtered.length === 0) {
    container.innerHTML = `<div class="text-center text-[#8e6fff] font-semibold py-12">Tidak ada artikel ditemukan.</div>`;
    document.getElementById("blog-pagination").innerHTML = "";
    return;
  }

  pagedData.forEach((art) => {
    const div = document.createElement("div");
    div.className = "blog-card";
    div.innerHTML = `
      <div class="blog-title">${art.title}</div>
      <div class="blog-meta">
        <span class="blog-category">${
          categoryMap[art.category] || art.category
        }</span>
        <span class="blog-readtime">⏱️ ${calcReadTime(
          art.words
        )} menit baca</span>
        <span>${art.author}</span>
        <span>${new Date(art.date).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}</span>
      </div>
      <div class="blog-desc">${art.desc}</div>
      <div class="blog-actions">
        <button class="blog-share-btn" data-title="${art.title}" data-id="${
      art.id
    }">
          <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M18 8a3 3 0 0 0-2.98 2.65l-6.58-2.64A3 3 0 1 0 5 14a2.97 2.97 0 0 0 2.98-2.65l6.58 2.64A3 3 0 1 0 19 8zm0 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM6 14a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm12 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/></svg>
          Share
        </button>
      </div>
    `;
    container.appendChild(div);
  });

  renderBlogPagination(totalPages, page, filterCategory, searchQuery);

  // Share button logic
  container.querySelectorAll(".blog-share-btn").forEach((btn) => {
    btn.onclick = function () {
      const title = btn.getAttribute("data-title");
      const id = btn.getAttribute("data-id");
      alert(`Bagikan artikel: "${title}" ke media sosial!`);
    };
  });
}

function renderBlogPagination(
  totalPages,
  currentPage,
  filterCategory,
  searchQuery
) {
  const container = document.getElementById("blog-pagination");
  container.innerHTML = "";
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.className =
      "blog-pagination-btn" + (i === currentPage ? " active" : "");
    btn.disabled = i === currentPage;
    btn.onclick = function () {
      renderBlogList(filterCategory, searchQuery, i);
    };
    container.appendChild(btn);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  let currentCategory = "all";
  let currentSearch = "";
  let currentPage = 1;

  renderBlogList(currentCategory, currentSearch, currentPage);

  document
    .getElementById("category-filter")
    .addEventListener("change", function () {
      currentCategory = this.value;
      currentPage = 1;
      renderBlogList(currentCategory, currentSearch, currentPage);
    });

  document.getElementById("search-bar").addEventListener("input", function () {
    currentSearch = this.value;
    currentPage = 1;
    renderBlogList(currentCategory, currentSearch, currentPage);
  });
});
// Init
document.addEventListener("DOMContentLoaded", function () {
  setupHamburgerMenu();
});
