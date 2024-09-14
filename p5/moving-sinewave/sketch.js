var config = {
    spacing: 30,
    radius: 100,
    count: 9,
    colors: randomPalette(),
};

let offset = 0;

function setup() {
    const canvas = document.querySelector('canvas');
    if (canvas) canvas.remove();
    createCanvas(window.innerWidth, window.innerHeight);
    frameRate(30);
}

function draw() {
    background(0);
    stroke(255);
    strokeWeight(10);

    

    let start = offset;
    let end = start + 8;

    translate(-width / config.count / 2, 0);
    for (let i = 0; i < config.count; i++) {
        translate(width / config.count, 0);
        let index = 0;
        for (let y = 0; y < height; y += config.spacing) {
            const v1 = sin(map(y, 0, height, start, end));
            const x1 = v1 * config.radius;
            const v2 = sin(map(y, 0, height, start, end + i));
            const x2 = (v2 * -1) * config.radius;
            //point(x1, y);
            //point(x2, y);
            stroke(config.colors[index % config.colors.length].color)
            line(x1, y, x2, y);
            index++;
        }
    }

    offset += 0.01;
}

function keyPressed() {
    if (keyCode === 32) {
        saveCanvas("print.png");
    }
}
