export const reactionDiffusionSketch = (p) => {
  const dA = 1;
  const dB = 0.5;
  const feed = 0.055;
  const k = 0.062;

  let grid = [];
  let next = [];
  const w = 200;
  const h = 200;

  p.setup = () => {
    p.createCanvas(w, h);
    p.pixelDensity(1);

    for (let x = 0; x < w; x++) {
      grid[x] = [];
      next[x] = [];
      for (let y = 0; y < h; y++) {
        grid[x][y] = { a: 1, b: 0 };
        next[x][y] = { a: 1, b: 0 };
      }
    }

    for (let i = 100; i < 110; i++) {
      for (let j = 100; j < 110; j++) {
        grid[i][j].b = 1;
      }
    }
  };

  p.draw = () => {
    p.background(51);

    for (let x = 1; x < w - 1; x++) {
      for (let y = 1; y < h - 1; y++) {
        const a = grid[x][y].a;
        const b = grid[x][y].b;

        const newA = a + (dA * laplaceA(x, y)) - (a * b * b) + (feed * (1 - a));
        const newB = b + (dB * laplaceB(x, y)) + (a * b * b) - ((k + feed) * b);

        next[x][y].a = p.constrain(newA, 0, 1);
        next[x][y].b = p.constrain(newB, 0, 1);
      }
    }

    p.loadPixels();
    for (let x = 0; x < w; x++) {
      for (let y = 0; y < h; y++) {
        const pix = (x + y * w) * 4;
        const a = next[x][y].a;
        const b = next[x][y].b;
        let c = p.floor((a - b) * 255);
        c = p.constrain(c, 0, 255);
        p.pixels[pix + 0] = c;
        p.pixels[pix + 1] = c;
        p.pixels[pix + 2] = c;
        p.pixels[pix + 3] = 255;
      }
    }
    p.updatePixels();

    swapGrids();
  };

  function laplaceA(x, y) {
    let sumA = 0;
    sumA += grid[x][y].a * -1;
    sumA += grid[x - 1][y].a * 0.2;
    sumA += grid[x + 1][y].a * 0.2;
    sumA += grid[x][y + 1].a * 0.2;
    sumA += grid[x][y - 1].a * 0.2;
    sumA += grid[x - 1][y - 1].a * 0.05;
    sumA += grid[x + 1][y - 1].a * 0.05;
    sumA += grid[x + 1][y + 1].a * 0.05;
    sumA += grid[x - 1][y + 1].a * 0.05;
    return sumA;
  }

  function laplaceB(x, y) {
    let sumB = 0;
    sumB += grid[x][y].b * -1;
    sumB += grid[x - 1][y].b * 0.2;
    sumB += grid[x + 1][y].b * 0.2;
    sumB += grid[x][y + 1].b * 0.2;
    sumB += grid[x][y - 1].b * 0.2;
    sumB += grid[x - 1][y - 1].b * 0.05;
    sumB += grid[x + 1][y - 1].b * 0.05;
    sumB += grid[x + 1][y + 1].b * 0.05;
    sumB += grid[x - 1][y + 1].b * 0.05;
    return sumB;
  }

  function swapGrids() {
    const temp = grid;
    grid = next;
    next = temp;
  }
};
