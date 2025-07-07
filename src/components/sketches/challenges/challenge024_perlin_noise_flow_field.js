export const perlinFlowFieldSketch = (p) => {
  let inc = 0.5;
  let scl = 10;
  let cols, rows;
  let zoff = 0;

  let particles = [];
  let flowfield = [];

  class Particle {
    constructor() {
      this.pos = p.createVector(p.random(p.width), p.random(p.height));
      this.vel = p.createVector(0, 0);
      this.acc = p.createVector(0, 0);
      this.maxspeed = 4;
      this.prevPos = this.pos.copy();
    }

    update() {
      this.vel.add(this.acc);
      this.vel.limit(this.maxspeed);
      this.pos.add(this.vel);
      this.acc.mult(0);
    }

    follow(vectors) {
      let x = p.floor(this.pos.x / scl);
      let y = p.floor(this.pos.y / scl);
      let index = x + y * cols;
      let force = vectors[index];
      this.applyForce(force);
    }

    applyForce(force) {
      this.acc.add(force);
    }

    show() {
      p.stroke(255, 10);
      p.strokeWeight(1);
      p.line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
      this.updatePrev();
    }

    updatePrev() {
      this.prevPos.x = this.pos.x;
      this.prevPos.y = this.pos.y;
    }

    edges() {
      if (this.pos.x > p.width) {
        this.pos.x = 0;
        this.updatePrev();
      }
      if (this.pos.x < 0) {
        this.pos.x = p.width;
        this.updatePrev();
      }
      if (this.pos.y > p.height) {
        this.pos.y = 0;
        this.updatePrev();
      }
      if (this.pos.y < 0) {
        this.pos.y = p.height;
        this.updatePrev();
      }
    }
  }

  p.setup = () => {
    p.createCanvas(600, 400);
    cols = p.floor(p.width / scl);
    rows = p.floor(p.height / scl);
    flowfield = new Array(cols * rows);

    for (let i = 0; i < 300; i++) {
      particles[i] = new Particle();
    }

    p.background(51);
  };

  p.draw = () => {
    let yoff = 0;
    for (let y = 0; y < rows; y++) {
      let xoff = 0;
      for (let x = 0; x < cols; x++) {
        let index = x + y * cols;
        let angle = p.noise(xoff, yoff, zoff) * p.TWO_PI * 4;
        let v = p.constructor.Vector.fromAngle(angle);
        v.setMag(1);
        flowfield[index] = v;
        xoff += inc;
      }
      yoff += inc;
    }

    zoff += 0.0003;

    for (let i = 0; i < particles.length; i++) {
      particles[i].follow(flowfield);
      particles[i].update();
      particles[i].edges();
      particles[i].show();
    }
  };
};
