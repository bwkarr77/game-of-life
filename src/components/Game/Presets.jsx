import React, { useState } from "react";
import { Dropdown, Button } from "semantic-ui-react";
// install semantic-ui-css as well

import { presetOptions } from "../files/presets.jsx";

const Presets = (props) => {
  const { load, isPlaying } = props;

  const [preset, setPreset] = useState("line");

  const onLoad = () => {
    return preset ? load(preset) : null;
  };

  // console.log("Presets: ", preset, presetOptions);
  return (
    <div className="controls">
      <Button as="div" labelPosition="left">
        <Dropdown
          // styling didn't work until I added <link rel='stylesheet" href='...'/> to the index.html file.
          placeholder="Select a preset"
          options={presetOptions}
          selection
          className="label"
          disabled={isPlaying}
          value={preset}
          onChange={(e, { value }) => {
            console.log("Presets.jsx:onChange: ", value);
            setPreset(`${value}`);
          }}
        />
        <Button content="Load" onClick={onLoad} disabled={isPlaying} />
      </Button>
    </div>
  );
};

export default Presets;
