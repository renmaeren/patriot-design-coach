/* Completed examples overlay for template stage */
(function(){const st=document.createElement("style");st.textContent="#patriot-finished-model[hidden]{display:none!important}\n#patriot-finished-model{background:#fffaf0;border:3px solid #8d343e;padding:14px;margin:12px 0 18px;box-shadow:0 3px 14px #182c4320}\n#patriot-finished-model .model-kicker{font:700 12px Arial,sans-serif;color:#8d343e;letter-spacing:.12em}\n#patriot-finished-model .model-sub{font:12px/1.4 Arial,sans-serif;color:#5b6570;margin:8px 0}\n#patriot-finished-model .model-pages{display:grid;gap:7px;max-width:740px;margin:0 auto}\n#patriot-finished-model .model-pages.double{grid-template-columns:1fr 1fr;gap:10px;background:linear-gradient(90deg,transparent calc(50% - 2px),#b5a68f calc(50% - 2px),#b5a68f calc(50% + 2px),transparent calc(50% + 2px))}\n#patriot-finished-model .model-page{background:#f7efe2;border:1px solid #c7b9a3;padding:11px;min-height:350px;display:grid;grid-template-columns:1fr 1fr;grid-template-rows:auto 1.1fr auto auto;gap:9px;align-content:start}\n#patriot-finished-model .model-head{grid-column:1/-1;border-bottom:2px solid #8d343e;padding-bottom:7px}\n#patriot-finished-model .model-head small{font:700 9px Arial,sans-serif;color:#8d343e;letter-spacing:.12em}\n#patriot-finished-model .model-head strong{display:block;font:700 clamp(15px,2.2vw,24px) Georgia,serif;color:#182c43}\n#patriot-finished-model .model-photo{position:relative;min-height:100px;background:linear-gradient(135deg,#9a7d65,#dac29a 48%,#657d77);border:4px solid #fffdf8;box-shadow:0 2px 5px #0002;display:flex;align-items:end}\n#patriot-finished-model .model-photo span{display:block;background:#182c43cf;color:#fff;font:700 10px Arial,sans-serif;padding:5px;width:100%}\n#patriot-finished-model .model-story{background:#fffbf4;padding:5px;font:10px/1.4 Georgia,serif;color:#182c43}\n#patriot-finished-model .model-story b{display:block;font:700 12px Georgia;margin-bottom:5px}\n#patriot-finished-model .model-photo.caption{grid-column:1/-1;min-height:45px;background:linear-gradient(95deg,#bcb4a5,#ddd3bc)}\n#patriot-finished-model .model-data{grid-column:1/-1;background:#e7dcc7;border-left:4px solid #8d343e;padding:8px 9px;color:#182c43;font:11px/1.4 Arial,sans-serif}\n#patriot-finished-model .model-data b{font:700 12px Georgia,serif;display:block}\n#patriot-finished-model .model-page.layout-1 .model-photo:first-of-type{grid-column:1/-1}\n#patriot-finished-model .model-page.layout-2 .model-story{grid-column:1/-1}\n#patriot-finished-model .model-page.layout-3 .model-photo{grid-row:2/span 2}\n#patriot-finished-model .model-page.layout-4 .model-story{grid-column:1/-1}\n#patriot-finished-model .model-page.layout-4 .model-photo{min-height:80px}\n#patriot-finished-model .model-foot{font:11px/1.5 Arial,sans-serif;color:#5b6570;border-top:1px solid #c7b9a3;padding-top:9px;margin-top:11px}\n@media(max-width:610px){#patriot-finished-model .model-pages.double{grid-template-columns:1fr}#patriot-finished-model .model-page{min-height:270px}}\n";document.head.appendChild(st)})();
(function(){
"use strict";
const image=document.getElementById("templateImage"),before=document.getElementById("before"),after=document.getElementById("after"),section=document.getElementById("section"),template=document.getElementById("template");
if(!image||!before||!after)return;
const captions={
"Academics":["Learning in Action","Student work sample","A classroom process","Verified course information"],
"Student Life":["Life at ACSHS","A student moment","The event story","Reported event details"],
"Clubs & Organizations":["Beyond the Meetings","Members in action","Why the club matters","Verified member activities"],
"Faculty & Staff":["Behind the Work","Staff member at work","The people behind ACSHS","Reported role and responsibilities"],
"Sports":["Beyond the Scoreboard","Game-day action","The team story","Verified season details"],
"Seniors":["Class of 2027","Senior portrait","A student perspective","Verified senior memories"],
"Fine Arts":["In the Spotlight","Performance / studio","The creative process","Reported production details"],
"Appendices":["From the Archives","Archival photograph","Historical context","Verified source records"]
};
const model=document.createElement("div");model.id="patriot-finished-model";model.hidden=true;model.setAttribute("aria-live","polite");
const reference=image.closest(".reference");if(reference)reference.insertAdjacentElement("afterend",model);else image.insertAdjacentElement("afterend",model);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
let chosen=false;
function pageMarkup(sec,variant,page){
const c=captions[sec]||captions["Student Life"];
const title=page===0?c[0]:["More from the Story","Observed in the Field","The Bigger Picture"][variant%3];
const visual=page===0?c[1]:"Supporting photo";
const text=page===0?c[2]:"Interviews, quotes and reporting";
const data=page===0?c[3]:"Documented facts and sources";
const layout=(variant+page)%5;
return '<div class="model-page layout-'+layout+'"><div class="model-head"><small>THE PATRIOT • FIELD OBSERVATION</small><strong>'+esc(title)+'</strong></div><div class="model-photo"><span>'+esc(visual)+' · photo goes here</span></div><div class="model-story"><b>'+esc(text)+'</b>Place the edited, reported story here. Include authentic student voices and verified details; this is a content example, not invented reporting.</div><div class="model-photo caption"><span>Supporting image + who / what / where caption</span></div><div class="model-data"><b>INFORMATIONAL CUTAWAY</b>'+esc(data)+' — add only researched numbers, sources or interview evidence, not decorative clip art.</div></div>';
}
function update(){
const sec=section?.value||"Academics",n=Number(template?.value||0),double=n>=3;
model.innerHTML='<div class="model-kicker">AFTER • COMPLETED CONTENT MODEL</div><p class="model-sub">A visual example of how required content could fill a '+(double?"double-page spread":"single page")+'. The original approved template above remains the placement guide.</p><div class="model-pages '+(double?"double":"")+'">'+pageMarkup(sec,n,0)+(double?pageMarkup(sec,n,1):"")+'</div><div class="model-foot"><b>Use your exact assigned template in Memento.</b> All example photos/text are placeholders. Keep your required story, quotes, captions, group photo/roster or staff/team information where applicable. No sample figures are presented as facts.</div>';
model.hidden=!chosen;
const intro=document.getElementById("exampleIntro");
if(intro&&chosen)intro.textContent="Here is a visible content-filled example. Compare it with the original official diagram; it demonstrates content, not a replacement layout.";
}
after.addEventListener("click",()=>{chosen=true;update();model.scrollIntoView({behavior:"smooth",block:"nearest"})});
before.addEventListener("click",()=>{chosen=false;update()});
section?.addEventListener("change",()=>requestAnimationFrame(update));
template?.addEventListener("change",()=>requestAnimationFrame(update));
update();
})();
