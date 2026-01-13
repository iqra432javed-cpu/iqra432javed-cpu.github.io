/* =========================
   HELPERS
========================= */
const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

/* =========================
   THEME TOGGLE
========================= */
const themeBtn = $(".theme-toggle");
const body = document.body;

function setTheme(theme) {
  body.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  themeBtn.textContent = theme === "dark" ? "🌙" : "☀️";
}

const savedTheme = localStorage.getItem("theme") || "dark";
setTheme(savedTheme);

themeBtn.addEventListener("click", () => {
  const current = body.getAttribute("data-theme");
  setTheme(current === "dark" ? "light" : "dark");
});

/* =========================
   MATRIX BACKGROUND
========================= */
const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
resizeCanvas();
addEventListener("resize", resizeCanvas);

const letters = "01 DATA BI SQL".split("");
const fontSize = 14;
let drops = Array(Math.floor(innerWidth / fontSize)).fill(1);

function drawMatrix() {
  ctx.fillStyle = "rgba(2,6,23,0.25)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#38bdf8";
  ctx.font = fontSize + "px monospace";

  drops.forEach((y, i) => {
    const t = letters[Math.floor(Math.random() * letters.length)];
    ctx.fillText(t, i * fontSize, y * fontSize);
    if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  });

  requestAnimationFrame(drawMatrix);
}
drawMatrix();

/* =========================
   NAVBAR SHADOW
========================= */
const navbar = $(".navbar");
window.addEventListener("scroll", () => {
  navbar.style.boxShadow =
    window.scrollY > 30 ? "0 10px 30px rgba(0,0,0,.35)" : "none";
});

/* =========================
   SMOOTH SCROLL
========================= */
$$('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const target = $(this.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth" });
  });
});

/* =========================
   AI ASSISTANT
========================= */
const aiBtn = document.getElementById("aiButton");
const aiChat = document.getElementById("aiChat");
const aiSend = document.getElementById("aiSend");
const aiInput = document.getElementById("aiInput");
const aiMessages = document.getElementById("aiMessages");

aiBtn.onclick = () => {
  aiChat.style.display = aiChat.style.display === "flex" ? "none" : "flex";
};

function addMsg(text, cls){
  const div = document.createElement("div");
  div.className = "ai-msg " + cls;
  div.textContent = text;
  aiMessages.appendChild(div);
  aiMessages.scrollTop = aiMessages.scrollHeight;
}

// Greeting
addMsg("Hi! I'm Iqra AI 🤖 Ask me about dashboards, services, pricing, or analytics systems.", "bot-msg");

aiSend.onclick = sendMsg;
aiInput.addEventListener("keypress", e => {
  if(e.key === "Enter") sendMsg();
});

function sendMsg(){
  const text = aiInput.value.trim();
  if(!text) return;

  addMsg(text, "user-msg");
  aiInput.value = "";

  setTimeout(() => {
    addMsg(getBotReply(text), "bot-msg");
  }, 600);
}

function getBotReply(msg){
  msg = msg.toLowerCase();

  if(msg.includes("price") || msg.includes("cost"))
    return "Pricing depends on project scope. Please use the contact form to get a custom quote.";

  if(msg.includes("dashboard") || msg.includes("power bi"))
    return "I build executive dashboards for finance, sales, inventory, and management reporting.";

  if(msg.includes("services"))
    return "Services include Power BI dashboards, financial analytics, reporting automation, and BI systems.";

  if(msg.includes("contact") || msg.includes("email"))
    return "You can send a message using the contact form on this page. I reply personally.";

  if(msg.includes("time") || msg.includes("delivery"))
    return "Most dashboards take between 5–14 days depending on complexity.";

  return "Great question! Please describe your project in the contact form and I’ll review it personally.";
}
