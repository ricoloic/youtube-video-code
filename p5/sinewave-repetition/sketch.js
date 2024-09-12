var config = {
    sectionCount: 10,
    colors: randomPalette(),
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

    for (let i = 0; i < config.sectionCount; i++) {
        const y = scl * (i + 1);
        let colorIndex = 0;
        const start = random(0, 100);
        const end = start + random(20, 30);
        for (let x = 0; x < width; x += 20) {
            const v = map(x, 0, width, start, end);
            const radius = map(sin(v), -1, 1, 0.5, 1) * 100 + random(-10, 20);
            fill(config.colors[colorIndex % config.colors.length].color);
            arc(x, y, radius*2, radius*2, PI, TWO_PI);
            point(x, y - radius);
            colorIndex++;
        }
        line(0, y, width, y);
    }
}

function keyPressed() {
    if (keyCode === 32) {
        saveCanvas("print.png");
    }
}
