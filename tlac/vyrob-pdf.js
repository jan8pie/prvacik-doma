/* Vyrobí PDF (a náhľad PNG) zo všetkých listov tlac/*.html.
   Spustenie:  node tlac/vyrob-pdf.js      (treba Node a balík playwright)
   Výsledok:   tlac/pdf/<nazov>.pdf a tlac/pdf/<nazov>.png */
const { chromium } = require("playwright");
const fs = require("fs"), path = require("path");

(async () => {
  const dir = __dirname, out = path.join(dir, "pdf");
  fs.mkdirSync(out, { recursive: true });
  const listy = fs.readdirSync(dir).filter(f => f.endsWith(".html"));
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 794, height: 1123 }, deviceScaleFactor: 1 });
  for (const f of listy) {
    const meno = f.replace(/\.html$/, "");
    await page.goto("file://" + path.join(dir, f));
    await page.evaluate(() => document.fonts.ready);
    await page.pdf({ path: path.join(out, meno + ".pdf"), format: "A4", printBackground: true, preferCSSPageSize: true });
    await page.screenshot({ path: path.join(out, meno + ".png"), clip: { x: 0, y: 0, width: 794, height: 1123 } });
    console.log("hotovo:", meno);
  }
  await browser.close();
})();
