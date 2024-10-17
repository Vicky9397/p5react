import { simpleSketch } from '../sketches/simpleSketch';
import { momentumSketch } from '../sketches/momentumSketch';

// Define available sketches in an object with a name and corresponding sketch function
export const sketches = {
    Simple: simpleSketch,
    Momentum: momentumSketch,
};