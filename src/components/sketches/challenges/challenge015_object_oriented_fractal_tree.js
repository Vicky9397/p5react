export const fractalTreeOOSketch = (p) => {
  let tree = [];
  let leaves = [];
  let count = 0;

  class Branch {
    constructor(begin, end) {
      this.begin = begin;
      this.end = end;
      this.finished = false;
    }

    jitter() {
      this.end.x += p.random(-1, 1);
      this.end.y += p.random(-1, 1);
    }

    show() {
      p.stroke(255);
      p.line(this.begin.x, this.begin.y, this.end.x, this.end.y);
    }

    branchA() {
      let dir = p.constructor.Vector.sub(this.end, this.begin);
      dir.rotate(p.PI / 6);
      dir.mult(0.67);
      let newEnd = p.constructor.Vector.add(this.end, dir);
      return new Branch(this.end, newEnd);
    }

    branchB() {
      let dir = p.constructor.Vector.sub(this.end, this.begin);
      dir.rotate(-p.PI / 4);
      dir.mult(0.67);
      let newEnd = p.constructor.Vector.add(this.end, dir);
      return new Branch(this.end, newEnd);
    }
  }

  p.setup = () => {
    p.createCanvas(400, 400);
    let a = p.createVector(p.width / 2, p.height);
    let b = p.createVector(p.width / 2, p.height - 100);
    let root = new Branch(a, b);
    tree[0] = root;
  };

  p.mousePressed = () => {
    for (let i = tree.length - 1; i >= 0; i--) {
      if (!tree[i].finished) {
        tree.push(tree[i].branchA());
        tree.push(tree[i].branchB());
      }
      tree[i].finished = true;
    }
    count++;

    if (count === 6) {
      for (let i = 0; i < tree.length; i++) {
        if (!tree[i].finished) {
          let leaf = tree[i].end.copy();
          leaves.push(leaf);
        }
      }
    }
  };

  p.draw = () => {
    p.background(51);

    for (let i = 0; i < tree.length; i++) {
      tree[i].show();
      tree[i].jitter();
    }

    for (let i = 0; i < leaves.length; i++) {
      p.fill(255, 0, 100, 100);
      p.noStroke();
      p.ellipse(leaves[i].x, leaves[i].y, 8, 8);
      leaves[i].y += p.random(0, 2);
    }
  };
};
