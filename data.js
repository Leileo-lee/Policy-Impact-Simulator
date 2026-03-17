/**
 * data.js — PolicyCity
 * Semua data skenario dan kebijakan.
 * Untuk menambah skenario baru: tambahkan objek baru ke array SC.
 */

const SC = [
  {
    id: 'fire',
    theme: 'fire-t',
    tag: '🔴 DARURAT',
    tagStyle: 'background:rgba(255,107,107,0.2);color:#ff6b6b',
    icon: '🔥',
    name: 'Kebakaran Permukiman Padat',
    desc: 'Api besar melahap kawasan permukiman padat Jakarta Barat. Asap tebal menyelimuti area dan ratusan keluarga terancam kehilangan rumah.',
    pills: ['500+ jiwa terdampak', '2 hektare', 'Status: DARURAT'],
    diff: 'hard',
    policies: [
      {
        id: 'a', ico: '🚒',
        name: 'Kerahkan Pemadam Kebakaran',
        desc: '5 unit mobil pemadam + tim penyelamat. Respons langsung ke sumber api.',
        budget: 'Rp 150 juta', time: '30 menit', score: 82,
        impact: {
          Lingkungan:  { v: 68, d:  1 },
          Masyarakat:  { v: 85, d:  1 },
          Ekonomi:     { v: 50, d: -1 },
          Kesehatan:   { v: 78, d:  1 },
        },
      },
      {
        id: 'b', ico: '🏕️',
        name: 'Bangun Pos Pengungsian',
        desc: 'Tenda darurat + distribusi logistik untuk semua pengungsi.',
        budget: 'Rp 80 juta', time: '1 jam', score: 64,
        impact: {
          Lingkungan:  { v: 25, d: -1 },
          Masyarakat:  { v: 90, d:  1 },
          Ekonomi:     { v: 30, d: -1 },
          Kesehatan:   { v: 82, d:  1 },
        },
      },
      {
        id: 'c', ico: '🚫',
        name: 'Evakuasi & Tutup Jalan',
        desc: 'Paksa evakuasi warga radius 500m. Prioritaskan keselamatan jiwa.',
        budget: 'Rp 20 juta', time: '15 menit', score: 74,
        impact: {
          Lingkungan:  { v: 18, d: -1 },
          Masyarakat:  { v: 95, d:  1 },
          Ekonomi:     { v: 15, d: -1 },
          Kesehatan:   { v: 96, d:  1 },
        },
      },
      {
        id: 'd', ico: '📣',
        name: 'Mobilisasi Relawan RT/RW',
        desc: 'Aktifkan jaringan komunitas untuk bantu penanganan.',
        budget: 'Rp 5 juta', time: '45 menit', score: 45,
        impact: {
          Lingkungan:  { v: 20, d: -1 },
          Masyarakat:  { v: 60, d:  1 },
          Ekonomi:     { v: 40, d:  1 },
          Kesehatan:   { v: 50, d:  1 },
        },
      },
    ],
  },

  {
    id: 'flood',
    theme: 'flood-t',
    tag: '🔵 SIAGA 1',
    tagStyle: 'background:rgba(72,202,228,0.2);color:#48cae4',
    icon: '🌊',
    name: 'Banjir Rob Jakarta Utara',
    desc: 'Banjir rob 1,5 meter menggenangi Jakarta Utara. Infrastruktur rusak parah dan ribuan warga terjebak genangan.',
    pills: ['2.000+ jiwa terdampak', '15 hektare', 'Siaga 1'],
    diff: 'hard',
    policies: [
      {
        id: 'a', ico: '⛽',
        name: 'Aktifkan Pompa Banjir',
        desc: '20 unit pompa kapasitas besar bekerja 24 jam penuh.',
        budget: 'Rp 200 juta', time: '2 jam', score: 76,
        impact: {
          Genangan:      { v: 72, d:  1 },
          Kesehatan:     { v: 70, d:  1 },
          Infrastruktur: { v: 55, d:  1 },
          Ekonomi:       { v: 60, d:  1 },
        },
      },
      {
        id: 'b', ico: '🛶',
        name: 'Perahu Evakuasi Massal',
        desc: '30 unit perahu karet, prioritaskan lansia dan anak-anak.',
        budget: 'Rp 120 juta', time: '1 jam', score: 70,
        impact: {
          Genangan:      { v: 30, d: -1 },
          Kesehatan:     { v: 88, d:  1 },
          Infrastruktur: { v: 20, d: -1 },
          Ekonomi:       { v: 35, d: -1 },
        },
      },
      {
        id: 'c', ico: '🏗️',
        name: 'Tanggul Karung Pasir',
        desc: 'Pasang tanggul portabel di titik-titik kritis untuk bendung air.',
        budget: 'Rp 350 juta', time: '3 jam', score: 83,
        impact: {
          Genangan:      { v: 80, d:  1 },
          Kesehatan:     { v: 72, d:  1 },
          Infrastruktur: { v: 85, d:  1 },
          Ekonomi:       { v: 70, d:  1 },
        },
      },
      {
        id: 'd', ico: '📱',
        name: 'Sistem Peringatan Dini',
        desc: 'SMS blast + sirine agar warga bersiap sebelum banjir tiba.',
        budget: 'Rp 15 juta', time: '10 menit', score: 52,
        impact: {
          Genangan:      { v: 10, d: -1 },
          Kesehatan:     { v: 65, d:  1 },
          Infrastruktur: { v: 15, d: -1 },
          Ekonomi:       { v: 30, d: -1 },
        },
      },
    ],
  },

  {
    id: 'traffic',
    theme: 'traffic-t',
    tag: '🟡 KRITIS',
    tagStyle: 'background:rgba(255,209,102,0.2);color:#ffd166',
    icon: '🚗',
    name: 'Kemacetan Total Ibu Kota',
    desc: '12 ruas utama lumpuh selama 6+ jam akibat kecelakaan beruntun. Kerugian ekonomi Rp 100 miliar per jam.',
    pills: ['12 ruas terdampak', 'Rp 100M/jam', 'Status: KRITIS'],
    diff: 'med',
    policies: [
      {
        id: 'a', ico: '🚔',
        name: 'Rekayasa Lalu Lintas',
        desc: '200 personel polisi atur lalu lintas + buka jalur alternatif.',
        budget: 'Rp 50 juta', time: '30 menit', score: 68,
        impact: {
          Mobilitas:  { v: 65, d:  1 },
          Lingkungan: { v: 40, d: -1 },
          Ekonomi:    { v: 62, d:  1 },
          Kepuasan:   { v: 70, d:  1 },
        },
      },
      {
        id: 'b', ico: '🚌',
        name: 'Gratiskan Transportasi Umum',
        desc: 'Bus + MRT gratis selama kemacetan agar warga beralih moda.',
        budget: 'Rp 500 juta', time: '1 jam', score: 79,
        impact: {
          Mobilitas:  { v: 75, d:  1 },
          Lingkungan: { v: 82, d:  1 },
          Ekonomi:    { v: 40, d: -1 },
          Kepuasan:   { v: 88, d:  1 },
        },
      },
      {
        id: 'c', ico: '⛔',
        name: 'Ganjil-Genap Darurat',
        desc: 'Sistem ganjil-genap di semua ruas kota selama 3 hari.',
        budget: 'Rp 30 juta', time: '2 jam', score: 73,
        impact: {
          Mobilitas:  { v: 72, d:  1 },
          Lingkungan: { v: 76, d:  1 },
          Ekonomi:    { v: 48, d: -1 },
          Kepuasan:   { v: 52, d: -1 },
        },
      },
      {
        id: 'd', ico: '🏠',
        name: 'Imbau WFH Massal',
        desc: 'Anjuran bekerja dari rumah selama 3 hari untuk semua sektor.',
        budget: 'Rp 2 juta', time: '1 hari', score: 71,
        impact: {
          Mobilitas:  { v: 82, d:  1 },
          Lingkungan: { v: 88, d:  1 },
          Ekonomi:    { v: 38, d: -1 },
          Kepuasan:   { v: 78, d:  1 },
        },
      },
    ],
  },

  {
    id: 'health',
    theme: 'health-t',
    tag: '🟢 KLB',
    tagStyle: 'background:rgba(6,214,160,0.2);color:#06d6a0',
    icon: '🏥',
    name: 'Wabah DBD Melonjak',
    desc: 'Kasus DBD meledak 300% dalam 2 minggu. RS kewalahan, stok trombosit menipis kritis di semua wilayah.',
    pills: ['850 kasus/minggu', 'RS penuh 70%', 'Status: KLB'],
    diff: 'med',
    policies: [
      {
        id: 'a', ico: '🦟',
        name: 'Fogging Massal',
        desc: 'Fogging di semua RW terdampak + distribusi abate gratis.',
        budget: 'Rp 2 miliar', time: '1 minggu', score: 67,
        impact: {
          Kesehatan:   { v: 68, d:  1 },
          Lingkungan:  { v: 38, d: -1 },
          Masyarakat:  { v: 72, d:  1 },
          Efektivitas: { v: 65, d:  1 },
        },
      },
      {
        id: 'b', ico: '🏡',
        name: 'Gerakan 3M Plus',
        desc: 'Kampanye kuras–tutup–daur ulang oleh kader kesehatan kelurahan.',
        budget: 'Rp 300 juta', time: '2 minggu', score: 81,
        impact: {
          Kesehatan:   { v: 72, d:  1 },
          Lingkungan:  { v: 92, d:  1 },
          Masyarakat:  { v: 88, d:  1 },
          Efektivitas: { v: 78, d:  1 },
        },
      },
      {
        id: 'c', ico: '💉',
        name: 'Pos Kesehatan Darurat',
        desc: '50 pos gratis + prioritaskan stok trombosit ke semua RS.',
        budget: 'Rp 5 miliar', time: '2 hari', score: 88,
        impact: {
          Kesehatan:   { v: 92, d:  1 },
          Lingkungan:  { v: 45, d: -1 },
          Masyarakat:  { v: 90, d:  1 },
          Efektivitas: { v: 88, d:  1 },
        },
      },
      {
        id: 'd', ico: '📊',
        name: 'Surveilans & Pemetaan',
        desc: 'Peta sebaran kasus real-time untuk penanganan lebih tepat sasaran.',
        budget: 'Rp 400 juta', time: '3 hari', score: 72,
        impact: {
          Kesehatan:   { v: 58, d:  1 },
          Lingkungan:  { v: 72, d:  1 },
          Masyarakat:  { v: 65, d:  1 },
          Efektivitas: { v: 72, d:  1 },
        },
      },
    ],
  },

  {
    id: 'waste',
    theme: 'waste-t',
    tag: '🟣 DARURAT',
    tagStyle: 'background:rgba(199,125,255,0.2);color:#c77dff',
    icon: '🗑️',
    name: 'Krisis Sampah Pasca Lebaran',
    desc: 'Volume sampah meledak 400% pasca Lebaran. TPA Bantar Gebang hampir penuh, tumpukan membusuk di jalan.',
    pills: ['12.000 ton/hari', 'TPA 95% penuh', 'Status: DARURAT'],
    diff: 'easy',
    policies: [
      {
        id: 'a', ico: '🚛',
        name: 'Tambah Armada 3 Shift',
        desc: '200 truk sewa + operasi pengangkutan 24 jam penuh.',
        budget: 'Rp 3 miliar', time: '1 hari', score: 75,
        impact: {
          Sanitasi:   { v: 82, d:  1 },
          Lingkungan: { v: 55, d: -1 },
          Masyarakat: { v: 85, d:  1 },
          TPA:        { v: 35, d: -1 },
        },
      },
      {
        id: 'b', ico: '♻️',
        name: 'Bank Sampah Darurat',
        desc: '500 bank sampah kelurahan pilah dan daur ulang aktif.',
        budget: 'Rp 800 juta', time: '2 hari', score: 84,
        impact: {
          Sanitasi:   { v: 65, d:  1 },
          Lingkungan: { v: 92, d:  1 },
          Masyarakat: { v: 80, d:  1 },
          TPA:        { v: 78, d:  1 },
        },
      },
      {
        id: 'c', ico: '🔥',
        name: 'Insinerator Mobile',
        desc: '10 unit insinerator bakar sampah sisa secara langsung.',
        budget: 'Rp 4 miliar', time: '2 hari', score: 58,
        impact: {
          Sanitasi:   { v: 90, d:  1 },
          Lingkungan: { v: 18, d: -1 },
          Masyarakat: { v: 45, d: -1 },
          TPA:        { v: 88, d:  1 },
        },
      },
      {
        id: 'd', ico: '📣',
        name: 'Kampanye Zero Waste',
        desc: 'Larang plastik sekali pakai + kampanye bawa wadah sendiri.',
        budget: 'Rp 100 juta', time: '1 minggu', score: 52,
        impact: {
          Sanitasi:   { v: 22, d: -1 },
          Lingkungan: { v: 96, d:  1 },
          Masyarakat: { v: 62, d:  1 },
          TPA:        { v: 38, d:  1 },
        },
      },
    ],
  },
];

// Kode Google Apps Script (ditampilkan di halaman Setup)
const GAS_CODE = `function doPost(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Data") || ss.getSheets()[0];
  var d = JSON.parse(e.postData.contents);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["Timestamp","Nama","Kelas",
      "Skenario","Kebijakan","Skor",
      "Waktu (detik)","Rank"]);
  }
  sheet.appendRow([
    d.timestamp, d.nama, d.kelas,
    d.skenario,  d.kebijakan, d.skor,
    d.waktu_detik, d.rank
  ]);
  return ContentService
    .createTextOutput(JSON.stringify({ status: "ok" }))
    .setMimeType(ContentService.MimeType.JSON);
}`;
