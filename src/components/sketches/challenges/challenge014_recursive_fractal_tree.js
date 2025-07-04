export const fractalTreeSketch = (p) => {
  let angle = 0;
  let slider;

  p.setup = () => {
    p.createCanvas(640, 360);
    slider = p.createSlider(0, p.TWO_PI, p.PI / 4, 0.01);
    slider.position(10, 10); // Optional: UI location
    slider.style('width', '200px');
  };

  p.draw = () => {
    p.background(0);
    angle = slider.value();
    p.stroke(255);
    p.strokeWeight(2);
    p.translate(p.width * 0.5, p.height);
    branch(100);
  };

  function branch(len) {
    p.line(0, 0, 0, -len);
    p.translate(0, -len);
    if (len > 4) {
      p.push();
      p.rotate(angle);
      branch(len * 0.67);
      p.pop();

      p.push();
      p.rotate(-angle);
      branch(len * 0.67);
      p.pop();
    }
  }
};
