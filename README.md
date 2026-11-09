# Prváčik doma

Krátke úlohy a námety na rozhovor k učivu 1. ročníka ZŠ. Súkromný rodičovský projekt, nie oficiálny materiál školy.

Web: https://jan8pie.github.io/prvacik-doma/

## Súbory

- `index.html` – vzhľad a správanie stránky (šablóna). Bežne ho netreba meniť.
- `karty.js` – **obsah kariet**. Novú kartu pridáš tak, že skopíruješ jeden blok `{ ... }`, zmeníš texty a dátum. Karty na celý týždeň sa ukážu naraz v nedeľu o 18:00, týždne a štítok DNES sa počítajú samy.
- `kontrola-kariet.js` – kontrola kariet pred zverejnením: `node kontrola-kariet.js` (dátumy, súbory na tlač, prebrané písmená, striedanie hier).
- `kocky.html`, `pismenka.html`, `slovnik.html` – tri hry; spoločná hlavička je v `hlavicka.css`.
- `pismo.css`, `pismo/` – písma uložené v repe (stránka nič nesťahuje od tretích strán).
- `manifest.webmanifest`, `sw.js`, `ikony/` – ikona na plochu a práca bez internetu.
- `.nojekyll` – hovorí GitHub Pages, aby súbory zobrazil tak, ako sú.

## Úprava priamo na GitHube

Otvor `karty.js` → ikona ceruzky (Edit) → uprav → **Commit changes**. Web sa obnoví asi do 1 – 2 minút.
