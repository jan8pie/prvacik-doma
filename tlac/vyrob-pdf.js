/* Vyrobí PDF a náhľady PNG z pracovných listov tlac/*.html.
   Spustenie:  node tlac/vyrob-pdf.js                 všetky listy
               node tlac/vyrob-pdf.js mat-kocka       len vybrané listy (názvy bez .html)
   (treba Node a balík playwright)

   List s tromi úrovňami (3 strany .list) vyrobí:
     tlac/pdf/<nazov>.pdf          všetky 3 úrovne v jednom súbore
     tlac/pdf/<nazov>-1.pdf ... -3.pdf  každá úroveň zvlášť
     tlac/pdf/<nazov>-1.png ... -3.png  náhľady na web
   List s jednou stranou vyrobí len <nazov>.pdf a <nazov>.png. */
const { chromium } = require("playwright");
const fs = require("fs"), path = require("path");

(async () => {
  const dir = __dirname, out = path.join(dir, "pdf");
  fs.mkdirSync(out, { recursive: true });
  const vybrane = process.argv.slice(2).map(a => a.replace(/\.html$/, ""));
  const listy = fs.readdirSync(dir).filter(f => f.endsWith(".html") && !f.startsWith("_"))
    .filter(f => !vybrane.length || vybrane.includes(f.replace(/\.html$/, "")));
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 794, height: 1123 }, deviceScaleFactor: 1 });
  for (const f of listy) {
    const meno = f.replace(/\.html$/, "");
    await page.goto("file://" + path.join(dir, f));
    await page.evaluate(() => document.fonts.ready);
    await page.emulateMedia({ media: "print" });
    const strany = await page.locator(".list").count();
    if (!strany) { console.log("preskočené (nie je to list):", meno); continue; }
    const pdf = (subor, rozsah) => page.pdf({ path: path.join(out, subor), format: "A4", printBackground: true,
      preferCSSPageSize: true, ...(rozsah ? { pageRanges: rozsah } : {}) });
    await pdf(meno + ".pdf");
    if (strany > 1) {
      for (let i = 1; i <= strany; i++) {
        await pdf(`${meno}-${i}.pdf`, String(i));
        await page.locator(".list").nth(i - 1).screenshot({ path: path.join(out, `${meno}-${i}.png`) });
      }
    } else {
      await page.locator(".list").first().screenshot({ path: path.join(out, meno + ".png") });
    }
    console.log("hotovo:", meno, strany > 1 ? `(${strany} úrovne)` : "");
  }
  await browser.close();
})();
