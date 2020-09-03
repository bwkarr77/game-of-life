import React from "react";

import Controls from "./Controls.jsx";
import Grid from "./Grid.jsx";
import Settings from "../settings/Settings.jsx";
import Rules from "../settings/Rules.jsx";
import { Button } from "semantic-ui-react";

import { loadPreset, presetOptions } from "../files/presets.jsx";
import {
  loadColorStyling,
  loadGridSizeG,
  colorOptions,
  gridSizeOptions,
} from "../files/settings.jsx";
import {
  //variables:
  WORLD_SIZE,
  GEN_TIME,
  //functions:
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
    gridSize: loadGridSizeG(WORLD_SIZE),
    genSpeed: 100,
    showSettings: false,
    isLoaded: true,
    rules: { El: 2, Eu: 3, Fl: 3, Fu: 3 },
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

  onChangeRules = (id, val) => {
    this.setState({
      ...this.state,
      rules: {
        ...this.state.rules,
        [id]: parseInt(val),
      },
    });
  };

  onSetRules = (e) => {
    e.preventDefault();
    // setRules(this.state.rules); NEED TO CREATE A FUNCTION FOR CHANGING THE RULES
  };

  onShowSettings = () => {
    this.setState({
      showSettings: !this.state.showSettings,
    });
  };

  render() {
    return (
      <div className="game">
        <div className="settings-div">
          <Button
            id="settings-display"
            content="Show Settings"
            onClick={this.onShowSettings}
          />
          {this.state.showSettings ? (
            <div className="rules-settings">
              <Rules
                rules={this.state.rules}
                onChangeRules={this.onChangeRules}
                load={this.onSetRules}
              />
              <Settings
                isPlaying={this.state.isPlaying}
                load={this.onSettingStyle}
                valIn={["cross", "default", WORLD_SIZE, GEN_TIME]}
                preset={{
                  presets: presetOptions,
                  colors: colorOptions,
                  grid: gridSizeOptions,
                }}
              />
            </div>
          ) : null}
        </div>
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
      </div>
    );
  }
}

export default Game;
