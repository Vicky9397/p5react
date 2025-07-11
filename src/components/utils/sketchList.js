import { simpleSketch } from '../sketches/ownSketches/simpleSketch';
import { momentumSketch } from '../sketches/ownSketches/momentumSketch';
import { dinoGame } from '../sketches/ownSketches/dinoGame';
import { randomMovementSketch } from '../sketches/ownSketches/randomMovementSketch';
import { gasMoleculeSketch } from '../sketches/ownSketches/gasMoleculeSketch';
import { steamEngineSketch } from '../sketches/ownSketches/steamEngineSketch';
import { brickBreakerSketch } from '../sketches/ownSketches/brickBreakerSketch';
import { spiroOrbitSketch } from '../sketches/ownSketches/spiroOrbitSketch';
import { starfieldSketch } from '../sketches/challenges/challenge001_starfield';
import { mengerSpongeSketch } from '../sketches/challenges/challenge002_menger_sponge_fractal';
import { snakeGameSketch } from '../sketches/challenges/challenge003_snake_game';
import { purpleRainSketch } from '../sketches/challenges/challenge004_purple_rain';
import { spaceInvadersSketch } from '../sketches/challenges/challenge005_space_invaders';
import { mitosisSketch } from '../sketches/challenges/challenge006_mitosis_simulation';
import { solarSystemSketch } from '../sketches/challenges/challenge007_solar_system_2d';
import { solarSystem3DSketch } from '../sketches/challenges/challenge008_solar_system_3d';
import { solarSystemTexturedSketch } from '../sketches/challenges/challenge009_solar_system_3d_textured';
import { mazeSketch } from '../sketches/challenges/challenge010_maze_generator';
import { terrain3DSketch } from '../sketches/challenges/challenge011_3d_terrain_generation_using_perlin_noise';
import { lorenzAttractorSketch } from '../sketches/challenges/challenge012_lorenz_attractor';
import { reactionDiffusionSketch } from '../sketches/challenges/challenge013_reaction_diffusion';
import { fractalTreeSketch } from '../sketches/challenges/challenge014_recursive_fractal_tree';
import { fractalTreeOOSketch } from '../sketches/challenges/challenge015_object_oriented_fractal_tree';
import { lSystemFractalTreeSketch } from '../sketches/challenges/challenge016_fractal_trees_L_system';
import { spaceColonizationTreeSketch } from '../sketches/challenges/challenge017_space_colonization';
import { superellipseSketch } from '../sketches/challenges/challenge019_super_ellipse';
import { clothSimulationSketch } from '../sketches/challenges/challenge020_cloth_simulation_3d';
import { mandelbrotSketch } from '../sketches/challenges/challenge021_mandel_brot';
import { juliaSetSketch } from '../sketches/challenges/challenge022_juliaset';
import { superShape2DSketch } from '../sketches/challenges/challenge023_2d_super_shape_generator';
import { perlinFlowFieldSketch } from '../sketches/challenges/challenge024_perlin_noise_flow_field';
import { sphericalGeometrySketch } from '../sketches/challenges/challenge025_sphere_generator';

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
    MazeGenerator: mazeSketch, // maze generator using backtracing algorithm challenge from coding train
    TerrainGenerator3D: terrain3DSketch, // 3d terrain generation using perlin noise challenge from coding train
    LorenzAttractor: lorenzAttractorSketch, // lorenz attractor challenge from coding train
    ReactionDiffusion: reactionDiffusionSketch, // reaction diffusion algorithm challenge from coding train
    RecursiveFractalTree: fractalTreeSketch, // recursive fractal tree challenge from coding train
    ObjectOrientedFractalTree: fractalTreeOOSketch, // object oriented fractal tree challenge from coding train
    LSystemFractalTree: lSystemFractalTreeSketch, // fractal trees L system challenge from coding train
    SpaceColonization: spaceColonizationTreeSketch, // space colonization challenge from coding train
    SuperEllipse: superellipseSketch, // super ellipse challenge from coding train
    ClothSimulation: clothSimulationSketch, // cloth simulation challenge from coding train
    MandelBrot: mandelbrotSketch, // mandelbrot fractal simulation challenge from coding train
    JuliaSet: juliaSetSketch, // julia set fractal challenge from coding train
    SuperShape2D: superShape2DSketch, // 2d super shape generator challenge from coding train
    PerlinNoiseField: perlinFlowFieldSketch, // perlin noise flow field generator challenge from coding train
    SphereGenerator: sphericalGeometrySketch, // sphere generator challenge from coding train
};