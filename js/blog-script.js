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
    desc: "Panduan praktis meningkatkan bisnis UMKM dengan digital marketing efektif dan efisien. Temukan langkah transformasi digital, pengelolaan konten, dan tips pemasaran yang bisa langsung diterapkan. Artikel ini membahas strategi mulai dari pemilihan channel, optimalisasi SEO, hingga analisa performa kampanye yang telah terbukti menaikkan omzet UMKM di Indonesia. Anda juga akan belajar contoh kasus sukses UMKM yang bertransformasi digital dan menjadi market leader di bidangnya.",
    category: "digital",
    author: "Fajar Ramadhan",
    date: "2025-07-10",
    content: `Digital marketing kini menjadi tulang punggung pertumbuhan UMKM di era modern. Artikel ini membahas secara detail strategi efektif yang dapat diterapkan pelaku UMKM untuk mendongkrak penjualan dan memperluas jangkauan pasar. Mulai dari pemilihan channel digital yang sesuai, seperti Instagram, Facebook, dan WhatsApp, hingga cara membuat konten yang menarik dan interaktif untuk audiens. Anda akan menemukan tips praktis seperti penggunaan hashtag, pembuatan jadwal posting, serta cara berinteraksi dengan followers agar engagement meningkat. Selain itu, artikel ini membahas cara memanfaatkan SEO untuk website UMKM agar mudah ditemukan di Google dan cara mengukur performa kampanye digital dengan analitik sederhana. 
Studi kasus UMKM yang berhasil naik kelas juga dibahas, termasuk bagaimana mereka memanfaatkan marketplace dan e-commerce dengan strategi pemasaran yang tepat. Dengan mengikuti langkah-langkah dan rekomendasi di sini, UMKM Anda siap bersaing di pasar online dan menjadi market leader di bidangnya. 
Tidak hanya itu, artikel ini juga mengulas pentingnya membangun hubungan jangka panjang dengan pelanggan melalui email marketing, loyalty program, dan customer care berbasis digital. Anda akan mendapatkan insight tentang tren digital marketing terbaru seperti penggunaan video marketing, influencer, dan konten edukasi yang semakin digemari masyarakat. 
Dengan pemahaman mendalam tentang target market, analisa kompetitor, dan cara menyesuaikan strategi pemasaran sesuai kebutuhan bisnis, UMKM Anda dapat tumbuh pesat. Digital marketing bukan sekadar promosi, tapi investasi jangka panjang untuk keberlanjutan bisnis di masa depan.`,
    words: 362,
  },
  {
    id: 2,
    title: "Tips Desain Konten yang Menarik",
    desc: "Bagaimana membuat desain konten visual yang menarik untuk media sosial dan promosi. Artikel ini membahas prinsip desain, tips warna, dan contoh konten viral agar brand Anda lebih dikenal dan diingat pelanggan.",
    category: "design",
    author: "Nadia Salsabila",
    date: "2025-07-15",
    content: `Desain konten menarik adalah kunci utama membangun brand di media sosial. Artikel ini mengupas teknik desain mulai dari penggunaan warna harmonis, pemilihan font yang mudah dibaca, hingga penempatan elemen visual agar pesan promosi tersampaikan optimal. Anda akan belajar tips memilih tema visual, cara membuat konten story interaktif, dan teknik mengedit foto secara cepat dengan aplikasi gratis maupun berbayar.
Selain itu, artikel ini membagikan contoh desain konten viral yang bisa dijadikan inspirasi untuk kampanye promosi Anda. Penekanan pada konsistensi visual sangat penting agar brand mudah dikenali. Anda akan belajar bagaimana mengadaptasi tren desain global untuk pasar lokal, serta teknik membuat template konten agar proses desain menjadi efisien.
Dilengkapi dengan studi kasus kampanye media sosial yang sukses, Anda dapat meniru langkah-langkahnya untuk bisnis Anda. Tips lain yang dibahas adalah penggunaan elemen animasi dan video pendek untuk meningkatkan engagement. Dengan desain yang tepat, brand Anda akan lebih mudah diingat dan berpotensi menjadi trending topic di media sosial.`,
    words: 225,
  },
  {
    id: 3,
    title: "Update Tren Berita Digital Market",
    desc: "Berita terbaru, tren, dan insight seputar dunia digital marketing Indonesia. Simak update algoritma media sosial, teknologi AI, dan peluang bisnis online yang sedang berkembang.",
    category: "news",
    author: "Mega Putri",
    date: "2025-07-18",
    content: `Industri digital marketing di Indonesia mengalami perubahan pesat setiap tahunnya. Di artikel ini Anda akan menemukan berita terkini seputar update algoritma media sosial, tren penggunaan teknologi AI dalam pemasaran, serta peluang bisnis online yang sedang berkembang.
Kami juga membahas insight dari para pelaku industri tentang strategi menghadapi perubahan perilaku konsumen dan tips adaptasi brand dalam persaingan digital. Selain itu, Anda dapat membaca analisa data pertumbuhan bisnis digital dari tahun ke tahun, serta prediksi tren pemasaran yang akan booming di tahun 2025.
Teknologi seperti AR dan VR mulai merambah dunia pemasaran, dan integrasi dengan e-commerce semakin kuat. Artikel ini juga memuat wawancara dengan pakar digital marketing tentang strategi konten di platform baru dan cara memanfaatkan data untuk memahami kebutuhan konsumen. Pastikan Anda selalu update agar bisnis Anda tetap relevan dan kompetitif.`,
    words: 214,
  },
  {
    id: 4,
    title: "Tutorial Membuat Landing Page Cepat",
    desc: "Langkah-langkah membuat landing page profesional dengan waktu singkat. Belajar struktur desain dan elemen penting yang wajib ada untuk hasil maksimal.",
    category: "tips",
    author: "Rizky Maulana",
    date: "2025-07-19",
    content: `Landing page adalah alat penting untuk konversi pengunjung menjadi pelanggan. Artikel ini memberikan tutorial lengkap mulai dari pemilihan template, penulisan headline yang menggugah, hingga penempatan tombol Call to Action yang efektif. Anda juga akan belajar menentukan layout, penggunaan gambar produk, dan cara mengintegrasikan form kontak atau chat.
Dilengkapi tips optimasi kecepatan loading dan mobile friendly, landing page Anda akan tampil profesional tanpa perlu coding rumit. Hasil akhir: website mudah diakses, tampil modern, dan mendukung kampanye marketing digital Anda.
Artikel ini juga menyertakan rekomendasi tools gratis untuk pembuatan landing page, tips copywriting singkat, dan cara analisa performa landing page dengan Google Analytics. Dengan panduan ini, Anda dapat membuat landing page berkualitas tinggi dalam waktu singkat.`,
    words: 201,
  },
  {
    id: 5,
    title: "SEO 2025: Apa yang Berubah?",
    desc: "Rahasia dan update terbaru teknik SEO di tahun 2025 untuk website bisnis. Temukan strategi baru agar website Anda selalu di halaman pertama Google.",
    category: "digital",
    author: "Bimo Pradipta",
    date: "2025-07-20",
    content: `SEO terus berkembang seiring update algoritma Google. Di tahun 2025, teknik SEO tidak hanya bergantung pada kata kunci, tapi juga pengalaman pengguna, kecepatan website, dan struktur data. Artikel ini membahas cara riset keyword terbaru, penggunaan heading dan meta tag, serta pentingnya konten yang informatif dan orisinal.
Anda juga akan belajar tools SEO terbaru yang mempermudah proses optimasi dan memantau performa website. Dengan strategi yang tepat, website bisnis Anda tetap eksis di halaman pertama Google.
Studi kasus dari bisnis online yang sukses menembus persaingan juga dibahas di sini, termasuk teknik backlink, optimasi lokal, dan konten multimedia yang disukai mesin pencari. SEO modern menuntut kreativitas dan analisa data, bukan sekadar 'menanam' kata kunci.`,
    words: 206,
  },
  {
    id: 6,
    title: "Cara Memaksimalkan Iklan Facebook",
    desc: "Strategi dan tips agar iklan Facebook Anda menghasilkan ROI maksimal. Pelajari targeting, kreatif iklan, dan cara mengukur hasil kampanye secara efektif.",
    category: "digital",
    author: "Mega Putri",
    date: "2025-07-21",
    content: `Facebook Ads menawarkan banyak fitur untuk meningkatkan penjualan. Artikel ini membahas strategi targeting audiens, pembuatan kreatif iklan yang menarik, serta tips mengatur budget agar ROI tetap optimal. Anda juga akan menemukan cara mengukur hasil kampanye iklan, melakukan A/B testing, dan membaca laporan performa.
Dengan teknik yang dibagikan, iklan Anda jadi lebih efisien dan hasilnya bisa langsung dirasakan dalam peningkatan penjualan bisnis. Studi kasus bisnis yang sukses melalui Facebook Ads juga dibahas lengkap, termasuk strategi retargeting, lookalike audience, dan integrasi dengan Instagram untuk hasil maksimal.`,
    words: 191,
  },
  {
    id: 7,
    title: "Manajemen Social Media Efektif",
    desc: "Langkah-langkah mengelola social media bisnis agar engagement meningkat. Belajar membuat content plan dan strategi interaksi dengan followers.",
    category: "tips",
    author: "Ayu Maharani",
    date: "2025-07-21",
    content: `Manajemen media sosial yang baik mampu menaikkan engagement dan loyalitas customer. Di artikel ini Anda akan belajar menyusun content plan, menentukan waktu posting terbaik, dan teknik interaksi dengan followers agar akun bisnis makin aktif.
Artikel ini juga membahas penggunaan analytics sederhana untuk mengukur performa dan menyesuaikan strategi konten. Dengan tips di sini, Anda bisa membangun komunitas digital yang loyal dan mendukung pertumbuhan bisnis. Studi kasus brand lokal yang berhasil meningkatkan engagement juga dibahas secara detail.`,
    words: 143,
  },
  {
    id: 8,
    title: "Branding: Kunci Bisnis Bertahan Lama",
    desc: "Kenapa branding sangat penting untuk bisnis jangka panjang. Pelajari studi kasus sukses dan cara membangun identitas brand yang kuat.",
    category: "design",
    author: "Nadia Salsabila",
    date: "2025-07-22",
    content: `Branding adalah pondasi bisnis jangka panjang. Artikel ini membahas langkah membangun identitas brand yang kuat, mulai dari penentuan nilai brand, tone komunikasi, hingga desain logo dan visual.
Ada studi kasus brand lokal yang berhasil bertahan dan berkembang di tengah persaingan. Dengan branding yang tepat, bisnis Anda lebih mudah diingat, direkomendasikan, dan dipercaya konsumen. Tips membangun brand loyalty juga diulas, termasuk strategi kolaborasi dengan influencer dan community marketing.`,
    words: 137,
  },
  {
    id: 9,
    title: "Revolusi AI dalam Digital Marketing",
    desc: "Bagaimana kecerdasan buatan mengubah strategi pemasaran digital di tahun 2025. Temukan tren AI, otomatisasi kampanye, dan personalisasi konten.",
    category: "news",
    author: "Bimo Pradipta",
    date: "2025-07-23",
    content: `Kecerdasan buatan (AI) telah merevolusi digital marketing di Indonesia. Artikel ini mengupas bagaimana AI membantu pebisnis memahami perilaku pelanggan dengan lebih akurat, mengotomasi kampanye iklan, dan mempersonalisasi konten sesuai preferensi tiap audiens.
Anda akan belajar menggunakan chatbot AI untuk meningkatkan pelayanan pelanggan, serta teknik analisa big data agar strategi pemasaran makin tepat sasaran. Kami membagikan contoh kampanye sukses yang didukung AI, sehingga ROI bisnis meningkat signifikan. Dengan tren AI 2025, digital marketer harus siap beradaptasi agar tidak ketinggalan persaingan industri global.`,
    words: 146,
  },
  {
    id: 10,
    title: "Creative Campaign Lokal yang Mendunia",
    desc: "Studi kasus campaign kreatif dari brand lokal yang viral hingga global. Cari tahu rahasia campaign sukses dan cara mengadopsinya untuk bisnis Anda.",
    category: "design",
    author: "Nadia Salsabila",
    date: "2025-07-23",
    content: `Brand lokal kini makin mendunia lewat campaign kreatif. Artikel ini membedah studi kasus beberapa brand Indonesia yang viral di dunia, seperti kampanye social movement, kolaborasi influencer internasional, dan pemanfaatan konten video interaktif.
Anda akan menemukan insight dari tim kreatif di balik campaign tersebut, serta strategi adaptasi ide kreatif untuk bisnis Anda sendiri. Dengan mengadopsi pola campaign yang unik dan relevan, brand Anda bisa bersaing di pasar global dan membangun citra positif di mata konsumen internasional. Tips mengoptimalkan media sosial dan influencer untuk campaign juga diulas.`,
    words: 152,
  },
  {
    id: 11,
    title: "Tips Menulis Copywriting yang Menggerakkan",
    desc: "Copywriting yang baik bisa meningkatkan conversion rate bisnis digital. Temukan formula copywriting dan contoh kalimat yang terbukti ampuh.",
    category: "tips",
    author: "Fajar Ramadhan",
    date: "2025-07-24",
    content: `Copywriting adalah seni mempengaruhi audiens untuk bertindak. Artikel ini membahas formula menulis copy yang efektif, mulai dari mengenali kebutuhan audiens, menggunakan headline persuasif, hingga membangun urgensi dengan kalimat call-to-action.
Kami sertakan contoh kalimat yang terbukti meningkatkan conversion rate pada landing page dan iklan digital. Anda juga akan belajar tentang storytelling singkat, pemilihan kata yang menggugah emosi, serta cara menghindari jargon yang membingungkan. Dengan copywriting yang tepat, bisnis Anda bisa meraih lebih banyak pelanggan loyal. Studi kasus copywriting yang sukses juga diulas agar Anda bisa langsung menerapkan teknik yang tepat.`,
    words: 167,
  },
  {
    id: 12,
    title: "Update Kebijakan Iklan Google Ads 2025",
    desc: "Perubahan terbaru pada kebijakan periklanan Google yang wajib diketahui digital marketer. Simak penjelasan privasi, targeting, dan dampaknya bagi bisnis.",
    category: "news",
    author: "Mega Putri",
    date: "2025-07-24",
    content: `Google Ads mengeluarkan kebijakan baru terkait privasi dan cara targeting iklan di tahun 2025. Artikel ini menjelaskan perubahan besar dalam pengumpulan data pengguna, penyesuaian targeting berbasis interest, serta dampak kebijakan ini terhadap performa kampanye iklan.
Anda akan menemukan tips adaptasi strategi agar iklan tetap efisien, serta insight dari para digital marketer yang sudah mencoba fitur baru Google Ads. Dengan memahami update ini, bisnis Anda bisa tetap kompetitif dan mematuhi regulasi yang berlaku. Studi kasus bisnis yang sukses menghadapi perubahan kebijakan juga dibahas sebagai inspirasi.`,
    words: 134,
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
  return Math.max(1, Math.ceil(words / wpm));
}
function limitWords(text, maxWords = 30) {
  const words = text.split(" ");
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(" ") + "...";
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
    div.className = "blog-card flex flex-col justify-between cursor-pointer";
    div.innerHTML = `
      <div>
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
        <div class="blog-desc">${limitWords(art.desc, 30)}</div>
      </div>
      <div class="blog-actions justify-start">
        <button class="blog-share-btn" data-title="${art.title}" data-id="${
      art.id
    }">
          <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M18 8a3 3 0 0 0-2.98 2.65l-6.58-2.64A3 3 0 1 0 5 14a2.97 2.97 0 0 0 2.98-2.65l6.58 2.64A3 3 0 1 0 19 8zm0 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM6 14a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm12 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/></svg>
          Share
        </button>
      </div>
    `;
    div.onclick = function (e) {
      if (e.target.closest(".blog-share-btn")) return;
      showDetailModal(art);
    };
    div.querySelector(".blog-share-btn").onclick = function (ev) {
      ev.stopPropagation();
      showShareModal(art);
    };
    container.appendChild(div);
  });

  renderBlogPagination(totalPages, page, filterCategory, searchQuery);
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

// Modal: Detail (scrollable area hanya isi text, tombol share tetap di bawah modal, isi news FULL untuk detail)
function showDetailModal(article) {
  const modal = document.getElementById("detail-modal");
  const content = document.getElementById("detail-modal-content");
  const actions = modal.querySelector(".detail-modal-actions");
  content.innerHTML = `
    <div class="blog-title">${article.title}</div>
    <div class="blog-meta">
      <span class="blog-category">${
        categoryMap[article.category] || art.category
      }</span>
      <span class="blog-readtime">⏱️ ${calcReadTime(
        article.words
      )} menit baca</span>
    </div>
    <div class="mb-1 font-semibold text-[#514a7f]">
      ${article.author}
      <br>
      <span class="text-[#6e4fff]">${new Date(article.date).toLocaleDateString(
        "id-ID",
        { day: "numeric", month: "long", year: "numeric" }
      )}</span>
    </div>
    <div class="blog-desc">${article.content}</div>
  `;
  actions.innerHTML = `
    <button id="detail-share-btn" class="blog-share-btn mt-2" data-title="${article.title}" data-id="${article.id}">
      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M18 8a3 3 0 0 0-2.98 2.65l-6.58-2.64A3 3 0 1 0 5 14a2.97 2.97 0 0 0 2.98-2.65l6.58 2.64A3 3 0 1 0 19 8zm0 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM6 14a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm12 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/></svg>
      Share
    </button>
  `;
  setTimeout(() => {
    const shareBtn = document.getElementById("detail-share-btn");
    if (shareBtn) shareBtn.onclick = () => showShareModal(article);
  }, 10);
  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
  modal.querySelector(".detail-modal-card").focus();
}
document.getElementById("close-detail-modal").onclick = () => {
  document.getElementById("detail-modal").classList.add("hidden");
  document.body.style.overflow = "";
};
document.addEventListener("keydown", function (e) {
  const modal = document.getElementById("detail-modal");
  if (
    !modal.classList.contains("hidden") &&
    (e.key === "Escape" || e.key === "Esc")
  ) {
    modal.classList.add("hidden");
    document.body.style.overflow = "";
  }
});

// Modal: Share
let shareArticle = null;
function showShareModal(article) {
  shareArticle = article;
  document.getElementById("share-modal-title").textContent = article.title;
  document.getElementById("share-modal-result").textContent = "";
  document.getElementById("share-modal").classList.remove("hidden");
  document.body.style.overflow = "hidden";
}
document.getElementById("close-share-modal").onclick = closeShareModal;
document.getElementById("share-cancel").onclick = closeShareModal;
function closeShareModal() {
  document.getElementById("share-modal").classList.add("hidden");
  document.body.style.overflow = "";
}
document.getElementById("share-confirm").onclick = function () {
  document.getElementById(
    "share-modal-result"
  ).textContent = `Artikel "${shareArticle.title}" berhasil dibagikan ke media sosial (simulasi)!`;
  setTimeout(closeShareModal, 3500);
};

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

  setupHamburgerMenu();
});
