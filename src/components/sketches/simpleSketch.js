// this sketch renders a ball that is bouncing across the screen
export const simpleSketch = (p) => {
    let x = 0;
    let speed = 1;
  
    p.setup = () => {
      p.createCanvas(400, 400);
    };
  
    p.draw = () => {
      p.background(200);
      p.ellipse(x, 200, 50, 50); // Draw the ball
      x =ballMovement(x, speed); // Move the ball
    };
  
    const ballMovement = (x, speed) => {
        x += speed; // Move the ball by speed value
    
        // Check if the ball hits the wall
        if (x + 25 > p.width || x - 25 < 0) {
          speed *= -1; // Reverse direction
        }

        return x;
      };
  };
  