import React, { useState } from "react";
import { Canvas } from "react-three-fiber";
import Controls from "./Controls.jsx";

// camera position, values are 'units' away from object
const cam = {
  x: 10,
  y: 2,
  z: 2,
};

const ThreePointVis = ({ world }) => {
  return (
    <Canvas camera={{ position: [cam.x, cam.y, cam.z] }}>
      <Controls />
      <ambientLight color="bf0808" intensity={0.1} />
      <hemisphereLight
        color="#bf0808"
        skyColor="#ffffbb"
        groundColor="#080820"
        intensity={0.5}
      />
      {world.map((plane, i) => {
        return plane.map((row, j) => {
          return row.map((each, k) => {
            const spacing = 1.1;
            const x = i * spacing;
            const y = j * spacing;
            const z = k * spacing;
            return world[i][j][k] === 1 ? (
              <mesh key={`${i}${j}${k}`} position={[x, y, z]}>
                <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
                <meshStandardMaterial attach="material" color="#ffffff" />
              </mesh>
            ) : (
              <mesh key={`${i}${j}${k}`} position={[x, y, z]}>
                <boxBufferGeometry attach="geometry" args={[0, 0, 0]} />
              </mesh>
            );
          });
        });
      })}
    </Canvas>
  );
};

export default ThreePointVis;
