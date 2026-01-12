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
  if (themeBtn) themeBtn.textContent = theme === "dark" ? "🌙" : "☀️";
}

const savedTheme = localStorage.getItem("theme") || "dark";
setTheme(savedTheme);

if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    const current = body.getAttribute("data-theme");
    setTheme(current === "dark" ? "light" : "dark");
  });
}

/* =========================
   NAVBAR SHADOW ON SCROLL
========================= */
const navbar = $(".navbar");
if (navbar) {
  window.addEventListener("scroll", () => {
    navbar.style.boxShadow =
      window.scrollY > 30 ? "0 10px 30px rgba(0,0,0,.35)" : "none";
  });
}

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
   SCROLL REVEAL
========================= */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("active");
  });
}, { threshold: 0.12 });

$$(".reveal").forEach(el => revealObserver.observe(el));

/* =========================
   3D TILT EFFECT
========================= */
$$(".card, .project-card, .contact-card, .img-frame").forEach(card => {
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
   MATRIX BACKGROUND (Optional Canvas)
========================= */
const canvas = document.getElementById("bg");
if (canvas) {
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
}

/* =========================
   DASHBOARD TABS (Work Page)
========================= */
const tabBtns = $$(".tab-btn");
const panels = $$(".dashboard-panel");

if (tabBtns.length && panels.length) {
  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.dashboard;

      tabBtns.forEach(b => b.classList.remove("active"));
      panels.forEach(p => p.classList.remove("active"));

      btn.classList.add("active");
      const panel = document.getElementById(`${target}-panel`);
      if (panel) panel.classList.add("active");
    });
  });
}

/* =========================
   PROJECT MODAL (Work Page)
========================= */
const modal = $("#projectModal");
const modalTitle = $("#modalTitle");
const modalDesc = $("#modalDesc");
const closeBtn = $(".close-btn");

const projects = {
  1: {
    title: "📊 Revenue Intelligence System",
    desc: `
      <p><strong>Problem:</strong> No unified view of sales performance.</p>
      <p><strong>Solution:</strong> Built Power BI model combining CRM & sales data.</p>
      <ul>
        <li>Executive performance dashboards</li>
        <li>Growth & funnel analytics</li>
        <li>Automated refresh</li>
      </ul>
      <p><strong>Impact:</strong> Reporting time reduced by 85%.</p>
    `
  },
  2: {
    title: "💰 Financial Control System",
    desc: `
      <p><strong>Problem:</strong> No cost control or budget tracking.</p>
      <p><strong>Solution:</strong> Built financial model with cost centers.</p>
      <ul>
        <li>P&L analytics</li>
        <li>Department spend tracking</li>
        <li>Variance analysis</li>
      </ul>
      <p><strong>Impact:</strong> Identified 18% cost leakage.</p>
    `
  },
  3: {
    title: "📦 Inventory Intelligence Platform",
    desc: `
      <p><strong>Problem:</strong> Stockouts & overstock.</p>
      <p><strong>Solution:</strong> Built demand & stock health dashboards.</p>
      <ul>
        <li>Stock coverage KPIs</li>
        <li>Slow/fast moving analysis</li>
        <li>Reorder planning</li>
      </ul>
      <p><strong>Impact:</strong> Stockouts reduced by 30%.</p>
    `
  }
};

$$(".project-card").forEach(card => {
  card.addEventListener("click", () => {
    if (!modal) return;
    const id = card.dataset.project;
    if (!projects[id]) return;
    modalTitle.textContent = projects[id].title;
    modalDesc.innerHTML = projects[id].desc;
    modal.style.display = "flex";
  });
});

function closeModal() {
  if (modal) modal.style.display = "none";
}

if (closeBtn) closeBtn.addEventListener("click", closeModal);

if (modal) {
  modal.addEventListener("click", e => {
    if (e.target === modal) closeModal();
  });
}

document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeModal();
});
