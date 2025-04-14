// Basic Three.JS scene from documentation, importing Three.JS through a CDN 
// https://threejs.org/docs/#manual/en/introduction/Creating-a-scene


//~~~~~~~Import Three.js (also linked to as import map in HTML)~~~~~~
import * as THREE from 'three';

// Import add-ons
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


// ~~~~~~~~~~~~~~~~Set up~~~~~~~~~~~~~~~~
let scene, camera, renderer, cube, sphere;
let sceneContainer = document.querySelector("#scene-container");


function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, sceneContainer.clientWidth / sceneContainer.clientHeight, 0.1, 1000);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(sceneContainer.clientWidth, sceneContainer.clientHeight);
    sceneContainer.appendChild(renderer.domElement);

    //light 

const ambientLight = new THREE.AmbientLight(0xffffff, 2);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(10, 10, 10);
directionalLight.castShadow = true;
scene.add(directionalLight);

    //cube
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    //const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );

    const cubetexture = new THREE.TextureLoader().load('textures/lavatile.jpg');
    const cubematerial = new THREE.MeshStandardMaterial({ map: cubetexture });
    cube = new THREE.Mesh(geometry, cubematerial);
    scene.add(cube);

    //sphere
    const spheregeometry = new THREE.SphereGeometry( 2, 2, 2 ); 
    const spheretexture = new THREE.TextureLoader().load('textures/lavatile.jpg');
    const spherematerial = new THREE.MeshStandardMaterial( { map: spheretexture } ); 
    sphere = new THREE.Mesh(spheregeometry, spherematerial);

    sphere.position.x = 6;
    scene.add(sphere);

    camera.position.z = 10;
    
}

function onWindowResize() {
    camera.aspect = sceneContainer.clientWidth / sceneContainer.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(sceneContainer.clientWidth, sceneContainer.clientHeight);
}

window.addEventListener('resize', onWindowResize, false);

init();
animate();

// ~~~~~~~~~~~~~~~~ Initiate add-ons ~~~~~~~~~~~~~~~~
const controls = new OrbitControls(camera, renderer.domElement);
const loader = new GLTFLoader(); // to load 3d models

loader.load ('assets/hippo.gltf', function (gltf){
    const hippo = gltf.scene;
    hippo.position.set(-5, 0, 0);
    scene.add (hippo);
})


// ~~~~~~~~~~~~~~~~ Create scene here ~~~~~~~~~~~~~~~~
// →→→→→→ Follow next steps in tutorial: 
// // https://threejs.org/docs/#manual/en/introduction/Creating-a-scene


//Animation
function animate() {
    renderer.render(scene, camera);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    sphere.rotation.y += 0.01;
}
renderer.setAnimationLoop(animate);

