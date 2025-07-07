export const steamEngineSketch = (p) => {
    let piston, crankshaft, boiler, pressure, temperature, volume;
    let pistonPos, crankRotation;
    let heat = 0.05;  // Heat added per frame
    let isRunning = true;
  
    p.setup = () => {
      p.createCanvas(600, 400);
      pistonPos = 200;  // Initial position of the piston
      crankRotation = 0;
      pressure = 1;     // Starting pressure
      temperature = 300;  // Starting temperature in Kelvin
      volume = 100;     // Volume of the cylinder
    };
  
    p.draw = () => {
      p.background(220);
      p.fill(0);
      p.textSize(16);
      p.text(`Pressure: ${pressure.toFixed(2)} Pa`, 10, 20);
      p.text(`Temperature: ${temperature.toFixed(2)} K`, 10, 40);
      p.text(`Volume: ${volume.toFixed(2)} m³`, 10, 60);
  
      if (isRunning) {
        applyHeat();    // Add heat to the system
        movePiston();   // Move the piston based on pressure
        rotateCrank();  // Rotate the crankshaft
      }
  
      drawBoiler();
      drawPiston();
      drawCrankshaft();
    };
  
    const applyHeat = () => {
      temperature += heat;  // Increase temperature by the heat input
      pressure = (temperature * 8.314) / volume;  // Ideal gas law (simplified)
    };
  
    const movePiston = () => {
      let force = pressure * volume;  // Force exerted by steam on the piston
      pistonPos -= force * 0.001;     // Move the piston (scaling factor)
  
      // Keep piston within bounds of the cylinder
      if (pistonPos < 100) {
        pistonPos = 100;
      } else if (pistonPos > 300) {
        pistonPos = 300;
      }
  
      // Change volume based on piston position
      volume = p.map(pistonPos, 100, 300, 200, 100);
    };
  
    const rotateCrank = () => {
      crankRotation += 0.05;  // Rotate crankshaft (speed control)
      if (crankRotation > p.TWO_PI) {
        crankRotation = 0;
      }
    };
  
    const drawBoiler = () => {
      p.fill(100, 100, 255);
      p.rect(450, 150, 100, 100);  // Boiler shape
      p.fill(255);
      p.text("Boiler", 470, 175);
    };
  
    const drawPiston = () => {
      p.fill(100);
      p.rect(150, pistonPos, 50, 100);  // Piston
      p.text("Piston", 160, pistonPos + 120);
    };
  
    const drawCrankshaft = () => {
      p.push();
      p.translate(350, 250);
      p.rotate(crankRotation);    // Rotate crankshaft
      p.fill(200, 100, 50);
      p.rect(-10, -50, 20, 100);  // Crank arm
      p.pop();
    };
  
    // Control heat input and engine status
    p.mousePressed = () => {
      isRunning = !isRunning;  // Toggle engine on and off
    };
  };
  