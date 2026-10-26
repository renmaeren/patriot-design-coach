(function(){
"use strict";
const $=id=>document.getElementById(id);
const image=$("templateImage"),before=$("before"),after=$("after"),section=$("section"),template=$("template");
if(!image||!before||!after||!section||!template)return;
const sections={"Academics":"01","Student Life":"02","Clubs & Organizations":"03","Faculty & Staff":"04","Sports":"05","Seniors":"06","Fine Arts":"07","Appendices":"08"};
const full={"01-a":null,"01-b":"academics_learning_in_the_field.png","02-a":"student_life_homecoming_week.png","03-a":"clubs_pep_club.png","04-a":"faculty_beyond_the_bell.png","05-a":"sports_volleyball.png"};
let original=image.getAttribute("src")||"",active=false,lock=false,seq=0;
const caption=$("templateImageCaption"),label=$("exampleTitle"),intro=$("exampleIntro"),detail=$("exampleDetails");
function identity(){return (sections[section.value]||"01")+"-"+("abcde"[Number(template.value)||0]||"a")}
function refreshOriginal(){if(!active)original=image.getAttribute("src")||original}
function setSrc(src){lock=true;image.src=src;lock=false}
function showBefore(){
 active=false;seq++;setSrc(original);
 before.classList.add("navy");after.classList.remove("navy");
 if(label)label.textContent="BEFORE · APPROVED TEMPLATE";
 if(intro)intro.textContent="Use this approved structure when building your spread in Memento.";
 if(detail)detail.textContent="Keep the required photograph, story, quote, caption and informational graphic positions.";
 if(caption)caption.textContent="BEFORE — official approved template, unchanged.";
}
function showAfter(){
 if(!active)original=image.getAttribute("src")||original;
 active=true;seq++;const id=seq,code=identity(),filename=full[code];
 const url=filename?"./field-guide/finished/"+filename:"./field-guide/"+code+".png";
 before.classList.remove("navy");after.classList.add("navy");
 if(label)label.textContent="AFTER · FIELD GUIDE EXAMPLE";
 if(intro)intro.textContent="This is the corresponding visual example for the selected template option.";
 if(detail)detail.textContent=filename?"Larger finished model. Names, quotes and numbers in AI illustrations are not verified school reporting.":"Concept thumbnail only; this option does not yet have a full-resolution finished model.";
 if(caption)caption.textContent="AFTER — "+section.value+" Template "+code.slice(-1).toUpperCase()+(filename?" · finished visual example":" · layout concept thumbnail")+". Model only; retain the official template requirements.";
 const test=new Image();
 test.onload=()=>{if(active&&id===seq)setSrc(url)};
 test.onerror=()=>{if(active&&id===seq){setSrc(original);if(caption)caption.textContent="The example image is missing from GitHub; showing the approved template instead."}};
 test.src=url;
}
before.addEventListener("click",e=>{e.stopImmediatePropagation();showBefore()},true);
after.addEventListener("click",e=>{e.stopImmediatePropagation();showAfter()},true);
const observer=new MutationObserver(()=>{if(!active&&!lock)original=image.getAttribute("src")||original});
observer.observe(image,{attributes:true,attributeFilter:["src"]});
for(const el of [section,template])el.addEventListener("change",()=>{
 active=false;seq++;
 // The original page's change listener replaces the official image.
 setTimeout(()=>{refreshOriginal();showBefore()},0);
});
const style=document.createElement("style");
style.textContent="#templateImage{object-fit:contain;height:auto!important;max-height:none!important}";
document.head.appendChild(style);
})();
