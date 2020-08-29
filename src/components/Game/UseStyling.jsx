const setCustTag = (name, styling, def) => {
  const element = document.querySelector(`${name}`);
  element.className = `${def}`;
  if (name === "body") {
    element.classList.add(`${styling}`);
  } else if (name === "h2") {
    element.classList.add(`${styling}_text`);
  }
};

const setCustClass = (name, styling, def) => {
  const element = document.getElementsByClassName(`${name}`);
  if (name === "navbar") {
    for (let i = 0; i < element.length; i++) {
      element[i].className = `${def}`;
      element[i].classList.add(`${styling}_nav`);
      // console.log("setCustClass: ", element);
    }
  } else {
    for (let i = 0; i < element.length; i++) {
      element[i].className = `${def}`;
      element[i].classList.add(`${styling}`);
      // console.log("setCustClass: ", element);
    }
  }
};

const UseStyling = (styling) => {
  setCustTag("body", styling, "");
  setCustTag("h2", styling, "ui center aligned header title");
  setCustClass("GameDisplay", styling, "GameDisplay");
  setCustClass("navbar", styling, "navbar");
  //
};

export default UseStyling;
