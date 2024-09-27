var config = {
    scl: 30,
};
const one = (Math.PI * 2) / 6;

const colors = [
    '#ff7b00',
    '#ff8800',
    '#ff9500',
    '#ffa200',
    '#ffaa00',
    '#ffb700',
    '#ffc300',
    '#ffd000',
    '#ffdd00',
    '#ffea00'
];

const spacing = config.scl / 13 * 6;

function setup() {
    const canvas = document.querySelector('canvas');
    if (canvas) canvas.remove();
    createCanvas(window.innerWidth, window.innerHeight);
    frameRate(30);
    background(random(colors));

    const cols = (width / config.scl) + 1;
    const rows = (height / config.scl) + (config.scl * 2);

    for (let col = 0; col < cols; col++) {
        for (let row = 0; row < rows; row++) {
            if (row % 2 === 0) {
                //rect(col * config.scl - config.scl / 2, row * config.scl, config.scl);
                hexagon(col, row, config.scl, true);
            } else {
                //rect(col * config.scl, row * config.scl, config.scl);
                hexagon(col, row, config.scl, false);
            }
        }
    }
}

function hexagon(col, row, scl, odd) {
    fill(random(colors));
    noStroke();
    const offset = odd ? -scl / 2 : 0;
    push();
    translate(col * scl + offset, row * scl - row * scl / 8);
    rotate(map(30, 0, 360, 0, TWO_PI));
    beginShape();
    for (let i = 0; i < 6; i++) {
        const angle = i * one;
        const x = cos(angle) * (spacing);
        const y = sin(angle) * (spacing);
        vertex(x, y);
    }
    endShape();
    pop();
}

function keyPressed() {
    if (keyCode === 32) {
        saveCanvas("print.png");
    }
}
