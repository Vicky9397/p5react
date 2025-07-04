export const purpleRainSketch = (p) => {
  let drops = [];

  class Drop {
    constructor() {
      this.x = p.random(p.width);
      this.y = p.random(-500, -50);
      this.z = p.random(0, 20);
      this.len = p.map(this.z, 0, 20, 10, 20);
      this.yspeed = p.map(this.z, 0, 20, 1, 20);
    }

    fall() {
      this.y += this.yspeed;
      const grav = p.map(this.z, 0, 20, 0, 0.2);
      this.yspeed += grav;

      if (this.y > p.height) {
        this.y = p.random(-200, -100);
        this.yspeed = p.map(this.z, 0, 20, 4, 10);
      }
    }

    show() {
      const thick = p.map(this.z, 0, 20, 1, 3);
      p.strokeWeight(thick);
      p.stroke(138, 43, 226); // Purple
      p.line(this.x, this.y, this.x, this.y + this.len);
    }
  }

  p.setup = () => {
    p.createCanvas(640, 360);
    for (let i = 0; i < 500; i++) {
      drops[i] = new Drop();
    }
  };

  p.draw = () => {
    p.background(230, 230, 250); // Lavender background
    for (let drop of drops) {
      drop.fall();
      drop.show();
    }
  };
};
