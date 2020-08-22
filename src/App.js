import React from "react";
import "./App.css";
import GameClass from "./components/Game/GameClass.jsx";
import { Divider, Header } from "semantic-ui-react";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header as="h2" textAlign="center" className="title">
          Game Of Life
          <Header.Subheader>John Conway</Header.Subheader>
        </Header>
        <Divider />
        <GameClass />
      </header>
    </div>
  );
}

export default App;
