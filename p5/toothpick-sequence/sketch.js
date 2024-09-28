var config = {
    l: 10,
};

const halfLength = config.l / 2;

const toothpicks = [];

class Toothpick {
    constructor(mid, orientation) {
        this.a = null;
        this.b = null;
        this.orientation = orientation;
        this.generated = false;


        if (orientation === -1) {
            // vertical
            this.av = createVector(mid.x, mid.y - halfLength);
            this.bv = createVector(mid.x, mid.y + halfLength);
        } else {
            // horizontal
            this.av = createVector(mid.x - halfLength, mid.y);
            this.bv = createVector(mid.x + halfLength, mid.y);
        }
    }

    generate() {
        if (this.generated) {
            if (this.a) this.a.generate();
            if (this.b) this.b.generate();
            return;
        }

        const newOrientation = this.orientation * -1;

        let validA = true;
        let validB = true;
        for (const t of toothpicks) {
            if (t === this) continue;

            if (validA && (t.av.equals(this.av) || t.bv.equals(this.av))) {
                validA = false;
            }
            if (validB && (t.av.equals(this.bv) || t.bv.equals(this.bv))) {
                validB = false;
            }
        }

        if (validA) {
            this.a = new Toothpick(this.av, newOrientation);
            toothpicks.push(this.a);
        }
        if (validB) {
            this.b = new Toothpick(this.bv, newOrientation);
            toothpicks.push(this.b);
        }

        this.generated = true;
    }

    show(gen = 0) {
        if (this.generated) {
            if (this.a) this.a.show(gen + 1);
            if (this.b) this.b.show(gen + 1);
            return;
        }

        stroke(gen % 360, 100, 255);
        line(this.av.x, this.av.y, this.bv.x, this.bv.y);
    }
}

function setup() {
    const canvas = document.querySelector('canvas');
    if (canvas) canvas.remove();
    createCanvas(window.innerWidth, window.innerHeight);
    frameRate(10);
    background(0);
    strokeWeight(3);
    colorMode(HSB);

    toothpicks[0] = new Toothpick(createVector(width / 2, height / 2), 1);
    toothpicks[0].show();
}

function draw() {
    // toothpicks[0].generate();
    // toothpicks[0].show();
}

function mousePressed() {
    toothpicks[0].generate();
    toothpicks[0].show();
}

function keyPressed() {
    if (keyCode === 32) {
        saveCanvas("print.png");
    }
}
