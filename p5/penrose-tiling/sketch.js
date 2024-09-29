var config = {
};

const colors = [
    '#a2d2ff',
    '#bde0fe',
    '#ffafcc',
    '#ffc8dd'
]

class IsosceleTriangle {
    constructor(a, b, commonAngle) {
        const baseLength = p5.Vector.dist(a, b);
        const bisectorLength = (baseLength / 2) / tan(PI - commonAngle - HALF_PI);
        const d = createVector(lerp(a.x, b.x, 0.5), lerp(a.y, b.y, 0.5));
        this.a = a;
        this.b = b;
        this.c = p5.Vector
            .sub(d, a)
            .setMag(bisectorLength)
            .rotate(-HALF_PI)
            .add(d);
    }
}

class Thin1 extends IsosceleTriangle {
    constructor(a, b, type) {
        super(a, b, 2 * (PI / 5));
        this.triangles = [];
        this.substituted = false;
    }

    substitute() {
        if (this.substituted) {
            for (const t of this.triangles) {
                t.substitute();
            }
            return;
        }

        this.triangles[0] = new Thick2(this.c, this.a);
        this.triangles[1] = new Thin1(this.b, this.triangles[0].c);
        this.substituted = true;
    }

    show() {
        if (this.substituted) {
            for (const t of this.triangles) {
                t.show();
            }
            return;
        }

        fill(colors[1]);
        triangle(this.a.x, this.a.y, this.b.x, this.b.y, this.c.x, this.c.y);
    }
}

class Thin2 extends IsosceleTriangle {
    constructor(a, b, type) {
        super(a, b, 2 * (PI / 5));
        this.triangles = [];
        this.substituted = false;
    }

    substitute() {
        if (this.substituted) {
            for (const t of this.triangles) {
                t.substitute();
            }
            return;
        }

        this.triangles[0] = new Thick1(this.b, this.c);
        this.triangles[1] = new Thin2(this.triangles[0].c, this.a);
        this.substituted = true;
    }

    show() {
        if (this.substituted) {
            for (const t of this.triangles) {
                t.show();
            }
            return;
        }

        fill(colors[0]);
        triangle(this.a.x, this.a.y, this.b.x, this.b.y, this.c.x, this.c.y);
    }
}

class Thick1 extends IsosceleTriangle {
    constructor(a, b) {
        super(a, b, PI / 5);
        this.triangles = [];
        this.substituted = false;
    }

    substitute() {
        if (this.substituted) {
            for (const t of this.triangles) {
                t.substitute();
            }
            return;
        }

        this.triangles[0] = new Thick1(this.b, this.c);
        this.triangles[1] = new Thick2(this.a, this.triangles[0].c);
        this.triangles[2] = new Thin1(this.triangles[0].b, this.triangles[1].c);
        this.substituted = true;
    }

    show() {
        if (this.substituted) {
            for (const t of this.triangles) {
                t.show();
            }
            return;
        }

        fill(colors[2]);
        triangle(this.a.x, this.a.y, this.b.x, this.b.y, this.c.x, this.c.y);
    }
}

class Thick2 extends IsosceleTriangle {
    constructor(a, b) {
        super(a, b, PI / 5);
        this.triangles = [];
        this.substituted = false;
    }

    substitute() {
        if (this.substituted) {
            for (const t of this.triangles) {
                t.substitute();
            }
            return;
        }

        this.triangles[0] = new Thick2(this.c, this.a);
        this.triangles[1] = new Thick1(this.triangles[0].c, this.b);
        this.triangles[2] = new Thin2(this.triangles[1].c, this.triangles[0].a);
        this.substituted = true;
    }

    show() {
        if (this.substituted) {
            for (const t of this.triangles) {
                t.show();
            }
            return;
        }

        fill(colors[3]);
        triangle(this.a.x, this.a.y, this.b.x, this.b.y, this.c.x, this.c.y);
    }
}

let tiling;

function setup() {
    const canvas = document.querySelector('canvas');
    if (canvas) canvas.remove();
    createCanvas(window.innerWidth, window.innerHeight);
    frameRate(10);
    background(255);

    noFill();
    noStroke();
    tiling = new Thick1(
        createVector(100, height / 3 * 2),
        createVector(width - 100, height / 3 * 2),
    );
    tiling.show();
}

function mousePressed() {
    background(255);
    tiling.substitute();
    tiling.show();
}

function keyPressed() {
    if (keyCode === 32) {
        saveCanvas("print.png");
    }
}
