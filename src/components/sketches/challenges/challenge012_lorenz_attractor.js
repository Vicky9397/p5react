export const lorenzAttractorSketch = (p) => {
  let x = 0.01;
  let y = 0;
  let z = 0;

  const a = 10;
  const b = 28;
  const c = 8.0 / 3.0;

  let points = [];

  p.setup = () => {
    p.createCanvas(800, 600, p.WEBGL);
    p.colorMode(p.HSB);
  };

  p.draw = () => {
    p.background(0);

    const dt = 0.01;
    const dx = (a * (y - x)) * dt;
    const dy = (x * (b - z) - y) * dt;
    const dz = (x * y - c * z) * dt;
    x += dx;
    y += dy;
    z += dz;

    points.push(new p.constructor.Vector(x, y, z));  // ✅ Correct usage

    p.translate(0, 0, -80);

    const camX = p.map(p.mouseX, 0, p.width, -200, 200);
    const camY = p.map(p.mouseY, 0, p.height, -200, 200);
    p.camera(camX, camY, (p.height / 2.0) / p.tan(p.PI * 30.0 / 180.0), 0, 0, 0, 0, 1, 0);

    p.scale(5);
    p.stroke(255);
    p.noFill();

    let hu = 0;
    p.beginShape();
    for (let v of points) {
      p.stroke(hu, 255, 255);
      p.vertex(v.x, v.y, v.z);
      hu = (hu + 1) % 256;
    }
    p.endShape();
  };
};
