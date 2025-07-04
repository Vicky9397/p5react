export const solarSystemTexturedSketch = (p) => {
  let sun;
  let cam;

  let sunTexture;
  const textures = [];

  p.preload = () => {
    sunTexture = p.loadImage('data/sun_texture.jpg');
    textures[0] = p.loadImage('data/mars_texture.jpg');
    textures[1] = p.loadImage('data/earth_texture.jpg');
    textures[2] = p.loadImage('data/mercury_texture.jpg');
  };

  p.setup = () => {
    const canvas = p.createCanvas(600, 600, p.WEBGL);
    canvas.elt.oncontextmenu = () => false; // disable right-click context menu
    cam = new Dw.EasyCam(p._renderer, { distance: 500 });

    sun = new Planet(50, 0, 0, sunTexture);
    sun.spawnMoons(4, 1);
  };

  p.draw = () => {
    p.background(0);
    p.ambientLight(255);
    p.pointLight(255, 255, 255, 0, 0, 0);
    sun.show();
    sun.orbit();
  };

  class Planet {
    constructor(r, d, o, img) {
      this.v = p.constructor.Vector.random3D();

      this.radius = r;
      this.distance = d;
      this.v.mult(this.distance);
      this.angle = p.random(p.TWO_PI);
      this.orbitspeed = o;

      this.texture = img;
      this.planets = null;
    }

    orbit() {
      this.angle += this.orbitspeed;
      if (this.planets != null) {
        for (let i = 0; i < this.planets.length; i++) {
          this.planets[i].orbit();
        }
      }
    }

    spawnMoons(total, level) {
      this.planets = [];
      for (let i = 0; i < total; i++) {
        let r = this.radius / (level * 2);
        let d = p.random(this.radius + r, (this.radius + r) * 2);
        let o = p.random(-0.1, 0.1);
        let index = p.int(p.random(0, textures.length));
        this.planets[i] = new Planet(r, d, o, textures[index]);
        if (level < 2) {
          let num = p.int(p.random(0, 3));
          this.planets[i].spawnMoons(num, level + 1);
        }
      }
    }

    show() {
      p.push();
      p.noStroke();
      let v2 = p.createVector(1, 0, 1);
      let rotationAxis = this.v.cross(v2);
      if (rotationAxis.mag() > 0) {
        p.rotate(this.angle, rotationAxis);
      }

      p.translate(this.v.x, this.v.y, this.v.z);
      p.texture(this.texture);
      p.sphere(this.radius);

      if (this.planets != null) {
        for (let i = 0; i < this.planets.length; i++) {
          this.planets[i].show();
        }
      }
      p.pop();
    }
  }
};
