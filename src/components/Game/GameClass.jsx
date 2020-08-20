import React, { useState, useEffect } from "react";
import Controls from "./Controls.jsx";
import Grid from "./Grid.jsx";
import Presets from "./Presets.jsx";
import { loadPreset } from "../files/presets.jsx";
import { GEN_TIME, createWorld, nextGen } from "../files/game.jsx";

// import { GridContext } from "../../contexts/GridContext.jsx";

class Game extends React.Component {
  state = {
    world: loadPreset("line"),
    generation: 0,
    playing: false,
  };

  changeState = (world, nextGen) => {
    // console.log("changeState: ", world, nextGen);
    this.setState({
      world: world,
      generation: nextGen,
    });
  };

  // Handler Functions
  onChange = (world) => this.changeState(world, this.state.generation + 1);

  onClear = () => this.changeState(createWorld(), 0);

  onNext = () => this.onChange(nextGen(this.state.world));

  onPlay = () => {
    this.setState({ playing: true });
    this.interval = setInterval(() => this.onNext(), GEN_TIME);
    // const interval = setInterval(() => onNext(), GEN_TIME);
  };

  onStop = () => {
    this.setState({ playing: false });
    clearInterval(this.interval);
  };

  // console.log("GAME>state: ", state);
  render() {
    return (
      // <GridContext.Provider value={{ state, onChange, onClear }}>
      <div className="game">
        <h3>Game</h3>
        <Grid world={this.state.world} onChange={this.onChange} />
        <p>Generation: {this.state.generation}</p>
        <Controls
          clear={this.onClear}
          // onChange={onChange}
          playing={this.state.playing}
          play={this.onPlay}
          stop={this.onStop}
        />
        <Presets />
      </div>
      // </GridContext.Provider>
    );
  }
}

export default Game;
