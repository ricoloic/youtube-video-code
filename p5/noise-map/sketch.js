var config = {
    scl: 50,
};

let cols, rows;

let zoff = 0;

function setup() {
    const canvas = document.querySelector('canvas');
    if (canvas) canvas.remove();
    createCanvas(window.innerWidth, window.innerHeight);
    frameRate(30);

    cols = width / config.scl;
    rows = height / config.scl;

    colorMode(HSB);
}

function draw() {
    let xoff = 0;
    for (let col = 0; col < cols; col++) {
        yoff = 0;
        for (let row = 0; row < rows; row++) {
            const hue = noise(xoff, yoff, zoff) * 360;
            fill(hue, 100, 200);
            rect(col * config.scl, row * config.scl, config.scl, config.scl);
            yoff += 0.05;
        }
        xoff += 0.05;
    }

    zoff += 0.01;
}

function keyPressed() {
    if (keyCode === 32) {
        saveCanvas("print.png");
    }
}
