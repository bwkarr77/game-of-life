import React from "react";
import ThreePointVis from "./ThreePointVis.jsx";
import Controls3D from "./Controls3D.jsx";
import Settings from "../settings/Settings.jsx";
import Rules from "../settings/Rules.jsx";
import { Button } from "semantic-ui-react";

import {
  // variables:
  WORLD_SIZE_3D,
  GEN_TIME_3D,
  // functions:
  createWorld,
  nextGen,
  randomFill,
  setSpeed,
  setWorldSize,
  setRules,
} from "../files/game3D.jsx";
import { loadPreset, presetOptions } from "../files/presets3D.jsx";
import {
  colorOptions,
  // gridSizeOptions,
  grid3DSizeOptions,
  // generationSpeed,
} from "../files/settings.jsx";

import "./styles3D.scss";

class Game3DClassTest extends React.Component {
  state = {
    world3D: loadPreset("plane"),
    generation: 0,
    isPlaying: false,
    showSettings: false,
    colorStyle: "default",
    generationSpeed: GEN_TIME_3D,
    gridSize: WORLD_SIZE_3D,
    rules: { El: 5, Eu: 6, Fl: 6, Fu: 6 },
  };

  changeState = (props) => {
    const { world3D, generation } = props;
    this.setState({ world3D: world3D, generation: generation });
  };

  onChange = (world) => {
    this.changeState({ world3D: world, generation: this.state.generation + 1 });
  };

  onPlay = () => {
    this.setState({ isPlaying: true });
    this.interval = setInterval(() => {
      this.onNext();
    }, 500);
  };

  onNext = () => {
    this.onChange(nextGen(this.state.world3D));
  };

  onStop = () => {
    this.setState({ isPlaying: false });
    clearInterval(this.interval);
  };

  onSettingStyle = (settings) => {
    const { colorStyle, gridSize, preset, generationSpeed } = settings;

    setWorldSize(gridSize);
    setSpeed(generationSpeed);

    this.setState({
      world3D: loadPreset(preset),
      generation: generationSpeed,
      colorStyle: colorStyle,
      gridSize: gridSize,
    });
  };

  onShuffle = () => {
    this.changeState({
      world3D: randomFill(this.state.world3D),
      generation: 0,
    });
  };

  onClear = () => {
    this.changeState({ world3D: createWorld(), generation: 0 });
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
    setRules(this.state.rules);
  };

  onShowSettings = () => {
    this.setState({
      showSettings: !this.state.showSettings,
    });
  };

  render() {
    return (
      <div className="container-3D">
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
                state={this.state}
                valIn={["plane", "default", 5, 500]}
                preset={{
                  presets: presetOptions,
                  colors: colorOptions,
                  grid: grid3DSizeOptions,
                }}
              />
            </div>
          ) : null}
        </div>
        <div className="vis-container">
          <ThreePointVis world={this.state.world3D} />
        </div>
        <p>Generation: {this.state.generation}</p>
        <Controls3D
          isPlaying={this.state.isPlaying}
          play={this.onPlay}
          next={this.onNext}
          stop={this.onStop}
          shuffle={this.onShuffle}
          clear={this.onClear}
        />
      </div>
    );
  }
}

export default Game3DClassTest;
