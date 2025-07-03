// Klik ikon love akan menukar antara bi-heart dan bi-heart-fill
  document.querySelectorAll('.bi-heart').forEach(icon => {
    icon.addEventListener('click', () => {
      icon.classList.toggle('bi-heart');
      icon.classList.toggle('bi-heart-fill');
    });
  });
  
// Bagian IndexDB pada komentar di setiap card
const dbName = "KomentarDB";
  const storeName = "komentar";

  // Inisialisasi IndexedDB
  function openDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(dbName, 1);
      request.onerror = () => reject("Gagal membuka IndexedDB");
      request.onsuccess = () => resolve(request.result);
      request.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName, { keyPath: "id" });
        }
      };
    });
  }

  // Untuk Menyimpan komentar
  async function simpanKomentar(id, teks) {
    const db = await openDB();
    const tx = db.transaction(storeName, "readwrite");
    const store = tx.objectStore(storeName);
    const komentar = { id: crypto.randomUUID(), tempat: id, teks };
    store.add(komentar);
  }

  // Mengambil semua komentar
  async function ambilSemuaKomentar() {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(storeName, "readonly");
      const store = tx.objectStore(storeName);
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
    });
  }

  // Hapus komentar
  async function hapusKomentar(id) {
    const db = await openDB();
    const tx = db.transaction(storeName, "readwrite");
    const store = tx.objectStore(storeName);
    store.delete(id);
  }

  // Tampilkan komentar dari IndexedDB
  async function tampilkanKomentar() {
    const semuaKomentar = await ambilSemuaKomentar();
    semuaKomentar.forEach(k => {
      const tempat = document.getElementById("comment-" + k.tempat);
      if (tempat) {
        const div = document.createElement("div");
        div.classList.add("comment-box");

        const span = document.createElement("span");
        span.textContent = k.teks;

        const btn = document.createElement("button");
        btn.textContent = "Hapus";
        btn.onclick = async () => {
          div.remove();
          await hapusKomentar(k.id);
        };

        div.appendChild(span);
        div.appendChild(btn);
        tempat.appendChild(div);
        tempat.classList.add("active");
      }
    });
  }

  // Tambahkan komentar dari input
  async function tambahKomentar(id) {
    const input = document.getElementById("input-" + id);
    const teks = input.value.trim();
    if (teks !== "") {
      await simpanKomentar(id, teks);
      input.value = "";
      await tampilUlangKomentar(); // bersihkan & tampilkan ulang
    }
  }

  async function tampilUlangKomentar() {
    document.querySelectorAll(".comment-section").forEach(sec => sec.innerHTML = "");
    await tampilkanKomentar();
  }

  // Panggil saat halaman dimuat
  document.addEventListener("DOMContentLoaded", tampilkanKomentar);

  // Tangkap error global untuk debugging mobile
  window.onerror = function (message, source, lineno, colno, error) {
    console.warn("Terjadi error global:", message);
    return true;
  };

  