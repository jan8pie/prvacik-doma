/* =====================================================================
   KRESBY – vlastné obrázky webu v jednom štýle (namiesto emoji, ktoré na každom
   zariadení vyzerajú inak). Používa ich obrázkový slovník (slovnik.js) aj karty (index.html).

   Štýl: plátno 100 × 100, mäkké okrúhle tvary, plné farby, obrys v tmavšom odtieni tej istej
   farby (hrúbka 3), jeden svetlý odlesk, pod vecou mäkký tieň. Tváre: bodkové oči s odleskom,
   malý úsmev, ružové líčka. Farby sú tie isté ako farby v lekcii Farby.

   KRESBY.svg("horse")      → <svg…> podľa mena kresby (v slovníku = anglické slovo)
   KRESBY.zEmoji("🐴")      → <svg…> podľa emoji, alebo "" ak kresbu nemáme (ostane emoji)
   KRESBY.vymen(prvok)      → v texte prvku vymení známe emoji za kresby (karty)

   Nová kresba: pridaj ju do K pod anglickým menom a do EMOJI zapíš, ktoré emoji nahrádza.
   ===================================================================== */
window.KRESBY = (() => {
const INK = "#1C2633", KOZA = "#F6C9A0", KOZA_O = "#C0794A";
const T = (cx,cy,rx) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="4" fill="#000" opacity=".12"/>`;
const OKO = (x,y,r=2.6) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${INK}"/><circle cx="${x+r*.35}" cy="${y-r*.35}" r="${r*.36}" fill="#fff"/>`;
const OCI = (x1,x2,y,r) => OKO(x1,y,r) + OKO(x2,y,r);
const LICKA = (x1,x2,y,r=3.4) => `<g fill="#F2718F" opacity=".5"><circle cx="${x1}" cy="${y}" r="${r}"/><circle cx="${x2}" cy="${y}" r="${r}"/></g>`;
const USMEV = (x,y,w=5,h=4.5) => `<path d="M${x-w} ${y} Q${x} ${y+h} ${x+w} ${y}" fill="none" stroke="${INK}" stroke-width="2"/>`;
/* U = viac tvarov zlúčených do jedného obrysu (najprv s obrysom, potom len výplň navrch) */
const U = (tvary, f, s, w=3) => `<g fill="${f}" stroke="${s}" stroke-width="${w}">${tvary}</g><g fill="${f}">${tvary}</g>`;
const LESK = (d, w=3, o=.5) => `<path d="${d}" fill="none" stroke="#fff" stroke-width="${w}" opacity="${o}"/>`;

/* ---------- ruka (dlaň s prstami) ---------- */
const RUKA = `<g fill="${KOZA}" stroke="${KOZA_O}" stroke-width="3">
  <rect x="15" y="46" width="12" height="30" rx="6" transform="rotate(-40 27 72)"/>
  <rect x="29" y="26" width="10.5" height="36" rx="5.2"/><rect x="40.5" y="17" width="10.5" height="44" rx="5.2"/>
  <rect x="52" y="20" width="10.5" height="42" rx="5.2"/><rect x="63.5" y="29" width="10" height="34" rx="5"/>
  <path d="M29 52 H73.5 V68 C73.5 82 64 90 51 90 C38 90 29 82 29 68Z"/></g>
  <path d="M30.5 49 H72 V64 H30.5Z" fill="${KOZA}"/><path d="M38 76 Q50 83 62 74" fill="none" stroke="${KOZA_O}" stroke-width="2" opacity=".6"/>`;

/* ---------- hlava človeka: stred x,y, polomer r; vlasy: kratke | dlhe | mama | otec | babka | dedko | ziadne ---------- */
function HLAVA(x, y, r, vlasy="kratke", fv="#6B4423", extra=""){
  const zad = {
    dlhe:`<path d="M-17 0 C-21 -24 21 -24 17 0 L20 22 C15 27 9 24 8 19 L-8 19 C-9 24 -15 27 -20 22Z" fill="${fv}"/>`,
    mama:`<path d="M-17.5 0 C-21 -24 21 -24 17.5 0 L19 13 C17 19 11 19 9 15 L-9 15 C-11 19 -17 19 -19 13Z" fill="${fv}"/>`,
    babka:`<circle cx="0" cy="-19" r="7.5" fill="${fv}"/>`,
  }[vlasy] || "";
  const pred = {
    kratke:`<path d="M-16.6 -1 C-18 -21 18 -21 16.6 -1 C11 -9 -5 -11 -16.6 -1Z" fill="${fv}"/>`,
    otec:`<path d="M-16.6 -2 C-18 -21 18 -21 16.6 -2 C12 -10 -2 -8 -8 -12 C-11 -8 -14 -5 -16.6 -2Z" fill="${fv}"/>`,
    dlhe:`<path d="M-16.6 0 C-18 -21 18 -21 16.6 0 C12 -8 4 -11 -3 -11 C-8 -8 -13 -5 -16.6 0Z" fill="${fv}"/>
          <g fill="#E0322B" stroke="#9E1F1A" stroke-width="1.2"><path d="M9 -15 L2 -20 L3 -11Z M9 -15 L16 -20 L15 -11Z"/><circle cx="9" cy="-15" r="2.4"/></g>`,
    mama:`<path d="M-16.6 0 C-18 -21 18 -21 16.6 0 C13 -9 6 -12 0 -12 C-7 -11 -13 -6 -16.6 0Z" fill="${fv}"/>`,
    babka:`<path d="M-16.6 -1 C-18 -21 18 -21 16.6 -1 C12 -10 5 -12 0 -12 C-5 -12 -12 -10 -16.6 -1Z" fill="${fv}"/>`,
    dedko:`<path d="M-16.4 -3 C-19 -9 -17 -14 -13 -15 C-13 -10 -14 -6 -16.4 -3Z M16.4 -3 C19 -9 17 -14 13 -15 C13 -10 14 -6 16.4 -3Z" fill="${fv}"/>
           <path d="M-8 8 C-5 5 -2 6 0 8 C2 6 5 5 8 8 C5 11 2 10 0 9 C-2 10 -5 11 -8 8Z" fill="${fv}"/>`,
  }[vlasy] || "";
  const okuliare = (vlasy==="babka"||vlasy==="dedko") ? `<g fill="#fff" fill-opacity=".35" stroke="#55606E" stroke-width="1.3"><circle cx="-6.5" cy="1" r="4.6"/><circle cx="6.5" cy="1" r="4.6"/><path d="M-1.9 1 H1.9" fill="none"/></g>` : "";
  const usta = vlasy==="dedko" ? `<path d="M-3 12.5 Q0 14.5 3 12.5" fill="none" stroke="${INK}" stroke-width="1.6"/>` : `<path d="M-5 7.5 Q0 12.5 5 7.5" fill="none" stroke="${INK}" stroke-width="1.8"/>`;
  return `<g transform="translate(${x} ${y}) scale(${r/16})">${zad}
    <circle r="16" fill="${KOZA}" stroke="${KOZA_O}" stroke-width="2.4"/>${pred}
    <circle cx="-6.5" cy="1" r="2.1" fill="${INK}"/><circle cx="6.5" cy="1" r="2.1" fill="${INK}"/><circle cx="-5.8" cy=".2" r=".7" fill="#fff"/><circle cx="7.2" cy=".2" r=".7" fill="#fff"/>
    <g fill="#F2718F" opacity=".45"><circle cx="-10.5" cy="6.5" r="2.8"/><circle cx="10.5" cy="6.5" r="2.8"/></g>${usta}${okuliare}${extra}</g>`;
}
/* ---------- plecia (portrét po hruď) ---------- */
const PLECIA = (f, s, extra="") => `<path d="M24 97 C24 76 36 68 50 68 C64 68 76 76 76 97Z" fill="${f}" stroke="${s}" stroke-width="3"/><path d="M44 66 h12 v6 a6 6 0 0 1 -12 0Z" fill="${KOZA}"/>${extra}`;
const PORTRET = (vlasy, fv, f, s, extra="", hextra="") => PLECIA(f, s, extra) + HLAVA(50, 42, 24, vlasy, fv, hextra);

/* ---------- postavička v pohybe: h = hlava [x,y], t = trup [krk x,y, boky x,y],
   ruky a nohy = lomené čiary "x y x y x y" (plece → lakeť → dlaň, bok → koleno → chodidlo) ---------- */
function FIG({h, t, ruky=[], nohy=[], tricko="#E0322B", gate="#2F6FDE", vlasy="#6B4423", pred="", za="", topanky=true}){
  const ciara = (p, f, w) => `<polyline points="${p}" fill="none" stroke="${f}" stroke-width="${w}"/>`;
  const koniec = p => p.trim().split(/\s+/).slice(-2);
  return `${za}${nohy.map(p => ciara(p, gate, 7.5)).join("")}
    ${topanky ? nohy.map(p => { const [x,y] = koniec(p); return `<ellipse cx="${+x+2}" cy="${+y+1.5}" rx="5.5" ry="3.4" fill="#3A4656"/>`; }).join("") : ""}
    ${ruky.slice(1).map(p => ciara(p, "#E9B48A", 6)).join("")}
    <path d="M${t[0]} ${t[1]} L${t[2]} ${t[3]}" stroke="${tricko}" stroke-width="19" fill="none"/>
    ${ruky.slice(0,1).map(p => ciara(p, "#E9B48A", 6)).join("")}
    <circle cx="${h[0]}" cy="${h[1]}" r="10" fill="#E9B48A"/>
    <path d="M${h[0]-10} ${h[1]-1} C${h[0]-10} ${h[1]-13} ${h[0]+10} ${h[1]-13} ${h[0]+10} ${h[1]-1} C${h[0]+5} ${h[1]-6} ${h[0]-4} ${h[1]-6} ${h[0]-10} ${h[1]-1}Z" fill="${vlasy}"/>
    <circle cx="${h[0]-3.6}" cy="${h[1]+1}" r="1.4" fill="${INK}"/><circle cx="${h[0]+3.6}" cy="${h[1]+1}" r="1.4" fill="${INK}"/>
    <path d="M${h[0]-3.5} ${h[1]+4.5} Q${h[0]} ${h[1]+7.5} ${h[0]+3.5} ${h[1]+4.5}" stroke="${INK}" stroke-width="1.5" fill="none"/>${pred}`;
}
const LOPTA = (x,y,r) => `<g transform="translate(${x} ${y}) scale(${r/10})"><circle r="10" fill="#fff" stroke="${INK}" stroke-width="1.6"/>
  <path d="M0 -4 L3.8 -1.2 L2.4 3.2 L-2.4 3.2 L-3.8 -1.2Z" fill="${INK}"/><path d="M0 -4 V-9.5 M3.8 -1.2 L9 -3 M2.4 3.2 L5.6 8 M-2.4 3.2 L-5.6 8 M-3.8 -1.2 L-9 -3" stroke="${INK}" stroke-width="1.3" fill="none"/></g>`;

/* ---------- štvornohé zviera z boku (hlava vpravo): spoločné telo a nohy ---------- */
function NOHY(xs, y1, f, s, kop, w=8, y2=89){
  return xs.map((x,i) => `<rect x="${x}" y="${y1}" width="${w}" height="${y2-y1}" rx="3" fill="${f}" stroke="${s}" stroke-width="2.5"/>
    ${i%2===0 ? `<rect x="${x}" y="${y1}" width="${w}" height="${y2-y1}" rx="3" fill="#000" opacity=".13"/>` : ""}
    <rect x="${x-.6}" y="${y2-6}" width="${w+1.2}" height="6.6" rx="2.4" fill="${kop}"/>`).join("");
}

const K = {};
/* =================== ÚVOD: pozdravy a počasie =================== */
K.hello = `<g transform="rotate(12 50 60)">${RUKA}</g><path d="M80 22 Q89 30 88 42 M86 12 Q98 24 96 42 M16 20 Q8 28 9 38" fill="none" stroke="#F28B24" stroke-width="3.2"/>`;
K.door = `${T(50,93,30)}<rect x="24" y="8" width="52" height="84" rx="4" fill="#B5713A" stroke="#6E4520" stroke-width="3"/>
  <rect x="31" y="16" width="38" height="28" rx="3" fill="#D99A5B" stroke="#8B5A2B" stroke-width="2"/><rect x="31" y="52" width="38" height="32" rx="3" fill="#D99A5B" stroke="#8B5A2B" stroke-width="2"/>
  <circle cx="66" cy="49" r="4" fill="#F6CB2F" stroke="#9A7A10" stroke-width="2"/>`;
K.goodbye = `${T(64,93,26)}<rect x="44" y="8" width="46" height="84" rx="4" fill="#3A4656"/><path d="M44 8 L74 15 V96 L44 92Z" fill="#B5713A" stroke="#6E4520" stroke-width="3"/>
  <circle cx="68" cy="56" r="3.4" fill="#F6CB2F" stroke="#9A7A10" stroke-width="1.6"/>
  <g transform="translate(-6 30) scale(.62) rotate(-10 50 60)">${RUKA}</g><path d="M8 40 Q3 47 5 55 M40 34 Q46 38 47 45" fill="none" stroke="#F28B24" stroke-width="3"/>`;
K.good_morning = `<rect x="6" y="14" width="88" height="72" rx="12" fill="#BFE3FA"/><circle cx="50" cy="54" r="22" fill="#F6CB2F" stroke="#E09A1A" stroke-width="3"/>
  <path d="M50 26 V19 M27 32 L22 27 M73 32 L78 27 M20 52 H13 M80 52 H87" stroke="#F28B24" stroke-width="4" fill="none"/>
  ${OCI(43,57,48,2.4)}${USMEV(50,52,5)}${LICKA(38,62,54,3)}
  <path d="M6 66 C22 56 36 70 52 64 C68 58 80 68 94 62 V74 a12 12 0 0 1 -12 12 H18 a12 12 0 0 1 -12 -12Z" fill="#3AA655" stroke="#27703A" stroke-width="3"/>`;
K.moon = `<path d="M62 12 C40 14 26 32 28 54 C30 76 50 90 72 86 C56 80 46 66 46 48 C46 32 52 20 62 12Z" fill="#F6CB2F" stroke="#C99A12" stroke-width="3"/>
  <g fill="#F6CB2F" stroke="#C99A12" stroke-width="1.6"><path d="M76 24 l2.6 6 6 2.6 -6 2.6 -2.6 6 -2.6 -6 -6 -2.6 6 -2.6Z"/><path d="M86 52 l1.8 4 4 1.8 -4 1.8 -1.8 4 -1.8 -4 -4 -1.8 4 -1.8Z"/></g>`;
K.good_night = `<rect x="5" y="8" width="90" height="84" rx="14" fill="#2B3A67"/>
  <path d="M40 16 C28 18 21 28 22 39 C23 50 33 57 44 55 C36 52 31 45 31 36 C31 28 34 21 40 16Z" fill="#F6CB2F"/>
  <g fill="#FCE9A0"><path d="M66 18 l1.8 4 4 1.8 -4 1.8 -1.8 4 -1.8 -4 -4 -1.8 4 -1.8Z"/><circle cx="82" cy="36" r="1.8"/><circle cx="54" cy="34" r="1.5"/><circle cx="16" cy="22" r="1.5"/></g>
  <rect x="12" y="60" width="76" height="24" rx="8" fill="#4F8FE8" stroke="#24508F" stroke-width="3"/><rect x="16" y="54" width="30" height="14" rx="7" fill="#fff" stroke="#B9C2CD" stroke-width="2"/>
  <circle cx="34" cy="60" r="11" fill="${KOZA}" stroke="${KOZA_O}" stroke-width="2"/><path d="M23.5 58 C24 46 44 46 44.5 58 C40 53 30 52 23.5 58Z" fill="#6B4423"/>
  <path d="M28 61 q2.5 2 5 0 M36 61 q2.5 2 5 0" stroke="${INK}" stroke-width="1.5" fill="none"/>
  <path d="M40 66 H88 V76 a8 8 0 0 1 -8 8 H20 a8 8 0 0 1 -8 -8 V72 C22 72 34 72 40 66Z" fill="#7FB1F2"/>
  <path d="M60 44 h8 l-8 9 h8 M74 30 h6 l-6 7 h6" stroke="#fff" stroke-width="2.4" fill="none"/>`;
K.present = `${T(50,92,32)}<rect x="18" y="44" width="64" height="46" rx="5" fill="#E0322B" stroke="#9E1F1A" stroke-width="3"/><rect x="13" y="32" width="74" height="16" rx="5" fill="#EE4B44" stroke="#9E1F1A" stroke-width="3"/>
  <rect x="44" y="32" width="12" height="58" fill="#F6CB2F"/><path d="M44 33.5 V88.5 M56 33.5 V88.5" stroke="#C99A12" stroke-width="1.6"/>
  <path d="M50 31 C40 14 22 18 30 28 C34 32 44 32 50 31Z M50 31 C60 14 78 18 70 28 C66 32 56 32 50 31Z" fill="#F6CB2F" stroke="#C99A12" stroke-width="3"/>${LESK("M24 52 V70",3,.35)}`;
K.thank_you = `<g transform="translate(-4 14) scale(.8)">${K.present}</g>
  <path d="M76 12 C70 4 60 9 62 17 C63 24 71 28 76 32 C81 28 89 24 90 17 C92 9 82 4 76 12Z" fill="#F27DB3" stroke="#B8437A" stroke-width="2.6"/>
  <path d="M90 44 l1.8 4 4 1.8 -4 1.8 -1.8 4 -1.8 -4 -4 -1.8 4 -1.800Z" fill="#F6CB2F"/>`;
K.sun = `<g stroke="#F28B24" stroke-width="6" fill="none"><path d="M50 6 V16 M50 84 V94 M6 50 H16 M84 50 H94 M19 19 L26 26 M74 74 L81 81 M81 19 L74 26 M19 81 L26 74"/></g>
  <circle cx="50" cy="50" r="27" fill="#F6CB2F" stroke="#E09A1A" stroke-width="3"/>${OCI(41,59,47,3)}${USMEV(50,54,7,6)}${LICKA(34,66,55,4)}`;
const OBLAK = (f="#fff", s="#9FB3C8") => U(`<circle cx="30" cy="56" r="17"/><circle cx="50" cy="42" r="22"/><circle cx="72" cy="54" r="18"/><rect x="28" y="52" width="46" height="21" rx="6"/>`, f, s);
K.cloud = `<g transform="translate(0 6)">${OBLAK()}${LESK("M36 34 Q44 26 54 27",3.5,.9)}</g>`;
K.rain = `<g transform="translate(0 -14)">${OBLAK("#C9D5E2","#7D8FA3")}</g>
  <g fill="#4FA3E8" stroke="#2F6FDE" stroke-width="1.6"><path id="kv" d="M28 68 C28 68 22 76 22 80 a6 6 0 0 0 12 0 C34 76 28 68 28 68Z"/><path d="M50 74 C50 74 44 82 44 86 a6 6 0 0 0 12 0 C56 82 50 74 50 74Z"/><path d="M72 68 C72 68 66 76 66 80 a6 6 0 0 0 12 0 C78 76 72 68 72 68Z"/></g>`;
K.umbrella = `<path d="M50 44 V80 a8 8 0 0 0 16 0" fill="none" stroke="#6E4520" stroke-width="5"/><path d="M50 8 V14" stroke="#6E4520" stroke-width="4"/>
  <path d="M8 50 C8 26 28 12 50 12 C72 12 92 26 92 50 C85 43 78 43 71 50 C64 43 57 43 50 50 C43 43 36 43 29 50 C22 43 15 43 8 50Z" fill="#E0322B" stroke="#9E1F1A" stroke-width="3"/>
  <path d="M50 12 C40 22 31 36 29 50 M50 12 C60 22 69 36 71 50" fill="none" stroke="#9E1F1A" stroke-width="2"/>${LESK("M20 32 Q28 22 38 18",3,.45)}`;
K.rainbow = `<g fill="none" stroke-width="5.7">${["#E0322B","#F28B24","#F6CB2F","#3AA655","#4FA3E8","#2F6FDE","#8A4FC4"].map((c,i)=>{const r=41-i*5.5;return `<path d="M${50-r} 80 A${r} ${r} 0 0 1 ${50+r} 80" stroke="${c}"/>`;}).join("")}</g>
  <g transform="translate(-5 60) scale(.3)">${OBLAK()}</g><g transform="translate(74 60) scale(.3)">${OBLAK()}</g>`;
K.snow = `<g stroke="#4FA3E8" stroke-width="5.5" fill="none"><path d="M50 8 V92 M13.6 29 L86.4 71 M13.6 71 L86.4 29"/>
  <path d="M40 16 L50 25 L60 16 M40 84 L50 75 L60 84 M15.5 44 L28.5 37.5 L26 23 M84.5 56 L71.5 62.5 L74 77 M15.5 56 L28.5 62.5 L26 77 M84.5 44 L71.5 37.5 L74 23" stroke-width="4.5"/></g><circle cx="50" cy="50" r="7" fill="#BFE3FA" stroke="#4FA3E8" stroke-width="3"/>`;
K.hot = `<g stroke="#F28B24" stroke-width="5" fill="none"><path d="M78 6 V12 M94 22 H88 M90 10 L86 14"/></g><circle cx="78" cy="22" r="9" fill="#F6CB2F" stroke="#E09A1A" stroke-width="2.4"/>
  <circle cx="46" cy="56" r="34" fill="#F5A08A" stroke="#C0533A" stroke-width="3"/>
  <path d="M30 50 q5 -4 10 0 M52 50 q5 -4 10 0" stroke="${INK}" stroke-width="2.6" fill="none"/>
  <ellipse cx="46" cy="70" rx="8" ry="6" fill="#8A2A2A"/><path d="M40 72 a6 5 0 0 0 12 0Z" fill="#F27DB3"/>${LICKA(26,66,62,5)}
  <g fill="#4FA3E8" stroke="#2F6FDE" stroke-width="1.4"><path d="M18 30 C18 30 13 37 13 40.5 a5 5 0 0 0 10 0 C23 37 18 30 18 30Z"/><path d="M74 44 C74 44 70 50 70 53 a4 4 0 0 0 8 0 C78 50 74 44 74 44Z"/></g>`;
K.cold = `<circle cx="50" cy="60" r="32" fill="#BFE0FA" stroke="#5C93CC" stroke-width="3"/>
  <path d="M18 50 C16 26 34 12 50 12 C66 12 84 26 82 50 C70 44 30 44 18 50Z" fill="#E0322B" stroke="#9E1F1A" stroke-width="3"/><rect x="14" y="42" width="72" height="12" rx="6" fill="#fff" stroke="#B9C2CD" stroke-width="2.4"/><circle cx="50" cy="10" r="7" fill="#fff" stroke="#B9C2CD" stroke-width="2.4"/>
  ${OCI(39,61,63,3)}<path d="M38 78 l4 -4 4 4 4 -4 4 4 4 -4 4 4" fill="none" stroke="${INK}" stroke-width="2.4"/>
  <g stroke="#5C93CC" stroke-width="2.4" fill="none"><path d="M6 66 q-3 4 0 8 M94 66 q3 4 0 8 M10 82 q-3 3 0 6 M90 82 q3 3 0 6"/></g>`;
K.wind = `<g fill="none" stroke="#7FA8CF" stroke-width="6"><path d="M8 36 H58 a11 11 0 1 0 -11 -11"/><path d="M8 54 H78 a11 11 0 1 1 -11 11"/><path d="M20 72 H46 a8 8 0 1 1 -8 8"/></g>
  <path d="M80 30 C88 26 94 32 90 40 C86 38 82 36 80 30Z" fill="#F28B24" stroke="#B85F12" stroke-width="2"/><path d="M12 84 C18 80 24 84 22 91 C18 90 14 89 12 84Z" fill="#3AA655" stroke="#27703A" stroke-width="2"/>`;

/* =================== LEKCIA 1: školské veci =================== */
K.pencil = `${T(50,88,30)}<g transform="rotate(-40 50 50)"><path d="M12 50 L28 40 V60Z" fill="#F2D6B0" stroke="#9A7A10" stroke-width="3"/><path d="M12 50 L18.5 46 V54Z" fill="#3A4656"/>
  <rect x="28" y="40" width="46" height="20" fill="#F6CB2F" stroke="#9A7A10" stroke-width="3"/><path d="M28 46.7 H74 M28 53.3 H74" stroke="#C99A12" stroke-width="1.5"/>
  <rect x="74" y="40" width="7" height="20" fill="#B9C2CD" stroke="#6B7785" stroke-width="3"/><path d="M81 40 h6 a5 5 0 0 1 5 5 v10 a5 5 0 0 1 -5 5 h-6Z" fill="#F27DB3" stroke="#8B3A63" stroke-width="3"/></g>`;
K.pen = `${T(50,88,30)}<g transform="rotate(-40 50 50)"><path d="M10 50 L26 43 V57Z" fill="#B9C2CD" stroke="#55606E" stroke-width="3"/><path d="M10 50 l6 -2.6 v5.200Z" fill="${INK}"/>
  <rect x="26" y="42" width="52" height="16" rx="2" fill="#2F6FDE" stroke="#1E4AA0" stroke-width="3"/><rect x="26" y="42" width="12" height="16" fill="#1E4AA0"/>
  <path d="M78 42 h8 a4 4 0 0 1 4 4 v8 a4 4 0 0 1 -4 4 h-8Z" fill="#2F6FDE" stroke="#1E4AA0" stroke-width="3"/><path d="M52 39 H84" stroke="#B9C2CD" stroke-width="4"/>${LESK("M42 47 H72",2.4,.45)}</g>`;
const KNIHA = (f, s, extra="") => `${T(50,91,30)}<path d="M22 14 H74 a6 6 0 0 1 6 6 V86 H24 a6 6 0 0 1 0 -12 H80" fill="#fff" stroke="${s}" stroke-width="3"/>
  <path d="M26 10 H76 a4 4 0 0 1 4 4 V74 H24 a6 6 0 0 0 -6 6 V18 a8 8 0 0 1 8 -8Z" fill="${f}" stroke="${s}" stroke-width="3"/><path d="M28 11 V74" stroke="${s}" stroke-width="2"/><path d="M26 80 H78" stroke="#B9C2CD" stroke-width="2"/>${extra}`;
K.book = KNIHA("#E0322B", "#9E1F1A", `<rect x="38" y="24" width="32" height="20" rx="3" fill="#F6CB2F" stroke="#9E1F1A" stroke-width="2"/><path d="M44 31 H64 M44 37 H58" stroke="#9E1F1A" stroke-width="2"/>`);
K.notebook = `${T(50,92,30)}<rect x="20" y="10" width="62" height="80" rx="5" fill="#3AA655" stroke="#27703A" stroke-width="3"/><rect x="34" y="24" width="38" height="20" rx="3" fill="#fff" stroke="#27703A" stroke-width="2"/>
  <path d="M40 31 H66 M40 37 H58" stroke="#9FB3C8" stroke-width="2"/><g fill="#fff" stroke="#55606E" stroke-width="2">${[18,30,42,54,66,78].map(y=>`<rect x="14" y="${y}" width="13" height="5" rx="2.5"/>`).join("")}</g>`;
K.bag = `${T(50,93,30)}<path d="M36 22 C36 6 64 6 64 22" fill="none" stroke="#1E4AA0" stroke-width="5"/>
  <rect x="6" y="46" width="14" height="30" rx="6" fill="#F28B24" stroke="#B85F12" stroke-width="3"/><rect x="80" y="46" width="14" height="30" rx="6" fill="#F28B24" stroke="#B85F12" stroke-width="3"/>
  <rect x="16" y="20" width="68" height="72" rx="16" fill="#2F6FDE" stroke="#1E4AA0" stroke-width="3"/>
  <path d="M16 44 C30 52 70 52 84 44 V36 a16 16 0 0 0 -16 -16 H32 a16 16 0 0 0 -16 16Z" fill="#4F8FE8" stroke="#1E4AA0" stroke-width="3"/>
  <rect x="28" y="58" width="44" height="26" rx="7" fill="#F28B24" stroke="#B85F12" stroke-width="3"/><path d="M34 66 H66" stroke="#B85F12" stroke-width="2.4"/><rect x="45" y="42" width="10" height="13" rx="3" fill="#F6CB2F" stroke="#9A7A10" stroke-width="2"/>`;
K.ruler = `${T(50,90,34)}<g transform="rotate(-28 50 50)"><rect x="6" y="38" width="88" height="24" rx="4" fill="#F6CB2F" stroke="#9A7A10" stroke-width="3"/>
  <path d="${[14,22,30,38,46,54,62,70,78,86].map((x,i)=>`M${x} 39.5 V${i%2?46:51}`).join(" ")}" stroke="#7A5A08" stroke-width="2.2" fill="none"/><circle cx="84" cy="54" r="2.6" fill="#fff" stroke="#9A7A10" stroke-width="1.5"/></g>`;
K.crayon = `${T(50,88,30)}<g transform="rotate(-40 50 50)"><path d="M10 50 L24 43 V57Z" fill="#E0322B" stroke="#9E1F1A" stroke-width="3"/><path d="M24 41 H34 V59 H24Z" fill="#E0322B" stroke="#9E1F1A" stroke-width="3"/>
  <rect x="34" y="38" width="54" height="24" rx="4" fill="#EE4B44" stroke="#9E1F1A" stroke-width="3"/><rect x="42" y="38" width="34" height="24" fill="#FBE3D6" stroke="#9E1F1A" stroke-width="2"/>
  <path d="M48 46 q5 -4 10 0 t10 0 M48 54 q5 -4 10 0 t10 0" fill="none" stroke="#E0322B" stroke-width="2"/></g>`;
K.chair = `${T(52,92,28)}<path d="M30 54 V90 M70 56 V90 M40 56 V82 M62 56 V82" stroke="#6E4520" stroke-width="5.5" fill="none"/>
  <path d="M30 10 V54" stroke="#6E4520" stroke-width="5.5"/><rect x="24" y="12" width="13" height="30" rx="5" fill="#D99A5B" stroke="#6E4520" stroke-width="3" transform="skewY(0)"/>
  <rect x="24" y="12" width="40" height="30" rx="6" fill="#D99A5B" stroke="#6E4520" stroke-width="3"/>${LESK("M31 19 H56",3,.4)}
  <rect x="24" y="48" width="52" height="11" rx="5" fill="#B5713A" stroke="#6E4520" stroke-width="3"/>`;
K.teacher = `<rect x="52" y="8" width="44" height="34" rx="3" fill="#2E6B4F" stroke="#8B5A2B" stroke-width="3.5"/><path d="M60 20 h12 M60 28 h22" stroke="#F4F7F2" stroke-width="2.4" opacity=".9"/>
  <g transform="translate(-10 4)">${PLECIA("#8A4FC4","#5E3190")}${HLAVA(50,44,22,"mama","#8B5A2B")}</g>
  <path d="M62 82 L84 46" stroke="#F2D6B0" stroke-width="3.5"/><path d="M58 88 L66 78" stroke="${KOZA}" stroke-width="7"/>`;
K.scissors = `${T(50,92,28)}<g transform="rotate(8 50 50)"><path d="M44 10 L56 56 L48 60Z" fill="#D3DAE2" stroke="#6B7785" stroke-width="3"/><path d="M56 10 L44 56 L52 60Z" fill="#E9EEF3" stroke="#6B7785" stroke-width="3"/>
  <circle cx="50" cy="50" r="2.4" fill="#6B7785"/><g fill="none" stroke="#E0322B" stroke-width="7"><ellipse cx="36" cy="74" rx="10" ry="13" transform="rotate(20 36 74)"/><ellipse cx="64" cy="74" rx="10" ry="13" transform="rotate(-20 64 74)"/></g></g>`;
K.school = `${T(50,93,40)}<rect x="10" y="44" width="80" height="48" rx="3" fill="#F7E3B5" stroke="#B58A3A" stroke-width="3"/>
  <path d="M30 44 L50 22 L70 44Z" fill="#E0322B" stroke="#9E1F1A" stroke-width="3"/><path d="M4 46 H34 M66 46 H96" stroke="#9E1F1A" stroke-width="6"/>
  <path d="M50 22 V6" stroke="#6B7785" stroke-width="3"/><path d="M50 7 H66 L61 12 L66 17 H50Z" fill="#3AA655" stroke="#27703A" stroke-width="2"/>
  <circle cx="50" cy="37" r="5.5" fill="#fff" stroke="#55606E" stroke-width="2"/><path d="M50 34 V37 H52.5" stroke="#55606E" stroke-width="1.5" fill="none"/>
  <path d="M41 92 V68 a9 9 0 0 1 18 0 V92Z" fill="#B5713A" stroke="#6E4520" stroke-width="3"/><path d="M50 60 V92" stroke="#6E4520" stroke-width="2"/>
  <g fill="#BFE3FA" stroke="#4F8FB8" stroke-width="2.4"><rect x="17" y="54" width="15" height="15" rx="2"/><rect x="68" y="54" width="15" height="15" rx="2"/></g><path d="M24.5 54 V69 M17 61.5 H32 M75.5 54 V69 M68 61.5 H83" stroke="#4F8FB8" stroke-width="1.6"/>`;
K.paintbrush = `${T(50,88,30)}<g transform="rotate(-40 50 50)"><path d="M6 50 C12 40 22 40 30 42 V58 C22 60 12 60 6 50Z" fill="#2F6FDE" stroke="#1E4AA0" stroke-width="3"/>
  <rect x="30" y="40" width="14" height="20" rx="2" fill="#B9C2CD" stroke="#6B7785" stroke-width="3"/><path d="M35 41 V59 M39 41 V59" stroke="#6B7785" stroke-width="1.5"/>
  <path d="M44 42 H86 a8 8 0 0 1 0 16 H44Z" fill="#D99A5B" stroke="#6E4520" stroke-width="3"/>${LESK("M50 47 H82",2.4,.45)}</g>`;
K.clock = `${T(50,93,26)}<circle cx="50" cy="50" r="38" fill="#E0322B" stroke="#9E1F1A" stroke-width="3"/><circle cx="50" cy="50" r="29" fill="#fff" stroke="#9E1F1A" stroke-width="2.4"/>
  <path d="M50 25 V30 M50 70 V75 M25 50 H30 M70 50 H75" stroke="#55606E" stroke-width="3"/><path d="M50 50 V33 M50 50 H64" stroke="${INK}" stroke-width="4" fill="none"/><circle cx="50" cy="50" r="3.4" fill="#E0322B"/>`;
K.paint = `${T(50,90,34)}<path d="M50 14 C24 14 8 32 8 52 C8 72 26 86 46 86 C58 86 58 76 52 72 C46 66 52 58 62 60 C78 64 92 56 92 44 C92 26 74 14 50 14Z" fill="#E7C08A" stroke="#8B5A2B" stroke-width="3"/>
  <circle cx="28" cy="42" r="7.5" fill="#E0322B"/><circle cx="44" cy="28" r="7.5" fill="#F6CB2F"/><circle cx="64" cy="28" r="7.5" fill="#3AA655"/><circle cx="78" cy="42" r="7.5" fill="#2F6FDE"/><circle cx="26" cy="62" r="7.5" fill="#8A4FC4"/>`;

/* =================== LEKCIA 3: zvieratá na farme =================== */
K.horse = `${T(48,92,36)}<path d="M20 48 C8 52 8 70 14 82" fill="none" stroke="#5A3418" stroke-width="7"/>
  ${NOHY([22,31,56,65], 62, "#B5713A", "#7A4520", "#3F2A1A")}
  ${U(`<rect x="16" y="40" width="62" height="30" rx="15"/><path d="M58 46 L68 16 L86 22 L78 56Z"/><ellipse cx="82" cy="27" rx="15" ry="10" transform="rotate(28 82 27)"/><path d="M66 16 L67 4 L75 13Z"/>`, "#B5713A", "#7A4520")}
  <ellipse cx="90" cy="33" rx="7" ry="6.5" fill="#D99A6B" transform="rotate(28 90 33)"/><circle cx="92" cy="33" r="1.3" fill="#7A4520"/>
  <path d="M70 6 C58 12 52 26 52 44 C58 40 62 32 66 16Z" fill="#5A3418"/>${OKO(79,22,2.4)}`;
K.cow = `${T(50,92,36)}<path d="M18 46 C10 50 10 62 12 68" fill="none" stroke="#3A4656" stroke-width="3.5"/><circle cx="12" cy="70" r="3.5" fill="#3A4656"/>
  ${NOHY([22,31,58,67], 62, "#fff", "#55606E", "#3A4656")}<ellipse cx="46" cy="72" rx="9" ry="6" fill="#F7A8C4" stroke="#B8437A" stroke-width="2.4"/>
  <rect x="14" y="38" width="64" height="34" rx="16" fill="#fff" stroke="#55606E" stroke-width="3"/>
  <path d="M26 39.5 C36 40 40 50 32 56 C24 60 18 54 20 46 C21 42 23 40 26 39.500Z M52 70.5 C48 60 56 54 64 58 C70 62 68 68 66 70.500Z" fill="#3A4656"/>
  <path d="M64 20 C58 16 58 8 62 6 M90 20 C96 16 96 8 92 6" fill="none" stroke="#E7C08A" stroke-width="5"/>
  <ellipse cx="58" cy="30" rx="7" ry="4.5" fill="#fff" stroke="#55606E" stroke-width="2.4" transform="rotate(-20 58 30)"/><ellipse cx="96" cy="30" rx="7" ry="4.5" fill="#fff" stroke="#55606E" stroke-width="2.4" transform="rotate(20 96 30)" opacity="0"/>
  <rect x="60" y="18" width="34" height="38" rx="15" fill="#fff" stroke="#55606E" stroke-width="3"/><path d="M82 19.5 C92 20 94 30 92 36 C86 36 80 30 82 19.500Z" fill="#3A4656"/>
  <rect x="62" y="40" width="30" height="17" rx="8.5" fill="#F7A8C4" stroke="#B8437A" stroke-width="2.4"/><circle cx="71" cy="48" r="2" fill="#B8437A"/><circle cx="83" cy="48" r="2" fill="#B8437A"/>${OCI(70,84,31,2.4)}`;
K.sheep = `${T(50,92,34)}${NOHY([28,37,56,65], 64, "#3A4656", "#1C2633", "#1C2633", 7)}
  ${U(`<circle cx="26" cy="50" r="13"/><circle cx="36" cy="38" r="13"/><circle cx="52" cy="34" r="14"/><circle cx="66" cy="40" r="13"/><circle cx="72" cy="54" r="12"/><circle cx="60" cy="64" r="12"/><circle cx="44" cy="66" r="12"/><circle cx="30" cy="62" r="11"/><circle cx="48" cy="50" r="16"/>`, "#fff", "#9FB3C8")}
  <ellipse cx="62" cy="36" rx="6" ry="3.5" fill="#3A4656" transform="rotate(-30 62 36)"/><ellipse cx="90" cy="36" rx="6" ry="3.5" fill="#3A4656" transform="rotate(30 90 36)"/>
  <rect x="64" y="30" width="24" height="30" rx="12" fill="#3A4656" stroke="#1C2633" stroke-width="2.4"/>${U(`<circle cx="69" cy="29" r="5.5"/><circle cx="76" cy="26" r="6"/><circle cx="83" cy="29" r="5.5"/>`, "#fff", "#9FB3C8", 2.4)}
  <circle cx="71" cy="42" r="2.8" fill="#fff"/><circle cx="81" cy="42" r="2.8" fill="#fff"/><circle cx="71.5" cy="42.5" r="1.5" fill="${INK}"/><circle cx="81.5" cy="42.5" r="1.5" fill="${INK}"/><path d="M73 52 q3 2.5 6 0" stroke="#fff" stroke-width="1.6" fill="none"/>`;
K.goat = `${T(48,92,34)}<path d="M18 44 L10 36" stroke="#C9B79A" stroke-width="6"/>${NOHY([24,32,54,62], 62, "#E9DCC6", "#9A8463", "#5A4636", 7)}
  <path d="M70 18 C66 8 58 4 50 6 M78 16 C76 6 70 0 62 0" fill="none" stroke="#8A7A66" stroke-width="5"/>
  ${U(`<rect x="16" y="40" width="56" height="28" rx="14"/><path d="M56 46 L64 22 L80 26 L74 54Z"/><ellipse cx="76" cy="30" rx="14" ry="10" transform="rotate(24 76 30)"/>`, "#E9DCC6", "#9A8463")}
  <ellipse cx="62" cy="24" rx="8" ry="4" fill="#E9DCC6" stroke="#9A8463" stroke-width="2.4" transform="rotate(-24 62 24)"/>
  <path d="M82 42 C82 50 80 54 77 57 C76 52 76 46 78 41Z" fill="#fff" stroke="#9A8463" stroke-width="2"/><ellipse cx="86" cy="35" rx="5" ry="4.5" fill="#F7C9B8"/><circle cx="87.5" cy="35" r="1.1" fill="#9A8463"/>${OKO(74,26,2.4)}`;
K.pig = `${T(48,90,34)}<path d="M14 50 c-6 -2 -6 -9 0 -8 c4 1 3 6 -1 5" fill="none" stroke="#D45C8A" stroke-width="3"/>
  ${NOHY([26,35,56,65], 66, "#F7A8C4", "#C4577F", "#C4577F", 8, 88)}
  ${U(`<ellipse cx="46" cy="54" rx="34" ry="24"/><circle cx="72" cy="44" r="19"/>`, "#F7A8C4", "#C4577F")}
  <path d="M60 30 L58 18 L70 26Z" fill="#F27DB3" stroke="#C4577F" stroke-width="2.4"/><path d="M78 26 L86 17 L88 30Z" fill="#F27DB3" stroke="#C4577F" stroke-width="2.4"/>
  <ellipse cx="82" cy="48" rx="9.5" ry="7.5" fill="#F27DB3" stroke="#C4577F" stroke-width="2.4"/><ellipse cx="79" cy="48" rx="1.6" ry="2.4" fill="#A63A66"/><ellipse cx="85.5" cy="48" rx="1.6" ry="2.4" fill="#A63A66"/>${OCI(68,80,37,2.3)}`;
/* sediace zvieratko spredu: telo + hlava; uši a doplnky dodá kresba */
const SEDI = (f, s, bruch, usi, tvar, chvost="") => `${T(50,93,28)}${chvost}${usi}
  ${U(`<path d="M28 92 C24 70 34 56 50 56 C66 56 76 70 72 92Z"/>`, f, s)}<ellipse cx="50" cy="80" rx="12" ry="13" fill="${bruch}"/>
  <g fill="${f}" stroke="${s}" stroke-width="2.6"><ellipse cx="38" cy="91" rx="8" ry="5"/><ellipse cx="62" cy="91" rx="8" ry="5"/></g>
  <ellipse cx="50" cy="42" rx="27" ry="23" fill="${f}" stroke="${s}" stroke-width="3"/>${tvar}`;
const NOS = (f=INK) => `<path d="M46 47 h8 l-4 4.500Z" fill="${f}" stroke="${f}" stroke-width="1.5"/><path d="M50 51.5 V54 M50 54 q-4 4 -8 1 M50 54 q4 4 8 1" fill="none" stroke="${INK}" stroke-width="1.8"/>`;
K.dog = SEDI("#D99A5B", "#8B5A2B", "#F7E3C3",
  `<g fill="#8B5A2B" stroke="#5A3418" stroke-width="2.6"><ellipse cx="24" cy="42" rx="8" ry="16" transform="rotate(14 24 42)"/><ellipse cx="76" cy="42" rx="8" ry="16" transform="rotate(-14 76 42)"/></g>`,
  `<ellipse cx="50" cy="51" rx="13" ry="10" fill="#F7E3C3"/><ellipse cx="61" cy="36" rx="8" ry="9" fill="#8B5A2B" opacity=".55"/>${OCI(39,61,38,3)}${NOS()}<path d="M46 57 q4 7 8 0Z" fill="#F27DB3" stroke="#B8437A" stroke-width="1.4"/>`,
  `<path d="M72 84 C86 82 88 68 82 62" fill="none" stroke="#8B5A2B" stroke-width="6"/>`);
K.cat = SEDI("#F2A03D", "#B86A14", "#FBE3C0",
  `<g fill="#F2A03D" stroke="#B86A14" stroke-width="3"><path d="M26 34 L24 10 L44 24Z"/><path d="M74 34 L76 10 L56 24Z"/></g><path d="M29 27 L28 16 L37 23Z M71 27 L72 16 L63 23Z" fill="#F7A8C4"/>`,
  `<path d="M50 20 V27 M42 21 L44 27 M58 21 L56 27" stroke="#B86A14" stroke-width="2.6" fill="none"/>${OCI(38,62,40,3.2)}${NOS("#E0567F")}
   <path d="M30 46 H16 M30 51 L17 55 M70 46 H84 M70 51 L83 55" stroke="#8B5A2B" stroke-width="1.6" opacity=".7"/>`,
  `<path d="M72 86 C90 86 90 66 80 62" fill="none" stroke="#B86A14" stroke-width="9"/><path d="M72 86 C90 86 90 66 80 62" fill="none" stroke="#F2A03D" stroke-width="4.5"/>`);
K.rabbit = SEDI("#F1F3F6", "#8E9AA8", "#fff",
  `<g fill="#F1F3F6" stroke="#8E9AA8" stroke-width="3"><ellipse cx="38" cy="16" rx="7.5" ry="18" transform="rotate(-8 38 16)"/><ellipse cx="62" cy="16" rx="7.5" ry="18" transform="rotate(8 62 16)"/></g>
   <ellipse cx="38" cy="17" rx="3.2" ry="12" fill="#F7A8C4" transform="rotate(-8 38 17)"/><ellipse cx="62" cy="17" rx="3.2" ry="12" fill="#F7A8C4" transform="rotate(8 62 17)"/>`,
  `${OCI(39,61,40,3)}${NOS("#E0567F")}${LICKA(31,69,48,4)}<rect x="47" y="56" width="6" height="5.5" rx="1.5" fill="#fff" stroke="#8E9AA8" stroke-width="1.3"/>`);
/* vták z boku (hlava vpravo) */
const ZOBAK = (x,y,f="#F28B24",s="#B85F12",d=11) => `<path d="M${x} ${y-4.5} L${x+d} ${y} L${x} ${y+4.5}Z" fill="${f}" stroke="${s}" stroke-width="2.2"/>`;
const NOZKY = (x1,x2,y,f="#F28B24") => `<path d="M${x1} ${y} V${y+11} M${x1-5} ${y+12} H${x1+6} M${x2} ${y} V${y+11} M${x2-5} ${y+12} H${x2+6}" fill="none" stroke="${f}" stroke-width="3.2"/>`;
K.hen = `${T(48,93,28)}${NOZKY(40,54,76)}<path d="M22 44 C8 36 8 22 14 18 C16 26 20 28 24 30 C22 24 24 18 28 16 C30 26 36 32 42 40Z" fill="#fff" stroke="#9FB3C8" stroke-width="3"/>
  <g fill="#E0322B" stroke="#9E1F1A" stroke-width="2.2"><circle cx="64" cy="13" r="5"/><circle cx="72" cy="11" r="5.5"/><circle cx="79" cy="15" r="4.5"/></g><path d="M78 40 C80 46 78 50 75 50 C72 50 71 45 73 40Z" fill="#E0322B" stroke="#9E1F1A" stroke-width="2"/>
  ${U(`<ellipse cx="46" cy="58" rx="28" ry="22"/><circle cx="70" cy="30" r="15"/><path d="M58 34 L56 54 L74 46 L80 38Z"/>`, "#fff", "#9FB3C8")}${ZOBAK(83,31)}
  <path d="M28 54 C36 48 50 50 54 60 C48 68 34 68 28 54Z" fill="#E9EEF3" stroke="#9FB3C8" stroke-width="2.4"/>${OKO(73,27,2.4)}`;
K.rooster = `${T(48,93,28)}${NOZKY(42,56,76,"#E0A21A")}
  <g fill="none" stroke-width="7"><path d="M30 52 C10 50 6 30 14 16" stroke="#27703A"/><path d="M32 50 C18 42 18 24 26 12" stroke="#2F6FDE"/><path d="M36 50 C28 40 30 26 38 18" stroke="#8A4FC4"/></g>
  <g fill="#E0322B" stroke="#9E1F1A" stroke-width="2.2"><path d="M60 16 C58 4 66 4 67 10 C68 0 78 2 76 10 C82 4 88 10 82 18Z"/></g><path d="M78 40 C82 48 79 54 75 54 C71 54 70 47 73 40Z" fill="#E0322B" stroke="#9E1F1A" stroke-width="2"/>
  ${U(`<ellipse cx="48" cy="58" rx="26" ry="21"/><circle cx="70" cy="30" r="14"/><path d="M58 34 L56 54 L74 46 L80 38Z"/>`, "#D9772B", "#8B4513")}${ZOBAK(82,30,"#F6CB2F","#B58A12")}
  <path d="M60 40 C56 48 58 56 64 60 C70 54 74 46 72 40Z" fill="#F6CB2F" opacity=".85"/><path d="M30 54 C38 48 50 50 54 60 C48 68 36 68 30 54Z" fill="#8B4513" stroke="#5A2C0C" stroke-width="2.4"/>${OKO(73,27,2.4)}`;
K.chick = `${T(50,92,24)}${NOZKY(43,57,78)}${U(`<circle cx="50" cy="60" r="24"/><circle cx="56" cy="34" r="19"/>`, "#F6CB2F", "#C99A12")}
  <path d="M52 16 C50 8 56 6 57 12 C60 6 66 9 61 16Z" fill="#F6CB2F" stroke="#C99A12" stroke-width="2.2"/>${ZOBAK(73,36,"#F28B24","#B85F12",9)}
  <path d="M30 58 C38 52 48 56 48 64 C42 70 32 68 30 58Z" fill="#F2B21A" stroke="#C99A12" stroke-width="2.4"/>${OKO(62,31,2.8)}${LICKA(64,64,39,3.2)}`;
K.duck = `${T(48,93,28)}${NOZKY(40,54,76)}<path d="M24 50 C12 46 8 38 8 32 C16 36 24 38 32 42Z" fill="#fff" stroke="#9FB3C8" stroke-width="3"/>
  ${U(`<ellipse cx="46" cy="60" rx="30" ry="20"/><circle cx="68" cy="28" r="15"/><path d="M56 32 L56 54 L74 50 L80 36Z"/>`, "#fff", "#9FB3C8")}
  <path d="M80 24 C90 22 97 26 97 30 C97 34 90 36 81 35Z" fill="#F28B24" stroke="#B85F12" stroke-width="2.4"/><path d="M26 58 C34 50 50 52 54 62 C48 72 32 72 26 58Z" fill="#E9EEF3" stroke="#9FB3C8" stroke-width="2.4"/>${OKO(71,25,2.6)}${LICKA(72,72,33,3)}`;
K.bird = `<path d="M10 76 H62" stroke="#8B5A2B" stroke-width="6"/><path d="M52 76 q8 -10 16 -8" fill="none" stroke="#8B5A2B" stroke-width="4"/><ellipse cx="72" cy="66" rx="6" ry="3.5" fill="#3AA655" transform="rotate(-20 72 66)"/>
  <path d="M40 68 V75 M50 68 V75" stroke="#F28B24" stroke-width="3"/><path d="M26 56 L6 62 L10 50 L24 46Z" fill="#1E4AA0" stroke="#163A80" stroke-width="2.4"/>
  ${U(`<ellipse cx="44" cy="50" rx="24" ry="20"/><circle cx="62" cy="32" r="16"/>`, "#4F8FE8", "#1E4AA0")}<path d="M36 62 C40 52 54 46 64 46 C62 60 50 68 36 62Z" fill="#FBE3A0"/>
  ${ZOBAK(77,33)}<path d="M26 46 C34 40 46 44 48 54 C40 60 30 58 26 46Z" fill="#2F6FDE" stroke="#1E4AA0" stroke-width="2.4"/>${OKO(66,29,2.8)}${LICKA(68,68,37,3)}`;
K.parrot = `<path d="M8 80 H70" stroke="#8B5A2B" stroke-width="6"/><path d="M34 70 L22 98 L36 94 L44 72Z" fill="#2F6FDE" stroke="#1E4AA0" stroke-width="2.4"/>
  ${U(`<ellipse cx="46" cy="56" rx="19" ry="25" transform="rotate(14 46 56)"/><circle cx="56" cy="28" r="18"/>`, "#E0322B", "#9E1F1A")}
  <path d="M30 52 C36 44 48 46 50 58 C52 70 46 80 38 80 C30 74 28 62 30 52Z" fill="#F6CB2F" stroke="#C99A12" stroke-width="2.4"/><path d="M33 64 C38 62 46 66 46 76 C42 80 38 80 38 80 C33 76 32 70 33 64Z" fill="#2F6FDE"/>
  <circle cx="62" cy="25" r="8" fill="#fff"/><path d="M70 22 C82 22 84 34 76 42 C76 36 72 34 68 34Z" fill="#3A4656" stroke="${INK}" stroke-width="2.2"/>${OKO(63,25,2.8)}
  <path d="M48 78 v5 M56 76 v7" stroke="#55606E" stroke-width="3.2"/>`;
K.tractor = `${T(50,93,40)}<path d="M70 30 V18" stroke="#55606E" stroke-width="5"/><rect x="50" y="34" width="42" height="28" rx="5" fill="#E0322B" stroke="#9E1F1A" stroke-width="3"/>
  <path d="M14 62 V20 a4 4 0 0 1 4 -4 H46 a4 4 0 0 1 4 4 V62Z" fill="#E0322B" stroke="#9E1F1A" stroke-width="3"/><rect x="21" y="23" width="22" height="20" rx="3" fill="#BFE3FA" stroke="#4F8FB8" stroke-width="2.4"/>
  <rect x="84" y="42" width="8" height="8" rx="2" fill="#F6CB2F"/>
  <circle cx="30" cy="70" r="21" fill="#3A4656" stroke="${INK}" stroke-width="3"/><circle cx="30" cy="70" r="9" fill="#F6CB2F" stroke="#C99A12" stroke-width="2.4"/>
  <circle cx="78" cy="78" r="13" fill="#3A4656" stroke="${INK}" stroke-width="3"/><circle cx="78" cy="78" r="5.5" fill="#F6CB2F" stroke="#C99A12" stroke-width="2.4"/>`;

/* =================== LEKCIA 4: jedlo a pitie =================== */
K.cake = `${T(50,93,36)}<ellipse cx="50" cy="85" rx="43" ry="8" fill="#fff" stroke="#9FB3C8" stroke-width="3"/>
  <path d="M20 46 H80 V78 a6 6 0 0 1 -6 6 H26 a6 6 0 0 1 -6 -6Z" fill="#E7B36A" stroke="#9A6A2A" stroke-width="3"/><path d="M22 68 H78" stroke="#FFF6EA" stroke-width="5"/>
  <path d="M18 44 a8 8 0 0 1 8 -8 H74 a8 8 0 0 1 8 8 V52 a5 5 0 0 1 -10 0 a5 5 0 0 0 -10 0 V57 a5 5 0 0 1 -10 0 V52 a5 5 0 0 0 -10 0 V60 a5 5 0 0 1 -10 0 V52 a5 5 0 0 0 -10 0 a2 2 0 0 1 -4 0Z" fill="#F27DB3" stroke="#B8437A" stroke-width="3"/>
  <path d="M50 22 C50 14 56 12 60 9" stroke="#27703A" stroke-width="2.6" fill="none"/><circle cx="50" cy="28" r="8.5" fill="#E0322B" stroke="#9E1F1A" stroke-width="2.6"/><circle cx="47" cy="25" r="2" fill="#fff" opacity=".6"/>`;
const MRKVA = `<path d="M0 -22 C-6 -34 -14 -34 -12 -26 M0 -22 C0 -38 6 -40 6 -30 M0 -22 C8 -32 16 -30 12 -24" fill="none" stroke="#3AA655" stroke-width="5"/>
  <path d="M-10 -20 C-14 -6 -5 24 0 34 C5 24 14 -6 10 -20 C6 -26 -6 -26 -10 -20Z" fill="#F28B24" stroke="#B85F12" stroke-width="2.8"/><path d="M-8 -8 h7 M2 2 h7 M-5 12 h6" stroke="#B85F12" stroke-width="2" fill="none"/>`;
K.carrots = `${T(50,92,30)}<g transform="translate(36 52) rotate(-18) scale(1.15)">${MRKVA}</g><g transform="translate(64 52) rotate(18) scale(1.15)">${MRKVA}</g>`;
const ZEMIAK = (x,y,rx,ry,u) => `<g transform="translate(${x} ${y}) rotate(${u})"><ellipse rx="${rx}" ry="${ry}" fill="#D9AE6E" stroke="#8B6332" stroke-width="3"/><g fill="#8B6332"><circle cx="${-rx*.4}" cy="${-ry*.2}" r="1.6"/><circle cx="${rx*.3}" cy="${ry*.3}" r="1.6"/><circle cx="${rx*.45}" cy="${-ry*.4}" r="1.3"/></g><path d="M${-rx*.6} ${-ry*.55} Q0 ${-ry*.95} ${rx*.3} ${-ry*.7}" stroke="#fff" stroke-width="2.6" fill="none" opacity=".4"/></g>`;
K.potatoes = `${T(50,90,38)}${ZEMIAK(34,40,22,16,-20)}${ZEMIAK(70,48,20,15,25)}${ZEMIAK(44,68,25,17,5)}`;
K.rice = `${T(50,92,32)}${U(`<circle cx="30" cy="44" r="11"/><circle cx="44" cy="35" r="13"/><circle cx="60" cy="35" r="13"/><circle cx="72" cy="44" r="11"/><rect x="24" y="40" width="52" height="16"/>`, "#fff", "#9FB3C8")}
  <path d="M38 34 l4 2 M52 28 l4 -2 M62 38 l4 2 M46 42 l4 -2 M30 44 l4 -2 M68 46 l3 -2" stroke="#9FB3C8" stroke-width="2.2" fill="none"/>
  <path d="M10 52 H90 C90 74 73 88 50 88 C27 88 10 74 10 52Z" fill="#2F6FDE" stroke="#1E4AA0" stroke-width="3"/><path d="M14 62 C30 68 70 68 86 62" fill="none" stroke="#fff" stroke-width="3.5" opacity=".55"/><rect x="38" y="86" width="24" height="6" rx="2" fill="#1E4AA0"/>`;
K.meat = `${T(50,90,34)}<path d="M62 62 L84 82" stroke="#fff" stroke-width="13"/><path d="M62 62 L84 82" stroke="#B9C2CD" stroke-width="13" opacity="0"/>
  ${U(`<path d="M60 60 L82 80" stroke-width="12" fill="none"/>`, "none", "none")}<path d="M58 58 L82 80" stroke="#9FB3C8" stroke-width="14" fill="none"/><path d="M58 58 L82 80" stroke="#FFF6EA" stroke-width="9" fill="none"/>
  ${U(`<circle cx="80" cy="86" r="6.5"/><circle cx="88" cy="78" r="6.5"/>`, "#FFF6EA", "#9FB3C8", 2.6)}
  <path d="M14 40 C12 22 30 10 48 14 C66 18 76 34 72 50 C68 66 52 76 36 70 C24 66 16 54 14 40Z" fill="#C4573A" stroke="#7E2A16" stroke-width="3"/>
  <path d="M24 34 C26 24 36 20 46 22" stroke="#fff" stroke-width="4" fill="none" opacity=".4"/><path d="M40 44 q6 -6 12 0 M30 54 q6 -6 12 0 M48 58 q5 -5 10 0" stroke="#7E2A16" stroke-width="2.4" fill="none" opacity=".6"/>`;
const SUSIENKA = (x,y,r) => `<g transform="translate(${x} ${y}) scale(${r/20})"><circle r="20" fill="#E0A85E" stroke="#8B5A2B" stroke-width="3"/><g fill="#5A3418"><circle cx="-8" cy="-6" r="3.2"/><circle cx="6" cy="-9" r="2.8"/><circle cx="9" cy="5" r="3.2"/><circle cx="-4" cy="9" r="3"/><circle cx="-12" cy="4" r="2"/></g><path d="M-13 -9 Q-8 -16 0 -16" stroke="#fff" stroke-width="3" fill="none" opacity=".4"/></g>`;
K.biscuits = `${T(50,90,36)}${SUSIENKA(36,40,24)}${SUSIENKA(64,62,24)}`;
K.milk = `${T(50,93,36)}<path d="M20 34 C20 26 26 24 26 17 H44 C44 24 50 26 50 34 V84 a6 6 0 0 1 -6 6 H26 a6 6 0 0 1 -6 -6Z" fill="#fff" stroke="#8FA3B8" stroke-width="3"/>
  <rect x="24" y="7" width="22" height="10" rx="3.5" fill="#2F6FDE" stroke="#1E4AA0" stroke-width="2.6"/><path d="M21.5 46 H48.5 V70 H21.500Z" fill="#4F8FE8"/><path d="M29 56 C29 52 35 51 36 55 C40 52 43 58 39 61 C36 65 30 62 29 56Z" fill="#fff"/>
  <path d="M58 46 H90 L86 87 a4 4 0 0 1 -4 3.5 H66 a4 4 0 0 1 -4 -3.500Z" fill="#EAF4FB" stroke="#8FA3B8" stroke-width="3"/><path d="M60.5 56 H87.5 L84.5 87 H63.500Z" fill="#fff"/><path d="M60.5 56 H87.5" stroke="#B9C2CD" stroke-width="2"/>`;
K.apple = `${T(50,92,26)}<path d="M50 30 C50 20 52 14 58 10" stroke="#6E4520" stroke-width="4" fill="none"/><path d="M56 18 C64 8 76 10 80 14 C74 22 64 24 56 18Z" fill="#3AA655" stroke="#27703A" stroke-width="2.6"/>
  <path d="M50 30 C40 20 14 24 14 50 C14 72 30 91 44 88 C48 87 52 87 56 88 C70 91 86 72 86 50 C86 24 60 20 50 30Z" fill="#E0322B" stroke="#9E1F1A" stroke-width="3"/>${LESK("M24 48 C24 38 30 32 38 31",4.5,.45)}`;
K.juice = `${T(50,93,26)}<path d="M56 24 L64 6 H76" fill="none" stroke="#E0322B" stroke-width="4.5"/>
  <path d="M26 30 L34 20 H66 L74 30 V84 a5 5 0 0 1 -5 5 H31 a5 5 0 0 1 -5 -5Z" fill="#F28B24" stroke="#B85F12" stroke-width="3"/><path d="M26 30 H74" stroke="#B85F12" stroke-width="2.6"/>
  <circle cx="50" cy="60" r="15" fill="#FBD08A" stroke="#B85F12" stroke-width="2.6"/><path d="M50 47 V73 M37 60 H63 M41 51 L59 69 M59 51 L41 69" stroke="#F28B24" stroke-width="2"/><circle cx="50" cy="60" r="3" fill="#F28B24"/>`;
K.banana = `${T(52,90,30)}<path d="M16 26 C18 60 44 84 80 78 C88 76 90 70 84 68 C58 68 38 50 30 24 C28 16 16 18 16 26Z" fill="#F6CB2F" stroke="#B58A12" stroke-width="3"/>
  <path d="M17 26 C16 20 20 16 24 17 C28 18 30 22 30 24Z" fill="#6E4520"/><path d="M84 68 C89 69 90 75 84 77" fill="none" stroke="#6E4520" stroke-width="4"/><path d="M22 30 C28 54 46 72 76 74" fill="none" stroke="#fff" stroke-width="3" opacity=".45"/>`;
K.bread = `${T(50,90,38)}<path d="M10 50 C10 30 28 26 50 26 C72 26 90 30 90 50 C90 58 86 60 83 61 V78 a6 6 0 0 1 -6 6 H23 a6 6 0 0 1 -6 -6 V61 C14 60 10 58 10 50Z" fill="#E7B36A" stroke="#9A6A2A" stroke-width="3"/>
  <path d="M17 60 C30 56 70 56 83 60" fill="none" stroke="#9A6A2A" stroke-width="2.4" opacity=".7"/><path d="M30 34 L36 46 M47 32 L53 44 M64 34 L70 46" stroke="#9A6A2A" stroke-width="3.5" fill="none"/>${LESK("M18 44 C20 36 28 33 34 32",3.5,.45)}`;
K.cheese = `${T(50,90,38)}<path d="M8 54 L60 22 L92 42 V76 L8 86Z" fill="#F6CB2F" stroke="#B58A12" stroke-width="3"/><path d="M8 54 L60 22 L92 42Z" fill="#FBE08A" stroke="#B58A12" stroke-width="3"/>
  <g fill="#E0A21A"><ellipse cx="28" cy="70" rx="7" ry="6"/><ellipse cx="54" cy="62" rx="5" ry="4.5"/><ellipse cx="74" cy="68" rx="8" ry="6.5"/><ellipse cx="46" cy="78" rx="3.5" ry="3"/><ellipse cx="58" cy="38" rx="6" ry="3"/></g>`;

/* =================== LEKCIA 5: čo viem robiť =================== */
const NOTA = (x,y,f="#8A4FC4",m=1) => `<g transform="translate(${x} ${y}) scale(${m})" fill="${f}"><ellipse cx="0" cy="12" rx="5" ry="3.8" transform="rotate(-20 0 12)"/><path d="M3 12 V-6 L13 -2 V4 L5.5 1 V12Z"/></g>`;
K.walk = `${T(50,93,22)}${FIG({h:[50,17], t:[50,35,50,55], ruky:["50 37 60 47 66 56","50 37 40 47 35 57"], nohy:["47 58 40 73 32 86","53 58 60 72 64 87"]})}`;
K.run = `${T(50,93,24)}<path d="M6 34 H22 M4 48 H18 M8 62 H20" stroke="#9FB3C8" stroke-width="4" fill="none"/>
  ${FIG({h:[62,18], t:[58,35,50,54], ruky:["58 37 70 44 78 34","58 37 44 40 38 50"], nohy:["51 57 66 64 66 82","49 57 38 68 24 64"], tricko:"#3AA655"})}`;
K.climb = `<g stroke="#B5713A" stroke-width="5.5" fill="none"><path d="M32 4 V96 M68 4 V96"/><path d="M32 16 H68 M32 34 H68 M32 52 H68 M32 70 H68 M32 88 H68" stroke-width="4.5" stroke="#D99A5B"/></g>
  ${FIG({h:[50,28], t:[50,45,50,64], ruky:["50 47 64 40 67 28","50 47 36 42 33 30"], nohy:["47 67 36 70 37 84","53 67 64 76 62 90"], tricko:"#F28B24"})}`;
K.kick = `${T(40,93,20)}${FIG({h:[38,17], t:[38,35,40,55], ruky:["38 37 52 42 60 36","38 37 26 44 20 36"], nohy:["39 58 36 73 34 87","42 58 56 66 68 60"]})}
  ${LOPTA(84,52,10)}<path d="M72 44 q-4 -6 -10 -6 M74 66 q-4 4 -9 4" stroke="#9FB3C8" stroke-width="3" fill="none"/>`;
K.throw = `${T(48,93,22)}${FIG({h:[46,20], t:[46,38,46,58], ruky:["46 40 60 32 64 18","46 40 34 48 28 56"], nohy:["43 61 36 75 32 88","49 61 58 75 62 88"], tricko:"#8A4FC4"})}
  <circle cx="82" cy="14" r="8.5" fill="#E0322B" stroke="#9E1F1A" stroke-width="2.6"/><path d="M79 11 q3 -3 6 -1" stroke="#fff" stroke-width="2" fill="none" opacity=".6"/><path d="M70 26 Q74 20 72 14 M64 8 q6 -4 10 -2" stroke="#9FB3C8" stroke-width="3" fill="none"/>`;
K.dance = `${T(52,93,22)}${FIG({h:[50,17], t:[50,35,50,52], ruky:["50 37 64 34 74 22","50 37 36 34 26 22"], nohy:["47 60 42 76 44 88","54 60 66 68 76 78"], tricko:"#F27DB3", gate:"#E9B48A", vlasy:"#8B5A2B",
  pred:`<path d="M38 50 H62 L70 68 C58 72 42 72 30 68Z" fill="#F27DB3" stroke="#B8437A" stroke-width="2.4"/>`})}${NOTA(82,44,"#8A4FC4",1)}${NOTA(10,50,"#2F6FDE",.8)}`;
K.sing = `${T(50,93,22)}${FIG({h:[50,22], t:[50,40,50,60], ruky:["50 42 62 50 60 38","50 42 38 52 32 44"], nohy:["46 63 44 76 42 88","54 63 56 76 58 88"], tricko:"#2F6FDE", gate:"#3A4656",
  pred:`<ellipse cx="50" cy="28" rx="3.4" ry="3.8" fill="#7A1F2E"/><path d="M60 40 L59 33" stroke="#3A4656" stroke-width="4"/><circle cx="58.5" cy="31" r="4.5" fill="#9AA6B5" stroke="#55606E" stroke-width="2"/>`})}${NOTA(78,14,"#E0322B",1)}${NOTA(14,24,"#3AA655",.85)}${NOTA(84,46,"#F28B24",.7)}`;
K.play_the_piano = `${T(50,92,40)}${NOTA(22,8,"#8A4FC4",.9)}${NOTA(64,6,"#E0322B",.9)}
  <rect x="6" y="34" width="88" height="52" rx="7" fill="#3A4656" stroke="${INK}" stroke-width="3"/><rect x="12" y="52" width="76" height="28" rx="2" fill="#fff" stroke="${INK}" stroke-width="2.4"/>
  <path d="${[1,2,3,4,5,6,7].map(i=>`M${12+i*9.5} 52 V80`).join(" ")}" stroke="${INK}" stroke-width="1.8"/><g fill="${INK}">${[1,2,4,5,6].map(i=>`<rect x="${12+i*9.5-3}" y="52" width="6" height="17" rx="1"/>`).join("")}</g>${LESK("M14 42 H50",3,.25)}`;
K.play_the_drums = `${T(50,93,34)}<path d="M14 6 L44 40 M86 6 L56 40" stroke="#D99A5B" stroke-width="5"/><circle cx="14" cy="6" r="4.5" fill="#D99A5B"/><circle cx="86" cy="6" r="4.5" fill="#D99A5B"/>
  <path d="M16 46 V78 C16 86 31 91 50 91 C69 91 84 86 84 78 V46Z" fill="#E0322B" stroke="#9E1F1A" stroke-width="3"/>
  <path d="M17 52 L28 82 L39 56 L50 88 L61 56 L72 82 L83 52" fill="none" stroke="#F6CB2F" stroke-width="3"/>
  <ellipse cx="50" cy="46" rx="34" ry="11" fill="#FFF6EA" stroke="#9E1F1A" stroke-width="3"/><path d="M16 76 C16 84 31 89 50 89 C69 89 84 84 84 76" fill="none" stroke="#F6CB2F" stroke-width="3.5"/>`;
K.swim = `<path d="M34 50 C40 30 58 26 68 38" fill="none" stroke="#E9B48A" stroke-width="7.5"/><circle cx="34" cy="48" r="12" fill="#E9B48A"/>
  <path d="M22 46 C22 32 46 32 46 46 C40 40 28 40 22 46Z" fill="#E0322B"/><rect x="25" y="45" width="19" height="7" rx="3.5" fill="#BFE3FA" stroke="#2F6FDE" stroke-width="2"/><path d="M30 55 q4 3 8 0" stroke="${INK}" stroke-width="1.6" fill="none"/>
  <path d="M2 62 q8 -8 16 0 t16 0 t16 0 t16 0 t16 0 t16 0 V94 H2Z" fill="#4FA3E8"/><path d="M2 76 q8 -8 16 0 t16 0 t16 0 t16 0 t16 0 t16 0 V96 H2Z" fill="#2F6FDE"/>
  <path d="M60 56 H88" stroke="#E9B48A" stroke-width="7" opacity=".0"/><g fill="#BFE3FA"><circle cx="76" cy="34" r="3"/><circle cx="84" cy="44" r="2.4"/><circle cx="70" cy="24" r="2"/></g><path d="M56 60 q10 -6 22 -2" stroke="#fff" stroke-width="3" fill="none" opacity=".7"/>`;
K.ride_a_bike = `${T(50,94,38)}<g fill="none" stroke="${INK}" stroke-width="4"><circle cx="24" cy="74" r="16"/><circle cx="78" cy="74" r="16"/></g><g fill="none" stroke="#9FB3C8" stroke-width="1.6"><path d="M24 58 V90 M8 74 H40 M78 58 V90 M62 74 H94"/></g>
  <path d="M24 74 L40 54 H66 L50 76 Z M66 54 L78 74 M66 54 L64 44 H72 M40 54 L37 48" fill="none" stroke="#E0322B" stroke-width="4.5"/><path d="M31 48 H44" stroke="${INK}" stroke-width="5"/><circle cx="50" cy="76" r="4" fill="#55606E"/>
  ${FIG({h:[50,14], t:[48,31,40,46], ruky:["50 33 60 42 68 44"], nohy:["40 50 54 58 52 76"], tricko:"#3AA655",
    pred:`<path d="M40 10 C40 -1 60 -1 60 10 C54 7 46 7 40 10Z" fill="#F6CB2F" stroke="#B58A12" stroke-width="2"/>`})}`;
K.play_football = `<path d="M10 70 V20 H90 V70" fill="none" stroke="#fff" stroke-width="7"/><path d="M10 70 V20 H90 V70" fill="none" stroke="#9FB3C8" stroke-width="7" opacity=".0"/>
  <g stroke="#B9C2CD" stroke-width="1.6" fill="none"><path d="M24 22 V70 M38 22 V70 M50 22 V70 M62 22 V70 M76 22 V70 M12 34 H88 M12 46 H88 M12 58 H88"/></g>
  <path d="M10 72 V20 H90 V72" fill="none" stroke="#8FA3B8" stroke-width="8"/><path d="M10 72 V20 H90 V72" fill="none" stroke="#fff" stroke-width="4.5"/>
  <path d="M2 72 H98 V88 a8 8 0 0 1 -8 8 H10 a8 8 0 0 1 -8 -8Z" fill="#3AA655" stroke="#27703A" stroke-width="3"/>${LOPTA(50,70,17)}`;
K.play_the_guitar = `${T(42,92,30)}<g transform="rotate(38 50 50)"><rect x="45" y="-6" width="10" height="52" fill="#6E4520" stroke="#4A2C10" stroke-width="2.6"/><rect x="42" y="-18" width="16" height="16" rx="4" fill="#3A4656" stroke="${INK}" stroke-width="2.6"/>
  ${U(`<circle cx="50" cy="50" r="17"/><circle cx="50" cy="74" r="23"/>`, "#E7A64B", "#8B5A2B")}<circle cx="50" cy="60" r="8" fill="#5A3418"/><rect x="40" y="80" width="20" height="5" rx="2" fill="#5A3418"/>
  <path d="M47 -4 V82 M50 -4 V82 M53 -4 V82" stroke="#FFF6EA" stroke-width="1.1"/>${LESK("M32 70 C32 62 36 58 40 56",3,.4)}</g>${NOTA(12,18,"#E0322B",.9)}`;
K.ski = `<path d="M2 78 L98 92 V98 H2Z" fill="#EAF4FB"/><path d="M14 80 L80 90 q8 1 10 -5" fill="none" stroke="#E0322B" stroke-width="4.5"/><path d="M26 54 L22 82 M72 52 L80 86" stroke="#55606E" stroke-width="2.6"/>
  ${FIG({h:[50,18], t:[50,36,46,54], ruky:["50 38 62 44 72 52","50 38 36 46 26 54"], nohy:["44 58 52 70 44 82","48 58 58 70 54 84"], tricko:"#2F6FDE", gate:"#3A4656",
    pred:`<path d="M39.5 15 C39 2 61 2 60.5 15 C54 11 46 11 39.5 15Z" fill="#E0322B" stroke="#9E1F1A" stroke-width="2"/><circle cx="50" cy="4" r="3.5" fill="#fff" stroke="#B9C2CD" stroke-width="1.5"/><rect x="41" y="15" width="18" height="6.5" rx="3" fill="#BFE3FA" stroke="#2F6FDE" stroke-width="1.8"/>`})}`;

/* =================== LEKCIA 6: morské zvieratá =================== */
const BUBLINY = (x,y) => `<g fill="none" stroke="#7FB8E8" stroke-width="2.2"><circle cx="${x}" cy="${y}" r="3.5"/><circle cx="${x+7}" cy="${y-10}" r="2.4"/></g>`;
K.dolphin = `${U(`<path d="M26 60 C16 54 10 46 3 48 C8 55 8 60 5 68 C12 69 20 66 26 64Z"/><path d="M42 36 C44 24 52 18 62 16 C59 24 60 30 64 34Z"/>
    <ellipse cx="50" cy="48" rx="33" ry="16" transform="rotate(-20 50 48)"/><ellipse cx="86" cy="35" rx="10" ry="4.8" transform="rotate(-12 86 35)"/>`, "#6FA8DC", "#2F6FA8")}
  <path d="M30 62 C44 60 62 52 76 40 C74 52 52 66 30 62Z" fill="#DCEFFB"/><path d="M56 54 C58 64 54 72 46 76 C46 68 46 60 48 54Z" fill="#6FA8DC" stroke="#2F6FA8" stroke-width="2.6"/>
  ${OKO(72,35,2.6)}<path d="M80 39 q6 1 12 -3" stroke="#2F6FA8" stroke-width="1.8" fill="none"/>
  <path d="M6 84 q8 -8 16 0 t16 0 t16 0 t16 0 t16 0 t16 0" fill="none" stroke="#4FA3E8" stroke-width="4.5"/><g fill="#4FA3E8"><circle cx="18" cy="72" r="2.6"/><circle cx="34" cy="76" r="2"/></g>`;
K.fish = `${BUBLINY(84,28)}<path d="M26 50 L6 30 C4 44 4 56 6 70Z" fill="#F6CB2F" stroke="#C2621A" stroke-width="3"/><path d="M44 28 C50 16 62 14 68 18 C64 22 62 26 62 30Z M46 72 C50 80 58 82 62 80 C60 76 60 74 58 70Z" fill="#F6CB2F" stroke="#C2621A" stroke-width="2.6"/>
  <ellipse cx="52" cy="50" rx="34" ry="23" fill="#F28B24" stroke="#C2621A" stroke-width="3"/><path d="M40 30 C46 42 46 58 40 70 M54 28 C60 42 60 58 54 72" fill="none" stroke="#fff" stroke-width="5" opacity=".85"/>
  <circle cx="72" cy="44" r="5.5" fill="#fff"/>${OKO(73,44,3)}${USMEV(78,56,4,3)}`;
K.seal = `${T(46,90,36)}<path d="M18 70 C8 64 4 70 2 76 C8 78 10 82 8 88 C16 88 22 82 24 76Z" fill="#8A97A8" stroke="#55606E" stroke-width="2.6"/>
  ${U(`<ellipse cx="42" cy="70" rx="30" ry="16"/><path d="M52 66 C54 50 58 40 64 36 L82 46 C78 60 72 78 60 84Z"/><circle cx="72" cy="34" r="17"/>`, "#AEB9C7", "#55606E")}
  <path d="M50 76 C56 84 66 88 74 86 C72 80 66 76 58 72Z" fill="#8A97A8" stroke="#55606E" stroke-width="2.6"/><ellipse cx="78" cy="40" rx="8" ry="6" fill="#E9EEF3"/>
  <ellipse cx="79" cy="37" rx="3" ry="2.2" fill="${INK}"/><path d="M84 40 l8 -2 M84 43 l8 2 M72 41 l-7 0" stroke="#55606E" stroke-width="1.4"/>${OKO(68,29,2.8)}`;
K.penguin = `${T(50,93,26)}<g fill="#F28B24" stroke="#B85F12" stroke-width="2.4"><ellipse cx="38" cy="90" rx="10" ry="4.5"/><ellipse cx="62" cy="90" rx="10" ry="4.5"/></g>
  <path d="M24 46 C12 56 12 68 16 74 C22 68 26 62 28 54Z M76 46 C88 56 88 68 84 74 C78 68 74 62 72 54Z" fill="#2B3442" stroke="${INK}" stroke-width="2.6"/>
  <path d="M50 8 C30 8 22 28 22 52 C22 76 32 90 50 90 C68 90 78 76 78 52 C78 28 70 8 50 8Z" fill="#2B3442" stroke="${INK}" stroke-width="3"/>
  <path d="M50 26 C44 18 32 22 32 34 C32 40 30 44 30 56 C30 76 38 86 50 86 C62 86 70 76 70 56 C70 44 68 40 68 34 C68 22 56 18 50 26Z" fill="#fff"/>
  <path d="M44 40 H56 L50 48Z" fill="#F28B24" stroke="#B85F12" stroke-width="2.2"/>${OCI(41,59,33,2.8)}${LICKA(36,64,41,3.4)}`;
K.turtle = `${T(48,90,36)}<g fill="#7BC67E" stroke="#27703A" stroke-width="2.8"><rect x="20" y="66" width="13" height="20" rx="6"/><rect x="56" y="66" width="13" height="20" rx="6"/><path d="M14 66 L4 72 L14 74Z"/></g>
  ${U(`<circle cx="84" cy="54" r="12"/><rect x="66" y="54" width="18" height="14" rx="4"/>`, "#7BC67E", "#27703A")}
  <path d="M10 70 C10 40 26 24 44 24 C62 24 78 40 78 70Z" fill="#3AA655" stroke="#27703A" stroke-width="3"/><rect x="8" y="64" width="72" height="10" rx="5" fill="#8BD08E" stroke="#27703A" stroke-width="2.8"/>
  <path d="M44 32 L56 40 L54 54 H34 L32 40Z M32 40 L20 44 M56 40 L68 44 M34 54 L26 62 M54 54 L62 62 M44 32 V26" fill="#5DBB63" stroke="#27703A" stroke-width="2.4"/>${OKO(87,51,2.6)}${USMEV(89,58,3.5,2.5)}`;
const SLON = `${T(50,93,38)}<g fill="#9AA6B5" stroke="#5F6B7A" stroke-width="3"><rect x="20" y="62" width="15" height="30" rx="5"/><rect x="50" y="62" width="15" height="30" rx="5"/></g>
  <path d="M14 46 C6 50 6 60 10 66" fill="none" stroke="#5F6B7A" stroke-width="3.5"/>
  ${U(`<rect x="12" y="30" width="62" height="46" rx="22"/><circle cx="72" cy="38" r="22"/>`, "#AEB9C7", "#5F6B7A")}
  <path d="M84 48 C90 60 88 74 82 82 C80 86 86 90 90 86" fill="none" stroke="#5F6B7A" stroke-width="12"/><path d="M84 48 C90 60 88 74 82 82 C80 86 86 90 90 86" fill="none" stroke="#AEB9C7" stroke-width="6.5"/>
  <path d="M60 22 C46 14 40 30 46 44 C50 54 60 54 64 46Z" fill="#C7D0DB" stroke="#5F6B7A" stroke-width="3"/><path d="M78 58 q-4 6 -10 4" stroke="#fff" stroke-width="4" fill="none"/>${OKO(78,36,2.8)}${LICKA(74,74,45,3.4)}`;
const MYS = `${T(48,90,30)}<path d="M20 74 C6 74 2 62 8 54" fill="none" stroke="#E79AB2" stroke-width="4"/>
  ${U(`<ellipse cx="46" cy="66" rx="30" ry="20"/><path d="M60 50 L92 66 L64 82Z"/>`, "#B9C2CD", "#6B7785")}
  <circle cx="52" cy="40" r="15" fill="#B9C2CD" stroke="#6B7785" stroke-width="3"/><circle cx="52" cy="40" r="8.5" fill="#F7A8C4"/><circle cx="92" cy="66" r="4" fill="#E0567F"/>
  <path d="M82 68 l8 8 M80 72 l4 10" stroke="#6B7785" stroke-width="1.5"/>${OKO(72,58,3)}<g fill="#F7A8C4" stroke="#6B7785" stroke-width="2.2"><ellipse cx="34" cy="86" rx="7" ry="3.5"/><ellipse cx="58" cy="86" rx="7" ry="3.5"/></g>`;
K.elephant = SLON; K.mouse = MYS;
K.big = `<g transform="translate(-2 -4) scale(1.04)">${SLON}</g>`;
K.small = `<g transform="translate(29 34) scale(.42)">${MYS}</g>`;
K.fast = `<path d="M2 30 H24 M4 44 H20 M2 58 H16" stroke="#9FB3C8" stroke-width="4.5" fill="none"/>${T(54,90,34)}
  <path d="M26 46 C14 42 10 30 16 24" fill="none" stroke="#C98A1A" stroke-width="5.5"/>
  <g fill="#F2B544" stroke="#A8700F" stroke-width="2.6"><path d="M32 56 L14 76 L20 80 L40 64Z"/><path d="M66 56 L88 74 L84 80 L60 66Z"/><path d="M38 58 L30 84 L37 85 L48 62Z" opacity=".85"/><path d="M60 58 L74 84 L67 86 L52 64Z" opacity=".85"/></g>
  ${U(`<rect x="24" y="38" width="50" height="24" rx="12"/><circle cx="78" cy="38" r="14"/>`, "#F2B544", "#A8700F")}
  <path d="M68 28 L66 18 L76 24Z M84 26 L90 18 L91 29Z" fill="#F2B544" stroke="#A8700F" stroke-width="2.4"/>
  <g fill="#5A3418"><circle cx="34" cy="46" r="2.4"/><circle cx="44" cy="54" r="2.4"/><circle cx="46" cy="44" r="2.2"/><circle cx="56" cy="50" r="2.4"/><circle cx="60" cy="42" r="2"/><circle cx="36" cy="56" r="1.8"/><circle cx="68" cy="30" r="1.6"/></g>
  <ellipse cx="84" cy="43" rx="7" ry="5.5" fill="#FFF3D6"/><path d="M82 40 h5 l-2.5 3Z" fill="${INK}"/><path d="M79 34 V42" stroke="#5A3418" stroke-width="1.6"/>${OKO(77,34,2.4)}`;
K.slow = `${T(48,90,38)}<path d="M72 44 L74 22 M82 46 L90 26" stroke="#B58A4A" stroke-width="3.5" fill="none"/><circle cx="74" cy="20" r="4" fill="#E7C08A" stroke="#B58A4A" stroke-width="2"/><circle cx="91" cy="24" r="4" fill="#E7C08A" stroke="#B58A4A" stroke-width="2"/>
  <path d="M6 86 C6 78 14 74 24 74 H66 C66 60 68 46 78 44 C88 42 94 52 90 62 C86 72 88 78 92 82 C94 86 90 88 86 88 H10 C8 88 6 88 6 86Z" fill="#E7C08A" stroke="#B58A4A" stroke-width="3"/>
  <circle cx="40" cy="54" r="27" fill="#F28B24" stroke="#B85F12" stroke-width="3"/><path d="M40 54 m0 -18 a18 18 0 1 1 -18 18 a12 12 0 1 1 12 12 a6.5 6.5 0 1 1 6.5 -6.5" fill="none" stroke="#B85F12" stroke-width="3.5"/>
  ${OKO(82,56,2.4)}${USMEV(86,66,3.5,2.5)}`;
K.octopus = `<g fill="none" stroke="#B8437A" stroke-width="12"><path d="M30 60 C22 70 12 70 10 82 M40 66 C36 78 28 82 30 92 M50 68 V92 M60 66 C64 78 72 82 70 92 M70 60 C78 70 88 70 90 82"/></g>
  <g fill="none" stroke="#F27DB3" stroke-width="7"><path d="M30 60 C22 70 12 70 10 82 M40 66 C36 78 28 82 30 92 M50 68 V92 M60 66 C64 78 72 82 70 92 M70 60 C78 70 88 70 90 82"/></g>
  <path d="M50 6 C28 6 18 22 18 42 C18 60 30 70 50 70 C70 70 82 60 82 42 C82 22 72 6 50 6Z" fill="#F27DB3" stroke="#B8437A" stroke-width="3"/>${LESK("M28 30 C30 20 38 14 46 13",4,.45)}
  ${OCI(40,60,44,3.4)}${USMEV(50,53,5,4)}${LICKA(31,69,52,4.2)}`;
K.crab = `${T(50,90,34)}<g fill="none" stroke="#9E1F1A" stroke-width="4.5"><path d="M28 66 L14 72 L10 84 M32 72 L22 80 L22 90 M72 66 L86 72 L90 84 M68 72 L78 80 L78 90 M26 50 L16 40 M74 50 L84 40"/></g>
  <g fill="#E0322B" stroke="#9E1F1A" stroke-width="2.8"><path d="M18 40 C4 36 2 20 14 12 C14 20 18 22 22 22 C20 16 24 10 30 12 C34 24 30 38 18 40Z"/><path d="M82 40 C96 36 98 20 86 12 C86 20 82 22 78 22 C80 16 76 10 70 12 C66 24 70 38 82 40Z"/></g>
  <path d="M40 44 V30 M60 44 V30" stroke="#9E1F1A" stroke-width="3.5"/><circle cx="40" cy="28" r="6" fill="#fff" stroke="#9E1F1A" stroke-width="2.4"/><circle cx="60" cy="28" r="6" fill="#fff" stroke="#9E1F1A" stroke-width="2.4"/><circle cx="41" cy="28" r="2.6" fill="${INK}"/><circle cx="61" cy="28" r="2.6" fill="${INK}"/>
  <ellipse cx="50" cy="60" rx="30" ry="20" fill="#E0322B" stroke="#9E1F1A" stroke-width="3"/>${LESK("M28 54 C32 46 40 43 48 43",3.5,.4)}${USMEV(50,64,6,5)}${LICKA(36,64,62,4)}`;
K.whale = `<path d="M62 22 C62 12 56 8 50 10 M62 22 C62 10 70 6 76 10 M62 22 V12" fill="none" stroke="#4FA3E8" stroke-width="4"/>
  <path d="M14 56 C4 46 2 34 6 26 C10 32 14 34 20 34 C22 28 28 24 34 26 C32 36 28 46 24 54Z" fill="#2F6FDE" stroke="#1E4AA0" stroke-width="3"/>
  <path d="M12 56 C12 36 38 26 60 26 C82 26 96 40 96 56 C96 76 78 86 54 86 C30 86 12 76 12 56Z" fill="#2F6FDE" stroke="#1E4AA0" stroke-width="3"/>
  <path d="M30 76 C44 84 70 86 86 74 C92 68 94 62 95 56 C80 66 50 70 30 76Z" fill="#CFE6FA"/><path d="M48 80 C50 90 58 94 64 92 C62 88 60 84 60 80Z" fill="#2F6FDE" stroke="#1E4AA0" stroke-width="2.6"/>
  ${OKO(78,50,3)}<path d="M82 62 q6 0 10 -4" stroke="#1E4AA0" stroke-width="2" fill="none"/>${LICKA(72,72,58,3.5)}${LESK("M28 44 C36 36 48 33 58 33",3.5,.35)}`;
K.shark = `<path d="M22 50 C12 40 8 28 4 22 C14 24 22 30 28 40Z M22 54 C14 62 10 70 6 78 C16 76 24 70 28 62Z" fill="#8A97A8" stroke="#4E5968" stroke-width="3"/>
  <path d="M44 34 C46 20 52 12 62 8 C60 18 62 26 66 32Z" fill="#8A97A8" stroke="#4E5968" stroke-width="3"/>
  <path d="M20 52 C30 36 52 30 70 32 C84 34 94 42 97 50 C92 62 78 70 60 70 C44 70 28 64 20 52Z" fill="#9AA6B5" stroke="#4E5968" stroke-width="3"/>
  <path d="M26 56 C40 66 62 70 80 62 C88 58 94 54 96 50 C80 54 50 58 26 56Z" fill="#F1F4F7"/><path d="M52 62 C52 72 46 80 40 82 C40 74 42 68 44 62Z" fill="#8A97A8" stroke="#4E5968" stroke-width="2.6"/>
  <path d="M70 56 C76 60 86 58 92 52" fill="none" stroke="#4E5968" stroke-width="2"/><path d="M73 57.5 l2.5 4 2.5 -3.5 2.5 3.5 2.5 -4 2.5 3 2 -4.5" fill="#fff" stroke="#4E5968" stroke-width="1.2"/>
  <path d="M56 44 v8 M61 44 v8 M66 45 v7" stroke="#4E5968" stroke-width="1.8"/>${OKO(80,43,2.6)}${BUBLINY(88,22)}`;
K.shell = `${T(50,92,30)}<path d="M38 80 H62 L66 90 H34Z" fill="#F2A07A" stroke="#B85F3A" stroke-width="3"/>
  <path d="M50 84 C26 84 8 64 8 44 C8 36 14 32 18 34 C18 24 26 18 32 22 C34 12 44 10 50 16 C56 10 66 12 68 22 C74 18 82 24 82 34 C86 32 92 36 92 44 C92 64 74 84 50 84Z" fill="#F7B8A0" stroke="#B85F3A" stroke-width="3"/>
  <path d="M50 82 V18 M50 82 L32 24 M50 82 L68 24 M50 82 L18 36 M50 82 L82 36" fill="none" stroke="#B85F3A" stroke-width="2.4"/>${LESK("M20 48 C22 42 26 38 30 36",3.5,.5)}`;

/* =================== LEKCIA 7: moje telo =================== */
const OKO_V = (x) => `<path d="M${x-17} 52 C${x-9} 34 ${x+9} 34 ${x+17} 52 C${x+9} 66 ${x-9} 66 ${x-17} 52Z" fill="#fff" stroke="${INK}" stroke-width="3"/><circle cx="${x}" cy="51" r="9.5" fill="#4F8FE8" stroke="#1E4AA0" stroke-width="2"/><circle cx="${x}" cy="51" r="4.5" fill="${INK}"/><circle cx="${x+3.5}" cy="47" r="2.4" fill="#fff"/>
  <path d="M${x-15} 32 Q${x} 22 ${x+15} 32" fill="none" stroke="#6B4423" stroke-width="4.5"/>`;
K.eyes = OKO_V(28) + OKO_V(72);
K.ears = `<path d="M56 10 C34 10 22 28 24 48 C26 62 36 66 38 76 C40 90 56 94 64 84 C70 76 64 70 70 60 C76 50 82 42 80 30 C78 18 68 10 56 10Z" fill="${KOZA}" stroke="${KOZA_O}" stroke-width="3"/>
  <path d="M38 46 C34 32 44 22 56 22 C66 22 72 30 70 38 M52 70 C56 62 50 56 52 48 C54 40 62 40 62 46" fill="none" stroke="${KOZA_O}" stroke-width="3.5"/>
  <path d="M6 36 q-4 10 0 20 M14 40 q-2 6 0 12" fill="none" stroke="#F28B24" stroke-width="3.2"/>`;
K.nose = `<path d="M43 10 C44 36 28 54 24 66 C20 80 34 86 42 80 C46 87 54 87 58 80 C66 86 80 80 76 66 C72 54 56 36 57 10Z" fill="${KOZA}" stroke="${KOZA_O}" stroke-width="3"/>
  <ellipse cx="38" cy="73" rx="5" ry="3.5" fill="#8B4A2A" transform="rotate(-15 38 73)"/><ellipse cx="62" cy="73" rx="5" ry="3.5" fill="#8B4A2A" transform="rotate(15 62 73)"/>${LESK("M50 22 V56",4,.45)}`;
const USTA = (jazyk) => `<path d="M10 42 C28 38 40 32 50 40 C60 32 72 38 90 42 C80 70 64 80 50 80 C36 80 20 70 10 42Z" fill="#E0567F" stroke="#A62A52" stroke-width="3"/>
  <path d="M20 45 C40 46 60 46 80 45 C72 62 62 70 50 70 C38 70 28 62 20 45Z" fill="#7A1F2E"/><path d="M24 45.5 H76 C74 51 72 54 70 55 H30 C28 54 26 51 24 45.500Z" fill="#fff"/>
  <path d="M34 46 V55 M42 46 V55 M50 46 V55 M58 46 V55 M66 46 V55" stroke="#C9D5E2" stroke-width="1.4"/>${jazyk || `<path d="M38 68 C42 62 58 62 62 68 C58 70 54 70 50 70 C46 70 42 70 38 68Z" fill="#F27DB3"/>`}`;
K.mouth = USTA();
K.tongue = `<g transform="translate(0 -12)">${USTA(`<path d="M36 60 C36 84 40 98 50 98 C60 98 64 84 64 60 C56 56 44 56 36 60Z" fill="#F27DB3" stroke="#B8437A" stroke-width="3"/><path d="M50 64 V88" stroke="#B8437A" stroke-width="2.4"/>`)}</g>`;
K.arms = `<path d="M30 74 L12 62 L18 38 M70 74 L88 62 L82 38" fill="none" stroke="${KOZA_O}" stroke-width="13"/><path d="M30 74 L12 62 L18 38 M70 74 L88 62 L82 38" fill="none" stroke="${KOZA}" stroke-width="8.5"/>
  <circle cx="18" cy="34" r="7.5" fill="${KOZA}" stroke="${KOZA_O}" stroke-width="2.4"/><circle cx="82" cy="34" r="7.5" fill="${KOZA}" stroke="${KOZA_O}" stroke-width="2.4"/>
  <g transform="translate(0 6)">${PLECIA("#3AA655","#27703A")}</g>${HLAVA(50,44,19,"kratke","#6B4423")}`;
K.hands = `<g transform="translate(-3 24) scale(.56) rotate(-8 50 60)">${RUKA}</g><g transform="translate(103 24) scale(-.56 .56) rotate(-8 50 60)">${RUKA}</g>`;
K.fingers = `<ellipse cx="50" cy="26" rx="34" ry="16" fill="#F6CB2F" opacity=".45"/>${RUKA}<g fill="#FBE3D0" stroke="${KOZA_O}" stroke-width="1.4"><rect x="31.5" y="28" width="5.5" height="7" rx="2.5"/><rect x="43" y="19" width="5.5" height="7" rx="2.5"/><rect x="54.5" y="22" width="5.5" height="7" rx="2.5"/><rect x="66" y="31" width="5" height="7" rx="2.5"/></g>`;
K.thumb = `<rect x="6" y="50" width="20" height="38" rx="5" fill="#2F6FDE" stroke="#1E4AA0" stroke-width="3"/>
  ${U(`<rect x="36" y="8" width="18" height="46" rx="9" transform="rotate(10 45 50)"/><rect x="26" y="44" width="54" height="46" rx="14"/>`, KOZA, KOZA_O)}
  <path d="M54 56 H78 M54 67 H80 M54 78 H78" stroke="${KOZA_O}" stroke-width="2.6" fill="none"/><path d="M82 20 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2Z" fill="#F6CB2F"/>`;
K.legs = `${T(50,94,30)}<path d="M38 40 V82 M62 40 V82" stroke="${KOZA_O}" stroke-width="15"/><path d="M38 40 V82 M62 40 V82" stroke="${KOZA}" stroke-width="10.5"/>
  <path d="M22 8 H78 V38 a4 4 0 0 1 -4 4 H54 L50 30 L46 42 H26 a4 4 0 0 1 -4 -4Z" fill="#2F6FDE" stroke="#1E4AA0" stroke-width="3"/>
  <g fill="#fff" stroke="#9FB3C8" stroke-width="2.4"><rect x="30" y="72" width="16" height="12" rx="3"/><rect x="54" y="72" width="16" height="12" rx="3"/></g>
  <g fill="#E0322B" stroke="#9E1F1A" stroke-width="2.8"><path d="M28 82 H47 V92 H22 C22 86 24 83 28 82Z"/><path d="M72 82 H53 V92 H78 C78 86 76 83 72 82Z"/></g>`;
const CHODIDLO = `<path d="M50 94 C34 94 30 80 32 66 C34 52 36 42 46 40 C58 38 69 44 69 58 C69 72 66 94 50 94Z" fill="${KOZA}" stroke="${KOZA_O}" stroke-width="4"/>
  <g fill="${KOZA}" stroke="${KOZA_O}" stroke-width="4"><circle cx="40" cy="31" r="8"/><circle cx="52.5" cy="27" r="6"/><circle cx="62" cy="29" r="5.2"/><circle cx="69.5" cy="33.5" r="4.6"/><circle cx="74.5" cy="40.5" r="4"/></g>`;
K.feet = `<g transform="translate(-8 10) scale(.8)">${CHODIDLO}</g><g transform="translate(108 10) scale(-.8 .8)">${CHODIDLO}</g>`;
K.monster = `${T(50,94,28)}<path d="M30 14 L22 2 L38 8Z M70 14 L78 2 L62 8Z" fill="#F6CB2F" stroke="#B58A12" stroke-width="2.6"/>
  <path d="M20 60 C8 58 6 70 12 76 M80 60 C92 58 94 70 88 76" fill="none" stroke="#5E3190" stroke-width="9"/><path d="M20 60 C8 58 6 70 12 76 M80 60 C92 58 94 70 88 76" fill="none" stroke="#8A4FC4" stroke-width="4.5"/>
  <path d="M50 8 C28 8 18 24 18 46 V78 C18 86 24 92 30 92 C34 92 36 88 40 88 C44 88 46 92 50 92 C54 92 56 88 60 88 C64 88 66 92 70 92 C76 92 82 86 82 78 V46 C82 24 72 8 50 8Z" fill="#8A4FC4" stroke="#5E3190" stroke-width="3"/>
  <g fill="#fff" stroke="#5E3190" stroke-width="2.4"><circle cx="32" cy="38" r="9"/><circle cx="50" cy="30" r="10"/><circle cx="68" cy="38" r="9"/></g><circle cx="33" cy="39" r="4" fill="${INK}"/><circle cx="50" cy="31" r="4.5" fill="${INK}"/><circle cx="67" cy="39" r="4" fill="${INK}"/>
  <path d="M30 58 C40 74 60 74 70 58Z" fill="#4A1F6E" stroke="#5E3190" stroke-width="2.4"/><path d="M36 59 l4 6 4 -6Z M56 59 l4 6 4 -6Z" fill="#fff"/>
  <g fill="#B88AE0"><circle cx="28" cy="78" r="3"/><circle cx="72" cy="76" r="3"/><circle cx="50" cy="82" r="2.4"/></g>`;
K.teeth = `<path d="M50 24 C40 10 14 12 16 36 C17 50 24 56 26 68 C28 80 30 92 38 92 C46 92 44 70 50 70 C56 70 54 92 62 92 C70 92 72 80 74 68 C76 56 83 50 84 36 C86 12 60 10 50 24Z" fill="#fff" stroke="#8FA3B8" stroke-width="3"/>
  ${OCI(40,60,40,2.8)}${USMEV(50,48,6,5)}${LICKA(32,68,48,3.8)}<path d="M84 8 l2.5 6 6 2.5 -6 2.5 -2.5 6 -2.5 -6 -6 -2.5 6 -2.500Z" fill="#F6CB2F"/><path d="M12 66 l1.8 4 4 1.8 -4 1.8 -1.8 4 -1.8 -4 -4 -1.8 4 -1.800Z" fill="#4FA3E8"/>`;
K.hair = `<path d="M22 44 C16 6 84 6 78 44 C82 60 84 76 78 92 C70 96 62 92 60 84 L40 84 C38 92 30 96 22 92 C16 76 18 60 22 44Z" fill="#8B5A2B" stroke="#5A3418" stroke-width="3"/>
  <path d="M30 52 C28 66 28 78 30 88 M70 52 C72 66 72 78 70 88 M24 60 C22 70 23 80 25 88" fill="none" stroke="#B5804A" stroke-width="2.6"/>
  ${HLAVA(50,46,21,"mama","#8B5A2B")}<g transform="rotate(24 84 30)"><rect x="76" y="14" width="18" height="12" rx="3" fill="#F27DB3" stroke="#B8437A" stroke-width="2.4"/><path d="M79 26 v8 M83 26 v8 M87 26 v8 M91 26 v8" stroke="#B8437A" stroke-width="2"/></g>`;
K.face = HLAVA(50, 52, 38, "kratke", "#6B4423");

/* =================== LEKCIA 8: rodina a povolania =================== */
K.mum = PORTRET("mama", "#8B5A2B", "#F27DB3", "#B8437A", `<path d="M50 80 C46 74 40 78 42 83 C43 87 50 91 50 91 C50 91 57 87 58 83 C60 78 54 74 50 80Z" fill="#fff"/>`);
K.dad = PORTRET("otec", "#3F2A1A", "#2F6FDE", "#1E4AA0", `<path d="M42 70 L50 80 L58 70" fill="none" stroke="#fff" stroke-width="3.5"/>`, `<path d="M-13 6 C-12 16 -6 20 0 20 C6 20 12 16 13 6 C10 12 5 14 0 14 C-5 14 -10 12 -13 6Z" fill="#3F2A1A" opacity=".75"/>`);
K.grandma = PORTRET("babka", "#D5DBE2", "#8A4FC4", "#5E3190", `<path d="M40 70 C44 78 56 78 60 70" fill="none" stroke="#fff" stroke-width="3"/><circle cx="50" cy="80" r="2.6" fill="#F6CB2F"/>`);
K.grandpa = PORTRET("dedko", "#D5DBE2", "#3AA655", "#27703A", `<path d="M44 70 L50 77 L56 70 M50 77 V96" fill="none" stroke="#27703A" stroke-width="2.4"/>`);
const DIETA = (vlasy, fv, f, s) => `<path d="M30 97 C30 82 40 76 50 76 C60 76 70 82 70 97Z" fill="${f}" stroke="${s}" stroke-width="3"/>${HLAVA(50, 48, 27, vlasy, fv)}`;
K.sister = DIETA("dlhe", "#E0A040", "#F28B24", "#B85F12");
K.brother = DIETA("kratke", "#6B4423", "#3AA655", "#27703A");
K.builder = PORTRET("ziadne", "", "#F28B24", "#B85F12", `<path d="M36 72 V96 M64 72 V96" stroke="#F6CB2F" stroke-width="5"/><path d="M28 86 H72" stroke="#F6CB2F" stroke-width="4"/>`,
  `<g transform="translate(0 -5)"><path d="M-17 -4 C-17 -24 17 -24 17 -4Z" fill="#F6CB2F" stroke="#B58A12" stroke-width="2"/><rect x="-21" y="-6.5" width="42" height="5.5" rx="2.7" fill="#F6CB2F" stroke="#B58A12" stroke-width="2"/><path d="M-3 -18 V-6 M3 -18 V-6" stroke="#B58A12" stroke-width="1.6"/></g>`);
K.cook = PORTRET("ziadne", "", "#fff", "#8FA3B8", `<g fill="#8FA3B8"><circle cx="44" cy="80" r="2"/><circle cx="56" cy="80" r="2"/><circle cx="44" cy="90" r="2"/><circle cx="56" cy="90" r="2"/></g><path d="M42 70 L50 76 L58 70" fill="#E0322B" stroke="#9E1F1A" stroke-width="1.6"/>`,
  `<g fill="#fff" stroke="#8FA3B8" stroke-width="2"><circle cx="-10" cy="-19" r="7.5"/><circle cx="10" cy="-19" r="7.5"/><circle cx="0" cy="-23" r="9"/><rect x="-13" y="-17" width="26" height="12" rx="2"/></g><g fill="#fff"><circle cx="-10" cy="-19" r="6.5"/><circle cx="10" cy="-19" r="6.5"/><circle cx="0" cy="-23" r="8"/></g>`);
K.firefighter = PORTRET("ziadne", "", "#3A4656", INK, `<path d="M27 84 H73 M36 72 V96 M64 72 V96" stroke="#F6CB2F" stroke-width="4.5" fill="none"/>`,
  `<g transform="translate(0 -5)"><path d="M-18 -3 C-18 -26 18 -26 18 -3Z" fill="#E0322B" stroke="#9E1F1A" stroke-width="2"/><path d="M-22 -4 H22 L24 0 H-24Z" fill="#E0322B" stroke="#9E1F1A" stroke-width="2"/><path d="M0 -17 l3.5 3 v5 l-3.5 3 l-3.5 -3 v-5Z" fill="#F6CB2F" stroke="#B58A12" stroke-width="1.3"/></g>`);
K.pilot = PORTRET("ziadne", "", "#27407A", "#16264F", `<path d="M43 69 L50 77 L57 69Z" fill="#fff"/><path d="M50 76 L47 82 L50 94 L53 82Z" fill="#E0322B"/><path d="M28 84 H40 M60 84 H72" stroke="#F6CB2F" stroke-width="3"/>`,
  `<path d="M-17 -6 C-20 -22 20 -22 17 -6Z" fill="#27407A" stroke="#16264F" stroke-width="2"/><path d="M-18 -6.5 H18 C18 -3 12 -1 0 -1 C-12 -1 -18 -3 -18 -6.500Z" fill="#16264F"/><path d="M0 -17 l2 3 6 1 -4 3.5 -4 .5 -4 -.5 -4 -3.5 6 -1Z" fill="#F6CB2F"/>`);
K.doctor = PORTRET("mama", "#3F2A1A", "#fff", "#8FA3B8", `<path d="M43 69 L50 80 L57 69" fill="#BFE3FA" stroke="#8FA3B8" stroke-width="2"/><path d="M38 72 C36 84 40 90 46 90 M62 72 C64 82 62 86 60 88" fill="none" stroke="#3A4656" stroke-width="2.6"/><circle cx="59" cy="90" r="4" fill="#B9C2CD" stroke="#3A4656" stroke-width="2"/>
  <g fill="#E0322B"><rect x="30" y="82" width="3" height="9" /><rect x="27" y="85" width="9" height="3"/></g>`);
K.baby = `<path d="M22 97 C22 80 36 74 50 74 C64 74 78 80 78 97Z" fill="#BFE3FA" stroke="#5C93CC" stroke-width="3"/>
  ${HLAVA(50, 46, 30, "ziadne", "", `<path d="M-2 -16 C-4 -22 4 -24 4 -19 C4 -16 0 -16 1 -13" fill="none" stroke="#B5804A" stroke-width="1.8"/><circle cx="0" cy="10" r="5.5" fill="#4FA3E8" stroke="#1E4AA0" stroke-width="1.3"/><circle cx="0" cy="10" r="2" fill="#fff"/>`)}
  <path d="M38 78 C40 90 60 90 62 78Z" fill="#fff" stroke="#5C93CC" stroke-width="2.4"/>`;
K.balloon = `<path d="M50 70 C46 80 56 84 50 96" fill="none" stroke="#6B7785" stroke-width="2.4"/><path d="M45 72 H55 L50 66Z" fill="#E0322B" stroke="#9E1F1A" stroke-width="2.4"/>
  <path d="M50 6 C30 6 20 22 20 38 C20 54 36 68 50 68 C64 68 80 54 80 38 C80 22 70 6 50 6Z" fill="#E0322B" stroke="#9E1F1A" stroke-width="3"/>${LESK("M30 34 C30 24 36 16 44 14",4.5,.5)}`;
K.party = `<g transform="translate(8 18) scale(.5)">${K.balloon.replace(/#E0322B/g,"#2F6FDE").replace(/#9E1F1A/g,"#1E4AA0")}</g><g transform="translate(46 2) scale(.56)">${K.balloon}</g>
  <path d="M30 96 L44 46 L74 78Z" fill="#F6CB2F" stroke="#B58A12" stroke-width="3"/><path d="M35 78 L58 86 M39 62 L67 76" stroke="#8A4FC4" stroke-width="4"/><circle cx="44" cy="44" r="5" fill="#F27DB3" stroke="#B8437A" stroke-width="2.4"/>
  <g fill="#3AA655"><rect x="8" y="12" width="6" height="6" rx="1" transform="rotate(20 11 15)"/><rect x="86" y="62" width="6" height="6" rx="1" transform="rotate(40 89 65)"/></g><g fill="#F28B24"><circle cx="40" cy="10" r="3"/><circle cx="90" cy="88" r="3"/></g><path d="M80 44 q4 -4 8 0 t8 0" stroke="#E0322B" stroke-width="2.6" fill="none"/>`;

K.ball = LOPTA(50,50,36);
/*__DALSIE__*/

/* ---------- ktoré emoji ktorá kresba nahrádza (karty a slovník) ---------- */
const EMOJI = {
  "👋":"hello","🚪":"door","🌅":"good_morning","🌙":"moon","🎁":"present","☀️":"sun","☁️":"cloud","🌧️":"rain","☂️":"umbrella","🌈":"rainbow","❄️":"snow","🥵":"hot","🥶":"cold","🌬️":"wind",
  "✏️":"pencil","🖊️":"pen","📕":"book","📓":"notebook","🎒":"bag","📏":"ruler","🖍️":"crayon","🪑":"chair","🧑‍🏫":"teacher","✂️":"scissors","🏫":"school","🖌️":"paintbrush","🕒":"clock","🎨":"paint",
  "🐴":"horse","🐄":"cow","🐑":"sheep","🐐":"goat","🐔":"hen","🦆":"duck","🐶":"dog","🐱":"cat","🐰":"rabbit","🐦":"bird","🐷":"pig","🦜":"parrot","🐓":"rooster","🐤":"chick","🐥":"chick","🚜":"tractor",
  "🍰":"cake","🥕":"carrots","🥔":"potatoes","🍚":"rice","🥩":"meat","🍪":"biscuits","🥛":"milk","🍎":"apple","🧃":"juice","🍌":"banana","🍞":"bread","🧀":"cheese",
  "🚶":"walk","🏃":"run","🧗":"climb","🤾":"throw","💃":"dance","🎹":"play_the_piano","🥁":"play_the_drums","🏊":"swim","🚴":"ride_a_bike","🚲":"ride_a_bike","⚽":"ball","🎸":"play_the_guitar","⛷️":"ski",
  "🐬":"dolphin","🐟":"fish","🦭":"seal","🐧":"penguin","🐢":"turtle","🐘":"elephant","🐭":"mouse","🐆":"fast","🐌":"slow","🐙":"octopus","🦀":"crab","🐳":"whale","🦈":"shark","🐚":"shell",
  "👀":"eyes","👂":"ears","👃":"nose","👄":"mouth","👐":"hands","🖐️":"fingers","✋":"fingers","👾":"monster","🦷":"teeth","👅":"tongue","👍":"thumb","🙂":"face","😊":"face","😀":"face",
  "👵":"grandma","👴":"grandpa","👧":"sister","👦":"brother","👩":"mum","👷":"builder","🧑‍🍳":"cook","🧑‍🚒":"firefighter","🧑‍✈️":"pilot","🧑‍⚕️":"doctor","👶":"baby","🎈":"balloon","🎉":"party",
  /*__EMOJI__*/
};
const obal = (v, trieda) => `<svg${trieda ? ` class="${trieda}"` : ""} viewBox="0 0 100 100" aria-hidden="true" stroke-linejoin="round" stroke-linecap="round">${v}</svg>`;
const svg = (meno, trieda) => K[meno] ? obal(K[meno], trieda) : "";
const zEmoji = (e, trieda) => svg(EMOJI[e] || EMOJI[e + "️"] || EMOJI[e.replace(/️/g, "")], trieda);

/* V texte prvku vymení známe emoji za kresby (riadkové, veľké ako písmo). Text v data-atribútoch a v hlase ostáva. */
const RE = /\p{Extended_Pictographic}(?:️|‍\p{Extended_Pictographic}️?)*/gu;
function vymen(koren){
  if(!koren) return;
  const w = document.createTreeWalker(koren, NodeFilter.SHOW_TEXT), uzly = [];
  while(w.nextNode()){ const n = w.currentNode, p = n.parentNode;
    if(p && !p.closest("svg,script,style,textarea,option,.kr,[data-bez-kresieb]") && RE.test(n.nodeValue)) uzly.push(n);
    RE.lastIndex = 0; }
  for(const n of uzly){
    const t = n.nodeValue; let i = 0, zmena = false; const f = document.createDocumentFragment();
    for(const m of t.matchAll(RE)){
      const s = zEmoji(m[0]); if(!s) continue;
      if(m.index > i) f.append(t.slice(i, m.index));
      const sp = document.createElement("span"); sp.className = "kr"; sp.dataset.e = m[0]; sp.setAttribute("role", "img"); sp.innerHTML = s;
      f.append(sp); i = m.index + m[0].length; zmena = true;
    }
    if(!zmena) continue;
    if(i < t.length) f.append(t.slice(i));
    n.parentNode.replaceChild(f, n);
  }
}
return {svg, zEmoji, vymen, mena: () => Object.keys(K), EMOJI};
})();
