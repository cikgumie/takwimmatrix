# 🌐 Landing Page TakwimMatrik Pro

Laman web promosi dan pengenalan bagi **TakwimMatrik Pro** (Sistem Pengurusan Takwim Pintar Sekolah & Institusi Pendidikan).

---

## 🚀 Panduan Hosting ke GitHub Pages

Fail dalam folder ini adalah statik sepenuhnya (`HTML`, `CSS`, `JS`) dan sedia dihoskan terus ke **GitHub Pages** tanpa perlu sebarang kompilasi (*Zero-Build*).

### Pilihan 1: Host daripada Subfolder `/landing-page` atau Root Repositori
1. Tolak (*commit & push*) folder `landing-page` ini ke repositori GitHub anda.
2. Di GitHub, navigasi ke tab **Settings** > **Pages** di bahagian menu sebelah kiri.
3. Di bawah **Build and deployment**:
   - **Source:** Pilih `Deploy from a branch`
   - **Branch:** Pilih cawangan utama anda (cth: `main`)
   - **Folder:** Jika anda memindahkan isi kandungan folder ini ke root repositori khusus untuk laman web, pilih `/ (root)`. Jika repositori ini adalah repositori utama, anda boleh menyalin fail dalam folder ini ke folder `/docs` dan pilih `/docs`.
4. Klik **Save**. Dalam masa 1-2 minit, URL langsung anda akan dijana:
   ```text
   https://<nama-pengguna-github>.github.io/<nama-repo>/
   ```

### Pilihan 2: Repositori Khas GitHub Pages (`<username>.github.io`)
Jika anda ingin laman web ini mempunyai alamat web utama percuma:
1. Buat repositori baharu bernama `<username>.github.io`.
2. Muat naik semua fail di dalam folder ini (`index.html`, `style.css`, `app.js`) terus ke *root* repositori tersebut.
3. Laman web anda akan aktif secara automatik di alamat `https://<username>.github.io`.

---

## 🎨 Ciri-Ciri Landing Page Ini:
- ⚡ **Pantas & Ringan:** Dikuasakan oleh Tailwind CSS (CDN) + Lucide Icons + Google Fonts *Plus Jakarta Sans*.
- 📱 **100% Responsif:** Sempurna dipaparkan pada semua saiz skrin telefon pintar, tablet, dan komputer.
- 🎮 **Widget Demo Interaktif:** Pengunjung boleh menguji penapisan unit acara secara terus pada laman web.
- 🔍 **Mesra SEO:** Mengandungi tag meta Open Graph, Twitter Cards, struktur tajuk h1-h3 semantik, dan teks alternatif.
