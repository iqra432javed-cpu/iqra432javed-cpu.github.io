// Navbar shadow
const nav = document.querySelector(".navbar");
window.addEventListener("scroll", () => {
  nav.style.boxShadow = window.scrollY > 30 ? "0 10px 30px rgba(0,0,0,.4)" : "none";
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener("click",e=>{
    const t=document.querySelector(a.getAttribute("href"));
    if(!t)return;
    e.preventDefault();
    t.scrollIntoView({behavior:"smooth"});
  });
});
