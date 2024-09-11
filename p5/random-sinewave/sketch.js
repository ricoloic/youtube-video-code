var config = {
    backgroundColor: [240, 254, 249],
    dotsColor: [212, 228, 223],
    strokeColor: [103, 98, 153],
};

function randomSine() {
    const lines = [];
    const randomX = random(0, width);
    let start = random(0, 100);
    let end = start + random(5, 10);
    const amount = 6;
    const negative = random(1) > 0.5 ? -1 : 1;
    for (let i = 0; i < amount; i++) {
        const offset = map(i, 0, amount, 0, amount * 0.1) * negative;
        const l = [];
        for (let y = 0; y < height; y++) {
            const value = map(y, 0, height, start + offset, end + offset);
            const x = sin(value) * 100;
            l.push(createVector(x + randomX, y));
        }
        lines.push(l);
    }
    return lines;
}

function drip(pos, radius) {
    const size = random(100, height - pos.y - radius);
    const x = random(pos.x - radius + radius / 4, pos.x + radius - radius / 4);
    const y = random(pos.y, height - size);
    line(x, y, x, y + size);
}

function setup() {
    const canvas = document.querySelector('canvas');
    if (canvas) canvas.remove();
    createCanvas(window.innerWidth, window.innerHeight);
    frameRate(30);

    const margin = 50;

    background(...config.backgroundColor);

    for (let i = 0; i < 3000; i++) {
        stroke(...config.dotsColor, random(100, 255));
        strokeWeight(random(1, 3));
        point(random(width), random(height));
    }

    const radius = 200;
    const pos = createVector(random(radius * 2, width - radius * 2), random(radius * 2, height - radius * 2));

    //const amount = random(10, 30);
    //for (let i = 0; i < amount; i++) {
    //    stroke(103, 98, 153, random(100, 255));
    //    strokeWeight(random(2, 3));
    //    drip(pos, radius);
    //}

    fill(...config.strokeColor, 255);
    strokeWeight(3)
    stroke(...config.strokeColor);
    circle(pos.x, pos.y, radius * 2);

    for (let i = 0; i < 2000; i++) {
        stroke(...config.dotsColor, random(100, 255));
        strokeWeight(random(1, 3));
        const v = p5.Vector.random2D().setMag(radius * sqrt(random()));
        point(pos.x + v.x, pos.y + v.y);
    }
    noFill();
    strokeWeight(3)
    stroke(...config.strokeColor);
    circle(pos.x, pos.y, radius * 2);

    let sines = [];
    const sineAmount = ceil(random(6, 10));
    for (let i = 0; i < sineAmount; i++) {
        sines.push(randomSine());
    }

    noFill();
    for (const lines of sines) {
        for (let i = 0; i < lines.length; i++) {
            strokeWeight(map(i, 0, lines.length, 3, 0));
            for (let j = 0; j < lines[i].length; j += 2) {
                stroke(...config.strokeColor);
                const v1 = lines[i][j];
                const v2 = lines[i][j + 1];
                if (p5.Vector.dist(pos, v1) < radius) {
                    stroke(...config.backgroundColor);
                }
                line(v1.x, v1.y, v2.x, v2.y);
            }
        }
    }

    fill(...config.backgroundColor);
    noStroke();
    rect(0, 0, width, margin);
    rect(width - margin, 0, margin, height);
    rect(0, height - margin, width, margin);
    rect(0, 0, margin, height);
    strokeWeight(4);
    stroke(...config.strokeColor);
    line(margin, margin, width - margin, margin);
    line(width - margin, margin, width - margin, height - margin);
    line(width - margin, height - margin, margin, height - margin);
    line(margin, margin, margin, height - margin);
}

function keyPressed() {
    if (keyCode === 32) {
        saveCanvas("print.png");
    }
}
