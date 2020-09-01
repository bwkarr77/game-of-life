import React from "react";
import ThreePointVis from "./ThreePointVis.jsx";
import Controls3D from "./Controls3D.jsx";
import Settings3D from "./Settings3D.jsx";
import Rules from "../settings/Rules.jsx";

import {
  // globals:
  // WORLD_SIZE_3D,
  // GEN_TIME_3D,
  // functions:
  createWorld,
  nextGen,
  randomFill,
  get3DWorldSize,
  get3DSpeed,
} from "../files/game3D.jsx";
import { loadPreset } from "../files/presets3D.jsx";

import "./styles3D.scss";

class Game3DClass extends React.Component {
  state = {
    world3D: loadPreset("plane"),
    // gridSize: WORLD_SIZE_3D,
    generation: 0,
    // generationSpeed: GEN_TIME_3D,
    isPlaying: false,
    colorStyle: "default",
    rules: { a: 4, b: 5, c: 5, d: 5 },
  };

  changeState = (props) => {
    const { world3D, generation } = props;
    this.setState({ ...this.state, world3D: world3D, generation: generation });
  };

  onChange = (world) => {
    this.changeState({ world3D: world, generation: this.state.generation + 1 });
  };

  onPlay = () => {
    // console.log("3D onPlay: ", this.state.world3D);
    this.setState({ ...this.state, isPlaying: true });
    this.interval = setInterval(() => {
      this.onNext();
    }, 500);
  };

  onNext = () => {
    this.onChange(nextGen(this.state.world3D));
  };

  onStop = () => {
    console.log("onStop...");
    this.setState({ ...this.state, isPlaying: false });
    clearInterval(this.interval);
  };

  onSettingStyle = (settings, rules) => {
    const { colorStyle, gridSize, preset, generationSpeed } = settings;
    console.log("settings3D: ", settings, gridSize);
    this.setState({
      ...this.state,
      world3D: loadPreset(`${preset}`),
      generationSpeed: generationSpeed,
      colorStyle: `${colorStyle}`,
      gridSize: gridSize,
    });

    // set speed and world size
    get3DSpeed(generationSpeed);
    get3DWorldSize(gridSize);
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

  // for Rules.jsx:
  onChangeRules = (id, val) => {
    console.log("onChangeRules: ", id, val);
    this.setState({
      ...this.state,
      rules: {
        ...this.state.rules,
        [id]: parseInt(val),
      },
    });
  };
  onSetRules = (rules) => {
    rules.preventDefault();
    console.log("setRules: ", rules, this.state, this.state.rules);
    this.setState({
      ...this.state,
      rules: {
        ...this.state.rules,
        rules: rules,
      },
    });
  };

  render() {
    console.log("Game3DClass.jsx: ", this.state);
    return (
      <div className="container-3D">
        <Rules
          rules={this.state.rules}
          onChangeRules={this.onChangeRules}
          load={this.onSetRules}
        />
        <Settings3D
          isPlaying={this.state.isPlaying}
          load={this.onSettingStyle}
          state={this.state}
        />
        <div className="vis-container">
          <ThreePointVis world={this.state.world3D} />
        </div>
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

export default Game3DClass;
