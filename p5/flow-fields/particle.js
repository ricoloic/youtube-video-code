class Particle {
    constructor(pos) {
      this.pos = pos;
      this.prev = pos.copy();
      this.vel = createVector();
      this.acc = createVector();
    }
  
    applyForce(force) {
      this.acc.add(force);
    }
  
    update() {
      this.prev.set(this.pos.x, this.pos.y);
      this.vel.add(this.acc);
      this.vel.limit(3);
      this.pos.add(this.vel);
      this.acc.mult(0);
    }
  
    edge() {
      if (this.pos.x < 0) this.pos.x = width;
      else if (this.pos.x > width) this.pos.x = 0;
      if (this.pos.y < 0) this.pos.y = height;
      else if (this.pos.y > height) this.pos.y = 0;
    }
  
    show(c) {
      stroke(...c);
      line(this.pos.x, this.pos.y, this.prev.x, this.prev.y);
    }
  }