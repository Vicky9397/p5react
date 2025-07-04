export const starfieldSketch = (p) => {
  let stars = [];

  class Star {
    constructor() {
      this.x = p.random(-p.width, p.width);
      this.y = p.random(-p.height, p.height);
      this.z = p.random(p.width);
      this.pz = this.z;
    }

    update(speed) {
      this.z -= speed;
      if (this.z < 1) {
        this.z = p.width;
        this.x = p.random(-p.width, p.width);
        this.y = p.random(-p.height, p.height);
        this.pz = this.z;
      }
    }

    show() {
      let sx = p.map(this.x / this.z, 0, 1, 0, p.width);
      let sy = p.map(this.y / this.z, 0, 1, 0, p.height);
      let r = p.map(this.z, 0, p.width, 4, 0);

      let px = p.map(this.x / this.pz, 0, 1, 0, p.width);
      let py = p.map(this.y / this.pz, 0, 1, 0, p.height);
      this.pz = this.z;

      p.stroke(255);
      p.strokeWeight(r);
      p.line(px, py, sx, sy);
    }
  }

  p.setup = () => {
    p.createCanvas(640, 360);
    for (let i = 0; i < 2500; i++) {
      stars[i] = new Star();
    }
  };


    p.draw = () => {
        // Constrain mouseX between 0 and width
        let speed = p.map(p.constrain(p.mouseX, 0, p.width), 0, p.width, 1, 20);

        p.background(0);
        p.translate(p.width / 2, p.height / 2);

        for (let star of stars) {
            star.update(speed);
            star.show();
        }
    };
};
