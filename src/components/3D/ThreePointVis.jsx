import React from "react";
import { Canvas } from "react-three-fiber";
import Controls from "./Controls.jsx";

// camera position, values are 'units' away from object
const cam = {
  x: 2,
  y: 2,
  z: 2,
};

const ThreePointVis = ({}) => {
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
      <mesh position={[0, 0, 0]} rotation={[Math.PI * 0.5, 0, 0]}>
        {/* <cylinderBufferGeometry attach="geometry" args={[1, 1, 1, 4]} /> */}
        <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
        {/* args={[ x?, y?, depth, polygon-sides]} */}
        <meshStandardMaterial attach="material" color="#fff" />
      </mesh>
    </Canvas>
  );
};

export default ThreePointVis;
