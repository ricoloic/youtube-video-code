var config = {
    sectionCount: 10,
    colors: COLOR_PALETTES.deep, //randomPalette(),
};

function setup() {
    const canvas = document.querySelector('canvas');
    if (canvas) canvas.remove();
    createCanvas(window.innerWidth, window.innerHeight);
    frameRate(30);

    background(33);

    stroke(255);
    noFill();
    noStroke();

    const scl = height / (config.sectionCount);

    let colorIndex = 0;
    for (let i = 0; i < config.sectionCount; i++) {
        const y = scl * (i + 1);
        const nextColorIndex = colorIndex + 1
        const start = random(0, 100);
        const end = start + random(20, 30);
        for (let x = 0; x < width; x += 20) {
            const amt = random(0, 1);
            const alpha = random(180, 255);
            const c1 = config.colors[colorIndex % config.colors.length].rgba;
            const c2 = config.colors[nextColorIndex % config.colors.length].rgba;
            const c = lerpColor(color(c1.r, c1.g, c1.b, alpha), color(c2.r, c2.g, c2.b, alpha), amt);
            const v = map(x, 0, width, start, end);
            const radius = map(sin(v), -1, 1, 0.5, 1) * 100 + random(-10, 20) * map(i, 0, config.sectionCount, 1, 7);
            fill(c);
            arc(x, y, radius*2, radius*2, PI, TWO_PI);
            point(x, y - radius);
        }
        line(0, y, width, y);
        colorIndex++;
    }
}

function keyPressed() {
    if (keyCode === 32) {
        saveCanvas("print.png");
    }
}
