var config = {
    scl: 100,
};

const colors = [
    '#000000',
    '#323232',
    '#F60100',
    '#283E4E',
    "#465D75",
];

let cols, rows;

function setup() {
    const canvas = document.querySelector('canvas');
    if (canvas) canvas.remove();
    createCanvas(window.innerWidth, window.innerHeight);
    frameRate(30);

    cols = width / config.scl;
    rows = height / config.scl;

    for (let col = 0; col < cols; col++) {
        for (let row = 0; row < rows; row++) {
            const x = col * config.scl;
            const y = row * config.scl;
            random([
                arcs, arcs,
                filledArc, filledArc,
                empty
            ])(x, y, config.scl, random() > 0.5);
        }
    }

}

function empty() {

}

function arcs(x, y, scl, withBg) {
    if (withBg) {
        noStroke();
        fill(random(colors));
        rect(x, y, scl, scl);
    }

    const spacing = random(6, 9);
    const start = 0;
    const end = HALF_PI;
    fill(255);
    stroke(0);

    push();
    translate(x + scl / 2, y + scl / 2);
    rotate(random([0, HALF_PI, PI, PI + HALF_PI]));
    for (let i = scl * 2; i >= 0; i -= spacing) {
        arc(-scl / 2, -scl / 2, i, i, start, end);
    }
    pop();
}

function filledArc(x , y, scl, withBg) {
    const color = random(colors);
    if (withBg) {
        noStroke();
        fill(random([...colors].filter((c) => c !== color)));
        rect(x, y, scl, scl);
    }

    const start = 0;
    const end = HALF_PI;
    fill(color);
    noStroke();

    push();
    translate(x + scl / 2, y + scl / 2);
    rotate(random([0, HALF_PI, PI, PI + HALF_PI]));

    arc(-scl / 2, -scl / 2, scl * 2, scl * 2, start, end);
    pop();
}

function draw() {
}

function keyPressed() {
    if (keyCode === 32) {
        saveCanvas("print.png");
    }
}
