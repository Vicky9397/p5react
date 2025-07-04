export const mitosisSketch = (p) => {
  let cells = [];

  class Cell {
    constructor(pos, r, c) {
      if (pos) {
        this.pos = pos.copy();
      } else {
        this.pos = p.createVector(p.random(p.width), p.random(p.height));
      }

      this.r = r || 60;
      this.c = c || p.color(p.random(100, 255), 0, p.random(100, 255), 100);
    }

    clicked(x, y) {
      const d = p.dist(this.pos.x, this.pos.y, x, y);
      return d < this.r;
    }

    mitosis() {
      const newPos = this.pos.copy();
      newPos.x += p.random(-this.r / 2, this.r / 2);
      newPos.y += p.random(-this.r / 2, this.r / 2);
      return new Cell(newPos, this.r * 0.8, this.c);
    }

    move() {
      const vel = p.constructor.Vector.random2D();
      this.pos.add(vel);
    }

    show() {
      p.noStroke();
      p.fill(this.c);
      p.ellipse(this.pos.x, this.pos.y, this.r, this.r);
    }
  }

  p.setup = () => {
    p.createCanvas(700, 700);
    cells.push(new Cell());
    cells.push(new Cell());
  };

  p.draw = () => {
    p.background(200);
    for (let i = 0; i < cells.length; i++) {
      cells[i].move();
      cells[i].show();
    }
  };

  p.mousePressed = () => {
    for (let i = cells.length - 1; i >= 0; i--) {
      if (cells[i].clicked(p.mouseX, p.mouseY)) {
        cells.push(cells[i].mitosis());
        cells.push(cells[i].mitosis());
        cells.splice(i, 1);
      }
    }
  };
};
