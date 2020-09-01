// import { ALIVE, WORLD_SIZE_3D, create3DWorld } from "./game3D.jsx";
import { ALIVE, WORLD_SIZE_3D, createWorld } from "./game3D.jsx";

export const presetOptions = [
  { key: "box", value: "box", text: "Box" },
  { key: "plane", value: "plane", text: "plane" },
  // { key: "cross", value: "cross", text: "Cross" },
  // { key: "thickCross", value: "thickCross", text: "Thick Cross" },
  { key: "plus", value: "plus", text: "Plus" },
  // { key: "glider", value: "glider", text: "Glider" },
];

export const loadPreset = (preset) => {
  let newWorld = createWorld();
  const half = Math.floor(WORLD_SIZE_3D / 2);
  console.log("presets3D.jsx>loadPreset", preset);
  switch (preset.toLowerCase()) {
    case "box":
      return box(newWorld, half);
    case "plane":
      return plane(newWorld, half);
    case "glider":
      return glider(newWorld, half);
    case "cross":
      return cross(newWorld, half);
    case "thickCross":
      return thickCross(newWorld, half);
    case "plus":
      return plus(newWorld, half);
    default:
      return newWorld;
  }
};

const toBlock = (world, x0, y0) => {
  world[y0][x0] = ALIVE;
  world[y0 - 1][x0] = ALIVE;
  world[y0][x0 + 1] = ALIVE;
  world[y0 - 1][x0 + 1] = ALIVE;
  return world;
};

const toEgg = (world, y0, x0) => {
  world[x0][y0] = ALIVE;
  world[x0][y0 + 6] = ALIVE;
  world[x0][y0 + 4] = ALIVE;
  world[x0][y0 + 7] = ALIVE;
  for (let i = 0; i < 3; i++) {
    world[x0 + 1 + i][y0 + i] = ALIVE;
    world[x0 - 1 - i][y0 + i] = ALIVE;
  }
  world[x0 + 3][y0 + 3] = ALIVE;
  world[x0 + 2][y0 + 5] = ALIVE;
  world[x0 + 1][y0 + 6] = ALIVE;
  world[x0 - 3][y0 + 3] = ALIVE;
  world[x0 - 2][y0 + 5] = ALIVE;
  world[x0 - 1][y0 + 6] = ALIVE;

  return world;
};

const ship1 = (world, y0, x0) => {
  world[x0][y0] = ALIVE;
  world[x0][y0 + 1] = ALIVE;
  world[x0 - 1][y0] = ALIVE;
  world[x0 - 1][y0 + 1] = ALIVE;
  world[x0 - 2][y0 + 2] = ALIVE;
  world[x0 - 2][y0 + 4] = ALIVE;
  world[x0 - 3][y0 + 4] = ALIVE;
  //mirror?
  world[x0 + 1][y0] = ALIVE;
  world[x0 + 1][y0 + 1] = ALIVE;
  world[x0 + 1][y0 + 1] = ALIVE;
  world[x0 + 2][y0 + 2] = ALIVE;
  world[x0 + 2][y0 + 4] = ALIVE;
  world[x0 + 3][y0 + 4] = ALIVE;
  return world;
};

const toMirror = (world, i, x, y, axis) => {
  // world is the array, i is the starting reference, x/y are how much we're moving, axis is the axis to mirror
  world[i + x][i + y] = ALIVE;
  if (axis === "x") {
    // mirror across x-axis
    world[i - x][i + y] = ALIVE;
  } else if (axis === "y") {
    // mirror across y-axis
    world[i + x][i - y] = ALIVE;
  } else if (axis === "dia") {
    // mirror across diagonal axis
    world[i + y][i + x] = ALIVE;
  } else if (axis === "quad") {
    // mirror across x and y-axis (all 4 quadrants)
    world[i + x][i + y] = ALIVE;
    world[i - x][i + y] = ALIVE;
    world[i + x][i - y] = ALIVE;
    world[i - x][i - y] = ALIVE;
  }
  return world;
};

const box = (world, half) => {
  // 3d works
  const start = Math.ceil(half / 2);
  const boxSize = half + start;
  for (let i = start; i < boxSize; i++) {
    for (let j = start; j < boxSize; j++) {
      for (let k = start; k < boxSize; k++) {
        world[i][j][k] = ALIVE;
      }
    }
  }
  return world;
};

const plane = (world, half) => {
  // 3d works
  // console.log("plane: ", world, world[half], world[1][1][1]);
  world[half].map((row, j) => {
    // console.log("plane, row:", row);
    return world[half][j].fill(ALIVE);
  });
  return world;
};

const plus = (world, half) => {
  //3d works
  for (let i = 0; i < WORLD_SIZE_3D; i++) {
    world[i][half][half] = ALIVE;
    world[half][i][half] = ALIVE;
    world[half][half][i] = ALIVE;
  }
  return world;
};

const cross = (world, half) => {
  const n = world.length - 1;
  for (let i = 0; i < n / 2; i++) {
    world = toMirror(world, half, i, i, "quad");
  }
  return world;
};

const thickCross = (world, half) => {
  const n = world.length - 8;
  for (let i = 0; i < n / 2; i++) {
    world = toMirror(world, half, i, i, "quad");
    world = toMirror(world, half, i, i - 1, "quad");
    world = toMirror(world, half, i, i - 2, "quad");
    world = toMirror(world, half, i, i + 1, "quad");
    world = toMirror(world, half, i, i + 2, "quad");
  }
  return world;
};

const glider = (world, startX, startY) => {
  const half = Math.floor(WORLD_SIZE_3D / 2);
  const x = half;
  const y = half;
  world[x][y] = ALIVE;
  world[x][y + 1] = ALIVE;
  world[x][y + 2] = ALIVE;
  world[x - 1][y] = ALIVE;
  world[x - 2][y + 1] = ALIVE;
  return world;
};

const pulsar = (world, half) => {
  for (let i = 2; i <= 4; i++) {
    world = toMirror(world, half, i, 1, "quad");
    world = toMirror(world, half, i, 6, "quad");
    world = toMirror(world, half, 1, i, "quad");
    world = toMirror(world, half, 6, i, "quad");
  }
  return world;
};

const diehard = (world, half) => {
  return world;
};

const gliderGunSE = (world, half, x, y) => {
  // BLOCKS
  world = toBlock(world, half - 18 - x, half + 1 - y);
  world = toBlock(world, half + 16 - x, half - 1 - y);
  // Left side ship
  world = toEgg(world, half - 8 - x, half + 1 - y);
  // Right side ship
  world = ship1(world, half + 2 - x, half - 1 - y);
  return world;
};

const gliderGunNE = (world, half, x, y) => {
  // BLOCKS
  world = toBlock(world, half - 18 - x, half - 1 - y);
  world = toBlock(world, half + 16 - x, half + 1 - y);
  // Left side ship
  world = toEgg(world, half - 8 - x, half - 1 - y);
  // Right side ship
  world = ship1(world, half + 2 - x, half + 1 - y);
  return world;
};

const duelingGliderGuns = (world, half) => {
  world = gliderGunSE(world, half, 8, 10);
  world = gliderGunNE(world, half, 8, -10);
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
