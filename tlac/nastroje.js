/* =====================================================================
   POMOCNÍK PRE PRACOVNÉ LISTY – skratky, aby sa listy písali ľahko.
   Načítať na konci listu:  <script src="obrazky.js"></script><script src="nastroje.js"></script>

   Skratky v HTML:
     <header class="hlava" data-predmet="Matematika">Nadpis</header>   hlavička s menom a úrovňou
     <div class="darilo"></div>                       smajlíky „Ako sa mi darilo?“
     <i o="zajac"></i>                                obrázok z obrazky.js (veľkosť: class="xs|m|s|l|xl")
     <i o="jahoda" n="3"></i>                         ten istý obrázok 3-krát
     <i kocka="4"></i>  <i kocka="5" x="2"></i>       hracia kocka (x = koľko bodiek je prečiarknutých)
     <i kocka=""></i>                                 prázdna kocka (dieťa dokreslí)
     <i domino="3 2"></i>  <i domino="1 -"></i>        domino (- = prázdna polovica), class="lezi" naležato
     <i obtiahni="6"></i>  <i obtiahni="M" w="96"></i> číslo/písmeno na obťahovanie
     <i os="0 10" skry="3 7"></i>                     číselná os (skry = čísla, ktoré dieťa dopíše)
   Úroveň listu: <div class="list" data-uroven="1|2|3">
   ===================================================================== */
(function(){
const UROVNE = {1:["●○○","Ľahšie"], 2:["●●○","Bežné"], 3:["●●●","Výzva"]};

function hory(u){
  const fg = u==3 ? "#fff" : "#111", bg = u==3 ? "#111" : "#fff";
  const v = [["M31 23 L45 3 L59 23 Z",3],["M15 23 L26 9 L37 23 Z",2],["M2 23 L11 13 L20 23 Z",1]];
  return `<svg viewBox="0 0 61 25">${v.map(([d,k])=>`<path d="${d}" fill="${k<=u?fg:bg}" stroke="${fg}"/>`).join("")}</svg>`;
}

/* hlavička */
document.querySelectorAll("header.hlava[data-predmet]").forEach(h=>{
  const list = h.closest(".list"); const u = +(list && list.dataset.uroven) || 0;
  const nadpis = h.innerHTML;
  h.innerHTML = `<div><div class="znacka">Prváčik doma <span class="predmet">${h.dataset.predmet}</span></div><h1>${nadpis}</h1></div>
    <div class="vpravo">${u?`<div class="stitok">${hory(u)}<span class="b">${UROVNE[u][0]}</span>${UROVNE[u][1]}</div>`:""}
    <div class="meno">Meno:<span></span></div></div>`;
});

/* smajlíky */
const SMAJL = [`<path d="M12 24 Q20 31 28 24"/>`,`<path d="M13 26 H27"/>`,`<path d="M12 28 Q20 21 28 28"/>`];
document.querySelectorAll(".darilo:empty").forEach(d=>{
  d.innerHTML = "Ako sa mi darilo? Vyfarbi.<br>" + SMAJL.map(u=>`<svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="17"/><circle cx="14" cy="16" r="1.5" fill="#111"/><circle cx="26" cy="16" r="1.5" fill="#111"/>${u}</svg>`).join("");
});

const nahrad = (el, html) => { const t = document.createElement("template"); t.innerHTML = html.trim(); el.replaceWith(t.content); };
const triedy = (el, extra) => [extra, el.getAttribute("class")||""].join(" ").trim();
const styl = (el) => el.getAttribute("style") ? ` style="${el.getAttribute("style")}"` : "";

/* obrázky */
document.querySelectorAll("i[o]").forEach(el=>{
  const n = +(el.getAttribute("n")||1);
  const one = `<svg class="${triedy(el,"pic")}"${styl(el)}><use href="#${el.getAttribute("o")}"/></svg>`;
  nahrad(el, one.repeat(n));
});

/* hracia kocka */
const BODKY = {0:[],1:[[50,50]],2:[[27,27],[73,73]],3:[[25,25],[50,50],[75,75]],4:[[27,27],[73,27],[27,73],[73,73]],
  5:[[25,25],[75,25],[50,50],[25,75],[75,75]],6:[[28,23],[72,23],[28,50],[72,50],[28,77],[72,77]]};
const kocka = (n, x, cls, st) => `<span class="kocka ${cls||""}"${st||""}>${(BODKY[n]||[]).map(([l,t],i)=>
  `<i class="${i>=n-x?"x":""}" style="left:${l}%;top:${t}%"></i>`).join("")}</span>`;
document.querySelectorAll("i[kocka]").forEach(el=>{
  const v = el.getAttribute("kocka"); const n = v==="" ? -1 : +v;
  nahrad(el, kocka(n, +(el.getAttribute("x")||0), el.getAttribute("class"), styl(el)));
});
document.querySelectorAll("i[domino]").forEach(el=>{
  const [a,b] = el.getAttribute("domino").split(/\s+/).map(v=>v==="-"?-1:+v);
  nahrad(el, `<span class="${triedy(el,"domino")}"${styl(el)}>${kocka(a,0,el.dataset.k||"m")}${kocka(b,0,el.dataset.k||"m")}</span>`);
});

/* obťahovanie */
document.querySelectorAll("i[obtiahni]").forEach(el=>{
  const w = +(el.getAttribute("w")||64);
  nahrad(el, `<svg class="${triedy(el,"obtiahni")}" viewBox="0 0 ${w} 100" style="width:${(w/64*22).toFixed(1)}mm"><text x="2" y="92">${el.getAttribute("obtiahni")}</text></svg>`);
});

/* číselná os */
document.querySelectorAll("i[os]").forEach(el=>{
  const [a,b] = el.getAttribute("os").split(/\s+/).map(Number);
  const skry = (el.getAttribute("skry")||"").split(/\s+/).filter(Boolean).map(Number);
  const W = 1000, pad = 30, k = (W-2*pad)/(b-a);
  let s = `<line x1="${pad-15}" y1="20" x2="${W-pad+22}" y2="20"/><path d="M${W-pad+14} 13 L${W-pad+24} 20 L${W-pad+14} 27"/>`;
  for(let i=a;i<=b;i++){ const x = pad+(i-a)*k;
    s += `<line x1="${x}" y1="11" x2="${x}" y2="29"/>`;
    s += skry.includes(i) ? `<rect x="${x-14}" y="36" width="28" height="30" rx="5"/>` : `<text x="${x}" y="58">${i}</text>`; }
  nahrad(el, `<svg class="${triedy(el,"os")}" viewBox="0 0 ${W} 70" style="fill:none;stroke:#111;stroke-width:3;stroke-linecap:round;stroke-linejoin:round;${el.getAttribute("style")||""}">${s}</svg>`);
});
})();
