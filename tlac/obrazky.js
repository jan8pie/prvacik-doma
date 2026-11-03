/* =====================================================================
   OBRÁZKY PRE PRACOVNÉ LISTY – vlastné kresby čiarou,
   aby sa dali vyfarbiť a tlačili sa lacno čiernobielo.
   Použitie v liste:  <i o="zajac"></i>   (alebo <svg class="pic"><use href="#zajac"/></svg>)
   Každý obrázok má plochu 100 × 100.
   class="f" = vyplnené čiernou (oči, nos…), class="w" = biela výplň (zakryje čiary za sebou)
   ===================================================================== */
(function(){
const O = {

  /* ================= ZVIERATKÁ SPREDU (do radu, na zmrzlinu…) ================= */
  zajac: `<path class="w" d="M38 30 C30 18 31 2 38 2 C45 2 46 18 44 30 Z"/><path class="w" d="M56 30 C54 18 55 2 62 2 C69 2 70 18 62 30 Z"/>
          <path d="M38 26 C35 18 36 9 38 8 M62 26 C65 18 64 9 62 8"/>
          <ellipse class="w" cx="50" cy="79" rx="16" ry="15"/><path d="M42 84 C46 90 54 90 58 84"/>
          <ellipse class="w" cx="41" cy="94" rx="7" ry="4"/><ellipse class="w" cx="59" cy="94" rx="7" ry="4"/>
          <circle class="w" cx="50" cy="44" r="17"/><circle class="f" cx="44" cy="41" r="2.3"/><circle class="f" cx="56" cy="41" r="2.3"/>
          <path class="f" d="M47 47 H53 L50 50 Z"/><path d="M50 50 V53 M50 53 C47 56 44 55 44 53 M50 53 C53 56 56 55 56 53"/>
          <path d="M42 49 L30 47 M42 52 L31 54 M58 49 L70 47 M58 52 L69 54" style="stroke-width:1.6"/>
          <path d="M36 72 C32 76 32 80 36 82 M64 72 C68 76 68 80 64 82"/>`,
  macka: `<path class="w" d="M30 37 L31 16 L44 27 Z"/><path class="w" d="M70 37 L69 16 L56 27 Z"/><path d="M33 31 L33 21 L40 27 M67 31 L67 21 L60 27" style="stroke-width:1.6"/>
          <path d="M66 86 C84 88 90 70 80 62"/>
          <ellipse class="w" cx="50" cy="79" rx="16" ry="15"/><ellipse class="w" cx="42" cy="94" rx="6" ry="4"/><ellipse class="w" cx="58" cy="94" rx="6" ry="4"/>
          <ellipse class="w" cx="50" cy="44" rx="20" ry="17"/>
          <ellipse class="f" cx="43" cy="41" rx="2.1" ry="3"/><ellipse class="f" cx="57" cy="41" rx="2.1" ry="3"/>
          <path class="f" d="M47 47 H53 L50 50 Z"/><path d="M50 50 C48 54 44 54 43 52 M50 50 C52 54 56 54 57 52"/>
          <path d="M40 48 L24 45 M40 51 L25 53 M60 48 L76 45 M60 51 L75 53" style="stroke-width:1.6"/>
          <path d="M36 72 C32 76 32 80 36 82 M64 72 C68 76 68 80 64 82"/>`,
  pes:   `<path d="M66 82 C76 80 82 72 84 64"/>
          <ellipse class="w" cx="50" cy="79" rx="17" ry="15"/><ellipse class="w" cx="41" cy="94" rx="7" ry="4"/><ellipse class="w" cx="59" cy="94" rx="7" ry="4"/>
          <path d="M36 72 C32 76 32 80 36 82 M64 72 C68 76 68 80 64 82"/>
          <circle class="w" cx="50" cy="42" r="18"/>
          <path class="w" d="M35 32 C24 30 20 48 26 58 C32 58 36 48 37 40 Z"/><path class="w" d="M65 32 C76 30 80 48 74 58 C68 58 64 48 63 40 Z"/>
          <circle class="f" cx="44" cy="39" r="2.4"/><circle class="f" cx="56" cy="39" r="2.4"/>
          <ellipse class="w" cx="50" cy="50" rx="9" ry="7"/><ellipse class="f" cx="50" cy="46.5" rx="4" ry="2.8"/>
          <path d="M50 49 V53 M45 53 C48 56 52 56 55 53"/><path d="M48 55 C48 60 52 60 52 55"/>`,
  medved:`<circle class="w" cx="33" cy="25" r="8"/><circle class="w" cx="67" cy="25" r="8"/><circle cx="33" cy="25" r="3.5"/><circle cx="67" cy="25" r="3.5"/>
          <ellipse class="w" cx="50" cy="78" rx="20" ry="17"/><ellipse cx="50" cy="80" rx="10" ry="9"/>
          <ellipse class="w" cx="39" cy="94" rx="8" ry="4.5"/><ellipse class="w" cx="61" cy="94" rx="8" ry="4.5"/>
          <path d="M31 70 C27 76 28 82 33 84 M69 70 C73 76 72 82 67 84"/>
          <circle class="w" cx="50" cy="42" r="19"/><circle class="f" cx="43" cy="38" r="2.3"/><circle class="f" cx="57" cy="38" r="2.3"/>
          <ellipse class="w" cx="50" cy="49" rx="9" ry="7"/><ellipse class="f" cx="50" cy="45.5" rx="3.6" ry="2.6"/><path d="M50 48 V51 M46 52 C48 54 52 54 54 52"/>`,
  jezko: `<path class="w" d="M14.0 71.1 L25.3 66.8 L17.1 58.3 L29.2 57.6 L24.1 47.1 L35.8 49.9 L34.4 38.5 L44.7 44.6 L47.0 33.3 L54.8 42.1 L60.7 32.1 L65.2 42.7 L74.1 34.9 L75.0 46.4 L85.9 41.5 L83.1 52.7 L95.1 51.2 L88.7 61.0 L100.6 63.2 L91.4 70.7 L96 82 C80 90 50 90 38 86 Z"/>
          <path class="w" d="M40 58 C32 56 22 62 8 72 C4 75 5 80 10 81 C22 86 36 86 46 84 C50 76 48 64 40 58 Z"/>
          <circle class="f" cx="6.5" cy="76" r="3.6"/><circle class="f" cx="26" cy="68" r="2.4"/>
          <path d="M35 60 C40 58 44 60 44 65" style="stroke-width:2"/>
          <path d="M14 81 C18 83 22 83 25 81" style="stroke-width:1.6"/>
          <ellipse class="w" cx="40" cy="90" rx="7" ry="4"/><ellipse class="w" cx="80" cy="90" rx="7" ry="4"/>`,
  liska: `<path d="M64 88 C80 92 94 78 88 60 C84 66 76 70 68 72"/><path d="M84 66 C86 70 88 72 90 70" style="stroke-width:1.6"/>
          <ellipse class="w" cx="50" cy="79" rx="15" ry="15"/><path d="M44 70 C46 80 54 80 56 70" style="stroke-width:1.6"/>
          <ellipse class="w" cx="42" cy="94" rx="6" ry="4"/><ellipse class="w" cx="58" cy="94" rx="6" ry="4"/>
          <path class="w" d="M28 32 L30 10 L44 24 H56 L70 10 L72 32 C72 44 60 58 50 62 C40 58 28 44 28 32 Z"/>
          <path d="M33 26 L34 17 L40 23 M67 26 L66 17 L60 23" style="stroke-width:1.6"/>
          <path d="M28 34 C36 36 42 42 46 50 M72 34 C64 36 58 42 54 50" style="stroke-width:1.6"/>
          <ellipse class="f" cx="42" cy="35" rx="2" ry="2.8"/><ellipse class="f" cx="58" cy="35" rx="2" ry="2.8"/><circle class="f" cx="50" cy="59" r="3.2"/>`,
  sova:  `<path class="w" d="M26 40 L22 18 L38 28 C46 25 54 25 62 28 L78 18 L74 40 C82 56 80 80 70 90 H30 C20 80 18 56 26 40 Z"/>
          <circle class="w" cx="39" cy="44" r="11"/><circle class="w" cx="61" cy="44" r="11"/><circle class="f" cx="40" cy="45" r="4.5"/><circle class="f" cx="60" cy="45" r="4.5"/>
          <path class="w" d="M46 54 L54 54 L50 62 Z"/>
          <path d="M26 56 C24 70 30 80 36 84 M74 56 C76 70 70 80 64 84"/>
          <path d="M42 68 l4 4 l4 -4 l4 4 l4 -4 M42 77 l4 4 l4 -4 l4 4 l4 -4" style="stroke-width:1.6"/>
          <path d="M38 90 v5 M43 90 v5 M57 90 v5 M62 90 v5" style="stroke-width:2.4"/>`,
  zaba:  `<path class="w" d="M30 70 C14 72 10 88 22 92 H40 M70 70 C86 72 90 88 78 92 H60"/>
          <ellipse class="w" cx="50" cy="66" rx="30" ry="24"/>
          <ellipse cx="50" cy="72" rx="16" ry="13" style="stroke-width:1.6"/>
          <circle class="w" cx="34" cy="38" r="11"/><circle class="w" cx="66" cy="38" r="11"/><circle class="f" cx="35" cy="38" r="4.5"/><circle class="f" cx="65" cy="38" r="4.5"/>
          <path class="w" d="M24 46 C30 56 70 56 76 46"/>
          <path d="M30 54 C40 62 60 62 70 54"/><circle class="f" cx="45" cy="50" r="1.3"/><circle class="f" cx="55" cy="50" r="1.3"/>
          <path d="M36 88 L32 96 M40 90 L40 97 M64 88 L68 96 M60 90 L60 97" style="stroke-width:2.2"/>`,
  myska: `<path d="M64 86 C80 92 92 84 90 72 C88 64 80 66 82 72"/>
          <ellipse class="w" cx="50" cy="80" rx="15" ry="14"/><ellipse class="w" cx="42" cy="94" rx="6" ry="3.5"/><ellipse class="w" cx="58" cy="94" rx="6" ry="3.5"/>
          <circle class="w" cx="31" cy="30" r="12"/><circle class="w" cx="69" cy="30" r="12"/><circle cx="31" cy="30" r="6" style="stroke-width:1.6"/><circle cx="69" cy="30" r="6" style="stroke-width:1.6"/>
          <path class="w" d="M34 44 C34 30 66 30 66 44 C66 54 58 64 50 66 C42 64 34 54 34 44 Z"/>
          <circle class="f" cx="44" cy="44" r="2.2"/><circle class="f" cx="56" cy="44" r="2.2"/><circle class="f" cx="50" cy="61" r="2.8"/>
          <path d="M44 56 L30 54 M44 59 L31 62 M56 56 L70 54 M56 59 L69 62" style="stroke-width:1.5"/>`,
  lev:   `<path class="w" d="M50 8 L58 16 L70 12 L72 24 L84 26 L80 38 L90 46 L80 54 L86 66 L74 68 L72 80 L60 76 L50 86 L40 76 L28 80 L26 68 L14 66 L20 54 L10 46 L20 38 L16 26 L28 24 L30 12 L42 16 Z"/>
          <circle class="w" cx="50" cy="47" r="22"/><circle class="w" cx="32" cy="30" r="6"/><circle class="w" cx="68" cy="30" r="6"/><circle class="w" cx="50" cy="47" r="22" style="stroke:none"/>
          <path d="M28 47 A22 22 0 0 1 72 47 A22 22 0 0 1 28 47"/>
          <circle class="f" cx="42" cy="42" r="2.4"/><circle class="f" cx="58" cy="42" r="2.4"/>
          <path class="f" d="M45 51 H55 L50 56 Z"/><path d="M50 56 V60 M50 60 C47 64 43 63 42 61 M50 60 C53 64 57 63 58 61"/>`,

  /* ================= ZVIERATKÁ ZBOKU (počítame nohy…) ================= */
  sliepka:`<path d="M72 50 C82 36 88 30 92 26 C92 38 90 50 84 58 M76 46 C84 40 90 40 94 42" />
          <path class="w" d="M26 50 C26 40 36 36 44 42 C56 46 74 44 84 54 C88 70 76 80 58 80 C40 80 28 70 26 50 Z"/>
          <path d="M46 58 C52 70 66 70 72 60 C66 62 58 62 52 56" />
          <path class="w" d="M24 22 L27 13 L31 19 L35 11 L38 19 L42 15 L40 24 Z"/>
          <circle class="w" cx="32" cy="32" r="11"/><circle class="f" cx="29" cy="30" r="2"/>
          <path class="w" d="M21 30 L11 34 L21 37 Z"/><path class="w" d="M23 40 C21 47 27 48 27 42"/>
          <path d="M46 80 V92 M62 80 V92 M46 92 L39 97 M46 92 L46 98 M46 92 L52 97 M62 92 L55 97 M62 92 L62 98 M62 92 L68 97"/>`,
  pesBok: `<path d="M80 50 C88 42 90 34 86 28"/>
          <path d="M30 64 V90 H36 M40 66 V90 H46 M64 66 V90 H70 M74 64 V90 H80"/>
          <path class="w" d="M26 52 C26 44 34 42 42 42 H70 C80 42 84 48 84 56 C84 64 78 68 70 68 H34 C28 68 26 60 26 52 Z"/>
          <circle class="w" cx="24" cy="34" r="14"/>
          <path class="w" d="M14 34 C8 34 4 36 4 40 C4 46 10 48 16 46 C20 46 24 44 24 42"/>
          <ellipse class="f" cx="5" cy="38" rx="3" ry="2.4"/><circle class="f" cx="20" cy="29" r="2"/>
          <path class="w" d="M26 21 C36 20 40 34 34 42 C28 40 24 30 26 21 Z"/>
          <path d="M8 46 C10 48 14 48 16 46" style="stroke-width:1.6"/>`,
  pavuk: `<path d="M50 30 V2" style="stroke-width:1.6"/>
          <path d="M40 50 C30 38 20 38 12 46 M38 56 C26 50 14 54 6 62 M38 62 C26 64 18 72 14 82 M42 68 C36 76 32 84 32 94
                   M60 50 C70 38 80 38 88 46 M62 56 C74 50 86 54 94 62 M62 62 C74 64 82 72 86 82 M58 68 C64 76 68 84 68 94"/>
          <ellipse class="w" cx="50" cy="60" rx="14" ry="13"/><circle class="w" cx="50" cy="40" r="9"/>
          <circle class="f" cx="46" cy="38" r="2"/><circle class="f" cx="54" cy="38" r="2"/><path d="M46 44 C48 46 52 46 54 44" style="stroke-width:1.6"/>`,
  ryba:  `<path class="w" d="M26 50 L8 34 C6 44 6 56 8 66 Z"/>
          <path class="w" d="M24 50 C38 26 68 26 86 50 C68 74 38 74 24 50 Z"/>
          <path class="w" d="M44 32 C46 22 56 20 62 30"/><path class="w" d="M48 68 C50 76 58 78 60 70"/>
          <path d="M62 34 C68 42 68 58 62 66"/><circle class="w" cx="73" cy="45" r="4.5"/><circle class="f" cx="74" cy="45" r="2"/>
          <path d="M86 50 L80 54" style="stroke-width:2"/>
          <path d="M36 44 c3 4 3 8 0 12 M46 40 c3 5 3 15 0 20 M54 42 c3 4 3 12 0 16" style="stroke-width:1.6"/>
          <circle cx="92" cy="32" r="3" style="stroke-width:1.6"/><circle cx="95" cy="22" r="2" style="stroke-width:1.6"/>`,
  slimak:`<path class="w" d="M8 84 C6 72 12 62 22 62 C30 62 32 70 34 76 H84 C94 76 96 84 88 84 Z"/>
          <path d="M20 63 L15 47 M26 63 L29 46"/><circle class="w" cx="15" cy="45" r="3.2"/><circle class="w" cx="29" cy="44" r="3.2"/>
          <circle class="f" cx="20" cy="71" r="2"/><path d="M12 77 C15 79 18 79 20 77" style="stroke-width:1.6"/>
          <circle class="w" cx="58" cy="50" r="24.5"/>
          <path d="M55.5 50.0 L55.3 49.3 L55.3 48.5 L55.5 47.7 L56.0 46.9 L56.7 46.2 L57.7 45.7 L58.8 45.5 L60.0 45.5 L61.3 45.9 L62.4 46.7 L63.4 47.8 L64.1 49.1 L64.4 50.7 L64.3 52.4 L63.8 54.0 L62.8 55.6 L61.4 56.8 L59.7 57.8 L57.7 58.2 L55.6 58.2 L53.5 57.6 L51.5 56.5 L49.9 54.8 L48.6 52.7 L47.9 50.3 L47.9 47.8 L48.5 45.2 L49.7 42.8 L51.6 40.7 L54.0 39.1 L56.8 38.2 L59.8 38.0 L62.8 38.5 L65.7 39.8 L68.2 41.8 L70.2 44.5 L71.5 47.6 L72.0 51.1 L71.5 54.6 L70.2 57.9 L68.1 60.9 L65.2 63.4 L61.8 65.0 L57.9 65.8 L53.9 65.6 L50.1 64.4 L46.6 62.2 L43.6 59.1 L41.5 55.4 L40.4 51.2 L40.4 46.7 L41.5 42.3 L43.6 38.3 L46.8 34.9 L50.8 32.3 L55.3 30.7 L60.2 30.4 L65.1 31.3 L69.7 33.4 L73.7 36.6 L76.8 40.7 L78.8 45.6" style="stroke-width:2.2"/>`,
  mravec:`<path d="M44 58 L34 76 M50 60 L50 80 M56 58 L66 76 M44 46 L34 28 M50 44 L50 24 M56 46 L66 28"/>
          <path d="M20 42 C16 32 12 28 8 28 M26 42 C28 32 32 28 36 26"/>
          <circle class="w" cx="24" cy="51" r="10"/><ellipse class="w" cx="50" cy="52" rx="10" ry="8"/><ellipse class="w" cx="78" cy="53" rx="16" ry="12"/>
          <circle class="f" cx="20" cy="49" r="1.8"/>`,
  vtak:  `<path d="M70 48 L92 40 L86 54 Z"/>
          <path class="w" d="M20 44 C20 30 34 26 42 34 C52 30 70 34 76 48 C78 62 64 72 48 72 C32 72 22 62 20 44 Z"/>
          <path d="M44 50 C50 62 64 62 68 52 C60 54 52 52 48 46" />
          <path class="w" d="M20 40 L8 44 L20 48 Z"/><circle class="f" cx="28" cy="38" r="2.2"/>
          <path d="M40 72 V88 M54 72 V88 M40 88 L34 92 M40 88 L40 94 M40 88 L46 92 M54 88 L48 92 M54 88 L54 94 M54 88 L60 92"/>`,
  mackaBok:`<path d="M80 52 C92 46 92 30 84 24"/>
          <path d="M30 64 V90 H36 M40 66 V90 H46 M64 66 V90 H70 M74 64 V90 H80"/>
          <path class="w" d="M26 52 C26 44 34 42 42 42 H70 C80 42 84 48 84 56 C84 64 78 68 70 68 H34 C28 68 26 60 26 52 Z"/>
          <path class="w" d="M10 22 L12 8 L20 16 H28 L36 8 L38 22 C42 32 36 42 24 42 C12 42 6 32 10 22 Z"/>
          <ellipse class="f" cx="18" cy="26" rx="1.8" ry="2.6"/><ellipse class="f" cx="30" cy="26" rx="1.8" ry="2.6"/><path class="f" d="M22 32 H26 L24 34 Z"/>
          <path d="M18 33 L4 31 M18 35 L5 38 M30 33 L44 31" style="stroke-width:1.4"/>`,

  /* ================= ĎALŠIE ZVIERATÁ ================= */
  lama:  `<path class="w" d="M36 66 V92 H41 M46 68 V92 H51 M70 68 V92 H75 M80 66 V92 H85"/>
          <path class="w" d="M30 56 C26 50 30 44 36 46 C38 40 46 40 48 44 C52 40 58 40 60 44 C64 40 70 40 72 44 C76 40 84 42 84 48 C90 50 90 58 86 62 C88 68 82 72 76 70 C72 74 66 74 62 70 C58 74 50 74 46 70 C42 74 34 72 34 68 C28 68 26 60 30 56 Z"/>
          <path class="w" d="M86 50 C92 48 96 52 94 58 C92 60 88 60 86 58"/>
          <path class="w" d="M24 30 C22 38 24 48 30 56 C34 52 38 50 40 46 C38 40 38 32 38 24"/>
          <path d="M26 38 C28 40 30 40 32 38 M27 46 C29 48 31 48 33 46" style="stroke-width:1.5"/>
          <path class="w" d="M30 8 C28 2 34 0 35 6 L35 12 M37 12 C38 4 44 4 42 12"/>
          <path class="w" d="M38 24 C40 16 36 10 30 10 C24 10 20 14 18 18 L10 20 C6 22 6 28 10 30 L20 31 C24 32 28 32 30 30 C34 30 38 28 38 24 Z"/>
          <circle class="f" cx="27" cy="18" r="2"/><path d="M10 26 C12 27 14 27 16 26" style="stroke-width:1.6"/>`,
  vevericka:`<path class="w" d="M56 88 C84 94 98 70 88 50 C84 40 94 30 86 18 C78 8 62 12 64 26 C66 36 76 42 72 56 C70 66 60 70 56 76 Z"/>
          <path d="M70 26 C74 22 80 22 82 26 M76 46 C80 42 86 44 86 48 M74 66 C78 62 84 64 84 68" style="stroke-width:1.6"/>
          <path class="w" d="M44 92 C28 92 28 66 38 58 C44 54 52 54 56 62 C62 74 62 92 50 94 Z"/>
          <path class="w" d="M36 30 L37 20 L44 28"/>
          <circle class="w" cx="38" cy="44" r="12"/><circle class="f" cx="35" cy="41" r="2"/><circle class="f" cx="26.5" cy="46" r="1.8"/>
          <path class="w" d="M34 68 C28 66 24 70 28 74 C32 76 38 74 40 70"/>
          <path class="w" d="M38 94 C34 94 32 90 36 88 M50 94 C54 94 56 90 52 88"/>`,
  had:   `<path class="w" d="M12 74 C18 56 38 54 50 66 C60 76 70 78 76 62 L80 50 L92 54 L88 66 C80 92 58 92 46 80 C36 70 24 72 20 86 C14 92 8 84 12 74 Z"/>
          <ellipse class="w" cx="86" cy="45" rx="12" ry="9" transform="rotate(-20 86 45)"/>
          <circle class="f" cx="88" cy="41" r="2"/><path d="M97 44 L100 40 M97 44 L100 47" style="stroke-width:1.6"/>
          <path d="M26 66 L30 72 L34 64 M42 66 L46 74 L52 68 M58 76 L62 82 L68 76 M76 70 L80 76 L84 68" style="stroke-width:1.6"/>`,
  mamut: `<path class="w" d="M34 34 C40 16 70 12 84 24 C94 32 96 50 92 66 V90 H82 V74 H72 V90 H62 V74 H50 V90 H40 V70 C36 66 34 54 34 34 Z"/>
          <path class="w" d="M38 30 C26 30 18 40 16 52 C14 64 16 76 12 84 C10 90 18 92 20 86 C24 78 26 66 30 58"/>
          <path class="w" d="M30 56 C24 62 22 72 30 76 C36 78 40 76 42 72 C36 70 32 66 34 58"/>
          <path d="M42 32 C36 40 38 52 48 56"/><circle class="f" cx="34" cy="38" r="2"/>
          <path d="M56 22 l-2 -6 M64 18 l-1 -6 M72 18 l1 -6 M80 22 l3 -5 M60 40 v8 M70 36 v8 M80 40 v8 M66 54 v8 M76 54 v8" style="stroke-width:1.6"/>`,
  motyl: `<path class="w" d="M47 42 C34 16 8 14 8 34 C8 50 28 56 47 54 Z"/><path class="w" d="M53 42 C66 16 92 14 92 34 C92 50 72 56 53 54 Z"/>
          <path class="w" d="M47 56 C30 56 14 66 18 80 C22 92 40 86 47 68 Z"/><path class="w" d="M53 56 C70 56 86 66 82 80 C78 92 60 86 53 68 Z"/>
          <ellipse class="w" cx="50" cy="56" rx="4" ry="22"/><circle class="w" cx="50" cy="31" r="5"/>
          <path d="M48 27 C44 18 40 14 34 13 M52 27 C56 18 60 14 66 13"/><circle class="f" cx="34" cy="13" r="2"/><circle class="f" cx="66" cy="13" r="2"/>`,

  /* ================= JEDLO A OVOCIE ================= */
  jahoda:`<path class="w" d="M50 30 C32 24 16 34 18 50 C20 68 38 86 50 92 C62 86 80 68 82 50 C84 34 68 24 50 30 Z"/>
          <path class="w" d="M34 32 C38 22 46 22 50 28 C54 22 62 22 66 32 C60 30 55 32 50 36 C45 32 40 30 34 32 Z"/><path d="M50 28 V14"/>
          <ellipse class="f" cx="36" cy="46" rx="1.7" ry="2.6"/><ellipse class="f" cx="50" cy="44" rx="1.7" ry="2.6"/><ellipse class="f" cx="64" cy="46" rx="1.7" ry="2.6"/>
          <ellipse class="f" cx="30" cy="58" rx="1.7" ry="2.6"/><ellipse class="f" cx="43" cy="58" rx="1.7" ry="2.6"/><ellipse class="f" cx="57" cy="58" rx="1.7" ry="2.6"/><ellipse class="f" cx="70" cy="58" rx="1.7" ry="2.6"/>
          <ellipse class="f" cx="38" cy="71" rx="1.7" ry="2.6"/><ellipse class="f" cx="50" cy="72" rx="1.7" ry="2.6"/><ellipse class="f" cx="62" cy="71" rx="1.7" ry="2.6"/><ellipse class="f" cx="50" cy="84" rx="1.7" ry="2.6"/>`,
  susienka:`<circle class="w" cx="50" cy="50" r="38"/><path d="M24 40 C26 34 30 30 34 28" style="stroke-width:1.6"/>
          <path class="f" d="M34 34 l6 -2 l2 5 l-5 3 Z M58 28 l6 1 l-1 6 l-6 -1 Z M66 52 l6 -1 l1 6 l-6 2 Z M40 60 l6 0 l0 6 l-6 0 Z M54 72 l5 -3 l3 5 l-5 3 Z M26 54 l5 -2 l2 5 l-5 2 Z M50 44 l4 -2 l2 4 l-4 2 Z"/>`,
  jablko:`<path class="w" d="M50 30 C36 18 12 26 14 52 C16 76 34 92 50 82 C66 92 84 76 86 52 C88 26 64 18 50 30 Z"/><path d="M50 30 C50 20 54 12 60 8 M52 22 C60 12 72 12 76 16 C70 24 60 26 52 22"/><path d="M26 44 C26 38 30 34 34 32" style="stroke-width:1.6"/>`,
  syr:   `<path class="w" d="M12 60 L64 30 L90 46 V76 H12 Z"/><path d="M12 60 H90"/>
          <circle cx="32" cy="68" r="4"/><circle cx="58" cy="67" r="5.5"/><circle cx="80" cy="70" r="3"/><ellipse cx="64" cy="44" rx="6" ry="2.6"/><ellipse cx="44" cy="52" rx="4" ry="2"/>`,
  ananas:`<path class="w" d="M50 36 L36 12 L46 22 L50 4 L54 22 L64 12 Z"/><path class="w" d="M46 36 L26 22 L40 36 M54 36 L74 22 L60 36"/>
          <ellipse class="w" cx="50" cy="64" rx="22" ry="28"/>
          <path d="M36 46 L62 88 M44 38 L70 78 M30 62 L46 90 M58 37 L72 58 M64 46 L38 88 M56 38 L30 78 M70 62 L54 90 M42 37 L28 58" style="stroke-width:1.6"/>`,
  kiwi:  `<circle class="w" cx="50" cy="50" r="40"/><circle cx="50" cy="50" r="33" style="stroke-width:1.6"/><ellipse class="w" cx="50" cy="50" rx="10" ry="8"/>
          <g class="f"><ellipse cx="50" cy="31" rx="1.6" ry="3"/><ellipse cx="50" cy="69" rx="1.6" ry="3"/><ellipse cx="31" cy="50" rx="3" ry="1.6"/><ellipse cx="69" cy="50" rx="3" ry="1.6"/>
          <ellipse cx="37" cy="37" rx="1.6" ry="3" transform="rotate(-45 37 37)"/><ellipse cx="63" cy="63" rx="1.6" ry="3" transform="rotate(-45 63 63)"/><ellipse cx="63" cy="37" rx="1.6" ry="3" transform="rotate(45 63 37)"/><ellipse cx="37" cy="63" rx="1.6" ry="3" transform="rotate(45 37 63)"/></g>
          <path d="M50 42 V22 M50 58 V78 M42 50 H22 M58 50 H78 M44 44 L30 30 M56 56 L70 70 M56 44 L70 30 M44 56 L30 70" style="stroke-width:1"/>`,
  nanuk: `<path class="w" d="M44 66 V92 C44 96 56 96 56 92 V66"/>
          <path class="w" d="M30 18 C30 6 70 6 70 18 V64 C70 68 66 70 62 70 H38 C34 70 30 68 30 64 Z"/>
          <path d="M30 32 Q35 40 40 32 Q45 40 50 32 Q55 40 60 32 Q65 40 70 32"/><path d="M38 44 V60" style="stroke-width:1.8"/>
          <path class="f" d="M70 18 C66 12 60 12 58 16 C62 16 66 18 70 24 Z"/>`,
  zmrzlina:`<path class="w" d="M32 48 L50 94 L68 48 Z"/><path d="M38 60 L60 56 M42 70 L58 68 M46 80 L56 78 M40 52 L54 84 M50 50 L60 72" style="stroke-width:1.6"/>
          <circle class="w" cx="50" cy="22" r="14"/>
          <path class="w" d="M28 50 C22 38 34 26 50 30 C66 26 78 38 72 50 Q66 56 61 50 Q56 57 50 50 Q44 57 39 50 Q34 56 28 50 Z"/>
          <circle class="f" cx="56" cy="10" r="4"/><path d="M56 6 C58 2 62 0 64 2" style="stroke-width:1.6"/>`,
  malina:`<circle class="w" cx="40" cy="44" r="9"/><circle class="w" cx="58" cy="44" r="9"/><circle class="w" cx="32" cy="60" r="9"/><circle class="w" cx="50" cy="60" r="9"/><circle class="w" cx="68" cy="60" r="9"/><circle class="w" cx="41" cy="76" r="9"/><circle class="w" cx="59" cy="76" r="9"/>
          <path class="w" d="M50 34 C44 22 34 20 26 22 C34 30 42 32 50 34 C56 22 66 18 76 20 C68 30 58 32 50 34"/><path d="M50 34 V18"/>`,
  melon: `<path class="w" d="M8 40 A42 42 0 0 0 92 40 Z"/><path d="M18 42 A32 32 0 0 0 82 42"/><path class="f" d="M34 52 l3 5 l-4 1 Z M50 56 l2 5 h-4 Z M66 52 l1 5 l-4 -1 Z M42 64 l2 4 l-4 0 Z M58 64 l2 4 l-4 0 Z"/>`,
  mrkva: `<path class="w" d="M36 30 L66 34 C62 60 52 80 44 92 C40 76 36 54 36 30 Z"/><path d="M42 30 C36 18 30 12 24 10 M50 31 C50 18 54 10 58 6 M58 32 C64 22 72 18 80 18"/><path d="M40 46 h8 M42 60 h7 M44 74 h5"/>`,
  oriesok:`<path class="w" d="M24 46 C24 76 40 92 50 92 C60 92 76 76 76 46 Z"/><path class="w" d="M18 46 C18 30 32 22 50 22 C68 22 82 30 82 46 Z"/><path d="M50 22 V10"/><path d="M30 36 h6 M44 32 h6 M58 34 h6 M66 40 h6"/>`,
  vajce: `<path class="w" d="M50 12 C30 12 18 44 18 62 C18 80 32 92 50 92 C68 92 82 80 82 62 C82 44 70 12 50 12 Z"/>`,
  limonada:`<path class="w" d="M26 30 L34 88 H66 L74 30 Z"/><path d="M29 48 H71"/><path d="M58 88 L62 10 L76 8"/><circle class="w" cx="72" cy="30" r="13"/><path d="M72 17 V43 M59 30 H85 M63 21 L81 39 M81 21 L63 39"/><circle cx="44" cy="66" r="3"/><circle cx="52" cy="76" r="3"/><circle cx="48" cy="58" r="2"/>`,
  lizanka:`<path d="M50 62 V94"/><circle class="w" cx="50" cy="36" r="26"/><path d="M50 36 m0 -5 a5 5 0 1 1 -5 5 a10 10 0 1 1 10 10 a15 15 0 1 1 -15 -15 a20 20 0 1 1 20 20"/>`,
  mlieko:`<path class="w" d="M40 8 H60 V20 C60 28 72 30 72 44 V88 C72 92 68 94 64 94 H36 C32 94 28 92 28 88 V44 C28 30 40 28 40 20 Z"/><path d="M40 14 H60"/>
          <path d="M28 54 H72 M28 80 H72"/><path class="w" d="M50 58 C44 66 44 74 50 76 C56 74 56 66 50 58 Z"/>`,

  /* ================= PREDMETY A VECI ================= */
  iglu:  `<path class="w" d="M12 78 A38 38 0 0 1 88 78 Z"/><path d="M40 78 v-14 a10 10 0 0 1 20 0 v14"/>
         <path d="M14 66 H40 M60 66 H86 M21 54 H79 M31 45 H69"/><path d="M26 78 v-12 M74 78 v-12 M33 66 v-12 M67 66 v-12 M42 54 v-9 M58 54 v-9"/>`,
  list:  `<path class="w" d="M50 88 C20 70 18 35 50 12 C82 35 80 70 50 88 Z"/><path d="M50 92 V22 M50 40 l-12 -8 M50 40 l12 -8 M50 56 l-15 -9 M50 56 l15 -9 M50 72 l-12 -7 M50 72 l12 -7"/>`,
  slnko: `<circle class="w" cx="50" cy="50" r="18"/><path d="M50 10v14 M50 76v14 M10 50h14 M76 50h14 M22 22l10 10 M68 68l10 10 M78 22l-10 10 M32 68l-10 10"/>`,
  kniha: `<path class="w" d="M50 28 C38 20 22 20 12 24 V80 C22 76 38 76 50 84 C62 76 78 76 88 80 V24 C78 20 62 20 50 28 Z"/><path d="M50 28 V84"/><path d="M20 36 C28 34 36 34 42 38 M20 48 C28 46 36 46 42 50 M58 38 C64 34 72 34 80 36 M58 50 C64 46 72 46 80 48"/>`,
  dom:   `<path class="w" d="M26 40 V84 H74 V40 L50 20 Z"/><path d="M18 46 L50 18 L82 46"/><path d="M44 84 V62 H56 V84"/><rect x="32" y="50" width="10" height="10"/><rect x="60" y="50" width="10" height="10"/>`,
  auto:  `<path class="w" d="M10 66 V54 L22 50 L32 34 H64 L76 50 L90 54 V66 Z"/><path d="M36 50 L40 40 H50 V50 Z M56 50 V40 H62 L68 50 Z"/><circle class="w" cx="28" cy="68" r="9"/><circle class="w" cx="72" cy="68" r="9"/><circle cx="28" cy="68" r="3"/><circle cx="72" cy="68" r="3"/>`,
  taxi:  `<rect class="w" x="36" y="22" width="28" height="12" rx="2"/><text x="50" y="31.5" text-anchor="middle" style="font:700 9.5px Andika,sans-serif;fill:#111;stroke:none">TAXI</text>
          <path class="w" d="M10 70 V58 L22 54 L32 38 H66 L78 54 L90 58 V70 Z"/><path d="M36 54 L40 44 H50 V54 Z M56 54 V44 H63 L69 54 Z"/>
          <path class="f" d="M10 62 H90 V66 H10 Z" style="opacity:.0"/><path d="M12 63 h6 M24 63 h6 M36 63 h6 M48 63 h6 M60 63 h6 M72 63 h6 M84 63 h4" style="stroke-width:3.4"/>
          <circle class="w" cx="28" cy="72" r="9"/><circle class="w" cx="72" cy="72" r="9"/><circle cx="28" cy="72" r="3"/><circle cx="72" cy="72" r="3"/>`,
  autobus:`<path class="w" d="M6 26 H86 C92 26 94 30 94 36 V74 H6 Z"/><path d="M12 32 H26 V48 H12 Z M32 32 H46 V48 H32 Z M52 32 H66 V48 H52 Z M72 32 H88 V48 H72 Z"/>
          <path d="M6 56 H94"/><path d="M72 48 V74"/><circle class="w" cx="24" cy="76" r="9"/><circle class="w" cx="76" cy="76" r="9"/><circle cx="24" cy="76" r="3"/><circle cx="76" cy="76" r="3"/><circle cx="90" cy="64" r="2.5"/>`,
  kotva: `<circle class="w" cx="50" cy="13" r="7"/><path d="M50 20 V88 M34 32 H66"/>
          <path d="M16 62 C18 82 38 90 50 88 C62 90 82 84 84 62"/><path d="M16 62 L10 72 M16 62 L26 68 M84 62 L90 72 M84 62 L74 68"/>`,
  koruna:`<path class="w" d="M14 78 L10 30 L32 52 L50 20 L68 52 L90 30 L86 78 Z"/><path d="M14 66 H86"/>
          <circle class="w" cx="10" cy="28" r="4"/><circle class="w" cx="50" cy="18" r="4"/><circle class="w" cx="90" cy="28" r="4"/>
          <path d="M30 72 l4 -3 l4 3 l-4 3 Z M46 72 l4 -3 l4 3 l-4 3 Z M62 72 l4 -3 l4 3 l-4 3 Z"/>`,
  ruka:  `<path class="w" d="M34 94 C30 86 28 78 28 70 L14 50 C10 44 17 38 22 43 L31 54 L31 22 C31 15 40 15 40 22 L40 48 L40 15 C40 8 49 8 49 15 L49 48 L49 19 C49 12 58 12 58 19 L58 50 L58 31 C58 25 66 25 66 31 L66 62 C66 76 62 86 60 94 Z"/>
          <path d="M40 22 V48 M49 19 V48 M58 31 V50" style="stroke:none"/>`,
  aktovka:`<path class="w" d="M38 18 C38 6 62 6 62 18"/><path class="w" d="M18 30 C18 22 24 18 32 18 H68 C76 18 82 22 82 30 V88 C82 91 80 93 77 93 H23 C20 93 18 91 18 88 Z"/>
          <path class="w" d="M18 30 C18 46 30 52 50 52 C70 52 82 46 82 30"/><rect class="w" x="44" y="46" width="12" height="12" rx="2"/>
          <path d="M28 66 H72 V84 H28 Z"/><path d="M28 72 H72" style="stroke-width:1.6"/>`,
  ihla:  `<path class="w" d="M14 90 L68 22 C72 16 80 20 76 26 L18 92 Z"/><ellipse cx="71" cy="24" rx="1.6" ry="4.5" transform="rotate(40 71 24)"/>
          <path d="M72 22 C84 8 98 22 88 34 C80 44 66 44 70 60 C74 74 92 70 94 82" style="stroke-width:1.8"/>`,
  lampa: `<path class="w" d="M32 18 H68 L84 52 H16 Z"/><path d="M50 52 V84"/><path class="w" d="M30 94 C30 86 70 86 70 94 Z"/>
          <path d="M66 52 V64"/><circle class="w" cx="66" cy="67" r="3"/><path d="M38 18 L30 52 M62 18 L70 52" style="stroke-width:1.4"/>`,
  dazdnik:`<path d="M50 52 V84 C50 92 40 92 40 84"/><path d="M50 12 V5"/>
          <path class="w" d="M8 52 C10 26 30 12 50 12 C70 12 90 26 92 52 C86 46 78 46 72 52 C66 46 56 46 50 52 C44 46 34 46 28 52 C22 46 14 46 8 52 Z"/>
          <path d="M50 12 C40 22 30 40 28 52 M50 12 C60 22 70 40 72 52 M50 12 V52" style="stroke-width:1.8"/>
          <path class="f" d="M16 66 C13 71 13 74 16 75 C19 74 19 71 16 66 Z M80 64 C77 69 77 72 80 73 C83 72 83 69 80 64 Z M70 80 C67 85 67 88 70 89 C73 88 73 85 70 80 Z M26 84 C23 89 23 92 26 93 C29 92 29 89 26 84 Z"/>`,
  vaza:  `<path d="M50 50 C50 36 46 26 40 18 M50 50 V14 M50 50 C52 36 58 28 64 22"/>
          <circle class="w" cx="38" cy="16" r="6"/><circle class="w" cx="50" cy="10" r="6"/><circle class="w" cx="66" cy="20" r="6"/>
          <path class="w" d="M36 50 H64 L60 58 C72 66 72 84 62 94 H38 C28 84 28 66 40 58 Z"/><path d="M34 74 C44 70 56 78 66 74" style="stroke-width:1.6"/>`,
  trava: `<path class="w" d="M8 92 C14 72 20 62 28 52 C24 66 24 80 26 92 Z"/><path class="w" d="M24 92 C26 70 32 50 42 36 C38 56 38 76 40 92 Z"/>
          <path class="w" d="M38 92 C40 66 48 42 60 26 C54 50 54 72 56 92 Z"/><path class="w" d="M54 92 C58 74 66 60 78 50 C72 66 70 80 72 92 Z"/>
          <path class="w" d="M68 92 C72 78 80 70 92 64 C86 74 84 84 86 92 Z"/><path d="M4 92 H96"/>`,
  mak:   `<path d="M50 56 C48 70 52 82 50 96"/><path d="M50 78 C42 70 34 72 30 76 C36 80 44 82 50 80"/>
          <path class="w" d="M50 40 C34 42 22 30 28 18 C34 8 46 12 50 22 C54 12 66 8 72 18 C78 30 66 42 50 40 Z"/>
          <path class="w" d="M50 40 C38 42 30 50 34 58 C40 64 48 58 50 52 C52 58 60 64 66 58 C70 50 62 42 50 40 Z"/>
          <circle class="f" cx="50" cy="36" r="6"/><circle class="f" cx="42" cy="28" r="1.5"/><circle class="f" cx="58" cy="28" r="1.5"/><circle class="f" cx="50" cy="25" r="1.5"/>`,
  strom: `<path d="M50 70 L60 62 M50 78 L40 68" /><path class="w" d="M44 62 V92 H56 V62"/>
          <path class="w" d="M30 64 C14 64 10 46 22 40 C18 24 34 16 42 24 C46 10 66 10 68 24 C80 18 92 32 82 42 C94 50 84 66 70 64 Z"/><path d="M26 92 H74"/>
          <path d="M32 50 C34 46 38 44 42 44 M56 34 C60 32 64 34 66 38" style="stroke-width:1.6"/>`,
  oblak: `<path class="w" d="M24 72 C8 72 6 52 20 50 C18 34 36 28 44 38 C48 22 72 22 74 40 C88 36 96 52 86 60 C94 70 82 74 76 72 Z"/><path d="M30 60 C34 56 40 56 44 60" style="stroke-width:1.6"/>`,
  mesiac:`<path class="w" d="M62 12 C36 16 22 38 26 60 C30 80 50 92 72 88 C52 80 42 62 46 44 C50 28 58 18 62 12 Z"/><path d="M78 26 l3 6 l6 1 l-5 4 l1 6 l-5 -3 l-5 3 l1 -6 l-5 -4 l6 -1 Z"/>`,
  misa:  `<path class="w" d="M10 46 H90 C88 70 72 84 50 84 C28 84 12 70 10 46 Z"/><path d="M38 84 V90 H62 V84"/><path d="M30 38 C32 30 38 30 40 38 M46 36 C48 26 56 26 58 36 M62 38 C64 32 70 32 72 38"/>`,
  lavica:`<path class="w" d="M10 52 H90 V60 H10 Z"/><path class="w" d="M14 34 H86 V42 H14 Z"/><path d="M22 42 V52 M78 42 V52"/><path d="M18 60 V86 M82 60 V86 M24 60 V86 M76 60 V86"/>`,
  ceruzka:`<path class="w" d="M20 80 L28 62 L74 16 L84 26 L38 72 Z"/><path d="M20 80 L28 62 L38 72 Z M24 72 l-4 8 l8 -4"/><path d="M66 24 L76 34"/>`,
  lopta: `<circle class="w" cx="50" cy="50" r="38"/><path fill="#111" d="M50.0 37.0 L62.4 46.0 L57.6 60.5 L42.4 60.5 L37.6 46.0 Z"/><path fill="#111" d="M66.5 27.3 L61.8 19.2 L65.8 16.0 L77.4 24.4 L75.6 29.2 Z"/><path d="M50.0 37.0 L50.0 26.0 L61.8 19.2 M50.0 26.0 L38.2 19.2"/><path fill="#111" d="M76.6 58.7 L83.0 51.7 L87.2 54.6 L82.8 68.2 L77.7 68.0 Z"/><path d="M62.4 46.0 L72.8 42.6 L83.0 51.7 M72.8 42.6 L75.6 29.2"/><path fill="#111" d="M50.0 78.0 L58.5 81.9 L57.2 86.8 L42.8 86.8 L41.5 81.9 Z"/><path d="M57.6 60.5 L64.1 69.4 L58.5 81.9 M64.1 69.4 L77.7 68.0"/><path fill="#111" d="M23.4 58.7 L22.3 68.0 L17.2 68.2 L12.8 54.6 L17.0 51.7 Z"/><path d="M42.4 60.5 L35.9 69.4 L22.3 68.0 M35.9 69.4 L41.5 81.9"/><path fill="#111" d="M33.5 27.3 L24.4 29.2 L22.6 24.4 L34.2 16.0 L38.2 19.2 Z"/><path d="M37.6 46.0 L27.2 42.6 L24.4 29.2 M27.2 42.6 L17.0 51.7"/>`, /* futbalová lopta (Jan 3. 11.) */
  pierko:`<path class="w" d="M80 12 C52 16 28 40 24 80 C44 74 72 56 80 12 Z"/><path d="M16 90 L72 24"/><path d="M40 62 L30 58 M48 52 L36 44 M56 42 L46 32 M50 58 L60 60 M58 48 L68 48 M64 38 L72 36" style="stroke-width:1.6"/>`,
  raketa:`<path class="w" d="M34 56 L18 76 L34 70 Z M66 56 L82 76 L66 70 Z"/>
          <path class="w" d="M50 4 C66 16 70 40 66 72 H34 C30 40 34 16 50 4 Z"/><circle class="w" cx="50" cy="34" r="9"/><circle cx="50" cy="34" r="4.5" style="stroke-width:1.6"/>
          <path d="M36 18 H64" style="stroke-width:1.6"/><path class="w" d="M40 72 L38 80 H62 L60 72"/>
          <path d="M42 84 L45 96 L50 87 L55 96 L58 84"/>`,
  kosik: `<path class="w" d="M24 48 C24 10 76 10 76 48"/><path class="w" d="M12 46 H88 L80 92 H20 Z"/><path d="M12 46 H88" style="stroke-width:4"/>
          <path d="M16 62 H84 M18 77 H82 M34 46 L36 92 M50 46 V92 M66 46 L64 92" style="stroke-width:1.6"/>`,
  balon: `<path d="M50 70 C44 78 56 86 50 98"/><path class="w" d="M46 66 L50 71 L54 66 Z"/><ellipse class="w" cx="50" cy="38" rx="24" ry="28"/><path d="M36 26 C38 20 42 16 47 15" style="stroke-width:2"/>`,
  srdce: `<path class="w" d="M50 86 C20 64 10 46 14 32 C18 18 38 14 50 30 C62 14 82 18 86 32 C90 46 80 64 50 86 Z"/>`,
  hviezda:`<path class="w" d="M50 10 L61 38 L91 39 L67 58 L76 88 L50 70 L24 88 L33 58 L9 39 L39 38 Z"/>`,
  kvet:  `<circle class="w" cx="50" cy="24" r="14"/><circle class="w" cx="76" cy="50" r="14"/><circle class="w" cx="50" cy="76" r="14"/><circle class="w" cx="24" cy="50" r="14"/><circle class="w" cx="50" cy="50" r="10"/>`,
  kvetina:`<path d="M50 50 V96 M50 80 C40 70 30 72 26 76 C34 84 44 84 50 80 M50 70 C58 60 68 60 74 64 C66 72 56 72 50 70"/>
          <circle class="w" cx="50" cy="16" r="10"/><circle class="w" cx="66" cy="28" r="10"/><circle class="w" cx="60" cy="46" r="10"/><circle class="w" cx="40" cy="46" r="10"/><circle class="w" cx="34" cy="28" r="10"/><circle class="w" cx="50" cy="32" r="8"/>`,
  vrecusko:`<path class="w" d="M30 30 C14 50 12 92 50 92 C88 92 86 50 70 30 Z"/><path d="M30 30 C38 24 62 24 70 30"/><path d="M34 22 L42 30 M66 22 L58 30 M42 18 C46 26 54 26 58 18"/>`,
  stanok:`<path class="w" d="M14 50 H86 V94 H14 Z"/><path d="M18 38 V50 M82 38 V50"/>
          <path class="w" d="M8 28 L18 10 H82 L92 28 V36 Q86 44 80 36 Q74 44 68 36 Q62 44 56 36 Q50 44 44 36 Q38 44 32 36 Q26 44 20 36 Q14 44 8 36 Z"/>
          <path d="M8 28 H92 M24 10 L20 28 M38 10 L36 28 M50 10 V28 M62 10 L64 28 M76 10 L80 28" style="stroke-width:1.6"/>
          <path d="M14 58 H86" style="stroke-width:1.6"/><path class="w" d="M42 68 L50 88 L58 68 Z"/><path class="w" d="M41 69 C38 60 46 56 50 60 C54 56 62 60 59 69 Z"/>`,
  vlajka:`<path d="M20 96 V8"/><path class="w" d="M20 10 H84 V52 H20 Z"/>
          <path class="f" d="M20 10 h16 v14 h-16 Z M52 10 h16 v14 h-16 Z M36 24 h16 v14 h-16 Z M68 24 h16 v14 h-16 Z M20 38 h16 v14 h-16 Z M52 38 h16 v14 h-16 Z"/>`,
  rusen: `<path class="w" d="M20 44 V30 H32 V44"/><circle cx="25" cy="20" r="5" style="stroke-width:1.8"/><circle cx="33" cy="10" r="4" style="stroke-width:1.8"/>
          <path class="w" d="M8 44 H62 V80 H8 Z"/><path class="w" d="M60 24 H92 V80 H60 Z"/><path d="M56 22 H96"/><rect x="68" y="32" width="16" height="14" rx="2"/>
          <path class="w" d="M8 80 L2 92 H14"/><circle class="w" cx="22" cy="84" r="9"/><circle class="w" cx="48" cy="84" r="9"/><circle class="w" cx="78" cy="84" r="9"/>
          <circle class="f" cx="22" cy="84" r="2.4"/><circle class="f" cx="48" cy="84" r="2.4"/><circle class="f" cx="78" cy="84" r="2.4"/><path d="M8 56 H62" style="stroke-width:1.6"/>`,
  vagon: `<path d="M0 74 H8 M92 74 H100"/><path class="w" d="M6 22 H94 V80 H6 Z"/>
          <circle class="w" cx="26" cy="86" r="8"/><circle class="w" cx="74" cy="86" r="8"/><circle class="f" cx="26" cy="86" r="2.2"/><circle class="f" cx="74" cy="86" r="2.2"/>`,

  obrusok:`<path class="w" d="M8 34 L60 14 L94 54 L40 80 Z"/>
          <path d="M18.7 49.3 L71.3 27.3 M29.3 64.7 L82.7 40.7 M25.3 27.3 L58 72.7 M42.7 20.7 L76 61.3" style="stroke-width:1.8"/>`,
  tanierik:`<ellipse class="w" cx="50" cy="56" rx="46" ry="26"/><ellipse cx="50" cy="56" rx="34" ry="17" style="stroke-width:1.6"/>`,

  /* ================= ĽUDIA (vymyslení) ================= */
  mama:  `<path class="w" d="M36 36 C34 20 40 8 50 8 C60 8 66 20 64 36 Z"/><circle class="w" cx="50" cy="5" r="5"/>
          <path class="w" d="M50 36 L28 92 H72 Z"/><path d="M40 50 L28 66 M60 50 L72 66"/><path d="M42 92 V98 M58 92 V98"/>
          <circle class="w" cx="50" cy="24" r="11"/><path d="M39 22 C42 14 54 12 61 22" /><circle class="f" cx="46" cy="25" r="1.6"/><circle class="f" cx="54" cy="25" r="1.6"/><path d="M46 29 C48 31 52 31 54 29" style="stroke-width:1.6"/>`,
  dievca:`<path class="w" d="M31 42 C28 20 40 15 50 15 C60 15 72 20 69 42 C71 52 70 59 66 62 H34 C30 59 29 52 31 42 Z"/>
          <path class="w" d="M50 53 L30 88 H70 Z"/><path d="M43 62 L33 76 M57 62 L67 76"/><path d="M42 88 V97 M58 88 V97"/>
          <circle class="w" cx="50" cy="39" r="15"/>
          <path class="w" d="M35 37 C35 25 43 22 50 24 C57 22 65 25 65 37 C60 31 55 30 50 32 C45 30 40 31 35 37 Z"/>
          <path class="w" d="M50 15 L41 9 V21 Z M50 15 L59 9 V21 Z" style="stroke-width:2"/><circle class="f" cx="50" cy="15" r="2.6"/>
          <circle class="f" cx="44.5" cy="41" r="1.9"/><circle class="f" cx="55.5" cy="41" r="1.9"/><path d="M45.5 47 C48 49.5 52 49.5 54.5 47" style="stroke-width:1.8"/>`,
  chlapec: `<path class="w" d="M34 56 H66 V80 H34 Z"/><path d="M34 60 L26 76 M66 60 L74 76"/><path class="w" d="M36 80 V96 H48 V84 H52 V96 H64 V80 Z"/>
          <circle class="w" cx="50" cy="38" r="16"/><path class="w" d="M33 38 C30 20 46 16 56 22 C62 22 68 28 67 38 C62 30 56 28 50 32 C46 28 40 28 33 38 Z"/>
          <circle class="f" cx="44" cy="41" r="1.9"/><circle class="f" cx="56" cy="41" r="1.9"/><path d="M45 47 C48 50 52 50 55 47" style="stroke-width:1.8"/>`,
  mimino:`<circle class="w" cx="50" cy="52" r="34"/><path d="M50 18 C44 12 50 6 56 10 C58 14 54 16 52 14"/>
          <path d="M34 48 C37 45 41 45 44 48 M56 48 C59 45 63 45 66 48"/><circle cx="32" cy="60" r="4" style="stroke-width:1.4"/><circle cx="68" cy="60" r="4" style="stroke-width:1.4"/>
          <ellipse class="w" cx="50" cy="68" rx="11" ry="6"/><circle class="w" cx="50" cy="76" r="5"/><circle class="f" cx="50" cy="68" r="2.4"/>
          <path d="M16 52 C12 52 12 60 17 60 M84 52 C88 52 88 60 83 60"/>`,

  /* ---- šarkan (drak), kačka, píla ---- */
  drak:  `<path class="w" d="M50 4 L80 36 L50 76 L20 36 Z"/><path d="M50 4 V76 M20 36 H80" style="stroke-width:1.6"/>
          <circle class="f" cx="41" cy="27" r="2.4"/><circle class="f" cx="59" cy="27" r="2.4"/><path d="M40 46 C46 52 54 52 60 46" style="stroke-width:2"/>
          <path d="M50 76 C40 84 60 88 50 96" style="stroke-width:2"/>
          <path class="w" d="M41.6 79.7 L47.6 82.7 L41.6 85.7 Z M53.6 79.7 L47.6 82.7 L53.6 85.7 Z M46.8 87.6 L52.8 90.6 L46.8 93.6 Z M58.8 87.6 L52.8 90.6 L58.8 93.6 Z" style="stroke-width:1.6"/>`,
  kacka: `<path d="M8 90 C14 86 20 94 26 90 C32 86 38 94 44 90 C50 86 56 94 62 90 C68 86 74 94 80 90 C86 86 92 94 96 90" style="stroke-width:2"/>
          <path class="w" d="M22 62 C20 84 74 90 86 68 L96 50 C88 54 82 56 76 58 C64 50 36 48 22 62 Z"/>
          <path d="M44 66 C52 58 66 60 72 66 C62 74 50 74 44 66 Z" style="stroke-width:2"/>
          <circle class="w" cx="34" cy="40" r="15"/>
          <path class="w" d="M21 36 C13 33 4 35 3 40 C5 45 13 46 21 44 Z"/><path d="M5 40 H18" style="stroke-width:1.6"/>
          <circle class="f" cx="33" cy="35" r="2.6"/>`,
  pila:  `<path class="w" d="M4 56 L68 30 V64 H4 Z"/><path d="M6 66 l2.5 5 l2.5 -5 l2.5 5 l2.5 -5 l2.5 5 l2.5 -5 l2.5 5 l2.5 -5 l2.5 5 l2.5 -5 l2.5 5 l2.5 -5 l2.5 5 l2.5 -5 l2.5 5 l2.5 -5 l2.5 5 l2.5 -5 l2.5 5 l2.5 -5 l2.5 5 l2.5 -5 l2.5 5 l2.5 -5" style="stroke-width:2"/>
          <path class="w" d="M66 24 C74 20 94 20 96 30 V68 C94 78 74 78 66 74 Z"/><ellipse cx="82" cy="49" rx="6" ry="13"/>
          <circle class="f" cx="71" cy="38" r="1.8"/><circle class="f" cx="71" cy="60" r="1.8"/>`,

  anjel: `<path class="w" d="M42 50 C24 30 4 40 8 62 C16 70 30 66 42 60 Z"/><path class="w" d="M58 50 C76 30 96 40 92 62 C84 70 70 66 58 60 Z"/>
          <path d="M14 56 C22 54 30 54 38 56 M86 56 C78 54 70 54 62 56" style="stroke-width:1.6"/>
          <path class="w" d="M50 36 L28 94 H72 Z"/><path d="M40 56 L50 66 L60 56" style="stroke-width:1.8"/>
          <circle class="w" cx="50" cy="26" r="12"/><ellipse cx="50" cy="8" rx="13" ry="4"/>
          <circle class="f" cx="45.5" cy="25" r="1.7"/><circle class="f" cx="54.5" cy="25" r="1.7"/><path d="M45 31 C48 34 52 34 55 31" style="stroke-width:1.8"/>`,
  oko:   `<path class="w" d="M6 52 C28 22 72 22 94 52 C72 82 28 82 6 52 Z"/><circle cx="50" cy="52" r="17"/><circle class="f" cx="50" cy="52" r="8"/><circle class="w" cx="55" cy="47" r="3" style="stroke:none"/>
          <path d="M22 38 L15 28 M36 31 L32 19 M50 29 V16 M64 31 L68 19 M78 38 L85 28" style="stroke-width:2.6"/>`,
  /* ---- väčšia plocha na pravej strane: krokodíl na porovnávanie (ústa sa otvárajú k väčšiemu) ---- */
  krokodil: ["0 0 160 100", `<path class="w" d="M96 74 L106 92 H116 L112 76 M134 70 L142 88 H152 L146 68"/>
          <path class="w" d="M70 46 C76 36 88 34 98 38 C112 40 128 40 140 46 C152 52 158 60 160 70 C152 66 144 66 136 70 C122 78 104 82 88 82 L74 80 Z"/>
          <path d="M104 40 l4 -6 l4 6 l4 -6 l4 6 l4 -5 l4 6 l4 -4 l4 6" style="stroke-width:2"/>
          <path d="M96 56 c6 4 14 4 20 0 M120 56 c6 4 12 4 18 -1" style="stroke-width:1.6"/>
          <path class="w" d="M76 72 L14 76 C6 77 6 86 14 86 L82 82 Z"/>
          <path class="w" d="M76 48 L20 16 C12 12 6 20 12 26 L70 64 Z"/>
          <path class="w" d="M22 26 l4 8 l4 -6 Z M32 32 l4 8 l4 -6 Z M42 38 l4 8 l4 -6 Z M52 44 l4 7 l4 -5 Z M20 76 l4 -7 l4 6 Z M30 75 l4 -7 l4 6 Z M40 74 l4 -7 l4 6 Z M50 73 l4 -7 l4 6 Z"/>
          <path class="w" d="M12 18 C10 10 18 8 20 14"/>
          <path class="w" d="M74 42 C72 30 88 28 88 38"/><circle class="f" cx="81" cy="36" r="3"/>`]
};

/* skratky: class="f" = čierna výplň, class="w" = biela výplň */
const uprav = s => s.replace(/class="f"/g,'fill="#111" stroke="none"').replace(/class="w"/g,'fill="#fff"');
const ns = "http://www.w3.org/2000/svg";
const defs = Object.entries(O).map(([k,v]) => { const [vb, d] = Array.isArray(v) ? v : ["0 0 100 100", v];
  return `<symbol id="${k}" viewBox="${vb}" overflow="visible">${uprav(d)}</symbol>`; }).join("");
const box = document.createElementNS(ns,"svg");
box.setAttribute("width","0"); box.setAttribute("height","0"); box.style.position="absolute";
box.innerHTML = defs;
document.body.prepend(box);
window.OBRAZKY = Object.keys(O);
})();
