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
     <i obtiahni="6"></i>  <i obtiahni="M" w="96"></i> číslo (bodkovaná stopa)/písmeno (sivé) na obťahovanie
     <i os="0 10" skry="3 7"></i>                     číselná os (skry = čísla, ktoré dieťa dopíše)
     <i veza="3 2"></i>  <i veza="4" n="6"></i>         veža z kociek ako v Hre s kockami (zdola: 3 sivé, 2 šrafované,
                                                      zvyšok prázdny; n = počet políčok, inak 10; po 5 medzera; class="lezi" naležato)
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

/* obťahovanie
   Číslice a znaky + − = sa kreslia ako JEDNA bodkovaná čiara v strede ťahu (nie obrys), aby dieťa vedelo,
   že má ísť po čiare. Čierna bodka = začiatok, tenká šípka = smer, malé číslo = poradie ťahu.
   Tvary číslic sú školské (z pracovného zošita MAT), vyrobené z /mnt/project-files/pisane_pismo/pismo.py
   (tahy_cislic, sipky_cislic): [šírka, [ťahy ako SVG path], [šípky]], výška 155, y hore záporné.
   Písmená (tlačené) sú plné svetlosivé: dieťa píše priamo po sivom písmene. */
const CISLICE = {"0":[106,["M77.8 -155.5 C56.1 -154.5 27.4 -118.8 13.7 -75.7 C0.0 -32.6 6.5 1.5 28.2 0.5 C49.9 -0.5 78.6 -36.2 92.3 -79.3 C106.0 -122.4 99.5 -156.5 77.8 -155.5"],["M46 -175 L26 -158 L11 -138 L2 -123 L-6 -108 M4 -115 L-6 -108 L-7 -120"]],"1":[45,["M0.7 -107.8 C9.2 -115.7 14.7 -120.9 22.3 -129.8 C34.1 -143.5 32.3 -145.4 45.2 -154.5","M45.2 -154.5 C30.2 -103.0 15.1 -51.5 0.0 -0.0"],["M-16 -133 L-8 -141 L0 -150 L5 -156 L12 -166 M1 -161 L12 -166 L10 -153","M72 -138 L67 -121 L61 -103 L58 -90 L54 -77 M63 -85 L54 -77 L51 -89"]],"2":[91,["M26.0 -131.3 C36.0 -147.8 46.6 -156.2 65.3 -154.9 C82.2 -153.7 90.9 -139.9 86.8 -122.9 C82.4 -104.7 59.6 -81.7 44.7 -66.4 C22.0 -43.0 7.4 -29.2 0.0 -0.0","M0.0 -0.0 C22.0 -0.0 44.0 -0.0 66.0 -0.0"],["M1 -147 L9 -159 L22 -172 L36 -180 L51 -184 M39 -188 L51 -184 L41 -176","M3 -30 L12 -30 L20 -30 L27 -30 L33 -30 M22 -36 L33 -30 L22 -24"]],"3":[79,["M35.9 -137.1 C42.2 -147.5 48.5 -156.8 62.7 -154.7 C76.9 -152.6 79.5 -136.1 74.5 -122.7 C70.8 -112.6 63.1 -106.8 54.7 -98.4","M54.7 -98.4 C73.1 -90.1 78.3 -74.7 71.3 -51.3 C65.5 -31.4 45.4 -1.5 21.8 -0.0 C6.5 0.8 3.1 -10.4 0.0 -20.8"],["M10 -153 L17 -163 L29 -175 L45 -183 L60 -185 M48 -190 L60 -185 L49 -178","M102 -85 L104 -66 L102 -48 L98 -37 L94 -26 M104 -34 L94 -26 L93 -39"]],"4":[84,["M56.6 -155.0 C37.7 -119.7 18.9 -84.3 0.0 -49.0","M0.0 -49.0 C28.2 -49.0 56.3 -49.0 84.5 -49.0","M64.9 -95.0 C55.2 -63.3 45.4 -31.7 35.7 -0.0"],["M28 -165 L21 -152 L15 -140 L10 -131 L5 -121 M15 -128 L5 -121 L5 -134","M0 -19 L9 -19 L18 -19 L25 -19 L32 -19 M21 -25 L32 -19 L21 -13","M92 -82 L89 -73 L86 -63 L84 -55 L82 -48 M91 -57 L82 -48 L79 -60"]],"5":[93,["M42.6 -154.5 C36.4 -133.5 30.1 -112.5 23.9 -91.5","M23.9 -91.5 C32.6 -97.7 41.5 -104.1 52.9 -103.3 C73.8 -101.9 76.0 -76.7 72.2 -58.3 C67.2 -35.2 44.9 0.4 17.8 -0.0 C9.2 -0.1 5.0 -4.4 0.0 -8.7","M42.6 -154.5 C59.5 -154.5 76.4 -154.5 93.4 -154.5"],["M8 -144 L5 -133 L2 -123 L-1 -114 L-3 -106 M6 -115 L-3 -106 L-6 -119","M39 -132 L65 -132 L92 -113 L101 -94 L104 -79 M108 -91 L104 -79 L96 -89","M50 -184 L59 -184 L68 -184 L74 -184 L81 -184 M70 -190 L81 -184 L70 -178"]],"6":[102,["M102.2 -155.0 C87.6 -153.2 81.3 -151.7 67.2 -141.4 C39.3 -120.9 27.0 -90.0 16.8 -62.0 C11.0 -46.0 0.0 -0.1 35.0 -0.1 C57.2 -2.2 75.6 -30.6 81.0 -49.0 C86.9 -69.1 85.6 -98.0 62.6 -98.4 C48.2 -98.7 38.9 -88.1 26.5 -78.5"],["M89 -183 L65 -176 L47 -164 L35 -153 L25 -142 M36 -146 L25 -142 L27 -154"]],"7":[75,["M14.4 -155.0 C34.7 -154.9 55.0 -154.9 75.3 -154.8","M75.3 -154.8 C73.2 -144.0 47.6 -91.3 41.3 -80.5 C29.1 -59.3 12.0 -24.4 0.0 -0.0","M16.0 -77.0 C31.7 -77.0 47.4 -77.0 63.0 -77.0"],["M15 -185 L24 -185 L34 -185 L41 -185 L48 -185 M37 -191 L48 -185 L37 -179","M100 -134 L94 -120 L88 -107 L84 -97 L79 -88 M89 -95 L79 -88 L78 -100","M16 -107 L22 -107 L28 -107 L33 -107 L37 -107 M26 -113 L37 -107 L26 -101"]],"8":[91,["M75.3 -157.5 C70.8 -157.5 70.5 -157.8 65.9 -154.5 C56.7 -147.8 52.2 -145.8 49.2 -132.9 C46.3 -120.0 51.1 -107.1 56.1 -97.7 C63.9 -82.5 72.6 -68.6 70.2 -48.0 C68.0 -27.9 53.1 -0.5 27.8 -0.0 C5.8 0.4 0.0 -26.2 5.3 -45.3 C12.5 -71.7 32.2 -84.6 55.8 -97.3 C70.8 -105.3 84.9 -115.2 88.7 -131.7 C91.5 -143.4 88.2 -147.5 82.4 -154.0 C79.5 -157.2 79.8 -157.5 75.3 -157.5"],["M75 -187 L51 -181 L43 -175 L35 -168 L26 -157 M38 -163 L26 -157 L28 -170","M87 -103 L93 -91 L98 -76 L100 -63 L101 -51 M107 -62 L101 -51 L95 -62","M-17 -71 L-7 -86 L5 -100 L15 -108 L25 -114 M12 -113 L25 -114 L19 -103"]],"9":[71,["M69.9 -154.8 C43.7 -154.2 18.5 -142.9 6.9 -114.3 C1.0 -99.8 0.0 -79.4 16.5 -77.4 C29.8 -75.7 47.5 -84.0 53.0 -95.7 C59.1 -115.5 65.2 -135.2 71.3 -155.0 C55.3 -103.3 39.4 -51.7 23.4 -0.0"],["M69 -185 L60 -184 L51 -183 L45 -182 L38 -180 M50 -177 L38 -180 L47 -189","M-26 -88 L-5 -54 L30 -48 L49 -54 L65 -64 M53 -62 L65 -64 L60 -53","M94 -126 L88 -107 L82 -87 L77 -73 L73 -58 M82 -67 L73 -58 L70 -71"]]};
const ZNAKY = {"+":[70,["M0 -77 L70 -77","M35 -112 L35 -42"],[]], "−":[70,["M0 -77 L70 -77"],[]], "-":[70,["M0 -77 L70 -77"],[]],
  "=":[70,["M0 -95 L70 -95","M0 -59 L70 -59"],[]]};
const START = d => d.match(/^M\s*(-?[\d.]+)[ ,](-?[\d.]+)/).slice(1).map(Number);
function stopa(znak, w){
  const z = CISLICE[znak] || ZNAKY[znak];
  if(!z) return null;
  const [sir, tahy, sipky] = z, k = 0.5, ox = (w - sir*k)/2, sw = v => (v/k).toFixed(1);
  let g = tahy.map(d=>`<path class="stopa" d="${d}" style="stroke-width:${sw(3.4)};stroke-dasharray:0.1 ${sw(5.2)}"/>`).join("");
  g += sipky.map(d=>`<path class="smer" d="${d}" style="stroke-width:${sw(1.1)}"/>`).join("");
  const zac = tahy.map(START);
  g += zac.map(([x,y],i)=>{
    /* dva ťahy z toho istého bodu (napr. 5): druhé číslo ide nad bodku, nech sa neprekrývajú */
    const znova = zac.slice(0,i).some(([a,b])=>Math.hypot(a-x,b-y)<8);
    const [tx,ty] = znova ? [x+6, y-20] : [x-14, y-8];
    return `<circle class="start" cx="${x}" cy="${y}" r="${sw(3.2)}"/>` + (tahy.length>1 ?
      `<text class="poradie" x="${tx}" y="${ty}" style="font-size:${sw(9)}px">${i+1}</text>` : ""); }).join("");
  return `<g transform="translate(${ox.toFixed(1)} 92) scale(${k})">${g}</g>`;
}
document.querySelectorAll("i[obtiahni]").forEach(el=>{
  const w = +(el.getAttribute("w")||64), t = el.getAttribute("obtiahni");
  const svg = (t.length==1 && stopa(t, w)) || `<text class="plne-sive" x="2" y="92">${t}</text>`;
  nahrad(el, `<svg class="${triedy(el,"obtiahni")}" viewBox="0 0 ${w} 100" style="width:${(w/64*22).toFixed(1)}mm">${svg}</svg>`);
});

/* veža z kociek (rovnaký model ako Hra s kockami: rámik na 10, plní sa zdola) */
document.querySelectorAll("i[veza]").forEach(el=>{
  const [a,b] = (el.getAttribute("veza")+" 0").split(/\s+/).map(v=>+v||0);
  const n = +(el.getAttribute("n")||10);
  let s = ""; for(let i=1;i<=n;i++) s += `<i class="${i<=a?"a":i<=a+b?"b":""}${i==5&&n>5?" pat":""}"></i>`;
  nahrad(el, `<span class="${triedy(el,"kveza")}"${styl(el)}>${s}</span>`);
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
