export const terrain3DSketch = (p) => {
  let cols, rows;
  const scl = 20;
  const w = 1400;
  const h = 1000;
  let flying = 0;
  let terrain = [];

  p.setup = () => {
    p.createCanvas(600, 600, p.WEBGL);
    cols = w / scl;
    rows = h / scl;

    for (let x = 0; x < cols; x++) {
      terrain[x] = [];
      for (let y = 0; y < rows; y++) {
        terrain[x][y] = 0;
      }
    }
  };

  p.draw = () => {
    flying -= 0.1;
    let yoff = flying;

    for (let y = 0; y < rows; y++) {
      let xoff = 0;
      for (let x = 0; x < cols; x++) {
        terrain[x][y] = p.map(p.noise(xoff, yoff), 0, 1, -100, 100);
        xoff += 0.2;
      }
      yoff += 0.2;
    }

    p.background(0);
    p.translate(0, 50);
    p.rotateX(p.PI / 3);
    p.fill(200, 200, 200, 150);
    p.translate(-w / 2, -h / 2);

    for (let y = 0; y < rows - 1; y++) {
      p.beginShape(p.TRIANGLE_STRIP);
      for (let x = 0; x < cols; x++) {
        p.vertex(x * scl, y * scl, terrain[x][y]);
        p.vertex(x * scl, (y + 1) * scl, terrain[x][y + 1]);
      }
      p.endShape();
    }
  };
};
