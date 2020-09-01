import React from "react";
import { Button } from "semantic-ui-react";

const Rules = (props) => {
  const { onSubmit, onChangeRules, rules, setRules, isPlaying, load } = props;
  console.log("Rules,props:", props);
  return (
    <form className="rules" onSubmit={onSubmit}>
      <label>El</label>
      <input
        id="El"
        type="number"
        className="rule_input"
        value={rules.El}
        min="0"
        max="26"
        onChange={(e, value) => onChangeRules(e.target.id, e.target.value)}
      />
      <label>Eu: </label>
      <input
        id="Eu"
        type="number"
        className="rule_input"
        value={rules.Eu}
        min="0"
        max="26"
        onChange={(e, value) => onChangeRules(e.target.id, e.target.value)}
      />
      <label>Fl: </label>
      <input
        id="Fl"
        type="number"
        className="rule_input"
        value={rules.Fl}
        min="0"
        max="26"
        onChange={(e, value) => onChangeRules(e.target.id, e.target.value)}
      />
      <label>Fu: </label>
      <input
        id="Fu"
        type="number"
        className="rule_input"
        value={rules.Fu}
        min="0"
        max="26"
        onChange={(e, value) => onChangeRules(e.target.id, e.target.value)}
      />
      <Button
        content="Load Rules"
        onClick={(e) => load(e)}
        disabled={isPlaying}
      />
    </form>
  );
};

export default Rules;
