const colors = randomPalette();

var config = {
    count: 22,
    angle: undefined,
    x: undefined,
    y: undefined,
    radius: undefined,
    amount: undefined,
    spacing: undefined,
    endRadius: undefined,
    offset: undefined,
};

function circles(
    x, y,
    radius,
    amount,
    collor,
    spacing,
    weight,
    offset,
    maxAlpha,
) {
    const startRadius = radius;
    const endRadius = radius + (spacing * amount);
    strokeWeight(weight);
    const endOffset = endRadius * 0.5;
    for (let i = 0; i < amount; i++) {
        const alpha = map(i, 0, amount, 0, maxAlpha);
        const r = map(i, 0, amount, startRadius, endRadius);
        stroke(collor.r, collor.g, collor.b, alpha);
        const displacement = p5.Vector.fromAngle(config.angle).setMag(map(i, 0, amount, offset, endOffset));
        circle(x + displacement.x, y + displacement.y, r * 2);
    }
    return [endRadius, endOffset];
}

function setup() {
    const canvas = document.querySelector('canvas');
    if (canvas) canvas.remove();
    createCanvas(window.innerWidth, window.innerHeight);
    frameRate(30);

    background(0);
    noFill();

    config.angle = random(0, TWO_PI);
    config.x = random(width / 4, width - width / 4);
    config.y = random(height / 4, height - height / 4);
    config.radius = random(0, 30);
    config.amount = 20;
    config.spacing = 6 * random(1, 2);
    config.endRadius = config.radius;
    config.offset = 0;

    //for (let i = config.count - 1; i >= 0; i--) {
    for (let i = 0; i < config.count; i++) {
            [config.endRadius, config.offset] = circles(
            config.x, config.y,
            config.endRadius,
            config.amount,
            colors[i % colors.length].rgba,
            config.spacing,
            10,
            config.offset - config.spacing,
            map(i, 0, config.count, 255, random(50, 200))
        );
    }

    console.dir(config);
}

function keyPressed() {
    if (keyCode === 32) {
        saveCanvas('print.png');
    }
}