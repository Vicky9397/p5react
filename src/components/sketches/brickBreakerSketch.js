export const brickBreakerSketch = (p) => {
    let paddle;
    let ball;
    let bricks = [];
    let cols = 10;  // Number of columns of bricks
    let rows = 5;   // Number of rows of bricks
    let brickWidth;
    let brickHeight = 20;
    let gameOver = false;
    let level = 1;
    let ballLaunched = false;
  
    p.setup = () => {
      p.createCanvas(800, 600);
      paddle = new Paddle();
      ball = new Ball();
      brickWidth = p.width / cols;
    };
  
    p.draw = () => {
        p.background(0);

        p.fill(255);
        p.textSize(16);
        p.text(`Level: ${level}`, 10, 20);
      
        if (gameOver) {
          p.textSize(32);
          p.textAlign(p.CENTER);
          p.text('GAME OVER', p.width / 2, p.height / 2);
          return;
        }
      
        paddle.show();
        paddle.update();
      
        if (!ballLaunched) {
          ball.pos.x = paddle.x + paddle.w / 2;  // Position ball on the paddle
          ball.pos.y = paddle.y - ball.r;
          ball.drawGuideLine();  // Draw the launch guide
        }
      
        ball.update();
        ball.show();  // Use the updated show method
      // Handle brick collision and rendering
      for (let i = bricks.length - 1; i >= 0; i--) {
        let brick = bricks[i];
        brick.show();
  
        if (ball.hits(brick)) {
          ball.reverseY();  // Bounce off the brick
          bricks.splice(i, 1);  // Remove the brick
        }
      }
  
      // Check if all bricks are cleared
      if (bricks.length === 0) {
        level++;
        ball.reset();  // Reset ball position
        ballLaunched = false;  // Ready for next launch
        createBricks();  // Create a new set of bricks
      }
  
      // Game over if the ball goes beyond the paddle
      if (ball.pos.y > p.height) {
        gameOver = true;
      }
    };
  
    // Handle paddle movement
    p.mouseMoved = () => {
      paddle.move(p.mouseX);
    };
  
    // Handle ball launch and angle adjustment
    p._onkeydown = (event) => {
        if (event.key === ' ') {
          event.preventDefault(); // Prevent the default behavior of space bar
          if (!ballLaunched) {
            ball.launch(); // Launch the ball
            ballLaunched = true; // Prevent multiple launches
          }
        }
      
        // Adjust launch angle using left and right arrow keys
        if (event.key === 'ArrowLeft') {
          event.preventDefault(); // Prevent default arrow key behavior
          ball.adjustAngle(-5);  // Decrease angle
        } else if (event.key === 'ArrowRight') {
          event.preventDefault(); // Prevent default arrow key behavior
          ball.adjustAngle(5);   // Increase angle
        }
    };

    // Brick Class
    class Brick {
        constructor(x, y) {
          this.x = x;
          this.y = y;
          this.w = brickWidth - 5;
          this.h = brickHeight;
        }
    
        show() {
          p.fill(255, 100, 100);
          p.rect(this.x, this.y, this.w, this.h);
        }
      }
  
    // Paddle Class
    class Paddle {
      constructor() {
        this.w = 120;
        this.h = 20;
        this.x = (p.width - this.w) / 2;
        this.y = p.height - this.h - 10;
        this.prevX = this.x; // Track the previous x position
        this.speed = 0;      // Speed of paddle
      }
  
      move(x) {
        this.prevX = this.x;  // Store the previous x position
        this.x = p.constrain(x - this.w / 2, 0, p.width - this.w);
        this.speed = this.x - this.prevX;  // Calculate the speed of the paddle
      }
  
      show() {
        p.fill(255);
        p.rect(this.x, this.y, this.w, this.h);
      }
  
      update() {
        // Check for ball collision with the paddle
        if (ball.pos.y + ball.r >= this.y && ball.pos.x > this.x && ball.pos.x < this.x + this.w) {
          ball.bounceOffPaddle(this);  // Call the ball's bounce logic with the paddle reference
        }
      }
    }
  
    // Ball Class
    class Ball {
      constructor() {
        this.r = 12;
        this.pos = p.createVector(p.width / 2, paddle.y - this.r);
        this.vel = p.createVector(0, 0);
        this.angle = 180;  // Initial angle for guide line (straight up)
        this.speed = 5;
      }

      drawGuideLine() {
        // Calculate the direction of the launch guide line
        let direction = p.createVector(0, -1);
        direction.rotate(p.radians(this.angle));
  
        // Draw a dotted line as the launch guide
        p.stroke(255);
        p.strokeWeight(1);
        p.drawingContext.setLineDash([5, 5]);  // Set dashed line style
        p.line(this.pos.x, this.pos.y, this.pos.x + direction.x * 100, this.pos.y + direction.y * 100);
        p.drawingContext.setLineDash([]);  // Reset line style
      }

      bounceOffPaddle(paddle) {
        // Calculate how far from the center of the paddle the ball hit
        let hitPos = (this.pos.x - (paddle.x + paddle.w / 2)) / (paddle.w / 2);
    
        // Change the ball's horizontal velocity based on where it hits the paddle
        this.vel.x = hitPos * 5; // Adjust the multiplier to control the effect
        this.vel.y *= -1;  // Reverse Y velocity to bounce upwards
    
        // Add paddle's speed to the ball's X velocity to create a dynamic bounce
        this.vel.x += paddle.speed * 0.5;  // Adjust this multiplier to tweak the effect of paddle movement
      }
  
      adjustAngle(delta) {
        this.angle = p.constrain(this.angle + delta, 45, 135);  // Limit angle between 45 and 135 degrees
      }
  
      launch() {
        // Determine initial velocities based on the angle
        let direction = p.createVector(0, 1);
        direction.rotate(p.radians(this.angle));
  
        this.vel.x = direction.x * this.speed;
        this.vel.y = direction.y * this.speed;
      }
  
      reset() {
        this.pos = p.createVector(p.width / 2, paddle.y - this.r);
        this.vel = p.createVector(0, 0);  // Reset ball velocity
        this.angle = 90;  // Reset guide angle
      }
  
      update() {
        this.pos.add(this.vel);

        // Bounce off walls
        if (this.pos.x > p.width || this.pos.x < 0) {
          this.reverseX();
        }
        if (this.pos.y < 0) {
          this.reverseY();
        }
      }
  
      reverseX() {
        this.vel.x *= -1;
      }
  
      reverseY() {
        this.vel.y *= -1;
      }
      show() {
        p.fill(255);
        p.ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
      }
      
      hits(brick) {
        return (
          this.pos.x > brick.x &&
          this.pos.x < brick.x + brick.w &&
          this.pos.y - this.r < brick.y + brick.h &&
          this.pos.y + this.r > brick.y
        );
      }
    }
    // Create a grid of bricks
    const createBricks = () => {
        bricks = [];
        for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
            let brick = new Brick(i * brickWidth, j * brickHeight + 50);
            bricks.push(brick);
          }
        }
      };
  };
  