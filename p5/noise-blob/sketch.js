var config = {
    amount: 200,
};

const colors = ["cdb4db","ffc8dd","ffafcc","bde0fe","a2d2ff"];

const blobs = [];

function setup() {
    const canvas = document.querySelector('canvas');
    if (canvas) canvas.remove();
    createCanvas(window.innerWidth, window.innerHeight);
    frameRate(30);
}

function draw() {
    background(33);
    for (let i = blobs.length - 1; i >= 0; i--) {
        blobs[i].update();
        blobs[i].show();

        const pos = blobs[i].pos;
        const radius = blobs[i].radius;
        if (pos.x < -radius || pos.x > width + radius || pos.y < -radius) {
            blobs.splice(i, 1);
        }
    }
    
    if (frameCount % 15 === 0 && blobs.length < config.amount) {
        const radius = random(50, 250);
        const pos = createVector(random(0, width), height + radius);
        const vel = createVector(random(-1, 1), random(-1, -3));
        blobs.push(new Blob(pos, vel, radius, random(colors)));
    }
}

function keyPressed() {
    if (keyCode === 32) {
        saveCanvas("print.png");
    }
}
