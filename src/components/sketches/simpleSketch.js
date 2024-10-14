export const simpleSketch = (p) => {
  let pos = { x: 25, y: 25 }; // Initial position of the ball
  let speed = { x: 1, y: 1.5 }; // Initial speed in both x and y directions

  p.setup = () => {
    p.createCanvas(400, 400);
  };

  p.draw = () => {
    p.background(200);
    p.ellipse(pos.x, pos.y, 50, 50); // Draw the ball

    // Update ball position and handle collision
    updatePosition();
    handleCollision();
  };

  const updatePosition = () => {
    pos.x += speed.x; // Move ball horizontally
    pos.y += speed.y; // Move ball vertically
  };

  const handleCollision = () => {
    // Reverse direction on collision with walls
    if (pos.x + 25 > p.width || pos.x - 25 < 0) speed.x *= -1;
    if (pos.y + 25 > p.height || pos.y - 25 < 0) speed.y *= -1;
  };
};