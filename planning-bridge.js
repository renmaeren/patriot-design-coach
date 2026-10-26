(function(){
"use strict";
const KEY="patriot-plans-v1";
const clean=s=>String(s||"").replace(/\s+/g," ").trim();
const slug=s=>clean(s).toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"").slice(0,100);
function labelFor(el){
 const byId=el.id?document.querySelector('label[for="'+CSS.escape(el.id)+'"]'):null;
 const enclosing=el.closest("label");
 const item=el.closest("[class*=question],[class*=field],fieldset,.form-group,.form-field,.wizard-step,.step,.card");
 const heading=item?.querySelector("legend,h2,h3,h4,label,.question,.question-text,.field-label");
 let text=clean((byId||enclosing||heading)?.textContent||el.getAttribute("aria-label")||el.placeholder||el.name||el.id);
 if(!text){const sibling=el.previousElementSibling;text=clean(sibling?.textContent)||"Planning response"}
 return text.slice(0,180);
}
function capture(){
 const out=[],seen=new Set();
 document.querySelectorAll('input,textarea,select,[contenteditable="true"]').forEach(el=>{
  if(el.closest("#patriot-planning-dock")||el.disabled)return;
  const type=(el.type||"").toLowerCase();
  if(["password","hidden","file","submit","button","reset","image","search","color","range"].includes(type))return;
  let value="";
  if(type==="checkbox"||type==="radio"){if(!el.checked)return;value=clean(el.value==="on"?"Selected":el.value)}
  else if(el.tagName==="SELECT"){value=clean(el.options[el.selectedIndex]?.textContent)}
  else value=clean(el.isContentEditable?el.innerText:el.value);
  if(!value||value==="-- Select --"||value==="Choose one")return;
  const label=labelFor(el),signature=label+"::"+value;
  if(seen.has(signature))return;
  seen.add(signature);out.push({question:label,answer:value});
 });
 return out;
}
function read(){try{return JSON.parse(localStorage.getItem(KEY)||"{}")}catch{return {}}}
function write(o){localStorage.setItem(KEY,JSON.stringify(o))}
const DRAFT="patriot-wizard-draft-v1";
let accumulated={};try{accumulated=JSON.parse(sessionStorage.getItem(DRAFT)||"{}")}catch{}
function remember(){for(const a of capture())accumulated[a.question]=a.answer;try{sessionStorage.setItem(DRAFT,JSON.stringify(accumulated))}catch{}}
function init(){
 if(document.getElementById("patriot-planning-dock"))return;
 const root=document.createElement("aside");root.id="patriot-planning-dock";
 root.innerHTML='<style>#patriot-planning-dock{position:fixed;z-index:9998;left:12px;bottom:12px;max-width:min(450px,calc(100vw - 24px));box-sizing:border-box;background:#fffdf8;border:3px solid #792f3b;box-shadow:0 5px 28px #14273a55;padding:12px 15px;color:#172b43;font:14px/1.45 Arial,sans-serif;border-radius:5px}#patriot-planning-dock input{width:100%;margin:6px 0 8px;padding:9px;border:1px solid #a8a29b;box-sizing:border-box}#patriot-planning-dock button{background:#792f3b;color:#fff;padding:11px;border:0;cursor:pointer;font-weight:700;width:100%;border-radius:3px}#patriot-planning-dock p{font-size:12px;margin:4px 0 8px}#patriot-planning-dock .minirow{display:flex;justify-content:space-between;gap:8px}#patriot-planning-dock .minirow button{width:auto;background:#172b43;padding:4px 8px}#patriot-plan-status{font-size:12px;margin-top:5px}</style><div class="minirow"><b>SPREAD PLANNING RECORD</b><button id="patriot-plan-collapse" type="button">Hide</button></div><div id="patriot-plan-body"><p>Answers from your planning boxes will follow your spread to Gemini.</p><label for="patriot-plan-title"><b>Spread title / ID</b></label><input id="patriot-plan-title" placeholder="e.g., Volleyball pages 42–43" autocomplete="off"><button id="patriot-plan-save" type="button">Save Plan &amp; Continue to Review →</button><p id="patriot-plan-status" role="status">Saved on this device/browser only. Use the same browser for your review.</p></div>';
 document.body.appendChild(root);
 const title=root.querySelector("#patriot-plan-title"),button=root.querySelector("#patriot-plan-save"),status=root.querySelector("#patriot-plan-status"),body=root.querySelector("#patriot-plan-body"),toggle=root.querySelector("#patriot-plan-collapse");
 toggle.onclick=()=>{body.hidden=!body.hidden;toggle.textContent=body.hidden?"Show":"Hide"};
 button.onclick=()=>{
  const spread=clean(title.value);if(!spread){status.textContent="Enter a title so your plan can be matched to your spread.";title.focus();return}
  remember();const answers=Object.entries(accumulated).map(([question,answer])=>({question,answer}));if(!answers.length){status.textContent="No planning answers detected yet. Fill in the wizard first.";return}
  const id=slug(spread),plans=read(),stamp=new Date().toISOString();
  const prior=plans[id];
  plans[id]={id,title:spread,answers,createdAt:prior?.createdAt||stamp,updatedAt:stamp};
  try{write(plans)}catch(e){status.textContent="Unable to save in this browser. Storage may be blocked.";return}
  window.location.href="./?view=review&plan="+encodeURIComponent(id);
 };
 document.addEventListener("input",e=>{if(!e.target.closest("#patriot-planning-dock"))remember()},true);
 document.addEventListener("change",e=>{if(!e.target.closest("#patriot-planning-dock"))remember()},true);
 document.addEventListener("click",e=>{if(!e.target.closest("#patriot-planning-dock"))remember()},true);
 remember();
 // Preserve answers between wizard steps, even if the wizard removes a previous step from the page.
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();