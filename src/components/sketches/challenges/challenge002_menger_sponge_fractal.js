export const mengerSpongeSketch = (p) => {
  let a = 0;
  let sponge = [];

  class Box {
    constructor(x, y, z, r) {
      this.pos = p.createVector(x, y, z);
      this.r = r;
    }

    generate() {
      const boxes = [];
      for (let x = -1; x < 2; x++) {
        for (let y = -1; y < 2; y++) {
          for (let z = -1; z < 2; z++) {
            const sum = Math.abs(x) + Math.abs(y) + Math.abs(z);
            const newR = this.r / 3;
            if (sum > 1) {
              const b = new Box(
                this.pos.x + x * newR,
                this.pos.y + y * newR,
                this.pos.z + z * newR,
                newR
              );
              boxes.push(b);
            }
          }
        }
      }
      return boxes;
    }

    show() {
      p.push();
      p.translate(this.pos.x, this.pos.y, this.pos.z);
      p.box(this.r);
      p.pop();
    }
  }

  p.setup = () => {
    p.createCanvas(400, 400, p.WEBGL);
    p.normalMaterial();
    sponge.push(new Box(0, 0, 0, 200));
  };

  p.mousePressed = () => {
    let next = [];
    for (let i = 0; i < sponge.length; i++) {
      let newBoxes = sponge[i].generate();
      next = next.concat(newBoxes);
    }
    sponge = next;
  };

  p.draw = () => {
    p.background(0);
    p.rotateX(a);
    p.rotateY(a * 0.4);
    p.rotateZ(a * 0.1);

    for (let i = 0; i < sponge.length; i++) {
      sponge[i].show();
    }

    a += 0.01;
  };
};
