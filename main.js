const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

// MATRIX BACKGROUND
const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

function resizeCanvas(){canvas.width=innerWidth;canvas.height=innerHeight}
resizeCanvas();addEventListener("resize",resizeCanvas);

const letters="01 DATA AI BI SQL".split("");
const fontSize=14;
let drops=Array(Math.floor(innerWidth/fontSize)).fill(1);

function drawMatrix(){
ctx.fillStyle="rgba(2,6,23,0.25)";
ctx.fillRect(0,0,canvas.width,canvas.height);
ctx.fillStyle="#38bdf8";
ctx.font=fontSize+"px monospace";
drops.forEach((y,i)=>{
const t=letters[Math.floor(Math.random()*letters.length)];
ctx.fillText(t,i*fontSize,y*fontSize);
if(y*fontSize>canvas.height && Math.random()>0.975)drops[i]=0;
drops[i]++;
});
requestAnimationFrame(drawMatrix);
}
drawMatrix();

// REVEAL
const obs=new IntersectionObserver(entries=>{
entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("active")})
},{threshold:.12});
$$(".reveal").forEach(el=>obs.observe(el));

// AI ASSISTANT
const aiBtn=$("#aiButton"), aiChat=$("#aiChat"), aiSend=$("#aiSend"), aiInput=$("#aiInput"), aiMessages=$("#aiMessages");
aiBtn.onclick=()=>aiChat.style.display=aiChat.style.display==="flex"?"none":"flex";

function addMsg(t,c){
const d=document.createElement("div");
d.className="ai-msg "+c;
d.textContent=t;
aiMessages.appendChild(d);
aiMessages.scrollTop=aiMessages.scrollHeight;
}

addMsg("Hi! I'm Iqra AI 🤖 Ask me about dashboards, pricing, or services.","bot-msg");

aiSend.onclick=sendMsg;
aiInput.addEventListener("keypress",e=>{if(e.key==="Enter")sendMsg()});

function sendMsg(){
const t=aiInput.value.trim(); if(!t)return;
addMsg(t,"user-msg"); aiInput.value="";
setTimeout(()=>addMsg(botReply(t),"bot-msg"),600);
}

function botReply(m){
m=m.toLowerCase();
if(m.includes("price")) return "Pricing depends on project scope. Use contact form for quote.";
if(m.includes("power bi")||m.includes("dashboard")) return "I build executive Power BI dashboards and BI systems.";
if(m.includes("services")) return "Dashboards, reporting automation, financial analytics, BI systems.";
return "Please describe your project in the contact form and I will respond personally.";
}
