// Hamburger menu smooth
const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");
if (menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", function () {
    const isOpen = mobileMenu.classList.toggle("open");
    mobileMenu.style.maxHeight = isOpen ? mobileMenu.scrollHeight + "px" : "0";
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

// Contact Form Real-time Validation (border merah hanya setelah input)
const form = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const nameError = document.getElementById("name-error");
const emailError = document.getElementById("email-error");
const messageError = document.getElementById("message-error");
const formSuccess = document.getElementById("form-success");

let hasTouched = { name: false, email: false, message: false };

function validateName() {
  if (!hasTouched.name) return true;
  if (!nameInput.value.trim()) {
    nameError.textContent = "Nama wajib diisi.";
    nameInput.classList.add("has-error");
    return false;
  }
  if (nameInput.value.length > 40) {
    nameError.textContent = "Nama maksimal 40 karakter.";
    nameInput.classList.add("has-error");
    return false;
  }
  nameError.textContent = "";
  nameInput.classList.remove("has-error");
  return true;
}
function validateEmail() {
  if (!hasTouched.email) return true;
  const email = emailInput.value.trim();
  if (!email) {
    emailError.textContent = "Email wajib diisi.";
    emailInput.classList.add("has-error");
    return false;
  }
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!valid) {
    emailError.textContent = "Format email tidak valid.";
    emailInput.classList.add("has-error");
    return false;
  }
  emailError.textContent = "";
  emailInput.classList.remove("has-error");
  return true;
}
function validateMessage() {
  if (!hasTouched.message) return true;
  if (!messageInput.value.trim()) {
    messageError.textContent = "Pesan wajib diisi.";
    messageInput.classList.add("has-error");
    return false;
  }
  if (messageInput.value.length > 300) {
    messageError.textContent = "Pesan maksimal 300 karakter.";
    messageInput.classList.add("has-error");
    return false;
  }
  messageError.textContent = "";
  messageInput.classList.remove("has-error");
  return true;
}

// on first input, aktifkan "hasTouched"
nameInput.addEventListener("input", () => {
  hasTouched.name = true;
  validateName();
  formSuccess.textContent = "";
});
emailInput.addEventListener("input", () => {
  hasTouched.email = true;
  validateEmail();
  formSuccess.textContent = "";
});
messageInput.addEventListener("input", () => {
  hasTouched.message = true;
  validateMessage();
  formSuccess.textContent = "";
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  hasTouched = { name: true, email: true, message: true };
  const validName = validateName();
  const validEmail = validateEmail();
  const validMsg = validateMessage();
  if (validName && validEmail && validMsg) {
    formSuccess.textContent = "Pesan anda berhasil dikirim!";
    form.reset();
    setTimeout(() => (formSuccess.textContent = ""), 2500);
    // reset border dan error
    nameInput.classList.remove("has-error");
    emailInput.classList.remove("has-error");
    messageInput.classList.remove("has-error");
    nameError.textContent = "";
    emailError.textContent = "";
    messageError.textContent = "";
    hasTouched = { name: false, email: false, message: false };
  }
});

// Google Maps Interactive Marker Simulation
const markerBtn = document.getElementById("show-marker");
const markerInfo = document.getElementById("marker-info");
if (markerBtn && markerInfo) {
  markerBtn.addEventListener("click", () => {
    markerInfo.textContent =
      "Lokasi kantor: UKDC, Jl. Dr. Ir. H. Soekarno No. 201, Surabaya (Marker ditandai pada peta).";
    setTimeout(() => (markerInfo.textContent = ""), 3500);
  });
}

const chatWindow = document.getElementById("chat-window");
const chatInput = document.getElementById("chat-input");
const chatSend = document.getElementById("chat-send");

// Random emoji untuk bot
const botEmojis = ["😊", "👍", "🤗", "🙌", "💡", "✨", "😃", "🤖"];
function randomEmoji() {
  return botEmojis[Math.floor(Math.random() * botEmojis.length)];
}

// Jawaban dinamis
function getBotReply(userMsg, lastContext = {}) {
  userMsg = userMsg.toLowerCase();
  if (/^(halo|hai|hello)/i.test(userMsg)) {
    return "Halo! 👋 Ada yang bisa kami bantu hari ini? " + randomEmoji();
  }
  if (/alamat|lokasi|kantor/.test(userMsg)) {
    return (
      "Kantor kami di Universitas Katolik Darma Cendika (UKDC), Surabaya. Ada yang ingin berkunjung?" +
      " " +
      randomEmoji()
    );
  }
  if (/email|kontak/.test(userMsg)) {
    return "Email resmi kami: info@digitalmarket.id. Silakan kontak kapan saja!";
  }
  if (/terima kasih|thanks|makasih/.test(userMsg)) {
    return "Sama-sama, senang bisa membantu! " + randomEmoji();
  }
  if (/website|layanan|jasa/.test(userMsg)) {
    return "Kami menyediakan jasa digital marketing, pembuatan website, konten kreatif, dan iklan. Mau info spesifik?";
  }
  if (/harga|biaya|paket/.test(userMsg)) {
    return "Untuk estimasi biaya dan paket, silakan cek kalkulator di website atau tanya detail di sini.";
  }
  if (/nomor|telepon|wa|whatsapp/.test(userMsg)) {
    return "Nomor telepon kami: 031-5914157. Untuk WhatsApp, silakan hubungi via email dulu ya.";
  }
  // Balasan random jika pertanyaan tidak dikenali
  const fallback = [
    "Maaf, bisa dijelaskan lebih detail pertanyaannya?",
    "Bisa ulangi pertanyaannya, atau ingin konsultasi gratis?",
    "Saya siap membantu, silakan tanya apa saja! " + randomEmoji(),
    "Untuk pertanyaan lebih spesifik, tim kami siap membantu via email.",
  ];
  return fallback[Math.floor(Math.random() * fallback.length)];
}

// Chat bubble
function addChatMessage(sender, text) {
  const msg = document.createElement("div");
  msg.className = "chat-message " + sender;
  let icon;
  const safeText = ("" + text).replace(/</g, "&lt;").replace(/>/g, "&gt;");
  if (sender === "user") {
    icon = `<span class="chat-icon" title="Anda">
      <svg viewBox="0 0 24 24" fill="#8e6fff" width="22" height="22"><circle cx="12" cy="7" r="5"/><path d="M12 14c-5 0-7 2-7 5v2h14v-2c0-3-2-5-7-5z"/></svg>
    </span>`;
    msg.innerHTML = `<div class="chat-bubble"><span>${safeText}</span>${icon}</div>`;
  } else {
    icon = `<span class="chat-icon" title="Customer Service">
      <svg viewBox="0 0 24 24" fill="#3d347d" width="22" height="22"><rect x="9" y="6" width="6" height="6" rx="3"/><path d="M12 14c-5 0-7 2-7 5v2h14v-2c0-3-2-5-7-5z"/></svg>
    </span>`;
    msg.innerHTML = `<div class="chat-bubble">${icon}<span>${safeText}</span></div>`;
  }
  chatWindow.appendChild(msg);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

let lastUserMsg = "";

if (chatSend && chatInput && chatWindow) {
  chatSend.addEventListener("click", () => {
    const userMsg = chatInput.value.trim();
    if (userMsg) {
      addChatMessage("user", userMsg);
      lastUserMsg = userMsg;
      chatInput.value = "";
      setTimeout(() => {
        let reply = getBotReply(userMsg, { lastUserMsg });
        addChatMessage("bot", reply);
      }, 700);
    }
  });
  chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") chatSend.click();
  });

  // Sapaan otomatis saat pertama kali buka chat
  setTimeout(() => {
    addChatMessage(
      "bot",
      "Halo! 👋 Saya Customer Service Digital Market. Silakan tanya apa saja di sini. " +
        randomEmoji()
    );
  }, 500);
}

// FAQ Accordion & Search + Cache Open
const faqs = [
  {
    q: "Bagaimana cara menghubungi tim Digital Market?",
    a: "Anda bisa menggunakan form kontak atau live chat di halaman ini.",
  },
  {
    q: "Dimana lokasi kantor Digital Market?",
    a: "Kantor kami berlokasi di UKDC, Jl. Dr. Ir. H. Soekarno No. 201, Surabaya, Jawa Timur.",
  },
  {
    q: "Apakah Digital Market melayani jasa pembuatan website?",
    a: "Ya, kami menyediakan layanan pembuatan dan pengembangan website.",
  },
  {
    q: "Bisakah saya konsultasi gratis terlebih dahulu?",
    a: "Tentu! Silakan isi form kontak, tim kami akan menghubungi anda.",
  },
  {
    q: "Berapa lama respon pesan biasanya?",
    a: "Kami berusaha membalas dalam waktu kurang dari 1x24 jam di hari kerja.",
  },
];
const faqList = document.getElementById("faq-list");
const faqSearch = document.getElementById("faq-search");

let faqOpenCache = [];

function renderFaqs(faqArr, restoreOpen = true) {
  faqList.innerHTML = "";
  faqArr.forEach((faq, idx) => {
    const item = document.createElement("div");
    item.className = "faq-item";
    item.innerHTML = `
      <div class="faq-question" tabindex="0">${faq.q}</div>
      <div class="faq-answer">${faq.a}</div>
    `;
    faqList.appendChild(item);
    item.querySelector(".faq-question").addEventListener("click", () => {
      item.classList.toggle("open");
      updateFaqOpenCache();
    });
    item.querySelector(".faq-question").addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        item.classList.toggle("open");
        updateFaqOpenCache();
      }
    });
    // restore open state from cache
    if (restoreOpen && faqOpenCache.includes(idx)) {
      item.classList.add("open");
    }
  });
}

function updateFaqOpenCache() {
  faqOpenCache = [];
  Array.from(faqList.children).forEach((item, idx) => {
    if (item.classList.contains("open")) faqOpenCache.push(idx);
  });
}

renderFaqs(faqs);

faqSearch.addEventListener("input", function () {
  const keyword = this.value.trim().toLowerCase();
  if (!keyword) {
    renderFaqs(faqs, true);
    return;
  }
  const filtered = faqs.filter(
    (f, i) =>
      f.q.toLowerCase().includes(keyword) || f.a.toLowerCase().includes(keyword)
  );
  renderFaqs(filtered, false);
});
