var config = {
    colors: randomPalette(),
};

function setup() {
    const canvas = document.querySelector('canvas');
    if (canvas) canvas.remove();
    createCanvas(window.innerWidth, window.innerHeight);
    frameRate(30);

    background(33);

    noFill();
    stroke(255);
    strokeWeight(3);

    translate(width / 2, width / 2);

    const mult = 7;

    for (let i = 1; i < 35; i++) {
        strokeWeight(map(i, 1, 35, 5, 2));
        stroke(config.colors[i % config.colors.length].color)
        beginShape();
        for (let x = -width / 2; x < 0; x++) {
            if (x === 0) continue;

            const mapped = map(x, -width / 2, width / 2, -1, 1);
            const y = reciprocal(i, mapped) * mult;

            vertex(x, y);
        }
        endShape();
        beginShape();
        for (let x = 0.1; x < width / 2; x++) {
            if (x === 0) continue;

            const mapped = map(x, 0, width / 2, 0, 1);
            const y = reciprocal(i, mapped) * mult;

            vertex(x, y);
        }
        endShape();
    }
}

function reciprocal(num, x) {
    return num / x;
}

function keyPressed() {
    if (keyCode === 32) {
        saveCanvas("print.png");
    }
}
