/* =====================================================================
   HRA S KOCKAMI – jadro hry (spoločné pre stránku kocky.html aj karty MAT)
   Číslo = kocky v rámikoch po 10. Plný rámik je desiatka, kocky navyše sú
   v čiarkovanom rámiku. Vzhľad je v kocky.css.

   Použitie:
     const h = Kocky.hra(prvok, {say, kol:5, priKonci});
     h.spusti({rezim:"spoj", rozsah:10, u:1, max:6}, {automaticky:true});

   rezim    "kolko" (Koľko je?, pri u:2 dieťa číslo postaví) alebo "spoj" (+)
   rozsah   10, 20 alebo 100
   u        0 Ľahšie, 1 Bežné, 2 Výzva
   max      (nepovinné) najväčšie číslo pri rozsahu 10, napr. 6 podľa témy v škole
   say      funkcia, ktorá prečíta text nahlas a vráti sľub (Promise)
   priKonci (nepovinné) zavolá sa po poslednom kole; ak vráti true, koniec rieši stránka
   ===================================================================== */
(function(){
"use strict";
const PO_HLASE_MS = 700;
const pockaj = ms => new Promise(r=>setTimeout(r,ms));

/* Farby sa menia po kolách, vždy dvojica dobre odlíšiteľných farieb (nikdy červená so zelenou). */
const PARY = [[0,1],[3,2],[5,4],[1,0],[2,3],[4,5]];

/* slová pri číslach (kocka, desiatka sú ženského rodu) */
const kock = n => n===1?"jedna kocka":n===2?"dve kocky":n<5?`${n} kocky`:`${n} kociek`;
const des = n => n===1?"jedna desiatka":n===2?"dve desiatky":n<5?`${n} desiatky`:`${n} desiatok`;
const popis = n => { const t=Math.floor(n/10), o=n%10; return t===0?kock(o):o===0?des(t):`${des(t)} a ${kock(o)}`; };

/* ===== animácie: všetky pohyby sú len tu, aby sa dali neskôr vymeniť ===== */
const ANIM = {
  ticho: matchMedia("(prefers-reduced-motion: reduce)").matches,
  fotka(scene){ const m=new Map(); scene.querySelectorAll(".kk-k").forEach(el=>m.set(el, el.getBoundingClientRect())); return m; },
  /* kocky, ktoré boli na scéne, sa presunú z pôvodného miesta; nové „vyskočia“ */
  presun(scene, pred, {trvanie=650, oneskorenie=18}={}){
    if(this.ticho) return Promise.resolve();
    let max=0, i=0;
    scene.querySelectorAll(".kk-k").forEach(el=>{
      const o=pred&&pred.get(el), n=el.getBoundingClientRect(), d=i++*oneskorenie;
      if(o){ const dx=o.left-n.left, dy=o.top-n.top; if(!dx&&!dy) return;
        el.animate([{transform:`translate(${dx}px,${dy}px)`},{transform:"none"}],{duration:trvanie,delay:d,easing:"cubic-bezier(.3,.75,.25,1)",fill:"backwards"}); }
      else el.animate([{transform:"scale(0)",opacity:0},{transform:"scale(1.12)",opacity:1,offset:.7},{transform:"none"}],{duration:320,delay:d,easing:"ease-out",fill:"backwards"});
      max=Math.max(max,d+(o?trvanie:320));
    });
    return pockaj(max);
  },
  /* stĺpec kociek sa zabalí do desiatky */
  zabal(col){
    if(this.ticho||!col) return Promise.resolve();
    col.animate([{transform:"none"},{transform:"scale(1.08,1.03)"},{transform:"none"}],{duration:420,easing:"ease-in-out"});
    return pockaj(450);
  },
  tras(el){ if(!el) return; el.classList.remove("kk-tras"); void el.offsetWidth; el.classList.add("kk-tras"); }
};

/* ===== kocky a ich rozloženie ===== */
const kocka = f => { const el=document.createElement("div"); el.className="kk-k kk-f"+f; return el; };
/* skupina = {stlpce:[{rod, kusy:[kocky]}]} – desiatky, potom kocky navyše */
function skupina(n, f){
  const st=[];
  for(let t=0;t<Math.floor(n/10);t++) st.push({rod:true, kusy:Array.from({length:10},()=>kocka(f))});
  st.push({rod:false, kusy:Array.from({length:n%10},()=>kocka(f))});
  return {stlpce:st};
}
const pocetKociek = g => g.stlpce.reduce((s,x)=>s+x.kusy.length,0);
function velkost(scene, pocetStlpcov, skupin){
  scene._v=[pocetStlpcov, skupin];
  const W = scene.clientWidth || 320;
  const vKid = !!scene.closest(".kid");
  const H = Math.min(window.innerHeight*(vKid?.44:.40), 420);
  let k = Math.floor((W - (skupin-1)*50) / pocetStlpcov - 18);
  k = Math.min(k, Math.floor((H-40)/11.3), 40);
  k = Math.max(10,k);
  scene.style.setProperty("--k", k+"px");
  scene.style.setProperty("--g", Math.max(2, Math.round(k*.12))+"px");
}
function vykresli(scene, skupiny, {znamienko=false}={}){
  scene.replaceChildren();
  skupiny.forEach((g,i)=>{
    if(i>0 && znamienko){ const p=document.createElement("div"); p.className="kk-plus"; p.textContent="+"; scene.append(p); }
    const c=document.createElement("div"); c.className="kk-cols";
    g.stlpce.forEach(st=>{
      const w=document.createElement("div"); w.className="kk-colw";
      const n=document.createElement("div"); n.className="kk-cnum"; n.textContent = st.kusy.length ? st.kusy.length : "";
      const s=document.createElement("div"); s.className="kk-col "+(st.rod?"rod":"ones");
      st.kusy.forEach((k,j)=>k.classList.toggle("h", j>=5));   /* 1 – 5 tmavší odtieň, 6 – 10 svetlejší */
      s.append(...st.kusy); w.append(n,s); c.append(w);
    });
    scene.append(c);
  });
}

/* ===== úlohy ===== */
const nah = (a,b) => a + Math.floor(Math.random()*(b-a+1));
const zamiesaj = a => { for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; };
/* najväčšie číslo: pri rozsahu 10 sa dá zúžiť podľa témy (napr. do 6) */
const strop = cfg => cfg.rozsah===10 ? Math.max(2, Math.min(10, cfg.max||10)) : cfg.rozsah;
function moznosti(n, u, cfg){
  const t=Math.floor(n/10), o=n%10, c=[];
  if(n<=10){ c.push(...(u===0?[n+2,n-2,n+3,n-3]:[n+1,n-1,n+2,n-2])); }
  else if(u===0){ c.push(n+10,n-10,n+5,n-5); }
  else { if(o>0 && o*10+t!==n) c.push(o*10+t); c.push(n+1,n-1,n+10,n-10); }
  for(let d=1; d<12; d++) c.push(n+d, n-d);
  const hore = cfg.rozsah===10 ? Math.max(strop(cfg), n) : Math.max(cfg.rozsah,10);
  const ok = c.filter((x,i)=>x>=0 && x<=hore && x!==n && c.indexOf(x)===i);
  return zamiesaj([n, ...ok.slice(0, u===0?2:3)]);
}
function cisloKolko(cfg){
  const R=cfg.rozsah, u=cfg.u, M=strop(cfg);
  if(R===10) return u===0?nah(1,Math.min(5,M)):nah(Math.min(3,M),M);
  if(R===20) return u===0?nah(6,12):nah(11,20);
  return u===0?nah(11,50):nah(21,99);
}
function prikladSpoj(cfg){
  const R=cfg.rozsah, u=cfg.u, M=strop(cfg); let a,b;
  if(R===10){ const s=u===0?nah(2,Math.min(6,M)):nah(Math.min(M,Math.max(3,M-5)),M); a=nah(1,s-1); b=s-a; }
  else if(R===20){ if(u===0){ a=nah(10,15); b=nah(1,9-a%10); } else { a=nah(5,9); b=nah(11-a,9); } }
  else { if(u===0){ do{ a=nah(11,68); b=nah(10,99-a); }while(a%10+b%10>9 || b%10===0 && a%10===0); }
         else { do{ a=nah(15,69); b=nah(5,99-a); }while(a%10+b%10<10 || a%10===0 || b%10===0); } }
  return [a,b];
}

const IK_HLAS = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9z"/><path d="M16.5 8.5a5 5 0 0 1 0 7"/></svg>';
const IK_HVIEZDA = '<svg class="kk-hv" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2.5l2.9 6 6.6.8-4.9 4.5 1.3 6.5L12 17l-5.9 3.3 1.3-6.5L2.5 9.3l6.6-.8z"/></svg>';

/* ===== jedna hra v jednom prvku stránky ===== */
function hra(el, o={}){
  const say = o.say || (()=>Promise.resolve(false));
  const jeKid = () => !!el.closest(".kid");
  let cfg = {rezim:"kolko", rozsah:10, u:1}, KOL = o.kol || 5;
  let kolo=0, beh=0, zamok=false, posledne=new Set(), zadanieHlas="", automaticky=false;
  el.classList.add("kk");
  const farby = () => PARY[(kolo + beh) % PARY.length];

  /* odpoveď: rad číslic 0 – 9, tlačidlo ? ukáže možnosti */
  function vstup(box, {spravne, moznosti:m, slot, ok, zle, napoveda}){
    box.innerHTML = `<div class="kk-klav">${[0,1,2,3,4,5,6,7,8,9].map(d=>`<button class="kk-num" type="button" data-d="${d}">${d}</button>`).join("")}</div>
      <div class="kk-pomoc"><button class="btn" type="button" data-zmaz aria-label="Zmazať">⌫</button></div>
      <div class="kk-tiles" hidden>${m.map(x=>`<button class="kk-tile" type="button" data-kv="${x}">${x}</button>`).join("")}</div>`;
    let pis="", hotovo=false;
    const dlzka=String(spravne).length;
    /* Žltý otáznik stojí hneď vedľa miesta na odpoveď, aby ho dieťa našlo. */
    const nap=document.createElement("button"); nap.className="kk-nap"; nap.type="button"; nap.textContent="?";
    nap.setAttribute("aria-label","Nápoveda: ukáž možnosti"); nap.hidden=box.hidden; slot.after(nap); box._nap=nap;
    const ukaz = () => { slot.textContent = pis || " "; };
    ukaz();
    const vypni = () => { hotovo=true; nap.hidden=true; box.querySelectorAll("button").forEach(b=>b.disabled=true); slot.classList.add("ok"); slot.textContent=spravne; };
    box.querySelectorAll("[data-d]").forEach(b=>b.onclick=()=>{
      if(hotovo||zamok) return;
      pis += b.dataset.d; ukaz();
      if(pis.length<dlzka && +pis!==spravne) return;
      if(+pis===spravne){ vypni(); ok(); }
      else { const zly=pis; ANIM.tras(slot); setTimeout(()=>{ if(!hotovo){ pis=""; ukaz(); } },650); zle(+zly); }
    });
    box.querySelector("[data-zmaz]").onclick=()=>{ if(hotovo) return; pis=pis.slice(0,-1); ukaz(); };
    nap.onclick=()=>{
      if(hotovo) return; nap.hidden=true;
      box.querySelector(".kk-klav").hidden=true; box.querySelector(".kk-pomoc").hidden=true; box.querySelector(".kk-tiles").hidden=false;
      pis=""; ukaz(); napoveda&&napoveda(); say("Vyber jedno číslo");
    };
    box.querySelectorAll(".kk-tile").forEach(t=>t.onclick=()=>{
      if(hotovo||zamok||t.disabled) return;
      if(+t.dataset.kv===spravne){ t.classList.add("ok"); vypni(); ok(); }
      else { t.classList.add("no"); t.disabled=true; ANIM.tras(t); zle(+t.dataset.kv); }
    });
  }

  function hlavicka(){
    return `<div class="kk-top"><span class="kk-kolo">Kolo ${kolo+1} z ${KOL}</span><span class="kk-dots" aria-hidden="true">${Array.from({length:KOL},(_,i)=>`<i class="${i<kolo?"on":""}"></i>`).join("")}</span>
    <button class="btn" type="button" data-zopakuj style="min-height:40px;padding:6px 12px">${IK_HLAS}Vypočuj</button></div>`;
  }
  function novyBeh(){ beh++; kolo=0; posledne.clear(); zamok=false; noveKolo(); }
  function noveKolo(){
    if(kolo>=KOL) return koniec();
    const b=beh;
    if(cfg.rezim==="kolko" && cfg.u===2) return koloPostav(b);
    if(cfg.rezim==="kolko") return koloKolko(b);
    return koloSpoj(b);
  }
  function unikat(f){ let x, i=0; do{ x=f(cfg); i++; }while(posledne.has(String(x)) && i<30); posledne.add(String(x)); return x; }
  function zadaj(t){ zadanieHlas=t; if(automaticky) say(t); }
  function dalsie(b, text){
    zamok=true; automaticky=true;
    return say(text).then(()=>pockaj(PO_HLASE_MS)).then(()=>{ if(b!==beh) return; kolo++; zamok=false; noveKolo(); });
  }
  function rada(st, text){ st.className="kk-status"; st.textContent=text; say(text); }

  /* Koľko je? Čísla nad rámikmi sú skryté, ukážu sa až s nápovedou ? */
  function koloKolko(b){
    const n=unikat(cisloKolko), [f]=farby();
    el.innerHTML = `${hlavicka()}<p class="kk-zadanie">Koľko je tu kociek?</p><div class="kk-scene kk-bez-cisel"></div>
      <p class="kk-rovnica"><span class="kk-vys">?</span></p><div class="kk-vstup"></div><p class="kk-status" role="status"></p>`;
    const sc=el.querySelector(".kk-scene"), g=skupina(n,f), st=el.querySelector(".kk-status");
    velkost(sc, g.stlpce.length, 1); vykresli(sc,[g]); ANIM.presun(sc,null,{oneskorenie:n>20?6:25});
    zadaj("Koľko je tu kociek?");
    vstup(el.querySelector(".kk-vstup"), {spravne:n, moznosti:moznosti(n,cfg.u,cfg), slot:el.querySelector(".kk-vys"),
      napoveda:()=>sc.classList.remove("kk-bez-cisel"),
      ok:()=>{ sc.classList.remove("kk-bez-cisel"); st.className="kk-status ok"; st.textContent=`Áno! ${n}`; dalsie(b, n>10?`Áno! ${popis(n)}, spolu ${n}`:`Áno! ${n}`); },
      zle:()=>rada(st, n>10 ? "Skús ešte raz. Najprv spočítaj plné rámiky: 10, 20, 30… a potom pridaj kocky navyše" : "Skús ešte raz. Ukáž prstom na každú kocku")
    });
  }

  /* Postav číslo (●●● pri Koľko je?) */
  function koloPostav(b){
    const n=unikat(cisloKolko), velke=cfg.rozsah>10, [f]=farby();
    el.innerHTML = `${hlavicka()}<p class="kk-zadanie">Postav číslo</p><div class="kk-ciel kk-t${f}">${n}</div><div class="kk-scene"></div>
      <div class="kk-stav">${velke?`<button class="btn" type="button" data-pridaj="10">+ desiatka</button>`:""}<button class="btn" type="button" data-pridaj="1">+ kocka</button>
      <button class="btn" type="button" data-uber>− uber</button><button class="btn primary" type="button" data-hotovo>Hotovo</button></div><p class="kk-status" role="status"></p>`;
    const sc=el.querySelector(".kk-scene"), st=el.querySelector(".kk-status");
    const g={stlpce:[{rod:false,kusy:[]}]}, jedn=()=>g.stlpce[g.stlpce.length-1];
    velkost(sc, Math.max(4, Math.floor(n/10)+2), 1); vykresli(sc,[g]);
    zadaj(`Postav číslo ${n}`);
    const prekresli = async (pred) => {
      vykresli(sc,[g]); await ANIM.presun(sc,pred,{trvanie:420,oneskorenie:0});
      if(jedn().kusy.length===10){ jedn().rod=true; g.stlpce.push({rod:false,kusy:[]}); const p2=ANIM.fotka(sc); vykresli(sc,[g]);
        await ANIM.presun(sc,p2,{trvanie:300,oneskorenie:0}); const r=sc.querySelectorAll(".kk-col.rod"); await ANIM.zabal(r[r.length-1]); say("Desať kociek je jedna desiatka"); }
    };
    el.querySelectorAll("[data-pridaj]").forEach(bt=>bt.onclick=async()=>{
      if(zamok) return; if(pocetKociek(g)+ +bt.dataset.pridaj>100) return;
      zamok=true; const pred=ANIM.fotka(sc);
      if(bt.dataset.pridaj==="10") g.stlpce.splice(g.stlpce.length-1,0,{rod:true,kusy:Array.from({length:10},()=>kocka(f))});
      else jedn().kusy.push(kocka(f));
      await prekresli(pred); zamok=false; st.className="kk-status"; st.textContent="";
    });
    el.querySelector("[data-uber]").onclick=async()=>{
      if(zamok) return; zamok=true; const pred=ANIM.fotka(sc);
      if(jedn().kusy.length) jedn().kusy.pop();
      else if(g.stlpce.length>1){ const t=g.stlpce.splice(g.stlpce.length-2,1)[0]; jedn().kusy.push(...t.kusy.slice(0,9)); }
      await prekresli(pred); zamok=false;
    };
    el.querySelector("[data-hotovo]").onclick=()=>{
      if(zamok) return; const p=pocetKociek(g);
      if(p===n){ st.className="kk-status ok"; st.textContent=`Áno! ${n}`; el.querySelectorAll(".kk-stav .btn").forEach(x=>x.disabled=true);
        dalsie(b, n>10?`Áno! ${popis(n)} je ${n}`:`Áno! To je ${n}`); }
      else { ANIM.tras(el.querySelector(".kk-ciel"));
        rada(st, p<n ? (Math.floor(p/10)<Math.floor(n/10) && velke ? "Ešte to nie je ono. Pozri, koľko desiatok potrebuješ" : "Ešte to nie je ono. Treba viac kociek") : "Ešte to nie je ono. Je tu priveľa kociek"); }
    };
  }

  /* Spoj kocky: prvý blok ostane pokope, druhý sa k nemu priloží */
  function koloSpoj(b){
    const [a,c]=unikat(prikladSpoj), s=a+c, odhad=cfg.u===2, [fa,fb]=farby();
    el.innerHTML = `${hlavicka()}<div class="kk-scene"></div>
      <p class="kk-rovnica"><span class="kk-t${fa}">${a}</span> + <span class="kk-t${fb}">${c}</span> = <span class="kk-vys">?</span></p>
      <div class="kk-row"><button class="btn primary" type="button" data-spoj ${odhad?"hidden":""}>Spoj</button></div>
      <div class="kk-vstup" ${odhad?"":"hidden"}></div><p class="kk-status" role="status"></p>`;
    const sc=el.querySelector(".kk-scene"), ga=skupina(a,fa), gb=skupina(c,fb), st=el.querySelector(".kk-status"), box=el.querySelector(".kk-vstup");
    /* Spojenie: kocky navyše druhého čísla najprv doplnia rámik prvého do desiatky,
       potom sa priložia desiatky druhého čísla a nakoniec zvyšné kocky. Farby idú za sebou bez prerušenia. */
    const onesA=ga.stlpce[ga.stlpce.length-1].kusy, onesB=gb.stlpce[gb.stlpce.length-1].kusy;
    const doplnok=onesB.slice(0, 10-onesA.length), zvysok=onesB.slice(10-onesA.length), stred=[...onesA, ...doplnok];
    const stredSt={rod:false, kusy:stred};
    const spolu={stlpce:[
      ...ga.stlpce.filter(x=>x.rod), ...(stred.length?[stredSt]:[]), ...gb.stlpce.filter(x=>x.rod),
      ...(zvysok.length||!stred.length?[{rod:false,kusy:zvysok}]:[])
    ]};
    velkost(sc, Math.max(ga.stlpce.length+gb.stlpce.length+1, spolu.stlpce.length), 2);
    vykresli(sc,[ga,gb],{znamienko:true}); ANIM.presun(sc,null,{oneskorenie:s>20?5:20});
    zadaj(odhad?`Koľko je ${a} a ${c}? Najprv odhadni, potom uvidíš`:"Koľko kociek bude spolu? Ťukni na Spoj");
    let spojene=false, chyby=0;
    const spoj = async () => {
      if(spojene) return; spojene=true;
      const pred=ANIM.fotka(sc); vykresli(sc,[spolu]); await ANIM.presun(sc,pred,{trvanie:800,oneskorenie:12});
      if(stred.length===10 && onesA.length && doplnok.length){
        await pockaj(250); say("Desať kociek je jedna desiatka");
        stredSt.rod=true; const p2=ANIM.fotka(sc); vykresli(sc,[spolu]);
        await ANIM.presun(sc,p2,{trvanie:300,oneskorenie:0}); await ANIM.zabal(sc.querySelectorAll(".kk-col")[spolu.stlpce.indexOf(stredSt)]);
        await pockaj(400);
      }
      /* Bez prechodu cez desiatku a s desiatkami druhého čísla za sebou: neúplný rámik by bol v strede.
         Z poslednej desiatky sa presunie toľko kociek, aby bol rámik plný; neúplný ostane posledný. */
      const posl=spolu.stlpce[spolu.stlpce.length-1];
      if(stred.length>0 && stred.length<10 && posl!==stredSt && posl.rod){
        await pockaj(500);
        const treba=10-stred.length, p3=ANIM.fotka(sc);
        stred.push(...posl.kusy.splice(posl.kusy.length-treba, treba)); stredSt.rod=true; posl.rod=false;
        vykresli(sc,[spolu]); await ANIM.presun(sc,p3,{trvanie:600,oneskorenie:60});
        await ANIM.zabal(sc.querySelectorAll(".kk-col")[spolu.stlpce.indexOf(stredSt)]); await pockaj(300);
      }
    };
    const spBtn=el.querySelector("[data-spoj]");
    spBtn.onclick=async()=>{
      if(zamok) return; zamok=true; spBtn.disabled=true; await spoj(); spBtn.hidden=true; zamok=false;
      if(!odhad){ box.hidden=false; box._nap.hidden=false; zadanieHlas="Koľko je to spolu?"; say(zadanieHlas); }
    };
    vstup(box, {spravne:s, moznosti:moznosti(s, cfg.u===0?0:1, cfg), slot:el.querySelector(".kk-vys"),
      ok:async()=>{ st.className="kk-status ok"; st.textContent=`Áno! ${a} + ${c} = ${s}`;
        if(odhad && !spojene){ zamok=true; spBtn.hidden=true; await spoj(); zamok=false; }
        dalsie(b, `Áno! ${a} a ${c} je ${s}`); },
      zle:()=>{ chyby++;
        if(odhad && chyby>=2 && !spojene){ spBtn.hidden=false; spBtn.disabled=false; rada(st,"Skús ešte raz. Ťukni na Spoj a pozri sa"); return; }
        rada(st, odhad ? "Skús ešte raz. Najprv spoj kocky navyše: "+(a%10)+" a "+(c%10)
          : (s>10?"Skús ešte raz. Spočítaj plné rámiky a potom kocky navyše":"Skús ešte raz. Spočítaj všetky kocky")); }
    });
  }

  function koniec(){
    if(o.priKonci && o.priKonci()) return;
    el.innerHTML = `<div class="kk-koniec">${IK_HVIEZDA}
      <p>Hotovo, výborne!</p><p class="kk-small">${jeKid()?"Podaj tablet späť.":"Všetky kolá sú za vami."}</p><button class="btn primary" type="button" data-znova>Ešte raz</button></div>`;
    say(jeKid()?"Hotovo, výborne! Podaj tablet späť":"Hotovo, výborne!");
  }
  el.addEventListener("click", e=>{
    if(e.target.closest("[data-zopakuj]")) say(zadanieHlas);
    if(e.target.closest("[data-znova]")){ automaticky=true; novyBeh(); }
  });
  let rs; addEventListener("resize",()=>{ clearTimeout(rs); rs=setTimeout(()=>{ const sc=el.querySelector(".kk-scene"); if(sc&&sc._v) velkost(sc, ...sc._v); },150); });

  return {
    /* nové nastavenie a nová hra od 1. kola; automaticky = hneď prečítať zadanie */
    spusti(novy, {automaticky:a=false, kol}={}){ if(novy) cfg=Object.assign({rezim:"kolko", rozsah:10, u:1}, novy); if(kol) KOL=kol; automaticky=a; novyBeh(); },
    get nastavenie(){ return cfg; }
  };
}

window.Kocky = { hra };
})();
