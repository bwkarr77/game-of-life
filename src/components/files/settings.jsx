import { ALIVE, WORLD_SIZE, createWorld } from "./game";

export const colorOptions = [
  { key: "greyMode", value: "greyMode", text: "greyMode" },
  { key: "dayMode", value: "dayMode", text: "dayMode" },
  { key: "darkMode", value: "darkMode", text: "darkMode" },
  // { key: "randomColor", value: "randomColor", text: "randomColor" },
  // { key: "pulsar", value: "pulsar", text: "Pulsar" },
  // { key: "diehard", value: "diehard", text: "Diehard" },
  // { key: "gliderGun", value: "gliderGun", text: "Gosper Glider Gun" },
  // { key: "infiniteGrowth", value: "infiniteGrowth", text: "Infinite Growth" },
];

export const loadColorStyling = (preset) => {
  let newWorld = createWorld();
  // console.log("presets.jsx>loadPreset", newWorld);
  switch (preset) {
    case "greyMode":
      return greyMode();
    case "darkMode":
      return darkMode();
    case "dayMode":
      return dayMode();
    case "randomColor":
      return randomColor();
    default:
      return newWorld;
  }
};

const greyMode = (world, half) => {
  // styling = greys
};

const dayMode = (world) => {
  // styling = fills with light colors
};

const randomColor = (world, half) => {
  // styling = fills with random colors
};

const darkMode = (world, startX, startY) => {
  // styling = dark mode colors
};

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
