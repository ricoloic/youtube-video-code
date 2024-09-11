var config = {
    scale: 100,
    mult: 9,
    maxTerrainHeight: 100,
    divider: 3,
    fillColor: '272640',
    strokeColor: 'f72585',
    skyColor: '#221E43',
};

let planeW, planeH;
let cols, rows;
let plane;
let font;

function preload() {
    font = loadFont('../../assets/fonts/SummerFavourite.otf');
}

function setup() {
    const canvas = document.querySelector('canvas');
    if (canvas) canvas.remove();
    createCanvas(window.innerWidth, window.innerHeight, WEBGL);
    frameRate(30);

    planeW = width * 3;
    planeH = height * 5;
    cols = planeW / config.scale;
    rows = planeH / config.scale;

    let xoff = 0;
    let yoff = 102304;
    plane = Array.from({ length: cols })
    for (let x = 0; x < cols + 1; x++) {
        plane[x] = [];
        let mult = config.maxTerrainHeight;
        let xinc = 0.1;
        let yinc = 0.35;
        if (x < cols / config.divider) {
            const amt = map(x, 0, cols / config.divider, 1, 0);
            mult = lerp(config.maxTerrainHeight, config.maxTerrainHeight * config.mult, amt);
            yinc = lerp(0.5, 0.35, amt);
            xinc = lerp(0.25, 0.1, amt);
        } else if (x > cols - cols / config.divider) {
            const amt = map(x, cols - cols / config.divider, cols, 0, 1);
            mult = lerp(config.maxTerrainHeight, config.maxTerrainHeight * config.mult, amt);
            yinc = lerp(0.5, 0.35, amt);
            xinc = lerp(0.25, 0.1, amt);
        }
        for (let y = 0; y < rows; y++) {
            plane[x][y] = noise(yoff, xoff) * mult;
            yoff += yinc;
        }
        xoff += xinc;
    }

    background(config.skyColor);

    const moveZ = planeH;
    const moveY = planeH / 2;
    translate(0, -moveY, -moveZ);
    fill('#ffbd00');
    beginShape();
    for (let a = 0; a < TAU; a += 0.01) {
        vertex(cos(a) * planeH / 2, sin(a) * planeH / 2);
    }
    endShape(CLOSE);
    noStroke();
    fill(config.skyColor);
    rect(-10_000 / 2, -300, 10_000, 500);
    rect(-10_000 / 2, 500, 10_000, 300);
    rect(-10_000 / 2, 1000, 10_000, 200);
    rect(-10_000 / 2, 1500, 10_000, 100);
    rect(-10_000 / 2, 0, 10_000, 100);
    //beginShape();
    //for (let a = 0; a < TAU; a += 0.01) {
    //    vertex(cos(a) * planeH / 5 - planeH / 4, sin(a) * planeH / 5);
    //}
    //endShape(CLOSE);
    //beginShape();
    //for (let a = 0; a < TAU; a += 0.01) {
    //    vertex(cos(a) * planeH / 5 + planeH / 4, sin(a) * planeH / 5);
    //}
    //endShape(CLOSE);
    //fill('#ffbd00');
    //beginShape();
    //for (let a = 0; a < TAU; a += 0.01) {
    //    vertex(cos(a) * planeH / 10 - planeH / 4, sin(a) * planeH / 10 + planeH / 45);
    //}
    //endShape(CLOSE);
    //beginShape();
    //for (let a = 0; a < TAU; a += 0.01) {
    //    vertex(cos(a) * planeH / 10 + planeH / 4, sin(a) * planeH / 10 + planeH / 45);
    //}
    //endShape(CLOSE);
    translate(0, moveY, moveZ);


    const fillColor = {
        r: unhex(config.fillColor.slice(0, 2)),
        g: unhex(config.fillColor.slice(2, 4)),
        b: unhex(config.fillColor.slice(4, 6)),
    };
    const strokeColor = {
        r: unhex(config.strokeColor.slice(0, 2)),
        g: unhex(config.strokeColor.slice(2, 4)),
        b: unhex(config.strokeColor.slice(4, 6)),
    };
    fill(fillColor.r, fillColor.g, fillColor.b, 255);
    //noFill();
    stroke(strokeColor.r, strokeColor.g, strokeColor.b, 255);
    strokeWeight(2);
    //noStroke();
    rotateX(HALF_PI - HALF_PI / 5);
    translate(-planeW / 2, -planeH / 2, -150);
    for (let y = 0; y < rows; y++) {
        beginShape(TRIANGLE_STRIP);
        for (let x = 0; x < cols; x++) {
            vertex(
                x * config.scale, y * config.scale,
                plane[x][y],
            );
            vertex(
                (x) * config.scale, (y + 1) * config.scale,
                plane[x][y + 1],
            );
        }
        endShape();
    }
    translate(planeW / 2, planeH / 2, 150);
    rotateX(HALF_PI + HALF_PI / 5 + PI);

    translate(0, 0, 500);
    stroke(255);
    fill(255);
    textFont(font);
    textSize(72);
    textAlign(CENTER);
    text('Vaporwave', 0, 0);
}


function keyPressed() {
    if (keyCode === 32) {
        saveCanvas("print.png");
    }
}
