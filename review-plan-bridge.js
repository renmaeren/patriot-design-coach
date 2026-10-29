(function(){
"use strict";
const KEY="patriot-plans-v1",select=document.getElementById("saved-plan-select"),preview=document.getElementById("saved-plan-answers"),status=document.getElementById("saved-plan-status");
if(!select)return;
let data={};try{data=JSON.parse(localStorage.getItem(KEY)||"{}")}catch{}
const entries=Object.values(data).filter(x=>x?.title&&Array.isArray(x.answers)).sort((a,b)=>String(b.updatedAt||"").localeCompare(String(a.updatedAt||"")));
function current(){return data[select.value]||null}
function asText(plan){return plan?.answers?.map((a,i)=>(i+1)+". "+a.question+"\nStudent planned: "+a.answer).join("\n\n")||""}
window.patriotPlanning={
 selected:current,
 forGemini:()=>{const p=current();return p?"ORIGINAL STUDENT PLANNING RECORD (student-entered; not a verified completion claim):\n"+asText(p)+"\n\nCross-check EACH plan item against the actual page. Flag PLANNED BUT MISSING, INCLUDED/OBSERVED, CHANGED FROM PLAN, or CANNOT VERIFY. Do not assume planned content was completed.":"No saved planning answers were supplied. Do not infer what the student planned."}
};
entries.forEach(p=>{const opt=document.createElement("option");opt.value=p.id;opt.textContent=p.title;select.appendChild(opt)});
if(!entries.length){select.disabled=true;select.title="No plan was saved on this browser. This step is optional; continue to Upload Your Spread.";}
function update(){
 const p=current();preview.textContent=p?asText(p):"No planning record selected.";
 status.textContent=p?"Saved plan loaded ("+p.answers.length+" answers). Included in Gemini PDF and report.":entries.length?"Optional: choose a saved plan above, or skip directly to Upload Your Spread.":"No plans saved on this browser. The dropdown is unavailable for that reason. This section is optional—continue directly to 2 · Upload Your Spread.";
 if(p&&document.getElementById("spread-id")&&!document.getElementById("spread-id").value)document.getElementById("spread-id").value=p.title;
 ["spread-id","topic"].forEach(id=>document.getElementById(id)?.dispatchEvent(new Event("input",{bubbles:true})));
 document.getElementById("wave-select")?.dispatchEvent(new Event("change",{bubbles:true}));
}
select.addEventListener("change",update);
const requested=new URLSearchParams(location.search).get("plan");
if(requested&&data[requested])select.value=requested;
else if(entries.length===1)select.value=entries[0].id;
update();
})();