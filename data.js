/**
 * data.js — Policy Impact Simulator
 * SMAN 65 Jakarta
 * Skenario diperbarui sesuai dokumen soal resmi.
 */

const SC = [
  // ══════════════════════════════════════════
  // MUDAH — Krisis Sampah Pasca Lebaran
  // ══════════════════════════════════════════
  {
    id: 'waste',
    theme: 'waste-t',
    tag: '🟢 MUDAH',
    tagStyle: 'background:rgba(46,204,113,0.2);color:#27ae60',
    icon: '🗑️',
    name: 'Krisis Sampah Pasca Lebaran',
    desc: 'Volume sampah meningkat signifikan (±30–60%) pasca Lebaran akibat konsumsi rumah tangga dan mudik. TPS dan TPA mengalami overload, sementara sistem pengangkutan terbatas dan pemilahan sampah masih rendah.',
    pills: ['±30–60% lonjakan volume', 'TPA Bantargebang overload', 'Tingkat: MUDAH'],
    diff: 'easy',
    policies: [
      {
        id: 'a', ico: '🚛',
        name: 'Penambahan Armada dan Jam Operasional',
        desc: 'Penambahan armada truk + optimalisasi shift kerja (hingga 2–3 shift) untuk mempercepat pengangkutan sampah dari TPS ke TPA.',
        budget: 'Rp 1–1,5 miliar', time: '1–3 hari', score: 75,
        rank: 'A',
        impact: {
          Sanitasi:   { v: 85, d:  1 },
          Lingkungan: { v: 50, d: -1 },
          Masyarakat: { v: 80, d:  1 },
          TPA:        { v: 30, d: -1 },
        },
      },
      {
        id: 'b', ico: '♻️',
        name: 'Program Sampah Darurat + Pemilahan',
        desc: 'Distribusi fasilitas pemilahan di tingkat RT/RW + insentif ekonomi (bank sampah sementara).',
        budget: 'Rp 500–800 juta', time: '3–5 hari', score: 95,
        rank: 'S',
        impact: {
          Sanitasi:   { v: 70, d:  1 },
          Lingkungan: { v: 90, d:  1 },
          Masyarakat: { v: 85, d:  1 },
          TPA:        { v: 75, d:  1 },
        },
      },
      {
        id: 'c', ico: '🔥',
        name: 'Insinerator Mobile',
        desc: 'Penggunaan insinerator skala kecil/mobile untuk sampah residu tertentu.',
        budget: 'Rp 2–3 miliar', time: '3–7 hari', score: 72,
        rank: 'B',
        impact: {
          Sanitasi:   { v: 80, d:  1 },
          Lingkungan: { v: 40, d: -1 },
          Masyarakat: { v: 50, d: -1 },
          TPA:        { v: 85, d:  1 },
        },
      },
      {
        id: 'd', ico: '📣',
        name: 'Kampanye Pengurangan Sampah + Pembatasan Plastik',
        desc: 'Edukasi + kebijakan pembatasan kantong plastik di pasar & ritel.',
        budget: 'Rp 100–300 juta', time: '1–2 minggu', score: 60,
        rank: 'C',
        impact: {
          Sanitasi:   { v: 30, d: -1 },
          Lingkungan: { v: 95, d:  1 },
          Masyarakat: { v: 65, d:  1 },
          TPA:        { v: 40, d:  1 },
        },
      },
    ],
  },

  // ══════════════════════════════════════════
  // MENENGAH — Demonstrasi Mahasiswa
  // ══════════════════════════════════════════
  {
    id: 'demo',
    theme: 'traffic-t',
    tag: '🟡 MENENGAH',
    tagStyle: 'background:rgba(243,156,18,0.2);color:#d68910',
    icon: '✊',
    name: 'Demonstrasi Mahasiswa dan Masyarakat di Perkotaan',
    desc: 'Terjadi demonstrasi besar terkait kebijakan pemerintah (misalnya kenaikan harga atau UU kontroversial). Aksi berpotensi ricuh, mengganggu aktivitas ekonomi, dan menimbulkan konflik antara aparat dan masyarakat.',
    pills: ['Skala besar', 'Potensi konflik tinggi', 'Tingkat: MENENGAH'],
    diff: 'med',
    policies: [
      {
        id: 'a', ico: '🚔',
        name: 'Pendekatan Represif (Penanganan Ketat)',
        desc: 'Polisi diperbanyak, pembatasan area, pembubaran paksa jika perlu.',
        budget: 'Tinggi (logistik & keamanan)', time: 'Cepat', score: 72,
        rank: 'B',
        impact: {
          Stabilitas:          { v: 80, d:  1 },
          HAM:                 { v: 30, d: -1 },
          'Kepercayaan Publik': { v: 40, d: -1 },
          'Risiko Konflik':    { v: 80, d: -1 },
        },
      },
      {
        id: 'b', ico: '🤝',
        name: 'Dialog Terbuka dan Mediasi',
        desc: 'Pemerintah membuka forum diskusi langsung dengan perwakilan massa.',
        budget: 'Rendah', time: 'Sedang', score: 95,
        rank: 'S',
        impact: {
          Stabilitas:          { v: 70, d:  1 },
          HAM:                 { v: 90, d:  1 },
          'Kepercayaan Publik': { v: 85, d:  1 },
          'Risiko Konflik':    { v: 20, d:  1 },
        },
      },
      {
        id: 'c', ico: '📵',
        name: 'Pembatasan Digital dan Informasi',
        desc: 'Pembatasan media sosial untuk mencegah provokasi.',
        budget: 'Sedang', time: 'Cepat', score: 60,
        rank: 'C',
        impact: {
          Stabilitas:          { v: 60, d:  1 },
          HAM:                 { v: 20, d: -1 },
          'Kepercayaan Publik': { v: 30, d: -1 },
          'Risiko Konflik':    { v: 70, d: -1 },
        },
      },
      {
        id: 'd', ico: '🏟️',
        name: 'Zona Demonstrasi Terkontrol',
        desc: 'Menyediakan area khusus aksi + pengamanan terbatas.',
        budget: 'Rendah', time: 'Sedang', score: 80,
        rank: 'A',
        impact: {
          Stabilitas:          { v: 75, d:  1 },
          HAM:                 { v: 80, d:  1 },
          'Kepercayaan Publik': { v: 75, d:  1 },
          'Risiko Konflik':    { v: 40, d:  1 },
        },
      },
    ],
  },

  // ══════════════════════════════════════════
  // SULIT — Kesenjangan Pendidikan
  // ══════════════════════════════════════════
  {
    id: 'education',
    theme: 'flood-t',
    tag: '🔴 SULIT',
    tagStyle: 'background:rgba(231,76,60,0.2);color:#c0392b',
    icon: '📚',
    name: 'Kesenjangan Kualitas Pendidikan di Indonesia',
    desc: 'Terdapat kesenjangan kualitas pendidikan antara daerah perkotaan dan daerah tertinggal. Akses teknologi, kualitas guru, dan fasilitas tidak merata.',
    pills: ['Urban vs Daerah Tertinggal', 'Akses & kualitas tidak merata', 'Tingkat: SULIT'],
    diff: 'hard',
    policies: [
      {
        id: 'a', ico: '💻',
        name: 'Digitalisasi Pendidikan Nasional',
        desc: 'Penyediaan perangkat & internet untuk sekolah di seluruh Indonesia.',
        budget: 'Sangat Tinggi', time: 'Lama', score: 80,
        rank: 'A',
        impact: {
          Akses:      { v: 90, d:  1 },
          Kualitas:   { v: 70, d:  1 },
          Pemerataan: { v: 85, d:  1 },
        },
      },
      {
        id: 'b', ico: '👩‍🏫',
        name: 'Peningkatan Kualitas Guru (Pelatihan dan Insentif)',
        desc: 'Pelatihan nasional + insentif daerah terpencil untuk guru.',
        budget: 'Tinggi', time: 'Sedang', score: 95,
        rank: 'S',
        impact: {
          Akses:      { v: 60, d:  1 },
          Kualitas:   { v: 95, d:  1 },
          Pemerataan: { v: 80, d:  1 },
        },
      },
      {
        id: 'c', ico: '🏫',
        name: 'Pembangunan Infrastruktur Sekolah',
        desc: 'Bangun sekolah & fasilitas baru di daerah tertinggal.',
        budget: 'Sangat Tinggi', time: 'Sangat Lama', score: 72,
        rank: 'B',
        impact: {
          Akses:      { v: 85, d:  1 },
          Kualitas:   { v: 60, d:  1 },
          Pemerataan: { v: 75, d:  1 },
        },
      },
      {
        id: 'd', ico: '📖',
        name: 'Kurikulum Adaptif Lokal',
        desc: 'Kurikulum disesuaikan dengan kondisi dan kebutuhan daerah masing-masing.',
        budget: 'Sedang', time: 'Sedang', score: 80,
        rank: 'A',
        impact: {
          Akses:      { v: 65, d:  1 },
          Kualitas:   { v: 80, d:  1 },
          Pemerataan: { v: 70, d:  1 },
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
