(function(){
"use strict";
const titles={
"03":["Club Profile","Members in Action","Our Club Community","Club Spotlight","More Than a Club"],
"04":["Meet the Staff","Behind the Scenes","Staff Spotlight","Our Departments","The People Behind ACSHS"],
"05":["Team Snapshot","Game Day","Beyond the Jersey","The Team Story","More Than a Game"],
"06":["Senior Profile","Our Senior Year","Senior Superlatives","The Class Story","On to What's Next"],
"07":["Program Profile","In Rehearsal","The Final Performance","Fine Arts Showcase","Behind the Scenes"],
"08":["Community Archive","Our Town","Then and Now","Community Connections","A Map of Memories"]
};
const themes={
"03":{cat:"CLUBS & ORGANIZATIONS",sub:"LEAD · CREATE · SERVE · BELONG",copy:"Clubs and organizations give students a place to find their people, explore their interests, and contribute to their school community.",facts:["Members and sponsors","Meetings and activities","Impact and accomplishments"],cap:["Working together","Making a difference","Finding their people"]},
"04":{cat:"FACULTY & STAFF",sub:"THE PEOPLE BEHIND THE PATRIOTS",copy:"A school is shaped by the people who show up every day to teach, guide, support, and encourage students. Tell their stories through authentic moments.",facts:["Names and positions","Daily contributions","Student and staff voices"],cap:["Everyday leadership","A schoolwide team","Behind the scenes"]},
"05":{cat:"SPORTS",sub:"ONE TEAM · ONE SEASON · MANY STORIES",copy:"Look beyond the scoreboard. Report on the athletes, coaches, teamwork and moments that shaped this season.",facts:["Complete team roster","Verified season results","Athlete and coach quotes"],cap:["The turning point","Teammates in action","More than a game"]},
"06":{cat:"SENIOR PAGES",sub:"CLASS OF 2027 · OUR STORIES",copy:"Celebrate the people and memories that define the graduating class. Make sure every name and detail is accurate.",facts:["Verified senior names","Student reflections","Class traditions"],cap:["A defining memory","Our senior year","What comes next"]},
"07":{cat:"FINE ARTS & ELECTIVES",sub:"CREATE · PRACTICE · PERFORM",copy:"Show the creative process: the work that happens before the performance, the people involved, and the finished product.",facts:["Program and sponsor","Rehearsal or work process","Performance details"],cap:["Practice and progress","The creative team","In the spotlight"]},
"08":{cat:"COMMUNITY & HISTORY",sub:"OUR ROOTS · OUR COMMUNITY",copy:"Connect the school to its community through carefully sourced photographs, dates, locations and historical context.",facts:["Reliable source credits","Verified dates and places","Past and present"],cap:["Then and now","A local connection","Shared traditions"]}
};
const esc=s=>String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
function model(section,index){
 const t=themes[section],name=titles[section][index],double=index>=3;
 const w=double?1440:900,h=1100,mid=double?720:450;
 const text=(x,y,str,size=24,color="#142c4c",weight="normal",family="Georgia,serif")=>'<text x="'+x+'" y="'+y+'" fill="'+color+'" font-size="'+size+'" font-weight="'+weight+'" font-family="'+family+'">'+esc(str)+'</text>';
 const line=(x1,y1,x2,y2,color="#bfae93",stroke=2)=>'<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="'+color+'" stroke-width="'+stroke+'"/>';
 function picture(x,y,pw,ph,n,variant){
   const hues=[["#9ba9a1","#d6b89c"],["#8995ad","#d2b3a8"],["#7d9f9f","#d4c5a5"],["#7b89a3","#c7b3a1"]][(n+variant)%4];
   return '<g><rect x="'+x+'" y="'+y+'" width="'+pw+'" height="'+ph+'" fill="#ffffff" stroke="#d1c4b4" stroke-width="7"/><rect x="'+(x+9)+'" y="'+(y+9)+'" width="'+(pw-18)+'" height="'+(ph-53)+'" fill="'+hues[0]+'"/><path d="M '+(x+9)+' '+(y+ph-44)+' L '+(x+pw*.43)+' '+(y+ph*.40)+' L '+(x+pw*.67)+' '+(y+ph*.62)+' L '+(x+pw-9)+' '+(y+ph*.24)+' L '+(x+pw-9)+' '+(y+ph-44)+' Z" fill="'+hues[1]+'" opacity=".78"/><circle cx="'+(x+pw*.40)+'" cy="'+(y+ph*.35)+'" r="'+Math.max(16,pw*.07)+'" fill="#e9d7bc"/><path d="M '+(x+pw*.28)+' '+(y+ph-55)+' Q '+(x+pw*.39)+' '+(y+ph*.42)+' '+(x+pw*.50)+' '+(y+ph-55)+'Z" fill="#1f3e64"/><rect x="'+(x+9)+'" y="'+(y+ph-45)+'" width="'+(pw-18)+'" height="36" fill="#fffaf2"/>'+text(x+17,y+ph-19,t.cap[n%3],17,"#152d4e")+'</g>';
 }
 function panel(x,y,pw,ph,heading,lines){
   let a='<rect x="'+x+'" y="'+y+'" width="'+pw+'" height="'+ph+'" fill="#fff8e9" stroke="#cdbca5" stroke-width="3"/>'+text(x+18,y+37,heading,26,"#142b4a","bold");
   lines.forEach((str,i)=>{a+=text(x+20,y+75+i*35,str,19)});
   return a;
 }
 let body='';
 if(!double){
   const left=32,right=868;
   if(index===0){body+=picture(38,254,530,525,0,index)+panel(588,254,273,280,"THE STORY",["Report the people,","purpose and impact.","Use authentic quotes."])+panel(588,554,273,225,"THE FACTS",t.facts);body+=picture(42,804,262,242,1,index)+picture(322,804,262,242,2,index)+panel(603,805,255,242,"REMEMBER",["Add full captions.","Check all names.","Credit photographs."])}
   if(index===1){body+=panel(37,252,330,326,"BEHIND THE SCENES",["What happened?","Who was there?","What made it matter?"]);body+=picture(385,252,475,326,0,index)+picture(38,603,257,290,1,index)+picture(312,603,257,290,2,index)+picture(587,603,274,290,0,index)+panel(38,920,823,129,"REPORTING CHECK",[t.facts[0]+" · "+t.facts[1]])}
   if(index===2){body+=picture(37,250,465,594,0,index)+panel(520,250,340,299,"SPOTLIGHT",["A person's own voice","should lead the story.","Use verified details."])+panel(520,570,340,272,"PROFILE",t.facts)+picture(38,867,263,181,1,index)+picture(318,867,263,181,2,index)+picture(598,867,263,181,0,index)}
 }else{
   body+=line(720,50,720,1052,"#ccbda6",4);
   if(index===3){body+=picture(35,250,650,530,0,index)+panel(752,250,645,255,"THE BIGGER PICTURE",["Tell a connected story using interviews, context and verified details.","Let the strongest photograph lead the reader."])+picture(752,532,305,248,1,index)+picture(1080,532,318,248,2,index)+panel(37,805,650,241,"STORY & STUDENT VOICE",["An accurate report supported by direct interviews.",t.facts[1]])+panel(753,805,646,241,"BY THE NUMBERS",t.facts)}
   if(index===4){body+=panel(40,249,435,320,"THE STORY",["Give this page an","authentic point of view.","Use verified reporting."])+picture(499,248,399,325,0,index)+picture(922,248,478,325,1,index)+picture(40,595,314,288,2,index)+picture(380,595,314,288,0,index)+picture(720,595,314,288,1,index)+picture(1061,595,338,288,2,index)+panel(40,910,1359,139,"WHAT MATTERS",["Caption every photo · Include names and dates · Check all sources"])}
 }
 let svg='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+w+' '+h+'" role="img" aria-label="'+esc(t.cat+": "+name)+'"><defs><pattern id="grain" width="25" height="25" patternUnits="userSpaceOnUse"><path d="M0 24 L25 24" stroke="#d0c3ad" stroke-width=".4" opacity=".32"/></pattern></defs><rect width="'+w+'" height="'+h+'" fill="#f4ebd8"/><rect width="'+w+'" height="'+h+'" fill="url(#grain)"/><rect x="18" y="15" width="'+(w-36)+'" height="'+(h-30)+'" fill="none" stroke="#cbb79a" stroke-width="2"/><rect x="34" y="26" width="245" height="41" fill="#8a293b"/>'+text(46,54,"THE PATRIOT FIELD GUIDE",22,"white","bold")+text(w-35,53,t.cat,20,"#142c4c","bold")+'<path d="M34 79 H'+(w-34)+'" stroke="#142c4c" stroke-width="3"/>'+text(34,170,name.toUpperCase(),double?72:59,"#132b4a","bold")+'<rect x="35" y="188" width="'+(w-70)+'" height="48" fill="#244a75"/>'+text(54,220,t.sub,23,"#fffdf7","bold","Georgia,serif")+body+'<path d="M34 '+(h-31)+' H'+(w-34)+'" stroke="#9d3043" stroke-width="2"/>'+text(43,h-13,"MODEL PAGE · PLACEHOLDER PHOTOS AND SAMPLE TEXT · NOT FOR PUBLICATION",13,"#8b2c3b","bold","Arial,sans-serif")+'</svg>';
 return "data:image/svg+xml;charset=utf-8,"+encodeURIComponent(svg);
}
window.PatriotReferenceModels={model,titles};
})();