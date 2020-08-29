import React, { useState } from "react";
import ThreePointVis from "./ThreePointVis.jsx";
// import ThreePointVis_Tut from "./ThreePointVis_Tut.jsx";
import Controls3D from "./Controls3D.jsx";
import Settings3D from "./Settings3D.jsx";

import { createWorld, create3DWorld, nextGen } from "../files/game3D.jsx";
import { loadPreset } from "../files/presets3D.jsx";

import "./styles3D.css";

export const Game3D = (props) => {
  const [state3D, setState3D] = useState({
    // world3D: loadPreset("line"),
    world3D: loadPreset("plane"),
    generation: 0,
    isPlaying: false,
    colorStyle: "default",
  });

  const changeState = (props) => {
    console.log("3d changestate: ", props);
    const { world3D, generation } = props;
    setState3D({
      world3D: world3D,
      generation: generation,
    });
  };

  const onChange = (world) => {
    console.log("onChange: ", world);
    changeState({ world3D: world, generation: state3D.generation + 1 });
  };

  const onPlay = () => {
    // console.log("3D onPlay: ", state3D.world3D);
    setState3D({ isPlaying: true });
    setInterval(() => onNext(), 500);
  };

  const onNext = () => {
    // console.log("onNext: ", state3D.world3D);
    onChange(nextGen(state3D.world3D));
  };

  const onStop = () => {
    setState3D({ isPlaying: false });
    clearInterval();
  };

  const onSettingStyle = (settings, rules) => {
    // console.log("onsettings: ", settings, rules);
    // const { colorStyle, gridSize, preset, generationSpeed } = settings;
    // setState3D({
    //   world3D: loadPreset(`${preset}`),
    //   generation: generationSpeed,
    //   colorStyle: `${colorStyle}`,
    // });
  };

  console.log("state3D:", state3D);
  return (
    <div className="container-3D">
      <Settings3D isPlaying={state3D.isPlaying} load={onSettingStyle} />
      <div className="vis-container">
        <ThreePointVis world={state3D.world3D} />
      </div>
      <Controls3D
        isPlaying={state3D.isPlaying}
        play={onPlay}
        next={onNext}
        stop={onStop}
      />
    </div>
  );
};
