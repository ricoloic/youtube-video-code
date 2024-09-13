var config = {
    colors: COLOR_PALETTES.deep, //randomPalette(),
};

function setup() {
    const canvas = document.querySelector('canvas');
    if (canvas) canvas.remove();
    createCanvas(window.innerWidth, window.innerHeight);
    frameRate(30);

    background(33);
    noStroke();

    const rows = 10;
    const gap = height / rows;

    for (let i = 0; i < rows; i++) {
        for (let x = 0; x < width; x += random(10, 40)) {
            const c1 = config.colors[i % config.colors.length].rgba;
            const c2 = config.colors[(i + 1) % config.colors.length].rgba;
            const c = lerpColor(color(c1.r, c1.g, c1.b), color(c2.r, c2.g, c2.b), map(x, 0, width, 0, 1));
            stroke(c);
            strokeWeight(random(1, 3));
            fill(lerpColor(c, color(0, 0, 0, random(0, 200)), random(0, 1)));
            const lower = random(0, 20);
            const upper = lower + random(20, 50);
            const angle = map(x, 0, width, lower, upper);
            const y = map(sin(angle), -1, 1, -0.25, -1.25) * 100 * lerp(1, 3, map(i, 0, rows, 0, 1));
            arc(x, gap * (i + 1), y, y, PI, TWO_PI)
        }
    }

    // line(0, height / 2, width, height / 2);
}

function keyPressed() {
    if (keyCode === 32) {
        saveCanvas("print.png");
    }
}
