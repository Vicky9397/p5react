export const spaceColonizationTreeSketch = (p) => {
  let tree;
  const max_dist = 100;
  const min_dist = 10;

  class Leaf {
    constructor() {
      this.pos = p.createVector(p.random(p.width), p.random(p.height - 100));
      this.reached = false;
    }

    show() {
      p.fill(255);
      p.noStroke();
      p.ellipse(this.pos.x, this.pos.y, 4, 4);
    }
  }

  class Branch {
    constructor(parent, pos, dir) {
      this.parent = parent;
      this.pos = pos;
      this.dir = dir;
      this.origDir = this.dir.copy();
      this.count = 0;
      this.len = 5;
    }

    reset() {
      this.dir = this.origDir.copy();
      this.count = 0;
    }

    next() {
      const nextDir = p.constructor.Vector.mult(this.dir, this.len);
      const nextPos = p.constructor.Vector.add(this.pos, nextDir);
      return new Branch(this, nextPos, this.dir.copy());
    }

    show() {
      if (this.parent) {
        p.stroke(255);
        p.strokeWeight(2);
        p.line(this.pos.x, this.pos.y, this.parent.pos.x, this.parent.pos.y);
      }
    }
  }

  class Tree {
    constructor() {
      this.leaves = [];
      this.branches = [];

      for (let i = 0; i < 1500; i++) {
        this.leaves.push(new Leaf());
      }

      const pos = p.createVector(p.width / 2, p.height);
      const dir = p.createVector(0, -1);
      const root = new Branch(null, pos, dir);
      this.branches.push(root);

      let current = root;
      let found = false;

      while (!found) {
        for (let i = 0; i < this.leaves.length; i++) {
          const d = p.constructor.Vector.dist(current.pos, this.leaves[i].pos);
          if (d < max_dist) {
            found = true;
            break;
          }
        }

        if (!found) {
          const branch = current.next();
          current = branch;
          this.branches.push(current);
        }
      }
    }

    grow() {
      for (let i = 0; i < this.leaves.length; i++) {
        const leaf = this.leaves[i];
        let closestBranch = null;
        let record = max_dist;

        for (let j = 0; j < this.branches.length; j++) {
          const branch = this.branches[j];
          const d = p.constructor.Vector.dist(leaf.pos, branch.pos);

          if (d < min_dist) {
            leaf.reached = true;
            closestBranch = null;
            break;
          } else if (d < record) {
            closestBranch = branch;
            record = d;
          }
        }

        if (closestBranch != null) {
          const newDir = p.constructor.Vector.sub(leaf.pos, closestBranch.pos);
          newDir.normalize();
          closestBranch.dir.add(newDir);
          closestBranch.count++;
        }
      }

      // Remove reached leaves
      this.leaves = this.leaves.filter((leaf) => !leaf.reached);

      // Grow new branches
      const newBranches = [];
      for (let branch of this.branches) {
        if (branch.count > 0) {
          branch.dir.div(branch.count + 1);
          newBranches.push(branch.next());
          branch.reset();
        }
      }
      this.branches.push(...newBranches);
    }

    show() {
      for (let leaf of this.leaves) {
        leaf.show();
      }
      for (let branch of this.branches) {
        branch.show();
      }
    }
  }

  p.setup = () => {
    p.createCanvas(640, 360);
    tree = new Tree();
  };

  p.draw = () => {
    p.background(0);
    tree.show();
    tree.grow();
  };
};
