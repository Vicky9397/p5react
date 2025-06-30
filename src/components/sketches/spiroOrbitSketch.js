export const spiroOrbitSketch = (p) => {
  let angle1 = 0;
  let angle2 = 0;

  let r1 = 100;
  let r2 = 50;
  let centerX, centerY;

  let baseSpeed1 = 0.02;
  let baseSpeed2 = 0.07;

  let drift1 = 0.00003;
  let drift2 = -0.00005;

  let hue = 0;
  let isPaused = false;

  let prevX = null;
  let prevY = null;

  let r1Input, r2Input, a1Input, a2Input;
  let pauseButton, clearButton;

  p.setup = () => {
    const canvas = p.createCanvas(400, 400);
    p.colorMode(p.HSB, 360, 100, 100);
    p.background(0);

    centerX = p.width / 2;
    centerY = p.height / 2;

    const canvasX = canvas.position().x;
    const canvasY = canvas.position().y;

    p.createElement('h3', 'Evolving Orbit Controls').position(canvasX + 100, canvasY + 430);

    p.createElement('p', 'Radius 1:').position(canvasX + 20, canvasY + 460);
    r1Input = p.createInput(r1.toString());
    r1Input.position(canvasX + 100, canvasY + 478);
    r1Input.size(50);
    r1Input.elt.disabled = true;
    r1Input.input(() => {
      r1 = parseFloat(r1Input.value()) || 0;
    });

    p.createElement('p', 'Radius 2:').position(canvasX + 20, canvasY + 490);
    r2Input = p.createInput(r2.toString());
    r2Input.position(canvasX + 100, canvasY + 508);
    r2Input.size(50);
    r2Input.elt.disabled = true;
    r2Input.input(() => {
      r2 = parseFloat(r2Input.value()) || 0;
    });

    p.createElement('p', 'Base Speed 1:').position(canvasX + 200, canvasY + 460);
    a1Input = p.createInput(baseSpeed1.toString());
    a1Input.position(canvasX + 320, canvasY + 478);
    a1Input.size(50);
    a1Input.elt.disabled = true;
    a1Input.input(() => {
      baseSpeed1 = parseFloat(a1Input.value()) || 0;
    });

    p.createElement('p', 'Base Speed 2:').position(canvasX + 200, canvasY + 490);
    a2Input = p.createInput(baseSpeed2.toString());
    a2Input.position(canvasX + 320, canvasY + 508);
    a2Input.size(50);
    a2Input.elt.disabled = true;
    a2Input.input(() => {
      baseSpeed2 = parseFloat(a2Input.value()) || 0;
    });

    pauseButton = p.createButton('Pause');
    pauseButton.position(canvasX + 150, canvasY + 550);
    pauseButton.mousePressed(toggleSimulation);

    clearButton = p.createButton('Clear Canvas');
    clearButton.position(canvasX + 230, canvasY + 550);
    clearButton.mousePressed(() => {
      p.background(0);
      prevX = null;
      prevY = null;
    });
  };

  p.draw = () => {
    if (!isPaused) {
      let x1 = centerX + p.cos(angle1) * r1;
      let y1 = centerY + p.sin(angle1) * r1;

      let x2 = x1 + p.cos(angle2) * r2;
      let y2 = y1 + p.sin(angle2) * r2;

      p.stroke(hue % 360, 100, 100);
      p.strokeWeight(1);

      if (prevX !== null && prevY !== null) {
        p.line(prevX, prevY, x2, y2); // draw line from last point to current
      }

      // Save current point for next line
      prevX = x2;
      prevY = y2;

      // Update angles
      angle1 += baseSpeed1;
      angle2 += baseSpeed2;

      // Drift speeds
      baseSpeed1 += drift1;
      baseSpeed2 += drift2;

      hue += 0.3;
    }
  };

  const toggleSimulation = () => {
    isPaused = !isPaused;
    pauseButton.html(isPaused ? 'Resume' : 'Pause');
    [r1Input, r2Input, a1Input, a2Input].forEach((input) => {
      input.elt.disabled = !isPaused;
    });
  };
};
