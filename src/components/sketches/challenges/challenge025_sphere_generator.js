export const sphericalGeometrySketch = (p) => {
  const globe = [];
  const r = 200;
  const total = 25;
  let angleX = 0;
  let angleY = 0;
  let angleZ = 0;

  p.setup = () => {
    p.createCanvas(500, 500, p.WEBGL);
    p.noFill();
    p.strokeWeight(2);
    p.stroke(200);

    for (let i = 0; i <= total; i++) {
      globe[i] = [];
      const lat = p.map(i, 0, total, 0, p.PI);
      for (let j = 0; j <= total; j++) {
        const lon = p.map(j, 0, total, 0, p.TWO_PI);
        const x = r * p.sin(lat) * p.cos(lon);
        const y = r * p.sin(lat) * p.sin(lon);
        const z = r * p.cos(lat);
        globe[i][j] = p.createVector(x, y, z);
      }
    }
  };

  p.draw = () => {
    p.background(51);
    p.rotateX(angleX);
    //p.rotateY(angleY);
    p.rotateZ(angleZ);

    for (let i = 0; i < total; i++) {
      p.beginShape(p.TRIANGLE_STRIP);
      for (let j = 0; j <= total; j++) {
        const v1 = globe[i][j];
        p.vertex(v1.x, v1.y, v1.z);
        const v2 = globe[i + 1][j];
        p.vertex(v2.x, v2.y, v2.z);
      }
      p.endShape();
    }

    angleX += 0.005;
    angleY += 0.006;
    angleZ += 0.012;
  };
};
