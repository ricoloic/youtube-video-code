var config = {
    maxLength: 300,
};

class Branch {
    constructor(
        start,
        angle,
        l,
    ) {
        this.start = start;
        this.end = createVector(l, 0).rotate(angle).add(start);
        this.l = l;
        this.angle = angle;
        if (l > 1) {
            this.left = new Branch(this.end, angle - QUARTER_PI, l / 5 * 4);
            this.right = new Branch(this.end, angle + QUARTER_PI, l / 7 * 3);
        }
    }

    show() {
        stroke(0);
        strokeWeight(map(this.l, 1, config.maxLength, 1, 30));
        line(this.start.x, this.start.y, this.end.x, this.end.y);
        //strokeWeight(20);
        //stroke('tomato');
        //point(this.start.x, this.start.y);
        if (this.left) {
            this.left.show();
        }

        if (this.right) {
            this.right.show();
        }
    }
}

function setup() {
    const canvas = document.querySelector('canvas');
    if (canvas) canvas.remove();
    createCanvas(window.innerWidth, window.innerHeight);
    frameRate(30);
    background(255);

    translate(width / 3 * 2, height);

    const branch = new Branch(
        createVector(0, 0),
        -HALF_PI,
        config.maxLength
    );

    branch.show();
}

function draw() {
}

function keyPressed() {
    if (keyCode === 32) {
        saveCanvas("print.png");
    }
}
