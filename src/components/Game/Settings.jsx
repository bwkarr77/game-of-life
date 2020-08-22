import React, { useState } from "react";
import { Dropdown, Button } from "semantic-ui-react";

import { colorOptions } from "../files/settings.jsx";

const Settings = (props) => {
  const { load, playing } = props;

  const [colors, setColors] = useState("greyMode");

  const onLoad = () => {
    return colors ? colors : null;
  };

  return (
    <div className="controls">
      <Button as="div" labelPosition="left">
        <Dropdown
          // styling didn't work until I added <link rel='stylesheet" href='...'/> to the index.html file.
          placeholder="Color Theme"
          options={colorOptions}
          selection
          className="label"
          value={colors}
          onChange={(e, { value }) => {
            console.log("Settings.jsx:onChange: ", value);
            setColors(`${value}`);
          }}
        />
        <Button content="Load" onClick={onLoad} disabled={playing} />
      </Button>
    </div>
  );
};

export default Settings;
