const navBtns = document.querySelectorAll('.nav-btn');
const pages = document.querySelectorAll('.page');

function switchPage(pageId) {
    pages.forEach(page => page.classList.remove('active-page'));
    const selectedPage = document.getElementById(pageId);
    if (selectedPage) {
        selectedPage.classList.add('active-page');
    }

    navBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.page === pageId) {
            btn.classList.add('active');
        }
    });
}

navBtns.forEach(btn => {
    btn.addEventListener('click', () => switchPage(btn.dataset.page));
});

const cosmicPage = document.getElementById('cosmic');
const cosmicCanvas = document.getElementById('cosmicCanvas');
const ctx = cosmicCanvas.getContext('2d');

function resizeCosmicCanvas() {
    cosmicCanvas.width = cosmicPage.clientWidth;
    cosmicCanvas.height = cosmicPage.clientHeight;
}
window.addEventListener('resize', () => { if (cosmicPage.classList.contains('active-page')) resizeCosmicCanvas(); });

let particles = [];

cosmicPage.addEventListener('click', (e) => {
    const rect = cosmicPage.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    for (let i = 0; i < 8; i++) {
        particles.push({
            x, y,
            vx: (Math.random() - 0.5) * 4,
            vy: (Math.random() - 0.5) * 4,
            life: 1.0,
            size: Math.random() * 6 + 3
        });
    }
});

function drawCosmic() {
    if (!cosmicPage.classList.contains('active-page')) return;
    resizeCosmicCanvas();
    ctx.clearRect(0, 0, cosmicCanvas.width, cosmicCanvas.height);
    ctx.fillStyle = 'white';
    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.05;
        p.life -= 0.008;
        if (p.life <= 0 || p.y > cosmicCanvas.height + 50) {
            particles.splice(i, 1);
            continue;
        }
        ctx.globalAlpha = p.life;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
    }
    ctx.globalAlpha = 1.0;
    requestAnimationFrame(drawCosmic);
}
drawCosmic();

const stickCanvas = document.getElementById('stickCanvas');
const stickCtx = stickCanvas.getContext('2d');

let stickX = 200, stickY = 150;
let stickColor = '#2c3e50';
const moveSpeed = 8;

function drawStickFigure() {
    stickCtx.clearRect(0, 0, 400, 300);
    stickCtx.strokeStyle = stickColor;
    stickCtx.lineWidth = 3;
    stickCtx.fillStyle = stickColor;

    stickCtx.beginPath();
    stickCtx.arc(stickX, stickY - 25, 15, 0, 2 * Math.PI);
    stickCtx.stroke();

    stickCtx.fillStyle = stickColor;
    stickCtx.beginPath();
    stickCtx.arc(stickX - 6, stickY - 30, 3, 0, Math.PI);
    stickCtx.fill();
    stickCtx.beginPath();
    stickCtx.arc(stickX + 6, stickY - 30, 3, 0, Math.PI);
    stickCtx.fill();

    stickCtx.beginPath();
    stickCtx.arc(stickX, stickY - 20, 8, 0.1, Math.PI - 0.1);
    stickCtx.stroke();

    stickCtx.beginPath();
    stickCtx.moveTo(stickX, stickY - 10);
    stickCtx.lineTo(stickX, stickY + 40);
    stickCtx.stroke();

    stickCtx.beginPath();
    stickCtx.moveTo(stickX, stickY);
    stickCtx.lineTo(stickX - 20, stickY + 10);
    stickCtx.moveTo(stickX, stickY);
    stickCtx.lineTo(stickX + 20, stickY + 10);
    stickCtx.stroke();

    stickCtx.beginPath();
    stickCtx.moveTo(stickX, stickY + 40);
    stickCtx.lineTo(stickX - 15, stickY + 70);
    stickCtx.moveTo(stickX, stickY + 40);
    stickCtx.lineTo(stickX + 15, stickY + 70);
    stickCtx.stroke();
}

drawStickFigure();

window.addEventListener('keydown', (e) => {
    if (!document.getElementById('stick').classList.contains('active-page')) return;
    const key = e.key;
    e.preventDefault();
    if (key === 'ArrowUp') stickY = Math.max(40, stickY - moveSpeed);
    if (key === 'ArrowDown') stickY = Math.min(260, stickY + moveSpeed);
    if (key === 'ArrowLeft') stickX = Math.max(20, stickX - moveSpeed);
    if (key === 'ArrowRight') stickX = Math.min(380, stickX + moveSpeed);
    drawStickFigure();
});

document.getElementById('colorRed').addEventListener('click', () => { stickColor = '#e74c3c'; drawStickFigure(); });
document.getElementById('colorBlue').addEventListener('click', () => { stickColor = '#3498db'; drawStickFigure(); });
document.getElementById('colorGreen').addEventListener('click', () => { stickColor = '#2ecc71'; drawStickFigure(); });
document.getElementById('colorBlack').addEventListener('click', () => { stickColor = '#2c3e50'; drawStickFigure(); });

stickCanvas.addEventListener('click', () => {
    const audio = new Audio('https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3');
    audio.volume = 0.5;
    audio.play();
});

let clickCount = 0;
const clickCounterSpan = document.getElementById('clickCounter');
const maniaButton = document.getElementById('maniaButton');
const clickMessage = document.getElementById('clickMessage');

maniaButton.addEventListener('click', () => {
    clickCount++;
    clickCounterSpan.textContent = clickCount;
    
    if (clickCount % 10 === 0) {
        const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
        document.body.style.backgroundColor = randomColor;
        clickMessage.textContent = `🎉 ${clickCount} clicks! Background changed!`;
    } else {
        clickMessage.textContent = `Keep going! Next change at ${Math.ceil(clickCount/10)*10} clicks.`;
    }
});

document.querySelectorAll('.nav-btn').forEach(btn => {
    if (btn.dataset.page !== 'clickmania') {
        btn.addEventListener('click', () => document.body.style.backgroundColor = '#f0f2f5');
    }
});