export const snakeGameSketch = (p) => {
  let scl = 20;
  let s;
  let food;

  class Snake {
    constructor() {
      this.x = 0;
      this.y = 0;
      this.xspeed = 1;
      this.yspeed = 0;
      this.total = 0;
      this.tail = [];
    }

    dir(x, y) {
      this.xspeed = x;
      this.yspeed = y;
    }

    eat(pos) {
      let d = p.dist(this.x, this.y, pos.x, pos.y);
      if (d < 1) {
        this.total++;
        return true;
      } else {
        return false;
      }
    }

    death() {
      for (let i = 0; i < this.tail.length; i++) {
        let pos = this.tail[i];
        let d = p.dist(this.x, this.y, pos.x, pos.y);
        if (d < 1) {
          console.log('starting over');
          this.total = 0;
          this.tail = [];
        }
      }
    }

    update() {
      for (let i = 0; i < this.tail.length - 1; i++) {
        this.tail[i] = this.tail[i + 1];
      }
      if (this.total >= 1) {
        this.tail[this.total - 1] = p.createVector(this.x, this.y);
      }

      this.x += this.xspeed * scl;
      this.y += this.yspeed * scl;

      this.x = p.constrain(this.x, 0, p.width - scl);
      this.y = p.constrain(this.y, 0, p.height - scl);
    }

    show() {
      p.fill(255);
      for (let i = 0; i < this.tail.length; i++) {
        p.rect(this.tail[i].x, this.tail[i].y, scl, scl);
      }
      p.rect(this.x, this.y, scl, scl);
    }
  }

  function pickLocation() {
    let cols = p.floor(p.width / scl);
    let rows = p.floor(p.height / scl);
    food = p.createVector(p.floor(p.random(cols)), p.floor(p.random(rows)));
    food.mult(scl);
  }

  p.setup = () => {
    p.createCanvas(600, 600);
    s = new Snake();
    p.frameRate(10);
    pickLocation();
  };

  p.draw = () => {
    p.background(51);

    if (s.eat(food)) {
      pickLocation();
    }

    s.death();
    s.update();
    s.show();

    p.fill(255, 0, 100);
    p.rect(food.x, food.y, scl, scl);
  };

  p.keyPressed = () => {
    if (p.keyCode === p.UP_ARROW) {
      s.dir(0, -1);
    } else if (p.keyCode === p.DOWN_ARROW) {
      s.dir(0, 1);
    } else if (p.keyCode === p.RIGHT_ARROW) {
      s.dir(1, 0);
    } else if (p.keyCode === p.LEFT_ARROW) {
      s.dir(-1, 0);
    }
  };

  p.mousePressed = () => {
    s.total++;
  };
};
