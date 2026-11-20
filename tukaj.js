/* Ťukaj a povedz (ANJ): dieťa ťuká na veci v izbe, kamarát povie krátku frázu, počká na zopakovanie a povie ju znova.
   Dáta scény sú v anj-sceny.js (ANJ_SCENY). Postavy Ema, Ben a robotík Bot sú vlastné kresby v kockovom štýle.
   Nič sa nenahráva, nič sa neposiela. Nastavenie (tempo, pauza, kamarát) si pamätá len tento prehliadač. */
(function(){
"use strict";
const SCENA = ANJ_SCENY.izba;
const NS = "http://www.w3.org/2000/svg";
const $ = id => document.getElementById(id);
const svg = $("svg");

/* ---------------- nastavenia ---------------- */
const NAST = {tempo:0.7, rola:true, kamarat:null};
try{ Object.assign(NAST, JSON.parse(localStorage.getItem("tukaj-nast")||"{}")); }catch(e){}
const ulozNast = () => { try{ localStorage.setItem("tukaj-nast", JSON.stringify(NAST)); }catch(e){} };

/* ---------------- hlas (rovnaký výber ako v slovníku) ---------------- */
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
  ukazOznam();
}
if(MA_REC){
  vyberHlasy();
  try{ speechSynthesis.addEventListener("voiceschanged", vyberHlasy); }catch(e){ speechSynthesis.onvoiceschanged = vyberHlasy; }
}
setTimeout(()=>{ hlasyHotove = true; vyberHlasy(); ukazOznam(); }, 1800);
function ukazOznam(){
  const el = $("oznam");
  if(!MA_REC){ el.innerHTML = "<b>Tento prehliadač nevie čítať nahlas.</b> Otvor stránku v Chrome, Safari alebo Edge. Vety sa zatiaľ len ukážu v bublinách."; el.hidden = false; return; }
  if(!HLAS && hlasyHotove){ el.innerHTML = "<b>Na tomto zariadení chýba anglický hlas.</b> Pridaj ho rovnako ako pri Obrázkovom slovníku (Nastavenia → hlasy → English, United Kingdom) a stránku obnov."; el.hidden = false; return; }
  el.hidden = true;
}
/* Výška hlasu odlišuje postavy. Bot je hlbší a pomalší. */
const HLASY = { ema:{pitch:1.3, rate:1}, ben:{pitch:0.9, rate:1}, bot:{pitch:0.55, rate:0.9}, sk:{pitch:1, rate:1} };
let hovorId = 0;
function povedz(text, kto){
  const id = ++hovorId, sk = kto==="sk";
  try{
    const hlas = sk ? HLAS_SK : HLAS;
    if(!MA_REC || !hlas) throw 0;
    const ss = window.speechSynthesis, h = HLASY[kto] || HLASY.ema;
    const rychlost = sk ? 0.95 : NAST.tempo * h.rate;
    ss.cancel();
    const warm = new SpeechSynthesisUtterance("a"); warm.voice = hlas; warm.lang = hlas.lang; warm.volume = 0.02; warm.rate = 2;
    const u = new SpeechSynthesisUtterance(text); u.voice = hlas; u.lang = hlas.lang; u.rate = rychlost; u.pitch = h.pitch;
    ss.speak(warm); ss.speak(u);
    return new Promise(res=>{
      const od = Date.now(); let poistka, hotovo = false, zacal = false;
      const koniec = v => { if(hotovo) return; hotovo = true; clearTimeout(poistka); res(v && id===hovorId); };
      const kontrola = () => { if(ss.speaking && Date.now()-od < 12000) poistka = setTimeout(kontrola, 250); else koniec(zacal); };
      u.onstart = () => { zacal = true; };
      poistka = setTimeout(kontrola, 1500 + String(text).length*160/rychlost);
      u.onend = () => { zacal = true; koniec(true); };
      u.onerror = () => koniec(false);
    });
  }catch(e){
    /* bez hlasu: aspoň počkáme toľko, koľko by veta trvala, a ukážeme ju */
    return new Promise(r => setTimeout(()=>r(false), 900 + String(text).length*60));
  }
}
const pockaj = ms => new Promise(r=>setTimeout(r,ms));
/* pauza na zopakovanie: zhruba 1,5-krát dlhšia ako veta */
const pauzaNa = text => Math.min(4200, Math.max(1700, (700 + text.length*85) / NAST.tempo));

/* ---------------- kresby ---------------- */
const INK = "#2E2B36";
function tmavsia(hex, k=0.78){
  const n = parseInt(hex.slice(1),16);
  const c = [n>>16, (n>>8)&255, n&255].map(x=>Math.round(x*k));
  return "#" + c.map(x=>x.toString(16).padStart(2,"0")).join("");
}
/* veci: kreslené okolo bodu 0,0; prvok s triedou "farba" mení farbu */
const KRESBY = {
  lopta: f => `<circle class="farba" r="46" fill="${f}" stroke="${INK}" stroke-width="5"/>
    <path d="M-44 -6 Q0 22 44 -6" stroke="#FFFFFF" stroke-width="9" fill="none" opacity=".75"/>
    <rect x="-24" y="-30" width="14" height="10" rx="3" fill="#FFFFFF" opacity=".7"/>`,
  ceruzka: f => `<g transform="rotate(-8)"><rect x="-82" y="-12" width="14" height="24" rx="3" fill="#F48FB1" stroke="${INK}" stroke-width="4"/>
    <rect x="-70" y="-12" width="10" height="24" fill="#B8BEC8" stroke="${INK}" stroke-width="4"/>
    <rect class="farba" x="-60" y="-12" width="96" height="24" fill="${f}" stroke="${INK}" stroke-width="4"/>
    <rect x="-60" y="-12" width="96" height="7" fill="#FFFFFF" opacity=".3"/>
    <path d="M36 -12 L66 0 L36 12 Z" fill="#F2D3A2" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
    <path d="M56 -4 L66 0 L56 4 Z" fill="${INK}"/></g>`,
  pastelka: f => `<g transform="rotate(12)"><rect class="farba" x="-48" y="-17" width="72" height="34" rx="4" fill="${f}" stroke="${INK}" stroke-width="4"/>
    <rect x="-34" y="-17" width="40" height="34" fill="#FFFFFF" opacity=".42"/>
    <path class="farba" d="M24 -13 L50 -5 L50 5 L24 13 Z" fill="${f}" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/></g>`,
  kniha: f => `<rect x="-40" y="-52" width="86" height="104" rx="4" fill="#FFFFFF" stroke="${INK}" stroke-width="4"/>
    <rect class="farba" x="-50" y="-56" width="88" height="110" rx="5" fill="${f}" stroke="${INK}" stroke-width="5"/>
    <rect x="-50" y="-56" width="14" height="110" rx="4" fill="#000" opacity=".18"/>
    <rect x="-24" y="-34" width="48" height="10" rx="3" fill="#FFFFFF" opacity=".8"/>
    <rect x="-24" y="-16" width="34" height="8" rx="3" fill="#FFFFFF" opacity=".6"/>`,
  taska: f => `<path d="M-30 -42 Q-30 -76 0 -76 Q30 -76 30 -42" stroke="${INK}" stroke-width="9" fill="none"/>
    <rect class="farba" x="-58" y="-44" width="116" height="100" rx="14" fill="${f}" stroke="${INK}" stroke-width="5"/>
    <path class="farba" d="M-58 -30 Q-58 -44 -44 -44 H44 Q58 -44 58 -30 V2 H-58 Z" fill="${f}" stroke="${INK}" stroke-width="5"/>
    <path d="M-58 -30 Q-58 -44 -44 -44 H44 Q58 -44 58 -30 V2 H-58 Z" fill="#000" opacity=".14"/>
    <rect x="-11" y="-6" width="22" height="18" rx="3" fill="#FFD23F" stroke="${INK}" stroke-width="4"/>`,
  stolicka: f => `<rect class="farba" x="-40" y="-104" width="80" height="62" rx="6" fill="${f}" stroke="${INK}" stroke-width="5"/>
    <rect x="-28" y="-92" width="56" height="14" rx="4" fill="#FFFFFF" opacity=".35"/>
    <rect class="farba" x="-30" y="-44" width="12" height="40" fill="${f}" stroke="${INK}" stroke-width="5"/>
    <rect class="farba" x="18" y="-44" width="12" height="40" fill="${f}" stroke="${INK}" stroke-width="5"/>
    <rect class="farba" x="-50" y="-8" width="100" height="18" rx="4" fill="${f}" stroke="${INK}" stroke-width="5"/>
    <rect x="-44" y="10" width="12" height="54" fill="${tmavsia(f,.7)}" stroke="${INK}" stroke-width="5" class="farba-tm"/>
    <rect x="32" y="10" width="12" height="54" fill="${tmavsia(f,.7)}" stroke="${INK}" stroke-width="5" class="farba-tm"/>`
};

/* postavy: kockový štyl, kreslené v 140 × 210. ruka-in = ruka smerom do izby. */
const POSTAVY = {
  ema: {meno:"Ema", vlasy:"#B9824A", koza:"#F3C9A2", krk:"#E5B48C", mikina:"#F07A55", svetla:"#F7A184", tmava:"#D9643F", rukaVon:"#F07A55", rukaIn:"#E06A46", nohavice:"#3D5A99", nohSv:"#5272B8", topanky:INK,
        inVpravo:true},
  ben: {meno:"Ben", vlasy:"#C2622D", koza:"#F1C7A3", krk:"#E2B188", mikina:"#8BC34A", svetla:"#A6D66E", tmava:"#73A73A", rukaVon:"#7AB13C", rukaIn:"#8BC34A", nohavice:"#4A4A5A", nohSv:"#5E5E70", topanky:"#E2574C",
        inVpravo:false}
};
function postavaSVG(kto){
  const p = POSTAVY[kto];
  const lavaRuka = p.inVpravo ? p.rukaVon : p.rukaIn, pravaRuka = p.inVpravo ? p.rukaIn : p.rukaVon;
  const vlasy = kto==="ema"
    ? `<path d="M34 46 V30 Q34 22 42 22 H98 Q106 22 106 30 V46 H92 V40 H80 V46 H66 V40 H52 V46 Z" fill="${p.vlasy}"/>
       <rect x="34" y="38" width="12" height="52" rx="3" fill="${p.vlasy}"/><rect x="94" y="38" width="12" height="52" rx="3" fill="${p.vlasy}"/>
       <rect x="86" y="25" width="11" height="11" rx="2" fill="#FFD23F" transform="rotate(45 91.5 30.5)"/>`
    : `<path d="M36 52 V30 Q36 24 42 24 H50 V16 H62 V24 H72 V14 H84 V24 H98 Q104 24 104 30 V52 H96 V40 H44 V52 Z" fill="${p.vlasy}"/>`;
  const ruka = (x, f, cls) => `<g class="ruka ${cls}"><rect x="${x}" y="100" width="15" height="44" rx="4" fill="${f}"/><rect x="${x}" y="142" width="15" height="12" rx="3" fill="${p.koza}"/></g>`;
  return `<ellipse class="kruh" cx="70" cy="205" rx="58" ry="12" fill="none" stroke="#24865A" stroke-width="5"/>
  <g class="telo">
    <rect x="50" y="152" width="18" height="42" fill="${p.nohavice}"/><rect x="72" y="152" width="18" height="42" fill="${p.nohavice}"/>
    <rect x="72" y="152" width="5" height="42" fill="${p.nohSv}"/>
    <rect x="46" y="190" width="24" height="12" rx="2" fill="${p.topanky}"/><rect x="70" y="190" width="24" height="12" rx="2" fill="${p.topanky}"/>
    <rect x="62" y="88" width="16" height="12" fill="${p.krk}"/>
    ${ruka(29, lavaRuka, p.inVpravo ? "ruka-von" : "ruka-in")}
    ${ruka(96, pravaRuka, p.inVpravo ? "ruka-in" : "ruka-von")}
    <rect x="44" y="96" width="52" height="60" rx="5" fill="${p.mikina}"/>
    <rect x="44" y="96" width="9" height="60" rx="3" fill="${p.svetla}"/>
    <rect x="56" y="130" width="28" height="14" rx="2" fill="${p.tmava}"/>
    <rect x="38" y="30" width="64" height="62" rx="9" fill="${p.koza}"/>
    ${vlasy}
    <g class="oci"><rect x="55" y="57" width="9" height="11" rx="2" fill="${INK}"/><rect x="57" y="59" width="3" height="3" fill="#fff"/>
    <rect x="76" y="57" width="9" height="11" rx="2" fill="${INK}"/><rect x="78" y="59" width="3" height="3" fill="#fff"/></g>
    <rect x="48" y="71" width="8" height="5" rx="2" fill="#F08A8A" opacity=".55"/><rect x="84" y="71" width="8" height="5" rx="2" fill="#F08A8A" opacity=".55"/>
    <path class="usta-z" d="M62 77 Q70 84 78 77" stroke="${INK}" stroke-width="2.6" fill="none" stroke-linecap="round"/>
    <rect class="usta-o" x="64" y="76" width="12" height="8" rx="3" fill="${INK}"/>
  </g>`;
}
function botSVG(){
  return `<g class="telo-bot">
    <line x1="52" y1="24" x2="52" y2="8" stroke="#4FA8D1" stroke-width="3"/><circle class="anten" cx="52" cy="7" r="5" fill="#FFD23F"/>
    <path d="M20 30 L40 18 L84 18 L64 30 Z" fill="#A9DDF2"/>
    <path d="M64 30 L84 18 L84 62 L64 74 Z" fill="#4FA8D1"/>
    <rect x="20" y="30" width="44" height="44" fill="#73C2E6"/>
    <rect x="26" y="37" width="32" height="25" rx="3" fill="#1F3550"/>
    <g class="bot-oci"><rect x="32" y="43" width="6" height="8" fill="#7CF29B"/><rect x="46" y="43" width="6" height="8" fill="#7CF29B"/></g>
    <rect x="36" y="55" width="12" height="3" fill="#7CF29B"/>
    <rect x="26" y="74" width="10" height="9" fill="${INK}"/><rect x="48" y="74" width="10" height="9" fill="${INK}"/></g>`;
}
function izbaSVG(){
  /* stena, podlaha z dosiek, okno, polička, stolík a koberec – všetko kockové */
  let dosky = "";
  for(let y=478; y<700; y+=44) dosky += `<rect x="0" y="${y}" width="1200" height="2" fill="#C9A675"/>`;
  for(let i=0;i<8;i++){ const y = 478 + i*44; for(let x=(i%2)*90; x<1200; x+=180) dosky += `<rect x="${x}" y="${y}" width="2" height="44" fill="#C9A675"/>`; }
  return `<rect width="1200" height="700" fill="#E6F0FB"/>
  <rect y="0" width="1200" height="18" fill="#D3E2F4"/>
  <rect y="470" width="1200" height="230" fill="#E6CCA0"/>${dosky}
  <rect y="462" width="1200" height="12" fill="#C9A675"/>
  <g><rect x="470" y="60" width="260" height="170" rx="6" fill="#FFFFFF" stroke="#9FB4CC" stroke-width="8"/>
    <rect x="480" y="70" width="240" height="150" fill="#BFE3FF"/>
    <rect x="650" y="88" width="40" height="40" fill="#FFD23F"/>
    <rect x="506" y="160" width="70" height="22" fill="#FFFFFF"/><rect x="524" y="146" width="36" height="16" fill="#FFFFFF"/>
    <rect x="596" y="70" width="8" height="150" fill="#9FB4CC"/><rect x="480" y="141" width="240" height="8" fill="#9FB4CC"/></g>
  <g><rect x="92" y="150" width="200" height="14" fill="#B5835A"/>
    <rect x="104" y="98" width="22" height="52" fill="#E9B949"/><rect x="128" y="108" width="18" height="42" fill="#5AA1E3"/><rect x="148" y="94" width="24" height="56" fill="#E57F7F"/>
    <rect x="220" y="118" width="32" height="32" fill="#8FD18F"/><rect x="226" y="124" width="20" height="20" fill="#6BB86B"/></g>
  <g><rect x="500" y="388" width="360" height="20" fill="#B5835A"/><rect x="500" y="388" width="360" height="6" fill="#C99A70"/>
    <rect x="514" y="408" width="18" height="96" fill="#9E6E47"/><rect x="828" y="408" width="18" height="96" fill="#9E6E47"/></g>
  <rect x="440" y="610" width="440" height="58" rx="8" fill="#9CC7A8" opacity=".55"/>`;
}

/* ---------------- stavba scény ---------------- */
const el = (tag, attrs={}, html="") => { const e = document.createElementNS(NS, tag); for(const k in attrs) e.setAttribute(k, attrs[k]); if(html) e.innerHTML = html; return e; };
svg.innerHTML = izbaSVG();

/* postavy: Ema vľavo, Ben vpravo; mierka 1,6; uhly rúk podľa strany */
const POZICIE = {
  ema: {x:58,  y:340, s:1.6, uhly:"--uk:-80deg;--py:-35deg;--po:-62deg;--mv1:140deg;--mv2:172deg", ruka:[223,566], bub:[180,300]},
  ben: {x:918, y:340, s:1.6, uhly:"--uk:80deg;--py:35deg;--po:62deg;--mv1:-140deg;--mv2:-172deg", ruka:[977,566], bub:[1020,300]}
};
const gPostava = {};
for(const kto of ["ema","ben"]){
  const P = POZICIE[kto];
  const g = el("g", {class:"postava", "data-kto":kto, transform:`translate(${P.x} ${P.y}) scale(${P.s})`, style:P.uhly, role:"button", "aria-label":POSTAVY[kto].meno}, postavaSVG(kto));
  svg.appendChild(g); gPostava[kto] = g;
}
const gBot = el("g", {class:"bot", transform:"translate(640 548) scale(1.15)", role:"button", "aria-label":"Robotík Bot", tabindex:"0"}, botSVG());
svg.appendChild(gBot);
gPostava.bot = gBot;

/* veci */
const STAV = {};
const farbaPodla = en => SCENA.farby.find(f=>f.en===en);
SCENA.veci.forEach((v, i) => {
  const f = SCENA.farby[(i*2) % SCENA.farby.length];
  const g = el("g", {class:"vec", "data-id":v.id, role:"button", tabindex:"0", "aria-label":v.en});
  const pohyb = el("g", {class:"pohyb"});
  const pos = el("g", {transform:`translate(${v.x} ${v.y}) scale(${v.s})`});
  const tvar = el("g", {class:"tvar"}, KRESBY[v.kresba](f.hex));
  /* priehľadná plocha, aby sa dalo trafiť aj tenkú ceruzku */
  tvar.insertBefore(el("circle", {r:"70", fill:"transparent"}), tvar.firstChild);
  pos.appendChild(tvar); pohyb.appendChild(pos); g.appendChild(pohyb); svg.appendChild(g);
  STAV[v.id] = {vec:v, farba:f, krok:0, kola:0, g, pohyb};
});
function nastavFarbu(s, f){
  s.farba = f;
  s.g.querySelectorAll(".farba").forEach(e=>e.setAttribute("fill", f.hex));
  s.g.querySelectorAll(".farba-tm").forEach(e=>e.setAttribute("fill", tmavsia(f.hex,.7)));
}
function inaFarba(s){
  const ine = SCENA.farby.filter(f=>f.en!==s.farba.en);
  nastavFarbu(s, ine[Math.floor(Math.random()*ine.length)]);
}

/* bubliny nad hlavami (pre botu nad ním) */
const BUB_POS = {ema:POZICIE.ema.bub, ben:POZICIE.ben.bub, bot:[690,470]};
const gBub = {};
for(const kto of ["ema","ben","bot"]){
  const g = el("g", {class:"bub skryta"});
  g.appendChild(el("path")); g.appendChild(el("rect", {rx:"22"})); g.appendChild(el("text", {"text-anchor":"middle", "dominant-baseline":"central"}));
  svg.appendChild(g); gBub[kto] = g;
}
let bubTimer = {};
const esc = s => s.replace(/[&<>]/g, c=>({"&":"&amp;","<":"&lt;",">":"&gt;"}[c]));
function ukazBublinu(kto, text, s, nadlho){
  const g = gBub[kto]; clearTimeout(bubTimer[kto]);
  const t = g.querySelector("text");
  /* farebné slovo vo svojej farbe, názov veci tučne podčiarknutý */
  let html = esc(text);
  if(s){
    html = html.replace(new RegExp("\\b"+s.farba.en+"\\b","gi"), m=>`<tspan fill="${s.farba.en==="yellow"?"#C99A00":s.farba.hex}">${m}</tspan>`)
               .replace(new RegExp("\\b"+s.vec.en+"\\b","g"), m=>`<tspan text-decoration="underline">${m}</tspan>`);
  }
  t.innerHTML = html;
  const [cx, cy] = BUB_POS[kto];
  let w = 120;
  try{ w = Math.max(90, t.getComputedTextLength() + 56); }catch(e){}
  const x = Math.max(8, Math.min(1192 - w, cx - w/2)), h = 68;
  t.setAttribute("x", x + w/2); t.setAttribute("y", cy);
  const r = g.querySelector("rect"); r.setAttribute("x", x); r.setAttribute("y", cy - h/2); r.setAttribute("width", w); r.setAttribute("height", h);
  const chvost = kto==="bot" ? cx : Math.max(x+30, Math.min(x+w-30, cx));
  g.querySelector("path").setAttribute("d", `M${chvost-14} ${cy+h/2-4} L${chvost} ${cy+h/2+22} L${chvost+14} ${cy+h/2-4} Z`);
  g.classList.remove("skryta");
  bubTimer[kto] = setTimeout(()=>g.classList.add("skryta"), nadlho || 2600);
}
const skryBubliny = () => Object.values(gBub).forEach(g=>g.classList.add("skryta"));

/* ---------------- texty viet ---------------- */
const clen = slovo => /^[aeiou]/i.test(slovo) ? "an" : "a";
function vyplnText(en, s){
  if(!s) return en;
  return en.replace("{a_vec}", clen(s.vec.en)+" "+s.vec.en)
           .replace("{a_farba}", clen(s.farba.en)+" "+s.farba.en)
           .replace("{A_farba}", (clen(s.farba.en)==="an"?"An":"A")+" "+s.farba.en)
           .replace(/\{farba\}/g, s.farba.en).replace(/\{vec\}/g, s.vec.en);
}

/* ---------------- prehrávanie ---------------- */
let beh = 0;
/* kým postavy hovoria, ďalšie ťuky nič nerobia (netrpezlivé ťukanie by hlas usekávalo) */
let zaneprazdnene = false;
function nastavZaneprazdnene(v){ zaneprazdnene = v; svg.classList.toggle("caka", v); }
const kto2 = r => r.kto==="hlavny" ? NAST.kamarat : r.kto==="druhy" ? (NAST.kamarat==="ema"?"ben":"ema") : r.kto;
function poza(kto, p){
  const g = gPostava[kto]; if(!g || kto==="bot") return;
  g.classList.remove("p-ukazuje","p-pyta","p-podava","p-mava");
  if(p) g.classList.add("p-"+p);
}
function stichni(){
  beh++; hovorId++; nastavZaneprazdnene(false);
  try{ speechSynthesis.cancel(); }catch(e){}
  for(const k in gPostava) gPostava[k].classList.remove("hovori","tvoj-rad","tanec","p-ukazuje","p-pyta","p-podava","p-mava");
  for(const id in STAV){ STAV[id].pohyb.style.transform = ""; STAV[id].g.classList.remove("zvyrazni"); }
}
async function hovor(kto, text, s, id){
  const g = gPostava[kto];
  g.classList.add("hovori");
  await povedz(text, kto);
  g.classList.remove("hovori");
  if(id !== beh) return false;
  ukazBublinu(kto, text, s);
  return true;
}
function akcia(a, s, kto){
  if(!s) return;
  if(a==="zvyrazni"){ s.g.classList.remove("zvyrazni"); void s.g.getBBox(); s.g.classList.add("zvyrazni"); }
  if(a==="podaj"){
    /* vec preletí do ruky druhej postavy */
    const ciel = POZICIE[kto==="ema"?"ben":"ema"].ruka;
    s.pohyb.style.transform = `translate(${ciel[0]-s.vec.x}px, ${ciel[1]-s.vec.y-20}px) scale(.6)`;
  }
  if(a==="vrat") setTimeout(()=>{ s.pohyb.style.transform = ""; }, 1300);
}
async function prehraj(riadky, s, id){
  nastavZaneprazdnene(true);
  try{ await prehrajRiadky(riadky, s, id); }
  finally{ if(id === beh) nastavZaneprazdnene(false); }
}
async function prehrajRiadky(riadky, s, id){
  for(const r of riadky){
    if(id !== beh) return;
    const kto = kto2(r);
    if(r.riekanka){ inaFarba(STAV[r.riekanka]); s = STAV[r.riekanka]; for(const k of ["ema","ben","bot"]) gPostava[k].classList.add("tanec"); }
    const text = vyplnText(r.en, s);
    poza(kto, r.poza);
    if(r.akcia==="podaj") akcia("podaj", s, kto);
    /* prevzatie roly: od 3. kola kamarát odpoveď najprv nepovie */
    if(r.rola && s && s.kola >= 2 && NAST.rola){
      gPostava[kto].classList.add("tvoj-rad");
      ukazBublinu(kto, "?", null, pauzaNa(text) + 400);
      await pockaj(pauzaNa(text));
      if(id !== beh) return;
      gPostava[kto].classList.remove("tvoj-rad");
    }
    if(!await hovor(kto, text, s, id)) return;
    if(r.akcia && r.akcia!=="podaj") akcia(r.akcia, s, kto);
    if(r.opakuj){
      /* pauza na zopakovanie, potom to isté ešte raz ako vzor */
      gPostava[kto].classList.add("tvoj-rad");
      await pockaj(pauzaNa(text));
      if(id !== beh) return;
      gPostava[kto].classList.remove("tvoj-rad");
      if(!await hovor(kto, text, s, id)) return;
    }
    await pockaj(350);
  }
  if(id === beh){
    for(const k of ["ema","ben","bot"]) gPostava[k].classList.remove("tanec");
    setTimeout(()=>{ if(id===beh) { poza("ema"); poza("ben"); } }, 900);
  }
}
function tukVec(idVeci){
  if(!NAST.kamarat || zaneprazdnene) return;
  const s = STAV[idVeci];
  stichni(); skryBubliny();
  const id = beh;
  if(s.krok===0 && s.kola>0) inaFarba(s);
  const riadky = SCENA.kroky[s.krok];
  s.krok = (s.krok + 1) % SCENA.kroky.length;
  if(s.krok===0) s.kola++;
  prehraj(riadky, s, id);
}
let botKrok = 0;
function tukBot(){
  if(!NAST.kamarat || zaneprazdnene) return;
  stichni(); skryBubliny();
  const id = beh, riadky = SCENA.bot[botKrok];
  botKrok = (botKrok + 1) % SCENA.bot.length;
  prehraj(riadky, null, id);
}

/* ťuky: celá vec aj jej okolie (pointerdown je na tablete rýchlejší ako click) */
svg.addEventListener("click", e => {
  const v = e.target.closest(".vec"); if(v){ tukVec(v.dataset.id); return; }
  if(e.target.closest(".bot")) { tukBot(); return; }
});
svg.addEventListener("keydown", e => {
  if(e.key!=="Enter" && e.key!==" ") return;
  const v = e.target.closest(".vec"); if(v){ e.preventDefault(); tukVec(v.dataset.id); }
  else if(e.target.closest(".bot")){ e.preventDefault(); tukBot(); }
});

/* ---------------- štart: výber kamaráta ---------------- */
const SKLON = {ema:"s Emou", ben:"s Benom"};
for(const kto of ["ema","ben"]){
  const b = $(kto==="ema"?"volEma":"volBen");
  b.innerHTML = `<svg viewBox="20 8 100 100" aria-hidden="true">${postavaSVG(kto).replace('class="kruh"','class="kruh" display="none"')}</svg>${POSTAVY[kto].meno}`;
  b.addEventListener("click", () => zacni(kto));
}
function zacni(kto){
  NAST.kamarat = kto; ulozNast();
  $("start").hidden = true;
  stichni();
  const id = beh;
  const veta = "Ťukaj na veci a opakuj " + SKLON[kto] + ".";
  $("pokyn").textContent = veta;
  nastavZaneprazdnene(true);
  povedz(veta, "sk").then(async ()=>{
    if(id!==beh) return;
    await pockaj(300);
    prehraj([{kto:"hlavny", en:"Hello!", poza:"mava"}], null, id);
  });
}
$("btnZmen").addEventListener("click", () => { stichni(); skryBubliny(); $("start").hidden = false; $("info").open = false; window.scrollTo(0,0); });

/* ---------------- nastavenia pre rodiča ---------------- */
function obnovTlacidla(){
  document.querySelectorAll("[data-tempo]").forEach(b=>b.setAttribute("aria-pressed", String(+b.dataset.tempo===NAST.tempo)));
  document.querySelectorAll("[data-rola]").forEach(b=>b.setAttribute("aria-pressed", String((b.dataset.rola==="1")===NAST.rola)));
}
document.querySelectorAll("[data-tempo]").forEach(b=>b.addEventListener("click", ()=>{ NAST.tempo = +b.dataset.tempo; ulozNast(); obnovTlacidla(); }));
document.querySelectorAll("[data-rola]").forEach(b=>b.addEventListener("click", ()=>{ NAST.rola = b.dataset.rola==="1"; ulozNast(); obnovTlacidla(); }));
obnovTlacidla();
/* štart sa ukáže vždy (prvý ťuk zároveň odomkne hlas na iPade) */
NAST.kamarat = null;
})();
