export const spaceInvadersSketch = (p) => {
  let ship;
  let flowers = [];
  let drops = [];

  class Drop {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.r = 8;
      this.toDelete = false;
    }

    show() {
      p.noStroke();
      p.fill(150, 0, 255);
      p.ellipse(this.x, this.y, this.r * 2, this.r * 2);
    }

    move() {
      this.y -= 5;
    }

    evaporate() {
      this.toDelete = true;
    }

    hits(flower) {
      let d = p.dist(this.x, this.y, flower.x, flower.y);
      return d < this.r + flower.r;
    }
  }

  class Flower {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.r = 30;
      this.xdir = 1;
    }

    show() {
      p.noStroke();
      p.fill(255, 0, 200, 150);
      p.ellipse(this.x, this.y, this.r * 2, this.r * 2);
    }

    move() {
      this.x += this.xdir;
    }

    shiftDown() {
      this.xdir *= -1;
      this.y += this.r;
    }

    grow() {
      this.r += 2;
    }
  }

  class Ship {
    constructor() {
      this.x = p.width / 2;
      this.xdir = 0;
    }

    show() {
      p.fill(255);
      p.rectMode(p.CENTER);
      p.rect(this.x, p.height - 20, 20, 60);
    }

    move() {
      this.x += this.xdir * 5;
    }

    setDir(dir) {
      this.xdir = dir;
    }
  }

  p.setup = () => {
    p.createCanvas(600, 400);
    ship = new Ship();
    for (let i = 0; i < 6; i++) {
      flowers[i] = new Flower(i * 80 + 80, 60);
    }
  };

  p.draw = () => {
    p.background(51);
    ship.show();
    ship.move();

    for (let i = 0; i < drops.length; i++) {
      drops[i].show();
      drops[i].move();
      for (let j = 0; j < flowers.length; j++) {
        if (drops[i].hits(flowers[j])) {
          flowers[j].grow();
          drops[i].evaporate();
        }
      }
    }

    let edge = false;
    for (let i = 0; i < flowers.length; i++) {
      flowers[i].show();
      flowers[i].move();
      if (flowers[i].x > p.width || flowers[i].x < 0) {
        edge = true;
      }
    }

    if (edge) {
      for (let i = 0; i < flowers.length; i++) {
        flowers[i].shiftDown();
      }
    }

    for (let i = drops.length - 1; i >= 0; i--) {
      if (drops[i].toDelete) {
        drops.splice(i, 1);
      }
    }
  };

  p.keyPressed = () => {
    if (p.key === ' ') {
      drops.push(new Drop(ship.x, p.height));
    }

    if (p.keyCode === p.RIGHT_ARROW) {
      ship.setDir(1);
    } else if (p.keyCode === p.LEFT_ARROW) {
      ship.setDir(-1);
    }
  };

  p.keyReleased = () => {
    if (p.key !== ' ') {
      ship.setDir(0);
    }
  };
};
