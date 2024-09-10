var config = {
    scale: 10,
    color: 6,
    particleAmount: 2000,
    particleAlfa: 10,
    showFlow: false,
    incrementZ: 0.005,
    incrementY: 0.1,
    incrementX: 0.1,
};

let halfScale = config.scale / 2;
let cols;
let rows;

const field = [];
const particles = [];

const COLOR_OPTIONS = {
    original: { key: 0, get: () => [26, 51, 43, 0.1] },
    light: { key: 1, get: () => [26, 20, 100, 0.1] },
    dark: { key: 2, get: () => [0, 0, 0, 0.1] },
    colorful: { key: 3, get: (frameCount) => [frameCount % 255, 255, 255, 0.1] },
    blue: { key: 4, get: (frameCount) => [(frameCount % 75) + 180, 255, 255, 0.1] },
    turquoise: { key: 5, get: (frameCount) => [(frameCount % 60) + 150, 255, 255, 0.1] },
    fire: { key: 6, get: (frameCount) => [(frameCount % 70) + 10, 255, 255, 0.1] },
};

let offZ = 0;

let getColor;

function setup() {
    const canvas = document.querySelector('canvas');
    if (canvas) canvas.remove();
    createCanvas(window.innerWidth, window.innerHeight);
    frameRate(30);

    cols = ceil(width / config.scale) + 1;
    rows = ceil(height / config.scale) + 1;

    getColor = Object.values(COLOR_OPTIONS).find(({ key }) => key === config.color).get;

    noiseDetail(10, 0.6);

    let offX = 0;
    for (let x = 0; x < cols; x++) {
        field[x] = [];
        let offY = 0;
        for (let y = 0; y < rows; y++) {
            const n = noise(offX, offY, offZ);
            const force = p5.Vector.fromAngle(n * TWO_PI);
            field[x][y] = new Flow(force);
            offY += config.incrementY;
        }
        offX += config.incrementX;
    }
    offZ += config.incrementZ;

    for (let i = 0; i < config.particleAmount; i++) {
        particles[i] = new Particle(createVector(random(0, width), random(0, height)));
    }
    colorMode(RGB);
    background(33);
}

function draw() {
    colorMode(RGB);
    if (config.showFlow) {
        background(33);
    }
    noStroke();
    fill(33);
    rect(0, 0, 35, 30);
    fill(255);
    text(frameRate().toFixed(), 10, 20);

    let offX = 0;
    for (let x = 0; x < cols; x++) {
        let offY = 0;
        for (let y = 0; y < rows; y++) {
            const n = noise(offX, offY, offZ);
            const force = p5.Vector.fromAngle(n * TWO_PI);
            field[x][y].applyForce(force);
            field[x][y].update();

            if (config.showFlow) {
                stroke(255);
                const xr = x * scl + halfScale;
                const yr = y * scl + halfScale;
                line(xr, yr, xr + field[x][y].force.x * scl, yr + field[x][y].force.y * scl);
            }

            offY += config.incrementY;
        }
        offX += config.incrementX;
    }
    offZ += config.incrementZ;

    colorMode(HSB);
    const c = getColor(frameCount);
    for (const p of particles) {
        p.edge();
        const x = floor(p.pos.x / config.scale);
        const y = floor(p.pos.y / config.scale);
        p.applyForce(field[x][y].force);
        p.update();
        p.show(c);
    }
}

function windowResized() {
    setup();
}

function keyPressed() {
    if (keyCode === 32) {
        saveCanvas("print.png");
    }
}
