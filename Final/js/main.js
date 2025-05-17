import * as THREE from 'three';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
let scene, camera, renderer, controls;
let keysPressed = {};
let clock = new THREE.Clock();
let moveSpeed = 5;
const collidableBoxes = [];

init();
animate();

function init() {
    // Scene & Camera
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x222222);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 1.6, 5);

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Pointer Lock Controls
    controls = new PointerLockControls(camera, document.body);
    scene.add(controls.getObject());


    document.body.addEventListener('click', () => {
        controls.lock();
    });

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 1));

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(5, 10, 5);
    scene.add(dirLight);

    // Ground
    const groundGeo = new THREE.PlaneGeometry(100, 100);
    const groundMat = new THREE.MeshStandardMaterial({ color: 0x333333 });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // placeholders with collision 
    const boxGeo = new THREE.BoxGeometry(1, 1, 1);
    const boxMat = new THREE.MeshStandardMaterial({ color: 0x66ccff });

    for (let i = 0; i < 10; i++) {
        const box = new THREE.Mesh(boxGeo, boxMat);
        box.position.set((Math.random() - 0.5) * 30, 0.5, (Math.random() - 0.5) * 30);
        scene.add(box);
        box.updateMatrixWorld();

        const boxBB = new THREE.Box3().setFromObject(box);
        collidableBoxes.push({ mesh: box, boundingBox: boxBB });
    }
    // Input
    window.addEventListener('keydown', e => keysPressed[e.key.toLowerCase()] = true);
    window.addEventListener('keyup', e => keysPressed[e.key.toLowerCase()] = false);
    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function handleMovement(delta) {
    const forward = new THREE.Vector3();
    const right = new THREE.Vector3();

    camera.getWorldDirection(forward);
    forward.y = 0;
    forward.normalize();

    right.crossVectors(forward, camera.up).normalize();

    const moveVec = new THREE.Vector3();

    if (keysPressed['w']) moveVec.add(forward);
    if (keysPressed['s']) moveVec.sub(forward);
    if (keysPressed['a']) moveVec.sub(right);
    if (keysPressed['d']) moveVec.add(right);

    moveVec.normalize();
    moveVec.multiplyScalar(moveSpeed * delta);

    const player = controls.getObject();
    const newPosition = player.position.clone().add(moveVec);

    const playerBB = new THREE.Box3(
        new THREE.Vector3(newPosition.x - 0.3, newPosition.y - 1.6, newPosition.z - 0.3),
        new THREE.Vector3(newPosition.x + 0.3, newPosition.y, newPosition.z + 0.3)
    );

    //collison movement dectect
    let collision = false;

    for (const box of collidableBoxes) {
        box.boundingBox.setFromObject(box.mesh);
        if (playerBB.intersectsBox(box.boundingBox)) {
            collision = true;
            break;
        }
    }

    if (!collision) {
        player.position.copy(newPosition);
    }

    player.position.y = 1.6;
}

function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    handleMovement(delta);
    renderer.render(scene, camera);
}