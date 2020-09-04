import * as React from "react";
import { extend, useThree, useFrame } from "react-three-fiber";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as THREE from "three";

// extend THREE to include TrackballControls
extend({ TrackballControls });
// extend({ OrbitControls });

// key code constants
const ALT_KEY = 65;
const CTRL_KEY = 63;
const CMD_KEY = 68;

const Controls = () => {
  const controls = React.useRef();
  const { camera, gl } = useThree();

  useFrame(() => {
    // update the view as the vis is interacted with
    controls.current.update();
  });

  return (
    <trackballControls
      // <orbitControls
      ref={controls}
      args={[camera, gl.domElement]}
      keys={[
        ALT_KEY, // orbit
        CTRL_KEY, // zoom
        CMD_KEY, // pan
      ]}
      mouseButtons={{
        LEFT: THREE.MOUSE.ROTATE,
        MIDDLE: THREE.MOUSE.ZOOM,
        RIGHT: THREE.MOUSE.PAN,
      }}
      rotateSpeed={10}
    />
  );
};

export default Controls;
