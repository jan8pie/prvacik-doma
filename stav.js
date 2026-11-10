/* =====================================================================
   STAV TRIEDY – jediné miesto, kde je zapísané, čo trieda už preberala.
   Čítajú ho skripty sada.js (prehľad pred výrobou sady) a kontrola-kariet.js (kontrola kariet).
   Na webe sa nenačíta.

   KEDY UPRAVIŤ: hneď, keď Jan potvrdí nové písmeno, číslo alebo lekciu angličtiny.
   Do „pismena“ a „cisla“ patrí len to, čo je potvrdené (fotka, EduPage alebo Janova správa).
   Odhad dopredu patrí do „dalej“. Nové učivo z odhadu sa na karty nedáva, kým ho Jan nepotvrdí.
   Žiadne mená ani údaje o deťoch.
   ===================================================================== */
module.exports = {
  aktualizovane: "2026-11-10",

  /* [odkedy, písmená] – dlhá samohláska ide s krátkou. Trieda číta malé aj veľké tlačené písmo. */
  pismena: [["2026-10-08","aá"],["2026-10-13","m"],["2026-10-19","eé"],["2026-10-26","l"],
            ["2026-11-02","ií"],["2026-11-10","j"],["2026-11-16","oó"]],

  /* [odkedy, číslo] – odkedy trieda číslicu píše; od toho dňa smie byť číslica na liste a v hre. */
  cisla: [["2026-10-09",1],["2026-10-14",2],["2026-10-16",3],["2026-10-21",4],["2026-10-28",5],
          ["2026-11-02",6],["2026-11-11",0],["2026-11-16",7]],

  /* Krátke poznámky k predmetom: čo platí teraz. */
  teraz: {
    SJL: "Šlabikár 1. časť (K. Štefeková), fáza F1. Čítanie slabík a krátkych viet z prebratých písmen. Spájanie dvoch slabík do slova ešte nie je pohotové, preto slová najviac z 2 – 3 slabík. Farby v slove: každá slabika inou farbou.",
    MAT: "Matematika s Lienkou 1. časť, fáza F1. Sčítanie (od 14. 10.) a odčítanie (od 22. 10.) do 6, pojmy súčet a rozdiel, rozklad čísla, porovnávanie < > =, poradie. S číslom 7 pribúda počítanie do 7.",
    ANJ: "Beehive Starter, lekcia 1 (školské veci, čísla 1 – 3), fáza F1 = jednotlivé slová. Na kartách už boli pozdravy, farby, čísla 1 – 6, pokyny, školské veci."
  },

  /* Odhad dopredu (poradie z učebníc). Na karty až po potvrdení od Jana. */
  dalej: {
    SJL: "Ďalšie písmená podľa šlabikára: S, U, V, N, Y, P, T, K, Z, R. Asi jedno za týždeň.",
    MAT: "8 asi 25. 11., 9 asi 30. 11., 10 asi 7. 12., počítanie do 10 do Vianoc, číselná os a eurá v januári.",
    ANJ: "Lekcia 2 farby (čísla 4 – 6), lekcia 3 zvieratá na farme (čísla 7 – 9), lekcia 4 jedlo."
  }
};
