// ---------------------
// MATRIX BACKGROUND
// ---------------------
const canvas = document.getElementById('matrix-bg');
const ctx = canvas.getContext('2d');

// Ajuster la taille du canvas
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

// Lettres pour l'effet Matrix
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

// ---------------------
// SMOOTH SCROLL déjà inclus dans index.html
// ---------------------


const steps = document.querySelectorAll(".step");
const nextBtns = document.querySelectorAll(".next-step");
const prevBtns = document.querySelectorAll(".prev-step");
const progressBar = document.getElementById("progressBar");
const progressSteps = document.querySelectorAll(".progress-steps li");
const preview = document.getElementById("preview");
const summary = document.getElementById("summary");

let currentStep = 0;

function updateProgress() {
    const progress = (currentStep / (steps.length - 1)) * 100;
    progressBar.style.width = progress + "%";
    progressSteps.forEach((li, index) => {
        li.classList.toggle("active", index <= currentStep);
    });
}

function showStep(index) {
    steps.forEach((step, i) => {
        step.classList.remove("active", "prev");
        if (i === index) step.classList.add("active");
        else if (i < index) step.classList.add("prev");
    });
    updateProgress();
}

nextBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        if (currentStep < steps.length - 1) {
            currentStep++;
            if (currentStep === 3) fillSummary();
            showStep(currentStep);
        }
    });
});

prevBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        if (currentStep > 0) {
            currentStep--;
            showStep(currentStep);
        }
    });
});

document.getElementById("screenshot").addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            preview.innerHTML = `<img src="${e.target.result}" alt="Preview" style="max-width:150px;border:2px solid #39FF14;border-radius:10px;">`;
        };
        reader.readAsDataURL(file);
    }
});

function fillSummary() {
    summary.innerHTML = `
        <li><strong>Nom :</strong> ${document.getElementById("fullname").value}</li>
        <li><strong>Email :</strong> ${document.getElementById("email").value}</li>
        <li><strong>Téléphone :</strong> ${document.getElementById("phone").value}</li>
        <li><strong>Ville :</strong> ${document.getElementById("location").value}</li>
        <li><strong>Plateforme :</strong> ${document.getElementById("platform").value}</li>
        <li><strong>Compte :</strong> ${document.getElementById("username").value}</li>
        <li><strong>Description :</strong> ${document.getElementById("description").value}</li>
        <li><strong>Anonyme :</strong> ${document.getElementById("anonymous").checked ? "Oui" : "Non"}</li>
    `;
}

document.getElementById("reportForm").addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Votre signalement a été envoyé avec succès !");
});

showStep(currentStep);
updateProgress();


