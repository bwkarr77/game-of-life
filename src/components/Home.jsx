import React from "react";

const Home = () => {
  return (
    <div className="description-container">
      <h2>Welcome to my Game of Life Simulator</h2>
      <h3>Project by: Brett Karr</h3>
      <h4>originally inspired by: John Conway</h4>
      <p>
        This is a personal project that is designed to implement John Conway's
        Game of Life. The Game of Life is represented by a world (a 2D or 3D
        grid), that is populated by living or dead cells, and each cell lives or
        dies based on conditions. Living cells are represented by an "on" state
        (typically highlighted, filled in, or colored cells), and dead cells are
        represented by a "dead" state.
      </p>
      <p>
        The original start of this project was to implement a 2D design to
        represent the Game of Life. After completing the 2D portion, I decided
        to tackle the implementation of a 3D grid. I hope you enjoy!
      </p>
      <span>For this App, I implemented:</span>
      <ul>
        <li>React.js</li>
        <li>Javascript</li>
        <li>CSS/html</li>
        <li>Three.js</li>
        <li>systemic-ui-react</li>
        <li>misc styling components</li>
      </ul>
    </div>
  );
};

export default Home;
