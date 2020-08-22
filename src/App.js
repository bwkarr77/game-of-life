import React, { useEffect, useState } from "react";
import "./App.css";
import GameClass from "./components/Game/GameClass.jsx";
import { Divider, Header } from "semantic-ui-react";

function App() {
  const [didUpdate, setUpdate] = useState(false);

  useEffect(() => {
    console.log("did update");
  }, [didUpdate]);

  return (
    <div className="App">
      <header className="App-header">
        <Header as="h2" textAlign="center" className="title">
          Game Of Life
          <Header.Subheader>John Conway</Header.Subheader>
        </Header>
        <Divider />
        <GameClass update={didUpdate} setUpdate={setUpdate} />
      </header>
    </div>
  );
}

export default App;
