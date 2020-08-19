import React from "react";
import { changeCells } from "../files/game.jsx";

const Grid = (props) => {
  // props = world, onChange
  console.log("Grid>props: ", props);

  // const changeCell = (cell, x, y) => {
  //   const { world } = props.world;
  //   const row = changeCells(world[y], x, cell ? 0 : 1);
  //   const newWorld = changeCells(world, y, row);
  //   props.onChange(newWorld);
  // };

  const renderCell = (cell, x, y) => {
    return (
      <div
        key={x}
        className="cell"
        style={{ backgroundColor: cell ? "#424151" : null }}
      />
    );
  };

  const renderRow = (row, y) => (
    <div className="row" key={y}>
      {row.map((cell, x) => renderCell(cell, x, y))}
    </div>
  );

  return (
    <div className="grid">
      <h3>Grid</h3>
      {props.world.map((row, y) => renderRow(row, y))}
    </div>
  );
};

export default Grid;
