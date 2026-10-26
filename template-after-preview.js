(function(){
"use strict";
const $=id=>document.getElementById(id);
const originalImage=$("templateImage"),before=$("before"),after=$("after"),section=$("section"),template=$("template");
if(!originalImage||!before||!after||!section||!template)return;
const codes={"Academics":"01","Student Life":"02","Clubs & Organizations":"03","Faculty & Staff":"04","Sports":"05","Seniors":"06","Fine Arts":"07","Appendices":"08"};
const finished={"01-b":"academics_learning_in_the_field.png","02-a":"student_life_homecoming_week.png","03-a":"clubs_pep_club.png","04-a":"faculty_beyond_the_bell.png","05-a":"sports_volleyball.png"};
const region=originalImage.parentElement;
const preview=document.createElement("div");preview.id="field-guide-after-image";preview.hidden=true;
preview.style.cssText="width:100%;padding:12px;background:#fffaf0;text-align:center;border:1px solid #d7c7ad;box-sizing:border-box";
const rendered=document.createElement("img");rendered.alt="Selected Field Guide example";rendered.style.cssText="display:block;max-width:100%;height:auto;object-fit:contain;margin:12px auto";
const message=document.createElement("p");message.style.cssText="font:13px/1.5 Arial,sans-serif;color:#374658";
preview.append(rendered,message);
originalImage.insertAdjacentElement("afterend",preview);
const cap=$("templateImageCaption"),title=$("exampleTitle"),intro=$("exampleIntro"),details=$("exampleDetails");
let count=0,showing=false;
const selected=()=> (codes[section.value]||"01")+"-"+("abcde"[Number(template.value)||0]||"a");
function reset(){
 ++count;showing=false;preview.hidden=true;originalImage.style.display="";
 before.classList.add("navy");after.classList.remove("navy");
 if(title)title.textContent="BEFORE · APPROVED TEMPLATE";
 if(intro)intro.textContent="Study the required placements in this original approved template.";
 if(cap)cap.textContent="BEFORE — original approved template.";
}
function afterView(){
 const id=++count,key=selected(),file=finished[key];
 showing=true;
 const path=file?"./field-guide/finished/"+file:"./field-guide/"+key+".png";
 before.classList.remove("navy");after.classList.add("navy");
 originalImage.style.display="";preview.hidden=false;
 rendered.hidden=true;message.textContent="Loading the example…";
 if(title)title.textContent=file?"AFTER · FINISHED FIELD GUIDE REFERENCE":"AFTER · APPROVED TEMPLATE + SMALL CONCEPT";
 if(intro)intro.textContent=file?"Full-size design example below; preserve the approved template above.":"The original complete template stays visible. The small crop below is only an inspiration thumbnail.";
 if(details)details.textContent=file?"Full-size finished sample; sample names, quotes and data must be verified.":"Small concept image; its source resolution may limit enlargement.";
 if(cap)cap.textContent="AFTER — original approved template plus "+(file?"finished reference":"small concept thumbnail")+" below.";
 const test=new Image();
 test.onload=()=>{
  if(id!==count||!showing)return;
  rendered.src=path;rendered.hidden=false;rendered.style.width=file?"min(100%,800px)":"253px";
  message.textContent=file?"Larger finished reference below the original approved template.":"The supplied thumbnail is already cropped. It is shown only at its native size; use the full approved template above for page structure. A complete finished reference is not available for this option yet.";
 };
 test.onerror=()=>{
  if(id!==count||!showing)return;
  message.textContent="That example image could not load. The approved template remains available under Before.";
 };
 test.src=path;
}
before.addEventListener("click",e=>{e.stopImmediatePropagation();reset()},true);
after.addEventListener("click",e=>{e.stopImmediatePropagation();afterView()},true);
[section,template].forEach(el=>el.addEventListener("change",()=>{reset()},true));
const style=document.createElement("style");style.textContent="#field-guide-after-image[hidden]{display:none!important}#templateImage{height:auto!important;object-fit:contain!important}";document.head.appendChild(style);
reset();
})();