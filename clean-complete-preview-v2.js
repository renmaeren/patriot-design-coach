(function(){
"use strict";
const by=id=>document.getElementById(id);
const image=by("templateImage"),a=by("before"),b=by("after"),section=by("section"),choice=by("template");
if(!image||!a||!b||!section||!choice)return;
const sections={"Academics":"01","Student Life":"02","Clubs & Organizations":"03","Faculty & Staff":"04","Sports":"05","Seniors":"06","Fine Arts":"07","Appendices":"08"};
const completed={"01-a":"01-a.png","01-b":"01-b.png","01-c":"01-c.png","01-d":"01-d.png","01-e":"01-e.png","02-a":"02-a.png","02-b":"02-b.png","02-c":"02-c.png","02-d":"02-d.png","02-e":"02-e.png","03-a":"clubs_pep_club.png","04-a":"faculty_beyond_the_bell.png","05-a":"sports_volleyball.png"};
const title=by("exampleTitle"),intro=by("exampleIntro"),details=by("exampleDetails"),caption=by("templateImageCaption");
const frame=document.createElement("figure");frame.id="patriot-finished-viewer";frame.hidden=true;frame.style.cssText="margin:0;padding:12px;text-align:center;background:#fffaf0";
const picture=document.createElement("img");picture.style.cssText="display:block;max-width:100%;width:auto;height:auto;margin:auto";picture.alt="Complete example";
const note=document.createElement("figcaption");note.style.cssText="font:13px/1.45 Arial;color:#334155;margin-top:8px";
frame.append(picture,note);image.after(frame);
let ticket=0;
function selected(){return (sections[section.value]||"01")+"-"+("abcde"[Number(choice.value)||0]||"a")}
function view(kind){
 const n=++ticket,key=selected(),file=completed[key],isAfter=kind==="after",hasImage=isAfter&&!!file;
 a.classList.toggle("navy",!isAfter);b.classList.toggle("navy",isAfter);
 image.hidden=hasImage;image.style.display=hasImage?"none":"";
 frame.hidden=!hasImage;
 if(title)title.textContent=!isAfter?"BEFORE · APPROVED TEMPLATE":hasImage?"AFTER · FINISHED EXAMPLE":"AFTER · FINISHED EXAMPLE NOT YET AVAILABLE";
 if(intro)intro.textContent=!isAfter?"Follow this official layout in Memento.":hasImage?"A complete finished design example for inspiration.":"This option does not have a complete finished example yet. The official layout remains visible.";
 if(details)details.textContent=isAfter?"Use verified names, captions, quotations and real photographs in your own spread.":"";
 if(caption)caption.textContent=hasImage?"Finished example · illustrative content, not verified reporting.":isAfter?"Official template · complete finished example pending.":"Official approved template.";
 if(!hasImage)return;
 picture.hidden=true;note.textContent="Loading finished example…";
 const url=file.match(/^0[12]-/)? "./field-guide/complete/"+file : "./field-guide/finished/"+file;
 const probe=new Image();probe.onload=()=>{if(ticket!==n)return;picture.src=url;picture.hidden=false;note.textContent="Finished reference; keep all required content in the approved structure."};
 probe.onerror=()=>{if(ticket!==n)return;image.hidden=false;image.style.display="";frame.hidden=true;if(intro)intro.textContent="The finished example is unavailable; the approved layout is shown."};
 probe.src=url;
}
a.addEventListener("click",e=>{e.stopImmediatePropagation();view("before")},true);
b.addEventListener("click",e=>{e.stopImmediatePropagation();view("after")},true);
[section,choice].forEach(el=>el.addEventListener("change",()=>view("before"),true));
const css=document.createElement("style");css.textContent="#patriot-finished-viewer[hidden],#templateImage[hidden]{display:none!important}#templateImage{object-fit:contain!important;height:auto!important}";document.head.append(css);
view("before");
})();