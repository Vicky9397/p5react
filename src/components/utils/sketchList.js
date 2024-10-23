import { simpleSketch } from '../sketches/simpleSketch';
import { momentumSketch } from '../sketches/momentumSketch';
import { dinoGame } from '../sketches/dinoGame';
import { randomMovementSketch } from '../sketches/randomMovementSketch';
import { gasMoleculeSketch } from '../sketches/gasMoleculeSketch';
import { steamEngineSketch } from '../sketches/steamEngineSketch';
import { brickBreakerSketch } from '../sketches/brickBreakerSketch';

// Define available sketches in an object with a name and corresponding sketch function
export const sketches = {
    Simple: simpleSketch,
    Momentum: momentumSketch,
    DinoGame: dinoGame,
    Random: randomMovementSketch,
    GasMolecules: gasMoleculeSketch,
    SteamEngine: steamEngineSketch,
    BrickBreaker: brickBreakerSketch
};