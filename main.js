// MATRIX BACKGROUND
const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

function resize(){
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
resize();
addEventListener("resize", resize);

const letters = "01 DATA BI SQL AI".split("");
const fontSize = 14;
let drops = Array(Math.floor(innerWidth / fontSize)).fill(1);

function draw(){
  ctx.fillStyle = "rgba(2,6,23,0.25)";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = "#38bdf8";
  ctx.font = fontSize+"px monospace";

  drops.forEach((y,i)=>{
    const t = letters[Math.floor(Math.random()*letters.length)];
    ctx.fillText(t, i*fontSize, y*fontSize);
    if(y*fontSize > canvas.height && Math.random()>0.975) drops[i]=0;
    drops[i]++;
  });

  requestAnimationFrame(draw);
}
draw();

// EMAILJS
(function(){
  emailjs.init("YOUR_EMAILJS_PUBLIC_KEY");
})();

document.getElementById("contactForm").addEventListener("submit", function(e){
  e.preventDefault();

  emailjs.sendForm("YOUR_SERVICE_ID","YOUR_TEMPLATE_ID",this)
    .then(()=>{
      document.getElementById("formStatus").textContent = "Message sent successfully!";
      this.reset();
    },()=>{
      document.getElementById("formStatus").textContent = "Error sending message!";
    });
});
