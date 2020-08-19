export const WORLD_SIZE = 70; //make this changeable
export const GEN_TIME = 500; //milliseconds until next generation
export const ALIVE = 1;
export const DEAD = 0;

export const createWorld = () => {
  return Array(WORLD_SIZE)
    .fill()
    .map(() => Array(WORLD_SIZE).fill(DEAD));
};

export const getNeighbors = (x, y) => {
  return;
};

export const aliveNeighbors = (world, x, y) => {
  return getNeighbors(x, y);
};

export const nextGen = (world) => {
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

export const changeCells = (arr, i, value) => [
  ...arr.slice(0, i),
  value,
  ...arr.slice(i + 1),
];
