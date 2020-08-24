import React, { useState } from "react";
import { Dropdown, Button } from "semantic-ui-react";
import Presets from "./Presets.jsx";

import {
  colorOptions,
  gridSizeOptions,
  generationSpeed,
} from "../files/settings.jsx";
import { loadPreset, presetOptions } from "../files/presets.jsx";

const Settings = (props) => {
  const { load1, isPlaying } = props;

  const [settings, setSettings] = useState({
    preset: "cross",
    colorStyle: "purple",
    gridSize: 70,
    speed: 100,
  });

  const onLoad = () => {
    console.log("onLoad: ", settings);
    return load1(settings);
  };

  // console.log("Settings: ", settings);

  return (
    <div className="controls">
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
            console.log("Settings.jsx:onChange: ", value);
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
            console.log("Settings.jsx:onChange: ", value);
            setSettings({ ...settings, gridSize: value });
          }}
        />
        <Dropdown
          placeholder="Generation Speed"
          options={generationSpeed}
          selection
          className="label_grid"
          disabled={isPlaying}
          value={settings.generationSpeed}
          onChange={(e, { value }) => {
            console.log("Settings.jsx:onChange: ", value);
            setSettings({ ...settings, generationSpeed: value });
          }}
        />
        <Button content="Load" onClick={onLoad} disabled={isPlaying} />
      </Button>
    </div>
  );
};

export default Settings;
