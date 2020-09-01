import React, { useState, useEffect } from "react";
import { Dropdown, Button } from "semantic-ui-react";
// import Presets from "./Presets.jsx";

import {
  colorOptions,
  gridSizeOptions,
  grid3DSizeOptions,
  generationSpeed,
} from "../files/settings.jsx";
import { loadPreset, presetOptions } from "../files/presets3D.jsx";

import "./styles3D.scss";

const Settings3D = (props) => {
  console.log("settings3d: ", props);
  const { load, isPlaying, styleChange, changeStyle } = props;
  // const { gridSize, generationSpeed, colorStyle } = props.state;

  const [settings, setSettings] = useState({
    preset: "",
    colorStyle: "",
    gridSize: "",
    generationSpeed: "",
  });

  const onLoad = () => {
    return styleChange(settings);
  };

  const [rules, setRules] = useState({
    a: 4,
    b: 5,
    c: 5,
    d: 5,
  });

  const onChangeRules = (id, val) => {
    console.log("onChangeRules: ", id, val);
    setRules({
      ...rules,
      [id]: parseInt(val),
    });
  };

  // const onChangeRules = (e, value) =>
  // const onSubmit = (props) => {
  //   props.preventDefault();
  //   console.log("onSubmit", rules);
  // };

  return (
    <div className="settings-3D">
      <Button as="div" labelPosition="left" className="set-3D-div">
        <Dropdown
          // styling didn't work until I added <link rel='stylesheet" href='...'/> to the index.html file.
          id="preset"
          placeholder="Select a preset"
          options={presetOptions}
          selection
          className="label_setting"
          disabled={isPlaying}
          value={settings.preset}
          onChange={(e, { value }) => {
            setSettings({ ...settings, preset: `${value}` });
          }}
        />
        <Dropdown
          id="colorStyle"
          placeholder="Color Theme"
          options={colorOptions}
          selection
          className="label_setting"
          disabled={isPlaying}
          value={settings.colorStyle}
          onChange={(e, { value }) => {
            setSettings({ ...settings, colorStyle: `${value}` });
          }}
        />
        <Dropdown
          id="gridSize"
          placeholder="Grid Size"
          options={grid3DSizeOptions}
          selection
          className="label_grid"
          disabled={isPlaying}
          value={settings.gridSize}
          onChange={(e, { value }) => {
            setSettings({ ...settings, gridSize: value });
          }}
        />
        <Dropdown
          id="generationSpeed"
          placeholder="Generation Speed"
          options={generationSpeed}
          selection
          className="label_setting"
          disabled={isPlaying}
          value={settings.generationSpeed}
          onChange={(e, { value }) => {
            setSettings({ ...settings, generationSpeed: value });
          }}
        />
        <Button content="Load" onClick={onLoad} disabled={isPlaying} />
      </Button>
    </div>
  );
};

export default Settings3D;
