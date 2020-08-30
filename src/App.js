import React, { useEffect, useState } from "react";
import "./App.scss";
import GameClass from "./components/Game/GameClass.jsx";
import Game3DClass from "./components/3D/Game3DClass.jsx";

import Rules from "./components/Rules.jsx";
import Home from "./components/Home.jsx";

import Navbar from "./components/Navbar.jsx";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

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
      <Navbar />
      <div className="GameDisplay">
        <Switch>
          <Route exact path={"/"} component={Home} />
          <Route
            exact
            path={"/2D"}
            // component={GameClass(didUpdate, setUpdate)}
            render={() => (
              <GameClass update={didUpdate} setUpdate={setUpdate} />
            )}
          />
          <Route
            exact
            path={"/3D"}
            // component={Game3D}
            // render={() => <Game3D update={didUpdate} setUpdate={setUpdate} />}
            render={() => (
              <Game3DClass update={didUpdate} setUpdate={setUpdate} />
            )}
          />
          <Route exact path={"/rules"} render={() => <Rules />} />
        </Switch>
      </div>
      {/* </Router> */}
    </div>
  );
}

export default App;
