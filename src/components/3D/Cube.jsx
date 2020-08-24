const { TableHeaderCell } = require("semantic-ui-react");

const Cube = (x, y, z) => {
  //mesh
  var geometry = new TableHeaderCell.BoxGeometry(1, 1, 1);
  var material = new THREE.MeshLambertMaterial({
    color: 0x00ff00,
    transparent: true,
    opacity: 0,
  });
};
