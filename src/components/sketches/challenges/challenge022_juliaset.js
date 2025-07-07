export const juliaSetSketch = (p) => {
  const maxiterations = 100;
  const colorsRed = [];
  const colorsGreen = [];
  const colorsBlue = [];

  let angle = 0;

  p.setup = () => {
    p.pixelDensity(1);
    p.createCanvas(640, 360);
    p.colorMode(p.HSB, 1);

    // Precalculate colors for performance
    for (let n = 0; n < maxiterations; n++) {
      let hu = p.sqrt(n / maxiterations);
      let col = p.color(hu, 1, 0.6); // HSB: [0–1]
      colorsRed[n] = p.red(col);
      colorsGreen[n] = p.green(col);
      colorsBlue[n] = p.blue(col);
    }
  };

  p.draw = () => {
    let ca = p.cos(angle * 3.213);
    let cb = p.sin(angle);
    angle += 0.02;

    p.background(255);

    let w = 5;
    let h = (w * p.height) / p.width;

    let xmin = -w / 2;
    let ymin = -h / 2;

    let xmax = xmin + w;
    let ymax = ymin + h;

    let dx = (xmax - xmin) / p.width;
    let dy = (ymax - ymin) / p.height;

    p.loadPixels();

    let y = ymin;
    for (let j = 0; j < p.height; j++) {
      let x = xmin;
      for (let i = 0; i < p.width; i++) {
        let a = x;
        let b = y;
        let n = 0;

        while (n < maxiterations) {
          let aa = a * a;
          let bb = b * b;
          if (aa + bb > 4.0) break;

          let twoab = 2.0 * a * b;
          a = aa - bb + ca;
          b = twoab + cb;
          n++;
        }

        let pix = (i + j * p.width) * 4;

        if (n === maxiterations) {
          p.pixels[pix + 0] = 0;
          p.pixels[pix + 1] = 0;
          p.pixels[pix + 2] = 0;
        } else {
          p.pixels[pix + 0] = colorsRed[n];
          p.pixels[pix + 1] = colorsGreen[n];
          p.pixels[pix + 2] = colorsBlue[n];
        }

        x += dx;
      }
      y += dy;
    }

    p.updatePixels();
  };
};
