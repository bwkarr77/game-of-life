import React from "react";
import ThreePointVis from "./ThreePointVis.jsx";
import Controls3D from "./Controls3D.jsx";
import Settings3D from "./Settings3D.jsx";
import Rules from "../settings/Rules.jsx";

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
import { loadPreset } from "../files/presets3D.jsx";

import "./styles3D.scss";

class Game3DClassTest extends React.Component {
  state = {
    world3D: loadPreset("plane"),
    generation: 0,
    isPlaying: false,
    colorStyle: "default",
    generationSpeed: GEN_TIME_3D,
    gridSize: WORLD_SIZE_3D,
    rules: { El: 5, Eu: 6, Fl: 6, Fu: 6 },
  };

  changeState = (props) => {
    console.log("changeState: ", props);
    const { world3D, generation } = props;
    this.setState({ world3D: world3D, generation: generation });
  };

  onChange = (world) => {
    console.log("onChange: ", world);
    this.changeState({ world3D: world, generation: this.state.generation + 1 });
  };

  onPlay = () => {
    console.log("3D onPlay: ", this.state.world3D);
    this.setState({ isPlaying: true });
    this.interval = setInterval(() => {
      this.onNext();
    }, 500);
  };

  onNext = () => {
    this.onChange(nextGen(this.state.world3D));
  };

  onStop = () => {
    console.log("onStop...");
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
    setRules(this.state.rules); // currently not changing the rules....
  };

  render() {
    // console.log("3D World: ", this.state);
    return (
      <div className="container-3D">
        <div className="settings-div">
          <Rules
            rules={this.state.rules}
            onChangeRules={this.onChangeRules}
            load={this.onSetRules}
          />
          <Settings3D
            isPlaying={this.state.isPlaying}
            load={this.onSettingStyle}
            state={this.state}
            styleChange={this.onSettingStyle}
            changeStyle={this.onChangeStyle}
          />
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
