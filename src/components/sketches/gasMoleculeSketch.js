export const gasMoleculeSketch = (p) => {
    let molecules = [];
  
    class GasMolecule {
      constructor(x, y) {
        this.pos = p.createVector(x, y); // Use p.createVector instead of p5
        this.vel = p.createVector(p.random(-2, 2), p.random(-2, 2)); // Random initial velocity
        this.speed = 1.5; // Speed of random movement
        this.radius = 10; // Size of each molecule
      }
  
      update() {
        // Update ball position with random movement
        this.pos.x += p.random(-1, 1) * this.speed;
        this.pos.y += p.random(-1, 1) * this.speed;
  
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
              let pushForce = p.createVector(this.pos.x - other.pos.x, this.pos.y - other.pos.y);
              pushForce.setMag(0.5); // Push molecules apart when too close
              this.vel.add(pushForce); // Adjust velocity to move apart
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
      molecules.push(new GasMolecule(p.width / 2, p.height / 2)); // Initial gas molecule
    };
  
    p.draw = () => {
      p.background(200);
  
      for (let molecule of molecules) {
        molecule.avoidCollision(molecules); // Avoid collision with other molecules
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
  