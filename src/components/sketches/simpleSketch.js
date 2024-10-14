export const simpleSketch = (p) => {
  let pos = { x: 25, y: 25 }; // Initial position of the ball
  let speed = { x: 1, y: 1.5 }; // Initial speed in both x and y directions
  let col = {r: 255, g: 255, b: 255}
  let c = p.color(col.r, col.g, col.b);

  p.setup = () => {
    p.createCanvas(400, 400);
  };

  p.draw = () => {
    p.background(200);
    p.fill(c);
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
    if (pos.x + 25 > p.width || pos.x - 25 < 0) 
    { 
      speed.x *= -1;
      changeColor();
    }
    if (pos.y + 25 > p.height || pos.y - 25 < 0) 
    {
      speed.y *= -1;
      changeColor();
    }
  };

  const changeColor = () => {
    col.r = Math.floor(Math.random() * 256);
    col.g = Math.floor(Math.random() * 256);
    col.b = Math.floor(Math.random() * 256);
    c = p.color(col.r, col.g, col.b);
  }
};