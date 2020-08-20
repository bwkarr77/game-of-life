import React, { useState, useEffect } from "react";
import Controls from "./Controls.jsx";
import Grid from "./Grid.jsx";
import Presets from "./Presets.jsx";
import { loadPreset } from "../files/presets.jsx";
import { GEN_TIME, createWorld, nextGen } from "../files/game.jsx";

// import { GridContext } from "../../contexts/GridContext.jsx";

const Game = () => {
  const [state, setState] = useState({
    world: loadPreset("line"),
    generation: 0,
    playing: false,
  });

  const changeState = (world, nextGen) => {
    // console.log("changeState: ", world, nextGen);
    setState({
      world: world,
      generation: nextGen,
    });
  };

  // Handler Functions
  const onChange = (world) => changeState(world, state.generation + 1);

  const onClear = () => changeState(createWorld(), 0);

  const onNext = () => onChange(nextGen(state.world));

  const onPlay = () => {
    setState({ playing: true });
    const interval = setInterval(() => onNext(), GEN_TIME);
  };

  const onStop = () => {
    setState({ playing: false });
    clearInterval(this.interval);
  };

  console.log("GAME>state: ", state);

  return (
    // <GridContext.Provider value={{ state, onChange, onClear }}>
    <div className="game">
      <h3>Game</h3>
      <Grid world={state.world} onChange={onChange} />
      <p>Generation: {state.generation}</p>
      <Controls
        clear={onClear}
        // onChange={onChange}
        playing={state.playing}
        play={onPlay}
        stop={onStop}
      />
      <Presets />
    </div>
    // </GridContext.Provider>
  );
};

export default Game;
