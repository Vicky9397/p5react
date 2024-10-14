export const simpleSketch = (p) => {
  let pos = { x: 25, y: 25 }; // Initial position of the ball
  let speed = { x: 1, y: 1.5 }; // Initial speed in both x and y directions

  let xSpeedSlider, ySpeedSlider;

  p.setup = () => {
    p.createCanvas(400, 400);

    // Create sliders to adjust speed in X and Y directions
    xSpeedSlider = p.createSlider(-5, 5, speed.x, 0.1);
    xSpeedSlider.position(10, p.height + 10);
    ySpeedSlider = p.createSlider(-5, 5, speed.y, 0.1);
    ySpeedSlider.position(10, p.height + 40);
  };

  p.draw = () => {
    p.background(200);

    // Get the slider values and update the speed
    speed.x = xSpeedSlider.value();
    speed.y = ySpeedSlider.value();

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
