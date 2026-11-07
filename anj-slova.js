/* =====================================================================
   DÁTA obrázkového slovníka ANJ (používa slovnik.html, neskôr aj karty)
   Kľúč témy = adresa stránky, napr. slovnik.html#farby
   obr: emoji · "farba:#hex" · "kocka:3" · "svg:kluc" · pole emoji = scénka
   sk:  preklad len pre rodiča (v paneli Pre rodiča), dieťa ho nevidí
   ===================================================================== */
const TEMY = {
  hello:{nazov:"Pozdravy", lekcia:"Úvod", ikona:"👋", slova:[
    {w:"hello",        obr:"👋",          sk:"ahoj (pri stretnutí)"},
    {w:"goodbye",      obr:["👋","🚪"],    sk:"dovidenia"},
    {w:"good morning", obr:"🌅",          sk:"dobré ráno"},
    {w:"good night",   obr:["🌙","😴"],    sk:"dobrú noc"},
    {w:"thank you",    obr:["🎁","😊"],    sk:"ďakujem"},
  ]},
  skola:{nazov:"Školské veci", lekcia:"Lekcia 1", ikona:"🎒", slova:[
    {w:"pencil",   obr:"✏️", sk:"ceruzka"},
    {w:"pen",      obr:"🖊️", sk:"pero"},
    {w:"book",     obr:"📕", sk:"kniha"},
    {w:"bag",      obr:"🎒", sk:"taška, aktovka"},
    {w:"rubber",   obr:"svg:rubber", sk:"guma (na gumovanie)"},
    {w:"ruler",    obr:"📏", sk:"pravítko"},
    {w:"crayon",   obr:"🖍️", sk:"pastelka"},
    {w:"scissors", obr:"✂️", sk:"nožnice"},
  ]},
  farby:{nazov:"Farby", lekcia:"Lekcia 2", ikona:"farba:#E0322B", slova:[
    {w:"red",    obr:"farba:#E0322B", sk:"červená"},
    {w:"blue",   obr:"farba:#2F6FDE", sk:"modrá"},
    {w:"yellow", obr:"farba:#F6CB2F", sk:"žltá"},
    {w:"green",  obr:"farba:#3AA655", sk:"zelená"},
    {w:"orange", obr:"farba:#F28B24", sk:"oranžová"},
    {w:"purple", obr:"farba:#8A4FC4", sk:"fialová"},
    {w:"pink",   obr:"farba:#F27DB3", sk:"ružová"},
    {w:"brown",  obr:"farba:#8B5A2B", sk:"hnedá"},
    {w:"black",  obr:"farba:#202020", sk:"čierna"},
    {w:"white",  obr:"farba:#FFFFFF", sk:"biela"},
  ]},
  cisla:{nazov:"Čísla 1 – 6", lekcia:"Lekcia 1 – 2", ikona:"kocka:3", slova:[
    {w:"one",   obr:"kocka:1", sk:"jeden"},
    {w:"two",   obr:"kocka:2", sk:"dva"},
    {w:"three", obr:"kocka:3", sk:"tri"},
    {w:"four",  obr:"kocka:4", sk:"štyri"},
    {w:"five",  obr:"kocka:5", sk:"päť"},
    {w:"six",   obr:"kocka:6", sk:"šesť"},
  ]},
};
