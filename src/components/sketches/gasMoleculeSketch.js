export const gasMoleculeSketch = (p) => {
    let molecules = [];
  
    class GasMolecule {
      constructor(x, y) {
        this.pos = p.createVector(x, y);
        this.vel = p5.Vector.random2D().mult(p.random(0.5, 2)); // Random speed and direction
        this.radius = 20; // Size of the molecule
      }
  
      update() {
        // Move the molecule
        this.pos.add(this.vel);
  
        // Check for wall collisions and bounce
        if (this.pos.x < this.radius || this.pos.x > p.width - this.radius) {
          this.vel.x *= -1;
        }
        if (this.pos.y < this.radius || this.pos.y > p.height - this.radius) {
          this.vel.y *= -1;
        }
      }
  
      avoidOverlap(otherMolecules) {
        // Loop through all other molecules and avoid overlap
        for (let other of otherMolecules) {
          if (other !== this) {
            let distBetween = p.dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
            let minDist = this.radius + other.radius;
  
            // If they are too close, apply a force to push them apart
            if (distBetween < minDist) {
              let pushAway = p5.Vector.sub(this.pos, other.pos).setMag(1); // Push them apart
              this.vel.add(pushAway);
            }
          }
        }
      }
  
      display() {
        p.fill(100, 150, 255, 150);
        p.noStroke();
        p.ellipse(this.pos.x, this.pos.y, this.radius * 2, this.radius * 2);
      }
    }
  
    p.setup = () => {
      p.createCanvas(400, 400);
      molecules.push(new GasMolecule(p.width / 2, p.height / 2)); // Start with one molecule
    };
  
    p.draw = () => {
      p.background(220);
  
      // Update and display all molecules
      for (let molecule of molecules) {
        molecule.avoidOverlap(molecules); // Avoid other molecules
        molecule.update();
        molecule.display();
      }
    };
  
    // Create new molecule on mouse click or touch
    p.mousePressed = () => {
      molecules.push(new GasMolecule(p.mouseX, p.mouseY));
    };
  
    p.touchStarted = () => {
      molecules.push(new GasMolecule(p.mouseX, p.mouseY));
    };
  };
  