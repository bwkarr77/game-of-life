// $ npm install react-three-fiber three

import React, { useState } from "react";
import ThreePointVis from "./ThreePointVis.jsx";
import ThreePointVis_Tut from "./ThreePointVis_Tut.jsx";
import Controls3D from "./Controls3D.jsx";
import Settings3D from "./Settings3D.jsx";

import { createWorld, create3DWorld, nextGen } from "../files/game3D.jsx";
import { loadPreset } from "../files/presets3D.jsx";

// import './styles.css';

const data = new Array(100).fill(0).map((d, id) => ({ id }));

var testWorld = createWorld();
testWorld[1][1][1] = 5;

console.log("3D createWorld: ", testWorld);
// console.log("3D create3DWorld: ", create3DWorld());

export const Game3D = (props) => {
  const [state3D, setState3D] = useState({
    // world3D: createWorld(),
    world3D: loadPreset("box"),
    generation: 0,
    isPlaying: false,
  });

  const changeState = (props) => {
    const { world, nextGen } = props;
    setState3D({
      world: world,
      generation: nextGen,
    });
  };

  const onChange = (world) => {
    changeState({ world: world, nextGen: state3D.generation + 1 });
  };

  const onPlay = () => {
    // console.log("3D onPlay: ", state3D.world3D);
    setState3D({ isPlaying: true });
    this.interval = setInterval(() => onNext(), 500);
  };

  const onNext = () => {
    onChange(nextGen(state3D.world3D));
  };

  const onStop = () => {
    setState3D({ isPlaying: false });
    clearInterval(this.interval);
  };

  console.log("world3D:", state3D.world3D);
  return (
    <div className="vis-container">
      {/* <ThreePointVis data={data} /> */}
      <ThreePointVis_Tut data={data} />
      <Controls3D
        isPlaying={state3D.isPlaying}
        play={onPlay}
        next={onNext}
        stop={onStop}
      />
    </div>
  );
};
