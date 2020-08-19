import React from "react";
import { Button } from "semantic-ui-react";

const Controls = (props) => {
  console.log("Controls>props: ", props);
  return (
    <div className="controls">
      Controls
      <Button content="Clear" icon="redo" onClick={props.clear} />
      {!props.playing ? (
        <Button content="Play" icon="redo" onClick={props.play} />
      ) : (
        <Button content="Stop" icon="redo" onClick={props.stop} />
      )}
    </div>
  );
};

export default Controls;
