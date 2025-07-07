export const superellipseSketch = (p) => {
  let slider;

  p.setup = () => {
    p.createCanvas(400, 400);
    slider = p.createSlider(0, 10, 2, 0.01);
    slider.position(10, p.height + 10);
  };

  p.draw = () => {
    p.background(51);
    p.translate(p.width / 2, p.height / 2);

    const a = 100;
    const b = 100;
    const n = slider.value();
    p.stroke(255);
    p.noFill();

    p.beginShape();
    for (let angle = 0; angle < p.TWO_PI; angle += 0.1) {
      const na = 2 / n;
      const x = p.pow(p.abs(p.cos(angle)), na) * a * sgn(p.cos(angle));
      const y = p.pow(p.abs(p.sin(angle)), na) * b * sgn(p.sin(angle));
      p.vertex(x, y);
    }
    p.endShape(p.CLOSE);
  };

  function sgn(val) {
    if (val === 0) return 0;
    return val / Math.abs(val);
  }
};
