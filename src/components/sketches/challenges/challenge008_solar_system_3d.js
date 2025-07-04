export const solarSystem3DSketch = (p) => {
  let sun;
  let easycam;

  class Planet {
    constructor(r, d, o) {
      this.v = p.constructor.Vector.random3D();

      this.radius = r;
      this.distance = d;
      this.v.mult(this.distance);
      this.angle = p.random(p.TWO_PI);
      this.orbitspeed = o;

      this.planets = null;
    }

    orbit() {
      this.angle += this.orbitspeed;
      if (this.planets) {
        for (let i = 0; i < this.planets.length; i++) {
          this.planets[i].orbit();
        }
      }
    }

    spawnMoons(total, level) {
      this.planets = [];
      for (let i = 0; i < total; i++) {
        const r = this.radius / (level * 2);
        const d = p.random(this.radius + r, (this.radius + r) * 2);
        const o = p.random(-0.1, 0.1);
        const moon = new Planet(r, d, o);
        this.planets[i] = moon;

        if (level < 2) {
          const num = Math.floor(p.random(0, 3));
          moon.spawnMoons(num, level + 1);
        }
      }
    }

    show() {
      p.push();
      p.noStroke();
      const v2 = p.createVector(1, 0, 1);
      const axis = this.v.cross(v2);
      if (axis.mag() > 0) {
        p.rotate(this.angle, axis);
      }
      p.translate(this.v.x, this.v.y, this.v.z);
      p.fill(255);
      p.sphere(this.radius);

      if (this.planets) {
        for (let i = 0; i < this.planets.length; i++) {
          this.planets[i].show();
        }
      }
      p.pop();
    }
  }

  p.setup = () => {
    const canvas = p.createCanvas(600, 600, p.WEBGL);

    easycam = p.orbitControl();

    sun = new Planet(50, 0, 0);
    sun.spawnMoons(4, 1);
  };

  p.draw = () => {
    p.background(0);
    p.orbitControl();
    p.lights();
    sun.show();
    sun.orbit();
  };
};
