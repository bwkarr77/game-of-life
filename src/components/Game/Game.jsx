import React, { useState, useEffect } from "react";
import Controls from "./Controls.jsx";
import Grid from "./Grid.jsx";
import Presets from "./Presets.jsx";
import { loadPreset } from "../files/presets.jsx";
import { GEN_TIME, createWorld, nextGen } from "../files/game.jsx";

const Game = () => {
  const [state, setState] = useState({
    world: loadPreset("line"),
    generation: 0,
    playing: false,
  });

  const changeState = (world, curGen) =>
    setState({
      world: world,
      generation: curGen,
    });

  // Handler Functions
  const onChange = (world) => changeState(world, state.generation + 1);

  const onClear = () => changeState(createWorld(), 0);

  const onNext = () => onChange(nextGen(state.world));

  const onPlay = () => {
    setState({ playing: true, interval: onNext(), GEN_TIME });
    this.interval = setInterval(() => onNext(), GEN_TIME);
  };

  const onStop = () => {
    setState({ playing: false });
    clearInterval(this.interval);
  };

  console.log("GAME>state: ", state);

  return (
    <div className="game">
      <h3>Game</h3>
      <Grid world={state.world} onChange={onChange} />
      <p>Generation: {state.generation}</p>
      <Controls
        clear={onClear}
        onChange={onChange}
        playing={state.playing}
        play={onPlay}
        stop={onStop}
      />
      <Presets />
    </div>
  );
};

export default Game;
