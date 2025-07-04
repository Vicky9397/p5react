export const mazeSketch = (p) => {
  let cols, rows;
  const w = 20;
  let grid = [];
  let current;
  let stack = [];

  class Cell {
    constructor(i, j) {
      this.i = i;
      this.j = j;
      this.walls = [true, true, true, true]; // top, right, bottom, left
      this.visited = false;
    }

    checkNeighbors() {
      const neighbors = [];

      const top = grid[index(this.i, this.j - 1)];
      const right = grid[index(this.i + 1, this.j)];
      const bottom = grid[index(this.i, this.j + 1)];
      const left = grid[index(this.i - 1, this.j)];

      if (top && !top.visited) neighbors.push(top);
      if (right && !right.visited) neighbors.push(right);
      if (bottom && !bottom.visited) neighbors.push(bottom);
      if (left && !left.visited) neighbors.push(left);

      if (neighbors.length > 0) {
        const r = p.floor(p.random(0, neighbors.length));
        return neighbors[r];
      } else {
        return undefined;
      }
    }

    highlight() {
      const x = this.i * w;
      const y = this.j * w;
      p.noStroke();
      p.fill(0, 0, 255, 100);
      p.rect(x, y, w, w);
    }

    show() {
      const x = this.i * w;
      const y = this.j * w;
      p.stroke(255);
      if (this.walls[0]) p.line(x, y, x + w, y); // top
      if (this.walls[1]) p.line(x + w, y, x + w, y + w); // right
      if (this.walls[2]) p.line(x + w, y + w, x, y + w); // bottom
      if (this.walls[3]) p.line(x, y + w, x, y); // left

      if (this.visited) {
        p.noStroke();
        p.fill(255, 0, 255, 100);
        p.rect(x, y, w, w);
      }
    }
  }

  const index = (i, j) => {
    if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) return -1;
    return i + j * cols;
  };

  const removeWalls = (a, b) => {
    const x = a.i - b.i;
    if (x === 1) {
      a.walls[3] = false;
      b.walls[1] = false;
    } else if (x === -1) {
      a.walls[1] = false;
      b.walls[3] = false;
    }

    const y = a.j - b.j;
    if (y === 1) {
      a.walls[0] = false;
      b.walls[2] = false;
    } else if (y === -1) {
      a.walls[2] = false;
      b.walls[0] = false;
    }
  };

  p.setup = () => {
    p.createCanvas(600, 600);
    cols = p.floor(p.width / w);
    rows = p.floor(p.height / w);

    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        const cell = new Cell(i, j);
        grid.push(cell);
      }
    }

    current = grid[0];
  };

  p.draw = () => {
    p.background(51);
    grid.forEach(cell => cell.show());

    current.visited = true;
    current.highlight();

    const next = current.checkNeighbors();
    if (next) {
      next.visited = true;
      stack.push(current);
      removeWalls(current, next);
      current = next;
    } else if (stack.length > 0) {
      current = stack.pop();
    }
  };
};
