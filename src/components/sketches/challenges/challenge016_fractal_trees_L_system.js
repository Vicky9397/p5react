export const lSystemFractalTreeSketch = (p) => {
  let angle;
  let axiom = "F";
  let sentence = axiom;
  let len = 100;

  const rules = [
    {
      a: "F",
      b: "FF+[+F-F-F]-[-F+F+F]",
    },
  ];

  const generate = () => {
    len *= 0.5;
    let nextSentence = "";
    for (let i = 0; i < sentence.length; i++) {
      let current = sentence.charAt(i);
      let found = false;
      for (let j = 0; j < rules.length; j++) {
        if (current === rules[j].a) {
          found = true;
          nextSentence += rules[j].b;
          break;
        }
      }
      if (!found) {
        nextSentence += current;
      }
    }
    sentence = nextSentence;
    turtle();
  };

  const turtle = () => {
    p.background(51);
    p.resetMatrix();
    p.translate(p.width / 2, p.height);
    p.stroke(255, 100);
    for (let i = 0; i < sentence.length; i++) {
      let current = sentence.charAt(i);

      if (current === "F") {
        p.line(0, 0, 0, -len);
        p.translate(0, -len);
      } else if (current === "+") {
        p.rotate(angle);
      } else if (current === "-") {
        p.rotate(-angle);
      } else if (current === "[") {
        p.push();
      } else if (current === "]") {
        p.pop();
      }
    }
  };

  p.setup = () => {
    p.createCanvas(400, 400);
    angle = p.radians(25);
    p.background(51);
    turtle();

    // UI button to trigger generation
    const button = p.createButton("Generate");
    button.position(10, p.height + 10);
    button.mousePressed(generate);
  };

  p.draw = () => {
    // draw() left empty since rendering is event-driven by button
  };
};
