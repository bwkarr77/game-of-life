export let WORLD_SIZE = 70; //make this changeable
export let GEN_TIME = 100; //milliseconds until next generation
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
  return Array(WORLD_SIZE)
    .fill()
    .map(() => Array(WORLD_SIZE).fill(DEAD));
};

export const getNeighbors = (x, y) => {
  return [
    [x, y + 1],
    [x, y - 1],
    [x - 1, y - 1],
    [x - 1, y],
    [x - 1, y + 1],
    [x + 1, y - 1],
    [x + 1, y],
    [x + 1, y + 1],
  ].filter((cell) => {
    // console.log("getNeighbors: ", cell[0], cell[1]);
    // if x and y of cell are greater than 0 and inside the world perimeter:
    return (
      cell[0] >= 0 &&
      cell[0] < WORLD_SIZE &&
      cell[1] >= 0 &&
      cell[1] < WORLD_SIZE
    );
  });
};

export const aliveNeighbors = (world, x, y) => {
  return getNeighbors(x, y).filter((living) => {
    // console.log("living: ", living[0], living[1], world[living[0]][living[1]]);
    return world[living[0]][living[1]] === ALIVE;
  }).length;
};

export const nextGen = (world) => {
  // console.log("nextGen: ", world);
  let newWorld = createWorld();
  for (let x = 0; x < WORLD_SIZE; x++) {
    for (let y = 0; y < WORLD_SIZE; y++) {
      const alive = aliveNeighbors(world, x, y);
      const cell = world[x][y];
      newWorld[x][y] =
        alive === 3 || (alive === 2 && cell === ALIVE) ? ALIVE : DEAD;
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
