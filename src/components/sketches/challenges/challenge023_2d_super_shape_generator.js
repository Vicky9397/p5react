export const superShape2DSketch = (p) => {
  let n1 = 0.3;
  let n2 = 0.3;
  let n3 = 0.3;
  let m = 5;
  let a = 1;
  let b = 1;
  let osc = 0;

  const supershape = (theta) => {
    let part1 = (1 / a) * p.cos(theta * m / 4);
    part1 = p.abs(part1);
    part1 = p.pow(part1, n2);

    let part2 = (1 / b) * p.sin(theta * m / 4);
    part2 = p.abs(part2);
    part2 = p.pow(part2, n3);

    let part3 = p.pow(part1 + part2, 1 / n1);
    if (part3 === 0) return 0;

    return 1 / part3;
  };

  p.setup = () => {
    p.createCanvas(400, 400);
  };

  p.draw = () => {
    m = p.map(p.sin(osc), -1, 1, 0, 10);
    osc += 0.02;

    p.background(51);
    p.translate(p.width / 2, p.height / 2);

    p.stroke(255);
    p.noFill();

    let radius = 100;
    let total = 200;
    let increment = p.TWO_PI / total;

    p.beginShape();
    for (let angle = 0; angle < p.TWO_PI; angle += increment) {
      let r = supershape(angle);
      let x = radius * r * p.cos(angle);
      let y = radius * r * p.sin(angle);
      p.vertex(x, y);
    }
    p.endShape(p.CLOSE);
  };
};