import React, { useState } from "react";
import { Dropdown, Button } from "semantic-ui-react";
import Presets from "./Presets.jsx";

import {
  colorOptions,
  gridSizeOptions,
  generationSpeed,
} from "../files/settings.jsx";

const Settings = (props) => {
  const { load1, playing } = props;

  const [settings, setSettings] = useState({
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
        {/* <Presets load={this.onPreset} playing={this.state.playing} /> */}
        <Dropdown
          placeholder="Color Theme"
          options={colorOptions}
          selection
          className="label"
          disabled={playing}
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
          disabled={playing}
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
          disabled={playing}
          value={settings.generationSpeed}
          onChange={(e, { value }) => {
            console.log("Settings.jsx:onChange: ", value);
            setSettings({ ...settings, generationSpeed: value });
          }}
        />
        <Button content="Load" onClick={onLoad} disabled={playing} />
      </Button>
    </div>
  );
};

export default Settings;
