export const dinoGame = (p) => {
    let dino;
    let obstacles = [];
    let gameSpeed = 6;
    let score = 0;
    let noiseOffset = 0; // Noise offset for generating random distances
  
    p.setup = () => {
      p.createCanvas(800, 200);
      dino = new Dino(p);
      obstacles.push(new Obstacle(p));
    };
  
    p.draw = () => {
      p.background(220);
  
      // Display and update score
      p.textSize(32);
      p.fill(0);
      p.text('Score: ' + score, 10, 30);
      score++;
  
      dino.update(p);
      dino.show(p);
  
      // Use noise to determine when to add a new obstacle
      noiseOffset += 0.01;
      let noiseValue = p.noise(noiseOffset);
      if (p.frameCount % p.floor(p.map(noiseValue, 0, 1, 50, 100)) === 0) {
        obstacles.push(new Obstacle(p));
      }
  
      for (let i = obstacles.length - 1; i >= 0; i--) {
        obstacles[i].update(p);
        obstacles[i].show(p);
  
        if (obstacles[i].hits(dino)) {
          console.log("GAME OVER");
          p.noLoop();
        }
  
        if (obstacles[i].offscreen()) {
          obstacles.splice(i, 1);
        }
      }
    };
  
    p._onkeydown = (event) => {
        if (event.key === ' ') {
          event.preventDefault();  // Prevent the default behavior of the up arrow (changing the dropdown)
          dino.jump(p);
        }
    };
      
    class Dino {
      constructor(p) {
        this.r = 50;
        this.x = 50;
        this.y = p.height - this.r;
        this.vy = 0;
        this.gravity = 2;
      }
  
      jump(p) {
        if (this.y === p.height - this.r) {
          this.vy = -25;
        }
      }
  
      hits(obstacle) {
        return (
          this.x < obstacle.x + obstacle.r &&
          this.x + this.r > obstacle.x &&
          this.y < obstacle.y + obstacle.r &&
          this.y + this.r > obstacle.y
        );
      }
  
      update(p) {
        this.y += this.vy;
        this.vy += this.gravity;
  
        if (this.y > p.height - this.r) {
          this.y = p.height - this.r;
          this.vy = 0;
        }
      }
  
      show(p) {
        p.fill(0);
        p.rect(this.x, this.y, this.r, this.r);
      }
    }
  
    class Obstacle {
      constructor(p) {
        this.r = 20;
        this.x = p.width;
        this.y = p.height - this.r;
      }
  
      update(p) {
        this.x -= gameSpeed;
      }
  
      offscreen() {
        return this.x < -this.r;
      }
  
      show(p) {
        p.fill(255, 0, 0);
        p.rect(this.x, this.y, this.r, this.r);
      }
  
      hits(dino) {
        return (
          dino.x < this.x + this.r &&
          dino.x + dino.r > this.x &&
          dino.y < this.y + this.r &&
          dino.y + dino.r > this.y
        );
      }
    }
  };
  