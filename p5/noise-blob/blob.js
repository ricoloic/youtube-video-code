function Blob(pos, vel, radius, color) {
    this.pos = pos;
    this.vel = vel;
    this.radius = radius;
    this.color = {
        r: unhex(color.slice(0, 2)),
        g: unhex(color.slice(2, 4)),
        b: unhex(color.slice(4, 6)),
    };
    this.offset = random(30, 1000);
    this.offsetTime = 0;
}

Blob.prototype.update = function () {
    this.pos.add(this.vel);
    this.offsetTime += 0.005;
}

Blob.prototype.show = function () {
    stroke(33);
    strokeWeight(3);
    fill(this.color.r, this.color.g, this.color.b, 100);
    beginShape();
    for (let i = 0; i < TAU + 0.001; i += TAU / 25) {
        let x = cos(i);
        let y = sin(i);
        
        const noiseFactor = noise(this.offset + x * 0.5, this.offset + y * 0.5, this.offsetTime);
        const radius = map(noiseFactor, 0, 1, this.radius / 3, this.radius);
        
        x *= radius;
        y *= radius;
        x += this.pos.x;
        y += this.pos.y;
    
        curveVertex(x, y);
    }
    endShape(CLOSE);
}
