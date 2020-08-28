import React, { useState } from "react";
import { Dropdown, Button } from "semantic-ui-react";
// import Presets from "./Presets.jsx";

import {
  colorOptions,
  gridSizeOptions,
  generationSpeed,
} from "../files/settings.jsx";
import { loadPreset, presetOptions } from "../files/presets3D.jsx";

import "./styles3D.css";

const Settings3D = (props) => {
  console.log("settings3d: ", props);
  const { load, isPlaying } = props;

  const [settings, setSettings] = useState({
    preset: "box",
    colorStyle: "purple",
    gridSize: 70,
    speed: 100,
  });

  const onLoad = () => {
    console.log("onLoad: ", settings);
    return load(settings, rules);
  };

  const [rules, setRules] = useState({
    a: 4,
    b: 5,
    c: 5,
    d: 5,
  });

  const onChangeRules = (id, val) => {
    setRules({
      ...rules,
      [id]: parseInt(val),
    });
  };

  // const onChangeRules = (e, value) =>
  const onSubmit = (props) => {
    props.preventDefault();
    console.log("onSubmit", rules);
  };

  return (
    <div className="controls">
      <form className="rules" onSubmit={onSubmit}>
        <label>a</label>
        <input
          id="a"
          className="rule_input"
          value={rules.a}
          onChange={(e, value) => onChangeRules(e.target.id, e.target.value)}
        />
        <label>b: </label>
        <input
          id="b"
          type="text"
          className="rule_input"
          value={rules.b}
          onChange={(e, value) => onChangeRules(e.target.id, e.target.value)}
        />
        <label>c: </label>
        <input
          id="c"
          type="text"
          className="rule_input"
          value={rules.c}
          onChange={(e, value) => onChangeRules(e.target.id, e.target.value)}
        />
        <label>d: </label>
        <input
          id="d"
          type="text"
          className="rule_input"
          value={rules.d}
          onChange={(e, value) => onChangeRules(e.target.id, e.target.value)}
        />
        <button>Submit</button>
      </form>

      <Button as="div" labelPosition="left" width="5px">
        {/* <Presets load={onPreset} isPlaying={isPlaying} /> */}
        <Dropdown
          // styling didn't work until I added <link rel='stylesheet" href='...'/> to the index.html file.
          placeholder="Select a preset"
          options={presetOptions}
          selection
          className="label"
          disabled={isPlaying}
          value={settings.preset}
          onChange={(e, { value }) => {
            console.log("Presets.jsx:onChange: ", value);
            setSettings({ ...settings, preset: `${value}` });
          }}
        />
        <Dropdown
          placeholder="Color Theme"
          options={colorOptions}
          selection
          className="label"
          disabled={isPlaying}
          value={settings.colorStyle}
          onChange={(e, { value }) => {
            console.log("Settings3D.jsx:onChange: ", value);
            setSettings({ ...settings, colorStyle: `${value}` });
          }}
        />
        <Dropdown
          placeholder="Grid Size"
          options={gridSizeOptions}
          selection
          className="label_grid"
          disabled={isPlaying}
          value={settings.gridSize}
          onChange={(e, { value }) => {
            console.log("Settings3D.jsx:onChange: ", value);
            setSettings({ ...settings, gridSize: value });
          }}
        />
        <Dropdown
          placeholder="Generation Speed"
          options={generationSpeed}
          selection
          className="label"
          disabled={isPlaying}
          value={settings.generationSpeed}
          onChange={(e, { value }) => {
            console.log("Settings3D.jsx:onChange: ", value);
            setSettings({ ...settings, generationSpeed: value });
          }}
        />
        <Button content="Load" onClick={onLoad} disabled={isPlaying} />
      </Button>
    </div>
  );
};

export default Settings3D;
