class Explosion {
    constructor(pos, c, maxLifetime, amount, weight, v, a) {
        this.pos = pos;
        this.particles = [];
        this.lifetime = 0;
        for (let i = 0; i < amount; i++) {
            const lifetime = random(1, maxLifetime);
            if (lifetime > this.lifetime) this.lifetime = lifetime;
            const vel = p5.Vector.fromAngle(random(0, TWO_PI)).mult(v);
            this.particles.push(new Particle(pos.copy(), vel, lifetime, c, weight));
        }
        this.finished = false;
    }

    update() {
        if (this.lifetime > 0) {
            for (const p of this.particles) {
                p.update();
            }
            this.lifetime--;
        } else {
            this.finished = true;
        }
    }

    show() {
        if (this.lifetime > 0) {
            for (const p of this.particles) {
                p.show();
            }
        }
    }
}

