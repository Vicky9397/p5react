export const gasMoleculeSketch = (p) => {
    let molecules = [];
  
    class GasMolecule {
      constructor(x, y) {
        this.pos = p.createVector(x, y); // Position vector
        this.vel = p5.Vector.random2D().mult(p.random(1, 2)); // Random velocity
        this.radius = 20; // Size of each molecule
      }
  
      update() {
        this.pos.add(this.vel); // Update position based on velocity
  
        // Bounce off the walls (confined space)
        if (this.pos.x < this.radius || this.pos.x > p.width - this.radius) {
          this.vel.x *= -1;
        }
        if (this.pos.y < this.radius || this.pos.y > p.height - this.radius) {
          this.vel.y *= -1;
        }
      }
  
      avoidCollision(otherMolecules) {
        for (let other of otherMolecules) {
          if (this !== other) {
            let distance = p.dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
            let minDistance = this.radius + other.radius;
  
            if (distance < minDistance) {
              let pushForce = p5.Vector.sub(this.pos, other.pos).setMag(0.5); // Push molecules apart
              this.vel.add(pushForce); // Add force to velocity to push apart
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
      p.createCanvas(500, 500);
      molecules.push(new GasMolecule(p.width / 2, p.height / 2)); // Initial gas molecule in the center
    };
  
    p.draw = () => {
      p.background(255);
  
      for (let molecule of molecules) {
        molecule.avoidCollision(molecules); // Avoid collision with other molecules
        molecule.update(); // Update position
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
  