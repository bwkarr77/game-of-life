import React, { useState, useEffect } from "react";
import Controls from "./Controls.jsx";
import Grid from "./Grid.jsx";
import Presets from "./Presets.jsx";
import { loadPreset } from "../files/presets.jsx";
import { GEN_TIME, createWorld, nextGen } from "../files/game.jsx";
import { Header } from "semantic-ui-react";

// import { GridContext } from "../../contexts/GridContext.jsx";

const Game = () => {
  const [state, setState] = useState({
    world: loadPreset("line"),
    generation: 0,
    playing: false,
  });

  const changeState = (world, nextGen) => {
    setState({
      world: world,
      generation: nextGen,
    });
  };

  // Handler Functions
  const onChange = (world) => changeState(world, state.generation + 1);

  // clears the grid
  const onClear = () => changeState(createWorld(), 0);

  // starts the generation creation
  const onPlay = () => {
    setState({ playing: true });
    const interval = setInterval(() => onNext(), GEN_TIME);
  };

  // stops/pauses the generation creation
  const onStop = () => {
    setState({ playing: false });
    clearInterval(this.interval);
  };

  // move to the next generation
  const onNext = () => onChange(nextGen(state.world));

  return (
    // <GridContext.Provider value={{ state, onChange, onClear }}>
    <div className="game">
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
