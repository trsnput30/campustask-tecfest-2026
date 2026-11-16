
/* CAMP USTASK - JAVASCRIPT */

// Tombol halaman utama
const tombolMulai = document.getElementById("tombolMulai");

if (tombolMulai) {
    tombolMulai.addEventListener("click", function() {
        window.location.href = "dashboard.html";
    });
}

// Elemen dashboard
const tombolTambah = document.getElementById("tambahTugas");
const daftar = document.getElementById("daftarTugas");

// Mengambil data tersimpan
let semuaTugas = JSON.parse(
    localStorage.getItem("campustask_tugas") || "[]"
);

// Menyimpan tugas
function simpanTugas() {
    localStorage.setItem(
        "campustask_tugas",
        JSON.stringify(semuaTugas)
    );
}

// Menghitung statistik
function perbaruiStatistik() {
    const total = semuaTugas.length;
    const selesai = semuaTugas.filter(function(tugas) {
        return tugas.selesai === true;
    }).length;

    const belum = total - selesai;

    const totalEl = document.getElementById("totalTugas");
    const selesaiEl = document.getElementById("tugasSelesai");
    const belumEl = document.getElementById("tugasBelum");

    if (totalEl) totalEl.textContent = total;
    if (selesaiEl) selesaiEl.textContent = selesai;
    if (belumEl) belumEl.textContent = belum;
}

// Menampilkan daftar tugas
function tampilkanTugas() {
    if (!daftar) return;

    daftar.innerHTML = "";

    semuaTugas.forEach(function(tugas, index) {
        const item = document.createElement("li");

        const teks = document.createElement("span");
        teks.textContent =
            tugas.nama +
            " | Deadline: " + tugas.deadline +
            " | Prioritas: " + tugas.prioritas;

        if (tugas.selesai) {
            teks.style.textDecoration = "line-through";
            teks.style.opacity = "0.6";
        }

        // Tombol selesai
        const tombolSelesai = document.createElement("button");
        tombolSelesai.textContent = tugas.selesai
            ? "↩ Batalkan Selesai"
            : "✓ Selesai";

        tombolSelesai.addEventListener("click", function() {
            semuaTugas[index].selesai = !semuaTugas[index].selesai;
            simpanTugas();
            tampilkanTugas();
        });

        // Tombol hapus
        const tombolHapus = document.createElement("button");
        tombolHapus.textContent = "🗑 Hapus";

        tombolHapus.addEventListener("click", function() {
            semuaTugas.splice(index, 1);
            simpanTugas();
            tampilkanTugas();
        });

        item.appendChild(teks);
        item.appendChild(document.createElement("br"));
        item.appendChild(tombolSelesai);
        item.appendChild(tombolHapus);

        daftar.appendChild(item);
    });

    perbaruiStatistik();
}

// Menambahkan tugas baru
if (tombolTambah) {
    tombolTambah.addEventListener("click", function() {
        const input = document.getElementById("namaTugas");
        const deadline = document.getElementById("deadline");
        const prioritas = document.getElementById("prioritas");

        const nama = input.value.trim();

        if (nama === "") {
            alert("Isi nama tugas dulu yaa!");
            return;
        }

        if (deadline.value === "") {
            alert("Pilih deadline tugas dulu yaa!");
            return;
        }

        semuaTugas.push({
            nama: nama,
            deadline: deadline.value,
            prioritas: prioritas.value,
            selesai: false
        });

        simpanTugas();
        tampilkanTugas();

        input.value = "";
        deadline.value = "";
    });
}

// Menampilkan data saat halaman dibuka
tampilkanTugas();
