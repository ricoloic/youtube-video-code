var config = {
    backgroundColor: [240, 254, 249],
    dotsColor: [212, 228, 223],
    strokeColor: [103, 99, 152],
    sinesCount: 7,
    radius: 200,
    margin: 50,
};

function setup() {
    const canvas = document.querySelector('canvas');
    if (canvas) canvas.remove();
    createCanvas(window.innerWidth, window.innerHeight);
    frameRate(30);

    background(...config.backgroundColor);

    const pos = createVector(random(config.margin + config.radius, width - config.margin - config.radius), random(config.margin + config.radius, height - config.margin - config.radius));
    fill(config.strokeColor);
    noStroke();
    circle(pos.x, pos.y, config.radius * 2);

    for (let i = 0; i < 4000; i++) {
        stroke(...config.dotsColor, random(100, 255));
        strokeWeight(random(2, 4));
        point(random(config.margin, width - config.margin), random(config.margin, height - config.margin));
    }

    noFill();
    for (let i = 0; i < config.sinesCount; i++) {
        const amplitude = random(30, 50);
        const start = random(0, 100);
        const end = start + random(5, 10);
        const amount = 6;
        const mult = random(1) > 0.5 ? -1 : 1;
        const x = random(0, width);
        for (let i = 0; i < amount; i++) {
            strokeWeight(map(i, 0, amount, 4, 0));
            const offset = map(i, 0, amount, 0, 1.3 * mult);
            const s = start + offset;
            const e = end + offset;
            for (let y = config.margin; y < height - config.margin; y++) {
                stroke(...config.strokeColor);
                const x1 = calculateX(x, y, s, e, amplitude);
                if (dist(pos.x, pos.y, x1, y) < config.radius) {
                    stroke(...config.backgroundColor);
                }
                const x2 = calculateX(x, y + 1, s, e, amplitude);
                line(x1, y, x2, y + 1);
            }
        }
    }

    noStroke();
    fill(...config.backgroundColor);
    rect(0, 0, config.margin, height);
    rect(width - config.margin, 0, config.margin, height);
    stroke(...config.strokeColor);
    strokeWeight(3);
    line(config.margin, config.margin, width - config.margin, config.margin);
    line(width - config.margin, config.margin, width - config.margin, height - config.margin);
    line(width - config.margin, height - config.margin, config.margin, height - config.margin);
    line(config.margin, height - config.margin, config.margin, config.margin);
}

function calculateX(x, y, start, end, amp) {
    const value = map(y, config.margin, height - config.margin, start, end);
    return sin(value) * amp + x;
}

function keyPressed() {
    if (keyCode === 32) {
        saveCanvas("print.png");
    }
}
