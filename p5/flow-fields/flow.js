class Flow {
    constructor(force) {
      this.force = force.setMag(1);
    }
  
    applyForce(force) {
      this.force.add(force);
    }
  
    update() {
      this.force.setMag(1);
    }
  
    applyNeighbour(neighbours) {
      const force = createVector();
      for (let i = 0; i < neighbours.length; i++) {
        force.add(neighbours[i].force);
      }
      this.applyForce(force);
    }
  }