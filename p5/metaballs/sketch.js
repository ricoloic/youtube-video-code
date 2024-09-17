var config = {
    scl: 20,
    amount: 10,
    showBalls: false,
    thresshold: 1,
};

let cols, rows;

const balls = [];
const values = [];

function setup() {
    const canvas = document.querySelector('canvas');
    if (canvas) canvas.remove();
    createCanvas(window.innerWidth, window.innerHeight);
    frameRate(30);

    noStroke();
    strokeWeight(3);

    cols = width / config.scl;
    rows = height / config.scl;

    for (let col = 0; col < cols; col++) {
        values[col] = [];
    }

    for (let i = 0; i < config.amount; i++) {
        const radius = random(30, 50);
        balls.push(new Ball(
            createVector(random(radius, width - radius), random(radius, height - radius)),
            p5.Vector.random2D().setMag(random(3, 5)),
            radius
        ));
    }
}

function draw() {
    background(0);
    
    for (let col = 0; col < cols; col++) {
        for (let row = 0; row < rows; row++) {
            const x = col * config.scl;
            const y = row * config.scl;
            let sum = 0;
            for (const ball of balls) {
                sum += ball.radius / sqrt(pow(x - ball.pos.x, 2) + pow(y - ball.pos.y, 2));
            }
            
            values[col][row] = [sum > config.thresshold ? 1 : 0, sum];
            colorMode(HSB);
            fill(sum * 150, 200, 100);
            rect(x, y, config.scl, config.scl);1
        }
    }

    for (let x = 0; x < cols - 1; x++) {
        for (let y = 0; y < rows - 1; y++) {
            const tl = values[x][y];
            const tr = values[x + 1][y];
            const br = values[x + 1][y + 1];
            const bl = values[x][y + 1];

            const _square = new Square(
                x * config.scl, y * config.scl,
                config.scl,
                [tl, tr, br, bl]
            );
            stroke(0, 0, 255);
            _square.calculate(config.thresshold);
            _square.show();
        }
    }
    noStroke();
    
    fill(0, 0, 100);
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
