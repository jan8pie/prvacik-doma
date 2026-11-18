/* =====================================================================
   KNIŽNICA PRACOVNÝCH LISTOV (listy.html) – všetky listy na tlač na jednom mieste.
   Plní sa sama: berie bloky {typ:"tlac"} zo zverejnených kariet v karty.js.
   Pri výrobe sady sa tu nič nemení.

   Usporiadanie podľa postupu učiva:
   - Slovenčina: kapitoly podľa písmen v poradí, ako ich trieda brala (stav.js, „pismena“).
     Písmeno listu sa zistí z názvu karty („Písmeno O…“, „…začína na M?“) alebo zo súboru
     sjl-pisanie-x.pdf; inak podľa dátumu (písmeno, ktoré trieda vtedy práve brala).
     Ostatné listy spred prvého písmena sú v kapitole „Skôr než písmená“.
   - Matematika: kapitoly podľa témy z mapy učiva (kod karty, napr. MAT-CO-4 = Rozklad čísla),
     v poradí, v akom sa téma prvý raz objavila. Vnútri kapitoly podľa dátumu.
   Hľadanie: bez diakritiky; jedno písmeno hľadá kapitolu písmena, číslica celé číslo.
   ===================================================================== */
(() => {
const TRIEDA = window.STAV_TRIEDY || {pismena:[], cisla:[]};
const PREDMETY = {SJL:{n:"Slovenčina",c:"sjl"}, MAT:{n:"Matematika",c:"mat"}, ANJ:{n:"Angličtina",c:"anj"}, CAP:{n:"Človek a príroda",c:"cap"}};
const TEMY_MAT = {
  "MAT-CO-1":{t:"Čísla a počítanie", z:"1 2 3", p:"koľko je, písanie číslic"},
  "MAT-CO-2":{t:"Porovnávame a poradie", z:"&lt; &gt;", p:"viac, menej, kto je prvý, číselný rad"},
  "MAT-CO-3":{t:"Sčítanie a odčítanie", z:"+ −", p:"pridávame, uberáme, koľko je spolu"},
  "MAT-CO-4":{t:"Rozklad čísla", z:"2|4", p:"číslo na dve časti"},
  "MAT-CO-5":{t:"Príbehy s číslami", z:"?", p:"slovné úlohy, príklad k obrázku"},
  "MAT-CO-6":{t:"Triedime a hľadáme", z:"✓", p:"patrí, nepatrí, pravda a nepravda"},
  "MAT-ZV-1":{t:"Vzory", z:"◆●◆", p:"čo príde ďalej"},
  "MAT-ZV-2":{t:"Čiarky a tabuľky", z:"||||", p:"zapisujeme a porovnávame údaje"},
  "MAT-ZV-3":{t:"Čas a dni", z:"po ut", p:"dnes, včera, zajtra, dni v týždni"},
  "MAT-GE-1":{t:"Tvary", z:"△○", p:"kruh, štvorec, trojuholník"},
  "MAT-GE-2":{t:"Telesá", z:"▢", p:"kocka, guľa, valec"},
  "MAT-GE-3":{t:"Hore, dole, vľavo, vpravo", z:"↔", p:"orientácia v priestore"},
  "MAT-GE-4":{t:"Čiary a cesty", z:"〰", p:"rovná a krivá čiara"},
  "MAT-GE-5":{t:"Skladáme tvary", z:"◧", p:"obrázky z tvarov"}
};
const UROVNE = [["●","Ľahšie"],["●●","Bežné"],["●●●","Výzva"]];

/* --- dátumy (rovnaké pravidlá ako feed kariet v index.html) --- */
const DEN = 864e5;
const datum = (s) => { const [y,m,d]=s.split("-").map(Number); return new Date(y,m-1,d); };
const DNES = (()=>{ const d=new Date(); d.setHours(0,0,0,0); return d; })();
const pondelok = (d) => { const x=new Date(d); x.setDate(x.getDate()-((x.getDay()+6)%7)); return x; };
const NAHLAD = new URLSearchParams(location.search).has("nahlad");
const HRANICA = (()=>{ const x=pondelok(DNES); x.setDate(x.getDate()+6);
  const teraz=new Date(); if(teraz.getDay()===0 && teraz.getHours()>=18) x.setDate(x.getDate()+7); return x; })();
const zverejnena = (k) => datum(k.datum) <= HRANICA;
const tentoTyzden = (s) => pondelok(datum(s)).getTime() === pondelok(DNES).getTime();
const fmt = (s) => { const d=datum(s); return d.getDate()+". "+(d.getMonth()+1)+"."; };
const esc = (s) => String(s ?? "").replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const bezDia = (s) => String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
const pocet = (n) => n + " " + (n===1 ? "list" : n>=2 && n<=4 ? "listy" : "listov");

/* --- poskladanie listov z kariet --- */
const PISMENA = TRIEDA.pismena.map(([od, p]) => ({od, p, l:p[0]}));
const RE_PISMENO = /(?:p[ií]smen(?:o|om|á)?|na)\s+([A-ZÁÄČĎÉÍĹĽŇÓÔŔŠŤÚÝŽ])(?=[\s:,.!?]|$)/;

function kapitolaSJL(k, b){
  const s = /^sjl-pisanie-(.)/.exec(b.subor);
  let l = s ? s[1] : (RE_PISMENO.exec(k.nazov)||[])[1];
  l = l && l.toLowerCase();
  let i = l ? PISMENA.findIndex(x => x.l === l) : -1;
  if(i < 0 && k.datum < PISMENA[0].od) return {id:"sjl-pred", poradie:-1};
  if(i < 0) for(let j=0; j<PISMENA.length; j++) if(PISMENA[j].od <= k.datum) i = j;
  return {id:"sjl-"+PISMENA[i].l, poradie:i};
}
function kapitolaSJLInfo(id){
  if(id === "sjl-pred") return {nazov:"Skôr než písmená", znak:"", ucho:true, popis:"počúvame zvuky, rýmujeme, tlieskame slabiky"};
  const x = PISMENA.find(p => "sjl-"+p.l === id);
  const dlhe = x.p.slice(1);
  return {nazov:"Písmeno "+x.l.toUpperCase()+(dlhe ? ", "+dlhe.toUpperCase() : ""), znak:x.l.toUpperCase()+x.l, popis:"od "+fmt(x.od),
          teraz: x === [...PISMENA].reverse().find(p => datum(p.od) <= DNES), pismeno:x.l};
}

const LISTY = [];
for(const k of (window.KARTY||[])){
  if(!NAHLAD && !zverejnena(k)) continue;
  for(const b of k.bloky||[]){
    if(b.typ !== "tlac" || !b.subor) continue;
    const n = b.subor.replace(/\.pdf$/, "");
    const pis = /^sjl-pisanie-(.)/.exec(n);
    const x = {k, b, n, predmet:k.predmet, datum:k.datum, urovne:b.urovne||0, pisanie:!!pis,
      nazov: pis ? "Píšeme "+pis[1]+", "+pis[1].toUpperCase() : k.nazov, text:b.text||""};
    if(k.predmet === "SJL" && PISMENA.length){ x.kap = kapitolaSJL(k, b).id; }
    else if(k.predmet === "MAT"){ const kod=(k.kod||"").split("-").slice(0,3).join("-"); x.kap = TEMY_MAT[kod] ? kod : "MAT-ine"; }
    else x.kap = k.predmet+"-vsetko";
    LISTY.push(x);
  }
}

/* Kapitoly: SJL v poradí písmen, ostatné podľa toho, kedy sa téma objavila prvý raz */
function kapitoly(predmet, listy){
  const m = new Map();
  for(const x of listy.filter(x => x.predmet === predmet)){ if(!m.has(x.kap)) m.set(x.kap, []); m.get(x.kap).push(x); }
  const kap = [...m].map(([id, l]) => {
    l.sort((a,b) => a.datum < b.datum ? -1 : a.datum > b.datum ? 1 : 0);
    let info;
    if(predmet === "SJL" && PISMENA.length) info = kapitolaSJLInfo(id);
    else if(TEMY_MAT[id]) info = {nazov:TEMY_MAT[id].t, znak:TEMY_MAT[id].z, popis:TEMY_MAT[id].p};
    else info = {nazov: predmet==="MAT" ? "Ďalšie listy" : "Všetky listy", znak:"", popis:""};
    const poradie = predmet === "SJL" && PISMENA.length ? (id==="sjl-pred" ? -1 : PISMENA.findIndex(p => "sjl-"+p.l === id)) : l[0].datum;
    return {id, listy:l, poradie, predmet, ...info};
  });
  return kap.sort((a,b) => a.poradie < b.poradie ? -1 : a.poradie > b.poradie ? 1 : 0);
}

/* --- hľadanie --- */
for(const x of LISTY){
  const kap = kapitoly(x.predmet, [x])[0];
  x.hladaj = " " + bezDia([x.nazov, x.text, x.k.nazov, kap.nazov, PREDMETY[x.predmet]?.n].join(" ")).replace(/[^a-z0-9]+/g, " ") + " ";
  x.pismeno = kap.pismeno || (x.pisanie ? x.n.slice(-1) : "");
}
function sedi(x, slova){
  return slova.every(s => {
    if(/^[a-z]$/.test(s)) return x.predmet === "SJL" && x.pismeno === s;   /* jedno písmeno = kapitola písmena */
    if(s.length <= 2) return x.hladaj.includes(" "+s+" ");                  /* číslo alebo krátke slovo celé */
    return x.hladaj.includes(" "+s) || (s.length >= 4 && x.hladaj.includes(s));
  });
}

/* --- vykreslenie --- */
const IKONA = {
  tlac:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4v11M7 10.5l5 5 5-5M5 20h14"/></svg>',
  karta:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="3"/><path d="M8 9h8M8 13h5"/></svg>',
  ucho:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M7 10a5 5 0 0 1 10 0c0 3-3 4-3 7a3 3 0 0 1-5 1.5"/><path d="M10 10a2 2 0 0 1 4 0"/><path d="M19.5 6.5c.8 1 1.2 2.2 1.2 3.5M3.3 10c0-1.3.4-2.5 1.2-3.5"/></svg>',
  pero:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 20l1-4L16 5l3 3L8 19z"/><path d="M14 7l3 3"/></svg>',
  vrstvy:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" aria-hidden="true"><path d="M12 4l9 4.5-9 4.5-9-4.5z"/><path d="M3 13l9 4.5 9-4.5"/></svg>'
};
const nalepka = (k) => { const e = k.obr || ""; const s = e && window.KRESBY ? KRESBY.zEmoji(e) : ""; return s || (e ? `<span class="emo">${esc(e)}</span>` : ""); };

function dlazdica(x){
  const p = PREDMETY[x.predmet]?.c || "mat";
  const pdf = "tlac/pdf/"+x.n;
  const tri = x.urovne === 3;
  const nahlad = tri ? pdf+"-2.png" : pdf+".png";
  const novy = tentoTyzden(x.datum) ? `<span class="novy">Tento týždeň</span>` : "";
  const buduci = !zverejnena(x.k) ? `<span class="novy plan">zverejní sa ${fmt(x.datum)}</span>` : "";
  const druh = tri ? `${IKONA.vrstvy}3 úrovne` : x.pisanie ? `${IKONA.pero}Píšeme` : "1 strana";
  return `<article class="list ${p}${tri?" tri":""}" data-n="${esc(x.n)}">
    <a class="papier" href="${pdf}.pdf" target="_blank" rel="noopener" aria-label="Otvoriť list ${esc(x.nazov)} (PDF)">
      <span class="pg"><img src="${nahlad}" data-zakl="${nahlad}" alt="" loading="lazy" decoding="async"></span>
      <span class="nalepka" aria-hidden="true">${nalepka(x.k)}</span>
    </a>
    <div class="list-t">
      <div class="znacky"><span class="druh">${druh}</span>${novy}${buduci}</div>
      <h3>${esc(x.nazov)}</h3>
      <p>${esc(x.text)}</p>
    </div>
    <div class="ovl">
      ${tri ? `<div class="urv" role="group" aria-label="Otvoriť jednu úroveň">${UROVNE.map(([d,t],j) =>
        `<a href="${pdf}-${j+1}.pdf" data-img="${pdf}-${j+1}.png" target="_blank" rel="noopener" aria-label="Úroveň ${t} (PDF)"><b>${d}</b><small>${t}</small></a>`).join("")}</div>` : ""}
      <div class="akcie">
        <a class="btn primary" href="${pdf}.pdf" download target="_blank" rel="noopener">${IKONA.tlac}${tri ? "Stiahnuť všetky 3" : "Stiahnuť PDF"}</a>
        <a class="btn ghost" href="./#${esc(x.k.id)}" aria-label="Otvoriť kartu ${esc(x.k.nazov)}">${IKONA.karta}Karta</a>
      </div>
    </div>
  </article>`;
}

function kapitolaHtml(kap){
  const p = PREDMETY[kap.predmet]?.c || "mat";
  const znak = kap.ucho ? IKONA.ucho : kap.znak ? `<span>${kap.znak}</span>` : IKONA.vrstvy;
  const dlhy = kap.znak && kap.znak.replace(/&\w+;/g, "x").length > 3 ? " dlhy" : "";
  return `<section class="kap ${p}" id="k-${esc(kap.id)}" aria-labelledby="h-${esc(kap.id)}">
    <header class="kap-h">
      <span class="kap-z${kap.pismeno?" pis":""}${dlhy}" aria-hidden="true">${znak}</span>
      <div><h2 id="h-${esc(kap.id)}">${esc(kap.nazov)}${kap.teraz ? ` <span class="teraz">Teraz</span>` : ""}</h2>
        <p>${esc(kap.popis)}${kap.popis ? " · " : ""}${pocet(kap.listy.length)}</p></div>
    </header>
    <div class="mriezka">${kap.listy.map(dlazdica).join("")}</div>
  </section>`;
}

/* --- stránka --- */
const $ = (id) => document.getElementById(id);
const predmety = Object.keys(PREDMETY).filter(p => LISTY.some(x => x.predmet === p));
let aktivny = (() => { const h = location.hash.slice(1).toUpperCase(); if(predmety.includes(h)) return h;
  try{ const v = localStorage.getItem("prvacik-listy"); if(predmety.includes(v)) return v; }catch(e){} return predmety[0]; })();

$("pocet").textContent = pocet(LISTY.length);
$("sprv").innerHTML = window.SPRIEVODCA ? SPRIEVODCA.svg("ukazuje") : "";

function kreslitaby(){
  $("taby").innerHTML = predmety.map(p => `<button type="button" class="tab ${PREDMETY[p].c}" data-p="${p}" aria-pressed="${p===aktivny}">${PREDMETY[p].n}<small>${LISTY.filter(x=>x.predmet===p).length}</small></button>`).join("");
}
function kresli(){
  const q = bezDia($("hladaj").value.trim()).replace(/[^a-z0-9]+/g, " ").trim();
  const slova = q ? q.split(" ") : [];
  $("zrus").hidden = !q;
  document.body.classList.toggle("hlada", !!q);
  kreslitaby();
  let html = "", kap;
  if(slova.length){
    const najdene = LISTY.filter(x => sedi(x, slova));
    kap = predmety.flatMap(p => kapitoly(p, najdene));
    $("stav").innerHTML = najdene.length
      ? `Nájdené: <b>${pocet(najdene.length)}</b> pre „${esc($("hladaj").value.trim())}“`
      : "";
    html = najdene.length ? kap.map(kapitolaHtml).join("")
      : `<div class="nic">${window.SPRIEVODCA ? SPRIEVODCA.svg("rozmysla") : ""}<p><b>Taký list som nenašla.</b><br>Skús jedno písmeno (O), číslo (7) alebo slovo z listu, napríklad rozklad, slabiky, vzory.</p></div>`;
    $("skok").innerHTML = "";
  } else {
    kap = kapitoly(aktivny, LISTY);
    $("stav").textContent = "";
    html = kap.map(kapitolaHtml).join("");
    $("skok").innerHTML = kap.map(k => `<a href="#k-${esc(k.id)}" class="${k.teraz?"teraz":""}${k.pismeno?" pis":""}" title="${esc(k.nazov)}">${
      k.pismeno ? k.znak : k.ucho ? "Pred písmenami" : esc(k.nazov)}</a>`).join("");
  }
  $("obsah").innerHTML = html;
}
$("taby").addEventListener("click", e => {
  const b = e.target.closest("[data-p]"); if(!b) return;
  aktivny = b.dataset.p; $("hladaj").value = "";
  try{ localStorage.setItem("prvacik-listy", aktivny); }catch(e){}
  history.replaceState(null, "", "#"+aktivny.toLowerCase());
  kresli();
});
$("hladaj").addEventListener("input", kresli);
$("zrus").addEventListener("click", () => { $("hladaj").value = ""; kresli(); $("hladaj").focus(); });
$("skok").addEventListener("click", e => {
  const a = e.target.closest("a"); if(!a) return; e.preventDefault();
  document.querySelector(a.getAttribute("href"))?.scrollIntoView({behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block:"start"});
});
/* Prejdenie myšou po úrovni ukáže jej náhľad */
const nahladUrovne = (e) => { const a = e.target.closest?.(".urv a"); if(!a) return;
  const img = a.closest(".list").querySelector(".pg img"); img.src = e.type === "pointerover" || e.type === "focusin" ? a.dataset.img : img.dataset.zakl; };
["pointerover","pointerout","focusin","focusout"].forEach(t => $("obsah").addEventListener(t, nahladUrovne));

kresli();
})();
