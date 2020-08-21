import React, { useState } from "react";
import { Dropdown, Button } from "semantic-ui-react";

import { presetOptions } from "../files/presets.jsx";

const options = [
  { key: "line", value: "line", text: "Line" },
  // { key: "glider", value: "glider", text: "Glider" },
  // { key: "pulsar", value: "pulsar", text: "Pulsar" },
  // { key: "diehard", value: "diehard", text: "Diehard" },
  // { key: "gliderGun", value: "gliderGun", text: "Gosper Glider Gun" },
];

const Presets = (props) => {
  const { load, playing } = props;

  const [preset, setPreset] = useState("line");

  const onLoad = () => {
    return preset ? load(preset) : null;
  };

  console.log("Presets: ", preset, presetOptions);
  return (
    <div className="controls">
      {/* Presets */}
      <Button as="div" labelPosition="left">
        <Dropdown
          // styling didn't work until I added <link rel='stylesheet" href='...'/> to the index.html file.
          placeholder="Select a preset"
          options={presetOptions}
          selection
          className="label"
          value={preset}
          onChange={(e, { value }) => {
            console.log("Presets.jsx:onChange: ", value);
            setPreset(`${value}`);
          }}
        />
        <Button content="Load" onClick={onLoad} disabled={playing} />
      </Button>
    </div>
  );
};

export default Presets;
