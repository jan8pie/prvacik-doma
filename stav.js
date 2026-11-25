/* =====================================================================
   STAV TRIEDY – jediné miesto, kde je zapísané, čo trieda už preberala.
   Čítajú ho skripty sada.js (prehľad pred výrobou sady) a kontrola-kariet.js (kontrola kariet).
   Na webe ho číta len knižnica listov (listy.html): z poradia písmen skladá kapitoly Slovenčiny.

   KEDY UPRAVIŤ: hneď, keď Jan potvrdí nové písmeno, číslo alebo lekciu angličtiny.
   Do „pismena“ a „cisla“ patrí len to, čo je potvrdené (fotka, EduPage alebo Janova správa).
   Odhad dopredu patrí do „dalej“. Nové učivo z odhadu sa na karty nedáva, kým ho Jan nepotvrdí.
   Žiadne mená ani údaje o deťoch.
   ===================================================================== */
module.exports = {
  aktualizovane: "2026-11-25",

  /* [odkedy, písmená] – dlhá samohláska ide s krátkou. Trieda číta malé aj veľké tlačené písmo. */
  pismena: [["2026-10-08","aá"],["2026-10-13","m"],["2026-10-19","eé"],["2026-10-26","l"],
            ["2026-11-02","ií"],["2026-11-10","j"],["2026-11-23","oó"]],

  /* [odkedy, číslo] – odkedy trieda číslicu píše; od toho dňa smie byť číslica na liste a v hre. */
  cisla: [["2026-10-09",1],["2026-10-14",2],["2026-10-16",3],["2026-10-21",4],["2026-10-28",5],
          ["2026-11-02",6],["2026-11-11",0],["2026-11-23",7]],

  /* Krátke poznámky k predmetom: čo platí teraz. */
  teraz: {
    SJL: "Šlabikár 1. časť (K. Štefeková), fáza F1. Čítanie slabík a krátkych viet z prebratých písmen. Prvá karta s novým písmenom ostáva jednoduchá (slabiky, slová z 2 slabík). Ďalšie karty SJL smú mať ťažšie slabiky a slová ako v šlabikári: zatvorené slabiky (lom, jem), slová z 3 slabík, dlhšie vety (Jan 25. 11.). Farby v slove: každá slabika inou farbou. Jan 19. 11.: trieda je ešte na J, písmeno O začína až od 23. 11. (karty s O sme preto posunuli na 23. – 25. 11.). Jan 25. 11.: trieda stále preberá O, nové písmeno asi od 30. 11. (ktoré, zatiaľ nevieme).",
    MAT: "Matematika s Lienkou 1. časť, fáza F1. Sčítanie (od 14. 10.) a odčítanie (od 22. 10.) do 6, pojmy súčet a rozdiel, rozklad čísla, porovnávanie < > =, poradie. Jan 19. 11.: trieda preberá 0 a číselný rad, potom od 23. 11. číslo 7 a sčítanie a odčítanie do 7. Úroveň ●●● smie ísť vyššie (Jan). Jan 25. 11.: stále 7, nové číslo asi od 30. 11.",
    ANJ: "Beehive Starter, lekcia 1 (školské veci, čísla 1 – 3), fáza F1 = jednotlivé slová. Na kartách už boli pozdravy, farby, čísla 1 – 6, pokyny, školské veci. Jan 19. 11.: trieda je na farbách (lekcia 2), potom zvieratá na farme (lekcia 3). ANJ má v škole len 1 hodinu týždenne, preto na kartách trochu viac angličtiny: 3 karty ANJ v týždni."
  },

  /* Odhad dopredu (poradie z učebníc). Na karty až po potvrdení od Jana. */
  dalej: {
    SJL: "Ďalšie písmená podľa šlabikára: S, U, V, N, Y, P, T, K, Z, R. Asi jedno za týždeň.",
    MAT: "8 asi 30. 11., 9 asi 7. 12., 10 asi 14. 12., počítanie do 10 do Vianoc, číselná os a eurá v januári.",
    ANJ: "Lekcia 3 zvieratá na farme (čísla 7 – 9) asi od 23. 11., lekcia 4 jedlo."
  }
};
