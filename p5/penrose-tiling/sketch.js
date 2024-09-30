const TYPES = {
    1: {
        color: '#ffafcc',
        angle: 2 * (Math.PI / 5),
    },
    2: {
        color: '#bde0fe',
        angle: Math.PI / 5,
    },
    3: {
        color: '#ffc8dd',
        angle: 2 * (Math.PI / 5),
    },
    4: {
        color: '#a2d2ff',
        angle: Math.PI / 5,
    }
};


function apex(a, b, type) {
    const d = createVector(
        lerp(a.x, b.x, 0.5),
        lerp(a.y, b.y, 0.5),
    );
    const opposite = p5.Vector.dist(b, d);
    const bisector = opposite / tan(PI - HALF_PI - TYPES[type].angle);
    return p5.Vector
        .sub(b, d)
        .rotate(-HALF_PI)
        .setMag(bisector)
        .add(d);
}

class PenroseTriangle {
    constructor(a, b, c, type) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.type = type;

        this.subdivided = false;
        this.subdivisions = [];
    }

    subdivide() {
        if (this.subdivided) {
            for (const pt of this.subdivisions) {
                pt.subdivide();
            }
            return;
        }

        if (this.type === 1) {
            this.subdivisions[0] = new PenroseTriangle(
                this.c, this.a, apex(this.c, this.a, 4), 4
            );
            this.subdivisions[1] = new PenroseTriangle(
                this.b, this.subdivisions[0].c, this.a, 1
            );
        } else if (this.type === 2) {
            this.subdivisions[0] = new PenroseTriangle(
                this.b, this.c, apex(this.b, this.c, 2), 2
            );
            this.subdivisions[1] = new PenroseTriangle(
                this.a, this.subdivisions[0].c, apex(this.a, this.subdivisions[0].c, 4), 4
            );
            this.subdivisions[2] = new PenroseTriangle(
                this.c, this.subdivisions[1].c, this.subdivisions[1].b, 1
            );
        } else if (this.type === 3) {
            this.subdivisions[0] = new PenroseTriangle(
                this.b, this.c, apex(this.b, this.c, 2), 2
            );
            this.subdivisions[1] = new PenroseTriangle(
                this.subdivisions[0].c, this.a, this.b, 3
            );
        } else if (this.type === 4) {
            this.subdivisions[0] = new PenroseTriangle(
                this.c, this.a, apex(this.c, this.a, 4), 4
            );
            this.subdivisions[1] = new PenroseTriangle(
                this.subdivisions[0].c, this.b, apex(this.subdivisions[0].c, this.b, 2), 2
            );
            this.subdivisions[2] = new PenroseTriangle(
                this.subdivisions[1].c, this.c, this.subdivisions[1].a, 3
            );
        }
        this.subdivided = true;
    }

    show() {
        if (this.subdivided) {
            for (const pt of this.subdivisions) {
                pt.show();
            }
            return;
        }

        fill(TYPES[this.type].color);
        triangle(this.a.x, this.a.y, this.b.x, this.b.y, this.c.x, this.c.y);
    }
}

let t;

function setup() {
    const canvas = document.querySelector('canvas');
    if (canvas) canvas.remove();
    createCanvas(window.innerWidth, window.innerHeight);
    frameRate(10);
    background(255);
    noFill();
    noStroke();
    const a = createVector(100, height / 3 * 2);
    const b = createVector(width - 100, height / 3 * 2);
    t = new PenroseTriangle(
        a, b, apex(a, b, 2), 2
    );
    t.show();
}

function mousePressed() {
    background(255);
    t.subdivide();
    t.show();
}

function keyPressed() {
    if (keyCode === 32) {
        saveCanvas("print.png");
    }
}
