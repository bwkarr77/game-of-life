import { CubeCamera } from "three";

export let WORLD_SIZE = 5; //make this changeable
export let GEN_TIME = 1000; //milliseconds until next generation
export const ALIVE = 1;
export const DEAD = 0;

export const getWorldSize = (gridSize) => {
  console.log("getWorldSize: ", gridSize, WORLD_SIZE);
  WORLD_SIZE = gridSize;
  return WORLD_SIZE;
};

export const getSpeed = (genSpeed) => {
  GEN_TIME = genSpeed;
  return GEN_TIME;
};

export const createWorld = () => {
  return Array(WORLD_SIZE) //creates an array of WORLD_SIZE
    .fill()
    .map(
      () =>
        Array(WORLD_SIZE) //creates a 2D array "inside" of 1st Array
          .fill()
          .map(() => Array(WORLD_SIZE).fill(DEAD)) // creates a 3D array 'inside' the 2nd Array
    );
};

export const create3DWorld = () => {
  const cubeWorld = [];
  for (var i = 0; i < WORLD_SIZE; i++) {
    var cubePlane = [];
    for (var j = 0; j < WORLD_SIZE; j++) {
      var cubeRow = [];
      for (var k = 0; k < WORLD_SIZE; k++) {
        var cube = DEAD;
        cubeRow.push(cube);
      }
      cubePlane.push(cubeRow);
    }
    cubeWorld.push(cubePlane);
  }
  return cubeWorld;
};

export const getNeighbors3D = (x, y, z) => {
  return [
    //top section
    [x - 1, y - 1, z - 1],
    [x, y - 1, z - 1],
    [x + 1, y - 1, z - 1],
    [x - 1, y, z - 1],
    [x, y, z - 1],
    [x + 1, y, z - 1],
    [x - 1, y + 1, z - 1],
    [x, y + 1, z - 1],
    [x + 1, y + 1, z - 1],
    //mid section
    [x - 1, y - 1, z],
    [x, y - 1, z],
    [x + 1, y - 1, z],
    [x - 1, y, z],
    [x + 1, y, z],
    [x - 1, y + 1, z],
    [x, y + 1, z],
    [x + 1, y + 1, z],
    //bottom section
    [x - 1, y - 1, z + 1],
    [x, y - 1, z + 1],
    [x + 1, y - 1, z + 1],
    [x - 1, y, z + 1],
    [x, y, z + 1],
    [x + 1, y, z + 1],
    [x - 1, y + 1, z + 1],
    [x, y + 1, z + 1],
    [x + 1, y + 1, z + 1],
  ].filter((cell) => {
    // console.log("getNeighbors: ", cell[0], cell[1], cell[2]);
    // if x and y of cell are greater than 0 and inside the world perimeter:
    return (
      cell[0] >= 0 &&
      cell[0] < WORLD_SIZE &&
      cell[1] >= 0 &&
      cell[1] < WORLD_SIZE &&
      cell[2] >= 0 &&
      cell[2] < WORLD_SIZE
    );
  });
};

export const aliveNeighbors = (world, x, y, z) => {
  // console.log("3DaliveNeighbors: ", x, y, z, world);
  const res = getNeighbors3D(x, y, z).filter((living) => {
    // console.log("living...: ", world[living[0]][living[1]]);
    // console.log("living...: ", living, living[0], living[1], living[2]);
    return world[living[0]][living[1]][living[2]] === ALIVE;
  }).length;
  return res;
};

export const nextGen = (world) => {
  // console.log("3D,nextGen: ", world);
  let newWorld = createWorld();
  for (let x = 0; x < WORLD_SIZE; x++) {
    for (let y = 0; y < WORLD_SIZE; y++) {
      for (let z = 0; z < WORLD_SIZE; z++) {
        const alive = aliveNeighbors(world, x, y, z);
        const cell = world[x][y][z];
        // console.log("nextGen, aliveNeighbor:", alive, cell);
        newWorld[x][y][z] =
          // 4333 relates to
          alive === 5 || (alive === 4 && cell === ALIVE) ? ALIVE : DEAD;
      }
    }
  }
  return newWorld;
};

export const changeArray = (arr, i, value) => {
  // console.log("changeArray: ", arr, i, value);
  return [...arr.slice(0, i), value, ...arr.slice(i + 1)];
};

export const randomFill = (world) => {
  // map through each cell from "world",
  // fill each cell with a 1 or 0 (Math.round(Math.random()))
  return world.map((row) => row.map((cell) => Math.round(Math.random())));
};
