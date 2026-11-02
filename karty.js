/* =====================================================================
   OBSAH KARIET – Prváčik doma
   Tu sa píše len obsah. Vzhľad a správanie sú v index.html.

   Nová karta = skopíruj jeden blok { ... }, zmeň texty a dátum.
   Poradie v súbore nie je dôležité, web zoradí karty podľa dátumu.
   Týždne („Tento týždeň“, „Minulý týždeň“) a štítok NOVÉ sa počítajú samy.
   Karta s budúcim dátumom sa ukáže až v ten deň (zásoba). Náhľad: adresa s ?nahlad
   Každá sada má vždy kartu pre Slovenčinu, Matematiku aj Angličtinu.

   predmet: SJL, MAT, ANJ, CAP
   kod:     kód témy z mapy učiva (prehlad/01_mapa_uciva_1_rocnik.md)
   stdn:    štandard ŠVP (citát)
   bloky:   rozhovor, aktivita, pocuvanie, hadanka, spolu, tlac
   hry (aktivita): vyber, rozklad, slabiky, poradie, sucet, porovnaj
   pocuvanie: jazyk:"sk-SK" pre slovenčinu (inak angličtina), citanie:true = veľké slová bez obrázkov

   Pravidlo pre text čítaný nahlas: veta, ktorá končí číslom, nemá bodku.
   ===================================================================== */
window.KARTY = [

/* =========================================================
   ZÁSOBA – karty s budúcim dátumom sa zobrazia až v ten deň.
   Vopred ich uvidíš na adrese s ?nahlad na konci.
   ========================================================= */

/* ---------- 6. 11. 2026 (piatok) ---------- */
{ id:"sjl-citame-slova", datum:"2026-11-06", predmet:"SJL", kod:"SJL-RV-1",
  nazov:"Čítame prvé slová: mama, lama, Ema",
  uvod:"Slová sú len z písmen, ktoré už dieťa pozná (M, A, E, L, I). Dieťa najprv prečíta slovo samo nahlas a potom naň ťukne, aby si vypočulo, či ho prečítalo rovnako.",
  meta:["dieťa samo","3 minúty","tablet so zvukom"],
  stdn:"ŠVP SJL, Elementárne čítanie: „čítanie slabík, slov, viet a krátkych textov s postupne sa zvyšujúcou náročnosťou“",
  bloky:[
    {typ:"pocuvanie", citanie:true, jazyk:"sk-SK", text:"Najprv prečítaj slovo nahlas. Potom naň ťukni a skontroluj sa.",
     slova:[["","mama"],["","lama"],["","Ema"],["","Ela"],["","Emil"],["","malá"],["","milá"],["","mám"]]},
    {typ:"spolu", text:"Napíšte spolu jedno z týchto slov veľkými tlačenými písmenami na papierik. Dieťa ho večer prečíta niekomu z rodiny ako prekvapenie."}
  ]},

{ id:"mat-susedia", datum:"2026-11-06", predmet:"MAT", kod:"MAT-CO-2",
  nazov:"Kto býva vedľa? Číslo pred a za",
  uvod:"Čísla 0 až 6 bývajú na ulici v rade. Dieťa hľadá susedov: ktoré číslo býva hneď pred štyrkou a ktoré hneď za ňou? V škole sa im hovorí predchodca a nasledovník.",
  meta:["spolu s rodičom","5 minút","papier, fixka"],
  stdn:"ŠVP MAT, Čísla a operácie s číslami: „porozumenie a modelovanie čísel ako počtu prvkov množiny, ako poradie, ako predchodcu alebo nasledovníka“",
  bloky:[
    {typ:"spolu", text:"Nakreslite ulicu so siedmimi domčekmi a napíšte na ne čísla 0 až 6. Jeden domček prikryte papierikom. Dieťa háda, ktoré číslo je schované, a povie, kto sú jeho susedia. Potom skrýva dieťa a hádate vy."},
    {typ:"rozhovor", zacni:"„Na schodoch stojím na treťom schode. Na ktorý stúpim, keď pôjdem o jeden vyššie?“",
     otazky:["Ktoré číslo príde hneď po 5?","Ktoré číslo je hneď pred 3?","Ja poviem číslo a ty mi povieš oboch susedov. Potom sa vymeníme."],
     preteba:"Číslo hneď pred sa v škole volá predchodca, číslo hneď za nasledovník. Doma stačí „sused pred“ a „sused za“."}
  ]},

{ id:"anj-bag", datum:"2026-11-06", predmet:"ANJ", kod:"ANJ-RE-2",
  nazov:"What's in my bag? Hádanky o školských veciach",
  uvod:"„I am long and I have numbers. I help you draw straight lines. What am I?“",
  meta:["spolu s rodičom","3 minúty","školská taška"],
  stdn:"ŠVP ANJ, Počúvanie s porozumením: „Porozumieť krátkym, veľmi jednoduchým otázkam a vetám za predpokladu, že sú povedané pomaly a zreteľne a sú sprevádzané vizuálnymi prostriedkami alebo gestami.“",
  bloky:[
    {typ:"hadanka", text:"I am long and I have numbers. I help you draw straight lines. What am I?", napoveda:"Som dlhé, mám čísla a pomáham kresliť rovné čiary.", odpoved:"A ruler – pravítko 📏"},
    {typ:"hadanka", text:"I have pages and pictures. You can read me. What am I?", napoveda:"Mám strany a obrázky, môžeš si ma prečítať.", odpoved:"A book – kniha 📕"},
    {typ:"hadanka", text:"I am colourful. Children draw with me. What am I?", napoveda:"Som farebná, deti so mnou kreslia.", odpoved:"A crayon – voskovka 🖍️"},
    {typ:"spolu", text:"Zbaľte spolu tašku po anglicky. Rodič povie napríklad „Put the book in the bag“ a dieťa vec vloží. Potom dieťa vybaľuje: „Take out the ruler.“"}
  ]},

/* ---------- 5. 11. 2026 (štvrtok) ---------- */
{ id:"sjl-a-zaciatok", datum:"2026-11-05", predmet:"SJL", kod:"SJL-PP-2",
  nazov:"Čo sa začína na A? Auto, ananás, autobus",
  uvod:"Dieťa ťuká na obrázky, ktorých názov sa začína hláskou A. Každý obrázok sa po ťuknutí ozve, takže dieťa počuje, či má pravdu.",
  meta:["dieťa samo","2 minúty","tablet so zvukom"],
  stdn:"ŠVP SJL, Písaná produkcia: „sluchové identifikovanie a rozlišovanie zvukov, slov, slabík, hlások“",
  bloky:[
    {typ:"aktivita", text:"Ťukni na obrázky, ktoré sa začínajú na A. Keď ťukneš, obrázok sa ozve.",
     hra:{druh:"vyber", spravne:"A", polozky:[["🚗","auto"],["🍍","ananás"],["🍎","jablko"],["🚌","autobus"],["🐒","opica"],["🥑","avokádo"],["⚓","kotva"],["✈️","lietadlo"]]}},
    {typ:"rozhovor", zacni:"„Ááá, zívam. Ááá… a na A sa začína aj auto! Čo ešte?“",
     otazky:["Čo okolo nás sa začína na A?","Je v slove mama tiež A? Koľkokrát?","Nájdeš slovo, ktoré sa na A končí?"],
     preteba:"Krátke a a dlhé á sú v šlabikári zvlášť. Pri hre nevadí, ak dieťa povie aj slovo s á."}
  ]},

{ id:"mat-kocka", datum:"2026-11-05", predmet:"MAT", kod:"MAT-CO-3",
  nazov:"Kocka a súčet do 6",
  uvod:"Každý hodí kockou dvakrát a dieťa spočíta bodky z oboch hodov. Ak je súčet viac ako 6, hádže sa znova, takže zostávate pri číslach, ktoré sa práve preberajú.",
  meta:["spolu s rodičom","5 minút","hracia kocka, fazuľky"],
  stdn:"ŠVP MAT, Čísla a operácie s číslami: „porozumenie pojmov sčítanec, súčet, menšenec, menšiteľ, rozdiel“",
  bloky:[
    {typ:"spolu", text:"Striedajte sa. Kto má v kole väčší súčet, dostane fazuľku. Ak je súčet rovnaký, fazuľku dostanú obaja. Vyhráva ten, kto má prvý päť fazuliek."},
    {typ:"rozhovor", zacni:"„Padla mi trojka a potom dvojka. Koľko to je spolu?“",
     otazky:["Ako si to spočítal? Ukážeš mi to na prstoch?","Prvá padla štvorka. Čo musí padnúť, aby bol súčet 6?","Ktoré dva hody dajú spolu 6? Nájdeš všetky?"],
     preteba:"Výsledok sčítania sa v škole volá súčet. Bodky je dobré najprv spočítať; časom ich dieťa začne poznávať naraz."}
  ]},

{ id:"anj-commands", datum:"2026-11-05", predmet:"ANJ", kod:"ANJ-RE-1",
  nazov:"Stand up, sit down! Pokyny po anglicky",
  uvod:"Krátke anglické pokyny, ktoré deti počujú v triede: stand up, sit down, clap your hands. Najprv si ich vypočujte na tablete, potom sa zahrajte na učiteľa.",
  meta:["spolu s rodičom","5 minút","tablet so zvukom"],
  stdn:"ŠVP ANJ, cieľ pre 1. cyklus: „Rozumieť krátkym inštrukciám.“",
  bloky:[
    {typ:"pocuvanie", text:"Ťukni na obrázok a vypočuj si pokyn. Potom ho urob!",
     slova:[["🧍","stand up"],["🪑","sit down"],["👏","clap your hands"],["👋","wave"],["🙋","hands up"],["🤫","be quiet"]]},
    {typ:"spolu", text:"Hra „Teacher says“: rodič dáva pokyny po anglicky a dieťa ich robí. Platí to len vtedy, keď pred pokynom poviete „Teacher says“. Kto sa pomýli, stáva sa učiteľom."}
  ]},

/* ---------- 4. 11. 2026 (streda) ---------- */
{ id:"sjl-spoj-slabiky", datum:"2026-11-04", predmet:"SJL", kod:"SJL-PP-2",
  nazov:"Spoj slabiky a uhádni slovo",
  uvod:"„Ma – li – na. Čo vznikne, keď slabiky spojíš?“ Rodič hovorí slovo po slabikách s krátkymi pauzami a dieťa ho skladá dokopy.",
  meta:["spolu s rodičom","3 minúty","bez pomôcok"],
  stdn:"ŠVP SJL, Elementárne čítanie: „sluchové identifikovanie a rozlišovanie zvukov, slov, slabík, hlások“",
  bloky:[
    {typ:"hadanka", text:"Ma – li – na. Čo je to?", odpoved:"Malina"},
    {typ:"hadanka", text:"Me – lón. Čo je to?", odpoved:"Melón 🍉"},
    {typ:"hadanka", text:"Lí – zan – ka. Čo je to?", odpoved:"Lízanka 🍭"},
    {typ:"hadanka", text:"La – vi – ca. Čo je to?", odpoved:"Lavica"},
    {typ:"spolu", text:"Vymeňte si úlohy: dieťa povie slovo po slabikách a vy hádate. Na každú slabiku môžete tlesknúť alebo poskočiť."}
  ]},

{ id:"mat-porovnaj", datum:"2026-11-04", predmet:"MAT", kod:"MAT-CO-2",
  nazov:"Viac, menej, alebo rovnako? Znaky <, >, =",
  uvod:"Na dvoch tanieroch sú sušienky. Dieťa porovná, kde je viac, a vyberie správny znak. Na úrovni Výzva porovnáva už len čísla bez obrázkov.",
  meta:["dieťa samo","2 minúty","tablet so zvukom"],
  stdn:"ŠVP MAT, Čísla a operácie s číslami: „aplikovanie metód porovnávania – väčší, menší, rovný, najväčší, najmenší“",
  bloky:[
    {typ:"aktivita", text:"Porovnaj sušienky na tanieroch.",
     hra:{druh:"porovnaj", urovne:[["●","Ľahšie"],["●●","Bežné"],["●●●","Výzva"]], predvolena:1, kol:4}},
    {typ:"rozhovor", zacni:"„Ty máš na tanieri 4 kúsky jablka a ja 3. Kto má viac?“",
     otazky:["Kto má viac? Ako si to zistil?","Čo urobíme, aby sme mali rovnako?","Nakresli mi znak „menší ako“. Ako si pamätáš, na ktorú stranu sa otvára?"],
     preteba:"Pomôcka, ktorú deti poznajú: znak sa otvára ako hladné ústa k väčšiemu číslu. V škole hovoria „je väčší ako“, „je menší ako“, „rovná sa“."}
  ]},

{ id:"anj-colours", datum:"2026-11-04", predmet:"ANJ", kod:"ANJ-RE-2",
  nazov:"Colours: red, blue, yellow, green",
  uvod:"Štyri farby po anglicky. Dieťa ťukne na farbu a vypočuje si ju, potom uhádne vec z krátkej anglickej hádanky. Na záver sa môžete zahrať „I spy“.",
  meta:["dieťa samo aj s rodičom","3 minúty","tablet so zvukom"],
  stdn:"ŠVP ANJ, Počúvanie s porozumením: „Rozoznať bežné, známe slová za predpokladu, že sú vyslovené zreteľne a pomaly v známom kontexte.“",
  bloky:[
    {typ:"pocuvanie", text:"Ťukni na farbu a vypočuj si, ako sa povie po anglicky.",
     slova:[["🔴","red"],["🔵","blue"],["🟡","yellow"],["🟢","green"]]},
    {typ:"hadanka", text:"I am yellow and I am in the sky. What am I?", napoveda:"Som žlté a som na oblohe.", odpoved:"The sun – slnko ☀️"},
    {typ:"spolu", text:"Hra „I spy“: povedzte „I spy something red“ a dieťa hľadá v izbe niečo červené. Potom sa vymeňte."}
  ]},

/* ---------- 3. 11. 2026 (utorok) ---------- */
{ id:"sjl-m-zaciatok", datum:"2026-11-03", predmet:"SJL", kod:"SJL-PP-2",
  nazov:"Čo sa začína na M? Myš, melón, mesiac",
  uvod:"Dieťa ťuká na obrázky, ktorých názov sa začína hláskou M. Každý obrázok sa po ťuknutí ozve, takže dieťa počuje, či má pravdu.",
  meta:["dieťa samo","2 minúty","tablet so zvukom"],
  stdn:"ŠVP SJL, Písaná produkcia: „sluchové identifikovanie a rozlišovanie zvukov, slov, slabík, hlások“",
  bloky:[
    {typ:"aktivita", text:"Ťukni na obrázky, ktoré sa začínajú na M. Keď ťukneš, obrázok sa ozve.",
     hra:{druh:"vyber", spravne:"M", polozky:[["🐭","myš"],["🍉","melón"],["🚲","bicykel"],["🌙","mesiac"],["🐝","včela"],["🥛","mlieko"],["🍋","citrón"],["🐻","medveď"]]}},
    {typ:"rozhovor", zacni:"„Mňam, mám chuť na niečo, čo sa začína na Mmm… Uhádneš, na čo?“",
     otazky:["Čo v kuchyni sa začína na M?","Počuješ M na začiatku alebo na konci slova dom?","Vymysli slovo, v ktorom je M dvakrát."],
     preteba:"M vyslovuj ako dlhé „mmm“, nie „em“. Keď dieťa nájde M v strede slova, spýtaj sa, kde presne ho počuje."}
  ]},

{ id:"mat-6-okolo", datum:"2026-11-03", predmet:"MAT", kod:"MAT-CO-1",
  nazov:"Kde sa skrýva číslo 6?",
  uvod:"Šesť vajíčok v krabičke, šesť nôh má mravec, šesť bodiek na kocke. Skúste spolu nájsť doma alebo vonku čo najviac vecí, ktorých je presne šesť.",
  meta:["spolu s rodičom","10 minút","doma alebo vonku"],
  stdn:"ŠVP MAT, Čísla a operácie s číslami: „porozumenie a modelovanie čísel ako počtu prvkov množiny, ako poradie, ako predchodcu alebo nasledovníka“",
  bloky:[
    {typ:"spolu", text:"Lov na šestky: každú nájdenú šestku (6 lyžičiek, 6 gombíkov, 6 bodiek) si zapíšte čiarkou alebo nakreslite. Keď sa vec nedá spočítať naraz, ukladajte ju po jednej do radu."},
    {typ:"rozhovor", zacni:"„V krabičke je 6 vajíčok. Myslíš, že by sa tam zmestilo aj siedme?“",
     otazky:["Koľko vajíčok zostane, keď 1 použijeme na palacinky?","Ako ukážeš 6 na prstoch? Dá sa to aj inak?","Mravec má 6 nôh. Koľko nôh majú 2 mravce? Skús to nakresliť."],
     preteba:"Nevadí, ak dieťa ráta po jednom. Pomáha, keď pri každom predmete ukáže prstom."}
  ]},

{ id:"anj-numbers", datum:"2026-11-03", predmet:"ANJ", kod:"ANJ-RE-2",
  nazov:"Numbers one to six",
  uvod:"Anglické čísla od one po six. Dieťa si ich vypočuje ťuknutím na kartičku a potom háda, ktoré číslo nasleduje po five. Hodí sa k matematike, kde sa práve preberá šestka.",
  meta:["dieťa samo","3 minúty","tablet so zvukom"],
  stdn:"ŠVP ANJ, Počúvanie s porozumením: „Rozoznať bežné, známe slová za predpokladu, že sú vyslovené zreteľne a pomaly v známom kontexte.“",
  bloky:[
    {typ:"pocuvanie", text:"Ťukni na číslo a vypočuj si, ako sa povie po anglicky.",
     slova:[["1️⃣","one"],["2️⃣","two"],["3️⃣","three"],["4️⃣","four"],["5️⃣","five"],["6️⃣","six"]]},
    {typ:"hadanka", text:"One, two, three, four, five… What comes next?", napoveda:"Čo nasleduje po päť?", odpoved:"Six – šesť 6️⃣"}
  ]},


/* ---------- 2. 11. 2026 ---------- */
{ id:"sjl-slabiky-i", datum:"2026-11-02", predmet:"SJL", kod:"SJL-PP-2",
  nazov:"Slabiky s novým písmenom I: mi, li, mí, lí",
  uvod:"Hlas povie slabiku, napríklad „mi“ alebo „lá“, a dieťa ťukne na správnu kartičku. Slabiky môžete čítať aj vy sami (prepínač „Kto číta: Rodič“) a tablet ich len zopakuje.",
  meta:["dieťa samo","2 minúty","tablet so zvukom"],
  stdn:"ŠVP SJL, Písaná produkcia: „sluchové identifikovanie a rozlišovanie zvukov, slov, slabík, hlások“",
  bloky:[
    {typ:"aktivita", text:"Počúvaj a ťukni na slabiku, ktorú počuješ.",
     hra:{druh:"slabiky", urovne:[["●","Ľahšie"],["●●","Bežné"],["●●●","Výzva"]], predvolena:0, kol:5, rodic:true}},
    {typ:"tlac", text:"Pracovný list na 1 stranu A4: počuješ I?, vyfarbi húsenicu, spoj slabiku s obrázkom, prečítaj a nakresli.", subor:"sjl-slabiky-i.pdf"},
    {typ:"rozhovor", zacni:"„Viem slovo, ktoré sa začína na mi: mi-mi-no. Vymyslíš iné?“",
     otazky:["Čo v kuchyni sa začína na ma alebo me?","Počuješ v slove lístok krátke i alebo dlhé í? A v slove list?","Povedz mi slovo po slabikách a ja budem hádať, čo to je."],
     preteba:"Slabiky čítaj ťahavo a spolu („mmmi“), nie po písmenách („em-í“). Dlhé í sa v škole volá í s dĺžňom."}
  ]},

{ id:"mat-poradie", datum:"2026-11-02", predmet:"MAT", kod:"MAT-CO-2",
  nazov:"Kto je v rade tretí? Poradie do 6",
  uvod:"Zvieratká stoja v rade na zmrzlinu. Dieťa počúva, ktoré je prvé, tretie alebo posledné, a ťukne naň. Precvičuje slová, ktorými sa v škole označuje poradie.",
  meta:["dieťa samo","2 minúty","tablet so zvukom"],
  stdn:"ŠVP MAT, Čísla a operácie s číslami: „porozumenie a modelovanie čísel ako počtu prvkov množiny, ako poradie, ako predchodcu alebo nasledovníka“",
  bloky:[
    {typ:"aktivita", text:"Zvieratká čakajú na zmrzlinu. Prvé stojí pri stánku.",
     hra:{druh:"poradie", urovne:[["●","Ľahšie"],["●●","Bežné"],["●●●","Výzva"]], predvolena:1, kol:4}},
    {typ:"rozhovor", zacni:"„Pozri, pri pokladni sú pred nami traja ľudia. Koľkí v rade sme my?“",
     otazky:["Kto je v rade prvý a kto posledný?","Keď jeden človek zaplatí a odíde, koľkí budeme potom?","Postav hračky do radu a daj mi úlohu: ktorá je piata?"],
     preteba:"V škole sa tomu hovorí poradie. Zapisuje sa číslom s bodkou (3. = tretí). Ukážte si vždy, odkiaľ rad začína."}
  ]},

{ id:"mat-sucet-6", datum:"2026-11-02", predmet:"MAT", kod:"MAT-CO-3",
  nazov:"Koľko je spolu? Súčet do 6",
  uvod:"Na dvoch tanieroch sú jahody a dieťa zisťuje, koľko ich je spolu. Výsledok sčítania sa v škole volá súčet. Na úrovni Výzva ježko jahody zjedá a počíta sa, koľko zostalo.",
  meta:["dieťa samo","2 – 3 minúty","tablet alebo skutočné ovocie"],
  stdn:"ŠVP MAT, Čísla a operácie s číslami: „porozumenie pojmov sčítanec, súčet, menšenec, menšiteľ, rozdiel“",
  bloky:[
    {typ:"aktivita", text:"Koľko jahôd je spolu?",
     hra:{druh:"sucet", urovne:[["●","Ľahšie"],["●●","Bežné"],["●●●","Výzva"]], predvolena:1, kol:4}},
    {typ:"tlac", text:"Pracovný list Číslo 6 na 1 stranu A4: obtiahni šestky, nájdi rámčeky so 6 vecami, veverička a vrecúško, spočítaj bodky na kockách.", subor:"mat-cislo-6.pdf"},
    {typ:"spolu", text:"Hra „Dve ruky“: dajte do jednej dlane 1 až 3 gombíky a do druhej tiež 1 až 3. Otvorte najprv jednu ruku, potom druhú. Dieťa povie, koľko je spolu, a potom si vymeníte úlohy."},
    {typ:"rozhovor", zacni:"„Kúpil som 3 rožky a ty si do košíka pridal ešte 2. Koľko ich nesieme domov?“",
     otazky:["Koľko rožkov je spolu? Ako si to zistil?","Keď 2 rožky zjeme cestou, koľko ich ostane?","Vymysli úlohu ty mne a ja ti ju zapíšem ako príklad."],
     preteba:"Výsledok sčítania sa v škole volá súčet. Nevadí, ak dieťa ešte ráta po jednom na prstoch."}
  ]},

/* ---------- 27. – 31. 10. 2026 ---------- */
{ id:"sjl-l", datum:"2026-10-31", predmet:"SJL", kod:"SJL-PP-2",
  nazov:"Písmeno L: lev, lopta, list",
  uvod:"Dieťa hľadá veci, ktorých názov sa začína na hlásku L, napríklad lev alebo lopta. Hodí sa na pár minút pri tablete aj na hru „vidím niečo na L“ cestou zo školy.",
  meta:["dieťa samo aj s rodičom","5 minút","tablet aj papier"],
  stdn:"ŠVP SJL, Písaná produkcia: „sluchové identifikovanie a rozlišovanie zvukov, slov, slabík, hlások“",
  bloky:[
    {typ:"aktivita", text:"Ťukni na obrázky, ktoré sa začínajú na L. Keď ťukneš, obrázok sa ozve.",
     hra:{druh:"vyber", spravne:"L", polozky:[["🦁","lev"],["⚽","lopta"],["🐱","mačka"],["🍃","list"],["🥄","lyžica"],["🚗","auto"],["🐟","ryba"],["🦊","líška"]]}},
    {typ:"rozhovor", zacni:"„Vidím niečo, čo sa začína na Lll… Uhádneš?“",
     otazky:["Čo ešte okolo nás sa začína na L?","Počuješ L na začiatku alebo na konci slova stôl?","Vymysli ty slovo na L a ja budem hádať."],
     preteba:"Hovor „hláska“, keď ide o zvuk, a „písmeno“, keď ide o to, čo píšeme. L vyslovuj krátko: „lll“, nie „el“."}
  ]},

{ id:"mat-6", datum:"2026-10-29", predmet:"MAT", kod:"MAT-CO-4",
  nazov:"Koľko orieškov má veverička vo vrecúšku? Rozklad čísla 6",
  uvod:"Veverička schovala časť orieškov do vrecúška. Dieťa zisťuje, koľko chýba do celku, a tak si precvičuje rozklad čísla. Obťažnosť zvolíte podľa toho, ako sa darí.",
  meta:["dieťa samo","3 – 5 minút","tablet alebo skutočné oriešky"],
  stdn:"ŠVP MAT, Čísla a operácie s číslami: „modelovanie a využívanie rôznych rozkladov čísel“",
  bloky:[
    {typ:"aktivita", text:"Veverička si schovala oriešky do vrecúška.",
     hra:{druh:"rozklad", urovne:[["●","Ľahšie",5],["●●","Bežné",6],["●●●","Výzva",10]], predvolena:1, kol:3}},
    {typ:"rozhovor", zacni:"„Na stole je 6 lyžičiek, ale budeme jesť štyria. Zostane nejaká navyše?“",
     otazky:["Koľko lyžičiek zostane? Ako si na to prišiel?","Mám v ruke 2 oriešky. Koľko ich treba, aby bolo 6?","Teraz zadaj úlohu ty mne. Možno sa schválne pomýlim."],
     preteba:"V škole sa tomu hovorí rozklad čísla. Prsty a predmety sú v poriadku, nemusí to byť spamäti."}
  ]},

{ id:"anj-school", datum:"2026-10-27", predmet:"ANJ", kod:"ANJ-RE-2",
  nazov:"School things: pencil, book, bag",
  uvod:"Päť anglických slov o školských veciach: pencil, book, bag, ruler, crayon. Dieťa si ich vypočuje a potom uhádne vec z krátkej anglickej hádanky.",
  meta:["dieťa samo","3 minúty","tablet so zvukom"],
  stdn:"ŠVP ANJ, Počúvanie s porozumením: „Rozoznať bežné, známe slová za predpokladu, že sú vyslovené zreteľne a pomaly v známom kontexte.“",
  bloky:[
    {typ:"pocuvanie", text:"Ťukni na vec a vypočuj si, ako sa povie po anglicky.",
     slova:[["✏️","pencil"],["📕","book"],["🎒","bag"],["📏","ruler"],["🖍️","crayon"]]},
    {typ:"hadanka", text:"I am long and thin. I can write and draw. What am I?", napoveda:"Som dlhá a tenká, píšem a kreslím.", odpoved:"A pencil – ceruzka ✏️"}
  ]},

/* ---------- 20. – 26. 10. 2026 ---------- */
{ id:"cap-mlaka", datum:"2026-10-24", predmet:"CAP", kod:"CAP-ZE-2",
  nazov:"Kam zmizne mláka?",
  uvod:"Po daždi sa mláky pomaly zmenšujú. Kam sa podela voda? Porozprávajte sa o tom a vyskúšajte spolu, ako rýchlo sa kocka ľadu zmení na vodu.",
  meta:["10 minút + čakanie","kocka ľadu, tanierik"],
  stdn:"ŠVP Človek a príroda, cieľ 1: „Formulovať predpoklad a zdôvodniť ho skúsenosťou.“",
  bloky:[
    {typ:"rozhovor", zacni:"„Pozri, včera tu bola veľká mláka a dnes je menšia. Kam sa podela?“",
     otazky:["Kde všade vidíš vodu, keď prší?","Čím sa líši dážď, sneh a ľad?","Môžeme piť vodu z mláky? Odkiaľ je voda z kohútika?"],
     preteba:"Nemusíš vysvetľovať vyparovanie. Stačí, keď dieťa háda a pozoruje."},
    {typ:"spolu", text:"Dajte kocku ľadu na tanierik. Najprv hádajte, za ako dlho sa roztopí, potom kontrolujte každých 10 minút. Kto bol bližšie?"}
  ]},

{ id:"sjl-i", datum:"2026-10-22", predmet:"SJL", kod:"SJL-PP-2",
  nazov:"Hádanky na písmeno I",
  uvod:"„Je tenká a ostrá, má očko, ale nevidí. Čo je to?“",
  meta:["spolu s rodičom","2 minúty","bez pomôcok"],
  stdn:"ŠVP SJL, Písaná produkcia: „sluchové identifikovanie a rozlišovanie zvukov, slov, slabík, hlások“",
  bloky:[
    {typ:"hadanka", text:"Je tenká a ostrá, má očko, ale nevidí. Čo je to?", odpoved:"Ihla"},
    {typ:"hadanka", text:"Domček zo snehu a ľadu, bývajú v ňom ľudia na severe. Čo je to?", odpoved:"Iglu"},
    {typ:"hadanka", text:"Je malá a horúca, vyskočí z ohňa a hneď zhasne. Čo je to?", odpoved:"Iskra"},
    {typ:"rozhovor", zacni:"„Ja viem jedno slovo na I: ihrisko. Poznáš ešte iné?“",
     otazky:["Nájdeš slovo, kde je I na začiatku?","Je I aj v slove lipa? Kde?","Vymysli hádanku ty mne."],
     preteba:"Krátke i a dlhé í sú v šlabikári zvlášť. Nič neopravuj, len zopakuj slovo správne."}
  ]}
];
