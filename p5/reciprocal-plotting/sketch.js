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
    translate(width / 2, height / 2);
    for (let i = 1; i < 100; i += 1) {
        console.log(config.colors[i % config.colors.length]);
        stroke(config.colors[i % config.colors.length].color);
        strokeWeight(map(i, 1, 100, 5, 1));
        beginShape();
        for (let x = -width / 2; x < 0; x++) {
            if (x === 0) continue;
            const y = reciprocal(i, map(x, -width / 2, 0, -1, 0));
            vertex(x, y);
        }
        endShape();
        beginShape();
        for (let x = 0.1; x < width / 2; x++) {
            if (x === 0) continue;
            const y = reciprocal(i, map(x, 0, width / 2, 0, 1));
            vertex(x, y);
        }
        endShape();
    }
}

function reciprocal(num, x) {
    return num / x * 2;
}

function keyPressed() {
    if (keyCode === 32) {
        saveCanvas("print.png");
    }
}
