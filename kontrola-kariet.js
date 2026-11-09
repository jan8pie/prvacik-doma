#!/usr/bin/env node
/* Kontrola kariet: node kontrola-kariet.js [--vsetko]
   Prejde karty.js a vypíše len problémy (CHYBA = treba opraviť, POZOR = pozri sa na to) a jeden riadok súhrnu.
   Upozornenia POZOR sa vypisujú len pre karty za posledných 14 dní a novšie; --vsetko ukáže aj staršie.
   Na webe sa nespúšťa, je to pomôcka pri výrobe kariet. Končí kódom 1, ak je aspoň jedna CHYBA. */
const fs = require("fs"), path = require("path");
const KOR = __dirname;
global.window = {};
require(path.join(KOR, "karty.js"));
const KARTY = window.KARTY || [];
const VSETKO = process.argv.includes("--vsetko");

/* Kedy trieda prebrala ktoré písmeno (dopĺňaj podľa šlabikára a EduPage). Dlhá samohláska ide s krátkou. */
const PISMENA = [["2026-10-08","aá"],["2026-10-13","m"],["2026-10-19","eé"],["2026-10-26","l"],["2026-11-02","ií"],["2026-11-10","j"],["2026-11-16","oó"]];
const PREDMETY = ["SJL","MAT","ANJ","CAP"];
const BLOKY = ["rozhovor","aktivita","pocuvanie","hadanka","spolu","tlac"];
const HRY = ["vyber","rozklad","slabiky","poradie","sucet","porovnaj","kocky"];
const MAX_TYZDENNE = 10;          /* rytmus od 16. 11. 2026: 8 až 10 kariet na týždeň */
const NOVY_RYTMUS_OD = "2026-11-16";

const chyby = [], pozor = [];
const dnes = new Date(); dnes.setHours(0,0,0,0);
const datum = (s) => { const [y,m,d] = s.split("-").map(Number); return new Date(y, m-1, d); };
const nova = (k) => VSETKO || (dnes - datum(k.datum)) / 864e5 <= 14;
const C = (k, t) => chyby.push(`CHYBA ${k.id || "?"} (${k.datum || "?"}): ${t}`);
const P = (k, t) => { if (nova(k)) pozor.push(`POZOR ${k.id} (${k.datum}): ${t}`); };
const je = (f) => fs.existsSync(path.join(KOR, f));
const pondelok = (s) => { const x = datum(s); x.setDate(x.getDate() - ((x.getDay()+6)%7)); return x.getFullYear()+"-"+String(x.getMonth()+1).padStart(2,"0")+"-"+String(x.getDate()).padStart(2,"0"); };
const zname = (d) => new Set(PISMENA.filter(([od]) => od <= d).flatMap(([,p]) => [...p]));

const idy = new Set();
for (const k of KARTY) {
  for (const pole of ["id","datum","predmet","kod","nazov","uvod","meta","stdn","bloky"]) if (k[pole] == null) C(k, `chýba pole ${pole}`);
  if (!k.id || !k.datum || !Array.isArray(k.bloky)) continue;
  if (idy.has(k.id)) C(k, "rovnaké id má aj iná karta"); idy.add(k.id);
  if (!/^[a-z0-9-]+$/.test(k.id)) C(k, "id smie mať len malé písmená bez diakritiky, číslice a pomlčky");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(k.datum) || isNaN(datum(k.datum))) C(k, "dátum má byť v tvare RRRR-MM-DD");
  if (!PREDMETY.includes(k.predmet)) C(k, `neznámy predmet ${k.predmet}`);
  if (!Array.isArray(k.meta) || k.meta.length !== 3) P(k, "meta má mať 3 položky: kto, čas, pomôcky");
  if (!k.obr) P(k, "chýba obr (obrázok karty), web si vyberie sám z obsahu");
  if (k.uvod && k.uvod.length > 300) P(k, `úvod má ${k.uvod.length} znakov, na zatvorenej karte sa ukážu len 3 riadky`);
  if (k.slovnik && !/^(start|u\d+)\+?$/.test(k.slovnik)) C(k, `slovnik:"${k.slovnik}" nie je start, u1, u2+ …`);
  if (k.slovnik && k.predmet !== "ANJ") P(k, "slovník je len pre karty ANJ");
  if (k.pismenka) {
    const [p, r] = k.pismenka.split(":");
    if (!/^[A-ZŠČŽŇŤĽ]{2,}$/.test(p) || (r && !["spoj","postav","obrazok"].includes(r))) C(k, `pismenka:"${k.pismenka}" má byť napr. "AMELIJ" alebo "AMELIJ:obrazok"`);
    else { const z = zname(k.datum), zle = [...p.toLowerCase()].filter(x => !z.has(x)); if (zle.length) P(k, `pismenka: trieda ešte nemala ${zle.join(", ").toUpperCase()}`); }
  }

  k.bloky.forEach((b, i) => {
    const kde = `blok ${i+1} (${b.typ})`;
    if (!BLOKY.includes(b.typ)) { C(k, `${kde}: neznámy typ bloku`); return; }
    if (b.typ === "tlac") {
      if (k.predmet === "ANJ") P(k, "angličtina má byť bez listov na tlač");
      if (!b.subor) { C(k, `${kde}: chýba subor`); return; }
      const n = b.subor.replace(/\.pdf$/, "");
      const treba = b.urovne ? [b.subor, ...[1,2,3].flatMap(u => [`${n}-${u}.pdf`, `${n}-${u}.png`])] : [b.subor, n+".png"];
      const chyba = treba.filter(f => !je("tlac/pdf/"+f));
      if (chyba.length) C(k, `${kde}: v tlac/pdf chýba ${chyba.join(", ")}`);
    }
    if (b.typ === "rozhovor" && (!b.zacni || !Array.isArray(b.otazky) || b.otazky.length !== 3 || !b.preteba)) C(k, `${kde}: treba zacni, 3 otazky a preteba`);
    if (b.typ === "hadanka" && (!b.text || !b.odpoved)) C(k, `${kde}: treba text a odpoved`);
    if (b.typ === "pocuvanie" && !Array.isArray(b.slova)) C(k, `${kde}: chýba zoznam slova`);
    if (b.typ === "aktivita") {
      if (!b.hra || !HRY.includes(b.hra.druh)) C(k, `${kde}: neznáma hra ${b.hra && b.hra.druh}`);
      else if (b.hra.druh !== "vyber" && !Array.isArray(b.hra.urovne)) C(k, `${kde}: hre chýbajú urovne`);
    }
    /* text čítaný nahlas: veta končiaca číslom nemá mať bodku (hlas by prečítal „šiesty“) */
    const hlas = [b.typ === "hadanka" || b.typ === "aktivita" ? b.text : "", ...(b.typ === "pocuvanie" ? b.slova.map(s => s[2] || s[1]) : [])].join(" | ");
    const m = hlas.match(/[^.!?|]*\b\d+\.(?=\s|$|[“"])/);
    if (m) P(k, `${kde}: číslo s bodkou v texte čítanom nahlas: „${m[0].trim().slice(-40)}“`);
    /* čítanie v slovenčine: len z písmen, ktoré trieda už prebrala */
    if (k.predmet === "SJL" && b.typ === "pocuvanie" && b.citanie) {
      const z = zname(k.datum);
      const zle = b.slova.map(s => s[1]).filter(w => [...w.toLowerCase()].some(p => /\p{L}/u.test(p) && !z.has(p)));
      if (zle.length) P(k, `${kde}: slová s písmenom, ktoré trieda ešte nemala: ${zle.join(", ")}`);
    }
  });
}

/* striedanie hier: tá istá hra v predmete 3-krát po sebe */
for (const pr of PREDMETY) {
  const rad = KARTY.filter(k => k.predmet === pr && k.datum).sort((a,b) => a.datum.localeCompare(b.datum))
    .map(k => ({k, hra: (k.bloky.find(b => b.typ === "aktivita") || {}).hra})).filter(x => x.hra);
  for (let i = 2; i < rad.length; i++) if (rad[i].hra.druh === rad[i-1].hra.druh && rad[i].hra.druh === rad[i-2].hra.druh)
    P(rad[i].k, `hra „${rad[i].hra.druh}“ je v predmete ${pr} tretíkrát po sebe`);
}

/* týždne: počet kariet a aspoň jeden list na tlač pre SJL aj MAT */
const tyzdne = {};
for (const k of KARTY) if (k.datum) (tyzdne[pondelok(k.datum)] = tyzdne[pondelok(k.datum)] || []).push(k);
for (const [po, ks] of Object.entries(tyzdne)) {
  if (po < NOVY_RYTMUS_OD || ks.length < 3) continue;   /* jedna odložená karta ešte nie je sada */
  const prva = ks[0];
  if (ks.length > MAX_TYZDENNE) P(prva, `týždeň od ${po} má ${ks.length} kariet, rytmus je 8 až ${MAX_TYZDENNE}`);
  for (const pr of ["SJL","MAT"]) if (ks.some(k => k.predmet === pr) && !ks.some(k => k.predmet === pr && k.bloky.some(b => b.typ === "tlac")))
    P(prva, `týždeň od ${po}: ${pr} nemá ani jeden list na tlač`);
  for (const pr of ["SJL","MAT","ANJ"]) if (!ks.some(k => k.predmet === pr)) P(prva, `týždeň od ${po}: chýba karta ${pr}`);
}

[...chyby, ...pozor].forEach(r => console.log(r));
const posledna = KARTY.map(k => k.datum).filter(Boolean).sort().pop();
console.log(`${KARTY.length} kariet, posledná ${posledna}. Chýb: ${chyby.length}, upozornení: ${pozor.length}${VSETKO ? "" : " (staršie karty: --vsetko)"}.`);
process.exit(chyby.length ? 1 : 0);
