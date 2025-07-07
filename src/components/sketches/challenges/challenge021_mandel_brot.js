export const mandelbrotSketch = (p) => {
  let minSlider, maxSlider;
  let frDiv;

  p.setup = () => {
    p.createCanvas(300, 300);
    p.pixelDensity(1);

    minSlider = p.createSlider(-2.5, 0, -2.5, 0.01);
    maxSlider = p.createSlider(0, 2.5, 2.5, 0.01);

    frDiv = p.createDiv("");
  };

  p.draw = () => {
    const maxiterations = 100;

    p.loadPixels();
    for (let x = 0; x < p.width; x++) {
      for (let y = 0; y < p.height; y++) {
        let a = p.map(x, 0, p.width, minSlider.value(), maxSlider.value());
        let b = p.map(y, 0, p.height, minSlider.value(), maxSlider.value());

        let ca = a;
        let cb = b;

        let n = 0;
        while (n < maxiterations) {
          let aa = a * a - b * b;
          let bb = 2 * a * b;
          a = aa + ca;
          b = bb + cb;

          if (a * a + b * b > 16) break;
          n++;
        }

        let bright = p.map(n, 0, maxiterations, 0, 1);
        bright = p.map(p.sqrt(bright), 0, 1, 0, 255);
        if (n === maxiterations) bright = 0;

        let pix = (x + y * p.width) * 4;
        p.pixels[pix + 0] = bright;
        p.pixels[pix + 1] = bright;
        p.pixels[pix + 2] = bright;
        p.pixels[pix + 3] = 255;
      }
    }
    p.updatePixels();

    frDiv.html(p.floor(p.frameRate()));
  };
};
