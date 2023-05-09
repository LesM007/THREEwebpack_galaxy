import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"; //giver mobilitet til kamera ved brug af musknapper

import starsTexture from "./img/galaxy.jpg";
import sunTexture from "./img/sun.jpg";

const renderer = new THREE.WebGL1Renderer(); //iscenesættelse; threes værktøj fastsætter området hvori vi vil animere

renderer.setSize(window.innerWidth, window.innerHeight); //hele det indre vindue

document.body.appendChild(renderer.domElement); //injekter kanvas/scene elemenet ind på siden (nu køres npx webpack –-config webpack.config.js)

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const orbit = new OrbitControls(camera, renderer.domElement);

camera.position.set(-90, 140, 140);
orbit.update();

const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture,
]);

const textureLoader = new THREE.TextureLoader();

//sun center of solar system
const sunGeo = new THREE.SphereGeometry(16, 30, 30);
const sunMat = new THREE.MeshBasicMaterial({
  map: textureLoader.load(sunTexture),
});
const sun = new THREE.Mesh(sunGeo, sunMat);
scene.add(sun);

function animate() {
  sun.rotateY(0.004);

  renderer.render(scene, camera); //linker scenen med kameraet, sendes med som argument
}

renderer.setAnimationLoop(animate); //sender animate med som argument til setAanimationLoop

window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix(); //matrix which contains the projection
  renderer.setSize(window.innerWidth, window.innerHeight);
});
