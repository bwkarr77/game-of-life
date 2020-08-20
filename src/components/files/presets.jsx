import { ALIVE, WORLD_SIZE, createWorld } from "./game";

export const loadPreset = (preset) => {
  let newWorld = createWorld();
  // console.log("presets.jsx>loadPreset", newWorld);
  switch (preset) {
    case "line":
      return line(newWorld);
    case "glider":
      return glider(newWorld);
    default:
      return newWorld;
  }
};

const line = (world) => {
  const half = Math.floor(WORLD_SIZE / 2);
  world[half].fill(ALIVE);
  return world;
};

const glider = (world, startX, startY) => {
  const x = startX;
  const y = startY;
  world[x][y] = ALIVE;
  world[x][y + 1] = ALIVE;
  world[x][y + 2] = ALIVE;
  world[x - 1][y] = ALIVE;
  world[x - 2][y + 1] = ALIVE;
  return world;
};
// const glider = (world) => {
//   world[3][3] = ALIVE;
//   world[3][4] = ALIVE;
//   world[3][5] = ALIVE;
//   world[2][3] = ALIVE;
//   world[1][4] = ALIVE;

//   return world;
// };
