import React from "react";
import { Canvas } from "react-three-fiber";
import Controls from "./Controls.jsx";

// camera position, values are 'units' away from object
const cam = {
  x: 2,
  y: 2,
  z: 2,
};

const ThreePointVis = ({ data }) => {
  return (
    <Canvas camera={{ position: [cam.x, cam.y, cam.z] }}>
      <Controls />
      <ambientLight color="#ffffff" intensity={0.1} />
      <hemisphereLight
        color="#ffffff"
        skyColor="#ffffbb"
        groundColor="#080820"
        intensity={1.0}
      />
      {data.map((d, i) => {
        const x = (i % 30) * 1.05;
        const y = Math.floor(i / 30) * 1.05;
        const z = 0;
        return (
          <mesh
            key={i.id}
            position={[x, y, z]}
            rotation={[Math.PI * 0.5, 0, 0]}
          >
            <cylinderBufferGeometry
              attach="geometry"
              args={[0.5, 0.5, 0.15, 32]}
            />
            <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
          </mesh>
        );
      })}
    </Canvas>
  );
};

export default ThreePointVis;
