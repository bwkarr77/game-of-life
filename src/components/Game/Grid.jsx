import React, { useState } from "react";
import { changeArray } from "../files/game.jsx";

const Grid = (props) => {
  const { world, onChange, colorStyle } = props;

  // const [colorStyle, setColorStyle] = useState("");

  // setColorStyle(`${props.colorStyle}`);

  const changeCell = (cell, x, y) => {
    // const { world } = props;
    const row = changeArray(world[y], x, cell ? 0 : 1);
    const newWorld = changeArray(world, y, row);
    onChange(newWorld);
  };

  const renderCell = (cell, x, y) => {
    return (
      <div
        key={x}
        className={`cell ${colorStyle}`}
        style={{ backgroundColor: cell ? "#424151" : null }}
        onMouseDown={() => changeCell(cell, x, y)}
      />
    );
  };

  const renderRow = (row, y) => (
    <div className="row" key={y}>
      {row.map((cell, x) => renderCell(cell, x, y))}
    </div>
  );

  return <div className="grid">{world.map((row, y) => renderRow(row, y))}</div>;
};

export default Grid;
