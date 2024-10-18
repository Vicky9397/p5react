export const simpleSketch = (p) => {
  let pos = { x: 25, y: 25 }; // Initial position of the ball
  let speed = { x: 1, y: 1.5 }; // Initial speed in both x and y directions
  let col = { r: 255, g: 255, b: 255 };
  let c = p.color(col.r, col.g, col.b);

  // Input elements for controlling velocities
  let xVelInput, yVelInput;
  let pauseButton;
  let isPaused = false; // To track whether the simulation is paused

  p.setup = () => {
    let canvas = p.createCanvas(400, 400);

    // Get the position of the canvas
    let canvasX = canvas.position().x;
    let canvasY = canvas.position().y;

    // Create inputs for X and Y velocities
    p.createElement('h3', 'Ball Velocity').position(canvasX + 100, canvasY + 430);
    
    p.createElement('p', 'X-Velocity:').position(canvasX + 20, canvasY + 460);
    xVelInput = p.createInput(speed.x.toString());
    xVelInput.position(canvasX + 100, canvasY + 478);
    xVelInput.elt.disabled = true;
    xVelInput.size(50);
    xVelInput.input(() => {
      speed.x = parseFloat(xVelInput.value()) || 0;
    });

    p.createElement('p', 'Y-Velocity:').position(canvasX + 20, canvasY + 490);
    yVelInput = p.createInput(speed.y.toString());
    yVelInput.position(canvasX + 100, canvasY + 508);
    yVelInput.elt.disabled = true;
    yVelInput.size(50);
    yVelInput.input(() => {
      speed.y = parseFloat(yVelInput.value()) || 0;
    });

    // Create the pause/resume button
    pauseButton = p.createButton('Pause');
    pauseButton.position(canvasX + 150, canvasY + 550);
    pauseButton.mousePressed(toggleSimulation); // Handle pause/resume
  };

  p.draw = () => {
    p.background(200);
    p.fill(c);
    p.ellipse(pos.x, pos.y, 50, 50); // Draw the ball

    // Update position and handle collision only if the simulation is running
    if (!isPaused) {
      updatePosition();
      handleCollision();
    }
  };

  const updatePosition = () => {
    pos.x += speed.x; // Move the ball horizontally
    pos.y += speed.y; // Move the ball vertically
  };

  const handleCollision = () => {
    // Reverse direction and change color on collision with walls
    if (pos.x + 25 > p.width || pos.x - 25 < 0) {
      speed.x *= -1;
      changeColor();
    }
    if (pos.y + 25 > p.height || pos.y - 25 < 0) {
      speed.y *= -1;
      changeColor();
    }
  };

  const changeColor = () => {
    col.r = Math.floor(Math.random() * 256);
    col.g = Math.floor(Math.random() * 256);
    col.b = Math.floor(Math.random() * 256);
    c = p.color(col.r, col.g, col.b);
  };

  // Toggle between pausing and resuming the simulation
  const toggleSimulation = () => {
    isPaused = !isPaused;
    if (isPaused) {
      pauseButton.html('Resume');
      // Enable the inputs when paused
      xVelInput.elt.disabled = false;
      yVelInput.elt.disabled = false;
    } else {
      pauseButton.html('Pause');
      // Disable the inputs when running
      xVelInput.elt.disabled = true;
      yVelInput.elt.disabled = true;
    }
  };
};
