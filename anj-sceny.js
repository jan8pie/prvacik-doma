/* Ťukaj a povedz (ANJ) – dáta scén. Nová scéna = nový záznam tu, kód sa nemení.
   Pravidlá viet: vlastné vety (nie text učebnice), bez citosloviec (hlas ich hláskuje), krátke a použiteľné doma.
   V texte: {vec} = anglický názov veci, {a_vec} = s členom (a ball), {farba}, {A_farba} = „A red“ / „An orange“.
   kto: "hlavny" = kamarát, ktorého si dieťa vybralo (s ním opakuje), "druhy" = druhá postava, "bot" = robotík.
   opakuj: po vete pauza na zopakovanie a postava ju povie ešte raz.
   rola: od 3. kola na tej istej veci veta najprv stíchne (bublina s otáznikom), dieťa ju skúsi povedať samo.
   poza: ukazuje / pyta / podava / mava; akcia: zvyrazni / podaj / vrat. */
window.ANJ_SCENY = {
  izba: {
    nazov: "Detská izba",
    lekcie: "Beehive U1 + U2 (školské veci, farby)",
    farby: [
      {en:"red",    hex:"#E53935"},
      {en:"blue",   hex:"#2F6FDE"},
      {en:"green",  hex:"#3DAA4E"},
      {en:"yellow", hex:"#F6C21C"},
      {en:"orange", hex:"#F28C1E"},
      {en:"purple", hex:"#8E5BD1"}
    ],
    /* x, y = stred veci v scéne 1200 × 700; s = mierka kresby */
    veci: [
      {id:"chair",  en:"chair",  kresba:"stolicka", x:372, y:548, s:1.25},
      {id:"ball",   en:"ball",   kresba:"lopta",    x:560, y:622, s:1.0},
      {id:"bag",    en:"bag",    kresba:"taska",    x:810, y:600, s:1.05},
      {id:"book",   en:"book",   kresba:"kniha",    x:578, y:338, s:0.95},
      {id:"pencil", en:"pencil", kresba:"ceruzka",  x:690, y:372, s:0.92},
      {id:"crayon", en:"crayon", kresba:"pastelka", x:812, y:362, s:0.95}
    ],
    /* Ťuky na tú istú vec idú vždy v tomto poradí, potom znova od 1 (a vec zmení farbu). */
    kroky: [
      [ {kto:"hlavny", en:"It's {a_vec}.", poza:"ukazuje", opakuj:true} ],
      [ {kto:"hlavny", en:"It's {farba}.", poza:"ukazuje", akcia:"zvyrazni", opakuj:true} ],
      [ {kto:"druhy",  en:"What colour is it?", poza:"pyta"},
        {kto:"hlavny", en:"It's {farba}.", poza:"ukazuje", akcia:"zvyrazni", opakuj:true, rola:true} ],
      [ {kto:"druhy",  en:"{A_farba} {vec}, please.", poza:"pyta"},
        {kto:"hlavny", en:"Here you are.", poza:"podava", akcia:"podaj", opakuj:true},
        {kto:"druhy",  en:"Thanks!", poza:"mava", akcia:"vrat"} ]
    ],
    /* Robotík Bot: 1. ťuk predstavenie, 2. ťuk krátka riekanka v rytme (kniha pri nej mení farbu). */
    bot: [
      [ {kto:"bot",    en:"Hello! I'm Bot. I'm a robot."},
        {kto:"hlavny", en:"Hello, Bot!", poza:"mava", opakuj:true} ],
      [ {kto:"bot",    en:"Look, look, a {farba} book!", riekanka:"book"},
        {kto:"bot",    en:"Look, look, a {farba} book!", riekanka:"book"},
        {kto:"hlavny", en:"Look, look, a {farba} book!", riekanka:"book", opakuj:true} ]
    ]
  }
};
