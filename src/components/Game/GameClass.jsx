import React from "react";

import Controls from "./Controls.jsx";
import Grid from "./Grid.jsx";
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

import UseStyling from "./UseStyling.jsx";

import "./gameStyling.scss";

class Game extends React.Component {
  state = {
    world: loadPreset("cross"),
    generation: 0,
    isPlaying: false,
    colorStyle: loadColorStyling("greyColor"),
    gridSize: loadGridSizeG(70),
    genSpeed: 100,
  };

  changeState = (props) => {
    const { world, generation } = props;
    this.setState({
      world: world,
      generation: generation,
    });
  };

  // Handler Functions
  onChange = (world) =>
    this.changeState({ world: world, generation: this.state.generation + 1 });

  // clears the board, sets generation to 0
  onClear = () => this.changeState({ world: createWorld(), generation: 0 });

  // starts the generation creation (speed is GEN_TIME)
  onPlay = () => {
    this.setState({ isPlaying: true });
    this.interval = setInterval(() => this.onNext(), GEN_TIME);
  };

  // stops/pauses the generation creation
  onStop = () => {
    this.setState({ isPlaying: false });
    clearInterval(this.interval);
  };

  // move to the next generation
  onNext = () => this.onChange(nextGen(this.state.world));

  // randomly fills the board
  onShuffle = () =>
    this.changeState({ world: randomFill(this.state.world), generation: 0 });

  // loads settings
  onSettingStyle = (settings) => {
    const { gridSize, colorStyle, generationSpeed, preset } = settings;

    getWorldSize(gridSize);
    getSpeed(generationSpeed);

    this.setState({
      colorStyle: colorStyle,
      gridSize: gridSize,
      genSpeed: generationSpeed,
      world: loadPreset(preset),
      generation: 0,
    });

    UseStyling(colorStyle);
  };

  render() {
    console.log("GameClass: ", this.state);
    return (
      <div className="game">
        <Grid
          world={this.state.world}
          onChange={this.onChange}
          colorStyle={this.state.colorStyle}
        />
        <p>Generation: {this.state.generation}</p>
        <Controls
          clear={this.onClear}
          isPlaying={this.state.isPlaying}
          play={this.onPlay}
          stop={this.onStop}
          shuffle={this.onShuffle}
          next={this.onNext}
        />
        <Settings isPlaying={this.state.isPlaying} load={this.onSettingStyle} />
      </div>
    );
  }
}

export default Game;
