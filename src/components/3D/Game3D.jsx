// $ npm install react-three-fiber three

import React from "react";
import ThreePointVis from "./ThreePointVis.jsx";
// import './styles.css';

export const Game3D = (x, y, z) => {
  return (
    <div>
      <div className="vis-container">
        <ThreePointVis />
      </div>
    </div>
  );
};
