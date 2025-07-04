import { simpleSketch } from '../sketches/simpleSketch';
import { momentumSketch } from '../sketches/momentumSketch';
import { dinoGame } from '../sketches/dinoGame';
import { randomMovementSketch } from '../sketches/randomMovementSketch';
import { gasMoleculeSketch } from '../sketches/gasMoleculeSketch';
import { steamEngineSketch } from '../sketches/steamEngineSketch';
import { brickBreakerSketch } from '../sketches/brickBreakerSketch';
import { spiroOrbitSketch } from '../sketches/spiroOrbitSketch';
import { starfieldSketch } from '../sketches/challenges/challenge001_starfield';
import { mengerSpongeSketch } from '../sketches/challenges/challenge002_menger_sponge_fractal';
import { snakeGameSketch } from '../sketches/challenges/challenge003_snake_game';
import { purpleRainSketch } from '../sketches/challenges/challenge004_purple_rain';
import { spaceInvadersSketch } from '../sketches/challenges/challenge005_space_invaders';
import { mitosisSketch } from '../sketches/challenges/challenge006_mitosis_simulation';
import { solarSystemSketch } from '../sketches/challenges/challenge007_solar_system_2d';
import { solarSystem3DSketch } from '../sketches/challenges/challenge008_solar_system_3d';
import { solarSystemTexturedSketch } from '../sketches/challenges/challenge009_solar_system_3d_textured';

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
    MengerSpongeFractal: mengerSpongeSketch, //menger sponge fractal challenge from coding train
    SnakeGame: snakeGameSketch, //snake game challenge from coding train
    PurpleRain: purpleRainSketch, // purple rain simulation from coding train
    SpaceInvaders: spaceInvadersSketch, // space invaders game challenge from coding train
    Mitosis: mitosisSketch, // mitosis simulation challenge from coding train
    SolarSystem2D: solarSystemSketch, // 2d solar system simulation challenge from coding train
    SolarSystem3D: solarSystem3DSketch, // 3d solar system simulation challenge from coding train
    SolarSystem3DTextured: solarSystemTexturedSketch, // 3d solar system simulation with textures challenge from coding train
};