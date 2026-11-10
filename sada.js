#!/usr/bin/env node
/* Prehľad pred výrobou sady kariet. Nahrádza čítanie karty.js.
   node sada.js                 prehľad pre najbližší týždeň bez sady
   node sada.js 2026-11-23      prehľad pre týždeň, v ktorom je tento deň
   node sada.js --karta mat-7   vypíše zdroj jednej karty (vzor na skopírovanie), dá sa viac id naraz
   node sada.js --tyzden 2026-11-16   vypíše krátky zoznam kariet daného týždňa
   node sada.js --hra rozklad   vypíše zápis hry z poslednej karty, ktorá ju použila (vzor poľa hra)
   node sada.js --stdn MAT-CO-3 vypíše citáty štandardu, ktoré karty s týmto kódom už použili
   Na webe sa nespúšťa. */
const fs = require("fs"), path = require("path");
const KOR = __dirname;
global.window = {};
require(path.join(KOR, "karty.js"));
const KARTY = (window.KARTY || []).filter(k => k.datum);
const STAV = require(path.join(KOR, "stav.js"));
const arg = process.argv.slice(2);

const D = (s) => { const [y,m,d] = s.split("-").map(Number); return new Date(y, m-1, d); };
const iso = (x) => x.getFullYear()+"-"+String(x.getMonth()+1).padStart(2,"0")+"-"+String(x.getDate()).padStart(2,"0");
const plus = (s, n) => { const x = D(s); x.setDate(x.getDate()+n); return iso(x); };
const pondelok = (s) => plus(s, -((D(s).getDay()+6)%7));
const DNI = ["ne","po","ut","st","št","pi","so"];
const kratko = (s) => { const x = D(s); return DNI[x.getDay()]+" "+x.getDate()+". "+(x.getMonth()+1)+"."; };
const bloky = (k) => k.bloky.map(b => b.typ + (b.hra ? ":"+b.hra.druh : "") + (b.typ === "tlac" ? ":"+b.subor.replace(/\.pdf$/,"") : "")).join(", ");
const riadok = (k) => `  ${kratko(k.datum).padEnd(11)} ${k.predmet}  ${k.id}  [${k.kod}]  ${k.nazov}\n              bloky: ${bloky(k)}${k.pismenka ? " · pismenka:"+k.pismenka : ""}${k.slovnik ? " · slovnik:"+k.slovnik : ""}`;
const tyzden = (po) => KARTY.filter(k => pondelok(k.datum) === po).sort((a,b) => a.datum.localeCompare(b.datum) || a.predmet.localeCompare(b.predmet));

/* --karta id [id …]: zdroj karty z karty.js */
if (arg[0] === "--karta") {
  const text = fs.readFileSync(path.join(KOR, "karty.js"), "utf8");
  for (const id of arg.slice(1)) {
    const od = text.indexOf(`{ id:"${id}"`);
    if (od < 0) { console.log(`Karta ${id} nie je v karty.js.`); continue; }
    let po = text.indexOf("\n{ id:", od + 1); if (po < 0) po = text.indexOf("\n];", od);
    console.log(text.slice(od, po).replace(/\n\/\*[\s\S]*$/, "").trimEnd() + "\n");
  }
  process.exit(0);
}
if (arg[0] === "--hra") {
  for (const h of arg.slice(1)) {
    const k = KARTY.filter(k => k.bloky.some(b => b.hra && b.hra.druh === h)).sort((a,b) => b.datum.localeCompare(a.datum))[0];
    console.log(k ? `${h} (z karty ${k.id}):\n  hra:${JSON.stringify(k.bloky.find(b => b.hra && b.hra.druh === h).hra)}\n  celá karta: node sada.js --karta ${k.id}` : `Hru ${h} zatiaľ žiadna karta nepoužila.`);
  }
  process.exit(0);
}
if (arg[0] === "--stdn") {
  for (const kod of arg.slice(1)) {
    const c = [...new Set(KARTY.filter(k => k.kod === kod).map(k => k.stdn))];
    console.log(`${kod}:\n` + (c.map(x => "  " + x).join("\n") || "  žiadna karta s týmto kódom; citát vezmi z mapy učiva (grep kódu v 01_mapa_uciva_1_rocnik.md)"));
  }
  process.exit(0);
}
if (arg[0] === "--tyzden") { tyzden(pondelok(arg[1])).forEach(k => console.log(riadok(k))); process.exit(0); }

/* ktorý týždeň: zadaný, inak prvý týždeň po poslednej celej sade (týždeň s aspoň 3 kartami) */
const pocty = {}; KARTY.forEach(k => { const p = pondelok(k.datum); pocty[p] = (pocty[p]||0)+1; });
const poslednaSada = Object.keys(pocty).filter(p => pocty[p] >= 3).sort().pop();
const PO = arg[0] ? pondelok(arg[0]) : plus(poslednaSada, 7);
const NE = plus(PO, 6);

const pism = STAV.pismena.filter(([od]) => od <= NE);
const cis = STAV.cisla.filter(([od]) => od <= NE);
const nove = (zoz) => zoz.filter(([od]) => od >= PO).map(([od, co]) => `${String(co).toUpperCase()} (od ${kratko(od)})`).join(", ") || "žiadne potvrdené";
const max = Math.max(...cis.map(([,c]) => c));

console.log(`SADA NA TÝŽDEŇ ${kratko(PO)} – ${kratko(NE)} ${PO.slice(0,4)}   (posledná celá sada: týždeň od ${kratko(poslednaSada)})`);
if (tyzden(PO).length) console.log(`POZOR: v tomto týždni už je ${tyzden(PO).length} kariet (vypísané nižšie). Nezdvoj ich.`);

console.log(`\nSTAV TRIEDY (stav.js, aktualizované ${STAV.aktualizovane})`);
console.log(`  Písmená na čítanie: ${pism.map(([,p]) => p.toUpperCase().split("").join(" ")).join(" · ")}`);
console.log(`  Nové písmeno v tomto týždni: ${nove(STAV.pismena)}`);
console.log(`  Čísla: 0 – ${max}${cis.some(([,c]) => c === 0) ? "" : " (bez nuly)"}. Nové číslo v tomto týždni: ${nove(STAV.cisla)}`);
for (const p of ["SJL","MAT","ANJ"]) console.log(`  ${p} teraz: ${STAV.teraz[p]}`);
for (const p of ["SJL","MAT","ANJ"]) console.log(`  ${p} odhad dopredu (nepotvrdené): ${STAV.dalej[p]}`);
if (nove(STAV.pismena) === "žiadne potvrdené" || nove(STAV.cisla) === "žiadne potvrdené")
  console.log("  → Pre tento týždeň nie je potvrdené nové písmeno alebo číslo. Nové učivo neodhaduj: upevňuj to, čo je vyššie, a opýtaj sa Jana (pozri VYROBA_SADY.md, krok 2).");

{ const ks = tyzden(plus(PO, -7));
  if (ks.length) { console.log(`\nKARTY O TÝŽDEŇ SKÔR, od ${kratko(plus(PO, -7))} (kvôli striedaniu: neopakuj tie isté bloky a hry v tom istom poradí)`); ks.forEach(k => console.log(riadok(k))); } }
if (tyzden(PO).length) { console.log("\nUŽ NAPLÁNOVANÉ V TOMTO TÝŽDNI"); tyzden(PO).forEach(k => console.log(riadok(k))); }

console.log("\nNA PIATKOVÉ OPAKOVANIE (učivo spred 2 a 4 týždňov)");
for (const t of [-14, -28]) { console.log(`  týždeň od ${kratko(plus(PO, t))}:`);
  for (const p of ["SJL","MAT","ANJ"]) { const n = tyzden(plus(PO, t)).filter(k => k.predmet === p && !/co-uz-viem|kniha-tyzdna/.test(k.id)).map(k => k.nazov); if (n.length) console.log(`    ${p}: ${n.join(" · ")}`); } }
const opak = KARTY.filter(k => /co-uz-viem/.test(k.id)).sort((a,b) => a.datum.localeCompare(b.datum)).slice(-3);
console.log(`  Posledné opakovacie karty: ${opak.map(k => `${k.predmet} (${kratko(k.datum)})`).join(", ") || "žiadne"}. Predmety sa striedajú SJL → MAT → ANJ.`);
const vik = KARTY.filter(k => (k.datum >= "2026-11-16" && [0,6].includes(D(k.datum).getDay())) || /kniha-tyzdna/.test(k.id)).sort((a,b) => a.datum.localeCompare(b.datum)).slice(-3);
console.log(`  Posledné rodinné karty: ${vik.map(k => `${k.id} (${kratko(k.datum)})`).join(", ") || "žiadne"}. Striedaj knihu týždňa, prírodu a pokus.`);

console.log("\nPOSLEDNÉ HRY V PREDMETE (tá istá hra najviac 2-krát po sebe)");
for (const p of ["SJL","MAT","ANJ"]) {
  const h = KARTY.filter(k => k.predmet === p && k.datum < PO).sort((a,b) => a.datum.localeCompare(b.datum)).flatMap(k => k.bloky.filter(b => b.hra).map(b => b.hra.druh)).slice(-4);
  console.log(`  ${p}: ${h.join(" → ") || "bez hier"}`);
}

const listy = (pr) => KARTY.filter(k => k.predmet === pr && k.datum < PO).sort((a,b) => b.datum.localeCompare(a.datum)).flatMap(k => k.bloky.filter(b => b.typ === "tlac").map(b => b.subor.replace(/\.pdf$/,""))).slice(0, 3);
console.log(`\nVZOR LISTU (otvor len jeden): SJL tlac/${listy("SJL")[0]}.html · MAT tlac/${listy("MAT")[0]}.html`);
console.log(`VZOR KARTY: node sada.js --karta <id>   (z poslednej sady: ${["SJL","MAT","ANJ"].map(p => (tyzden(poslednaSada).find(k => k.predmet === p) || {}).id).filter(Boolean).join(", ")})`);
const obr = fs.readFileSync(path.join(KOR, "tlac/obrazky.js"), "utf8").match(/^\s*[a-zA-Z0-9]+\s*:/gm) || [];
console.log(`\nKRESBY NA LISTY (tlac/obrazky.js, ${obr.length}): ${obr.map(x => x.replace(/[\s:]/g, "")).join(" ")}`);
console.log(`\nSpolu ${KARTY.length} kariet, posledná ${KARTY.map(k => k.datum).sort().pop()}. Zloženie sady a postup: VYROBA_SADY.md.`);
