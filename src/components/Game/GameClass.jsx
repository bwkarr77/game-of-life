import React, { useState, useEffect } from "react";
import Controls from "./Controls.jsx";
import Grid from "./Grid.jsx";
import Presets from "./Presets.jsx";
// import Presets from "./PresetsClass.jsx";
import { loadPreset } from "../files/presets.jsx";
import { GEN_TIME, createWorld, nextGen, randomFill } from "../files/game.jsx";

// import { GridContext } from "../../contexts/GridContext.jsx";

class Game extends React.Component {
  state = {
    world: loadPreset("cross"),
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

  // starts the generation creation (speed is GEN_TIME)
  onPlay = () => {
    this.setState({ playing: true });
    this.interval = setInterval(() => this.onNext(), GEN_TIME);
    // const interval = setInterval(() => onNext(), GEN_TIME);
  };

  // stops/pauses the generation creation
  onStop = () => {
    this.setState({ playing: false });
    clearInterval(this.interval);
  };

  // move to the next generation
  onNext = () => this.onChange(nextGen(this.state.world));

  // loads a preset from a list
  onPreset = (preset) => this.changeState(loadPreset(preset), 0);

  // randomly fills the board
  onShuffle = () => this.changeState(randomFill(this.state.world), 0);

  //

  render() {
    // console.log("GAME>state: ", this.state.world[69].length);
    return (
      // <GridContext.Provider value={{ state, onChange, onClear }}>
      <div className="game">
        <h3>Game</h3>
        <Grid world={this.state.world} onChange={this.onChange} />
        <p>Generation: {this.state.generation}</p>
        <Controls
          clear={this.onClear}
          playing={this.state.playing}
          play={this.onPlay}
          stop={this.onStop}
          shuffle={this.onShuffle}
          next={this.onNext}
        />
        <Presets load={this.onPreset} playing={this.state.playing} />
      </div>
      // </GridContext.Provider>
    );
  }
}

export default Game;
