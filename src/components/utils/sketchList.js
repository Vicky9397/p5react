import { simpleSketch } from '../sketches/simpleSketch';
import { momentumSketch } from '../sketches/momentumSketch';
import { dinoGame } from '../sketches/dinoGame';

// Define available sketches in an object with a name and corresponding sketch function
export const sketches = {
    Simple: simpleSketch,
    Momentum: momentumSketch,
    DinoGame: dinoGame
};