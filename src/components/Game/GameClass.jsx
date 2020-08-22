import React, { useState, useEffect } from "react";
import Controls from "./Controls.jsx";
import Grid from "./Grid.jsx";
import Presets from "./Presets.jsx";
import Settings from "./Settings.jsx";
import { loadPreset } from "../files/presets.jsx";
import { loadColorStyling, loadGridSizeG } from "../files/settings.jsx";
import {
  GEN_TIME,
  createWorld,
  nextGen,
  randomFill,
  getWorldSize,
  getSpeed,
} from "../files/game.jsx";

// import { GridContext } from "../../contexts/GridContext.jsx";

class Game extends React.Component {
  state = {
    world: loadPreset("cross"),
    generation: 0,
    playing: false,
    colorStyle: loadColorStyling("greyColor"),
    gridSize: loadGridSizeG(70),
    genSpeed: 100,
  };

  changeState = (props) => {
    const { world, nextGen, color } = props;
    console.log("changeState: ", props, world, nextGen);
    this.setState({
      world: world,
      generation: nextGen,
    });
  };

  // Handler Functions
  onChange = (world) =>
    this.changeState({ world: world, generation: this.state.generation + 1 });

  onClear = () => this.changeState(createWorld(), 0);

  // starts the generation creation (speed is GEN_TIME)
  onPlay = () => {
    this.setState({ playing: true });
    this.interval = setInterval(() => this.onNext(), GEN_TIME);
  };

  // stops/pauses the generation creation
  onStop = () => {
    this.setState({ playing: false });
    clearInterval(this.interval);
  };

  // move to the next generation
  onNext = () => this.onChange(nextGen(this.state.world));

  // loads a preset from a list
  onPreset = (preset) =>
    this.changeState({
      world: loadPreset(preset),
      nextGen: 0,
    });

  // randomly fills the board
  onShuffle = () => this.changeState(randomFill(this.state.world), 0);

  // loads settings
  onSettingStyle = (settings) => {
    const { update, setUpdate } = this.props;

    this.setState({
      colorStyle: settings.colorStyle,
      gridSize: settings.gridSize,
      genSpeed: settings.generationSpeed,
    });

    getWorldSize(settings.gridSize);
    getSpeed(settings.generationSpeed);
    this.onPreset();
    setUpdate(!update);
  };

  render() {
    console.log("GAME>state: ", this.state, this.props);
    return (
      // <GridContext.Provider value={{ state, onChange, onClear }}>
      <div className="game">
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
        <Settings playing={this.state.playing} load1={this.onSettingStyle} />
      </div>
      // </GridContext.Provider>
    );
  }
}

export default Game;
