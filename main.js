import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const canvas = document.getElementById("canvas");

const scene = new THREE.Scene();
const size = {
  width: innerWidth,
  height: innerHeight,
};
const camera = new THREE.PerspectiveCamera(
  75,
  size.width / size.height,
  0.1,
  3000
);
camera.position.set(0, 500, 1000);
scene.add(camera);

const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(size.width, size.height);
renderer.setPixelRatio(window.devicePixelRatio);

// https://christinayan01.jp/architecture/archives/14067

const urls = [
  "./images/right.png",
  "./images/left.png",
  "./images/up.png",
  "./images/down.png",
  "./images/front.png",
  "./images/back.png",
];

const loader = new THREE.CubeTextureLoader();
scene.background = loader.load(urls);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(100);
const cubeCamera = new THREE.CubeCamera(1, 1000, cubeRenderTarget);
scene.add(cubeCamera);

const material = new THREE.MeshBasicMaterial({
  envMap: cubeRenderTarget.texture,
  reflectivity: 0.8,
});
const geometry = new THREE.SphereGeometry(350, 50, 50);
const sphere = new THREE.Mesh(geometry, material);
sphere.position.set(0, 100, 0);
scene.add(sphere);

const animate = () => {
  controls.update;
  cubeCamera.update(renderer, scene);
  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);
};

animate();
