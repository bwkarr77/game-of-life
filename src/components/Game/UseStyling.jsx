const setHeader = (name, styling, org) => {
  const header = document.querySelector(`${name}`);
  header.className = `${org}`;
  header.classList.add(`${styling}`);
};

const UseStyling = (styling) => {
  // currently clicking on "Play button" turns background to PINK.
  setHeader("body", styling, "");
  setHeader("h2", styling, "ui center aligned header title");
  //

  const game = document.getElementsByClassName("game");
  game.className = "";
  for (let i = 0; i < game.length; i++) {
    game[i].className = "game";
    game[i].classList.add(`${styling}`);
  }

  const header = document.querySelector("h2");
  console.log("useStyling: header: ", header);

  console.log("useStyling: ", styling);
};

export default UseStyling;
