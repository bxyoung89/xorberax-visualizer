import * as THREE from "../libs/three.module.js";

const renderer = new THREE.WebGLRenderer();
const appBody = document.getElementById('body');
renderer.setSize(appBody.clientWidth, appBody.clientHeight);
appBody.appendChild(renderer.domElement);

export default renderer;