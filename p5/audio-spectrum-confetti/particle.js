class Particle {
    constructor(pos, vel, lifetime, c, weight) {
        this.color = c;
        this.pos = pos;
        this.vel = vel;
        this.initialLifetime = lifetime;
        this.lifetime = lifetime;
        this.weight = weight;
    }

    update() {
        this.pos.add(this.vel);
        this.vel.mult(0.99);
        this.lifetime--;
    }

    show() {
        stroke(this.color.r, this.color.g, this.color.b, map(this.lifetime, 0, this.initialLifetime, 0, 255));
        strokeWeight(map(this.lifetime, 0, this.initialLifetime, 1, this.weight));
        point(this.pos.x, this.pos.y);
    }
}