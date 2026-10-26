(function(){
"use strict";
const $=id=>document.getElementById(id);
const image=$("templateImage"),before=$("before"),after=$("after");
if(!image||!before||!after)return;
const sections={
"Academics":["Classroom action photographs","Reported class story and student quote","Captions identifying people and learning","Work sample or accurate process graphic"],
"Student Life":["Event and candid photographs","Reported event story and student quote","Who / what / when / where captions","Relevant schedule, poll or event facts"],
"Clubs & Organizations":["Member group photograph and action photographs","Club purpose, activities and member quote","Sponsor identification and member roster","Documented service or accomplishment"],
"Faculty & Staff":["Staff or department group photograph","Staff names and positions","Reported behind-the-scenes story or quote","Informational workflow or department detail"],
"Sports":["Team group photograph and action photographs","Coach identification and complete roster","Season story with athlete or coach quotes","Verified scores, standings or season statistics"],
"Seniors":["Approved senior photographs","Verified senior names and student voices","Reported class story or relevant senior memories","Accurate class-year details and captions"],
"Fine Arts":["Performance, rehearsal or studio photographs","Director / sponsor and participant identifications","Reported creative-process story and student quote","Verified show, program or exhibition details"],
"Appendices":["Relevant archival visuals and source labels","Accurate dates, names and historical context","Edited explanatory copy","Verified records and source credits"]
};
let original="",active=false,ticket=0,rendered="";
const sec=()=> $("section")?.value||"Academics";
const template=()=> Number($("template")?.value||0);
const caption=$("templateImageCaption");
const detail=$("exampleDetails"),intro=$("exampleIntro"),title=$("exampleTitle");
const anchor=image.closest(".reference")||image.parentElement;
const panel=document.createElement("section");
panel.id="patriot-after-checklist";panel.hidden=true;panel.setAttribute("aria-live","polite");
panel.style.cssText="background:#fffaf0;border:2px solid #8d343e;padding:13px 17px;margin:14px 0;font:14px/1.6 Arial,sans-serif;color:#182c43";
anchor.insertAdjacentElement("afterend",panel);
function currentSource(){return original||image.getAttribute("src")||""}
function reset(){
 active=false;ticket++;
 if(original)image.src=original;
 before.classList.add("navy");after.classList.remove("navy");
 panel.hidden=true;
 if(title)title.textContent="BEFORE · OFFICIAL TEMPLATE";
 if(caption)caption.textContent="BEFORE — the approved template exactly as provided.";
 if(intro)intro.textContent="Compare the official template with a suggested filled-in preview.";
}
function paint(src){
 const id=++ticket,im=new Image();
 im.onload=()=>{
  if(id!==ticket||!active)return;
  const w=im.naturalWidth,h=im.naturalHeight;
  const canvas=document.createElement("canvas");canvas.width=w;canvas.height=h;
  const ctx=canvas.getContext("2d");ctx.drawImage(im,0,0);
  // Replace ONLY neutral-gray image placeholders with a visibly filled photographic
  // simulation. Template geometry, gutters, editorial furniture and headings remain.
  const bitmap=ctx.getImageData(0,0,w,h),d=bitmap.data;
  for(let y=0;y<h;y++)for(let x=0;x<w;x++){
   const p=(y*w+x)*4,r=d[p],g=d[p+1],b=d[p+2];
   if(Math.max(r,g,b)-Math.min(r,g,b)<13&&r>155&&r<212){
    const u=x/w,v=y/h;
    const glow=15*Math.sin(u*18+v*13)+11*Math.cos(u*32-v*16);
    const shade=(r-180)*.27+glow;
    d[p]=Math.max(0,Math.min(255,119+shade));
    d[p+1]=Math.max(0,Math.min(255,145+shade));
    d[p+2]=Math.max(0,Math.min(255,139+shade));
   }
  }
  ctx.putImageData(bitmap,0,0);
  // An unobtrusive status ribbon stays within the page preview and clarifies
  // that this is illustrative, not a finished student spread.
  const ribbon=Math.max(19,Math.round(h*.05));
  ctx.fillStyle="rgba(23,43,67,.9)";ctx.fillRect(0,h-ribbon,w,ribbon);
  ctx.fillStyle="#ffffff";ctx.font="bold "+Math.max(11,Math.round(ribbon*.42))+"px Arial";
  ctx.fillText("AFTER · ILLUSTRATIVE CONTENT PLACEMENT",Math.max(10,w*.025),h-ribbon*.31);
  rendered=canvas.toDataURL("image/png");
  if(active&&id===ticket)image.src=rendered;
 };
 im.onerror=()=>{if(id===ticket){panel.hidden=false;panel.insertAdjacentText("beforeend"," Preview image could not load; use the checklist below.")}};
 im.src=src;
}
function showAfter(){
 if(!active)original=image.getAttribute("src")||original;
 if(!original)return;
 active=true;before.classList.remove("navy");after.classList.add("navy");
 const s=sec(),requirements=sections[s]||sections.Academics;
 const letter="ABCDE"[template()]||"A";
 panel.innerHTML='<strong style="font:700 17px Georgia,serif">AFTER — '+s+' / Template '+letter+'</strong>'+
 '<p style="margin:7px 0">The tinted areas on the <b>same official layout</b> represent photographs added without moving the prescribed boxes. A finished spread must also include:</p>'+
 '<ol style="margin:5px 0 8px;padding-left:23px">'+requirements.map(x=>'<li>'+x+'</li>').join("")+'</ol>'+
 '<p style="margin:6px 0 0;font-size:12px">Teaching simulation only: it does not invent ACSHS photographs, interviews, names or statistics. The actual finished design must use students’ own verified reporting.</p>';
 panel.hidden=false;
 if(title)title.textContent="AFTER · SAME TEMPLATE WITH CONTENT AREAS FILLED";
 if(intro)intro.textContent="See the approved photo boxes filled in place, then check all required content below.";
 if(detail)detail.textContent="This illustrative preview preserves the official layout; it is not an actual completed spread.";
 if(caption)caption.textContent="AFTER — visual placement guide for "+s+" Template "+letter+". Photos are simulated; story, quotes, captions and facts must be added in Memento.";
 paint(original);
}
before.addEventListener("click",reset);
after.addEventListener("click",showAfter);
for(const id of ["section","template"])$(id)?.addEventListener("change",()=>{
 ticket++;active=false;panel.hidden=true;rendered="";
 requestAnimationFrame(()=>{original=image.getAttribute("src")||"";reset()});
});
const observer=new MutationObserver(()=>{
 const src=image.getAttribute("src")||"";
 if(!active&&src&&src!==rendered)original=src;
});
observer.observe(image,{attributes:true,attributeFilter:["src"]});
original=image.getAttribute("src")||"";
const hint=document.createElement("p");hint.className="muted";hint.style.fontSize="13px";
hint.textContent="Before = unaltered approved template. After = the same template with content areas illustrated, plus a required-content checklist.";
after.closest(".example-panel")?.appendChild(hint);
})();