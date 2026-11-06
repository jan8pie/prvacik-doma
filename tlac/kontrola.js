/* Rýchla kontrola pracovných listov pred vyrobením PDF.
   Spustenie:  node tlac/kontrola.js mat-kocka [sjl-e ...]          správa + jeden spojený náhľad na list
               node tlac/kontrola.js mat-kocka --strana 2           náhľad len 2. strany (na detail)
               node tlac/kontrola.js mat-kocka --bez-obrazkov       len číselná správa
   Náhľady idú do priečinka z premennej KONTROLA_DIR (inak /tmp/kontrola).

   Pre každú stranu (úroveň) vypíše:
     volne    koľko px ostáva medzi poslednou úlohou a pätou (záporné = nezmestí sa)
     pata     či päta sedí dole na strane
     pretek   koľko px obsah tlačí pätu dole (do 30 px je to tesné, ale schválené listy tak vyzerajú)
     mimo     koľko prvkov (okrem kresieb SVG) vytŕča z rámčeka úlohy (.plocha) o viac ako 8 px (má byť 0)
   Na konci napíše OK alebo POZOR. Obrázok si pozri až keď sú čísla v poriadku:
   spojený náhľad všetkých strán vedľa seba je jeden obrázok namiesto troch. */
const { chromium } = require("playwright");
const fs = require("fs"), path = require("path");

(async () => {
  const arg = process.argv.slice(2);
  const bez = arg.includes("--bez-obrazkov");
  const si = arg.indexOf("--strana"), strana = si >= 0 ? Number(arg[si + 1]) : 0;
  const listy = arg.filter((a, i) => !a.startsWith("--") && !(si >= 0 && i === si + 1)).map(a => a.replace(/\.html$/, ""));
  if (!listy.length) { console.log("Použitie: node tlac/kontrola.js <list> [list ...] [--strana N] [--bez-obrazkov]"); return; }
  const out = process.env.KONTROLA_DIR || "/tmp/kontrola";
  fs.mkdirSync(out, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 794, height: 1123 }, deviceScaleFactor: 1 });
  let chyby = 0;
  for (const m of listy) {
    const subor = path.join(__dirname, m + ".html");
    if (!fs.existsSync(subor)) { console.log(m + ": súbor neexistuje"); chyby++; continue; }
    await page.goto("file://" + subor);
    await page.evaluate(() => document.fonts.ready);
    await page.emulateMedia({ media: "print" });
    const r = await page.evaluate(() => [...document.querySelectorAll(".list")].map(l => {
      const L = l.getBoundingClientRect(), pata = l.querySelector(".pata");
      const kids = [...l.children].filter(c => c !== pata);
      const last = kids.length ? kids[kids.length - 1].getBoundingClientRect() : L;
      const P = pata ? pata.getBoundingClientRect() : null;
      let mimo = 0;
      l.querySelectorAll(".plocha").forEach(pl => {
        const Q = pl.getBoundingClientRect();
        pl.querySelectorAll("*").forEach(e => { if (e.closest("svg")) return; const R = e.getBoundingClientRect();
          if (R.width > 0 && (R.right > Q.right + 8 || R.bottom > Q.bottom + 8 || R.left < Q.left - 8)) mimo++; });
      });
      return { volne: Math.round((P ? P.top : L.bottom) - last.bottom), pata: P ? Math.round(L.bottom - P.bottom) : null,
               pretek: l.scrollHeight - l.clientHeight, mimo };
    }));
    if (!r.length) { console.log(m + ": nie je to list (chýba .list)"); continue; }
    r.forEach((s, i) => {
      const zle = s.volne < 0 || s.pretek > 30 || s.mimo > 0 || s.pata === null || s.pata < 0 || s.pata > 40;
      const tesne = !zle && s.pretek > 0;
      if (zle) chyby++;
      console.log(`${m} str ${i + 1}: volne ${s.volne}px, pata ${s.pata === null ? "CHÝBA" : s.pata + "px od spodku"}, pretek ${s.pretek}px, mimo ${s.mimo}${zle ? "  <- POZOR" : tesne ? "  (tesné, ešte OK)" : ""}`);
    });
    if (bez) continue;
    const loc = page.locator(".list");
    if (strana) {
      const f = path.join(out, `${m}-${strana}.png`);
      await loc.nth(strana - 1).screenshot({ path: f });
      console.log("  náhľad:", f);
    } else {
      const obr = [];
      for (let i = 0; i < r.length; i++) obr.push((await loc.nth(i).screenshot()).toString("base64"));
      const p2 = await browser.newPage({ viewport: { width: 794 * obr.length + 20 * (obr.length - 1), height: 1123 } });
      await p2.setContent(`<body style="margin:0;display:flex;gap:20px;background:#888">${obr.map(b => `<img src="data:image/png;base64,${b}" style="width:794px">`).join("")}</body>`);
      const f = path.join(out, `${m}-spolu.png`);
      await p2.screenshot({ path: f, fullPage: true });
      await p2.close();
      console.log("  náhľad:", f);
    }
  }
  await browser.close();
  console.log(chyby ? `POZOR: ${chyby} problém(y)` : "OK: všetko sa zmestí");
})();
