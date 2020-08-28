import React, { useEffect, useState } from "react";
import "./App.css";
import GameClass from "./components/Game/GameClass.jsx";
import { Divider, Header, Button } from "semantic-ui-react";
import { Game3D } from "./components/3D/Game3D.jsx";
import Game3DClass from "./components/3D/Game3DClass.jsx";

function App() {
  const [didUpdate, setUpdate] = useState(false);

  // dimension is true = 2D; dimension is false = 3D
  const [dimension, setDimension] = useState(true);

  const onDimension = () => {
    setDimension(!dimension);
  };

  useEffect(() => {
    console.log("did update");
  }, [didUpdate]);

  return (
    <div className="App">
      <Header as="h2" textAlign="center" className="title">
        Game Of Life
        <Header.Subheader>John Conway</Header.Subheader>
      </Header>
      {dimension ? (
        <Button content="3D" icon="redo" onClick={onDimension} />
      ) : (
        <Button content="2D" icon="redo" onClick={onDimension} />
      )}
      <Divider />
      {dimension ? (
        <GameClass update={didUpdate} setUpdate={setUpdate} />
      ) : (
        <Game3D />
      )}
    </div>
  );
}

export default App;
