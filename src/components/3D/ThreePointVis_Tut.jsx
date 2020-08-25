import React from "react";
import { Canvas } from "react-three-fiber";
import Controls from "./Controls.jsx";
import InstancedPoints from "./InstancedPoints.jsx";

// camera position, values are 'units' away from object
const cam = {
  x: 10,
  y: 10,
  z: 10,
};

const ThreePointVis_Tut = ({ data }) => {
  return (
    <Canvas camera={{ position: [cam.x, cam.y, cam.z], far: 15000 }}>
      <Controls />
      <ambientLight color="#ffffff" intensity={0.1} />
      <hemisphereLight
        color="#ffffff"
        skyColor="#ffffbb"
        groundColor="#080820"
        intensity={1.0}
      />
      <InstancedPoints data={data} />
    </Canvas>
  );
};

export default ThreePointVis_Tut;
