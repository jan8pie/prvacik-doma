/* =====================================================================
   OBRÁZKOVÝ SLOVNÍK ANJ – jadro (dáta sú v anj-slova.js)
   Dieťa vidí obrázok, po ťuknutí ho tablet pomaly povie po anglicky,
   napísané slovo sa ukáže až potom, len na chvíľu, a zmizne.
   =====================================================================
   OBRÁZKY
   ===================================================================== */
const SVG = {
  rubber:`<svg viewBox="0 0 100 100" aria-hidden="true"><g transform="rotate(-24 50 50)">
    <rect x="14" y="34" width="72" height="34" rx="7" fill="#F27DB3" stroke="#8B3A63" stroke-width="3"/>
    <path d="M52 34 H79 a7 7 0 0 1 7 7 V61 a7 7 0 0 1 -7 7 H52 Z" fill="#4F8FE8" stroke="#24508F" stroke-width="3"/>
    <path d="M20 42 H44" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" opacity=".7"/></g>
    <ellipse cx="50" cy="86" rx="30" ry="4" fill="#000" opacity=".12"/></svg>`,
};
const ESC = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
function skvrna(hex){
  const svetla = /^#(f{3}|f{6})$/i.test(hex);
  return `<svg viewBox="0 0 100 100" aria-hidden="true"><path d="M50 7 C63 5 70 16 80 19 C92 23 96 37 91 48 C87 57 95 66 89 77 C82 90 66 88 56 93 C45 98 34 92 25 86 C13 79 4 70 8 57 C11 47 4 38 10 28 C17 15 36 9 50 7 Z"
    fill="${hex}" stroke="${svetla ? "#B9C2CD" : "rgba(0,0,0,.18)"}" stroke-width="${svetla ? 3 : 2}"/>
    <ellipse cx="36" cy="30" rx="10" ry="6" fill="#fff" opacity="${svetla ? 0 : .28}" transform="rotate(-25 36 30)"/></svg>`;
}
function kocka(n){
  const B = {1:[[50,50]],2:[[30,30],[70,70]],3:[[28,28],[50,50],[72,72]],4:[[30,30],[70,30],[30,70],[70,70]],
             5:[[28,28],[72,28],[50,50],[28,72],[72,72]],6:[[30,26],[70,26],[30,50],[70,50],[30,74],[70,74]]}[n]||[];
  return `<svg viewBox="0 0 100 100" aria-hidden="true"><rect x="8" y="8" width="84" height="84" rx="16" fill="#FFFFFF" stroke="#3A4656" stroke-width="4"/>
    ${B.map(([x,y])=>`<circle cx="${x}" cy="${y}" r="8.5" fill="#C2423A"/>`).join("")}</svg>`;
}
function obrazok(obr){
  if(Array.isArray(obr)) return `<div class="sl-obr scena">${obr.map(e=>`<span class="em">${e}</span>`).join("")}</div>`;
  if(obr.startsWith("farba:")) return `<div class="sl-obr">${skvrna(obr.slice(6))}</div>`;
  if(obr.startsWith("kocka:")) return `<div class="sl-obr">${kocka(+obr.slice(6))}</div>`;
  if(obr.startsWith("svg:"))   return `<div class="sl-obr">${SVG[obr.slice(4)]||""}</div>`;
  return `<div class="sl-obr"><span class="em">${obr}</span></div>`;
}
function ikonka(obr){
  if(obr.startsWith("farba:")) return skvrna(obr.slice(6));
  if(obr.startsWith("kocka:")) return kocka(+obr.slice(6));
  return obr;
}

/* =====================================================================
   NASTAVENIA PRE RODIČA (pamätá si ich len tento prehliadač)
   ===================================================================== */
const NAST = {pismo:"po", rychlost:0.65};
try{ Object.assign(NAST, JSON.parse(localStorage.getItem("slovnik-anj")||"{}")); }catch(e){}
const ulozNast = () => { try{ localStorage.setItem("slovnik-anj", JSON.stringify(NAST)); }catch(e){} };

/* =====================================================================
   HLAS: en-GB → en-US → akýkoľvek en-*; ak nie je žiadny, povieme to rodičovi
   ===================================================================== */
const MA_REC = "speechSynthesis" in window;
let HLAS = null, hlasyHotove = false;
function vyberHlas(){
  if(!MA_REC) return null;
  const vsetky = speechSynthesis.getVoices();
  const en = vsetky.filter(v => /^en([-_]|$)/i.test(v.lang));
  const jazyk = v => v.lang.replace("_","-").toLowerCase();
  const kvalita = v => (/google|natural|neural|online|premium|enhanced/i.test(v.name) ? 2 : 0) + (v.localService ? 1 : 0)
                      - (/novelty|whisper|bad news|bells|bubbles|boing|cellos|zarvox|trinoids|jester|organ|superstar|wobble|albert|bahh|fred|junior|ralph|kathy/i.test(v.name) ? 5 : 0);
  const najlepsi = zoz => zoz.sort((a,b)=>kvalita(b)-kvalita(a))[0];
  return najlepsi(en.filter(v=>jazyk(v)==="en-gb")) || najlepsi(en.filter(v=>jazyk(v)==="en-us")) || najlepsi(en) || null;
}
function nacitajHlasy(){
  HLAS = vyberHlas();
  if(HLAS || hlasyHotove) ukazOznam();
}
if(MA_REC){
  nacitajHlasy();
  try{ speechSynthesis.addEventListener("voiceschanged", nacitajHlasy); }catch(e){ speechSynthesis.onvoiceschanged = nacitajHlasy; }
}
/* Niektoré zariadenia hlasy hlásia neskoro. Až po chvíli povieme, že chýbajú. */
setTimeout(()=>{ hlasyHotove = true; nacitajHlasy(); }, 1800);

function ukazOznam(){
  const el = document.getElementById("oznam");
  if(!MA_REC){
    el.innerHTML = `<b>Tento prehliadač nevie čítať nahlas.</b> Otvor slovník v Chrome, Safari alebo Edge. Kým to nepôjde, slovo sa po ťuknutí hneď ukáže napísané.`;
    el.hidden = false; return;
  }
  if(!HLAS && hlasyHotove){
    el.innerHTML = `<b>Na tomto zariadení chýba anglický hlas.</b> Tablet preto slová nepovie. Pridaj ho: na iPade Nastavenia → Prístupnosť → Hovorený obsah → Hlasy → English. Na Androide Nastavenia → Prevod textu na reč → Google → Nainštalovať hlasové údaje → English (United Kingdom). Vo Windows Nastavenia → Čas a jazyk → Reč → Pridať hlasy → English (United Kingdom). Potom stránku obnov.`;
    el.hidden = false; return;
  }
  el.hidden = true;
}

/* Rovnaký postup ako na webe: najprv potichu „rozohriať“ hlas, potom po pauze slovo.
   Vráti sľub, ktorý sa splní, keď hlas dočíta (true), alebo keď hovoriť nevie (false). */
const PAUZA_MS = 450;
let sayTimer = null, hovorId = 0;
function povedz(text){
  const id = ++hovorId;
  try{
    if(!MA_REC || !HLAS) throw 0;
    const ss = window.speechSynthesis;
    ss.cancel(); clearTimeout(sayTimer);
    const warm = new SpeechSynthesisUtterance("a"); warm.voice = HLAS; warm.lang = HLAS.lang; warm.volume = 0.02; warm.rate = 1;
    const u = new SpeechSynthesisUtterance(text); u.voice = HLAS; u.lang = HLAS.lang; u.rate = NAST.rychlost; u.pitch = 1.05;
    ss.speak(warm);   /* hneď, ešte počas ťuknutia – iPad inak hlas nepustí */
    sayTimer = setTimeout(()=>ss.speak(u), PAUZA_MS);
    return new Promise(res=>{
      const od = Date.now(); let poistka, hotovo = false, zacal = false;
      const koniec = v => { if(hotovo) return; hotovo = true; clearTimeout(poistka); res(v && id===hovorId); };
      const kontrola = () => { if(ss.speaking && Date.now()-od < 12000) poistka = setTimeout(kontrola, 250); else koniec(zacal); };
      u.onstart = () => { zacal = true; };
      poistka = setTimeout(kontrola, PAUZA_MS + 1200 + String(text).length*160/NAST.rychlost);
      u.onend = () => { zacal = true; koniec(true); };
      u.onerror = () => koniec(false);
    });
  }catch(e){ return Promise.resolve(false); }
}
const pockaj = ms => new Promise(r=>setTimeout(r,ms));

/* =====================================================================
   STRÁNKA
   ===================================================================== */
let tema = (location.hash.slice(1) in TEMY) ? location.hash.slice(1) : "hello";
const pocute = new Set();   /* slová, ktoré dieťa už počulo (len kým je stránka otvorená) */

function vykresliTemy(){
  document.getElementById("temy").innerHTML = Object.entries(TEMY).map(([k,t]) =>
    `<button class="sl-tema" type="button" data-tema="${k}" aria-pressed="${k===tema}">
       <span class="ik" aria-hidden="true">${ikonka(t.ikona)}</span>
       <span class="n">${ESC(t.nazov)}<span class="l">${ESC(t.lekcia)} · ${t.slova.length} slov</span></span></button>`).join("");
}
function vykresliMriezku(){
  const t = TEMY[tema];
  document.getElementById("mriezka").innerHTML = t.slova.map((s,i) =>
    `<button class="sl-tile" type="button" data-i="${i}" aria-label="Obrázok ${i+1} z ${t.slova.length}">
       ${obrazok(s.obr)}
       <span class="sl-vlny" aria-hidden="true"><i></i><i></i><i></i></span>
       <span class="sl-slovo" lang="en" aria-live="polite"></span>
       ${pocute.has(s.w) ? `<span class="sl-pocul" title="Už počul"></span>` : ""}</button>`).join("");
}
function vykresli(){ vykresliTemy(); vykresliMriezku(); }

document.getElementById("temy").addEventListener("click", e => {
  const b = e.target.closest("[data-tema]"); if(!b) return;
  tema = b.dataset.tema; tukId++; aktivny = null;
  try{ speechSynthesis.cancel(); }catch(err){}
  try{ history.replaceState(null, "", "#"+tema); }catch(err){ location.hash = tema; }
  vykresli();
});
window.addEventListener("hashchange", () => { const h = location.hash.slice(1); if(h in TEMY && h!==tema){ tema = h; vykresli(); } });
document.getElementById("mriezka").addEventListener("click", e => {
  const b = e.target.closest("[data-i]"); if(b) tukni(b);
});

/* ---------- ťuk na obrázok: povie slovo, potom ho na chvíľu ukáže a schová ---------- */
const UKAZ_MS = 2500;      /* ako dlho vidno napísané slovo */
const IKONY = {
  zavri:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>`,
};
let aktivny = null, tukId = 0;   /* práve hovoriaci obrázok */
function upokoj(t){
  if(!t) return;
  t.classList.remove("hovori");
  const sl = t.querySelector(".sl-slovo"); sl.classList.remove("ukaz","skry"); sl.textContent = "";
}
async function tukni(tile){
  const moj = ++tukId;
  const s = TEMY[tema].slova[+tile.dataset.i];
  if(aktivny && aktivny!==tile) upokoj(aktivny);
  upokoj(tile);
  aktivny = tile;
  tile.classList.add("hovori");
  const ok = await povedz(s.w);
  if(moj!==tukId) return;                      /* medzitým ťukol znova alebo na iný obrázok */
  tile.classList.remove("hovori");
  pocute.add(s.w);
  if(!tile.querySelector(".sl-pocul")) tile.insertAdjacentHTML("beforeend", `<span class="sl-pocul" title="Už počul"></span>`);
  if(NAST.pismo!=="po") return;
  await pockaj(ok ? 300 : 900);
  if(moj!==tukId) return;
  const sl = tile.querySelector(".sl-slovo");
  sl.textContent = s.w; sl.classList.add("ukaz");
  await pockaj(UKAZ_MS);
  if(moj!==tukId) return;
  sl.classList.add("skry");
  await pockaj(700);
  if(moj!==tukId) return;
  upokoj(tile);
}

/* ---------- panel pre rodiča ---------- */
let panel = null;
function popisHlasu(){
  if(!MA_REC) return `<span class="zle">Prehliadač nevie čítať nahlas.</span>`;
  if(!HLAS) return hlasyHotove ? `<span class="zle">Anglický hlas chýba.</span> Návod je hore na stránke.` : `Hľadám hlas…`;
  const gb = /en[-_]gb/i.test(HLAS.lang);
  return `<span class="ok">${gb ? "Britský hlas" : "Anglický hlas"}</span> ${ESC(HLAS.name)} (${ESC(HLAS.lang)})${gb ? "" : `<br>Britský hlas na zariadení nie je, výslovnosť bude americká.`}`;
}
function otvorPanel(){
  zavriPanel();
  const t = TEMY[tema];
  const z = document.createElement("div");
  z.className = "sl-zaves";
  z.innerHTML = `<div class="sl-panel" role="dialog" aria-modal="true" aria-labelledby="pn-h">
    <div class="sl-karta-top"><h2 id="pn-h">Pre rodiča</h2>
      <button class="sl-ikbtn" type="button" data-akcia="zavri" aria-label="Zavrieť">${IKONY.zavri}</button></div>
    <p>Podaj tablet dieťaťu. Nech ťukne na obrázok, vypočuje si slovo a zopakuje ho nahlas. Napísané slovo sa ukáže až po vypočutí a o chvíľu zmizne, aby si ho dieťa nezvyklo čítať po slovensky.</p>
    <div><h3>Napísané slovo</h3><div class="sl-seg" data-nast="pismo">
      <button type="button" id="pismo-po" data-hod="po" aria-pressed="${NAST.pismo==="po"}">Na chvíľu po vypočutí</button>
      <button type="button" id="pismo-nikdy" data-hod="nikdy" aria-pressed="${NAST.pismo==="nikdy"}">Neukazovať nikdy</button></div></div>
    <div><h3>Rýchlosť hlasu</h3><div class="sl-seg" data-nast="rychlost">
      <button type="button" id="rych-065" data-hod="0.65" aria-pressed="${NAST.rychlost==0.65}">Pomaly</button>
      <button type="button" id="rych-05" data-hod="0.5" aria-pressed="${NAST.rychlost==0.5}">Veľmi pomaly</button>
      <button type="button" id="rych-085" data-hod="0.85" aria-pressed="${NAST.rychlost==0.85}">Takmer normálne</button></div></div>
    <div><h3>Hlas</h3><div class="sl-hlas"><span id="pn-hlas">${popisHlasu()}</span>
      <button class="sl-btn" type="button" data-akcia="skus">Vyskúšať</button></div></div>
    <div><h3>Slová v téme ${ESC(t.nazov)}</h3><ul class="sl-zoznam">${t.slova.map(s=>`<li><b lang="en">${ESC(s.w)}</b><span>${ESC(s.sk)}</span></li>`).join("")}</ul></div>
  </div>`;
  z.addEventListener("click", e => {
    if(e.target === z) return zavriPanel();
    const a = e.target.closest("[data-akcia]");
    if(a?.dataset.akcia==="zavri") return zavriPanel();
    if(a?.dataset.akcia==="skus"){ povedz("Hello! Let's learn English."); return; }
    const b = e.target.closest("[data-hod]"); if(!b) return;
    const kto = b.parentElement.dataset.nast;
    NAST[kto] = kto==="rychlost" ? +b.dataset.hod : b.dataset.hod;
    ulozNast();
    b.parentElement.querySelectorAll("button").forEach(x => x.setAttribute("aria-pressed", x===b));
    tukId++; upokoj(aktivny); aktivny = null;
  });
  document.body.appendChild(z);
  panel = z;
  z.querySelector('[data-akcia="zavri"]').focus({preventScroll:true});
}
function zavriPanel(){ if(panel){ panel.remove(); panel = null; } }
document.getElementById("btnRodic").addEventListener("click", otvorPanel);
/* keď hlasy prídu neskôr, obnov aj text v otvorenom paneli */
setInterval(()=>{ const p = document.getElementById("pn-hlas"); if(p){ const h = popisHlasu(); if(p.innerHTML!==h) p.innerHTML = h; } }, 1000);

vykresli();
