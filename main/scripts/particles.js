// scripts/particles.js
const particleCanvas = document.getElementById('particleCanvas');
const particleCtx = particleCanvas.getContext('2d');

function resizeCanvases() {
    particleCanvas.width = window.innerWidth;
    particleCanvas.height = window.innerHeight;
}
resizeCanvases();
window.addEventListener('resize', resizeCanvases);

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 8 + 4;
        this.weight = Math.random() * 0.5 + 0.3;
        this.directionX = (Math.random() - 0.5) * 1.5;
        this.color = `hsl(${Math.random() * 360}, 100%, 70%)`;
    }
    update() {
        this.y += this.weight;
        this.x += this.directionX;
        if (this.size > 0.3) this.size -= 0.15;
    }
    draw() {
        particleCtx.beginPath();
        particleCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        particleCtx.fillStyle = this.color;
        particleCtx.fill();
    }
}

const particles = [];
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    for (let i = 0; i < 3; i++) {
        particles.push(new Particle(mouseX, mouseY));
    }
});

function animateParticles() {
    particleCtx.fillStyle = 'rgba(0,0,0,0.05)';
    particleCtx.fillRect(0, 0, particleCanvas.width, particleCanvas.height);

    particles.forEach((particle, index) => {
        particle.update();
        particle.draw();
        if (particle.size <= 0.3) {
            particles.splice(index, 1);
        }
    });

    requestAnimationFrame(animateParticles);
}

animateParticles();
