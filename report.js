const steps = document.querySelectorAll(".form-step");
const nextBtns = document.querySelectorAll(".next-btn");
const prevBtns = document.querySelectorAll(".prev-btn");
const progress = document.getElementById("progress");
const progressSteps = document.querySelectorAll(".progress-step");
const form = document.getElementById("multiStepForm");

let currentStep = 0;

function updateProgressbar() {
  progressSteps.forEach((step, index) => {
    if (index <= currentStep) {
      step.classList.add("active");
    } else {
      step.classList.remove("active");
    }
  });

  const actives = document.querySelectorAll(".progress-step.active");
  progress.style.width = ((actives.length - 1) / (progressSteps.length - 1)) * 100 + "%";
}

nextBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    steps[currentStep].classList.remove("active");
    currentStep++;
    steps[currentStep].classList.add("active");
    updateProgressbar();
  });
});

prevBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    steps[currentStep].classList.remove("active");
    currentStep--;
    steps[currentStep].classList.add("active");
    updateProgressbar();
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  document.querySelector(".report-section").style.display = "none";
  document.getElementById("confirmation").classList.remove("hidden");
});



const letters = '01XyberShield';
const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#39FF14';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        const text = letters.charAt(Math.floor(Math.random() * letters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(drawMatrix, 35);

// Ajuster au redimensionnement
window.addEventListener('resize', () => {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
});
