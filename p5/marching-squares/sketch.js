var config = {
    scl: 10,
    thresshold: 0.6,
};

let values = [];
let grid = [];

function setup() {
    const canvas = document.querySelector('canvas');
    if (canvas) canvas.remove();
    createCanvas(window.innerWidth, window.innerHeight);
    frameRate(30);

    background(0);
    noFill();

    noiseDetail(3, 0.65);

    const cols = width / config.scl + 1;
    const rows = height / config.scl + 1;

    strokeWeight(5);
    let xoff = random(0, 190);
    for (let x = 0; x < cols; x++) {
        let yoff = 0;
        values[x] = [];
        for (let y = 0; y < rows; y++) {
            const value = noise(xoff, yoff);
            values[x][y] = [value > config.thresshold ? 1 : 0, value];

            //stroke(255, values[x][y][1] * 255);
            //point(x * config.scl, y * config.scl);
            
            yoff += 0.01;
        }
        xoff += 0.01;
    }


    stroke(255);
    strokeWeight(1);

    for (let x = 0; x < cols - 1; x++) {
        grid[x] = [];
        for (let y = 0; y < rows - 1; y++) {
            const tl = values[x][y];
            const tr = values[x + 1][y];
            const br = values[x + 1][y + 1];
            const bl = values[x][y + 1];

            grid[x][y] = new Square(
                x * config.scl, y * config.scl,
                config.scl,
                [tl, tr, br, bl]
            );
            grid[x][y].calculate(config.thresshold);

            grid[x][y].show();
        }
    }
}

function keyPressed() {
    if (keyCode === 32) {
        saveCanvas('print.png');
    }
}