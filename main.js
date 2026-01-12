// MATRIX BACKGROUND
const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
resize();
addEventListener("resize", resize);

const letters = "01 DATA AI BI SQL".split("");
const fontSize = 14;
let drops = Array(Math.floor(innerWidth / fontSize)).fill(1);

function drawMatrix() {
  ctx.fillStyle = "rgba(2,6,23,0.2)";
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

// SCROLL REVEAL
const observer = new IntersectionObserver(
  entries => entries.forEach(x => x.isIntersecting && x.target.classList.add("show")),
  { threshold: 0.1 }
);
document.querySelectorAll(".reveal").forEach(s => observer.observe(s));

// TILT EFFECT
document.querySelectorAll(".card,.float-card").forEach(card => {
  card.addEventListener("mousemove", e => {
    const r = card.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    const rx = (y / r.height - 0.5) * 10;
    const ry = (x / r.width - 0.5) * -10;
    card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) scale(1.03)`;
  });
  card.addEventListener("mouseleave", () => card.style.transform = "");
});

// COUNTERS
const counterObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target, target = +el.dataset.target;
    let val = 0, step = target / 60;
    function run() {
      val += step;
      if (val < target) {
        el.textContent = Math.floor(val);
        requestAnimationFrame(run);
      } else el.textContent = target;
    }
    run();
    counterObs.unobserve(el);
  });
}, { threshold: 0.5 });
document.querySelectorAll(".counter").forEach(c => counterObs.observe(c));

// MODAL
const modal = document.getElementById("projectModal");
const title = document.getElementById("modalTitle");
const desc = document.getElementById("modalDesc");
const closeBtn = modal.querySelector(".close-btn");

const projects = {
  1: { title: "Revenue Command Center", desc: "Enterprise growth intelligence system." },
  2: { title: "Financial Control System", desc: "Automated financial decision engine." },
  3: { title: "Inventory Intelligence Platform", desc: "Smart demand & stock optimizer." }
};

function openProject(id) {
  modal.style.display = "flex";
  title.textContent = projects[id].title;
  desc.textContent = projects[id].desc;
  modal.classList.add("fade-in");
}
function closeProject() {
  modal.style.display = "none";
}
closeBtn.addEventListener("click", closeProject);
document.addEventListener("keydown", e => { if (e.key === "Escape") closeProject(); });

// AI CHAT
const aiBtn = document.getElementById("ai-btn");
const aiChat = document.getElementById("ai-chat");
const aiInput = document.getElementById("ai-input");
const aiBody = document.getElementById("ai-body");

aiBtn.onclick = () => {
  aiChat.style.display = aiChat.style.display === "flex" ? "none" : "flex";
};

const replies = {
  default: "I design digital intelligence systems.",
  project: "I build business control and decision systems.",
  skill: "Excel, Power BI, SQL, Analytics Architecture."
};

aiInput.addEventListener("keydown", e => {
  if (e.key === "Enter" && aiInput.value.trim()) {
    const msg = aiInput.value;
    aiBody.innerHTML += `<div>> ${msg}</div>`;
    let reply = replies.default;
    Object.keys(replies).forEach(key => {
      if (msg.toLowerCase().includes(key)) reply = replies[key];
    });
    setTimeout(() => {
      aiBody.innerHTML += `<div style="color:#38bdf8">${reply}</div>`;
      aiBody.scrollTop = aiBody.scrollHeight;
    }, 400);
    aiInput.value = "";
  }
});

// THEME TOGGLE
const themeToggle = document.querySelector(".theme-toggle");
themeToggle.addEventListener("click", () => {
  document.body.dataset.theme =
    document.body.dataset.theme === "light" ? "dark" : "light";
});
