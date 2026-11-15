/* Sprievodca webu: veverička (pôvodná kresba pre Prváčik doma, žiadna postavička z cudzej značky).
   Jedna kresba, niekoľko póz. Použitie na ktorejkoľvek stránke:

     <script src="sprievodca.js"></script>
     el.innerHTML = SPRIEVODCA.svg("chvali");            // celá postavička
     el.innerHTML = SPRIEVODCA.svg("ahoj", {hlava:true}); // len hlava (malé miesta, hlavička)
     SPRIEVODCA.svg("ukazuje", {vpravo:true})             // zrkadlovo, ukazuje doprava
     SPRIEVODCA.svg("chvali", {popis:"Veverička sa teší"})// s popisom pre čítačku, inak je ozdoba

   Pózy: ahoj (máva), chvali (teší sa, ruky hore), rozmysla (labka pri brade), ukazuje (ukazuje do strany),
         skus (nevadí, skús znova: jemne rozpačitá, nie plačúca), oriesok (drží oriešok, odmena na konci).
   Veľkosť určuje CSS (.sprv{width:…}); farby sú v kresbe, obrys ju drží čitateľnú na svetlom aj tmavom pozadí.
   Pohyb (žmurkanie, chvost, poskočenie) je jemný a pri „obmedziť pohyb“ sa vypne. */
(function(){
"use strict";
const F="#E8893A", FT="#CC6E26", SV="#F6B26B", KR="#FFEBCF", OB="#5B3319", RU="#F59C8B", OKO="#3A2212", ZL="#F7C948", ZLT="#D99A0B";
const o=`stroke="${OB}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"`;

/* ruka = hrubá čiara s obrysom; labka je zaoblený koniec */
const ruka=d=>`<path d="${d}" fill="none" stroke="${OB}" stroke-width="17" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="${F}" stroke-width="11.5" stroke-linecap="round" stroke-linejoin="round"/>`;
const RUKY={
  dolu_l:"M71 150 Q61 163 70 176", dolu_p:"M129 150 Q139 163 130 176",
  mava_p:"M130 149 Q150 143 157 119",
  hore_l:"M72 147 Q51 137 44 113", hore_p:"M128 147 Q149 137 156 113",
  brada_l:"M71 152 Q55 150 60 137 Q66 128 83 127",
  bok_p:"M129 150 Q141 160 133 172",
  ukaz_l:"M72 149 Q50 150 25 136",
  spolu_l:"M71 150 Q68 169 91 171", spolu_p:"M129 150 Q132 169 109 171",
  drzi_l:"M71 150 Q66 164 86 164", drzi_p:"M129 150 Q134 164 114 164"
};

const oci=(dx,dy)=>[80,120].map(x=>`<g class="sprv-oko" style="transform-origin:${x+dx}px ${86+dy}px"><ellipse cx="${x+dx}" cy="${86+dy}" rx="6.6" ry="8.6" fill="${OKO}"/><circle cx="${x+dx+2.4}" cy="${82.6+dy}" r="2.7" fill="#fff"/><circle cx="${x+dx-2.2}" cy="${89.6+dy}" r="1.3" fill="#fff" opacity=".85"/></g>`).join("");
const oci_smiech=`<path d="M72.5 89 Q80 78.5 87.5 89 M112.5 89 Q120 78.5 127.5 89" fill="none" stroke="${OKO}" stroke-width="3.6" stroke-linecap="round"/>`;
const nos=`<path d="M95 99.5 Q100 96.6 105 99.5 Q104.4 105 100 106.2 Q95.6 105 95 99.5 Z" fill="${OB}"/>`;
const usta_w=`<path d="M100 106 V109 M100 109 Q95.5 114.6 90 111 M100 109 Q104.5 114.6 110 111" fill="none" stroke="${OB}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>`;
const usta_smiech=`<path d="M100 106 V108.6" stroke="${OB}" stroke-width="2.4" stroke-linecap="round"/><path d="M90.5 109.5 Q100 112 109.5 109.5 Q108 121.5 100 121.5 Q92 121.5 90.5 109.5 Z" fill="#8E2F2A" stroke="${OB}" stroke-width="2.4" stroke-linejoin="round"/><path d="M96.4 110.8 H103.6 V114 Q100 115.6 96.4 114 Z M100 110.8 V114.6" fill="#fff" stroke="${OB}" stroke-width="1.2" stroke-linejoin="round"/><path d="M94.6 117.6 Q100 113.6 105.4 117.6 Q103.4 120.6 100 120.6 Q96.6 120.6 94.6 117.6 Z" fill="${RU}"/>`;
const usta_male=`<path d="M100 106 V109" stroke="${OB}" stroke-width="2.4" stroke-linecap="round"/><ellipse cx="103.4" cy="112.6" rx="3.3" ry="2.7" fill="#8E2F2A" stroke="${OB}" stroke-width="2"/>`;
const usta_vlnka=`<path d="M100 106 V109 M91.5 113.4 Q95.6 109.6 100 112.4 Q104.4 115.2 108.5 111.6" fill="none" stroke="${OB}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>`;
const obocie=(d)=>`<path d="${d}" fill="none" stroke="${OB}" stroke-width="2.6" stroke-linecap="round"/>`;
const hviezda=(x,y,s,tr="")=>`<path class="sprv-iskra ${tr}" style="transform-origin:${x}px ${y}px" d="M${x} ${y-s} Q${x+s*.18} ${y-s*.18} ${x+s} ${y} Q${x+s*.18} ${y+s*.18} ${x} ${y+s} Q${x-s*.18} ${y+s*.18} ${x-s} ${y} Q${x-s*.18} ${y-s*.18} ${x} ${y-s} Z" fill="${ZL}" stroke="${ZLT}" stroke-width="1.6" stroke-linejoin="round"/>`;
/* lieskový oriešok: guľatý, so špičkou hore a svetlou plôškou dole (nie žaluď s čiapočkou) */
const oriesok=`<g ${o}><path d="M100 139 C108 145 116 152 116 163 C116 173 109 179 100 179 C91 179 84 173 84 163 C84 152 92 145 100 139 Z" fill="#B9773A"/></g><path d="M90 172.6 Q100 168.6 110 172.6 Q106 177.6 100 177.6 Q94 177.6 90 172.6 Z" fill="#E9C99A"/><path d="M92.6 154 Q94.6 149 98.4 146.4" fill="none" stroke="#E2A765" stroke-width="2.6" stroke-linecap="round"/>`;

const POZY={
  ahoj:    {oci:oci(0,0), usta:usta_smiech, ruky:["dolu_l","mava_p"], trieda:"mava"},
  chvali:  {oci:oci_smiech, usta:usta_smiech, ruky:["hore_l","hore_p"], trieda:"skace",
            navyse:hviezda(27,84,9,"a")+hviezda(47,40,12,"b")+hviezda(103,20,8,"c")+hviezda(20,150,6,"c")},
  rozmysla:{oci:oci(2.4,-2.6), usta:usta_male, ruky:["bok_p","brada_l"],
            obocie:obocie("M72 72.5 Q79 68 86.5 71.5")+obocie("M113.5 69 Q121 66.5 128 71"),
            navyse:`<g fill="#fff" ${o} stroke-width="2.4"><circle cx="50" cy="46" r="3.6"/><circle cx="40" cy="34" r="5.4"/><path d="M33 26 C22 26 17 18 22 11 C24 3 37 1 42 7 C50 2 60 8 57 16 C61 23 52 29 44 26 C41 28 36 28 33 26 Z"/></g><path d="M34.6 12.4 Q35.4 8 40 8 Q44.8 8.2 44.6 12 Q44.4 14.6 40.6 16 L40.4 18" fill="none" stroke="${OB}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/><circle cx="40.4" cy="22" r="1.5" fill="${OB}"/>`},
  ukazuje: {oci:oci(-2.8,0), usta:usta_smiech, ruky:["dolu_p","ukaz_l"]},
  skus:    {oci:oci(0,1.4), usta:usta_vlnka, ruky:["spolu_l","spolu_p"],
            obocie:obocie("M72 76.5 Q79 71.6 86.4 71")+obocie("M113.6 71 Q121 71.6 128 76.5"),
            navyse:`<path d="M54 40 C58 47 60.6 50.4 60.6 54 C60.6 58 57.6 60.6 54 60.6 C50.4 60.6 47.4 58 47.4 54 C47.4 50.4 50 47 54 40 Z" fill="#9FD3F2" stroke="#3E86B5" stroke-width="2" stroke-linejoin="round"/>`},
  oriesok: {oci:oci_smiech, usta:usta_w, ruky:[], pred:oriesok, rukyPred:["drzi_l","drzi_p"], trieda:"skace",
            navyse:hviezda(38,52,10,"a")+hviezda(24,104,7,"b")}
};

function svg(poza, vol){
  vol=vol||{};
  const p=POZY[poza]||POZY.ahoj, hl=!!vol.hlava;
  const a11y=vol.popis?`role="img" aria-label="${String(vol.popis).replace(/"/g,"&quot;")}"`:`aria-hidden="true"`;
  const telo=hl?"":`
<g class="sprv-chvost"><path d="M114 199 C150 208 190 190 190 150 C190 124 172 108 174 84 C175 68 190 68 197 54 C204 36 180 10 152 22 C132 32 130 56 138 74 C144 88 150 98 148 114 C146 134 134 150 124 170 Z" fill="${F}" ${o}/>
<path d="M134 188 C160 184 177 170 177 148 C177 126 160 110 161 84 C162 62 176 52 186 46 C184 32 168 26 156 33 C144 41 144 56 150 70 C156 84 162 98 160 116 C158 140 146 162 134 188 Z" fill="${SV}"/>
<path d="M158 40 Q166 38 172 44 M165 104 Q170 98 171 90 M162 152 Q169 148 173 141" fill="none" stroke="${F}" stroke-width="2.6" stroke-linecap="round"/></g>
<g ${o}><ellipse cx="80" cy="204" rx="15" ry="8.4" fill="${FT}"/><ellipse cx="120" cy="204" rx="15" ry="8.4" fill="${FT}"/>
<path d="M100 120 C123 120 137 144 137 170 C137 192 122 205 100 205 C78 205 63 192 63 170 C63 144 77 120 100 120 Z" fill="${F}"/></g>
<path d="M100 141 C113 141 121.6 155 121.6 171 C121.6 188 112.6 199.6 100 199.6 C87.4 199.6 78.4 188 78.4 171 C78.4 155 87 141 100 141 Z" fill="${KR}"/>`;
  const hlava=`
<g ${o}><path d="M66 68 C59 55 58 44 61 34 L58 23 L66 28 L70 18 L75 30 C82 37 87 46 89 55 Z" fill="${F}"/><path d="M134 68 C141 55 142 44 139 34 L142 23 L134 28 L130 18 L125 30 C118 37 113 46 111 55 Z" fill="${F}"/></g>
<path d="M69.6 58 C66 50 66 43 68.6 37 C75 42 80 48 81.6 54 Z" fill="${RU}"/><path d="M130.4 58 C134 50 134 43 131.4 37 C125 42 120 48 118.4 54 Z" fill="${RU}"/>
<path d="M100 45 C133 45 152 66 152 91 C152 104 147.6 113 139 120.6 C129 128.6 115 131 100 131 C85 131 71 128.6 61 120.6 C52.4 113 48 104 48 91 C48 66 67 45 100 45 Z" fill="${F}" ${o}/>
<path d="M100 93 C117 93 135 99 137.6 110 C134 122 117 128 100 128 C83 128 66 122 62.4 110 C65 99 83 93 100 93 Z" fill="${KR}"/>
<path d="M92 47.6 Q96 55 100 48.6 Q104 55 108 47.6" fill="none" stroke="${FT}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
<ellipse cx="67" cy="104.6" rx="7.4" ry="5" fill="${RU}" opacity=".8"/><ellipse cx="133" cy="104.6" rx="7.4" ry="5" fill="${RU}" opacity=".8"/>
${p.obocie||""}${p.oci}${nos}${p.usta}`;
  const ruky=l=>hl?"":(l||[]).map(k=>ruka(RUKY[k])).join("");
  const vb=hl?"40 14 120 122":"0 0 210 216";
  return `<svg class="sprv sprv-${POZY[poza]?poza:"ahoj"}${p.trieda?" sprv-"+p.trieda:""}${vol.vpravo?" sprv-vpravo":""}${hl?" sprv-hlava":""}" xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" ${a11y}><g class="sprv-cela">${telo}${hlava}${hl?"":(p.pred||"")}${ruky(p.ruky)}${ruky(p.rukyPred)}${hl?"":(p.navyse||"")}</g></svg>`;
}

const CSS=`
.sprv{display:block;width:120px;height:auto;overflow:visible;flex:none}
.sprv-vpravo{transform:scaleX(-1)}
.sprv-hlava{width:44px}
@media (prefers-reduced-motion: no-preference){
  .sprv-chvost{transform-origin:122px 192px;animation:sprv-chvost 3.6s ease-in-out infinite}
  .sprv-oko{animation:sprv-zmurk 4.8s infinite}
  .sprv-skace .sprv-cela{transform-origin:100px 210px;animation:sprv-skok .9s cubic-bezier(.3,.7,.3,1) 2}
  .sprv-iskra{animation:sprv-iskra 1.5s ease-in-out infinite}
  .sprv-iskra.b{animation-delay:.35s}.sprv-iskra.c{animation-delay:.7s}
}
@keyframes sprv-chvost{0%,100%{transform:rotate(0)}50%{transform:rotate(3.5deg)}}
@keyframes sprv-zmurk{0%,94%,100%{transform:scaleY(1)}97%{transform:scaleY(.1)}}
@keyframes sprv-skok{0%,100%{transform:translateY(0) scale(1,1)}18%{transform:translateY(0) scale(1.05,.94)}50%{transform:translateY(-12px) scale(.97,1.04)}82%{transform:translateY(0) scale(1.04,.96)}}
@keyframes sprv-iskra{0%,100%{transform:scale(.6);opacity:.55}50%{transform:scale(1.1);opacity:1}}
`;
if(typeof document!=="undefined" && !document.getElementById("sprv-css")){
  const s=document.createElement("style"); s.id="sprv-css"; s.textContent=CSS; document.head.appendChild(s);
}
const API={svg, pozy:Object.keys(POZY)};
if(typeof window!=="undefined") window.SPRIEVODCA=API;
if(typeof module!=="undefined") module.exports=API;
})();
