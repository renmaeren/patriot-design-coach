(function(){
"use strict";
const image=document.getElementById("templateImage"),section=document.getElementById("section"),template=document.getElementById("template");
if(!image||!section||!template)return;
const categories={"Academics":"01","Student Life":"02","Clubs & Organizations":"03","Faculty & Staff":"04","Sports":"05","Seniors":"06","Fine Arts":"07","Fine Arts / Electives":"07","Appendices":"08","Appendices / History":"08"};
const names={
"01":["A Course Snapshot","B Learning in the Field","C Beyond the Classroom","D The Academic Experience","E Pathways & Possibilities"],
"02":["A A Day at ACSHS","B Student Perspective","C Places & Spaces","D Student Life Feature","E Many Sides of Student Life"],
"03":["A Club Profile","B In Action","C Members & Moments","D Club Spotlight","E More Than a Club"],
"04":["A Resident Expert Record","B Observed at Work","C Tools of the Trade","D Resident Expert Spotlight","E The Work Behind ACSHS"],
"05":["A Team Snapshot","B Game Day","C Behind the Jersey","D The Team Story","E More Than a Game"],
"06":["A Identification Plate","B Observed in the Field","C Field Collection","D The Senior Spotlight","E The Class Story"],
"07":["A Program Profile","B In Rehearsal / In the Studio","C Performance / Final Product","D Fine Arts Showcase","E Behind the Scenes"],
"08":["A Index / Catalog","B Glossary","C Chronology","D Patriot Collection","E Data & Records"]
};
const finished={"01":"academics_learning_in_the_field.png","02":"student_life_homecoming_week.png","03":"clubs_pep_club.png","04":"faculty_beyond_the_bell.png","05":"sports_volleyball.png"};
const div=document.createElement("section");div.id="patriot-visual-gallery";
div.innerHTML='<style>#patriot-visual-gallery{border:2px solid #c5b79d;background:#fffaf0;padding:17px;margin:17px 0;color:#172b43;font:14px/1.45 Arial,sans-serif}#patriot-visual-gallery h3{font:700 22px Georgia;margin:0 0 8px}#patriot-visual-gallery .thumbs{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:8px;margin:10px 0}#patriot-visual-gallery .thumbs button{background:white;border:2px solid #d8c9b0;padding:5px;cursor:pointer;font:12px/1.4 Arial;color:#172b43;text-align:left}#patriot-visual-gallery .thumbs button[aria-pressed=true]{border-color:#792f3b;box-shadow:0 0 0 1px #792f3b}#patriot-visual-gallery .thumbs img{width:100%;height:auto;aspect-ratio:253/115;object-fit:contain}#patriot-visual-gallery .selected img{display:block;width:100%;max-width:800px;margin:10px auto;border:1px solid #cbbda9}#patriot-visual-gallery .small{font-size:12px;color:#5b6570}#patriot-visual-gallery [hidden]{display:none!important}@media(max-width:650px){#patriot-visual-gallery .thumbs{grid-template-columns:repeat(2,minmax(0,1fr))}}</style><h3>Finished layout inspiration</h3><p class="small">Choose an example. Your approved template above remains the required page structure.</p><div class="thumbs"></div><div class="selected" aria-live="polite"></div><div class="finished"></div>';
(image.closest(".reference")||image.parentElement).insertAdjacentElement("afterend",div);
const thumbs=div.querySelector(".thumbs"),selected=div.querySelector(".selected"),finishedBox=div.querySelector(".finished");
let current=0,gen=0;
const safe=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
function img(src,alt){const el=document.createElement("img");el.src="./"+src;el.alt=alt;el.loading="lazy";el.onerror=()=>{el.hidden=true;const p=document.createElement("p");p.className="small";p.textContent="Image asset not yet published.";el.after(p)};return el}
function render(){
 const id=++gen,code=categories[section.value]||"01",labels=names[code],index=Number(template.value)||0;
 current=Math.max(0,Math.min(4,index));thumbs.replaceChildren();selected.replaceChildren();finishedBox.replaceChildren();
 labels.forEach((name,i)=>{
  const b=document.createElement("button");b.type="button";b.setAttribute("aria-pressed",i===current?"true":"false");
  b.append(img("field-guide/"+code+"-"+("abcde"[i])+".png",name+" concept thumbnail"));
  const label=document.createElement("span");label.textContent=name;b.append(label);
  b.onclick=()=>{current=i;show()};thumbs.append(b);
 });show();
 function show(){
  if(gen!==id)return;
  [...thumbs.children].forEach((b,i)=>b.setAttribute("aria-pressed",i===current?"true":"false"));
  selected.replaceChildren();
  const h=document.createElement("h4");h.textContent=labels[current]+" · "+(current<3?"Single page":"Double-page spread");selected.append(h);
  selected.append(img("field-guide/"+code+"-"+("abcde"[current])+".png",labels[current]));
  const note=document.createElement("p");note.className="small";note.textContent="Concept thumbnail (253 × 115). For general composition only; not a print-resolution or verified school-content sample.";selected.append(note);
  finishedBox.replaceChildren();
  if(finished[code]){const heading=document.createElement("h4");heading.textContent="Larger finished reference — "+section.value;finishedBox.append(heading);finishedBox.append(img("field-guide/finished/"+finished[code],"Completed visual reference for "+section.value));const p=document.createElement("p");p.className="small";p.textContent="This is a separate reference, not necessarily the currently selected A–E layout. Verify all names, quotes and figures before publication.";finishedBox.append(p)}
 }
}
section.addEventListener("change",render);template.addEventListener("change",render);render();
})();