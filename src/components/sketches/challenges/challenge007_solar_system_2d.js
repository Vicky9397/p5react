export const solarSystemSketch = (p) => {
  let sun;

  class Planet {
    constructor(radius, distance, orbitspeed, angle) {
      this.radius = radius;
      this.distance = distance;
      this.orbitspeed = orbitspeed;
      this.angle = angle;
      this.planets = [];
    }

    orbit() {
      this.angle += this.orbitspeed;
      for (let i = 0; i < this.planets.length; i++) {
        this.planets[i].orbit();
      }
    }

    spawnMoons(total, level) {
      for (let i = 0; i < total; i++) {
        let r = this.radius / (level * 2);
        let d = p.random(50, 150);
        let o = p.random(-0.1, 0.1);
        let a = p.random(p.TWO_PI);
        let moon = new Planet(r, d / level, o, a);
        this.planets.push(moon);

        if (level < 3) {
          let num = Math.floor(p.random(0, 4));
          moon.spawnMoons(num, level + 1);
        }
      }
    }

    show() {
      p.push();
      p.fill(255, 100);
      p.noStroke();
      p.rotate(this.angle);
      p.translate(this.distance, 0);
      p.ellipse(0, 0, this.radius * 2);
      for (let i = 0; i < this.planets.length; i++) {
        this.planets[i].show();
      }
      p.pop();
    }
  }

  p.setup = () => {
    p.createCanvas(600, 600);
    sun = new Planet(50, 0, 0, p.random(p.TWO_PI));
    sun.spawnMoons(5, 1);
  };

  p.draw = () => {
    p.background(51);
    p.translate(p.width / 2, p.height / 2);
    sun.show();
    sun.orbit();
  };
};
