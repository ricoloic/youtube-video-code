var config = {
    scl: 10,
};

const list = [
    ' ',
    '`',
    '.',
    '\'',
    '-',
    '*',
    'H',
    '@',
    '#'
];

let img;

function preload() {
    img = loadImage('./image2.png');
}

function setup() {
    const canvas = document.querySelector('canvas');
    if (canvas) canvas.remove();
    createCanvas(window.innerWidth, window.innerHeight);
    frameRate(30);

    //image(img, 0, 0, img.width, img.height);

    //textSize();
    noStroke();
    background(0);
    fill(255);

    for (let x = 0; x < img.width - config.scl; x += config.scl) {
        for (let y = 0; y < img.height - config.scl; y += config.scl) {
            let l = 0;

            for (let i = 0; i < config.scl; i++) {
                for (let j = 0; j < config.scl; j++) {
                    const [r, g, b] = img.get(x + i, y + j);
                    //console.log(r, g, b)
                    l += (r + g + b) / 3;
                }
            }
            l /= config.scl * config.scl;

            const index = floor(map(l, 0, 255, 0, list.length));

            text(list[index], x, y);

            //fill(l);
            //rect(x, y, config.scl, config.scl);
        }
    }
}

function keyPressed() {
    if (keyCode === 32) {
        saveCanvas("print.png");
    }
}
