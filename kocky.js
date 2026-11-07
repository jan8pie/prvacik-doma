/* =====================================================================
   HRA S KOCKAMI – jadro hry (spoločné pre stránku kocky.html aj karty MAT)
   Číslo = kocky v rámikoch po 10. Plný rámik je desiatka, kocky navyše sú
   v čiarkovanom rámiku. Vzhľad je v kocky.css.

   Použitie:
     const h = Kocky.hra(prvok, {say, kol:5, priKonci});
     h.spusti({rezim:"spoj", rozsah:10, u:1, max:6}, {automaticky:true});

   rezim    "kolko" (Koľko je?, pri u:2 dieťa číslo postaví), "spoj" (+) alebo
            "stavby" (obrázky z kociek: u:0 spočítaj, u:1 kde je viac, u:2 koľko chýba)
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
  /* prázdne miesta sa postupne zaplnia kockami */
  objav(els, {oneskorenie=110}={}){
    if(this.ticho||!els.length) return Promise.resolve();
    els.forEach((el,i)=>el.animate([{transform:"scale(0)",opacity:0},{transform:"scale(1.15)",opacity:1,offset:.7},{transform:"none"}],{duration:320,delay:i*oneskorenie,easing:"ease-out",fill:"backwards"}));
    return pockaj((els.length-1)*oneskorenie+340);
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
/* rámiky jednej skupiny; číslo nad rámikom počíta len kocky (nie prázdne miesta) */
function stlpce(g){
  const c=document.createElement("div"); c.className="kk-cols";
  g.stlpce.forEach(st=>{
    const w=document.createElement("div"); w.className="kk-colw";
    const plne=st.kusy.filter(k=>!k.classList.contains("kk-duch")).length;
    const n=document.createElement("div"); n.className="kk-cnum"; n.textContent = plne ? plne : "";
    const s=document.createElement("div"); s.className="kk-col "+(st.rod?"rod":"ones");
    st.kusy.forEach((k,j)=>{ k.classList.toggle("h", j>=5); k.style.gridArea=""; });   /* 1 – 5 tmavší odtieň, 6 – 10 svetlejší */
    s.append(...st.kusy); w.append(n,s); c.append(w);
  });
  return c;
}
function vykresli(scene, skupiny, {znamienko=false}={}){
  scene.replaceChildren();
  skupiny.forEach((g,i)=>{
    if(i>0 && znamienko){ const p=document.createElement("div"); p.className="kk-plus"; p.textContent="+"; scene.append(p); }
    scene.append(stlpce(g));
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

/* ===== Stavby z kociek: obrázky a stavby, ktoré sa dajú upratať do rámikov =====
   Obrázok = mriežka, # je kocka. Počet kociek sa ráta sám. Mená sú v 1. páde („Koľko kociek má …?“). */
const VZORY = [
  ["dom",      ".#./###/#.#"],
  ["stolička", "#../#../###/#.#"],
  ["auto",     ".##./####/#..#"],
  ["raketa",   ".#./###/###/#.#"],
  ["schody",   "#.../##../###./####"],
  ["hríb",     ".###./#####/..#../..#.."],
  ["jedlička", "..#../.###./#####/..#.."],
  ["auto",     ".###./#####/.#.#."],
  ["loďka",    "..#../..##./#####/.###."],
  ["srdce",    "##.##/#####/.###./..#.."],
  ["strom",    "..#../.###./#####/.###./..#../..#.."],
  ["dom",      "..#../.###./#####/.#.##/.#.##"],
  ["schody",   "#..../##.../###../####./#####"],
  ["pes",      "....##/#...##/#####./#####./#...#."],
  ["raketa",   "..#../.###./.###./.###./#####/#.#.#"],
  ["auto",     "..###../#######/#######/.#...#."],
  ["ryba",     "..##.../.####.#/#######/.####.#/..##..."],
  ["vláčik",   "#....../###.###/#######/#######/.#.#.#."],
  ["hrad",     "#.#.#.#/#######/#######/##...##/##...##"],
  ["robot",    "..###../..###../#######/#.###.#/#.###.#/..#.#../..#.#.."],
  ["raketa",   "...#.../..###../..###../..###../..###../.#####./##.#.##/#..#..#"],
  ["dom",      "...#.../..###../.#####./#######/.#####./.##.##./.##.##."],
  ["loď",      "...#..../...##.../...###../...####./...#..../########/.######./..####.."],
  ["strom",    "...#.../..###../.#####./#######/..###../.#####./#######/...#.../...#..."],
  ["hrad",     "#.#.#.#.#/#########/#########/###.#.###/###...###/###...###"]
].map(([meno, kresba])=>{
  const r=kresba.split("/"), bunky=[];
  r.forEach((riadok,y)=>[...riadok].forEach((z,x)=>{ if(z==="#") bunky.push([x,y]); }));
  return {meno, w:Math.max(...r.map(x=>x.length)), h:r.length, bunky};
});
const kopia = v => ({meno:v.meno, w:v.w, h:v.h, bunky:v.bunky.map(b=>[...b])});
/* stavba: stĺpce rôznej výšky, spolu presne n kociek */
function stavba(n, {kompakt=false}={}){
  const maxH = n<=10?5:n<=20?6:8;
  const wMin=Math.max(1,Math.ceil(n/maxH)), wMax=Math.max(wMin, Math.min(n, 9, Math.ceil(Math.sqrt(n))+(kompakt?0:2)));
  let w = nah(wMin, wMax); if(n>=4 && w===1) w=Math.min(wMax,2);
  const v=Array(w).fill(1); let zvys=n-w;
  while(zvys>0){ const i=nah(0,w-1); if(v[i]<maxH){ v[i]++; zvys--; } }
  const h=Math.max(...v), bunky=[];
  v.forEach((vy,x)=>{ for(let j=0;j<vy;j++) bunky.push([x,h-1-j]); });
  return {meno: w===1?"veža":"stavba", w, h, bunky};
}
/* had: dlhý a tenký, vyzerá väčší, než je (dobré pri porovnávaní) */
function had(n){
  const w = n<=10?3:n<=20?4:6, bunky=[];
  let x=0, y=0, smer=1;
  while(bunky.length<n){
    bunky.push([x,y]);
    if(y%2===0){ const nx=x+smer; if(nx<0||nx>=w){ y++; } else x=nx; }
    else { y++; smer=-smer; }
  }
  return {meno:"had", w, h:y+1, bunky};
}
function tvar(n, typ){
  const v=VZORY.filter(x=>x.bunky.length===n);
  if(typ==="had" && n>=4) return had(n);
  if(typ==="kompakt") return v.length && Math.random()<.7 ? kopia(v[nah(0,v.length-1)]) : stavba(n,{kompakt:true});
  const r=Math.random();
  if(v.length && r<.6) return kopia(v[nah(0,v.length-1)]);
  return r<.8 || n<4 ? stavba(n) : had(n);
}
function tvarVRozsahu(lo, hi){
  const v=VZORY.filter(x=>x.bunky.length>=lo && x.bunky.length<=hi);
  if(v.length && Math.random()<.65) return kopia(v[nah(0,v.length-1)]);
  return tvar(nah(lo,hi));
}
const rozpatieStavby = cfg => { const M=strop(cfg); return cfg.rozsah===10?[Math.min(3,M),M]:cfg.rozsah===20?[11,20]:[21,50]; };
/* veľkosť kocky tak, aby sa zmestila stavba aj rámiky (kocky pri upratovaní nemenia veľkosť) */
function velkostStavby(scene, boxy){
  scene._vs=boxy;
  const W = scene.clientWidth || 320, vKid=!!scene.closest(".kid");
  const H = Math.min(window.innerHeight*(vKid?.44:.40), 420);
  const Wb = boxy.length>1 ? (W-16)/2 - 20 : W;
  let k=40;
  boxy.forEach(b=>{ k=Math.min(k, Math.floor(Wb/(b.w*1.12)), Math.floor((H-24)/(b.h*1.12)), Math.floor(Wb/b.stlpcov - 18)); });
  k = Math.min(k, Math.floor((H-40)/11.3));
  k = Math.max(10,k);
  scene.style.setProperty("--k", k+"px");
  scene.style.setProperty("--g", Math.max(2, Math.round(k*.12))+"px");
}
/* nakreslí stavbu do mriežky; bunky = [{x,y,el}] */
function mriezka(s){
  const m=document.createElement("div"); m.className="kk-stavba";
  m.style.gridTemplateColumns=`repeat(${s.w}, var(--k))`; m.style.gridTemplateRows=`repeat(${s.h}, var(--k))`;
  s.bunky.forEach(b=>{ b.el.classList.remove("h"); b.el.style.gridArea=`${b.y+1} / ${b.x+1}`; m.append(b.el); });
  return m;
}
/* poradie pri upratovaní: zdola nahor, zľava doprava; kocky po 10 do rámikov (ako skupina()) */
const zdola = bunky => [...bunky].sort((p,q)=>q.y-p.y || p.x-q.x);
function doRamikov(kusy){
  const st=[];
  for(let i=0;i+10<=kusy.length;i+=10) st.push({rod:true, kusy:kusy.slice(i,i+10)});
  st.push({rod:false, kusy:kusy.slice(Math.floor(kusy.length/10)*10)});
  return {stlpce:st};
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
    if(cfg.rezim==="stavby") return koloStavby(b);
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
    zadaj(odhad?`Koľko je ${a} a ${c}?`:"Koľko kociek bude spolu? Ťukni na Spoj");
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

  /* ===== Stavby z kociek ===== */
  function unikatK(f, kluc){ let x, i=0; do{ x=f(); i++; }while(posledne.has(kluc(x)) && i<30); posledne.add(kluc(x)); return x; }
  /* ťuknutie na kocku (alebo prázdne miesto) ju očísluje; ťuknutie na poslednú číslo zruší */
  function cislovanie(sc){
    const rady={k:[], d:[]};
    sc.onclick = e=>{
      const k=e.target.closest(".kk-stavba .kk-k"); if(!k||zamok) return;
      const r=rady[k.classList.contains("kk-duch")?"d":"k"];
      if(k.dataset.zn){ if(r[r.length-1]===k){ r.pop(); delete k.dataset.zn; k.textContent=""; } return; }
      r.push(k); k.dataset.zn=r.length; k.textContent=r.length; say(String(r.length));
    };
    return () => { rady.k.length=0; rady.d.length=0; sc.querySelectorAll(".kk-k").forEach(k=>{ delete k.dataset.zn; k.textContent=""; }); };
  }
  const IK_UPRAC = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="3" width="6" height="18" rx="1.5"/><rect x="14" y="11" width="6" height="10" rx="1.5" stroke-dasharray="2.5 2"/></svg>';
  const velke = t => t.charAt(0).toUpperCase()+t.slice(1);

  /* ● Koľko kociek má stavba?   ●●● Koľko kociek chýba? */
  function koloStavby(b){
    if(cfg.u===1) return koloPorovnaj(b);
    const dopln=cfg.u===2, [fa,fb]=farby(), [lo,hi]=rozpatieStavby(cfg);
    const s=unikatK(()=> dopln && cfg.rozsah===10 ? tvar(hi) : tvarVRozsahu(lo,hi), x=>x.meno+x.bunky.length);
    const t=s.bunky.length;
    const m = !dopln ? 0 : cfg.rozsah===10 ? nah(Math.min(2,t-1), Math.max(1,t-2)) : cfg.rozsah===20 ? nah(2, Math.min(9,t-3)) : nah(3, Math.min(15,t-6));
    const a=t-m;
    /* chýbajú horné kocky: stavba ešte nie je dostavaná */
    const bunky=[...s.bunky].sort((p,q)=>p[1]-q[1] || p[0]-q[0]).map(([x,y],i)=>{ const el=kocka(i<m?fb:fa); if(i<m) el.classList.add("kk-duch"); return {x,y,el,chyba:i<m}; });
    el.innerHTML = `${hlavicka()}<p class="kk-zadanie">${dopln?"Koľko kociek chýba?":`Koľko kociek má ${s.meno}?`}</p><div class="kk-scene kk-bez-cisel"></div>
      <div class="kk-row"><button class="btn" type="button" data-uprac>${IK_UPRAC}Uprac do rámikov</button></div>
      <p class="kk-rovnica">${dopln?`<span class="kk-t${fa}">${a}</span> + <span class="kk-vys">?</span> = <span>${t}</span>`:`<span class="kk-vys">?</span>`}</p>
      <div class="kk-vstup"></div><p class="kk-status" role="status"></p>`;
    const sc=el.querySelector(".kk-scene"), st=el.querySelector(".kk-status"), upBtn=el.querySelector("[data-uprac]");
    velkostStavby(sc, [{w:s.w, h:s.h, stlpcov:Math.floor(t/10)+1}]);
    sc.append(mriezka({...s, bunky})); ANIM.presun(sc,null,{oneskorenie:t>20?8:30});
    const zrus=cislovanie(sc);
    zadaj(dopln?"Koľko kociek chýba? Ťukni na prázdne miesta a počítaj":`Koľko kociek má ${s.meno}?`);
    /* najprv kocky stavby, potom chýbajúce (aj keď sú už doplnené), aby farby išli za sebou */
    const zoradene = () => [...zdola(bunky.filter(x=>!x.chyba)), ...zdola(bunky.filter(x=>x.chyba))].map(x=>x.el);
    let upratane=false, g=null;
    const uprac = async () => {
      if(upratane) return; upratane=true; upBtn.hidden=true; zrus();
      const pred=ANIM.fotka(sc); g=doRamikov(zoradene()); vykresli(sc,[g]);
      await ANIM.presun(sc,pred,{trvanie:750, oneskorenie:t>20?10:35});
    };
    upBtn.onclick=async()=>{ if(zamok) return; zamok=true; await uprac(); zamok=false;
      if(t>10) say(dopln?"Koľko prázdnych miest je v rámikoch?":"Spočítaj plné rámiky: 10, 20, 30… a potom kocky navyše"); };
    vstup(el.querySelector(".kk-vstup"), {spravne:dopln?m:t, moznosti:moznosti(dopln?m:t, 1, cfg), slot:el.querySelector(".kk-vys"),
      napoveda:()=>sc.classList.remove("kk-bez-cisel"),
      ok:async()=>{
        zamok=true; upBtn.hidden=true; zrus();
        st.className="kk-status ok"; st.textContent = dopln?`Áno! ${a} + ${m} = ${t}`:`Áno! ${t}`;
        if(dopln){ const d=[...sc.querySelectorAll(".kk-duch")]; d.forEach(x=>x.classList.remove("kk-duch")); await ANIM.objav(d,{oneskorenie:t>20?60:110}); if(upratane) vykresli(sc,[g]); }
        if(!upratane){ await pockaj(350); await uprac(); }
        sc.classList.remove("kk-bez-cisel");
        dalsie(b, dopln?`Áno! ${a} a ${m} je ${t}`:`Áno! ${velke(s.meno)} má ${kock(t)}${t>10?`. To sú ${popis(t)}`:""}`);
      },
      zle:()=>rada(st, dopln
        ? (upratane?"Skús ešte raz. Spočítaj prázdne miesta":"Skús ešte raz. Ťukni na každé prázdne miesto a počítaj")
        : (t<=10?"Skús ešte raz. Ťukni na každú kocku a počítaj":upratane?"Skús ešte raz. Spočítaj plné rámiky: 10, 20, 30… a potom kocky navyše":"Skús ešte raz. Ťukni na Uprac do rámikov"))
    });
  }

  /* ●● Kde je viac (menej) kociek? Tvar klame, rámiky povedia pravdu. */
  function koloPorovnaj(b){
    const R=cfg.rozsah, M=strop(cfg), [fa,fb]=farby();
    const [lo,hi] = R===10?[Math.min(2,M),M]:R===20?[8,20]:[20,45], dmax = R===10?2:R===20?3:5;
    const [nA,nB] = unikatK(()=>{ let x,y; do{ x=nah(lo,hi); y = Math.random()<.2 ? x : x+nah(1,dmax)*(Math.random()<.5?1:-1); }while(y<Math.max(1,lo-1)||y>hi); return [x,y]; }, p=>"p"+p);
    const viac = Math.random()<.65;
    /* polovica kôl klame: menšie číslo je dlhý had, väčšie je kompaktná stavba */
    const klam = nA!==nB && Math.random()<.5;
    const typ = n => klam ? (n===Math.min(nA,nB)?"had":"kompakt") : null;
    const sA=tvar(nA, typ(nA)), sB=tvar(nB, typ(nB));
    const bA=sA.bunky.map(([x,y])=>({x,y,el:kocka(fa)})), bB=sB.bunky.map(([x,y])=>({x,y,el:kocka(fb)}));
    const spravne = nA===nB ? "=" : (nA>nB)===viac ? "0" : "1";
    el.innerHTML = `${hlavicka()}<p class="kk-zadanie">Kde je <b>${viac?"viac":"menej"}</b> kociek?</p>
      <div class="kk-scene kk-dve kk-bez-cisel"><div class="kk-box" role="button" tabindex="0" data-volba="0" aria-label="Ľavá stavba"></div><div class="kk-box" role="button" tabindex="0" data-volba="1" aria-label="Pravá stavba"></div></div>
      <p class="kk-rovnica" hidden></p>
      <div class="kk-row"><button class="btn" type="button" data-uprac>${IK_UPRAC}Uprac do rámikov</button><button class="btn" type="button" data-volba="=">Rovnako</button></div>
      <p class="kk-status" role="status"></p>`;
    const sc=el.querySelector(".kk-scene"), st=el.querySelector(".kk-status"), upBtn=el.querySelector("[data-uprac]"), [boxA,boxB]=sc.querySelectorAll(".kk-box");
    velkostStavby(sc, [{w:sA.w,h:sA.h,stlpcov:Math.floor(nA/10)+1},{w:sB.w,h:sB.h,stlpcov:Math.floor(nB/10)+1}]);
    boxA.append(mriezka({...sA,bunky:bA})); boxB.append(mriezka({...sB,bunky:bB})); ANIM.presun(sc,null,{oneskorenie:nA+nB>30?6:20});
    zadaj(`Kde je ${viac?"viac":"menej"} kociek? Ťukni na stavbu, alebo na Rovnako`);
    let upratane=false, hotovo=false;
    const uprac = async () => {
      if(upratane) return; upratane=true; upBtn.hidden=true;
      const pred=ANIM.fotka(sc);
      boxA.replaceChildren(stlpce(doRamikov(zdola(bA).map(x=>x.el)))); boxB.replaceChildren(stlpce(doRamikov(zdola(bB).map(x=>x.el))));
      await ANIM.presun(sc,pred,{trvanie:750, oneskorenie:nA+nB>30?8:28});
    };
    upBtn.onclick=async()=>{ if(zamok) return; zamok=true; await uprac(); zamok=false; };
    const zvol = async v => {
      if(zamok||hotovo) return;
      const ciel = v==="="?el.querySelector('.kk-row [data-volba="="]'):v==="0"?boxA:boxB;
      if(ciel.classList.contains("no")) return;
      if(v!==spravne){ ciel.classList.add("no"); ANIM.tras(ciel);
        rada(st, upratane ? (R===10?"Skús ešte raz. Porovnaj, kde je vyšší stĺpec":"Skús ešte raz. Porovnaj plné rámiky a potom kocky navyše") : "Skús ešte raz. Ťukni na Uprac do rámikov a porovnaj");
        return; }
      hotovo=true; zamok=true; ciel.classList.add("ok"); upBtn.hidden=true;
      if(!upratane){ await pockaj(300); await uprac(); }
      sc.classList.remove("kk-bez-cisel");
      const zn = nA===nB?"=":nA>nB?">":"<", rov=el.querySelector(".kk-rovnica");
      rov.innerHTML=`<span class="kk-t${fa}">${nA}</span> ${zn} <span class="kk-t${fb}">${nB}</span>`; rov.hidden=false;
      const vac=Math.max(nA,nB), men=Math.min(nA,nB);
      st.className="kk-status ok"; st.textContent=`Áno! ${nA} ${zn} ${nB}`;
      dalsie(b, nA===nB ? `Áno! Na oboch stranách je ${kock(nA)}` : viac ? `Áno! ${vac} je viac ako ${men}` : `Áno! ${men} je menej ako ${vac}`);
    };
    el.querySelectorAll("[data-volba]").forEach(x=>{ x.onclick=()=>zvol(x.dataset.volba);
      if(x.classList.contains("kk-box")) x.onkeydown=e=>{ if(e.key==="Enter"||e.key===" "){ e.preventDefault(); zvol(x.dataset.volba); } }; });
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
  let rs; addEventListener("resize",()=>{ clearTimeout(rs); rs=setTimeout(()=>{ const sc=el.querySelector(".kk-scene"); if(sc&&sc._vs) velkostStavby(sc, sc._vs); else if(sc&&sc._v) velkost(sc, ...sc._v); },150); });

  return {
    /* nové nastavenie a nová hra od 1. kola; automaticky = hneď prečítať zadanie */
    spusti(novy, {automaticky:a=false, kol}={}){ if(novy) cfg=Object.assign({rezim:"kolko", rozsah:10, u:1}, novy); if(kol) KOL=kol; automaticky=a; novyBeh(); },
    get nastavenie(){ return cfg; }
  };
}

window.Kocky = { hra };
})();
