/* global VerletParticle2D, VerletSpring2D, VerletPhysics2D, Vec2D, GravityBehavior */
export const clothSimulationSketch = (p) => {
  let cols = 15;
  let rows = 15;
  let w = 10;

  let particles = [];
  let springs = [];
  let physics;

  const make2DArray = (cols, rows) => {
    const arr = new Array(cols);
    for (let i = 0; i < cols; i++) {
      arr[i] = new Array(rows);
    }
    return arr;
  };

  class Particle extends VerletParticle2D {
    constructor(x, y) {
      super(x, y);
      VerletParticle2D.call(this, x, y);
    }
    display() {
      p.fill(255);
      p.ellipse(this.x, this.y, 10, 10);
    }
  }
  //Object.setPrototypeOf(Particle.prototype, VerletParticle2D.prototype);

  class Spring extends VerletSpring2D {
    constructor(a, b) {
      super(a, b, w, 1);
    }

    display() {
      p.stroke(255);
      p.strokeWeight(2);
      p.line(this.a.x, this.a.y, this.b.x, this.b.y);
    }
  }

  p.setup = () => {
    p.createCanvas(400, 300);
    physics = new VerletPhysics2D();
    let gravity = new Vec2D(0, 1);
    let gb = new GravityBehavior(gravity);
    physics.addBehavior(gb);

    particles = make2DArray(cols, rows);
    let x = 100;

    for (let i = 0; i < cols; i++) {
      let y = 10;
      for (let j = 0; j < rows; j++) {
        const p1 = new Particle(x, y);
        particles[i][j] = p1;
        physics.addParticle(p1);
        y += w;
      }
      x += w;
    }

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let a = particles[i][j];
        if (i < cols - 1) {
          let b = particles[i + 1][j];
          let s = new Spring(a, b);
          springs.push(s);
          physics.addSpring(s);
        }
        if (j < rows - 1) {
          let b = particles[i][j + 1];
          let s = new Spring(a, b);
          springs.push(s);
          physics.addSpring(s);
        }
      }
    }

    particles[0][0].lock();
    particles[cols - 1][0].lock();
  };

  p.draw = () => {
    p.background(0);
    physics.update();

    for (let s of springs) {
      s.display();
    }
  };
};
