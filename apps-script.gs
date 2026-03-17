/**
 * apps-script.gs — PolicyCity
 *
 * CARA PASANG:
 * 1. Buka Google Spreadsheet kamu
 * 2. Extensions → Apps Script
 * 3. Hapus kode default, paste seluruh kode ini
 * 4. Klik Deploy → New deployment
 *    - Type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Klik Deploy, izinkan akses, salin URL Web App
 * 6. Paste URL tersebut di halaman Setup (⚙️) aplikasi PolicyCity
 */

function doPost(e) {
  var ss    = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Data') || ss.getSheets()[0];
  var d     = JSON.parse(e.postData.contents);

  // Buat header kalau sheet masih kosong
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'Timestamp',
      'Nama',
      'Kelas',
      'Skenario',
      'Kebijakan',
      'Skor',
      'Waktu (detik)',
      'Rank',
    ]);
  }

  sheet.appendRow([
    d.timestamp,
    d.nama,
    d.kelas,
    d.skenario,
    d.kebijakan,
    d.skor,
    d.waktu_detik,
    d.rank,
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Fungsi test (opsional) — jalankan manual untuk cek koneksi
function testSetup() {
  var ss    = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Data') || ss.getSheets()[0];
  Logger.log('Sheet ditemukan: ' + sheet.getName());
  Logger.log('Baris terisi: ' + sheet.getLastRow());
}
