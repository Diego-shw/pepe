const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const wallText = "Gracias por Existir";
const wallX = canvas.width / 3;
const wallY = canvas.height / 3;
const wallWidth = canvas.width / 3;
const wallHeight = canvas.height / 3;

const stickman = {
    x: 50,
    y: canvas.height - 150,
    width: 20,
    height: 50,
    color: 'black'
};

const confetti = [];

function drawWall() {
    ctx.fillStyle = 'lightgrey';
    ctx.fillRect(wallX, wallY, wallWidth, wallHeight);
    ctx.strokeRect(wallX, wallY, wallWidth, wallHeight);
    ctx.fillStyle = 'green';
    ctx.font = '30px Arial';
    ctx.fillText(wallText, wallX + 20, wallY + wallHeight / 2);
}

function drawStickman() {
    ctx.fillStyle = stickman.color;
    ctx.fillRect(stickman.x, stickman.y, stickman.width, stickman.height);
}

function generateConfetti() {
    for (let i = 0; i < 100; i++) {
        confetti.push({
            x: stickman.x + stickman.width / 2,
            y: stickman.y,
            size: Math.random() * 5,
            color: `hsl(${Math.random() * 360}, 100%, 50%)`,
            speedX: (Math.random() - 0.5) * 5,
            speedY: Math.random() * -5
        });
    }
}

function drawConfetti() {
    confetti.forEach((particle, index) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.speedY += 0.1;  // Gravity effect

        ctx.fillStyle = particle.color;
        ctx.fillRect(particle.x, particle.y, particle.size, particle.size);

        if (particle.y > canvas.height) {
            confetti.splice(index, 1);  // Remove particle if it falls off the screen
        }
    });
}

window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowLeft':
            stickman.x -= 10;
            break;
        case 'ArrowRight':
            stickman.x += 10;
            break;
        case 'ArrowUp':
            stickman.y -= 10;
            break;
        case 'ArrowDown':
            stickman.y += 10;
            break;
        case ' ':
            generateConfetti();
            break;
    }
});

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawWall();
    drawStickman();
    drawConfetti();
    requestAnimationFrame(animate);
}

animate();
