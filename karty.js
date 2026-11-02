/* =====================================================================
   OBSAH KARIET – Prváčik doma
   Tu sa píše len obsah. Vzhľad a správanie sú v index.html.

   Nová karta = skopíruj jeden blok { ... }, zmeň texty a dátum.
   Poradie v súbore nie je dôležité, web zoradí karty podľa dátumu.
   Týždne („Tento týždeň“, „Minulý týždeň“) a štítok NOVÉ sa počítajú samy.

   predmet: SJL, MAT, ANJ, CAP
   kod:     kód témy z mapy učiva (prehlad/01_mapa_uciva_1_rocnik.md)
   stdn:    štandard ŠVP (citát)
   bloky:   rozhovor, aktivita, pocuvanie, hadanka, spolu, tlac

   Pravidlo pre text čítaný nahlas: veta, ktorá končí číslom, nemá bodku.
   ===================================================================== */
window.KARTY = [

/* ---------- 2. 11. 2026 ---------- */
{ id:"sjl-slabiky-i", datum:"2026-11-02", predmet:"SJL", kod:"SJL-PP-2",
  nazov:"Slabiky s novým písmenom I: mi, li, mí, lí",
  uvod:"Hlas povie slabiku, napríklad „mi“ alebo „lá“, a dieťa ťukne na správnu kartičku. Slabiky môžete čítať aj vy sami (prepínač „Hovorí rodič“) a tablet ich len zopakuje.",
  meta:["dieťa samo","2 minúty","tablet so zvukom"],
  stdn:"ŠVP SJL, Písaná produkcia: „sluchové identifikovanie a rozlišovanie zvukov, slov, slabík, hlások“",
  bloky:[
    {typ:"aktivita", text:"Počúvaj a ťukni na slabiku, ktorú počuješ.",
     hra:{druh:"slabiky", urovne:[["●","Ľahšie"],["●●","Bežné"],["●●●","Výzva"]], predvolena:0, kol:5, rodic:true}},
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
    {typ:"tlac", text:"Pracovný list na 1 stranu A4: obtiahni L, zakrúžkuj obrázky na L, nakresli vlastný.", subor:"pismeno-L.pdf"},
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
     preteba:"V škole sa tomu hovorí rozklad čísla. Prsty a predmety sú v poriadku, nemusí to byť spamäti."},
    {typ:"tlac", text:"Kartičky 0 – 6 na vystrihnutie, hodia sa na hru „schovaj a hádaj“.", subor:"karticky-0-6.pdf"}
  ]},

{ id:"anj-school", datum:"2026-10-27", predmet:"ANJ", kod:"ANJ-RE-2",
  nazov:"School things: pencil, book, bag",
  uvod:"Päť anglických slov o školských veciach: pencil, book, bag, ruler, crayon. Dieťa si ich vypočuje a potom uhádne vec z krátkej anglickej hádanky.",
  meta:["dieťa samo","3 minúty","tablet so zvukom"],
  stdn:"ŠVP ANJ, Počúvanie s porozumením: rozumieť známym slovám s obrazovou oporou",
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
