/* =====================================================================
   OBSAH KARIET – Prváčik doma
   Tu sa píše len obsah. Vzhľad a správanie sú v index.html.

   Nová karta = skopíruj jeden blok { ... }, zmeň texty a dátum.
   Poradie v súbore nie je dôležité, web zoradí karty podľa dátumu.
   Týždne („Tento týždeň“, „Minulý týždeň“) a štítok NOVÉ sa počítajú samy.
   Karta s budúcim dátumom sa ukáže až v ten deň (zásoba). Náhľad: adresa s ?nahlad
   Každá sada má vždy kartu pre Slovenčinu, Matematiku aj Angličtinu.
   Angličtina zatiaľ bez pracovných listov na tlač, len aktivity so zvukom.
   Na tlač: {typ:"tlac", urovne:3, text:"…", subor:"id-karty.pdf"} = list v 3 úrovniach
   (●○○ Ľahšie, ●●○ Bežné, ●●● Výzva). Súbory tlac/pdf/id-karty-1.pdf … -3.pdf a .png vyrobí tlac/vyrob-pdf.js.

   predmet: SJL, MAT, ANJ, CAP
   kod:     značka témy (predmet-komponent-číslo)
   stdn:    štandard ŠVP (citát)
   bloky:   rozhovor, aktivita, pocuvanie, hadanka, spolu, tlac
   hry (aktivita): vyber, rozklad, slabiky, poradie, sucet, porovnaj, kocky
   kocky:   rezim "kolko" (Koľko je?, Výzva = postav číslo) alebo "spoj" (+, Výzva = najprv odhad);
            pri úrovni {max:6} = čísla najviac do 6 (podľa témy), {max:20} alebo {max:100} = väčšie čísla
   pocuvanie: jazyk:"sk-SK" pre slovenčinu (inak angličtina), citanie:true = veľké slová bez obrázkov

   Pravidlo pre text čítaný nahlas: veta, ktorá končí číslom, nemá bodku.
   ===================================================================== */
window.KARTY = [

/* =========================================================
   ZÁSOBA – karty s budúcim dátumom sa zobrazia až v ten deň.
   Vopred ich uvidíš na adrese s ?nahlad na konci.
   ========================================================= */

/* ---------- 13. 11. 2026 (piatok) ---------- */
{ id:"sjl-co-uz-viem", datum:"2026-11-13", predmet:"SJL", kod:"SJL-RV-1",
  nazov:"Čo už viem? Slová, slabiky a hádanky",
  uvod:"Týždenné opakovanie: dieťa si prečíta pár starších slov a slabík, potom hádá, čo je to, podľa písmena, na ktoré sa slovo začína. Na konci samo povie, čo mu išlo najlepšie.",
  meta:["dieťa samo aj s rodičom","5 minút","tablet so zvukom"],
  stdn:"ŠVP SJL, Elementárne čítanie: „čítanie slabík, slov, viet a krátkych textov s postupne sa zvyšujúcou náročnosťou“",
  bloky:[
    {typ:"pocuvanie", citanie:true, jazyk:"sk-SK", text:"Najprv prečítaj slabiku alebo slovo nahlas. Potom naň ťukni a skontroluj sa.",
     slova:[["","mi"],["","lá"],["","mama"],["","Ela"],["","lama"],["","malé"],["","Emil"],["","ale"]]},
    {typ:"hadanka", text:"Je to zviera s dlhým chvostom. Rada sa schováva v diere a rada jedáva syr. Začína sa na M. Čo je to?", odpoved:"Myš 🐭"},
    {typ:"hadanka", text:"Je to chlpaté zviera s dlhým krkom. Žije vysoko v horách. Začína sa na L. Čo je to?", odpoved:"Lama 🦙"},
    {typ:"hadanka", text:"Má štyri kolesá a vozí ľudí. Začína sa na A. Čo je to?", odpoved:"Auto 🚗"},
    {typ:"tlac", urovne:3, text:"Zhrnutie všetkých písmen: zmiešané úlohy, tajné slová a obrázok bez písmena A. Dole sa dieťa samo ohodnotí. Výzva: ťažšie tajné slová a nájdenie chyby.", subor:"sjl-co-uz-viem.pdf"},
    {typ:"rozhovor", zacni:"„Tento týždeň sme sa naučili veľa nových vecí. Povedz mi, čo ti išlo najlepšie.“",
     otazky:["Čo z toho ti išlo najľahšie?","Čo si musel ešte skúsiť viackrát? Čo ti pomohlo?","Čo by si chcel ešte trénovať? Vymysli si na to vlastnú úlohu."],
     preteba:"Nejde o známku. Dieťa samo povie, čo mu ide. Ak povie „neviem“, pripomeňte jednu vec, ktorá sa mu tento týždeň podarila."}
  ]},

{ id:"mat-rozklad-6", datum:"2026-11-13", predmet:"MAT", kod:"MAT-CO-4",
  nazov:"Šesť orieškov pod hrnčekom: rozklad čísla 6",
  uvod:"Šestka sa dá rozložiť na dve časti rôznymi spôsobmi: 1 a 5, 2 a 4, 3 a 3. Veverička schová časť orieškov do vrecúška a dieťa háda, koľko ich tam je. Potom si to skúsite s hrnčekom.",
  meta:["dieťa samo aj s rodičom","8 minút","tablet, hrnček, 6 gombíkov"],
  stdn:"ŠVP MAT, Čísla a operácie s číslami: „modelovanie a využívanie rôznych rozkladov čísel“",
  bloky:[
    {typ:"aktivita", text:"Veverička si schovala oriešky do vrecúška.",
     hra:{druh:"rozklad", urovne:[["●","Ľahšie",5],["●●","Bežné",6],["●●●","Výzva",10]], predvolena:1, kol:3}},
    {typ:"spolu", text:"Hra „Pod hrnčekom“: vezmite 6 gombíkov. Dieťa zavrie oči a vy časť gombíkov skryjete pod hrnček. Dieťa otvorí oči, spočíta tie, ktoré vidí, a povie, koľko je ich pod hrnčekom. Potom hrnček zodvihnite a skontrolujte spolu. Vymeňte sa."},
    {typ:"tlac", urovne:3, text:"Číslo 6 na dve časti: domino, jablká na tanieroch, domčeky a spájanie dvojíc. Výzva: tri časti, všetky rozklady a chyták.", subor:"mat-rozklad-6.pdf"},
    {typ:"rozhovor", zacni:"„Mám 6 jahôd a chcem ich rozdeliť na dva taniere. Ako to môžem urobiť?“",
     otazky:["Na prvý tanier dáme 2 jahody. Koľko dáme na druhý?","Nájdeš aj iný spôsob, ako rozdeliť 6 jahôd na dva taniere? A ešte iný?","Je 4 a 2 to isté ako 2 a 4? Ako by si to vysvetlil plyšákovi?"],
     preteba:"V škole sa tomu hovorí rozklad čísla. Obe časti spolu dajú vždy celé číslo a poradie častí nevadí."}
  ]},

{ id:"anj-chant-colours", datum:"2026-11-13", predmet:"ANJ", kod:"ANJ-RE-3",
  nazov:"Red, red, red: riekanka o farbách",
  uvod:"Krátka riekanka o farbách, ktorú sa dá tlieskať ako rytmus. Dieťa opakuje po tablete riadok po riadku a potom vymení jednu farbu za inú.",
  meta:["dieťa samo aj s rodičom","3 minúty","tablet so zvukom"],
  stdn:"ŠVP ANJ, Ústny prejav: „Reprodukovať krátku riekanku/pieseň.“",
  bloky:[
    {typ:"pocuvanie", text:"Vypočuj si riekanku riadok po riadku a opakuj po tablete.",
     slova:[["🔴","Red, red, red."],["🎒","My bag is red."],["🟢","Green, green, green."],["✏️","My pencil is green."]]},
    {typ:"spolu", text:"Zatlieskajte rytmus riekanky: pri „Red, red, red“ trikrát tlesknite. Rodič tlieska rytmus a dieťa ho zopakuje (ozvena rytmu). Potom vymeňte jednu farbu: „Blue, blue, blue. My bag is blue.“ Dieťa povie, ktorú vec z izby chce do riekanky pridať."}
  ]},

/* ---------- 12. 11. 2026 (štvrtok) ---------- */
{ id:"sjl-vety-mama", datum:"2026-11-12", predmet:"SJL", kod:"SJL-RV-1",
  nazov:"Čítame spojenia a vety: malá lama, Mama má Emila",
  uvod:"Z písmen M, A, E, L, I sa dajú čítať už aj spojenia a prvé krátke vety. Dieťa ich najprv prečíta samo nahlas, potom ťukne a tablet mu ich prečíta, aby sa skontrolovalo.",
  meta:["dieťa samo aj s rodičom","5 minút","tablet so zvukom"],
  stdn:"ŠVP SJL, Elementárne čítanie: „čítanie slabík, slov, viet a krátkych textov s postupne sa zvyšujúcou náročnosťou“",
  bloky:[
    {typ:"pocuvanie", citanie:true, jazyk:"sk-SK", text:"Najprv prečítaj nahlas. Potom ťukni na kartičku a skontroluj sa.",
     slova:[["","malá lama"],["","milá mama"],["","Ema a mama"],["","Emil a Ela"],["","Mama má Emila."],["","Mama mala Emila."]]},
    {typ:"tlac", urovne:3, text:"Spojenia a vety z písmen M, A, E, L, I: čítaj, nájdi slovo, ktoré nepatrí, zmeň písmeno, pravda alebo nepravda podľa obrázka. Výzva: obrátené slová a skladanie viet.", subor:"sjl-vety-mama.pdf"},
    {typ:"spolu", text:"Lov slov: nájdite doma 5 vecí, ktoré sa začínajú na M alebo na L (napríklad mačka, lyžica, mydlo), a zapíšte ich čiarkami. Potom napíšte spolu veľkými tlačenými písmenami na papierik jedno spojenie, napríklad „malá lama“. Dieťa ho prečíta a nakreslí k nemu obrázok."}
  ]},

{ id:"mat-ciarky", datum:"2026-11-12", predmet:"MAT", kod:"MAT-ZV-2",
  nazov:"Čiarky a tabuľka: čoho je najviac?",
  uvod:"Čiarky sú najstarší spôsob počítania: za každú vec jedna čiarka a piata sa napíše naprieč cez štyri. Dieťa zapisuje čiarkami, čo vidí z okna alebo doma, a potom zisťuje, čoho je najviac.",
  meta:["spolu s rodičom","10 minút","papier, ceruzka, okno"],
  stdn:"ŠVP MAT, Závislosti, vzťahy a práca s údajmi: „zber, triedenie, usporiadanie a zaznamenávanie údajov graficky – tabuľka, graf, diagram, piktogram, početnosti vyjadrené sčítacími čiarkami a numericky“",
  bloky:[
    {typ:"spolu", text:"Tri minúty sa dívajte z okna alebo z auta a čiarkami zapisujte autá podľa farby (biele, červené, iné). Dieťa zapisuje, vy ukazujete. Piatu čiarku napíšte naprieč cez štyri. Na konci sa spýtajte: Akých áut bolo najviac?"},
    {typ:"spolu", text:"Lov doma: nájdite vo všetkých izbách okná, dvere a stoličky. Každú nájdenú vec zapíšte čiarkou do tabuľky na papieri. Na konci: čoho je najviac a čoho najmenej?"},
    {typ:"tlac", urovne:3, text:"Spočítaj obrázky, zapíš ich čiarkami a vyfarbi stĺpce. Výzva: obrázky, ktoré znamenajú dva kusy, hod kockou a chyták s chybou v zápise.", subor:"mat-ciarky.pdf"}
  ]},

{ id:"anj-hello-this", datum:"2026-11-12", predmet:"ANJ", kod:"ANJ-IN-2",
  nazov:"What's this? It's a pencil",
  uvod:"Rodič s plyšákom ukazuje na vec a pýta sa po anglicky: „What's this?“ Dieťa odpovedá aspoň jedným slovom. Vzorové vety si najprv vypočujete na tablete.",
  meta:["spolu s rodičom","5 minút","plyšák, školské veci"],
  stdn:"ŠVP ANJ, Ústny prejav: „Na niečo ukázať a opýtať sa, čo to je.“",
  bloky:[
    {typ:"pocuvanie", text:"Ťukni a vypočuj si otázku a odpoveď.",
     slova:[["👋","Hello"],["❓","What's this?"],["✏️","It's a pencil"],["📏","It's a ruler"]]},
    {typ:"rozhovor", zacni:"„Hello! (plyšák pozdraví) Pozri, čo mám v tašičke. What's this?“",
     otazky:["Hello! Pozdrav plyšáka po anglicky.","What's this? Ukáž na ceruzku. Povieš po anglicky, čo to je?","What colour is it? Povedz farbu a ukáž na vec."],
     preteba:"Stačí jedno slovo, nemusí to byť celá veta. Chyby neopravuj, len zopakuj správne."}
  ]},

/* ---------- 11. 11. 2026 (streda) ---------- */
{ id:"sjl-slabiky-dlhe", datum:"2026-11-11", predmet:"SJL", kod:"SJL-PP-2",
  nazov:"Krátke a dlhé slabiky: ma – má, li – lí",
  uvod:"Hlas povie slabiku, napríklad „ma“ alebo „má“, a dieťa ťukne na tú správnu. Dlhá slabika trvá dlhšie a má dĺžeň. Slabiky môžete čítať aj vy sami (prepínač „Kto číta: Rodič“).",
  meta:["dieťa samo","2 minúty","tablet so zvukom"],
  stdn:"ŠVP SJL, Písaná produkcia: „sluchové identifikovanie a rozlišovanie zvukov, slov, slabík, hlások“",
  bloky:[
    {typ:"aktivita", text:"Počúvaj a ťukni na slabiku, ktorú počuješ.",
     hra:{druh:"slabiky", urovne:[["●","Ľahšie"],["●●","Bežné"],["●●●","Výzva"]], predvolena:1, kol:5, rodic:true}},
    {typ:"tlac", urovne:3, text:"Krátke a dlhé slabiky: spájanie slabík, slová z dvoch slabík a prvá krížovka z lama, mama a Ema. Výzva: rýchle čítanie a vzory.", subor:"sjl-slabiky-dlhe.pdf"},
    {typ:"rozhovor", zacni:"„Povedz po slabikách slovo ma-ma. Počuješ, ktorá slabika je dlhšia?“",
     otazky:["Počuješ rozdiel medzi ma a má? Zahraj ho tleskaním: krátky a dlhý tlesk.","V slove lama sú dve slabiky. Ktorá je kratšia a ktorá dlhšia?","Vymysli slovo s dlhou slabikou. Ja uhádnem, kde je dlhá."],
     preteba:"Dĺžeň je čiarka nad samohláskou (á). Dlhú slabiku vyslovte natiahnuto („máá“). V šlabikári sú krátke a dlhé slabiky zvlášť."}
  ]},

{ id:"mat-skaceme-6", datum:"2026-12-02", predmet:"MAT", kod:"MAT-CO-3",
  nazov:"Zajko skáče po číselnej osi do 6",
  uvod:"Sčítanie je skok doprava, odčítanie skok doľava. Dieťa najprv sčíta jahody na tablete a potom skáče po číslach 0 až 6 na zemi ako zajko po číselnej osi.",
  meta:["dieťa samo aj s rodičom","10 minút","tablet, papiere s číslami"],
  stdn:"ŠVP MAT, Čísla a operácie s číslami: „znalosť a používanie statických a dynamických modelov sčítania a odčítania“",
  bloky:[
    {typ:"aktivita", text:"Koľko jahôd je spolu?",
     hra:{druh:"sucet", urovne:[["●","Ľahšie"],["●●","Bežné"],["●●●","Výzva"]], predvolena:1, kol:4}},
    {typ:"spolu", text:"Skákacia os: na zem položte papiere s číslami 0 až 6 v rade. Dieťa stojí na dvojke a skočí o tri dopredu. Na ktorom čísle pristane? Potom skočí o dva dozadu. Spolu povedzte, ako sa to zapíše: dva plus tri je päť. Potom vymeňte úlohy: dieťa zadáva, kam skáčete vy."},
    {typ:"tlac", urovne:3, text:"Zajko skáče po číselnej osi: oblúky, nakresli skok a koľko skokov chýba. Výzva: dva skoky za sebou, všetky cesty z 0 na 6 a chyták o skoku dozadu.", subor:"mat-skaceme-6.pdf"}
  ]},

{ id:"anj-teacher-says", datum:"2026-11-11", predmet:"ANJ", kod:"ANJ-RE-1",
  nazov:"Teacher says: jump, turn around, touch your nose",
  uvod:"Nové anglické pokyny s pohybom. Dieťa ich najprv počuje na tablete a potom ich robí. Hra „Teacher says“ platí len vtedy, keď pred pokynom zaznie „Teacher says“.",
  meta:["spolu s rodičom","5 minút","tablet so zvukom"],
  stdn:"ŠVP ANJ, cieľ pre 1. cyklus: „Rozumieť krátkym inštrukciám.“",
  bloky:[
    {typ:"pocuvanie", text:"Ťukni na obrázok, vypočuj si pokyn a urob ho!",
     slova:[["🦘","jump"],["🔄","turn around"],["👃","touch your nose"],["🚪","point to the door"],["🙋","hands up"],["👋","wave"]]},
    {typ:"spolu", text:"Hra „Teacher says“: rodič dáva pokyny po anglicky a dieťa ich robí len vtedy, keď pred pokynom povie „Teacher says“. Kto sa pomýli, nevypadáva, ale stáva sa učiteľom. Keď to ide ľahko, dávajte dva pokyny naraz („Teacher says: stand up and clap“) alebo nech je učiteľom dieťa."}
  ]},

/* ---------- 10. 11. 2026 (utorok) ---------- */
{ id:"sjl-j-zaciatok", datum:"2026-11-10", predmet:"SJL", kod:"SJL-PP-2",
  nazov:"Čo sa začína na J? Jablko, jahoda, ježko",
  uvod:"Dieťa ťuká na obrázky, ktorých názov sa začína hláskou J. Každý obrázok sa po ťuknutí ozve, takže dieťa počuje, či má pravdu. Písmeno J zatiaľ len počúvame a rozoznávame, nečítame.",
  meta:["dieťa samo","2 minúty","tablet so zvukom"],
  stdn:"ŠVP SJL, Písaná produkcia: „sluchové identifikovanie a rozlišovanie zvukov, slov, slabík, hlások“",
  bloky:[
    {typ:"aktivita", text:"Ťukni na obrázky, ktoré sa začínajú na J. Keď ťukneš, obrázok sa ozve.",
     hra:{druh:"vyber", spravne:"J", polozky:[["🍎","jablko"],["🍓","jahoda"],["🦔","ježko"],["🦌","jeleň"],["🦙","lama"],["🐭","myš"],["🚗","auto"],["🍉","melón"]]}},
    {typ:"tlac", urovne:3, text:"Písmeno J: obtiahni, nájdi J medzi podobnými písmenami, zakrúžkuj obrázky na J a odhaľ skrytý obrázok. Výzva: slovný vláčik, hádanka s nápovedami a vzory.", subor:"sjl-j-zaciatok.pdf"},
    {typ:"rozhovor", zacni:"„Jjj… ako jablko. Uhádneš, čo ešte začína na jjj?“",
     otazky:["Čo v kuchyni sa začína na J?","Čím sa začína jablko a čím jahoda? Čo majú rovnaké na začiatku?","Vymysli zvieratko, ktoré sa začína na J. Koľko slabík má jeho meno?"],
     preteba:"J vyslovuj krátko, ako „j“ (jjj), nie „dže“. Tablet povie písmeno ako názov (jé), hlásku vyslovte vy. Čítať s J budete až podľa šlabikára."}
  ]},

{ id:"mat-vzory", datum:"2026-11-10", predmet:"MAT", kod:"MAT-ZV-1",
  nazov:"Vzory: čo príde ďalej?",
  uvod:"Vzor je rad, ktorý sa stále opakuje: červený, modrý, červený, modrý… Dieťa z gombíkov skladá vzor, hľadá, čo príde ďalej, a nájde chybu, ktorú rodič schválne urobí.",
  meta:["spolu s rodičom","5 minút","gombíky alebo kocky"],
  stdn:"ŠVP MAT, Závislosti, vzťahy a práca s údajmi: „identifikovanie prvkov a pravidla opakujúceho sa vzoru tvoreného znakmi, symbolmi, obrázkami, číslami, napr. typu “ab”, “abb”, “aabb”, “abc”, “abbb”“",
  bloky:[
    {typ:"spolu", text:"Vezmite gombíky alebo kocky dvoch farieb. Poukladajte vzor: červený, modrý, červený, modrý. Dieťa ho predĺži o tri. Potom skúste ťažší vzor: dva červené, jeden modrý, dva červené, jeden modrý. Nech dieťa vzor povie nahlas ako riekanku."},
    {typ:"spolu", text:"Ozvena rytmu: rodič zatlieska krátky rytmus (tlesk, tlesk, dupot) a dieťa ho zopakuje. Potom ho predĺži a vymyslí vlastný rytmus pre vás."},
    {typ:"tlac", urovne:3, text:"Vzory z obrázkov a čísel: pokračuj v rade a doplň, čo chýba. Výzva: nájdi chybu vo vzore, vzor, ktorý rastie, a čísla v rade.", subor:"mat-vzory.pdf"},
    {typ:"rozhovor", zacni:"„Poukladal som gombíky: červený, modrý, červený, modrý, červený. Čo príde ďalej?“",
     otazky:["Aký gombík príde ďalej? Ako to vieš?","Aké pravidlo má tento vzor? Povedz ho nahlas ako riekanku.","Ja urobím vzor a schválne v ňom spravím chybu. Nájdeš ju a povieš, čo tam má byť?"],
     preteba:"V škole sa tomu hovorí vzor a jeho pravidlo. Rytmom (tlesk, dupot) sa to deti učia ľahšie ako z obrázkov."}
  ]},

{ id:"anj-riddles-colours", datum:"2026-11-10", predmet:"ANJ", kod:"ANJ-RE-2",
  nazov:"What am I? Hádanky a I spy",
  uvod:"Tri krátke anglické hádanky o jahode, čísle a žabke. Potom si zahrajte „I spy“: rodič povie „I spy something blue“ a dieťa hľadá v izbe niečo modré.",
  meta:["spolu s rodičom","5 minút","tablet so zvukom"],
  stdn:"ŠVP ANJ, Počúvanie s porozumením: „Rozoznať bežné, známe slová za predpokladu, že sú vyslovené zreteľne a pomaly v známom kontexte.“",
  bloky:[
    {typ:"hadanka", text:"I am small and red. I am a fruit. What am I?", napoveda:"Som malá a červená. Som ovocie.", odpoved:"A strawberry – jahoda 🍓"},
    {typ:"hadanka", text:"I am a number. I am after five. What am I?", napoveda:"Som číslo. Idem po päťke.", odpoved:"Six – šesť 6️⃣"},
    {typ:"hadanka", text:"I am green. I can jump. What am I?", napoveda:"Som zelená. Viem skákať.", odpoved:"A frog – žaba 🐸"},
    {typ:"spolu", text:"Hra „I spy“: rodič povie „I spy something blue“ a dieťa hľadá v izbe niečo modré a ukáže. Potom sa vymeňte: dieťa povie „I spy something red“ a vy hľadáte. Keď to ide ľahko, povedzte „I spy a book“."}
  ]},

/* ---------- 9. 11. 2026 (pondelok) ---------- */
{ id:"sjl-kniha-tyzdna-1", datum:"2026-11-09", predmet:"SJL", kod:"SJL-RU-1",
  nazov:"Kniha týždňa: o čom asi bude?",
  uvod:"Dieťa si samo vyberie akúkoľvek knihu z domu alebo z knižnice. Najprv podľa obalu spolu hádate, o čom bude. Potom čítate vy a občas sa zastavíte pri obrázku alebo pri otázke, čo bude ďalej. Rozprávať má hlavne dieťa.",
  meta:["spolu s rodičom","10 – 15 minút","akákoľvek kniha"],
  stdn:"ŠVP SJL, Čítanie s porozumením: „predvídanie z počutého a prečítaného umeleckého textu a z ilustrácie“",
  bloky:[
    {typ:"spolu", text:"Pred čítaním si spolu prezrite obal. Najprv hádate vy, o čom kniha bude, potom dieťa. Pri čítaní sa zastavte len na niektorých dvojstranách, najviac raz na dvojstranu, a položte jednu otázku z rozhovoru nižšie. Odpoveď dieťaťa zopakujte a pridajte k nej jedno slovo („Aha, pes. Veľký chlpatý pes.“). Ak dieťa knihu pozná, občas nedočítajte vetu do konca a nechajte ho ju dopovedať. Po čítaní stačí jedna otázka: Čo sa ti páčilo najviac? Alebo: Bolo tam slovo, ktorému si nerozumel?"},
    {typ:"rozhovor", zacni:"„Dnes vyberáš knihu ty. Ja podľa obalu hádam, že bude o… A čo myslíš ty?“",
     otazky:["Kto je na tomto obrázku? Čo práve robí?","Čo sa stane, keď otočíme stranu? Prečo si to myslíš?","Keby si bol v tejto knihe ty, čo by si urobil? Čo podobné si už zažil?"],
     preteba:"Nie je to skúšanie: keď dieťa nevie, povedzte odpoveď sami a čítajte ďalej. Tú istú knihu pokojne čítajte znova, vtedy nechajte rozprávať viac dieťa."}
  ]},

{ id:"mat-pribehy-6", datum:"2026-11-09", predmet:"MAT", kod:"MAT-CO-5",
  nazov:"Príbehy s číslami do 6",
  uvod:"„Na strome sedeli 4 vtáčiky. Priletel ešte jeden. Koľko vtáčikov je na strome?“ Tri krátke príbehy na počítanie spamäti alebo na prstoch.",
  meta:["spolu s rodičom","5 minút","bez pomôcok"],
  stdn:"ŠVP MAT, Čísla a operácie s číslami: „analyzovanie a navrhovanie metód riešenia jednoduchých slovných úloh na sčítanie a odčítanie – zväčšenie/zmenšenie čísla o niekoľko jednotiek“",
  bloky:[
    {typ:"aktivita", text:"Príbeh na kockách: k jednej skupine kociek pribudnú ďalšie. Koľko ich je spolu? Pri Výzve dieťa najprv odhadne a až potom sa kocky spoja.",
     hra:{druh:"kocky", rezim:"spoj", urovne:[["●","Ľahšie",{max:5}],["●●","Bežné",{max:6}],["●●●","Výzva",{max:6}]], predvolena:1, kol:4}},
    {typ:"hadanka", text:"Na strome sedeli 4 vtáčiky. Priletel ešte jeden. Koľko vtáčikov je na strome?", odpoved:"5 vtáčikov 🐦 (4 a 1 je 5)"},
    {typ:"hadanka", text:"Na tanieri bolo 5 jahôd. Ježko Bodliak zjedol dve. Koľko jahôd zostalo?", odpoved:"3 jahody 🍓 (5 mínus 2 sú 3)"},
    {typ:"hadanka", text:"Veverička mala v jednej labke 3 oriešky a v druhej labke tiež tri. Koľko orieškov mala spolu?", odpoved:"6 orieškov 🌰 (3 a 3 je 6)"},
    {typ:"tlac", urovne:3, text:"Príbehy s obrázkami a príkladmi: dopíš výsledok, spoj príbeh s príkladom, nakresli vlastný príbeh. Výzva: nájdi všetky spôsoby, ako rozdeliť 6 jabĺk, a chytáky.", subor:"mat-pribehy-6.pdf"},
    {typ:"spolu", text:"Teraz vymyslí príbeh dieťa a vy počítate. Raz sa schválne pomýľte o jeden. Dieťa vás opraví a ukáže na prstoch, ako to má byť."}
  ]},

{ id:"anj-co-zmizlo", datum:"2026-11-09", predmet:"ANJ", kod:"ANJ-PR-1",
  nazov:"What's missing? Čo zmizlo z tašky?",
  uvod:"Na stole sú štyri školské veci. Dieťa zavrie oči, vy jednu schováte a dieťa háda po anglicky, čo zmizlo: pencil, book, ruler alebo crayon?",
  meta:["spolu s rodičom","5 minút","školské veci"],
  stdn:"ŠVP ANJ, Ústny prejav: „Zrozumiteľne vysloviť jednotlivé hlásky a obmedzený počet naučených slov a slovných spojení.“",
  bloky:[
    {typ:"pocuvanie", text:"Najprv si slovíčka vypočujte. Ťukni na vec a zopakuj po tablete.",
     slova:[["✏️","pencil"],["📕","book"],["📏","ruler"],["🖍️","crayon"],["🎒","bag"]]},
    {typ:"spolu", text:"Položte na stôl ceruzku, knihu, pravítko a voskovku. Dieťa ich pomenuje po anglicky. Potom zavrie oči, vy jednu vec schováte do tašky a dieťa háda: „Pencil?“ Keď uhádne, vymeňte sa. Keď to ide ľahko, pridajte piatu vec alebo schovajte dve."}
  ]},

/* ---------- 6. 11. 2026 (piatok) ---------- */
{ id:"sjl-citame-slova", datum:"2026-11-06", predmet:"SJL", kod:"SJL-RV-1",
  nazov:"Čítame prvé slová: mama, lama, Ema",
  uvod:"Slová sú len z písmen, ktoré už dieťa pozná (M, A, E, L, I). Dieťa najprv prečíta slovo samo nahlas a potom naň ťukne, aby si vypočulo, či ho prečítalo rovnako.",
  meta:["dieťa samo","3 minúty","tablet so zvukom"],
  stdn:"ŠVP SJL, Elementárne čítanie: „čítanie slabík, slov, viet a krátkych textov s postupne sa zvyšujúcou náročnosťou“",
  bloky:[
    {typ:"pocuvanie", citanie:true, jazyk:"sk-SK", text:"Najprv prečítaj slovo nahlas. Potom naň ťukni a skontroluj sa.",
     slova:[["","mama"],["","lama"],["","Ema"],["","Ela"],["","Emil"],["","malá"],["","milá"],["","mám"]]},
    {typ:"tlac", urovne:3, text:"Prvé slová a vety z písmen M, A, E, L, I: spoj s obrázkom, nájdi rovnaké slovo, prečítaj a nakresli. Výzva: prvá krížovka a zlepené slová.", subor:"sjl-citame-slova.pdf"},
    {typ:"spolu", text:"Napíšte spolu jedno z týchto slov veľkými tlačenými písmenami na papierik. Dieťa ho večer prečíta niekomu z rodiny ako prekvapenie."}
  ]},

{ id:"mat-susedia", datum:"2026-11-06", predmet:"MAT", kod:"MAT-CO-2",
  nazov:"Kto býva vedľa? Číslo pred a za",
  uvod:"Čísla 0 až 6 bývajú na ulici v rade. Dieťa hľadá susedov: ktoré číslo býva hneď pred štyrkou a ktoré hneď za ňou? V škole sa im hovorí predchodca a nasledovník.",
  meta:["spolu s rodičom","5 minút","papier, fixka"],
  stdn:"ŠVP MAT, Čísla a operácie s číslami: „porozumenie a modelovanie čísel ako počtu prvkov množiny, ako poradie, ako predchodcu alebo nasledovníka“",
  bloky:[
    {typ:"spolu", text:"Nakreslite ulicu so siedmimi domčekmi a napíšte na ne čísla 0 až 6. Jeden domček prikryte papierikom. Dieťa háda, ktoré číslo je schované, a povie, kto sú jeho susedia. Potom skrýva dieťa a hádate vy."},
    {typ:"tlac", urovne:3, text:"Čísla pred a za: ulica s domčekmi, žabka na číselnej osi, raketa odpočítava. Výzva: hádanky, skoky po dvoch až po 30, párne a nepárne domy.", subor:"mat-susedia.pdf"},
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
    {typ:"tlac", urovne:3, text:"Čo patrí do aktovky, tajné auto z písmen, kde počuješ A, krátke a a dlhé á, čítanie po schodoch. Výzva: tajné zvieratká a objav pravidlo.", subor:"sjl-a-zaciatok.pdf"},
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
    {typ:"aktivita", text:"Na tablete sú dve skupiny kociek. Dieťa ich spojí a spočíta, koľko je spolu. Pri Výzve najprv odhadne výsledok a až potom sa kocky spoja.",
     hra:{druh:"kocky", rezim:"spoj", urovne:[["●","Ľahšie",{max:4}],["●●","Bežné",{max:6}],["●●●","Výzva",{max:6}]], predvolena:1, kol:4}},
    {typ:"spolu", text:"Striedajte sa. Kto má v kole väčší súčet, dostane fazuľku. Ak je súčet rovnaký, fazuľku dostanú obaja. Vyhráva ten, kto má prvý päť fazuliek."},
    {typ:"tlac", urovne:3, text:"Bodky na kocke, súčet dvoch kociek, hra pre dvoch a kockové bingo. Výzva: tajomstvo protiľahlých stien a všetky spôsoby, ako hodiť 6.", subor:"mat-kocka.pdf"},
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
    {typ:"tlac", urovne:3, text:"Tlieskanie slabík, vláčiky so slabikami, chýbajúca slabika. Výzva: slová z prvých slabík, slabikový reťaz a chyták, ktoré slovo je dlhšie.", subor:"sjl-spoj-slabiky.pdf"},
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
    {typ:"tlac", urovne:3, text:"Viac, menej, rovnako: taniere, myšky a syry, znaky <, >, =. Výzva: najprv vypočítaj, potom porovnaj, váhy a oprava zlých znakov.", subor:"mat-porovnaj.pdf"},
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
    {typ:"tlac", urovne:3, text:"Balóny s obrázkami na M, bludisko z písmen, kde počuješ M (začiatok, stred, koniec). Výzva: tajné slová, počítanie hlások a čarovanie mama – lama.", subor:"sjl-m-zaciatok.pdf"},
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
    {typ:"aktivita", text:"Koľko kociek je v rámiku? Dieťa napíše číslo, žltý otáznik ukáže možnosti. Pri Výzve dieťa vidí číslo a kocky postaví samo.",
     hra:{druh:"kocky", rezim:"kolko", urovne:[["●","Ľahšie",{max:5}],["●●","Bežné",{max:6}],["●●●","Výzva",{max:6}]], predvolena:1, kol:4}},
    {typ:"spolu", text:"Lov na šestky: každú nájdenú šestku (6 lyžičiek, 6 gombíkov, 6 bodiek) si zapíšte čiarkou alebo nakreslite. Keď sa vec nedá spočítať naraz, ukladajte ju po jednej do radu."},
    {typ:"tlac", urovne:3, text:"Šestka v krabičke vajec, na krídlach motýľa, na domine aj doma. Výzva: nohy zvieratiek, spravodlivé delenie orieškov a hádanky.", subor:"mat-6-okolo.pdf"},
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
    {typ:"tlac", urovne:3, text:"Slabiky mi, li, mí, lí: húsenica, bludisko zo slabík, krátke i a dlhé í. Výzva: tajný obrázok len z dlhých í a skladanie slov.", subor:"sjl-slabiky-i.pdf"},
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
    {typ:"tlac", urovne:3, text:"Rad na zmrzlinu, vláčik a preteky: kto je prvý, tretí, posledný. Výzva: detektívka, kto stojí kde, a vzor korálok až po 10.", subor:"mat-poradie.pdf"},
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
    {typ:"tlac", urovne:3, text:"Súčet do 6 s jahodami, korálkami a ježkom. Výzva: jahody pod obrúskom, číselné pyramídy a všetky spôsoby, ako rozdeliť 6 jabĺk.", subor:"mat-sucet-6.pdf"},
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
     preteba:"Hovor „hláska“, keď ide o zvuk, a „písmeno“, keď ide o to, čo píšeme. L vyslovuj krátko: „lll“, nie „el“."},
    {typ:"tlac", urovne:3, text:"Obťahovanie L, čo sa začína na lll, malá a veľká lama, L alebo M. Výzva: otočené slabiky la – al, slová s viacerými riešeniami a rýchločítanie.", subor:"sjl-l.pdf"}
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
    {typ:"tlac", urovne:3, text:"Koľko chýba do šiestich: vrecúško s orieškami, veže zo 6 kociek, zajace a mrkvy a hra pre dvoch Schovávačka. Výzva: dve vrecúška, tajný kód so zvieratkami a úloha, ktorú zadá dieťa.", subor:"mat-6.pdf"}
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

/* =========================================================
   OD ZAČIATKU ŠKOLSKÉHO ROKA (september – október 2026)
   Doplnené 3. 11. 2026 dodatočne. Poradie je odhad podľa postupu v učebniciach;
   karty SJL sú v týždňoch podľa poradia písmen a každá má pracovný list
   v 3 úrovniach (tlac/sjl-*.html).
   Jedna karta na predmet a týždeň, dátum = streda daného týždňa.
   ========================================================= */

/* ---------- 19. – 23. 10. 2026 ---------- */
{ id:"sjl-e", datum:"2026-10-21", predmet:"SJL", kod:"SJL-RV-1",
  nazov:"Písmeno E: Ema a mama",
  uvod:"S písmenami M, A a E sa už dajú čítať prvé slová a vety: Ema, mama, Ema má. Dieťa prečíta slabiku alebo slovo nahlas a ťuknutím si skontroluje, či ho prečítalo dobre.",
  meta:["dieťa samo","3 minúty","tablet so zvukom"],
  stdn:"ŠVP SJL, Elementárne čítanie: „čítanie slabík, slov, viet a krátkych textov s postupne sa zvyšujúcou náročnosťou“",
  bloky:[
    {typ:"pocuvanie", citanie:true, jazyk:"sk-SK", text:"Najprv prečítaj nahlas. Potom ťukni a skontroluj sa.",
     slova:[["","me"],["","mé"],["","Ema"],["","mama"],["","Ema má"],["","mama a Ema"]]},
    {typ:"hadanka", text:"Jazdí po koľajniciach cez mesto a zvoní cink, cink. Čo je to?", odpoved:"Električka 🚋 (začína sa na E)"},
    {typ:"rozhovor", zacni:"„Eee… keď rozmýšľam, hovorím eee. Počuješ, ako znie hláska E?“",
     otazky:["Poznáš meno, ktoré sa začína na E?","Počuješ E v slove mesto? Kde?","Je E na konci slova Ema, alebo na začiatku?"],
     preteba:"Krátke e a dlhé é sú v šlabikári zvlášť. Dieťa číta slabiku naraz („me“), nie po písmenách („em-e“)."},
    {typ:"tlac", urovne:3, text:"Obťahovanie E, kde počuješ e, veľké a malé písmená, húsenica slabík a prvé vety o Eme a mame. Výzva: tajný kód a čítanie odzadu.", subor:"sjl-e.pdf"}
  ]},

{ id:"mat-nula", datum:"2026-11-11", predmet:"MAT", kod:"MAT-CO-1",
  nazov:"Nula: keď nie je nič",
  uvod:"Na tanieri boli tri piškóty, zjedli sme ich a teraz je tam nula. Nula je číslo pre „nič“. Hľadajte spolu, čoho je doma práve nula.",
  meta:["spolu s rodičom","5 minút","tanier, drobnosti"],
  stdn:"ŠVP MAT, Čísla a operácie s číslami: „porozumenie a modelovanie čísel ako počtu prvkov množiny, ako poradie, ako predchodcu alebo nasledovníka“",
  bloky:[
    {typ:"hadanka", text:"Koľko slonov je v našej kuchyni?", odpoved:"Nula! Ani jeden 🐘"},
    {typ:"hadanka", text:"Mám v ruke dva gombíky. Jeden dám tebe a jeden schovám do vrecka. Koľko mi ostalo v ruke?", odpoved:"Nula"},
    {typ:"spolu", text:"Dajte na stôl tri taniere. Dieťa dá na prvý dve fazuľky, na druhý jednu a tretí nechá prázdny. Povedzte, koľko je na ktorom tanieri. Potom sa vymeňte."},
    {typ:"rozhovor", zacni:"„Koľko dinosaurov dnes chodí do tvojej triedy?“",
     otazky:["Čoho je u nás doma nula?","Je nula viac, alebo menej ako jedna?","Ako by si nakreslil nulu jabĺk?"],
     preteba:"Pri nule pomáha prázdny tanier alebo prázdna krabička. Na číselnom rade stojí nula pred jednotkou."},
    {typ:"tlac", urovne:3, text:"Písanie nuly, prázdny tanier a číselný rad od nuly. Počítanie s nulou, porovnávanie a odpočítavanie rakety. Výzva: pravda alebo nie, hádanky na myslené číslo a všetky príklady s výsledkom 0.", subor:"mat-nula.pdf"}
  ]},

{ id:"anj-autumn", datum:"2026-10-21", predmet:"ANJ", kod:"ANJ-RE-2",
  nazov:"Autumn: leaf, apple, tree, pumpkin",
  uvod:"Jesenné slová po anglicky: leaf, apple, tree, pumpkin, rain. Dieťa si ich vypočuje a na prechádzke ich potom hľadá a pomenúva.",
  meta:["dieťa samo aj s rodičom","3 minúty","tablet so zvukom"],
  stdn:"ŠVP ANJ, Počúvanie s porozumením: „Rozoznať bežné, známe slová za predpokladu, že sú vyslovené zreteľne a pomaly v známom kontexte.“",
  bloky:[
    {typ:"pocuvanie", text:"Ťukni na obrázok a vypočuj si, ako sa povie po anglicky.",
     slova:[["🍂","leaf"],["🍎","apple"],["🌳","tree"],["🎃","pumpkin"],["🌧️","rain"]]},
    {typ:"hadanka", text:"I am big, round and orange. What am I?", napoveda:"Som veľká, okrúhla a oranžová.", odpoved:"A pumpkin – tekvica 🎃"},
    {typ:"spolu", text:"Na prechádzke ukazujte a pomenúvajte: „Look, a tree! A leaf!“ Doma môžete z lístkov poskladať obrázok a počítať ich po anglicky."}
  ]},

/* ---------- 12. – 16. 10. 2026 ---------- */
{ id:"sjl-m-hadanky", datum:"2026-10-14", predmet:"SJL", kod:"SJL-PP-2",
  nazov:"Hádanky na písmeno M",
  uvod:"„Svieti v noci na oblohe, raz je okrúhly a raz ako rožok. Čo je to?“",
  meta:["spolu s rodičom","2 minúty","bez pomôcok"],
  stdn:"ŠVP SJL, Písaná produkcia: „sluchové identifikovanie a rozlišovanie zvukov, slov, slabík, hlások“",
  bloky:[
    {typ:"hadanka", text:"Svieti v noci na oblohe, raz je okrúhly a raz ako rožok. Čo je to?", odpoved:"Mesiac 🌙"},
    {typ:"hadanka", text:"Je malá a sivá, má dlhý chvost a bojí sa mačky. Čo je to?", odpoved:"Myš 🐭"},
    {typ:"hadanka", text:"Je biele, pije sa a dávajú ho kravy. Čo je to?", odpoved:"Mlieko 🥛"},
    {typ:"rozhovor", zacni:"„Mmm, to je dobré! Keď niečo chutí, hovoríme mmm. Tak znie hláska M.“",
     otazky:["Kto v rodine má meno na M?","Počuješ M v slove dom? Na začiatku, alebo na konci?","Vymysli hádanku na M ty mne."],
     preteba:"M vyslovujte dlho „mmm“, nie „em“. Pri hádankách netreba ponáhľať, napovedať môžete prvou hláskou."},
    {typ:"tlac", urovne:3, text:"Hádanky na M, jedlo na mmm, hľadanie slova mama a obťahovanie M. Slabika ma v oblúčikoch a prvé vety. Výzva: detektívne hádanky a slovná pyramída.", subor:"sjl-m-hadanky.pdf"}
  ]},

{ id:"mat-rozklad-5", datum:"2026-10-28", predmet:"MAT", kod:"MAT-CO-4",
  nazov:"Päť prstov, päť orieškov: rozklad čísla 5",
  uvod:"Päť sa dá rozdeliť rôzne: 4 a 1, 3 a 2, 5 a 0. Veverička schová časť orieškov do vrecúška a dieťa háda, koľko ich tam je. Stačí si pomôcť prstami jednej ruky.",
  meta:["dieťa samo","3 minúty","tablet alebo prsty"],
  stdn:"ŠVP MAT, Čísla a operácie s číslami: „modelovanie a využívanie rôznych rozkladov čísel“",
  bloky:[
    {typ:"aktivita", text:"Veverička si schovala oriešky do vrecúška.",
     hra:{druh:"rozklad", urovne:[["●","Ľahšie",4],["●●","Bežné",5],["●●●","Výzva",6]], predvolena:1, kol:3}},
    {typ:"spolu", text:"Hra „Schovaj prsty“: rodič ukáže päť prstov a niekoľko z nich schová za chrbát druhej ruky. Dieťa povie, koľko je schovaných. Potom sa vymeňte."},
    {typ:"rozhovor", zacni:"„Mám päť ceruziek a dve ti požičiam. Koľko mi zostane?“",
     otazky:["Ako sa dá rozdeliť päť jabĺk medzi dvoch?","Ukáž päť na dvoch rukách inak ako 5 a 0.","Je to spravodlivé, keď má jeden 4 a druhý 1?"],
     preteba:"V škole sa tomu hovorí rozklad čísla. Obe časti spolu dajú vždy celé číslo."},
    {typ:"tlac", urovne:3, text:"Päť na dve časti: vrecúško s orieškami, veže z kociek, domček čísla 5 a pravda alebo nepravda. Výzva: všetky náramky po poradí, bludisko súčtov a prečo sa 5 nedá rozdeliť napoly.", subor:"mat-rozklad-5.pdf"}
  ]},

{ id:"anj-classroom", datum:"2026-10-14", predmet:"ANJ", kod:"ANJ-RE-1",
  nazov:"Touch the door! Slová v triede",
  uvod:"Door, window, chair, table, board. Dieťa si slová vypočuje a potom ich hľadá doma: rodič povie „Touch the door!“ a dieťa beží a dotkne sa dverí.",
  meta:["spolu s rodičom","5 minút","tablet so zvukom"],
  stdn:"ŠVP ANJ, cieľ pre 1. cyklus: „Rozumieť krátkym inštrukciám.“",
  bloky:[
    {typ:"pocuvanie", text:"Ťukni na obrázok a vypočuj si, ako sa povie po anglicky.",
     slova:[["🚪","door"],["🪟","window"],["🪑","chair"],["🍽️","table"],["🖼️","board"]]},
    {typ:"spolu", text:"Hra „Touch the…“: rodič povie po anglicky, čoho sa má dieťa dotknúť (door, window, chair, table). Potom dieťa dáva pokyny rodičovi. Kto sa pomýli, urobí drep."}
  ]},

/* ---------- 5. – 9. 10. 2026 ---------- */
{ id:"sjl-a-ma", datum:"2026-10-07", predmet:"SJL", kod:"SJL-RV-1",
  nazov:"Písmeno A a prvé slabiky: ma, má, mama",
  uvod:"Keď sa M a A spoja, vznikne slabika ma, a z dvoch slabík prvé slovo: mama. Dieťa prečíta slabiku nahlas a ťuknutím si skontroluje, či ju prečítalo dobre.",
  meta:["dieťa samo","2 minúty","tablet so zvukom"],
  stdn:"ŠVP SJL, Elementárne čítanie: „čítanie slabík, slov, viet a krátkych textov s postupne sa zvyšujúcou náročnosťou“",
  bloky:[
    {typ:"pocuvanie", citanie:true, jazyk:"sk-SK", text:"Najprv prečítaj nahlas. Potom ťukni a skontroluj sa.",
     slova:[["","A"],["","ma"],["","má"],["","mama"],["","mám"],["","Mama má"]]},
    {typ:"spolu", text:"Slabikový vláčik: napíšte na dva papieriky M a A. Dieťa ich posúva k sebe a pritom ťahá hlásky „mmm… aaa“, až splynú do „ma“. Potom skúste „má“ s dlhým á."},
    {typ:"rozhovor", zacni:"„Aaa, ako u lekára! Na A sa začína aj ananás. Vieš ešte niečo na A?“",
     otazky:["Kde počuješ A v slove mama? Koľkokrát?","Znie rovnako ma a má?","Vymysli slovo, ktoré sa končí na A."],
     preteba:"Slabiku čítajte naraz a ťahavo („mmma“), nie „em-a“. Dlhé á sa v škole volá á s dĺžňom."},
    {typ:"tlac", urovne:3, text:"Mmm a aaa je ma: obťahovanie slabík, čo sa začína na ma, prečítaj a nakresli MAMA a MÁM. Výzva: škriatok poplietol písmená, koľko písmen a koľko slabík.", subor:"sjl-a-ma.pdf"}
  ]},

{ id:"mat-uberame", datum:"2026-10-21", predmet:"MAT", kod:"MAT-CO-3",
  nazov:"Uberáme: koľko zostalo?",
  uvod:"Na stole sú štyri sušienky a dve zjeme. Koľko zostalo? Pri uberaní dieťa najprv počíta, čo bolo, potom čo zmizlo, a nakoniec to, čo zostalo.",
  meta:["spolu s rodičom","5 minút","fazuľky, hrnček"],
  stdn:"ŠVP MAT, Čísla a operácie s číslami: „porozumenie pojmov sčítanec, súčet, menšenec, menšiteľ, rozdiel“",
  bloky:[
    {typ:"spolu", text:"Hra „Čo zmizlo pod hrnček“: dajte na stôl 3 až 5 fazuliek a spolu ich spočítajte. Dieťa zatvorí oči a vy niekoľko schováte pod hrnček. Koľko zostalo na stole? Koľko je pod hrnčekom? Potom sa vymeňte."},
    {typ:"rozhovor", zacni:"„Na strome boli tri vtáčiky a jeden odletel. Koľko ich tam ostalo?“",
     otazky:["Ako si to zistil? Ukážeš mi to na prstoch?","Čo by sa stalo, keby odleteli všetky?","Vymysli ty mne príbeh, v ktorom niečo ubudne."],
     preteba:"Pri uberaní sa dobre hodia skutočné veci, ktoré môžu naozaj zmiznúť. Príklad sa dá zapísať napríklad 4 − 2 = 2"},
    {typ:"tlac", urovne:3, text:"Uberanie: prečiarkni, čo zjedol ježko, vtáčiky odleteli, kocky a pravda alebo nepravda. Výzva: čo zmizlo, plus alebo mínus, chytáky a vláčik počítania.", subor:"mat-uberame.pdf"}
  ]},

{ id:"anj-please", datum:"2026-10-07", predmet:"ANJ", kod:"ANJ-IN-2",
  nazov:"Please, thank you! Hra na obchod",
  uvod:"„An apple, please.“ – „Here you are.“ – „Thank you!“ Zahrajte sa na obchod, v ktorom sa nakupuje len po anglicky a slušne.",
  meta:["spolu s rodičom","5 minút","ovocie alebo hračky"],
  stdn:"ŠVP ANJ, Počúvanie s porozumením: „Porozumieť krátkym, veľmi jednoduchým otázkam a vetám za predpokladu, že sú povedané pomaly a zreteľne a sú sprevádzané vizuálnymi prostriedkami alebo gestami.“",
  bloky:[
    {typ:"pocuvanie", text:"Ťukni a vypočuj si zdvorilé slová po anglicky.",
     slova:[["🙏","please"],["😊","thank you"],["🤲","here you are"],["😔","sorry"],["👍","yes"],["👎","no"]]},
    {typ:"spolu", text:"Rozložte na stôl jablko, banán a hračky. Dieťa je predavač, vy nakupujete: „A banana, please.“ Dieťa podá vec a vy poďakujete „Thank you!“. Potom sa vymeňte."}
  ]},

/* ---------- 28. 9. – 2. 10. 2026 ---------- */
{ id:"sjl-tlieskame", datum:"2026-09-30", predmet:"SJL", kod:"SJL-PP-2",
  nazov:"Vytlieskaj slovo: ma-ma, lo-pta, ba-na-na",
  uvod:"„Ba – na – na: tlesk, tlesk, tlesk. Koľko tlesknutí má slovo banán?“ Dieťa delí slová na slabiky tlieskaním a zisťuje, ktoré slovo je dlhšie.",
  meta:["spolu s rodičom","3 minúty","bez pomôcok"],
  stdn:"ŠVP SJL, Elementárne čítanie: „sluchové identifikovanie a rozlišovanie zvukov, slov, slabík, hlások“",
  bloky:[
    {typ:"hadanka", text:"Koľkokrát tlesneš pri slove mama?", odpoved:"Dvakrát: ma – ma"},
    {typ:"hadanka", text:"Koľkokrát tlesneš pri slove čokoláda?", odpoved:"Štyrikrát: čo – ko – lá – da 🍫"},
    {typ:"hadanka", text:"Ktoré slovo je dlhšie: pes, alebo papagáj?", odpoved:"Papagáj: pa – pa – gáj má tri slabiky, pes len jednu"},
    {typ:"spolu", text:"Cestou zo školy vytlieskavajte alebo vyskakujte mená ľudí v rodine a veci, ktoré vidíte. Kto nájde najdlhšie slovo?"},
    {typ:"tlac", urovne:3, text:"Oblúčiky pod obrázky, hra na robota, triedenie podľa počtu slabík a pokusné čítanie MA-MA, SO-VA. Výzva: slabikové schody a prečo má malá rybička dlhšie slovo.", subor:"sjl-tlieskame.pdf"}
  ]},

{ id:"mat-pridavame", datum:"2026-10-14", predmet:"MAT", kod:"MAT-CO-3",
  nazov:"Pridávame: koľko je spolu?",
  uvod:"Na jednom tanieri sú dve jahody, na druhom jedna. Koľko je spolu? Dieťa počíta jahody na tablete na úrovni Ľahšie, kde súčet nepresiahne štyri.",
  meta:["dieťa samo","2 minúty","tablet so zvukom"],
  stdn:"ŠVP MAT, Čísla a operácie s číslami: „porozumenie pojmov sčítanec, súčet, menšenec, menšiteľ, rozdiel“",
  bloky:[
    {typ:"aktivita", text:"Koľko jahôd je spolu?",
     hra:{druh:"sucet", urovne:[["●","Ľahšie"],["●●","Bežné"],["●●●","Výzva"]], predvolena:0, kol:4}},
    {typ:"rozhovor", zacni:"„Na lavičke sedeli dve deti a prišlo ešte jedno. Koľko ich sedí teraz?“",
     otazky:["Ako si to spočítal?","Koľko by ich bolo, keby prišli ešte dvaja?","Vymysli príbeh s pridávaním ty mne."],
     preteba:"Pridávanie je v škole začiatok sčítania. Nevadí, ak dieťa ráta všetko znova od jedna."},
    {typ:"tlac", urovne:3, text:"Pridávanie do 4: obťahovanie 1, 2, 3 a plus, jahody na tanieroch, veže z kociek a príbehy. Výzva: koľko treba pridať, domino so 4 bodkami a objav, že 1 + 3 je to isté ako 3 + 1.", subor:"mat-pridavame.pdf"}
  ]},

{ id:"anj-feelings", datum:"2026-09-30", predmet:"ANJ", kod:"ANJ-PR-2",
  nazov:"How are you? I'm happy!",
  uvod:"„How are you?“ – „I'm happy!“ Dieťa sa naučí povedať, ako sa cíti: happy, sad, tired, hungry. Ťuknutím si slová vypočuje a potom ich ukazuje tvárou.",
  meta:["dieťa samo aj s rodičom","3 minúty","tablet so zvukom"],
  stdn:"ŠVP ANJ, Počúvanie s porozumením: „Porozumieť krátkym, veľmi jednoduchým otázkam a vetám za predpokladu, že sú povedané pomaly a zreteľne a sú sprevádzané vizuálnymi prostriedkami alebo gestami.“",
  bloky:[
    {typ:"pocuvanie", text:"Ťukni na tvár a vypočuj si, ako sa to povie po anglicky.",
     slova:[["😀","I'm happy"],["😢","I'm sad"],["😴","I'm tired"],["😋","I'm hungry"]]},
    {typ:"spolu", text:"Hra na tváre: rodič povie „Show me happy!“ a dieťa sa usmeje, pri „sad“ sa zamračí. Potom dieťa ukáže tvár a rodič háda po anglicky."}
  ]},

/* ---------- 21. – 25. 9. 2026 ---------- */
{ id:"sjl-rymy", datum:"2026-09-23", predmet:"SJL", kod:"SJL-PP-2",
  nazov:"Rýmy: mačka – kačka, myš – ...?",
  uvod:"„Mačka a kačka znejú na konci rovnako. Čo sa rýmuje so slovom les?“ Pri rýmoch sa dieťa učí počúvať koniec slova.",
  meta:["spolu s rodičom","3 minúty","bez pomôcok"],
  stdn:"ŠVP SJL, Elementárne čítanie: „sluchové identifikovanie a rozlišovanie zvukov, slov, slabík, hlások“",
  bloky:[
    {typ:"hadanka", text:"Čo sa rýmuje so slovom les? Štekne a vrtí chvostom.", odpoved:"Pes 🐶"},
    {typ:"hadanka", text:"Čo sa rýmuje so slovom ruka? Je biela a pečie sa z nej chlieb.", odpoved:"Múka"},
    {typ:"hadanka", text:"Čo sa rýmuje so slovom domček? Cinká na bicykli.", odpoved:"Zvonček 🔔"},
    {typ:"rozhovor", zacni:"„Mačka, kačka, ... vymyslíš ešte jedno slovo, ktoré tak znie?“",
     otazky:["Rýmuje sa auto a lopta?","Vymysli rým na slovo myš.","Povieš mi básničku, ktorú poznáš zo školy?"],
     preteba:"Ak dieťa vymyslí slovo, ktoré neexistuje (napríklad „tačka“), je to v poriadku. Dôležité je, že počuje rovnaký koniec."},
    {typ:"tlac", urovne:3, text:"Spoj dvojice, ktoré sa rýmujú, čo sa nerýmuje, básničky bez posledného slova a hra na robota. Výzva: všetky rýmy na mak a čarovanie s prvou hláskou.", subor:"sjl-rymy.pdf"}
  ]},

{ id:"mat-4-5", datum:"2026-09-23", predmet:"MAT", kod:"MAT-CO-1",
  nazov:"Čísla 4 a 5: kolesá a prsty",
  uvod:"Auto má štyri kolesá, ruka päť prstov. Dieťa hľadá veci, ktorých je štyri alebo päť, a počíta ich po jednej s ukazovaním prstom.",
  meta:["spolu s rodičom","5 minút","doma alebo vonku"],
  stdn:"ŠVP MAT, Čísla a operácie s číslami: „porozumenie a modelovanie čísel ako počtu prvkov množiny, ako poradie, ako predchodcu alebo nasledovníka“",
  bloky:[
    {typ:"hadanka", text:"Koľko kolies má auto?", odpoved:"Štyri 🚗"},
    {typ:"hadanka", text:"Koľko prstov máš na jednej ruke?", odpoved:"Päť ✋"},
    {typ:"hadanka", text:"Koľko nôh má stolička?", odpoved:"Väčšinou štyri 🪑"},
    {typ:"spolu", text:"Hľadajte spolu doma štvorice a pätice: 4 nohy stola, 5 lyžičiek v zásuvke, 4 rohy na okne. Za každú nájdenú vec dá dieťa fazuľku do misky. Koľko ich máte na konci?"},
    {typ:"tlac", urovne:3, text:"Štyri a päť: kocka, prsty, obkreslená ruka, veža z kociek a zvieratká so štyrmi nohami. Výzva: chyták s piatimi, prečo vidíme len dve kolesá a náramky s piatimi korálkami.", subor:"mat-4-5.pdf"}
  ]},

{ id:"anj-yes-no", datum:"2026-09-23", predmet:"ANJ", kod:"ANJ-IN-2",
  nazov:"Yes or no? Is it a ball?",
  uvod:"Rodič ukáže vec a spýta sa po anglicky, napríklad „Is it a ball?“. Dieťa odpovie „Yes!“ alebo „No!“ a kývne alebo pokrúti hlavou.",
  meta:["spolu s rodičom","3 minúty","hračky"],
  stdn:"ŠVP ANJ, Počúvanie s porozumením: „Porozumieť krátkym, veľmi jednoduchým otázkam a vetám za predpokladu, že sú povedané pomaly a zreteľne a sú sprevádzané vizuálnymi prostriedkami alebo gestami.“",
  bloky:[
    {typ:"pocuvanie", text:"Ťukni a vypočuj si slová po anglicky.",
     slova:[["👍","yes"],["👎","no"],["⚽","ball"],["🧸","teddy"],["🚗","car"]]},
    {typ:"hadanka", text:"Is it a ball? 🧸", napoveda:"Je to lopta?", odpoved:"No! It's a teddy – nie, je to macko"},
    {typ:"spolu", text:"Ukazujte hračky a pýtajte sa „Is it a car?“. Občas sa schválne pomýľte, deti to milujú. Potom sa pýta dieťa a odpovedáte vy."}
  ]},

/* ---------- 14. – 18. 9. 2026 ---------- */
{ id:"sjl-s-zaciatok", datum:"2026-09-16", predmet:"SJL", kod:"SJL-PP-2",
  nazov:"Prvá hláska: čo sa začína na S? Sss ako had",
  uvod:"Dieťa ťuká na obrázky, ktorých názov sa začína hláskou S, napríklad slon alebo sova. Každý obrázok sa po ťuknutí ozve, takže dieťa počuje, či má pravdu.",
  meta:["dieťa samo","2 minúty","tablet so zvukom"],
  stdn:"ŠVP SJL, Písaná produkcia: „sluchové identifikovanie a rozlišovanie zvukov, slov, slabík, hlások“",
  bloky:[
    {typ:"aktivita", text:"Ťukni na obrázky, ktoré sa začínajú na S. Keď ťukneš, obrázok sa ozve.",
     hra:{druh:"vyber", spravne:"S", polozky:[["☀️","slnko"],["🐘","slon"],["🍎","jablko"],["🦉","sova"],["🐶","pes"],["🧀","syr"],["🐟","ryba"],["🛷","sánky"]]}},
    {typ:"rozhovor", zacni:"„Sss, sss… kto takto syčí? Had! A na S sa začína aj slnko.“",
     otazky:["Čo okolo nás sa začína na S?","Počuješ S na začiatku alebo na konci slova pes?","Aká je prvá hláska v tvojom mene?"],
     preteba:"V prvých týždňoch sa deti učia počuť prvú hlásku slova. Písmeno ešte netreba poznať, stačí počuť zvuk."},
    {typ:"tlac", urovne:3, text:"Čo sa začína na sss, hadík a ulita na obťahovanie, hľadanie písmena S, sss alebo mmm. Výzva: sss na začiatku či na konci a hadia minúta.", subor:"sjl-s-zaciatok.pdf"}
  ]},

{ id:"mat-1-2-3", datum:"2026-09-16", predmet:"MAT", kod:"MAT-CO-1",
  nazov:"Jeden, dva, tri: koľko ich je?",
  uvod:"Jeden nos, dve oči, tri kolieska na trojkolke. Dieťa počíta malé skupinky vecí a ukazuje počet na prstoch. Pri malých počtoch sa časom naučí vidieť ich naraz.",
  meta:["spolu s rodičom","5 minút","drobnosti, lyžičky"],
  stdn:"ŠVP MAT, Čísla a operácie s číslami: „porozumenie a modelovanie čísel ako počtu prvkov množiny, ako poradie, ako predchodcu alebo nasledovníka“",
  bloky:[
    {typ:"hadanka", text:"Koľko nosov máš?", odpoved:"Jeden 👃"},
    {typ:"hadanka", text:"Koľko uší má zajačik?", odpoved:"Dve 🐰"},
    {typ:"hadanka", text:"Koľko kolies má trojkolka?", odpoved:"Tri – už to hovorí aj jej meno"},
    {typ:"spolu", text:"Hra „Blesk“: na chvíľu ukážte dlaň s jedným, dvoma alebo troma gombíkmi a zatvorte ju. Dieťa povie, koľko ich videlo, a ukáže to na prstoch."},
    {typ:"tlac", urovne:3, text:"Jeden, dva, tri: kocky, vyfarbovanie, čiarky a dvojice. Výzva: presne tri v rôznych podobách, uši a nohy, tvar s tromi rohmi a čo nepatrí.", subor:"mat-1-2-3.pdf"}
  ]},

{ id:"anj-toys", datum:"2026-09-16", predmet:"ANJ", kod:"ANJ-RE-2",
  nazov:"Toys: ball, doll, car, teddy",
  uvod:"Štyri hračky po anglicky: ball, doll, car, teddy. Dieťa si ich vypočuje a potom podáva hračky, ktoré rodič pomenuje po anglicky.",
  meta:["dieťa samo aj s rodičom","3 minúty","tablet so zvukom, hračky"],
  stdn:"ŠVP ANJ, Počúvanie s porozumením: „Rozoznať bežné, známe slová za predpokladu, že sú vyslovené zreteľne a pomaly v známom kontexte.“",
  bloky:[
    {typ:"pocuvanie", text:"Ťukni na hračku a vypočuj si, ako sa povie po anglicky.",
     slova:[["⚽","ball"],["🪆","doll"],["🚗","car"],["🧸","teddy"],["🪁","kite"]]},
    {typ:"spolu", text:"Rozložte hračky na koberec. Rodič povie „Give me the car, please“ a dieťa ju podá. Keď to ide, môžete pridať „Where is the teddy?“."}
  ]},

/* ---------- 7. – 11. 9. 2026 ---------- */
{ id:"sjl-i", datum:"2026-09-09", predmet:"SJL", kod:"SJL-PP-2",
  nazov:"Hádanky na hlásku I",
  uvod:"„Je tenká a ostrá, má očko, ale nevidí. Čo je to?“",
  meta:["spolu s rodičom","2 minúty","bez pomôcok"],
  stdn:"ŠVP SJL, Písaná produkcia: „sluchové identifikovanie a rozlišovanie zvukov, slov, slabík, hlások“",
  bloky:[
    {typ:"hadanka", text:"Je tenká a ostrá, má očko, ale nevidí. Čo je to?", odpoved:"Ihla"},
    {typ:"hadanka", text:"Domček zo snehu a ľadu, bývajú v ňom ľudia na severe. Čo je to?", odpoved:"Iglu"},
    {typ:"hadanka", text:"Je malá a horúca, vyskočí z ohňa a hneď zhasne. Čo je to?", odpoved:"Iskra"},
    {typ:"rozhovor", zacni:"„Ja viem jedno slovo na I: ihrisko. Poznáš ešte iné?“",
     otazky:["Nájdeš slovo, kde je I na začiatku?","Je I aj v slove lipa? Kde?","Vymysli hádanku ty mne."],
     preteba:"V septembri ide len o hlásku, ktorú počujeme. Písmeno I deti ešte nemusia poznať. Nič neopravuj, len zopakuj slovo správne."},
    {typ:"tlac", urovne:3, text:"Hádanky, čo patrí k sebe, cestičky na uvoľnenie ruky, prvá hláska a koľko slov má veta. Výzva: i na konci slova a slovný vláčik.", subor:"sjl-i.pdf"}
  ]},

{ id:"mat-najvacsi", datum:"2026-09-09", predmet:"MAT", kod:"MAT-CO-2",
  nazov:"Najväčší a najmenší: zoraď hrnčeky",
  uvod:"Dieťa zoradí hrnčeky, topánky alebo plyšáky od najmenšieho po najväčší. Pritom používa slová väčší, menší, najväčší a najmenší.",
  meta:["spolu s rodičom","5 minút","hrnčeky, topánky, hračky"],
  stdn:"ŠVP MAT, Čísla a operácie s číslami: „aplikovanie metód porovnávania – väčší, menší, rovný, najväčší, najmenší“",
  bloky:[
    {typ:"spolu", text:"Postavte na stôl štyri rôzne hrnčeky alebo topánky celej rodiny. Dieťa ich zoradí od najmenšej po najväčšiu. Potom jednu vec schovajte a dieťa uhádne, ktorá chýba a kam patrila."},
    {typ:"rozhovor", zacni:"„Čia topánka je najväčšia? A čia najmenšia?“",
     otazky:["Ktorá vec je väčšia ako tvoja topánka?","Je niečo, čo je väčšie ako ocko?","Ako zistíš, ktorá ceruzka je najdlhšia?"],
     preteba:"Pri porovnávaní je dobré postaviť veci vedľa seba na jednu čiaru. Slovo „najväčší“ patrí vždy k celej skupine."},
    {typ:"tlac", urovne:3, text:"Najväčší a najmenší: lopty, domy, misky pre tri macky, pastelky a snehuliak. Výzva: pastelky, ktoré nezačínajú na jednom mieste, a prečo je macko raz veľký a raz malý.", subor:"mat-najvacsi.pdf"}
  ]},

{ id:"anj-name", datum:"2026-09-09", predmet:"ANJ", kod:"ANJ-IN-1",
  nazov:"What's your name? My name is…",
  uvod:"„Hello! What's your name?“ – „My name is Bobo.“ Plyšák sa predstaví po anglicky a pýta sa dieťaťa na meno. Potom sa predstavia všetky hračky.",
  meta:["spolu s rodičom","3 minúty","plyšák alebo bábka"],
  stdn:"ŠVP ANJ, Počúvanie s porozumením: „Porozumieť krátkym, veľmi jednoduchým otázkam a vetám za predpokladu, že sú povedané pomaly a zreteľne a sú sprevádzané vizuálnymi prostriedkami alebo gestami.“",
  bloky:[
    {typ:"pocuvanie", text:"Ťukni a vypočuj si otázku a odpoveď.",
     slova:[["❓","What's your name?"],["🙋","My name is Bobo"],["👋","Hello"],["😊","Nice to meet you"]]},
    {typ:"spolu", text:"Plyšák (napríklad medvedík Bobo) sa predstaví: „Hello, my name is Bobo. What's your name?“ Dieťa odpovie celou vetou. Potom dieťa vedie rozhovor za plyšáka a vy odpovedáte."}
  ]},

/* ---------- 2. – 4. 9. 2026 (začiatok školského roka) ---------- */
{ id:"sjl-zvuky", datum:"2026-09-02", predmet:"SJL", kod:"SJL-PP-2",
  nazov:"Čo to šuchoce? Hra na zvuky",
  uvod:"Dieťa zavrie oči a háda, čo počuje: zvonenie kľúčov, šuchot papiera, kvapkanie vody. Na začiatku prvej triedy sa deti učia pozorne počúvať, z toho neskôr vyrastie počúvanie hlások.",
  meta:["spolu s rodičom","5 minút","kľúče, papier, lyžička, pohár"],
  stdn:"ŠVP SJL, Elementárne čítanie: „sluchové identifikovanie a rozlišovanie zvukov, slov, slabík, hlások“",
  bloky:[
    {typ:"spolu", text:"Dieťa zavrie oči. Vy urobíte zvuk: zacinkáte kľúčmi, pokrčíte papier, ťuknete lyžičkou o pohár, zatlieskate. Dieťa háda, čo to bolo. Potom robí zvuky dieťa a hádate vy."},
    {typ:"rozhovor", zacni:"„Pst, buďme na chvíľu úplne ticho. Čo všetko počuješ?“",
     otazky:["Ktorý zvuk bol najtichší a ktorý najhlasnejší?","Aký zvuk robí had? A včela?","Počuješ rozdiel medzi „mak“ a „pak“?"],
     preteba:"Táto hra pripravuje na čítanie: kto vie dobre počúvať zvuky, ľahšie potom počuje hlásky v slovách."},
    {typ:"tlac", urovne:3, text:"Zvieratká a ich zvuky, čo je hlasnejšie, rovnaký obrázok, tlieskanie a rozdiely. Výzva: zvuková pamäť a od najtichšieho po najhlasnejšie.", subor:"sjl-zvuky.pdf"}
  ]},

{ id:"mat-viac-menej", datum:"2026-09-02", predmet:"MAT", kod:"MAT-CO-2",
  nazov:"Kde je viac? Porovnávame sušienky",
  uvod:"Na dvoch tanieroch sú sušienky. Dieťa porovná, kde je viac, a vyberie znak. Ak znaky ešte nepozná, stačí, keď povie viac, menej alebo rovnako, a znak mu ukážete vy.",
  meta:["dieťa samo","2 minúty","tablet so zvukom"],
  stdn:"ŠVP MAT, Čísla a operácie s číslami: „aplikovanie metód porovnávania – väčší, menší, rovný, najväčší, najmenší“",
  bloky:[
    {typ:"aktivita", text:"Porovnaj sušienky na tanieroch.",
     hra:{druh:"porovnaj", urovne:[["●","Ľahšie"],["●●","Bežné"],["●●●","Výzva"]], predvolena:0, kol:4}},
    {typ:"spolu", text:"Prestierame: dieťa dá ku každému tanieru jednu lyžičku. Zostali lyžičky navyše, alebo nejaká chýba? Takto sa dá porovnať aj bez počítania, len priraďovaním."},
    {typ:"tlac", urovne:3, text:"Kde je viac, menej a rovnako, bez počítania: priraďovanie zajkov a mrkiev, prestieranie, hore a dole. Výzva: chyták s veľkými a malými balónmi a tretí spôsob, ako urobiť rovnako.", subor:"mat-viac-menej.pdf"}
  ]},

{ id:"anj-hello", datum:"2026-09-02", predmet:"ANJ", kod:"ANJ-IN-1",
  nazov:"Hello! Goodbye! Prvé anglické slová",
  uvod:"Hello, goodbye, good morning, good night. Dieťa si pozdravy vypočuje a celý deň ich môže používať: ráno „Good morning!“, večer „Good night!“.",
  meta:["dieťa samo aj s rodičom","2 minúty","tablet so zvukom"],
  stdn:"ŠVP ANJ, Počúvanie s porozumením: „Rozoznať bežné, známe slová za predpokladu, že sú vyslovené zreteľne a pomaly v známom kontexte.“",
  bloky:[
    {typ:"pocuvanie", text:"Ťukni na obrázok a vypočuj si pozdrav po anglicky.",
     slova:[["👋","hello"],["🌅","good morning"],["🌙","good night"],["🚪","goodbye"]]},
    {typ:"spolu", text:"Celý deň sa zdravte po anglicky: pri raňajkách „Good morning!“, pri odchode „Goodbye!“, pred spaním „Good night!“. Kto si spomenie prvý, má bod."}
  ]}

];
