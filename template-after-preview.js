(function(){
"use strict";
const $=id=>document.getElementById(id);
const image=$("templateImage"),before=$("before"),after=$("after");
if(!image||!before||!after)return;
const exampleBySection={
"Academics":{headline:"LEARNING IN ACTION",quote:"A student voice",facts:["What we learned","Real-world connection","Verified class detail"],graphic:"Process / work sample"},
"Student Life":{headline:"A DAY IN THE LIFE",quote:"A student voice",facts:["Event / location","Student perspective","Reported detail"],graphic:"Timeline / map / poll"},
"Clubs & Organizations":{headline:"BEYOND THE MEETING",quote:"A member voice",facts:["Purpose & impact","Member activities","Verified accomplishment"],graphic:"Impact / service data"},
"Faculty & Staff":{headline:"BEHIND THE SCENES",quote:"A staff voice",facts:["Role / responsibility","Daily contribution","Verified detail"],graphic:"Tools / workflow"},
"Sports":{headline:"THE TEAM STORY",quote:"An athlete voice",facts:["Season / sport","Team highlights","Verified statistic"],graphic:"Season / game data"},
"Seniors":{headline:"CLASS OF 2027",quote:"A senior voice",facts:["Senior memory","Future plans","Verified tradition"],graphic:"Class survey / timeline"},
"Fine Arts":{headline:"THE CREATIVE PROCESS",quote:"An artist voice",facts:["Project / show","Student contribution","Verified performance"],graphic:"Production timeline"},
"Appendices":{headline:"PATRIOT FIELD ARCHIVE",quote:"Historical source",facts:["Verified record","Name / date","Source citation"],graphic:"Index / chronology"}
};
let original="",showing=false,pending=0;
function section(){return $("section")?.value||"Academics"}
function template(){const n=Number($("template")?.value||0);return Number.isFinite(n)?n:0}
function makePreview(src){
const token=++pending;
const img=new Image();
img.onload=()=>{
 if(token!==pending||!showing)return;
 const w=img.naturalWidth,h=img.naturalHeight,canvas=document.createElement("canvas");canvas.width=w;canvas.height=h;
 const ctx=canvas.getContext("2d",{willReadFrequently:true});ctx.drawImage(img,0,0);
 // The gray crossed rectangles in the real templates mark photo placements.
 // Recolor only neutral-gray placeholder pixels; leave all printed rules, titles,
 // editorial blocks and the center gutter anchored in their original places.
 const data=ctx.getImageData(0,0,w,h),pix=data.data;
 for(let y=0;y<h;y++)for(let x=0;x<w;x++){
   const i=(y*w+x)*4,r=pix[i],g=pix[i+1],b=pix[i+2],max=Math.max(r,g,b),min=Math.min(r,g,b);
   if(max-min<13&&r>155&&r<212){
     const wave=Math.sin(x*.031+y*.018)*8+Math.cos(y*.046-x*.014)*7;
     const light=(r-175)*.23+wave;
     pix[i]=Math.max(0,Math.min(255,146+light));
     pix[i+1]=Math.max(0,Math.min(255,155+light));
     pix[i+2]=Math.max(0,Math.min(255,135+light));
   }
 }
 ctx.putImageData(data,0,0);
 // Finished content strip is outside the official page composition; it shows
 // real reporting categories, not fabricated school facts or photographs.
 const d=exampleBySection[section()]||exampleBySection.Academics;
 const strip=canvas.height*.18,extended=document.createElement("canvas");extended.width=w;extended.height=h+Math.round(strip);
 const c=extended.getContext("2d");c.fillStyle="#f7f0e2";c.fillRect(0,0,w,extended.height);c.drawImage(canvas,0,0);
 c.fillStyle="#182c43";c.fillRect(0,h,w,Math.max(8,strip*.21));
 c.fillStyle="#fffdf8";c.font="bold "+Math.max(10,Math.round(w*.035))+"px Georgia";c.fillText("COMPLETED EXAMPLE · CONTENT TO ADD",Math.round(w*.035),h+Math.max(10,strip*.15));
 const font=Math.max(9,Math.round(w*.027)),row=Math.max(13,font*1.5);c.font=font+"px Arial";c.fillStyle="#243648";
 const lines=[d.headline,"Photo spaces: real event / action / detail photos","Story + captions: reported facts and attributed quotes","Informational graphic: "+d.graphic];
 for(let j=0;j<lines.length;j++)c.fillText(lines[j],Math.round(w*.035),h+Math.round(strip*.32)+j*row);
 image.src=extended.toDataURL("image/png");
 const cap=$("templateImageCaption");if(cap)cap.textContent="AFTER — teaching mock-up based on the approved "+section()+" Template "+("ABCDE"[template()])+". Tinted photo areas and example content guide are illustrative only. Use real reporting and photos in Memento.";
 };
 img.onerror=()=>{if(token===pending)showOriginal()};
 img.src=src;
}
function showOriginal(){
 showing=false;pending++;
 if(original)image.src=original;
 before.classList.add("navy");after.classList.remove("navy");
 const cap=$("templateImageCaption");if(cap)cap.textContent="BEFORE — exact approved layout. Follow this structure in Memento.";
 const label=$("exampleTitle");if(label)label.textContent="BEFORE · OFFICIAL TEMPLATE";
}
function showAfter(){
 const src=showing?original:image.src;
 if(!src)return;
 original=src;showing=true;
 before.classList.remove("navy");after.classList.add("navy");
 const label=$("exampleTitle");if(label)label.textContent="AFTER · FILLED-IN TEACHING EXAMPLE";
 const intro=$("exampleIntro");if(intro)intro.textContent="A visual model of adding photos and reported content without moving the approved boxes.";
 const details=$("exampleDetails");if(details)details.textContent="Tinted photo placeholders show where real images belong. The content guide names what students must add. All example text is illustrative, not actual ACSHS reporting.";
 makePreview(original);
}
// Replace old note-only toggle with a visual toggle.
before.onclick=showOriginal;after.onclick=showAfter;
for(const id of ["section","template"])$(id)?.addEventListener("change",()=>{showing=false;pending++;requestAnimationFrame(()=>{original=image.src;before.classList.add("navy");after.classList.remove("navy")})});
const referenceObserver=new MutationObserver(()=>{if(!showing)original=image.src});
referenceObserver.observe(image,{attributes:true,attributeFilter:["src"]});
original=image.src;
const hint=document.createElement("p");hint.className="muted";hint.style.fontSize="13px";hint.textContent="Before shows the original guide. After adds a visual mock-up and sample content guide for this exact template. It does not change your Memento file.";
after.closest(".example-panel")?.appendChild(hint);
})();
