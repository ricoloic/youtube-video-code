class Ball {
    constructor(pos, vel, radius) {
        this.pos = pos;
        this.vel = vel;
        this.radius = radius;
        this.diameter = radius * 2;
    }

    update() {
        this.pos.add(this.vel);

        if (this.pos.x < this.radius || this.pos.x > width - this.radius) {
            this.vel.x *= -1;
        }

        if (this.pos.y < this.radius || this.pos.y > height - this.radius) {
            this.vel.y *= -1;
        }
    }

    show() {
        circle(this.pos.x, this.pos.y, this.diameter);
    }
}