let t1, t2;
let bg = 0;
let lerpAMT = 0;

function setup() {
    const canvas = document.querySelector('canvas');
    if (canvas) canvas.remove();
    createCanvas(window.innerWidth, window.innerHeight);
    frameRate(30);

    t1 = {
        color: 0,
        x: 0,
        y: 0,
        folding: false,
    };
    t2 = {
        color: 255,
        x: width,
        y: height,
        folding: false,
    };
    
    noStroke();
}

function draw() {
    const current = t1.folding ? t1 : t2;
    const other = t1.folding ? t2 : t1;

    background(other.color);

    //fill(other.color);
    //triangle(width, 0, 0, height, other.x, other.y);

    fill(current.color);
    triangle(width, 0, 0, height,
        lerp(current.x, other.x, lerpAMT),
        lerp(current.y, other.y, lerpAMT),
    );

    lerpAMT += 0.01;
    console.log(lerpAMT);

    if (lerpAMT >= 1) {
        current.x = 0;
        current.y = 0;
        current.folding = false;
        other.x = width;
        other.y = height;
        other.folding = true;

        lerpAMT = 0;
    }
}

function keyPressed() {
    if (keyCode === 32) {
        saveCanvas("print.png");
    }
}
