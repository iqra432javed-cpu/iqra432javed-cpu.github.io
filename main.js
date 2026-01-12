/* =========================
   UTILITIES
========================= */
const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

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
   DASHBOARD TABS
========================= */
const tabBtns = $$(".tab-btn");
const panels = $$(".dashboard-panel");

tabBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const target = btn.dataset.dashboard;

    tabBtns.forEach(b => b.classList.remove("active"));
    panels.forEach(p => p.classList.remove("active"));

    btn.classList.add("active");
    $(`#${target}-panel`).classList.add("active");
  });
});

/* =========================
   CASE STUDY MODAL
========================= */
const modal = $("#projectModal");
const modalTitle = $("#modalTitle");
const modalDesc = $("#modalDesc");
const closeBtn = $(".close-btn");

const projects = {
  1: {
    title: "📊 Revenue Intelligence System",
    desc: `
      <p><strong>Problem:</strong> Management had no unified view of sales performance across regions and products.</p>
      <p><strong>Solution:</strong> Built a Power BI model combining CRM + sales data with KPI layers.</p>
      <ul>
        <li>Executive performance dashboard</li>
        <li>Growth & funnel analysis</li>
        <li>Automated daily refresh</li>
      </ul>
      <p><strong>Impact:</strong> Reporting time reduced by 85%, leadership gained real-time visibility.</p>
    `
  },
  2: {
    title: "💰 Financial Control System",
    desc: `
      <p><strong>Problem:</strong> No control over expenses and budget vs actuals.</p>
      <p><strong>Solution:</strong> Built a financial model with cost centers and budget tracking.</p>
      <ul>
        <li>Profit & loss analytics</li>
        <li>Department spend tracking</li>
        <li>Variance analysis</li>
      </ul>
      <p><strong>Impact:</strong> Identified 18% cost leakage and improved financial discipline.</p>
    `
  },
  3: {
    title: "📦 Inventory Intelligence Platform",
    desc: `
      <p><strong>Problem:</strong> Stockouts and overstock due to poor demand visibility.</p>
      <p><strong>Solution:</strong> Built demand forecasting and stock health dashboards.</p>
      <ul>
        <li>Stock coverage metrics</li>
        <li>Slow/fast moving analysis</li>
        <li>Reorder planning views</li>
      </ul>
      <p><strong>Impact:</strong> Reduced stockouts by 30% and improved cash flow.</p>
    `
  }
};

$$(".project-card").forEach(card => {
  card.addEventListener("click", () => {
    const id = card.dataset.project;
    modalTitle.textContent = projects[id].title;
    modalDesc.innerHTML = projects[id].desc;
    modal.style.display = "flex";
  });
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});

/* =========================
   SCROLL REVEAL
========================= */
const reveals = $$(".reveal");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
}, { threshold: 0.1 });

reveals.forEach(el => observer.observe(el));

/* =========================
   NAVBAR SCROLL EFFECT
========================= */
const navbar = $(".navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 40) {
    navbar.style.boxShadow = "0 10px 30px rgba(0,0,0,.3)";
  } else {
    navbar.style.boxShadow = "none";
  }
});

/* =========================
   CANVAS BACKGROUND ANIMATION
========================= */
const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

let w, h;
function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

const dots = Array.from({ length: 80 }, () => ({
  x: Math.random() * w,
  y: Math.random() * h,
  r: Math.random() * 1.5 + 0.5,
  vx: (Math.random() - 0.5) * 0.4,
  vy: (Math.random() - 0.5) * 0.4
}));

function animate() {
  ctx.clearRect(0, 0, w, h);

  for (let i = 0; i < dots.length; i++) {
    const d = dots[i];
    d.x += d.vx;
    d.y += d.vy;

    if (d.x < 0 || d.x > w) d.vx *= -1;
    if (d.y < 0 || d.y > h) d.vy *= -1;

    ctx.beginPath();
    ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(56,189,248,0.6)";
    ctx.fill();
  }

  // Lines
  for (let i = 0; i < dots.length; i++) {
    for (let j = i + 1; j < dots.length; j++) {
      const a = dots[i];
      const b = dots[j];
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      if (dist < 120) {
        ctx.strokeStyle = "rgba(56,189,248,0.08)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(animate);
}

animate();

/* =========================
   SMOOTH ANCHOR SCROLL
========================= */
$$('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const target = $(this.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth" });
  });
});
