export const randomMovementSketch = (p) => {
    let ball = {
      pos: { x: 200, y: 200 },
      speed: 2,
      radius: 20,
      col: { r: 255, g: 255, b: 255 },
    };
  
    p.setup = () => {
      p.createCanvas(400, 400);
    };
  
    p.draw = () => {
      p.background(0);
  
      // Draw the ball
      p.fill(ball.col.r, ball.col.g, ball.col.b);
      p.ellipse(ball.pos.x, ball.pos.y, ball.radius * 2, ball.radius * 2);
  
      // Update ball position with random movement
      ball.pos.x += p.random(-1, 1) * ball.speed;
      ball.pos.y += p.random(-1, 1) * ball.speed;
  
      // Keep the ball inside the canvas by bouncing off walls
      handleWallCollision();
    };
  
    const handleWallCollision = () => {
      // Bounce back when hitting walls
      if (ball.pos.x + ball.radius > p.width) {
        ball.pos.x = p.width - ball.radius;
      } else if (ball.pos.x - ball.radius < 0) {
        ball.pos.x = ball.radius;
      }
  
      if (ball.pos.y + ball.radius > p.height) {
        ball.pos.y = p.height - ball.radius;
      } else if (ball.pos.y - ball.radius < 0) {
        ball.pos.y = ball.radius;
      }
    };
  };
  