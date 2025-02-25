// scripts/starfield.js
const starCanvas = document.getElementById('starCanvas');
const starCtx = starCanvas.getContext('2d');

function resizeCanvases() {
    starCanvas.width = window.innerWidth;
    starCanvas.height = window.innerHeight;
}
resizeCanvases();
window.addEventListener('resize', resizeCanvases);

const createStarfield = () => {
    const stars = [];
    for (let i = 0; i < 400; i++) {
        stars.push({
            x: Math.random() * starCanvas.width,
            y: Math.random() * starCanvas.height,
            z: Math.random() * 0.4 + 0.1,
            radius: Math.random() * 0.8 + 0.2,
            speedX: (Math.random() - 0.5) * 0.08,
            speedY: (Math.random() - 0.5) * 0.08,
            hue: Math.random() * 360
        });
    }
    return stars;
};

let stars = createStarfield();

function animateStars() {
    starCtx.fillStyle = 'rgba(0, 0, 0, 0.08)';
    starCtx.fillRect(0, 0, starCanvas.width, starCanvas.height);

    stars.forEach(star => {
        star.x = (star.x + star.speedX + starCanvas.width) % starCanvas.width;
        star.y = (star.y + star.speedY + starCanvas.height) % starCanvas.height;

        starCtx.beginPath();
        starCtx.fillStyle = `hsla(${star.hue}, 70%, 70%, ${star.z})`;
        starCtx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        starCtx.fill();
    });

    requestAnimationFrame(animateStars);
}

animateStars();
