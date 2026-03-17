# 🏙️ PolicyCity — Policy Impact Simulator

Simulator kebijakan publik berbasis game untuk siswa SMAN 65 Jakarta.

## Struktur File

```
policycity/
├── index.html        ← Buka ini di browser
├── style.css         ← Semua tampilan
├── data.js           ← Data skenario & kebijakan
├── app.js            ← Logika game
├── apps-script.gs    ← Kode untuk Google Sheets
└── README.md
```

## Cara Pakai (Siswa)

1. Buka `index.html` di browser (Chrome/Edge/Firefox)
2. Isi nama dan kelas
3. Pilih skenario kota yang ingin ditangani
4. Pilih 1 kebijakan terbaik menurut kamu
5. Lihat dampak dan skor kebijakan kamu

## Cara Pakai (Guru) — Setup Google Sheets

Agar data semua siswa terkumpul otomatis:

1. Buka [sheets.new](https://sheets.new) → buat spreadsheet baru
2. Buka **Extensions → Apps Script**
3. Hapus kode default, paste isi file `apps-script.gs`
4. Klik **Deploy → New deployment**
   - Type: **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Klik Deploy, izinkan akses, **salin URL Web App**
6. Di aplikasi, klik ikon ⚙️ (pojok kanan bawah)
7. Paste URL Web App → Test Koneksi → Simpan

Data yang dikumpulkan per siswa:
| Kolom | Keterangan |
|-------|-----------|
| Timestamp | Waktu submit |
| Nama | Nama siswa |
| Kelas | Kelas siswa |
| Skenario | Skenario yang dimainkan |
| Kebijakan | Kebijakan yang dipilih |
| Skor | Skor akhir (0–100) |
| Waktu (detik) | Lama siswa memutuskan |
| Rank | S / A / B / C / D |

## Menambah Skenario Baru

Edit file `data.js`, tambahkan objek baru ke array `SC`:

```js
{
  id: 'gempa',               // id unik
  theme: 'fire-t',           // tema warna: fire-t | flood-t | traffic-t | health-t | waste-t
  tag: '🔴 DARURAT',
  tagStyle: 'background:rgba(255,107,107,0.2);color:#ff6b6b',
  icon: '🌋',
  name: 'Gempa Jakarta',
  desc: 'Deskripsi situasi...',
  pills: ['Info 1', 'Info 2', 'Info 3'],
  diff: 'hard',              // easy | med | hard
  policies: [
    {
      id: 'a', ico: '🏕️',
      name: 'Nama Kebijakan',
      desc: 'Deskripsi kebijakan.',
      budget: 'Rp X miliar', time: 'Y jam', score: 80,
      impact: {
        DimensiA: { v: 75, d:  1 },   // d: 1 = positif, -1 = negatif
        DimensiB: { v: 40, d: -1 },
      },
    },
    // ... kebijakan lainnya
  ],
},
```

## Sistem Skor

- **Skor dasar**: ditentukan per kebijakan (45–88)
- **Time bonus**: semakin cepat memutuskan, bonus hingga +15 poin
- **Skor akhir**: maksimum 100

| Rank | Skor |
|------|------|
| S    | 90–100 |
| A    | 80–89  |
| B    | 70–79  |
| C    | 60–69  |
| D    | < 60   |
