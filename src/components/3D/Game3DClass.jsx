import React from "react";
import ThreePointVis from "./ThreePointVis.jsx";
import Controls3D from "./Controls3D.jsx";
import Settings3D from "./Settings3D.jsx";

import { createWorld, nextGen, randomFill } from "../files/game3D.jsx";
import { loadPreset } from "../files/presets3D.jsx";

import "./styles3D.css";

class Game3DClass extends React.Component {
  state = {
    world3D: loadPreset("plane"),
    generation: 0,
    isPlaying: false,
    colorStyle: "default",
  };

  changeState = (props) => {
    const { world3D, generation } = props;
    this.setState({ ...this.state, world3D: world3D, generation: generation });
  };

  onChange = (world) => {
    this.changeState({ world3D: world, generation: this.state.generation + 1 });
  };

  onPlay = () => {
    console.log("3D onPlay: ", this.state.world3D);
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
    this.setState({
      ...this.state,
      world3D: loadPreset(`${preset}`),
      generation: generationSpeed,
      colorStyle: `${colorStyle}`,
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

  render() {
    return (
      <div className="container-3D">
        <Settings3D
          isPlaying={this.state.isPlaying}
          load={this.onSettingStyle}
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
