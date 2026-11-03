/* =====================================================================
   OBRÁZKY PRE PRACOVNÉ LISTY – vlastné jednoduché kresby (čiarou),
   aby sa dali vyfarbiť a tlačili sa lacno čiernobielo.
   Použitie v liste:  <svg class="pic"><use href="#iglu"/></svg>
   Každý obrázok má plochu 100 × 100.
   ===================================================================== */
(function(){
const O = {
  /* ---- predmety a veci ---- */
  iglu:  `<path d="M12 78 A38 38 0 0 1 88 78 Z"/><path d="M40 78 v-14 a10 10 0 0 1 20 0 v14"/>
         <path d="M14 66 H40 M60 66 H86 M21 54 H79 M31 45 H69"/><path d="M26 78 v-12 M74 78 v-12 M33 66 v-12 M67 66 v-12 M42 54 v-9 M58 54 v-9"/>`,
  list:  `<path d="M50 88 C20 70 18 35 50 12 C82 35 80 70 50 88 Z"/><path d="M50 92 V22 M50 40 l-12 -8 M50 40 l12 -8 M50 56 l-15 -9 M50 56 l15 -9 M50 72 l-12 -7 M50 72 l12 -7"/>`,
  slnko: `<circle cx="50" cy="50" r="18"/><path d="M50 10v14 M50 76v14 M10 50h14 M76 50h14 M22 22l10 10 M68 68l10 10 M78 22l-10 10 M32 68l-10 10"/>`,
  kniha: `<path d="M50 28 C38 20 22 20 12 24 V80 C22 76 38 76 50 84 C62 76 78 76 88 80 V24 C78 20 62 20 50 28 Z"/><path d="M50 28 V84"/><path d="M20 36 C28 34 36 34 42 38 M20 48 C28 46 36 46 42 50 M58 38 C64 34 72 34 80 36 M58 50 C64 46 72 46 80 48"/>`,
  dom:   `<path d="M18 46 L50 18 L82 46"/><path d="M26 40 V84 H74 V40"/><path d="M44 84 V62 H56 V84"/><rect x="32" y="50" width="10" height="10"/><rect x="60" y="50" width="10" height="10"/>`,
  auto:  `<path d="M10 66 V54 L22 50 L32 34 H64 L76 50 L90 54 V66 Z"/><path d="M36 50 L40 40 H50 V50 Z M56 50 V40 H62 L68 50 Z"/><circle cx="28" cy="68" r="9"/><circle cx="72" cy="68" r="9"/>`,
  malina:`<circle cx="40" cy="44" r="9"/><circle cx="58" cy="44" r="9"/><circle cx="32" cy="60" r="9"/><circle cx="50" cy="60" r="9"/><circle cx="68" cy="60" r="9"/><circle cx="41" cy="76" r="9"/><circle cx="59" cy="76" r="9"/>
         <path d="M50 34 C44 22 34 20 26 22 C34 30 42 32 50 34 C56 22 66 18 76 20 C68 30 58 32 50 34 M50 34 V18"/>`,
  melon: `<path d="M8 40 A42 42 0 0 0 92 40 Z"/><path d="M18 42 A32 32 0 0 0 82 42"/><path d="M34 52 l2 5 M50 56 v5 M66 52 l-2 5 M42 64 l1 4 M58 64 l-1 4"/>`,
  limonada:`<path d="M26 30 L34 88 H66 L74 30 Z"/><path d="M29 48 H71"/><path d="M58 88 L62 10 L76 8"/><circle cx="72" cy="30" r="13"/><path d="M72 17 V43 M59 30 H85 M63 21 L81 39 M81 21 L63 39"/><circle cx="44" cy="66" r="3"/><circle cx="52" cy="76" r="3"/><circle cx="48" cy="58" r="2"/>`,
  lizanka:`<circle cx="50" cy="36" r="26"/><path d="M50 36 m0 -5 a5 5 0 1 1 -5 5 a10 10 0 1 1 10 10 a15 15 0 1 1 -15 -15 a20 20 0 1 1 20 20"/><path d="M50 62 V94"/>`,
  misa:  `<path d="M10 46 H90 C88 70 72 84 50 84 C28 84 12 70 10 46 Z"/><path d="M38 84 V90 H62 V84"/><path d="M30 38 C32 30 38 30 40 38 M46 36 C48 26 56 26 58 36 M62 38 C64 32 70 32 72 38"/>`,
  lavica:`<path d="M10 52 H90 V60 H10 Z"/><path d="M14 34 H86 V42 H14 Z"/><path d="M22 42 V52 M78 42 V52"/><path d="M18 60 V86 M82 60 V86 M24 60 V86 M76 60 V86"/>`,
  /* ---- drobnosti na počítanie (menšie, plné tvary sa dajú vyfarbiť) ---- */
  hviezda:`<path d="M50 10 L61 38 L91 39 L67 58 L76 88 L50 70 L24 88 L33 58 L9 39 L39 38 Z"/>`,
  jablko:`<path d="M50 30 C36 18 12 26 14 52 C16 76 34 92 50 82 C66 92 84 76 86 52 C88 26 64 18 50 30 Z"/><path d="M50 30 C50 20 54 12 60 8 M52 22 C60 12 72 12 76 16 C70 24 60 26 52 22"/>`,
  lopta: `<circle cx="50" cy="50" r="38"/><path d="M12 50 H88 M50 12 C34 30 34 70 50 88 M50 12 C66 30 66 70 50 88"/>`,
  kvet:  `<circle cx="50" cy="50" r="10"/><circle cx="50" cy="24" r="14"/><circle cx="76" cy="50" r="14"/><circle cx="50" cy="76" r="14"/><circle cx="24" cy="50" r="14"/>`,
  oriesok:`<path d="M24 46 C24 76 40 92 50 92 C60 92 76 76 76 46 Z"/><path d="M18 46 C18 30 32 22 50 22 C68 22 82 30 82 46 Z"/><path d="M50 22 V10"/><path d="M30 36 h6 M44 32 h6 M58 34 h6 M66 40 h6"/>`,
  vrecusko:`<path d="M30 30 C14 50 12 92 50 92 C88 92 86 50 70 30 Z"/><path d="M30 30 C38 24 62 24 70 30"/><path d="M34 22 L42 30 M66 22 L58 30 M42 18 C46 26 54 26 58 18"/>`,
  /* ---- pridané 3. 11. 2026 ---- */
  mesiac:`<path d="M62 12 C36 16 22 38 26 60 C30 80 50 92 72 88 C52 80 42 62 46 44 C50 28 58 18 62 12 Z"/><path d="M78 26 l3 6 l6 1 l-5 4 l1 6 l-5 -3 l-5 3 l1 -6 l-5 -4 l6 -1 Z"/>`,
  mys:   `<path d="M14 72 C14 50 34 38 56 42 C74 45 84 58 84 72 Z"/><circle cx="30" cy="40" r="10"/><circle cx="24" cy="66" r="2" fill="#111"/><path d="M14 72 l-4 2 M84 72 C92 72 94 62 90 56"/><path d="M20 74 H80 M30 74 v6 M66 74 v6"/>`,
  mrkva: `<path d="M36 30 L66 34 C62 60 52 80 44 92 C40 76 36 54 36 30 Z"/><path d="M42 30 C36 18 30 12 24 10 M50 31 C50 18 54 10 58 6 M58 32 C64 22 72 18 80 18"/><path d="M40 46 h8 M42 60 h7 M44 74 h5"/>`,
  vajce: `<path d="M50 12 C30 12 18 44 18 62 C18 80 32 92 50 92 C68 92 82 80 82 62 C82 44 70 12 50 12 Z"/>`,
  mravec:`<circle cx="22" cy="50" r="10"/><ellipse cx="44" cy="52" rx="10" ry="8"/><ellipse cx="72" cy="54" rx="16" ry="12"/><path d="M18 40 C14 30 10 26 6 26 M24 40 C26 30 30 26 34 24"/>
         <path d="M40 58 L32 76 M46 60 L46 80 M52 58 L62 76 M40 46 L32 30 M46 44 L48 28 M52 46 L62 30"/>`,
  ceruzka:`<path d="M20 80 L28 62 L74 16 L84 26 L38 72 Z"/><path d="M20 80 L28 62 L38 72 Z M24 72 l-4 8 l8 -4"/><path d="M66 24 L76 34"/>`
};
const ns = "http://www.w3.org/2000/svg";
const defs = Object.entries(O).map(([k,v]) => `<symbol id="${k}" viewBox="0 0 100 100">${v}</symbol>`).join("");
const box = document.createElementNS(ns,"svg");
box.setAttribute("width","0"); box.setAttribute("height","0"); box.style.position="absolute";
box.innerHTML = defs;
document.body.prepend(box);
})();
