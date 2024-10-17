export const momentumSketch = (p) => {
    // Box properties: position, velocity, mass, size, color
  let box1 = {
    pos: { x: 100, y: 350 },
    vel: { x: 0.1, y: 0 },
    mass: 1,
    width: 50,
    height: 50,
    col: { r: 200, g: 200, b: 200 }
  };

  let box2 = {
    pos: { x: 300, y: 300 },
    vel: { x: -0.5, y: 0 },
    mass: 100,
    width: 100,
    height: 100,
    col: { r: 200, g: 200, b: 200 }
  };

  p.setup = () => {
    p.createCanvas(400, 400);
  };

  p.draw = () => {
    p.background(200);

    // Draw the two boxes
    p.fill(box1.col.r, box1.col.g, box1.col.b);
    p.rect(box1.pos.x, box1.pos.y, box1.width, box1.height); // Draw first box
    
    p.fill(box2.col.r, box2.col.g, box2.col.b);
    p.rect(box2.pos.x, box2.pos.y, box2.width, box2.height); // Draw second box

    // Update positions of both boxes
    updatePosition(box1);
    updatePosition(box2);

    // Check for collision and apply conservation of momentum
    if (isColliding(box1, box2)) {
      applyConservationOfMomentum(box1, box2);
    }
  };

  const updatePosition = (box) => {
    box.pos.x += box.vel.x;
    box.pos.y += box.vel.y;

    // Check for wall collisions (left and right boundaries)
    if (box.pos.x < 0 || box.pos.x + box.width > p.width) {
      box.vel.x *= -1;
    }
  };

  const isColliding = (b1, b2) => {
    // Check for collision between the two boxes (based on edges)
    return b1.pos.x + b1.width >= b2.pos.x && b1.pos.x <= b2.pos.x + b2.width;
  };

  const applyConservationOfMomentum = (b1, b2) => {
    // Store initial velocities
    let v1Initial = b1.vel.x;
    let v2Initial = b2.vel.x;

    // Calculate new velocities using the conservation of momentum formula
    let v1Final = ((b1.mass - b2.mass) * v1Initial + 2 * b2.mass * v2Initial) / (b1.mass + b2.mass);
    let v2Final = ((b2.mass - b1.mass) * v2Initial + 2 * b1.mass * v1Initial) / (b1.mass + b2.mass);

    // Update velocities
    b1.vel.x = v1Final;
    b2.vel.x = v2Final;
  };
  };
  