var config = {
    scl: 15,
    showBalls: false,
};

const balls = [];

let cols, rows;

function setup() {
    const canvas = document.querySelector('canvas');
    if (canvas) canvas.remove();
    createCanvas(window.innerWidth, window.innerHeight);
    frameRate(30);

    cols = width / config.scl;
    rows = height / config.scl;

    noStroke();
    for (let i = 0; i < 10; i++) {
        const radius = random(30, 50);
        balls.push(new Ball(
            createVector(random(radius, width - radius), random(radius, height - radius)),
            p5.Vector.random2D().setMag(random(1, 5)),
            radius
        ));
    }

    pixelDensity(1);
}

function draw() {
    background(0);

    for (let col = 0; col < cols; col++) {
        for (let row = 0; row < rows; row++) {
            const x = col * config.scl;
            const y = row * config.scl;
            let sum = 0;
            for (const ball of balls) {
                const xdif = x - ball.pos.x;
                const ydif = y - ball.pos.y;
                sum += ball.radius / sqrt(xdif * xdif + ydif * ydif);
            }

            const alpha = sum * 150;
            fill(alpha, 200, 90, alpha);
            rect(x, y, config.scl, config.scl);
        }
    }

    fill(255, 100);
    for (const ball of balls) {
        ball.update();
        if (config.showBalls) ball.show();
    }
}

function keyPressed() {
    if (keyCode === 32) {
        saveCanvas("print.png");
    }
}
