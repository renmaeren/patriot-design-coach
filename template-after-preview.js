(function(){
"use strict";
const $=id=>document.getElementById(id),photo=$("templateImage"),before=$("before"),after=$("after"),section=$("section"),template=$("template");
if(!photo||!before||!after||!section||!template)return;
const codes={"Academics":"01","Student Life":"02","Clubs & Organizations":"03","Faculty & Staff":"04","Sports":"05","Seniors":"06","Fine Arts":"07","Appendices":"08"};
const finished={"01-b":"academics_learning_in_the_field.png","02-a":"student_life_homecoming_week.png","03-a":"clubs_pep_club.png","04-a":"faculty_beyond_the_bell.png","05-a":"sports_volleyball.png"};
const preview=document.createElement("figure");preview.id="patriot-after";preview.hidden=true;preview.style.cssText="margin:0;text-align:center;max-width:100%";
const example=document.createElement("img");example.alt="Field Guide visual example";example.style.cssText="display:block;width:100%;height:auto;max-width:100%;object-fit:contain;margin:0 auto";
const small=document.createElement("figcaption");small.style.cssText="font:13px/1.5 Arial,sans-serif;color:#4f5560;padding:8px";
preview.append(example,small);photo.insertAdjacentElement("afterend",preview);
const title=$("exampleTitle"),intro=$("exampleIntro"),details=$("exampleDetails"),caption=$("templateImageCaption");
let ticket=0;
function key(){return (codes[section.value]||"01")+"-"+("abcde"[Number(template.value)||0]||"a")}
function base(){before.classList.add("navy");after.classList.remove("navy")}
function switchView(which){
 const id=++ticket,afterMode=which==="after";
 before.classList.toggle("navy",!afterMode);after.classList.toggle("navy",afterMode);
 photo.style.display=afterMode?"none":"";preview.hidden=!afterMode;
 if(title)title.textContent=afterMode?"AFTER · FIELD GUIDE EXAMPLE":"BEFORE · APPROVED TEMPLATE";
 if(intro)intro.textContent=afterMode?"See how a finished design can look. Keep the approved structure.":"This is the layout you must follow in Memento.";
 if(details)details.textContent=afterMode?"Use your own photographs, verified facts, captions and quotes.":"";
 if(caption)caption.textContent=afterMode?"Illustrative example (not verified ACSHS content).":"Official template";
 if(!afterMode)return;
 const choice=key(),file=finished[choice],path=file?"./field-guide/finished/"+file:"./field-guide/"+choice+".png";
 example.hidden=true;small.textContent="Loading example…";
 const loader=new Image();
 loader.onload=()=>{if(id!==ticket)return;example.src=path;example.hidden=false;small.textContent=file?"Full-size model · Keep the approved template structure.":"Small concept preview · This source image is cropped and not a complete page."};
 loader.onerror=()=>{if(id!==ticket)return;small.textContent="Example unavailable. Select Before to view the required template."};
 loader.src=path;
}
before.addEventListener("click",e=>{e.stopImmediatePropagation();switchView("before")},true);
after.addEventListener("click",e=>{e.stopImmediatePropagation();switchView("after")},true);
[section,template].forEach(el=>el.addEventListener("change",()=>switchView("before"),true));
const css=document.createElement("style");
css.textContent="#patriot-after[hidden]{display:none!important}#templateImage{width:100%;height:auto!important;object-fit:contain!important}";
document.head.append(css);
switchView("before");
})();