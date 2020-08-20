import React from "react";
import "./App.css";
import Title from "./components/Title.jsx";
import Game from "./components/Game/Game.jsx";
import GameClass from "./components/Game/GameClass.jsx";
import { Divider } from "semantic-ui-react";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Title />
        {/* <Divider /> */}
        {/* <Game /> */}
        <GameClass />
      </header>
    </div>
  );
}

export default App;
