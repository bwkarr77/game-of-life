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
  // returns an array of MAXIMUM of 1x26 arrays
  // --ONLY IF they are within 0 and WORLD_SIZE
  // each index is a 1x3 array of the x,y,z location of each neighbor
  const ret = [
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
    // if x,y,z of cell are within 0 and WORLD_SIZE:
    return (
      cell[0] >= 0 &&
      cell[0] < WORLD_SIZE &&
      cell[1] >= 0 &&
      cell[1] < WORLD_SIZE &&
      cell[2] >= 0 &&
      cell[2] < WORLD_SIZE
    );
  });
  return ret;
};

export const aliveNeighbors = (world, x, y, z) => {
  // aliveNeighbors returns an array
  const res = getNeighbors3D(x, y, z).filter((cell) => {
    // getNeighbors3D => returns a 1x26 array of cells (1x3 arrays with [x,y,z] coords)
    // then => filter through each 1x3 array, and testing if they are "ALIVE"
    // ex:
    // cell = [cell[0], cell[1], cell[2]] = [2, 1, 2]
    return world[cell[0]][cell[1]][cell[2]] === ALIVE;
    // getNeighbors array returns ONLY cells that are ALIVE===1
  }).length;
  // .length converts getNeighbors into a count of the number of Cells that are ALIVE
  return res;
};

export const nextGen = (world) => {
  let newWorld = createWorld();
  for (let x = 0; x < WORLD_SIZE; x++) {
    for (let y = 0; y < WORLD_SIZE; y++) {
      for (let z = 0; z < WORLD_SIZE; z++) {
        const alive = aliveNeighbors(world, x, y, z);
        const cell = world[x][y][z];
        // console.log("nextGen, aliveNeighbor:", alive, cell);
        newWorld[x][y][z] =
          // 4333 relates to
          alive === 4 || (alive === 5 && cell === ALIVE) ? ALIVE : DEAD;
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
  // Take a 3D array (world), then map through each 2D array (plane), then map through each 1D array (row):
  // fill each cell with a 1 or 0 (Math.round(Math.random()))
  return world.map((plane) =>
    plane.map((row) => row.map((cell) => Math.round(Math.random())))
  );
};
