/* =====================================================================
   OBRÁZKOVÝ SLOVNÍK ANJ – jadro (dáta sú v anj-slova.js)
   Dieťa vidí obrázok, po ťuknutí ho tablet pomaly povie po anglicky,
   napísané slovo sa ukáže až potom, len na chvíľu, a zmizne.
   Prepínače: Len táto lekcia / Od začiatku, Extra (slová navyše), SK (aj slovenský preklad).
   =====================================================================
   OBRÁZKY (vlastné SVG tam, kde emoji chýba alebo je nejasné)
   ===================================================================== */
const TIEN = (cx,cy,rx) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="4" fill="#000" opacity=".12"/>`;
const FAZULA = (x,y,u) => `<g transform="translate(${x} ${y}) rotate(${u})"><path d="M0 -6 C8 -8 13 -3 12 3 C11 8 4 8 1 5 C-2 3 -5 6 -9 5 C-14 3 -13 -4 -8 -6 C-5 -7 -3 -5 0 -6Z" fill="#9C3B2A" stroke="#5E2016" stroke-width="1.5"/><path d="M-6 -3 C-2 -4 2 -4 6 -4" stroke="#fff" stroke-width="1.6" stroke-linecap="round" opacity=".45" fill="none"/></g>`;
const SVG = {
  rubber:`<svg viewBox="0 0 100 100" aria-hidden="true"><g transform="rotate(-24 50 50)">
    <rect x="14" y="34" width="72" height="34" rx="7" fill="#F27DB3" stroke="#8B3A63" stroke-width="3"/>
    <path d="M52 34 H79 a7 7 0 0 1 7 7 V61 a7 7 0 0 1 -7 7 H52 Z" fill="#4F8FE8" stroke="#24508F" stroke-width="3"/>
    <path d="M20 42 H44" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" opacity=".7"/></g>
    ${TIEN(50,86,30)}</svg>`,
  desk:`<svg viewBox="0 0 100 100" aria-hidden="true">${TIEN(50,90,38)}
    <path d="M22 50 V88 M78 50 V88" stroke="#6B7785" stroke-width="5" stroke-linecap="round"/>
    <path d="M22 72 H78" stroke="#6B7785" stroke-width="4"/>
    <rect x="18" y="42" width="64" height="13" rx="2" fill="#B07338" stroke="#6E4520" stroke-width="3"/>
    <rect x="8" y="32" width="84" height="11" rx="3" fill="#D99A5B" stroke="#6E4520" stroke-width="3"/>
    <g transform="rotate(-8 50 26)"><rect x="32" y="22" width="30" height="6" rx="2" fill="#F6CB2F" stroke="#9A7A10" stroke-width="1.5"/>
      <path d="M62 22 L70 25 L62 28 Z" fill="#E7C9A0" stroke="#9A7A10" stroke-width="1.5"/></g>
    <rect x="68" y="20" width="14" height="12" rx="1.5" fill="#2F6FDE" stroke="#24508F" stroke-width="2"/></svg>`,
  board:`<svg viewBox="0 0 100 100" aria-hidden="true">
    <path d="M22 76 L15 94 M78 76 L85 94" stroke="#6E4520" stroke-width="4" stroke-linecap="round"/>
    <rect x="5" y="12" width="90" height="62" rx="4" fill="#8B5A2B"/>
    <rect x="10" y="17" width="80" height="52" rx="2" fill="#2E6B4F"/>
    <g fill="none" stroke="#F4F7F2" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" opacity=".92">
      <circle cx="29" cy="35" r="7"/><path d="M29 22v4M29 44v4M16 35h4M38 35h4M20 26l3 3M35 41l3 3M20 44l3-3M35 29l3-3"/>
      <path d="M56 62 V47 L67 38 L78 47 V62 Z"/><path d="M64 62 V54 H70 V62"/><path d="M16 61 C24 56 34 64 44 59"/></g>
    <rect x="18" y="73" width="64" height="5" rx="2" fill="#6E4520"/>
    <rect x="28" y="70" width="10" height="4" rx="1.5" fill="#FFFFFF"/><rect x="60" y="69" width="12" height="5" rx="1.5" fill="#F6CB2F"/></svg>`,
  bookcase:`<svg viewBox="0 0 100 100" aria-hidden="true">${TIEN(50,94,36)}
    <rect x="16" y="6" width="68" height="88" rx="3" fill="#B07338" stroke="#6E4520" stroke-width="3"/>
    <rect x="22" y="12" width="56" height="22" fill="#5E3A18"/><rect x="22" y="39" width="56" height="22" fill="#5E3A18"/><rect x="22" y="66" width="56" height="22" fill="#5E3A18"/>
    <g stroke="rgba(0,0,0,.25)" stroke-width="1">
      <rect x="24" y="15" width="8" height="19" fill="#E0322B"/><rect x="33" y="18" width="6" height="16" fill="#2F6FDE"/><rect x="40" y="14" width="9" height="20" fill="#3AA655"/>
      <rect x="50" y="17" width="6" height="17" fill="#F6CB2F"/><rect x="62" y="15" width="7" height="19" fill="#8A4FC4" transform="rotate(14 66 34)"/>
      <rect x="24" y="43" width="7" height="18" fill="#F28B24"/><rect x="32" y="41" width="9" height="20" fill="#2F6FDE"/><rect x="42" y="44" width="6" height="17" fill="#F27DB3"/>
      <rect x="49" y="42" width="8" height="19" fill="#E0322B"/><rect x="58" y="45" width="6" height="16" fill="#3AA655"/><rect x="65" y="42" width="9" height="19" fill="#F6CB2F"/>
      <rect x="24" y="69" width="9" height="19" fill="#3AA655"/><rect x="34" y="72" width="6" height="16" fill="#F6CB2F"/><rect x="41" y="70" width="8" height="18" fill="#8A4FC4"/>
      <rect x="56" y="70" width="7" height="18" fill="#E0322B"/><rect x="64" y="73" width="10" height="15" fill="#2F6FDE"/></g></svg>`,
  beans:`<svg viewBox="0 0 100 100" aria-hidden="true">${TIEN(50,88,32)}
    ${FAZULA(30,50,-20)}${FAZULA(44,45,15)}${FAZULA(58,47,-10)}${FAZULA(71,50,25)}${FAZULA(37,39,40)}${FAZULA(52,36,-30)}${FAZULA(64,39,10)}${FAZULA(45,52,0)}
    <path d="M12 52 H88 C86 72 72 84 50 84 C28 84 14 72 12 52 Z" fill="#F6CB2F" stroke="#9A7A10" stroke-width="3"/>
    <path d="M22 60 C26 68 32 72 40 75" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".5" fill="none"/></svg>`,
  yoghurt:`<svg viewBox="0 0 100 100" aria-hidden="true">${TIEN(50,90,22)}
    <g transform="rotate(22 60 30)"><rect x="57" y="2" width="7" height="34" rx="3.5" fill="#B9C2CD" stroke="#6B7785" stroke-width="2"/></g>
    <path d="M27 32 H73 L66 87 H34 Z" fill="#FFFFFF" stroke="#7A8794" stroke-width="3" stroke-linejoin="round"/>
    <path d="M29.5 50 H70.5 L68.2 68 H31.8 Z" fill="#F27DB3"/>
    <path d="M50 54 C54 54 57 57 56 61 C55 65 51 67 50 67 C49 67 45 65 44 61 C43 57 46 54 50 54Z" fill="#E0322B"/>
    <path d="M47 54 L50 51 L53 54" stroke="#3AA655" stroke-width="2.4" fill="none" stroke-linecap="round"/>
    <ellipse cx="50" cy="32" rx="23" ry="5" fill="#FFF6EA" stroke="#7A8794" stroke-width="3"/></svg>`,
  water:`<svg viewBox="0 0 100 100" aria-hidden="true">${TIEN(48,90,22)}
    <path d="M26 16 L32 86 H64 L70 16 Z" fill="#EAF4FB" stroke="#7A9AB5" stroke-width="3" stroke-linejoin="round"/>
    <path d="M28.4 40 C36 36 42 44 48 40 C54 36 60 44 67.6 40 L64 86 H32 Z" fill="#4FA3E8" opacity=".9"/>
    <path d="M36 48 L38.5 78" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".6"/>
    <path d="M84 50 C84 50 76 60 76 66 a8 8 0 0 0 16 0 C92 60 84 50 84 50Z" fill="#4FA3E8"/></svg>`,
  jump:`<svg viewBox="0 0 100 100" aria-hidden="true">
    <ellipse cx="50" cy="93" rx="16" ry="3" fill="#000" opacity=".15"/>
    <path d="M38 80 v7 M50 82 v8 M62 80 v7" stroke="#9AA6B5" stroke-width="3" stroke-linecap="round"/>
    <path d="M44 34 L33 13 M56 34 L67 13" stroke="#E9B48A" stroke-width="6" stroke-linecap="round"/>
    <path d="M45 52 L37 62 L44 71 M55 52 L63 62 L56 71" stroke="#2F6FDE" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <ellipse cx="46" cy="73" rx="5" ry="3" fill="#3A4656"/><ellipse cx="54" cy="73" rx="5" ry="3" fill="#3A4656"/>
    <rect x="40" y="29" width="20" height="25" rx="8" fill="#E0322B"/>
    <circle cx="50" cy="19" r="9.5" fill="#E9B48A"/>
    <path d="M40.5 18 C41 9 59 9 59.5 18 C55 14 46 14 40.5 18Z" fill="#6B4423"/>
    <circle cx="46.5" cy="19.5" r="1.3" fill="#1C2633"/><circle cx="53.5" cy="19.5" r="1.3" fill="#1C2633"/>
    <path d="M46 23 Q50 26.5 54 23" stroke="#1C2633" stroke-width="1.6" fill="none" stroke-linecap="round"/></svg>`,
  seahorse:`<svg viewBox="0 0 100 100" aria-hidden="true">
    <path d="M54 36 C41 39 41 52 54 55" fill="#F6CB2F" stroke="#C2621A" stroke-width="2"/>
    <path d="M52 30 C64 36 66 50 57 60" fill="none" stroke="#F28B24" stroke-width="19" stroke-linecap="round"/>
    <path d="M57 60 C50 68 46 76 52 84 C57 90 65 86 63 80 C61 75 55 77 57 81" fill="none" stroke="#F28B24" stroke-width="12" stroke-linecap="round"/>
    <path d="M66 38 h5 M69 46 h5 M67 54 h5" stroke="#C2621A" stroke-width="2.4" stroke-linecap="round"/>
    <path d="M41 14 l3 -7 l3 6 l3 -7 l3 7" fill="#F28B24" stroke="#F28B24" stroke-width="2" stroke-linejoin="round"/>
    <path d="M56 25 L77 29" stroke="#F28B24" stroke-width="10" stroke-linecap="round"/>
    <circle cx="48" cy="23" r="14" fill="#F28B24"/>
    <circle cx="51" cy="21" r="3.3" fill="#1C2633"/><circle cx="52.2" cy="19.8" r="1" fill="#fff"/>
    <circle cx="80" cy="16" r="3" fill="none" stroke="#7FB8E8" stroke-width="2"/><circle cx="86" cy="8" r="2" fill="none" stroke="#7FB8E8" stroke-width="2"/></svg>`,
  toes:`<svg viewBox="0 0 100 100" aria-hidden="true">
    <ellipse cx="56" cy="32" rx="28" ry="15" fill="#F6CB2F" opacity=".45"/>
    <path d="M50 94 C34 94 30 80 32 66 C34 52 36 42 46 40 C58 38 69 44 69 58 C69 72 66 94 50 94Z" fill="#F2C29B" stroke="#B9835A" stroke-width="3"/>
    <g fill="#F2C29B" stroke="#C0623A" stroke-width="3"><circle cx="40" cy="31" r="8"/><circle cx="52.5" cy="27" r="6"/><circle cx="62" cy="29" r="5.2"/><circle cx="69.5" cy="33.5" r="4.6"/><circle cx="74.5" cy="40.5" r="4"/></g></svg>`,
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
/* Čísla 7 – 20: bodky v rámčekoch po 10 (5 a 5), aby sa dali spočítať po päťkách a desiatkach */
function ramik(n){
  const CEL = 17, X0 = 7.5;
  const ram = (y, kolko) => {
    let s = `<rect x="${X0}" y="${y}" width="${CEL*5}" height="${CEL*2}" rx="4" fill="#FFFFFF" stroke="#3A4656" stroke-width="2.5"/>
      <path d="M${X0} ${y+CEL} h${CEL*5}" stroke="#3A4656" stroke-width="1.5"/>`;
    for(let i=1;i<5;i++) s += `<path d="M${X0+CEL*i} ${y} v${CEL*2}" stroke="#3A4656" stroke-width="1.5"/>`;
    for(let i=0;i<kolko;i++) s += `<circle cx="${X0+CEL*(i%5)+CEL/2}" cy="${y+CEL*Math.floor(i/5)+CEL/2}" r="6" fill="#C2423A"/>`;
    return s;
  };
  return `<svg viewBox="0 0 100 100" aria-hidden="true">${n<=10 ? ram(33, n) : ram(12, 10) + ram(54, n-10)}</svg>`;
}
function obrazok(obr){
  if(Array.isArray(obr)) return `<div class="sl-obr scena">${obr.map(e=>`<span class="em">${e}</span>`).join("")}</div>`;
  if(typeof obr==="object") return `<div class="sl-obr"><span class="em" style="--m:${obr.m||1}">${obr.em}</span></div>`;
  if(obr.startsWith("farba:")) return `<div class="sl-obr">${skvrna(obr.slice(6))}</div>`;
  if(obr.startsWith("kocka:")) return `<div class="sl-obr">${kocka(+obr.slice(6))}</div>`;
  if(obr.startsWith("ramik:")) return `<div class="sl-obr">${ramik(+obr.slice(6))}</div>`;
  if(obr.startsWith("svg:"))   return `<div class="sl-obr">${SVG[obr.slice(4)]||""}</div>`;
  return `<div class="sl-obr"><span class="em">${obr}</span></div>`;
}
function ikonka(obr){
  if(obr.startsWith("farba:")) return skvrna(obr.slice(6));
  if(obr.startsWith("kocka:")) return kocka(+obr.slice(6));
  return obr;
}
const slov = n => n===1 ? "slovo" : n>=2 && n<=4 ? "slová" : "slov";

/* =====================================================================
   NASTAVENIA (pamätá si ich len tento prehliadač)
   lekcia + spolu sa dajú zadať aj adresou: slovnik.html#u3 alebo #u3+ (od začiatku)
   ===================================================================== */
const PORADIE = Object.fromEntries(LEKCIE.map((l,i)=>[l.id,i]));
const NAST = {pismo:"po", rychlost:0.65, lekcia:LEKCIE[0].id, spolu:false, extra:false, sk:false};
try{ Object.assign(NAST, JSON.parse(localStorage.getItem("slovnik-anj")||"{}")); }catch(e){}
if(!(NAST.lekcia in PORADIE)) NAST.lekcia = LEKCIE[0].id;
const ulozNast = () => { try{ localStorage.setItem("slovnik-anj", JSON.stringify(NAST)); }catch(e){} };
function zAdresy(){
  let h = ""; try{ h = decodeURIComponent(location.hash.slice(1)); }catch(e){}
  if(h in STARE_TEMY) h = STARE_TEMY[h];
  const plus = h.endsWith("+"), id = plus ? h.slice(0,-1) : h;
  if(!(id in PORADIE)) return false;
  NAST.lekcia = id; NAST.spolu = plus; return true;
}
function doAdresy(){
  const h = "#" + NAST.lekcia + (NAST.spolu ? "+" : "");
  if(location.hash === h) return;
  try{ history.replaceState(null, "", h); }catch(e){ location.hash = h; }
}

/* =====================================================================
   HLAS: angličtina en-GB → en-US → akýkoľvek en-*; slovenčina sk-SK.
   Ak anglický chýba, povieme to rodičovi. Ak chýba slovenský, preklad sa len ukáže.
   ===================================================================== */
const MA_REC = "speechSynthesis" in window;
let HLAS = null, HLAS_SK = null, hlasyHotove = false;
const kvalita = v => (/google|natural|neural|online|premium|enhanced/i.test(v.name) ? 2 : 0) + (v.localService ? 1 : 0)
                    - (/novelty|whisper|bad news|bells|bubbles|boing|cellos|zarvox|trinoids|jester|organ|superstar|wobble|albert|bahh|fred|junior|ralph|kathy/i.test(v.name) ? 5 : 0);
const najlepsi = zoz => zoz.sort((a,b)=>kvalita(b)-kvalita(a))[0];
const jazyk = v => v.lang.replace("_","-").toLowerCase();
function vyberHlasy(){
  if(!MA_REC) return;
  const vsetky = speechSynthesis.getVoices();
  const en = vsetky.filter(v => /^en([-_]|$)/i.test(v.lang));
  HLAS = najlepsi(en.filter(v=>jazyk(v)==="en-gb")) || najlepsi(en.filter(v=>jazyk(v)==="en-us")) || najlepsi(en) || null;
  HLAS_SK = najlepsi(vsetky.filter(v => /^sk([-_]|$)/i.test(v.lang))) || null;
}
function nacitajHlasy(){
  vyberHlasy();
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
function povedz(text, jaz="en"){
  const id = ++hovorId;
  try{
    const hlas = jaz==="sk" ? HLAS_SK : HLAS;
    if(!MA_REC || !hlas) throw 0;
    const ss = window.speechSynthesis;
    const rychlost = jaz==="sk" ? 0.95 : NAST.rychlost;
    ss.cancel(); clearTimeout(sayTimer);
    const warm = new SpeechSynthesisUtterance("a"); warm.voice = hlas; warm.lang = hlas.lang; warm.volume = 0.02; warm.rate = 1;
    const u = new SpeechSynthesisUtterance(text); u.voice = hlas; u.lang = hlas.lang; u.rate = rychlost; u.pitch = 1.05;
    ss.speak(warm);   /* hneď, ešte počas ťuknutia – iPad inak hlas nepustí */
    sayTimer = setTimeout(()=>ss.speak(u), PAUZA_MS);
    return new Promise(res=>{
      const od = Date.now(); let poistka, hotovo = false, zacal = false;
      const koniec = v => { if(hotovo) return; hotovo = true; clearTimeout(poistka); res(v && id===hovorId); };
      const kontrola = () => { if(ss.speaking && Date.now()-od < 12000) poistka = setTimeout(kontrola, 250); else koniec(zacal); };
      u.onstart = () => { zacal = true; };
      poistka = setTimeout(kontrola, PAUZA_MS + 1200 + String(text).length*160/rychlost);
      u.onend = () => { zacal = true; koniec(true); };
      u.onerror = () => koniec(false);
    });
  }catch(e){ return Promise.resolve(false); }
}
const pockaj = ms => new Promise(r=>setTimeout(r,ms));
function stichni(){ tukId++; try{ speechSynthesis.cancel(); }catch(e){} upokoj(aktivny); aktivny = null; }

/* =====================================================================
   STRÁNKA
   ===================================================================== */
zAdresy();
const pocute = new Set();   /* slová, ktoré dieťa už počulo (len kým je stránka otvorená) */
const viditelne = l => l.slova.filter(s => NAST.extra || !s.extra);
const pocetExtra = l => l.slova.filter(s => s.extra).length;
/* skupiny na obrazovke: jedna lekcia, alebo od začiatku (najnovšia lekcia hore) */
function skupiny(){
  const i = PORADIE[NAST.lekcia];
  return (NAST.spolu ? LEKCIE.slice(0, i+1).reverse() : [LEKCIE[i]]);
}
const menoLekcie = l => l.cislo==="Úvod" ? "Úvod" : "Lekcia " + l.cislo;

function vykresliLekcie(){
  const ja = PORADIE[NAST.lekcia];
  document.getElementById("temy").innerHTML = LEKCIE.map((l,i) =>
    `<button class="sl-tema${NAST.spolu && i<ja ? " v-rozsahu" : ""}" type="button" data-lekcia="${l.id}" aria-pressed="${l.id===NAST.lekcia}">
       <span class="ik" aria-hidden="true">${ikonka(l.ikona)}</span>
       <span class="n">${ESC(l.nazov)}<span class="l">${ESC(menoLekcie(l))} · ${viditelne(l).length} ${slov(viditelne(l).length)}</span></span></button>`).join("");
  const akt = document.querySelector(".sl-tema[aria-pressed=true]");
  if(akt) akt.scrollIntoView({block:"nearest", inline:"nearest"});
}
function vykresliVolby(){
  const sk = skupiny();
  const extra = sk.reduce((n,l)=>n+pocetExtra(l), 0);
  const v = document.getElementById("volby");
  v.querySelector('[data-spolu="0"]').setAttribute("aria-pressed", !NAST.spolu);
  v.querySelector('[data-spolu="1"]').setAttribute("aria-pressed", NAST.spolu);
  v.querySelector('[data-prep="extra"]').setAttribute("aria-pressed", NAST.extra);
  v.querySelector('[data-prep="sk"]').setAttribute("aria-pressed", NAST.sk);
  v.querySelector("#extraPocet").textContent = `+${extra} ${slov(extra)}`;
  const spolu = sk.reduce((n,l)=>n+viditelne(l).length, 0);
  const l = LEKCIE[PORADIE[NAST.lekcia]];
  document.getElementById("pokyn").textContent = NAST.spolu
    ? `Od začiatku po ${l.cislo==="Úvod" ? "úvod" : "lekciu " + l.cislo}: ${spolu} ${slov(spolu)}, najnovšie sú hore. Ťukni na obrázok.`
    : `Ťukni na obrázok. Tablet povie slovo po anglicky.`;
}
function vykresliMriezku(){
  const sk = skupiny();
  document.getElementById("mriezka").innerHTML = sk.map(l =>
    `<section class="sl-skupina">${NAST.spolu ? `<h2 class="sl-skup-h"><span class="ik" aria-hidden="true">${ikonka(l.ikona)}</span>${ESC(menoLekcie(l))} · ${ESC(l.nazov)}</h2>` : ""}
     <div class="sl-grid">${l.slova.map((s,i) => (NAST.extra || !s.extra) ?
      `<button class="sl-tile${s.extra ? " extra" : ""}" type="button" data-k="${l.id}:${i}" aria-label="Obrázok${s.extra ? " navyše" : ""}">
         ${obrazok(s.obr)}
         <span class="sl-vlny" aria-hidden="true"><i></i><i></i><i></i></span>
         <span class="sl-slovo" aria-live="polite"></span>
         ${pocute.has(s.w) ? `<span class="sl-pocul" title="Už počul"></span>` : ""}</button>` : "").join("")}</div></section>`).join("");
}
function vykresli(){ vykresliLekcie(); vykresliVolby(); vykresliMriezku(); }
function zmena(){ stichni(); ulozNast(); doAdresy(); vykresli(); }

document.getElementById("temy").addEventListener("click", e => {
  const b = e.target.closest("[data-lekcia]"); if(!b) return;
  NAST.lekcia = b.dataset.lekcia; zmena();
});
document.getElementById("volby").addEventListener("click", e => {
  const r = e.target.closest("[data-spolu]");
  if(r){ NAST.spolu = r.dataset.spolu==="1"; zmena(); return; }
  const p = e.target.closest("[data-prep]");
  if(p){ NAST[p.dataset.prep] = !NAST[p.dataset.prep]; zmena(); }
});
window.addEventListener("hashchange", () => { if(zAdresy()){ stichni(); ulozNast(); doAdresy(); vykresli(); } });
document.getElementById("mriezka").addEventListener("click", e => {
  const b = e.target.closest("[data-k]"); if(b) tukni(b);
});

/* ---------- ťuk na obrázok: povie slovo (a so SK aj preklad), potom slovo na chvíľu ukáže a schová ---------- */
const UKAZ_MS = 2500;      /* ako dlho vidno napísané anglické slovo */
const IKONY = {
  zavri:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>`,
};
let aktivny = null, tukId = 0;   /* práve hovoriaci obrázok */
function slovoZ(k){ const [id,i] = k.split(":"); return LEKCIE[PORADIE[id]].slova[+i]; }
function upokoj(t){
  if(!t) return;
  t.classList.remove("hovori");
  const sl = t.querySelector(".sl-slovo"); sl.classList.remove("ukaz","skry","sk"); sl.textContent = ""; sl.removeAttribute("lang");
}
async function ukazNaChvilu(sl, text, lang, ms, trieda, moj){
  sl.lang = lang; sl.textContent = text; sl.classList.toggle("sk", trieda==="sk"); sl.classList.add("ukaz");
  await pockaj(ms);
  if(moj!==tukId) return false;
  sl.classList.add("skry");
  await pockaj(600);
  if(moj!==tukId) return false;
  sl.classList.remove("ukaz","skry","sk"); sl.textContent = "";
  return true;
}
async function tukni(tile){
  const moj = ++tukId;
  const s = slovoZ(tile.dataset.k);
  if(aktivny && aktivny!==tile) upokoj(aktivny);
  upokoj(tile);
  aktivny = tile;
  tile.classList.add("hovori");
  const ok = await povedz(s.w, "en");
  if(moj!==tukId) return;                      /* medzitým ťukol znova alebo na iný obrázok */
  pocute.add(s.w);
  if(!tile.querySelector(".sl-pocul")) tile.insertAdjacentHTML("beforeend", `<span class="sl-pocul" title="Už počul"></span>`);
  const sl = tile.querySelector(".sl-slovo");
  /* SK: po anglickom slove slovenský preklad nahlas a na chvíľu napísaný */
  if(NAST.sk && s.sk){
    await pockaj(250);
    if(moj!==tukId) return;
    sl.lang = "sk"; sl.textContent = s.sk; sl.classList.add("sk","ukaz");
    const okSk = await povedz(s.sk, "sk");
    if(moj!==tukId) return;
    await pockaj(okSk ? 700 : 1800);
    if(moj!==tukId) return;
    sl.classList.add("skry");
    await pockaj(600);
    if(moj!==tukId) return;
    sl.classList.remove("ukaz","skry","sk"); sl.textContent = "";
  }
  tile.classList.remove("hovori");
  if(NAST.pismo!=="po") return;
  await pockaj(ok ? 300 : 900);
  if(moj!==tukId) return;
  if(await ukazNaChvilu(sl, s.w, "en", UKAZ_MS, "en", moj)) upokoj(tile);
}

/* ---------- panel pre rodiča ---------- */
let panel = null;
function popisHlasu(){
  if(!MA_REC) return `<span class="zle">Prehliadač nevie čítať nahlas.</span>`;
  if(!HLAS) return hlasyHotove ? `<span class="zle">Anglický hlas chýba.</span> Návod je hore na stránke.` : `Hľadám hlas…`;
  const gb = /en[-_]gb/i.test(HLAS.lang);
  return `<span class="ok">${gb ? "Britský hlas" : "Anglický hlas"}</span> ${ESC(HLAS.name)} (${ESC(HLAS.lang)})${gb ? "" : `<br>Britský hlas na zariadení nie je, výslovnosť bude americká.`}`;
}
function popisHlasuSK(){
  if(!MA_REC) return "";
  if(HLAS_SK) return `<span class="ok">Slovenský hlas</span> ${ESC(HLAS_SK.name)} (${ESC(HLAS_SK.lang)})`;
  return hlasyHotove ? `<span class="zle">Slovenský hlas chýba.</span> So zapnutým SK sa preklad len ukáže napísaný. Hlas pridáš rovnako ako anglický (jazyk Slovenčina).` : `Hľadám hlas…`;
}
function otvorPanel(){
  zavriPanel();
  const sk = skupiny();
  const z = document.createElement("div");
  z.className = "sl-zaves";
  z.innerHTML = `<div class="sl-panel" role="dialog" aria-modal="true" aria-labelledby="pn-h">
    <div class="sl-karta-top"><h2 id="pn-h">Pre rodiča</h2>
      <button class="sl-ikbtn" type="button" data-akcia="zavri" aria-label="Zavrieť">${IKONY.zavri}</button></div>
    <p>Podaj tablet dieťaťu. Nech ťukne na obrázok, vypočuje si slovo a zopakuje ho nahlas. Napísané slovo sa ukáže až po vypočutí a o chvíľu zmizne, aby si ho dieťa nezvyklo čítať po slovensky.</p>
    <p><b>Lekcie</b> idú v poradí učebnice Beehive Starter (Lekcia 1 = Unit 1). <b>Od začiatku</b> ukáže všetky slová až po zvolenú lekciu, najnovšie hore. <b>Extra</b> pridá pár slov navyše (majú prerušovaný rámček). <b>SK</b> po anglickom slove povie a na chvíľu ukáže aj slovenský preklad, keď obrázok nie je jasný.</p>
    <div><h3>Napísané anglické slovo</h3><div class="sl-seg" data-nast="pismo">
      <button type="button" id="pismo-po" data-hod="po" aria-pressed="${NAST.pismo==="po"}">Na chvíľu po vypočutí</button>
      <button type="button" id="pismo-nikdy" data-hod="nikdy" aria-pressed="${NAST.pismo==="nikdy"}">Neukazovať nikdy</button></div></div>
    <div><h3>Rýchlosť anglického hlasu</h3><div class="sl-seg" data-nast="rychlost">
      <button type="button" id="rych-065" data-hod="0.65" aria-pressed="${NAST.rychlost==0.65}">Pomaly</button>
      <button type="button" id="rych-05" data-hod="0.5" aria-pressed="${NAST.rychlost==0.5}">Veľmi pomaly</button>
      <button type="button" id="rych-085" data-hod="0.85" aria-pressed="${NAST.rychlost==0.85}">Takmer normálne</button></div></div>
    <div><h3>Hlas</h3><div class="sl-hlas"><span id="pn-hlas">${popisHlasu()}</span>
      <button class="sl-btn" type="button" data-akcia="skus">Vyskúšať</button></div>
      <div class="sl-hlas" style="margin-top:8px"><span id="pn-hlas-sk">${popisHlasuSK()}</span>
      <button class="sl-btn" type="button" data-akcia="skus-sk">Vyskúšať</button></div></div>
    ${sk.map(l => `<div><h3>${ESC(menoLekcie(l))} · ${ESC(l.nazov)} <span lang="en" class="sl-en">${ESC(l.en)}</span></h3><ul class="sl-zoznam">${viditelne(l).map(s=>`<li${s.extra ? ` class="extra"` : ""}><b lang="en">${ESC(s.w)}</b><span>${ESC(s.sk)}${s.extra ? " · extra" : ""}</span></li>`).join("")}</ul></div>`).join("")}
  </div>`;
  z.addEventListener("click", e => {
    if(e.target === z) return zavriPanel();
    const a = e.target.closest("[data-akcia]");
    if(a?.dataset.akcia==="zavri") return zavriPanel();
    if(a?.dataset.akcia==="skus"){ povedz("Hello! Let's learn English."); return; }
    if(a?.dataset.akcia==="skus-sk"){ povedz("Ahoj, učíme sa po anglicky.", "sk"); return; }
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
document.addEventListener("keydown", e => { if(e.key==="Escape") zavriPanel(); });
/* keď hlasy prídu neskôr, obnov aj text v otvorenom paneli */
setInterval(()=>{
  for(const [id, f] of [["pn-hlas", popisHlasu], ["pn-hlas-sk", popisHlasuSK]]){
    const p = document.getElementById(id); if(p){ const h = f(); if(p.innerHTML!==h) p.innerHTML = h; }
  }
}, 1000);

doAdresy();
vykresli();
