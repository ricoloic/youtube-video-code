var config = {
};

class Segment {
    constructor(a, b) {
        this.a = a;
        this.b = b;

        this.c = null;
        this.d = null;
        this.e = null;

        this.segments = [];

        this.generated = false;
    }

    generate() {
        if (this.generated) {
            for (const s of this.segments) {
                s.generate();
            }
            return;
        }

        this.c = createVector(
            lerp(this.a.x, this.b.x, 1 / 3),
            lerp(this.a.y, this.b.y, 1 / 3)
        );
        this.d = createVector(
            lerp(this.a.x, this.b.x, 1 / 3 * 2),
            lerp(this.a.y, this.b.y, 1 / 3 * 2)
        );
        this.e = p5.Vector
            .sub(this.d, this.c)
            .rotate(-HALF_PI / 3 * 2)
            .add(this.c);

        this.segments.push(
            new Segment(this.a, this.c)
        );
        this.segments.push(
            new Segment(this.c, this.e)
        );
        this.segments.push(
            new Segment(this.e, this.d)
        );
        this.segments.push(
            new Segment(this.d, this.b)
        );

        this.generated = true;
    }

    show() {
        if (this.generated) {
            for (const s of this.segments) {
                s.show();
            }
            return;
        }

        line(this.a.x, this.a.y, this.b.x, this.b.y);
    }
}

let segment = null;

function setup() {
    const canvas = document.querySelector('canvas');
    if (canvas) canvas.remove();
    createCanvas(window.innerWidth, window.innerHeight);
    frameRate(10);
    background(255);
    segment = new Segment(
        createVector(0, height / 2),
        createVector(width, height / 2)
    );
    segment.show();
}

function mousePressed() {
    background(255);
    segment.generate();
    segment.show();
}

function keyPressed() {
    if (keyCode === 32) {
        saveCanvas("print.png");
    }
}
