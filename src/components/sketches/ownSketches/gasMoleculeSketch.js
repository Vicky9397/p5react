export const gasMoleculeSketch = (p) => {
    let molecules = [];
  
    class GasMolecule {
      constructor(x, y) {
        this.pos = p.createVector(x, y); // Position of the molecule
        this.vel = p.createVector(p.random(-2, 2), p.random(-2, 2)); // Initial random velocity
        this.speed = 1.5; // Speed of movement
        this.radius = 10; // Radius of the molecule
      }
  
      update() {
        // Update position with random movement
        this.pos.x += p.random(-1, 1) * this.speed;
        this.pos.y += p.random(-1, 1) * this.speed;
  
        // Ensure molecules bounce off the canvas walls
        if (this.pos.x < this.radius) {
          this.pos.x = this.radius;
        }
        if (this.pos.x > p.width - this.radius) {
          this.pos.x = p.width - this.radius;
        }
        if (this.pos.y < this.radius) {
          this.pos.y = this.radius;
        }
        if (this.pos.y > p.height - this.radius) {
          this.pos.y = p.height - this.radius;
        }
      }
  
      avoidOverlap(otherMolecules) {
        for (let other of otherMolecules) {
          if (this !== other) {
            let distance = p.dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
            let minDistance = this.radius + other.radius + 2.5;
  
            // If distance is less than the sum of their radii, adjust position
            if (distance < minDistance) {
              let overlap = minDistance - distance;
              let direction = p.createVector(this.pos.x - other.pos.x, this.pos.y - other.pos.y);
              direction.normalize();
  
              // Move this molecule away by the overlap amount
              this.pos.add(direction.mult(overlap));
            }
          }
        }
      }
  
      display() {
        p.fill(0, 200, 255, 150);
        p.noStroke();
        p.ellipse(this.pos.x, this.pos.y, this.radius * 2);
      }
    }
  
    p.setup = () => {
      p.createCanvas(400, 400);
      molecules.push(new GasMolecule(p.width / 2, p.height / 2)); // Initial molecule
    };
  
    p.draw = () => {
      p.background(200);
  
      for (let molecule of molecules) {
        molecule.avoidOverlap(molecules); // Avoid overlapping with other molecules
        molecule.update(); // Update position with random movement
        molecule.display(); // Display molecule
      }
    };
  
    // Add a new gas molecule on mouse click or touch
    p.mousePressed = () => {
      molecules.push(new GasMolecule(p.mouseX, p.mouseY));
    };
  
    p.touchStarted = () => {
      molecules.push(new GasMolecule(p.mouseX, p.mouseY));
    };
  };
  