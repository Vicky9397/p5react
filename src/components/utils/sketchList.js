import { simpleSketch } from '../sketches/simpleSketch';
import { momentumSketch } from '../sketches/momentumSketch';
import { dinoGame } from '../sketches/dinoGame';
import { randomMovementSketch } from '../sketches/randomMovementSketch';
import { gasMoleculeSketch } from '../sketches/gasMoleculeSketch';
import { steamEngineSketch } from '../sketches/steamEngineSketch';
import { brickBreakerSketch } from '../sketches/brickBreakerSketch';
import { spiroOrbitSketch } from '../sketches/spiroOrbitSketch';
import { starfieldSketch } from '../sketches/challenges/challenge01_starfield';

// Define available sketches in an object with a name and corresponding sketch function
export const sketches = {
    Simple: simpleSketch, //simple bouncing ball simulation
    Momentum: momentumSketch, //simulation of law of conservation of momentum
    //DinoGame: dinoGame, //jumping game inspired from chrome browser
    Random: randomMovementSketch, //simulation of atomic vibration
    GasMolecules: gasMoleculeSketch, //simulation of gas molecules
    //SteamEngine: steamEngineSketch, //simulation of steam engine in 2D
    //BrickBreaker: brickBreakerSketch, //brick breaker game
    SpiroOrbit: spiroOrbitSketch, //spirography simulation
    Starfield: starfieldSketch, //starfield simulation challenge from coding train
};