// Snackbar popout notification
function showSnackbar(message, type = "info") {
  const snackbar = document.getElementById("snackbar");
  snackbar.textContent = message;
  snackbar.className = `snackbar show ${type}`;
  clearTimeout(showSnackbar.timer);
  showSnackbar.timer = setTimeout(() => {
    snackbar.className = "snackbar";
  }, 2200);
}

// Hamburger menu logic
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

// Data layanan/produk
const servicesData = [
  {
    id: "seo",
    title: "SEO Optimization",
    desc: "Optimasi website agar peringkat Google naik & traffic organik meningkat.",
    price: 1200000,
    category: "digital",
    duration: "3 bulan",
    features: ["Riset Keyword", "On-Page SEO", "Backlink", "Laporan SEO"],
  },
  {
    id: "ads",
    title: "Digital Ads",
    desc: "Kampanye iklan efektif di Google, Facebook & Instagram.",
    price: 1500000,
    category: "ads",
    duration: "1 bulan",
    features: ["Target Audience", "Budget Control", "Optimasi CTA", "Report"],
  },
  {
    id: "content",
    title: "Konten Kreatif",
    desc: "Desain visual, copywriting & video untuk sosial media & promosi digital.",
    price: 900000,
    category: "creative",
    duration: "1 bulan",
    features: ["Desain Feed", "Konten Story", "Copywriting", "Video Reel"],
  },
  {
    id: "web",
    title: "Website Development",
    desc: "Jasa pembuatan website profesional untuk bisnis & personal branding.",
    price: 2500000,
    category: "web",
    duration: "1-2 bulan",
    features: ["Landing Page", "UI/UX", "Integrasi Form", "SEO Basic"],
  },
  {
    id: "smm",
    title: "Social Media Management",
    desc: "Manajemen dan optimasi Instagram, Facebook, TikTok bisnis Anda.",
    price: 850000,
    category: "digital",
    duration: "1 bulan",
    features: ["Strategi Konten", "Posting Terjadwal", "Laporan Bulanan"],
  },
  {
    id: "branding",
    title: "Branding & Identity",
    desc: "Jasa pembuatan logo, desain identitas, dan brand guideline profesional.",
    price: 1700000,
    category: "creative",
    duration: "2 minggu",
    features: ["Logo", "Brand Voice", "Guideline", "Stationery"],
  },
];

const extraPrice = {
  reporting: 200000,
  support: 150000,
  design: 250000,
  consult: 250000,
};
const CUSTOMS_PER_PAGE = 3;

function renderGabunganPaketList(filterCategory = "all", page = 1) {
  const data = loadCustomizations();
  const container = document.getElementById("gabungan-paket-list");
  if (!container) return;
  let filtered = data;
  if (filterCategory !== "all") {
    filtered = data.filter((cust) =>
      cust.services.some((id) => {
        const s = servicesData.find((x) => x.id === id);
        return s && s.category === filterCategory;
      })
    );
  }
  const totalPages = Math.max(1, Math.ceil(filtered.length / CUSTOMS_PER_PAGE));
  page = Math.max(1, Math.min(page, totalPages));
  const pagedData = filtered.slice(
    (page - 1) * CUSTOMS_PER_PAGE,
    page * CUSTOMS_PER_PAGE
  );
  if (filtered.length === 0) {
    container.innerHTML = `
    <div class="custom-list-empty-tailwind flex flex-col items-center justify-center gap-2 px-6 py-10 rounded-xl bg-white shadow-lg text-center border border-[#e5e1fa]">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#8e6fff" stroke-width="2.3" viewBox="0 0 24 24" class="mx-auto mb-2" style="width:42px;height:42px;opacity:0.6;">
        <circle cx="12" cy="12" r="9" />
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v5" />
        <circle cx="12" cy="16" r="1.2" fill="#8e6fff" />
      </svg>
      <span class="font-semibold text-[#8e6fff]">Belum ada gabungan paket tersimpan.</span>
      <span class="text-[#3d347d] font-medium">Silahkan menambahkan Kustomisasi untuk menampilkan list di sini.</span>
    </div>
  `;
    document.getElementById("custom-pagination").innerHTML = "";
    return;
  }
  container.innerHTML = "";
  pagedData.forEach((cust) => {
    const div = document.createElement("div");
    div.className =
      "custom-list-card flex flex-col items-start bg-white rounded-2xl shadow-lg border border-[#e5e1fa] p-6 mb-4";
    div.innerHTML = `
  <div class="custom-list-title">${cust.name}</div>
  <div class="custom-list-services">
    Gabungan: ${cust.services
      .map((id) => servicesData.find((s) => s.id === id)?.title || "")
      .join(" + ")}
  </div>
  <div class="custom-list-price">
    <b>Harga: Rp${cust.price.toLocaleString()} (${cust.duration} bulan)</b>
  </div>
  <div class="custom-list-notes">
    ${cust.notes ? "Catatan: " + cust.notes : ""}
  </div>
  <div class="custom-list-actions flex flex-wrap md:flex-nowrap gap-2 md:gap-3 w-full mt-3 items-center">
    <button 
      data-id="${cust.id}" 
      class="custom-list-edit h-11 flex items-center justify-center font-bold rounded-lg px-6 min-w-[100px] text-white text-[1rem] bg-[#8e6fff] hover:bg-[#6e4fff] transition"
    >Edit</button>
    <button 
      data-id="${cust.id}" 
      class="custom-list-delete h-11 flex items-center justify-center font-bold rounded-lg px-6 min-w-[100px] text-white text-[1rem] bg-[#e04965] hover:bg-[#c0344e] transition"
    >Hapus</button>
    <button 
      data-id="${cust.id}" 
      data-type="custom" 
      class="btn-purchase h-11 flex items-center justify-center font-bold rounded-lg px-6 min-w-[100px] text-white text-[1rem] bg-[#49e097] hover:bg-[#37c77f] transition"
    >Beli Paket Ini</button>
  </div>
`;
    container.appendChild(div);
  });
  renderCustomPagination(totalPages, page, filterCategory);
  container.querySelectorAll(".custom-list-edit").forEach((btn) => {
    btn.onclick = function () {
      const id = btn.getAttribute("data-id");
      const allData = loadCustomizations();
      const cust = allData.find((c) => c.id === id);
      if (cust) {
        renderCustomForm(cust);
        saveEditCache(cust);
        scrollToCustomForm();
        showSnackbar("Mode edit aktif!", "info");
        document.getElementById("custom-result").textContent =
          "Edit mode aktif";
        document.getElementById("custom-result").style.color = "#3d347d";
      }
    };
  });
  let pendingDeleteId = null;
  let pendingDeleteCallback = null;
  container.querySelectorAll(".custom-list-delete").forEach((btn) => {
    btn.onclick = function () {
      pendingDeleteId = btn.getAttribute("data-id");
      pendingDeleteCallback = () => {
        let allData = loadCustomizations();
        allData = allData.filter((c) => c.id !== pendingDeleteId);
        saveCustomizations(allData);
        clearEditCache();
        let newPage = page;
        let filteredAfterDelete = allData;
        if (filterCategory !== "all") {
          filteredAfterDelete = allData.filter((cust) =>
            cust.services.some((id) => {
              const s = servicesData.find((x) => x.id === id);
              return s && s.category === filterCategory;
            })
          );
        }
        const totalPagesAfterDelete = Math.max(
          1,
          Math.ceil(filteredAfterDelete.length / CUSTOMS_PER_PAGE)
        );
        if (newPage > totalPagesAfterDelete) newPage = totalPagesAfterDelete;
        renderGabunganPaketList(filterCategory, newPage);
        renderCustomForm();
        showSnackbar("Kustomisasi berhasil dihapus", "success");
        document.getElementById("custom-result").textContent =
          "Kustomisasi berhasil dihapus";
        document.getElementById("custom-result").style.color = "#3d347d";
        pendingDeleteId = null;
        pendingDeleteCallback = null;
      };
      document.getElementById("confirm-modal").classList.remove("hidden");
    };
  });
  const confirmCancelBtn = document.getElementById("confirm-cancel");
  const confirmDeleteBtn = document.getElementById("confirm-delete");
  if (confirmCancelBtn && confirmDeleteBtn) {
    confirmCancelBtn.onclick = function () {
      document.getElementById("confirm-modal").classList.add("hidden");
      pendingDeleteId = null;
      pendingDeleteCallback = null;
    };
    confirmDeleteBtn.onclick = function () {
      document.getElementById("confirm-modal").classList.add("hidden");
      if (pendingDeleteCallback) pendingDeleteCallback();
    };
  }
  container.querySelectorAll(".btn-purchase").forEach((btn) => {
    btn.onclick = function () {
      const id = btn.getAttribute("data-id");
      const allData = loadCustomizations();
      const cust = allData.find((c) => c.id === id);
      if (cust) {
        showPurchaseModal({
          type: "custom",
          title: cust.name,
          desc:
            "Gabungan: " +
            cust.services
              .map((sid) => servicesData.find((s) => s.id === sid)?.title || "")
              .join(" + ") +
            (cust.notes ? "<br>Catatan: " + cust.notes : ""),
          price:
            "Rp" + cust.price.toLocaleString() + ` (${cust.duration} bulan)`,
        });
      }
    };
  });
}

function renderCustomPagination(totalPages, currentPage, filterCategory) {
  const container = document.getElementById("custom-pagination");
  container.innerHTML = "";
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.dataset.page = i;
    btn.className = i === currentPage ? "active" : "";
    btn.disabled = i === currentPage;
    btn.onclick = function () {
      renderGabunganPaketList(filterCategory, i);
    };
    container.appendChild(btn);
  }
}

function formatCategory(cat) {
  switch (cat) {
    case "digital":
      return "Digital Marketing";
    case "ads":
      return "Iklan & Campaign";
    case "creative":
      return "Kreatif & Konten";
    case "web":
      return "Website & Development";
    default:
      return "Lainnya";
  }
}

function renderServiceCatalog(category = "all") {
  const grid = document.getElementById("service-catalog");
  let filtered =
    category === "all"
      ? servicesData
      : servicesData.filter((s) => s.category === category);
  grid.innerHTML = "";
  filtered.forEach((service) => {
    const card = document.createElement("div");
    card.className =
      "service-card flex flex-col justify-between items-stretch bg-white rounded-2xl shadow-lg border border-[#e5e1fa] p-7";
    card.innerHTML = `
      <div>
        <div class="service-category">${formatCategory(service.category)}</div>
        <div class="service-title">${service.title}</div>
        <div class="service-desc">${service.desc}</div>
        <div class="service-price">Rp${service.price.toLocaleString()}</div>
        <ul>${service.features.map((f) => `<li>${f}</li>`).join("")}</ul>
        <div class="text-gray-500">Durasi: ${service.duration}</div>
      </div>
      <button class="btn-purchase" data-id="${
        service.id
      }" data-type="single">Beli Layanan</button>
    `;
    grid.appendChild(card);
  });
  grid.querySelectorAll(".btn-purchase").forEach((btn) => {
    btn.onclick = function () {
      const id = btn.getAttribute("data-id");
      const service = servicesData.find((s) => s.id === id);
      if (service) {
        showPurchaseModal({
          type: "single",
          title: service.title,
          desc: service.desc,
          price:
            "Rp" + service.price.toLocaleString() + ` (${service.duration})`,
        });
      }
    };
  });
}

function renderComboServices(containerId, checkedIds = []) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";
  servicesData.forEach((s) => {
    const label = document.createElement("label");
    label.className = "inline-flex items-center mr-4 mb-2 font-medium";
    label.innerHTML = `
      <input type="checkbox" value="${s.id}" ${
      checkedIds.includes(s.id) ? "checked" : ""
    } class="mr-2" />
      ${s.title}
    `;
    container.appendChild(label);
  });
}
function getSelectedComboServices(containerId) {
  return Array.from(
    document
      .getElementById(containerId)
      .querySelectorAll("input[type='checkbox']:checked")
  ).map((el) => el.value);
}
function getSelectedExtras(selectId) {
  return Array.from(document.getElementById(selectId).selectedOptions).map(
    (opt) => opt.value
  );
}

function setupCalculator() {
  renderComboServices("calc-combo-services");
  document.getElementById("calc-btn").addEventListener("click", function () {
    const selected = getSelectedComboServices("calc-combo-services");
    const durasi =
      parseInt(document.getElementById("calc-duration").value, 10) || 1;
    const extras = getSelectedExtras("calc-extra");
    const result = document.getElementById("calc-result");
    if (selected.length === 0) {
      result.textContent = "Pilih minimal satu layanan untuk estimasi.";
      result.style.color = "#d32f2f";
      return;
    }
    let total = 0;
    selected.forEach((id) => {
      const s = servicesData.find((x) => x.id === id);
      total += s ? s.price : 0;
    });
    total *= durasi;
    extras.forEach((e) => (total += extraPrice[e] || 0));
    result.innerHTML = `Estimasi biaya gabungan: <span class="text-[#8e6fff]">Rp${total.toLocaleString()}</span> (${durasi} bulan)`;
    result.style.color = "#3d347d";
  });
}

function renderCompareTable() {
  const tbody = document.getElementById("compare-table-body");
  tbody.innerHTML = "";
  servicesData.forEach((s) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="font-bold">${s.title}</td>
      <td>Rp${s.price.toLocaleString()}</td>
      <td>${s.features.join(", ")}</td>
      <td>${s.duration}</td>
      <td>
        <span class="badge">Bisa digabung</span>
      </td>
      <td class="text-center">
        <button class="btn-purchase" data-id="${
          s.id
        }" data-type="single">Beli</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
  tbody.querySelectorAll(".btn-purchase").forEach((btn) => {
    btn.onclick = function () {
      const id = btn.getAttribute("data-id");
      const service = servicesData.find((s) => s.id === id);
      if (service) {
        showPurchaseModal({
          type: "single",
          title: service.title,
          desc: service.desc,
          price:
            "Rp" + service.price.toLocaleString() + ` (${service.duration})`,
        });
      }
    };
  });
}

function loadCustomizations() {
  return JSON.parse(localStorage.getItem("customPackages") || "[]");
}
function saveCustomizations(data) {
  localStorage.setItem("customPackages", JSON.stringify(data));
}
function saveEditCache(editData) {
  localStorage.setItem("customEditCache", JSON.stringify(editData || {}));
}
function loadEditCache() {
  return JSON.parse(localStorage.getItem("customEditCache") || "null");
}
function clearEditCache() {
  localStorage.removeItem("customEditCache");
}
function getEditFormData() {
  return {
    id: document.getElementById("custom-form").dataset.editId,
    services: getSelectedComboServices("custom-combine"),
    duration:
      parseInt(document.getElementById("custom-duration").value, 10) || 1,
    features: getSelectedExtras("custom-feature"),
    name: document.getElementById("custom-name").value.trim(),
    notes: document.getElementById("custom-notes").value.trim(),
  };
}
function renderCustomForm(editData = null) {
  renderComboServices("custom-combine", editData ? editData.services : []);
  const featureSelect = document.getElementById("custom-feature");
  Array.from(featureSelect.options).forEach((opt) => {
    opt.selected = editData && editData.features.includes(opt.value);
  });
  document.getElementById("custom-duration").value = editData
    ? editData.duration
    : 1;
  document.getElementById("custom-name").value = editData ? editData.name : "";
  document.getElementById("custom-notes").value = editData
    ? editData.notes
    : "";
  document.getElementById("custom-form").dataset.editId = editData
    ? editData.id
    : "";
  const customData = loadCustomizations();
  const isEdit = !!editData;
  document.getElementById("custom-save").disabled =
    !isEdit && customData.length >= 12;
  document.getElementById("custom-save").style.background =
    !isEdit && customData.length >= 12 ? "#ddd" : "#8e6fff";
  document.getElementById("custom-save").style.color =
    !isEdit && customData.length >= 12 ? "#aaa" : "#fff";
  if (isEdit) {
    document.getElementById("custom-result").textContent =
      "Jangan lupa menyimpan perubahanmu!";
    document.getElementById("custom-result").style.color = "#e04965";
  } else if (!isEdit && customData.length >= 12) {
    document.getElementById("custom-result").textContent =
      "Maksimal kustomisasi paket adalah 12. Hapus yang lama untuk tambah baru.";
    document.getElementById("custom-result").style.color = "#d32f2f";
  } else {
    document.getElementById("custom-result").textContent = "";
  }
  const form = document.getElementById("custom-form");
  ["input", "change"].forEach((ev) => {
    form.removeEventListener(ev, autoSaveEditCache);
    form.addEventListener(ev, autoSaveEditCache);
  });
}
function autoSaveEditCache() {
  const editId = document.getElementById("custom-form").dataset.editId;
  if (editId) {
    saveEditCache(getEditFormData());
  }
}

function estimateCustomPrice(services, duration, features) {
  let total = 0;
  services.forEach((id) => {
    const s = servicesData.find((x) => x.id === id);
    total += s ? s.price : 0;
  });
  total *= duration;
  features.forEach((e) => (total += extraPrice[e] || 0));
  return total;
}
function scrollToCustomForm() {
  const section = document.getElementById("custom-section");
  if (section) {
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
function setupCustomForm() {
  const cache = loadEditCache();
  if (cache && cache.id) renderCustomForm(cache);
  document
    .getElementById("custom-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      const services = getSelectedComboServices("custom-combine");
      const duration =
        parseInt(document.getElementById("custom-duration").value, 10) || 1;
      const features = getSelectedExtras("custom-feature");
      const name = document.getElementById("custom-name").value.trim();
      const notes = document.getElementById("custom-notes").value.trim();
      const editId = document.getElementById("custom-form").dataset.editId;
      if (!name || services.length === 0) {
        showSnackbar("Nama dan layanan gabungan wajib diisi.", "error");
        document.getElementById("custom-result").textContent =
          "Nama dan layanan gabungan wajib diisi.";
        document.getElementById("custom-result").style.color = "#d32f2f";
        return;
      }
      let data = loadCustomizations();
      if (!editId && data.length >= 12) {
        showSnackbar("Maksimal kustomisasi paket adalah 12.", "error");
        document.getElementById("custom-result").textContent =
          "Maksimal kustomisasi paket adalah 12.";
        document.getElementById("custom-result").style.color = "#d32f2f";
        return;
      }
      const price = estimateCustomPrice(services, duration, features);
      const filterCategory = document.getElementById(
        "custom-filter-category"
      ).value;
      const totalPages = Math.max(
        1,
        Math.ceil((editId ? data.length : data.length + 1) / CUSTOMS_PER_PAGE)
      );
      const currentPage = Number(
        document.querySelector(".custom-pagination button.active")?.dataset
          .page || 1
      );
      if (editId) {
        data = data.map((c) =>
          c.id === editId
            ? { ...c, services, duration, features, name, notes, price }
            : c
        );
        showSnackbar("Kustomisasi berhasil diubah!", "success");
        document.getElementById("custom-result").textContent =
          "Kustomisasi berhasil diubah!";
        document.getElementById("custom-result").style.color = "#3d347d";
        document.getElementById("custom-form").dataset.editId = "";
        clearEditCache();
        saveCustomizations(data);
        renderGabunganPaketList(filterCategory, currentPage);
      } else {
        const id = "cust" + Date.now();
        data.push({ id, services, duration, features, name, notes, price });
        showSnackbar("Kustomisasi berhasil ditambahkan!", "success");
        document.getElementById("custom-result").textContent =
          "Kustomisasi berhasil ditambahkan!";
        document.getElementById("custom-result").style.color = "#3d347d";
        saveCustomizations(data);
        renderGabunganPaketList(filterCategory, totalPages);
      }
      renderCustomForm();
      scrollToCustomForm();
    });

  document
    .getElementById("custom-filter-category")
    .addEventListener("change", function () {
      renderGabunganPaketList(this.value, 1);
    });
}

// Modal Pembelian
function showPurchaseModal({ type, title, desc, price }) {
  const modal = document.getElementById("purchase-modal");
  modal.classList.remove("hidden");
  document.getElementById("purchase-title").innerHTML = title;
  document.getElementById("purchase-desc").innerHTML = desc;
  document.getElementById("purchase-price").innerHTML = price;
  document.getElementById("purchase-success").classList.add("hidden");
  const btnConfirm = document.getElementById("purchase-confirm");
  btnConfirm.disabled = false;
  btnConfirm.textContent = "Konfirmasi Pembelian";
  btnConfirm.onclick = function () {
    btnConfirm.disabled = true;
    btnConfirm.textContent = "Memproses...";
    setTimeout(() => {
      btnConfirm.textContent = "Konfirmasi Pembelian";
      btnConfirm.disabled = false;
      document.getElementById("purchase-success").textContent =
        "Pembelian berhasil! Tim kami akan segera menghubungi Anda untuk proses selanjutnya.";
      document.getElementById("purchase-success").classList.remove("hidden");
      showSnackbar("Pembelian berhasil!", "success");
      setTimeout(() => {
        modal.classList.add("hidden");
        document.getElementById("purchase-success").classList.add("hidden");
      }, 2200);
    }, 1400);
  };
  document.getElementById("purchase-cancel").onclick = function () {
    modal.classList.add("hidden");
    document.getElementById("purchase-success").classList.add("hidden");
  };
}

// Init
document.addEventListener("DOMContentLoaded", function () {
  setupHamburgerMenu();
  renderServiceCatalog();
  document
    .getElementById("category-filter")
    .addEventListener("change", function () {
      renderServiceCatalog(this.value);
    });
  setupCalculator();
  renderCompareTable();
  renderCustomForm();
  setupCustomForm();
  renderGabunganPaketList();
});
