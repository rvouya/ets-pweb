# MabarYuk - Food Ordering Website

## Deskripsi Aplikasi
**MabarYuk** adalah sebuah aplikasi web pemesanan makanan (*food ordering*) interaktif yang dibangun secara mandiri menggunakan teknologi dasar web, yaitu HTML, CSS, dan JavaScript. Aplikasi ini dirancang khusus untuk memberikan pengalaman pemesanan yang sangat cepat dan praktis, selaras dengan semangat "mabar" (makan bareng) agar momen berkumpul tidak terbuang hanya untuk sekadar memilih menu.

## Fitur Aplikasi
- **Halaman Eksplorasi (Dashboard):** Menampilkan rekomendasi restoran terbaik, daftar promo terkini (seperti Pesta Gajian dan Gratis Ongkir), serta akses cepat ke berbagai kategori makanan. Fitur ini memberikan panduan visual yang menarik agar pengguna dapat segera menemukan makanan yang diinginkan.
- **Pencarian dan Kategori Pintar:** Memungkinkan pengguna mencari menu atau nama restoran secara spesifik, didukung dengan riwayat pencarian terakhir. Terdapat juga tombol kategori interaktif (seperti Nasi, Ayam, Seafood) untuk menyaring jenis makanan dengan cepat tanpa perlu mengetik.
- **Rekomendasi Menu Restoran:** Memfasilitasi pengguna untuk menemukan restoran lebih cepat dengan menyediakan rekomendasi restoran terbaik.
- **Checkout dan Biaya Transparan:** Menampilkan rincian tagihan secara detail sebelum pembayaran diproses, yang mencakup subtotal makanan, ongkos kirim, biaya layanan, dan potongan promo. Transparansi ini memberikan rasa aman bagi pengguna karena tidak ada biaya tersembunyi di akhir pemesanan.
- **Personalisasi Catatan Pengiriman:** Menyediakan dua kolom instruksi spesifik yang terpisah: satu untuk pihak restoran (untuk menyesuaikan rasa atau komposisi bahan) dan satu untuk kurir (untuk detail titik lokasi pengantaran).
- **Penjadwalan Fleksibel:** Memungkinkan pengguna mengatur kapan pesanan harus dikirim melalui opsi rentang waktu dan tanggal. Pengguna dapat memilih pengiriman instan saat itu juga atau menjadwalkannya untuk jam tertentu.
- **Promo Makanan:** Pada menu checkout, dapat memilih promo untuk mengurangi biaya yang diperlukan untuk membeli makanan.
- **Opsi Ramah Lingkungan:** Menyediakan tombol aktivasi khusus bagi pengguna untuk meminta atau menolak alat makan plastik (sendok dan garpu) pelengkap.

## Tools yang Digunakan
- **HTML5:** Struktur dasar halaman (Multi-page application).
- **CSS3:** Styling vanilla responsif per halaman.
- **JavaScript (Vanilla):** Interaksi DOM, data app lokal, dan simulasi keranjang/checkout.

## Struktur Folder
```text
ets-pweb/
├── assets/             # Berisi kumpulan aset gambar dan icon
│   ├── icons/
│   └── images/
├── pages/              # Halaman-halaman antarmuka HTML
│   ├── checkout.html
│   ├── item_detail.html
│   ├── landing_page.html
│   ├── login.html
│   ├── restaurant.html
│   └── user_profile.html
├── scripts/            # Logika interaktivitas JavaScript untuk setiap halaman
│   ├── app-data.js     # Data dummy makanan, promo, dll.
│   ├── checkout.js
│   ├── item-detail.js
│   ├── landing.js
│   ├── login.js
│   ├── restaurant.js
│   ├── script.js
│   └── user-profile.js
└── styles/             # File CSS spesifik komponen dan layout halaman
    ├── base.css
    ├── checkout.css
    ├── item-detail.css
    ├── landing-page.css
    ├── login.css
    ├── profile.css
    ├── restaurant.css
    └── style.css
```

## Cara Menjalankan Aplikasi
Buka link https://rvouya.github.io/ets-pweb/pages/landing_page.html menggunakan browser pilihan Anda (Google Chrome, Firefox, Safari, dll).