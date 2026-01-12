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

/* =========================
   SCROLL REVEAL
========================= */
const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("show");
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

/* =========================
   TILT EFFECT
========================= */
document.querySelectorAll(".card, .float-card").forEach(card => {
  card.addEventListener("mousemove", e => {
    const r = card.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const rx = (y / r.height - 0.5) * 8;
    const ry = (x / r.width - 0.5) * -8;
    card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) scale(1.03)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

/* =========================
   COUNTERS
========================= */
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = +el.dataset.target;
    let current = 0;
    const step = target / 60;

    function animate() {
      current += step;
      if (current < target) {
        el.textContent = Math.floor(current);
        requestAnimationFrame(animate);
      } else {
        el.textContent = target;
      }
    }
    animate();
    counterObserver.unobserve(el);
  });
}, { threshold: 0.5 });

document.querySelectorAll(".counter").forEach(c => counterObserver.observe(c));

/* =========================
   MODAL SYSTEM
========================= */
const modal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const closeBtn = modal.querySelector(".close-btn");

const projects = {
  1: { title: "Revenue Command Center", desc: "Enterprise growth intelligence system for performance tracking and forecasting." },
  2: { title: "Financial Control System", desc: "Automated finance decision engine for cost, profit and risk control." },
  3: { title: "Inventory Intelligence Platform", desc: "Smart demand & stock optimization system using predictive analytics." }
};

document.querySelectorAll(".project-card").forEach(card => {
  card.addEventListener("click", () => {
    const id = card.dataset.project;
    modalTitle.textContent = projects[id].title;
    modalDesc.textContent = projects[id].desc;
    modal.style.display = "flex";
  });
});

function closeModal() {
  modal.style.display = "none";
}

closeBtn.addEventListener("click", closeModal);
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeModal();
});

/* =========================
   AI CHAT
========================= */
const aiBtn = document.getElementById("ai-btn");
const aiChat = document.getElementById("ai-chat");
const aiInput = document.getElementById("ai-input");
const aiBody = document.getElementById("ai-body");

aiBtn.addEventListener("click", () => {
  aiChat.style.display = aiChat.style.display === "flex" ? "none" : "flex";
});

const replies = {
  default: "I design digital intelligence systems and analytics platforms.",
  project: "I build business control systems, dashboards and analytics engines.",
  skill: "My core skills are Excel, Power BI, SQL, DAX and analytics architecture."
};

aiInput.addEventListener("keydown", e => {
  if (e.key === "Enter" && aiInput.value.trim()) {
    const msg = aiInput.value.trim();
    aiBody.innerHTML += `<div>> ${msg}</div>`;

    let reply = replies.default;
    if (msg.toLowerCase().includes("project")) reply = replies.project;
    if (msg.toLowerCase().includes("skill")) reply = replies.skill;

    setTimeout(() => {
      aiBody.innerHTML += `<div style="color:#38bdf8">${reply}</div>`;
      aiBody.scrollTop = aiBody.scrollHeight;
    }, 400);

    aiInput.value = "";
  }
});

/* =========================
   THEME TOGGLE
========================= */
const themeToggle = document.querySelector(".theme-toggle");
themeToggle.addEventListener("click", () => {
  document.body.dataset.theme =
    document.body.dataset.theme === "light" ? "dark" : "light";
});

/* =========================
   DASHBOARD TABS + TYPING
========================= */
const tabButtons = document.querySelectorAll(".tab-btn");
const dashboards = document.querySelectorAll(".dashboard-iframe");
const captions = document.querySelectorAll(".dashboard-caption");

function typeCaption(el) {
  const text = el.dataset.text;
  const typedText = el.querySelector(".typed-text");
  const cursor = el.querySelector(".cursor");
  typedText.textContent = "";
  let i = 0;

  function type() {
    if (i < text.length) {
      typedText.textContent += text.charAt(i);
      i++;
      setTimeout(type, 25);
    } else {
      cursor.style.display = "inline-block";
    }
  }
  type();
}

tabButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    tabButtons.forEach(b => b.classList.remove("active"));
    dashboards.forEach(d => d.classList.remove("active"));
    captions.forEach(c => {
      c.classList.remove("active");
      c.querySelector(".typed-text").textContent = "";
    });

    btn.classList.add("active");
    const id = btn.dataset.dashboard;
    document.getElementById(id).classList.add("active");
    const caption = document.getElementById(id + "-caption");
    caption.classList.add("active");
    typeCaption(caption);
  });
});

/* =========================
   SKIP BUTTONS
========================= */
document.querySelectorAll(".skip-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const caption = btn.closest(".dashboard-caption");
    caption.querySelector(".typed-text").textContent = caption.dataset.text;
  });
});
