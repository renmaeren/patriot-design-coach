(function(){
"use strict";
if(document.getElementById("patriot-guide"))return;
const stages=[
{title:"Reporting Check",purpose:"Gather the facts and photographs your page needs.",tasks:[["Choose your assignment","Identify the page topic and who or what you are covering.","select,input"],["Record your reporting","Enter real names, quotes, dates, and accurate details.","textarea"],["Check what's missing","Use the prompts to decide what you still need before designing.","input,textarea"]]},
{title:"Template Check",purpose:"Choose an approved layout and understand where each required element belongs.",tasks:[["Select a section and option","Choose the section and template assigned to your page.","#section,#template"],["Study Before","Before is the official layout you must follow in Canva or Memento.","#before"],["Inspect After","After is visual inspiration, not permission to move required content.","#after"],["Make your plan","Answer the page-planning questions; they will carry into review.","textarea,input"]]},
{title:"Design Lab",purpose:"Plan your page's visual hierarchy while keeping its official template.",tasks:[["Find the main focal point","Decide which photograph or headline readers should notice first.","textarea,input"],["Choose supporting content","Balance photographs, story, quotes, captions, and graphic.","textarea,input"],["Record design decisions","Write what you will do in Canva or Memento.","textarea,input"]]},
{title:"Quality Check",purpose:"Catch missing information and design problems before review.",tasks:[["Check required content","Confirm photos, captions, story, quotes, identifications, and any required roster.","input[type=checkbox],textarea"],["Check accuracy","Verify every name, fact, quote, and statistic.","input,textarea"],["Check readability","Review margins, gutter, contrast, and text size.","textarea,input"]]},
{title:"Export & Next Steps",purpose:"Save your plan and prepare the files for Gemini.",tasks:[["Review the plan","Make sure your decisions and reporting are complete.","textarea,input"],["Save your planning record","Enter the spread title and use Save Plan & Continue to Review.","#patriot-plan-save"],["Continue to review","Move to the review workflow with your saved responses.","a[href*=review],#patriot-plan-save"]]},
{title:"Spread Review Lab",purpose:"Complete FOUR waves for EACH assigned page. Save feedback after every wave so Gemini can review your corrections later.",tasks:[
["Choose your page and template","Select the assigned section/template and enter your page details. A–C are single pages; D–E are double-page spreads.","#section,#template"],
["Upload current page","Export the latest version from Canva or Memento, then upload it here. The official template appears beside it.","#upload"],
["Choose the wave","Start at Wave 1. Complete Organization & Layout, Visual Design, Writing & Copy Editing, then Final Overall Review. Do all four separately for each assigned page.","#wave-select"],
["Bring your previous history","For Waves 2–4, download your Google Doc AI Review Log as PDF/DOCX; select it here. List fixes made and anything still unresolved.","#previous-log,#corrections-made"],
["Prepare files and open Gemini","Click Download Review PDF, then Copy Instructions, then Open School Gemini. For Waves 2–4 attach the AI Review Log IN GEMINI as well; selecting it here does not transmit it.","#download-pdf,#wave-copy,#gemini-step-one"],
["SAVE feedback BEFORE editing","When Gemini responds, immediately copy its COMPLETE feedback into your separate Google Doc AI Review Log for THIS page. Do this after EVERY wave, before revising.","#review-history"],
["Revise and record fixes","Return to Canva or Memento, fix MUST DO and NEED TO DO NEXT issues, and record what you actually changed in your Google Doc. Export the revised page.","#corrections-made,#upload"],
["Recheck THIS wave","Click Copy Recheck Prompt. Attach your revised page in Gemini, plus the template and previous feedback if starting a new chat. Verify previous findings; correct remaining issues.","#wave-recheck"],
["Continue to the next wave","Only after saving feedback, revising, recording fixes and rechecking, confirm the checkbox and continue. Repeat the full cycle for each wave.","#wave-revised,#wave-next"],
["Finish and submit","After Wave 4, save its feedback, request the final report and submit the final page/report through Classroom for HUMAN editorial approval. Gemini never approves publication.","#copy-report,#production-report"]
]}
];
const labels=["Reporting Check","Template Check","Design Lab","Quality Check","Export & Next Steps","Spread Review Lab"];
const style=document.createElement("style");style.textContent=`
#patriot-guide{position:fixed;right:16px;top:110px;width:min(340px,calc(100vw - 32px));max-height:calc(100vh - 135px);overflow:auto;z-index:9500;border:2px solid #792f3b;background:#fffdf7;color:#172b43;box-shadow:0 12px 32px #172b4355;border-radius:7px;padding:14px;font:14px/1.45 Arial,sans-serif}
#patriot-guide[hidden]{display:none!important}#patriot-guide .pg-top{display:flex;align-items:center;justify-content:space-between;gap:9px}#patriot-guide h3{margin:5px 0;font:700 20px Georgia,serif}#patriot-guide p{margin:8px 0}#patriot-guide .pg-count{font:700 11px Arial;letter-spacing:.09em;color:#792f3b}#patriot-guide .pg-actions{display:flex;gap:6px;margin:12px 0 2px}#patriot-guide button{cursor:pointer;border:1px solid #172b43;background:#172b43;color:white;border-radius:3px;padding:9px 11px;font:700 13px Arial}#patriot-guide button:disabled{opacity:.35;cursor:default}#patriot-guide button.pg-quiet{background:white;color:#172b43}#patriot-guide .pg-close{padding:2px 8px;font-size:20px;background:white;color:#172b43}#pg-launch{position:fixed;right:14px;top:65px;z-index:9501;border:2px solid #792f3b;background:#fffdf8;color:#172b43;padding:9px 12px;font:700 13px Arial;cursor:pointer;border-radius:4px}#pg-launch[hidden]{display:none!important}.pg-highlight{outline:4px solid #b22643!important;outline-offset:4px!important;position:relative;z-index:3}#patriot-guide .pg-hint{background:#f1e9dd;border-left:3px solid #792f3b;padding:8px;margin-top:8px;font:12px/1.45 Arial}body.pg-tour-active #patriot-planning-dock{opacity:.25;pointer-events:none}@media(max-width:750px){#patriot-guide{top:auto;bottom:10px;left:10px;right:10px;width:auto;max-height:44vh}#pg-launch{top:auto;bottom:10px;right:10px}}
`;document.head.append(style);
const launch=document.createElement("button");launch.id="pg-launch";launch.type="button";launch.textContent="❔ Guide me";launch.hidden=true;
const panel=document.createElement("aside");panel.id="patriot-guide";panel.hidden=true;panel.setAttribute("aria-label","Guided wizard instructions");
panel.innerHTML='<div class="pg-top"><span class="pg-count"></span><button class="pg-close" type="button" aria-label="Close help">×</button></div><h3></h3><p class="pg-purpose"></p><div class="pg-hint"></div><div class="pg-actions"><button class="pg-prev pg-quiet" type="button">Back</button><button class="pg-next" type="button">Next →</button><button class="pg-quiet pg-end" type="button">Done</button></div>';
document.body.append(launch,panel);
let stage=0,step=0,target=null,open=false;
const visible=el=>el&&el.getClientRects().length&&getComputedStyle(el).visibility!=="hidden";
function resolveStage(){
 const active=[...document.querySelectorAll("button,a,[role=tab]")].find(el=>visible(el)&&/\bCURRENT\b/i.test(el.innerText||""));
 if(active){const text=active.innerText||"";const i=labels.findIndex(t=>text.includes(t));if(i>=0)return i}
 const headline=[...document.querySelectorAll("h1,h2,h3")].filter(visible).map(x=>x.textContent).join(" ");
 if(/Review My Spread|Review with Gemini|Review Your Spread/i.test(headline))return 5;
 return stage;
}
function findControl(s){
 for(const selector of s.split(",")){const matches=[...document.querySelectorAll(selector.trim())].filter(el=>visible(el)&&!el.closest("#patriot-guide,#pg-launch"));if(matches.length)return matches[0]}
 return null;
}
function clear(){if(target)target.classList.remove("pg-highlight");target=null}
function render(){
 clear();stage=resolveStage();const data=stages[stage],item=data.tasks[step]||data.tasks[0];
 panel.querySelector(".pg-count").textContent="STEP "+(stage+1)+" OF 6 · TIP "+(step+1)+" OF "+data.tasks.length;
 panel.querySelector("h3").textContent=item[0];panel.querySelector(".pg-purpose").textContent=data.purpose;
 panel.querySelector(".pg-hint").textContent=item[1];
 panel.querySelector(".pg-prev").disabled=step===0;
 panel.querySelector(".pg-next").disabled=step===data.tasks.length-1;
 target=findControl(item[2]);if(target){target.classList.add("pg-highlight");target.scrollIntoView({block:"center",behavior:"smooth"})}
}
function setOpen(value){open=value;panel.hidden=!value;launch.hidden=value;document.body.classList.toggle("pg-tour-active",value);if(value){step=0;render()}else clear()}
launch.onclick=()=>setOpen(true);panel.querySelector(".pg-close").onclick=()=>setOpen(false);
panel.querySelector(".pg-end").onclick=()=>setOpen(false);
panel.querySelector(".pg-prev").onclick=()=>{step=Math.max(0,step-1);render()};
panel.querySelector(".pg-next").onclick=()=>{step=Math.min(stages[stage].tasks.length-1,step+1);render()};
function onStage(){const next=resolveStage();if(next!==stage){stage=next;step=0;if(open)render()}}
document.addEventListener("click",e=>{if(e.target.closest("#patriot-guide,#pg-launch"))return;setTimeout(onStage,80)},true);
launch.hidden=false;
// Keep tour optional; the wizard should never start behind a blocking overlay.
})();