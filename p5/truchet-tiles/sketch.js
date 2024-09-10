var Tiles = ['semicircle', 'triangle', 'line', 'arrow']

var config = {
    scl: 50,
    weight: 10,
    cols: undefined,
    rows: undefined,
    tile: 'semicircle',
    availableWidth: undefined,
    availableHeight: undefined,
};

function arrowTile(col, row) {
    const x = col * config.scl;
    const y = row * config.scl;

    const sclDiv = 100;

    push();
    translate(x, y);
    rotate(HALF_PI * floor(random(4)));
    stroke(0);
    strokeWeight(config.weight);
    noFill();
    line(
        -config.scl / 2 + config.scl / 5, -config.scl / 2 + config.scl / 5,
        config.scl / 2 - config.scl / 5, config.scl / 2 -  config.scl / 5
    );
    fill(0);
    noStroke();
    triangle(
        -config.scl / 2, -config.scl / 2,
        config.scl / sclDiv, -config.scl / 2,
        -config.scl / 2, config.scl / sclDiv,
    );
    triangle(
        config.scl / 2, config.scl / 2,
        -config.scl / sclDiv, config.scl / 2,
        config.scl / 2, -config.scl / sclDiv,
    );
    pop();
}

function lineTile(col, row) {
    const x = col * config.scl;
    const y = row * config.scl;

    push();
    translate(x, y);
    rotate(HALF_PI * floor(random(4)));
    stroke(0);
    strokeWeight(config.weight);
    noFill();
    line(
        -config.scl / 2, -config.scl / 2,
        config.scl / 2, config.scl / 2
    );
    pop();
}

function triangleTile(col, row) {
    const x = col * config.scl;
    const y = row * config.scl;

    push();
    translate(x, y);
    rotate(HALF_PI * floor(random(4)));
    fill(0);
    noStroke();
    triangle(
        -config.scl / 2, -config.scl / 2,
        config.scl / 2, config.scl / 2,
        -config.scl / 2, config.scl / 2
    );
    pop();
}

function semicircleTile(col, row) {
    const x = col * config.scl;
    const y = row * config.scl;

    push();
    translate(x, y);
    rotate(HALF_PI * floor(random(4)));
    stroke(0);
    strokeWeight(config.weight);
    noFill();
    arc(
        -config.scl / 2, -config.scl / 2,
        config.scl, config.scl,
        0, HALF_PI
    );
    arc(
        config.scl / 2, config.scl / 2,
        config.scl, config.scl,
        PI, PI + HALF_PI
    );
    pop();
}

function setup() {
    const canvas = document.querySelector('canvas');
    if (canvas) canvas.remove();
    createCanvas(window.innerWidth, window.innerHeight);
    frameRate(30);

    background(255);

    config.cols = floor(width / config.scl) - 1;
    config.rows = floor(height / config.scl) - 1;
    config.availableWidth = width - config.cols * config.scl;
    config.availableHeight = height - config.rows * config.scl;

    translate(config.scl / 2 + config.availableWidth / 2, config.scl / 2 + config.availableHeight / 2);

    for (let col = 0; col < config.cols; col++) {
        for (let row = 0; row < config.rows; row++) {
            switch (config.tile) {
                case 'triangle':
                    triangleTile(col, row);
                    break;
                case 'semicircle':
                    semicircleTile(col, row);
                    break;
                case 'line':
                    lineTile(col, row)
                    break;
                case 'arrow':
                    arrowTile(col, row);
                    break;
            }
        }
    }
}

function draw() { }

function keyPressed() {
    if (keyCode === 32) {
        saveCanvas("print.png");
    }
}
