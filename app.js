/**
 * app.js — Policy Impact Simulator
 * SMAN 65 Jakarta
 */

// ══════════════════════════════════════════
// CONFIG
// ══════════════════════════════════════════
let SHEETS_URL = localStorage.getItem('pis_sheets_url') || '';

// ══════════════════════════════════════════
// STATE
// ══════════════════════════════════════════
let user        = null;
let totalScore  = 0;
let completedSc = {};
let curSc       = null;
let selPol      = null;
let timerSecs   = 0;
let timerInt    = null;

// ══════════════════════════════════════════
// INIT
// ══════════════════════════════════════════
window.addEventListener('DOMContentLoaded', () => {
  // Tampilkan kode GAS di halaman Setup jika elemen ada
  const el = document.getElementById('gs-code');
  if (el && typeof GAS_CODE !== 'undefined') {
    el.textContent = GAS_CODE;
  }

  // Set nilai input URL jika sudah tersimpan sebelumnya
  const urlInp = document.getElementById('sheets-url');
  if (urlInp) urlInp.value = SHEETS_URL;
});

// ══════════════════════════════════════════
// NAVIGATION
// ══════════════════════════════════════════
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const target = document.getElementById(id);
  if (target) {
    target.classList.add('active');
    window.scrollTo(0, 0);
  }
}

function gotoMap() {
  stopTimer();
  showScreen('screen-map');
  renderMap();
}

/**
 * Membuka layar konfigurasi (Fungsi untuk tombol ⚙️)
 */
function openSetup() {
  showScreen('screen-setup');
}

// ══════════════════════════════════════════
// LOGIN
// ══════════════════════════════════════════
function doLogin() {
  const name  = document.getElementById('inp-name').value.trim();
  const kelas = document.getElementById('inp-class').value;
  if (!name || !kelas) { 
    toast('⚠️ Isi nama dan kelas dulu!'); 
    return; 
  }

  user        = { name, kelas };
  completedSc = JSON.parse(localStorage.getItem('pis_done_' + name) || '{}');
  totalScore  = parseInt(localStorage.getItem('pis_score_' + name) || '0');

  showScreen('screen-map');
  renderMap();
}

// ══════════════════════════════════════════
// MAP
// ══════════════════════════════════════════
function renderMap() {
  if (!user) return;
  document.getElementById('greet-txt').textContent = 'Halo, ' + user.name.split(' ')[0] + '!';
  updateXP();

  const diffMeta = {
    easy: { lbl: 'Mudah',     cls: 'diff-easy' },
    med:  { lbl: 'Menengah', cls: 'diff-med'  },
    hard: { lbl: 'Sulit',    cls: 'diff-hard' },
  };

  const scList = document.getElementById('sc-list');
  if (scList) {
    scList.innerHTML = SC.map(s => {
      const done = completedSc[s.id];
      const maxScore = Math.max(...s.policies.map(p => p.score));
      const dm = diffMeta[s.diff];
      return `
        <div class="sc-card ${s.id}${done ? ' done' : ''}" onclick="startSc('${s.id}')">
          ${done ? `<div class="sc-done-badge">✓ ${done.score}pts</div>` : ''}
          <div class="sc-emoji">${s.icon}</div>
          <div class="sc-info">
            <div class="sc-name">${s.name}</div>
            <div class="sc-ddesc">${s.desc.substring(0, 70)}...</div>
            <div class="sc-meta">
              <span class="sc-tag ${dm.cls}">${dm.lbl}</span>
              <span style="font-size:11px;color:var(--text3);font-weight:600">
                ${done ? '✓ Selesai' : '⭐ maks ' + maxScore + ' poin'}
              </span>
            </div>
          </div>
          <div class="sc-arr">›</div>
        </div>`;
    }).join('');
  }
}

function updateXP() {
  const maxP = SC.reduce((a, s) => a + Math.max(...s.policies.map(p => p.score)), 0);
  const pct  = Math.min(100, Math.round((totalScore / maxP) * 100));
  
  const xpFill = document.getElementById('xp-fill');
  const xpPts = document.getElementById('xp-pts');
  
  if (xpFill) xpFill.style.width = pct + '%';
  if (xpPts) xpPts.textContent = totalScore + ' pts';
  
  const cs1 = document.getElementById('chip-score');
  const cs2 = document.getElementById('chip-score2');
  if (cs1) cs1.textContent = '⭐ ' + totalScore + ' pts';
  if (cs2) cs2.textContent = '⭐ ' + totalScore + ' pts';
}

// ══════════════════════════════════════════
// GAME ENGINE
// ══════════════════════════════════════════
function startSc(id) {
  curSc  = SC.find(s => s.id === id);
  selPol = null;
  showScreen('screen-game');
  renderGame();
  startTimer();
}

function renderGame() {
  document.getElementById('prog-dots').innerHTML = SC.map(s => {
    const cls = completedSc[s.id] ? 'done' : s.id === curSc.id ? 'active' : '';
    return `<div class="prog-dot ${cls}"></div>`;
  }).join('');

  document.getElementById('sit-wrap').innerHTML = `
    <div class="sit-card ${curSc.theme}">
      <div class="sit-bg-ico">${curSc.icon}</div>
      <div class="sit-tag ${curSc.theme}">${curSc.tag}</div>
      <div class="sit-name">${curSc.name}</div>
      <div class="sit-desc">${curSc.desc}</div>
      <div class="sit-pills">
        ${curSc.pills.map(p => `<span class="sit-pill">${p}</span>`).join('')}
      </div>
    </div>`;

  document.getElementById('pol-list').innerHTML = curSc.policies.map(p => `
    <div class="p-card" id="pc-${p.id}" onclick="selPolicy('${p.id}')">
      <div class="p-ico">${p.ico}</div>
      <div class="p-body">
        <div class="p-name">${p.name}</div>
        <div class="p-desc">${p.desc}</div>
        <div class="p-meta">
          <span class="p-tag p-budget">💰 ${p.budget}</span>
          <span class="p-tag p-time">⏰ ${p.time}</span>
        </div>
      </div>
      <div class="p-radio"><div class="p-rdot"></div></div>
    </div>`).join('');

  document.getElementById('btn-decide').disabled = true;
}

function selPolicy(id) {
  selPol = id;
  document.querySelectorAll('.p-card').forEach(c => c.classList.remove('sel'));
  document.getElementById('pc-' + id).classList.add('sel');
  document.getElementById('btn-decide').disabled = false;
}

// ══════════════════════════════════════════
// TIMER
// ══════════════════════════════════════════
function startTimer() {
  timerSecs = 0;
  clearInterval(timerInt);
  timerInt = setInterval(() => {
    timerSecs++;
    const m = String(Math.floor(timerSecs / 60)).padStart(2, '0');
    const s = String(timerSecs % 60).padStart(2, '0');
    const disp = document.getElementById('timer-disp');
    if (disp) disp.textContent = `${m}:${s}`;
  }, 1000);
}
function stopTimer() { clearInterval(timerInt); }

// ══════════════════════════════════════════
// RESULTS
// ══════════════════════════════════════════
function applyDecision() {
  if (!selPol) return;
  stopTimer();

  const pol = curSc.policies.find(p => p.id === selPol);
  const timeBonus  = Math.max(0, 15 - Math.floor(timerSecs / 10));
  const finalScore = Math.min(100, pol.score + timeBonus);
  const rank       = finalScore >= 90 ? 'S' : finalScore >= 80 ? 'A' : finalScore >= 70 ? 'B' : finalScore >= 60 ? 'C' : 'D';

  completedSc[curSc.id] = { policy: pol.id, score: finalScore };
  localStorage.setItem('pis_done_' + user.name, JSON.stringify(completedSc));
  totalScore += finalScore;
  localStorage.setItem('pis_score_' + user.name, totalScore);
  updateXP();

  showScreen('screen-result');
  buildResult(pol, finalScore, rank);
  saveData({
    timestamp:   new Date().toLocaleString(),
    nama:        user.name,
    kelas:       user.kelas,
    skenario:    curSc.name,
    kebijakan:   pol.name,
    skor:        finalScore,
    waktu_detik: timerSecs,
    rank,
  });
}

function buildResult(pol, score, rank) {
  const emojiMap = { S: '🏆', A: '⭐', B: '✅', C: '💡', D: '📚' };
  const titleMap = { S: 'Kebijakan Sempurna!', A: 'Keputusan Sangat Baik!', B: 'Kebijakan Solid!', C: 'Bisa Lebih Baik', D: 'Perlu Evaluasi' };

  document.getElementById('res-emoji').textContent = emojiMap[rank];
  document.getElementById('res-title').textContent = titleMap[rank];
  document.getElementById('res-sub').textContent   = '📌 ' + pol.name;

  const numEl = document.getElementById('score-num');
  numEl.className = 'score-big rank-' + rank.toLowerCase();
  let n = 0;
  const ti = setInterval(() => { 
    n = Math.min(n + 3, score); 
    numEl.textContent = n; 
    if (n >= score) clearInterval(ti); 
  }, 20);

  const rankEl = document.getElementById('score-rank');
  rankEl.textContent = 'Rank ' + rank;
  rankEl.className   = 'score-rank rank-' + rank.toLowerCase();

  buildImpactCards(pol);
  buildComparison(score);
}

function buildImpactCards(pol) {
  const palette = ['#3a6fd8', '#2ecc71', '#f39c12', '#e74c3c', '#9b59b6', '#1abc9c'];
  const dims = Object.entries(pol.impact);

  document.getElementById('imp-cards').innerHTML = dims.map(([dim, data], i) => {
    const col   = data.d === 1 ? palette[i % palette.length] : '#e74c3c';
    const arrow = data.d === 1 ? '↑' : '↓';
    return `
      <div class="imp-card" style="--d:${i * 0.08}s">
        <div class="imp-dim">${dim}</div>
        <div class="imp-val" style="color:${col}">${arrow}${data.v}%</div>
        <div class="imp-lbl">${data.d === 1 ? 'Dampak positif' : 'Dampak negatif'} pada ${dim.toLowerCase()}</div>
        <div class="imp-bar-wrap">
          <div class="imp-bar-fill" id="ib${i}" style="width:0%; background:${col}"></div>
        </div>
      </div>`;
  }).join('');

  setTimeout(() => {
    dims.forEach(([, data], i) => {
      const el = document.getElementById('ib' + i);
      if (el) el.style.width = data.v + '%';
    });
  }, 200);
}

function buildComparison(myScore) {
  document.getElementById('cmp-rows').innerHTML = curSc.policies.map(p => {
    const isYou = p.id === selPol;
    const s = isYou ? myScore : p.score;
    return `
      <div class="cmp-row${isYou ? ' you' : ''}">
        <div class="cmp-pol">${p.ico} ${p.name}</div>
        <div class="cmp-bar-wrap">
          <div class="cmp-bar" id="cb${p.id}" style="width:0%"></div>
        </div>
        <div class="cmp-score">${s}</div>
      </div>`;
  }).join('');

  setTimeout(() => {
    curSc.policies.forEach(p => {
      const el = document.getElementById('cb' + p.id);
      if (el) el.style.width = (p.id === selPol ? myScore : p.score) + '%';
    });
  }, 300);
}

function nextScenario() {
  const rem = SC.filter(s => !completedSc[s.id]);
  if (!rem.length) { 
    toast('🎉 Semua skenario selesai!'); 
    gotoMap(); 
    return; 
  }
  startSc(rem[0].id);
}

// ══════════════════════════════════════════
// SETUP & DATA SAVING
// ══════════════════════════════════════════
function saveSetup() {
  const url = document.getElementById('sheets-url').value.trim();
  if (url && !url.startsWith('https://script.google.com')) {
    toast('⚠️ URL tidak valid!');
    return;
  }
  SHEETS_URL = url;
  localStorage.setItem('pis_sheets_url', url);
  toast('✅ Konfigurasi disimpan!');
  showScreen('screen-splash');
}

async function testConn() {
  const url = document.getElementById('sheets-url').value.trim();
  const resEl = document.getElementById('test-res');
  if (!url) { toast('⚠️ Isi URL dulu!'); return; }
  
  resEl.textContent = '⏳ Mengetes koneksi...';
  try {
    const params = new URLSearchParams();
    params.append('data', JSON.stringify({ test: true, nama: 'System Test' }));
    
    await fetch(url, { method: 'POST', body: params, mode: 'no-cors' });
    resEl.innerHTML = '<span style="color:#2ecc71">✅ Terhubung ke Apps Script!</span>';
  } catch (e) {
    resEl.innerHTML = '<span style="color:#e74c3c">❌ Gagal terhubung. Periksa URL.</span>';
  }
}

async function saveData(data) {
  const rowEl = document.getElementById('save-row');
  const offEl = document.getElementById('offline-note');
  if (!rowEl) return;

  const url = localStorage.getItem('pis_sheets_url') || SHEETS_URL;
  if (!url) {
    rowEl.textContent = '💾 Tersimpan secara lokal';
    if (offEl) offEl.style.display = 'block';
    return;
  }

  if (offEl) offEl.style.display = 'none';
  rowEl.textContent = '🔄 Menyimpan ke Google Sheets...';
  rowEl.className = 'save-row saving';

  try {
    const params = new URLSearchParams();
    params.append('data', JSON.stringify(data));
    
    await fetch(url, { method: 'POST', body: params, mode: 'no-cors' });
    rowEl.textContent = '✅ Tersimpan di Google Sheets!';
    rowEl.className = 'save-row saved';
  } catch (err) {
    rowEl.textContent = '💾 Gagal kirim, tersimpan lokal';
    rowEl.className = 'save-row';
  }
}

function toast(msg) {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = msg;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 3000);
}
