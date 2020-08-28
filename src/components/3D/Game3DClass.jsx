import React, { useState } from "react";
import ThreePointVis from "./ThreePointVis.jsx";
// import ThreePointVis_Tut from "./ThreePointVis_Tut.jsx";
import Controls3D from "./Controls3D.jsx";
import Settings3D from "./Settings3D.jsx";

import { createWorld, create3DWorld, nextGen } from "../files/game3D.jsx";
import { loadPreset } from "../files/presets3D.jsx";

import "./styles3D.css";

export default class Game3DClass extends React.Component {
  state = {
    // world3D: loadPreset("line"),
    world3D: loadPreset("box"),
    generation: 0,
    isPlaying: false,
  };

  changeState = (props) => {
    console.log("3d changestate: ", props);
    const { world3D, nextGen } = props;
    this.setState({
      world3D: world3D,
      generation: nextGen,
    });
  };

  onChange = (world) => {
    console.log("onChange: ", world);
    this.changeState({
      world3D: world,
      generation: this.state.generation + 1,
    });
  };

  onPlay = () => {
    console.log("3D onPlay: ", this.state.world3D);
    this.setState({ isPlaying: true });
    setInterval(() => this.onNext(), 1500);
  };

  onNext = () => {
    console.log("onNext: ", this.state.world3D);
    this.onChange(nextGen(this.state.world3D));
  };

  onStop = () => {
    this.setState({ isPlaying: false });
    clearInterval();
  };

  render() {
    return (
      <div className="container-3D">
        <Settings3D />
        <div className="vis-container">
          <ThreePointVis world={this.state.world3D} />
          {/* <ThreePointVis_Tut data={data} /> */}
        </div>
        <Controls3D
          isPlaying={this.state.isPlaying}
          play={this.onPlay}
          next={this.onNext}
          stop={this.onStop}
        />
      </div>
    );
  }
}
