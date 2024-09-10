var config = {
    rule: 30,
    mapping: [
        [1, 1, 1],
        [1, 1, 0],
        [1, 0, 1],
        [1, 0, 0],
        [0, 1, 1],
        [0, 1, 0],
        [0, 0, 1],
        [0, 0, 0]
    ],
    colors: [
        "#001219",
        "#005f73",
        "#0a9396",
        "#94d2bd",
        "#e9d8a6",
        "#ee9b00",
        "#ca6702",
        "#bb3e03",
        "#ae2012",
        "#9b2226"
    ],
    scl: 2,
    generation: 0,
};
let looping = true

const rules = config.rule
    .toString(2)
    .padStart(8, '0')
    .split('')
    .map((e) => parseInt(e));

let cells = [];
let actual;
let amount;

function generate() {
    const next = Array.from({ length: cells.length })
    for (let i = 0; i < cells.length; i++) {
        const left = i === 0 ? cells[cells.length - 1][0] : cells[i - 1][0];
        const middle = cells[i][0];
        const right = i === cells.length - 1 ? cells[0][0] : cells[i + 1][0];

        const index = config.mapping.findIndex(([a, b, c]) => {
            return a === left && b === middle && c === right;
        });
        next[i] = [rules[index], config.colors[index]];
    }

    return next;
}

function setup() {
    const canvas = document.querySelector('canvas');
    if (canvas) canvas.remove();
    createCanvas(window.innerWidth, window.innerHeight);
    frameRate(15);
    noStroke();

    actual = floor(height / config.scl) * config.scl;
    amount = floor(width / config.scl);
    for (let i = 0; i < amount; i++)
        cells[i] = [0, 0];
    cells[floor(cells.length / 2)] = [1, 0];


    background(255);
}


function draw() {
    if (config.generation * config.scl >= actual) {
        copy(0, 0, width, height, 0, -config.scl, width, height);
    } else {
        config.generation++;
    }

    const generationScale = (config.generation - 1) * config.scl - config.scl;
    for (let i = 0; i < amount; i++) {
        fill(cells[i][1]);
        rect(i * config.scl, generationScale, config.scl, config.scl);
    }
    cells = generate();
}

function mousePressed() {
    if (looping) noLoop();
    else loop();
    looping = !looping;
}