import { ALIVE, WORLD_SIZE, createWorld } from "./game";

export const presetOptions = [
  { key: "line", value: "line", text: "Line" },
  { key: "cross", value: "cross", text: "Cross" },
  { key: "plus", value: "plus", text: "Plus" },
  { key: "glider", value: "glider", text: "Glider" },
  { key: "pulsar", value: "pulsar", text: "Pulsar" },
  { key: "diehard", value: "diehard", text: "Diehard" },
  { key: "gliderGun", value: "gliderGun", text: "Gosper Glider Gun" },
  { key: "infiniteGrowth", value: "infiniteGrowth", text: "Infinite Growth" },
];

export const loadPreset = (preset) => {
  let newWorld = createWorld();
  const half = Math.floor(WORLD_SIZE / 2);
  // console.log("presets.jsx>loadPreset", newWorld);
  switch (preset) {
    case "line":
      return line(newWorld, half);
    case "glider":
      return glider(newWorld, half);
    case "cross":
      return cross(newWorld);
    case "plus":
      return plus(newWorld, half);
    case "pulsar":
      return pulsar(newWorld, half);
    case "diehard":
      return diehard(newWorld, half);
    case "gliderGun":
      return gliderGun(newWorld, half);
    case "infiniteGrowth":
      return infiniteGrowth(newWorld, half);

    default:
      return newWorld;
  }
};

const line = (world, half) => {
  world[half].fill(ALIVE);
  return world;
};

const cross = (world) => {
  const n = world.length - 1;
  for (let i = 0; i <= n; i++) {
    world[i][i] = ALIVE;
    world[n - i][i] = ALIVE;
    console.log("cross: ", n - i);
  }
  return world;
};

const plus = (world, half) => {
  const n = world.length - 1;
  world[half].fill(ALIVE);
  for (let i = 0; i <= n; i++) {
    world[i][half] = ALIVE;
  }
  return world;
};

const glider = (world, startX, startY) => {
  const half = Math.floor(WORLD_SIZE / 2);
  const x = half;
  const y = half;
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

const pulsar = (world) => {
  return world;
};

const diehard = (world) => {
  return world;
};

const gliderGun = (world) => {
  return world;
};

const infiniteGrowth = (world, half) => {
  const x = half - 20;
  world[half].splice(x, 8, 1, 1, 1, 1, 1, 1, 1, 1);
  world[half].splice(x + 9, 5, 1, 1, 1, 1, 1);
  world[half].splice(x + 17, 3, 1, 1, 1);
  world[half].splice(x + 26, 7, 1, 1, 1, 1, 1, 1, 1);
  world[half].splice(x + 34, 5, 1, 1, 1, 1, 1);
  return world;
};
