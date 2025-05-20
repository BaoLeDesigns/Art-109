import * as THREE from 'three';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
let scene, camera, renderer, controls;
let keysPressed = {};
let clock = new THREE.Clock();
let moveSpeed = 5;
const collidableBoxes = [];
import { GLTFLoader } from 'https://unpkg.com/three@0.162.0/examples/jsm/loaders/GLTFLoader.js';

init();
animate();

function init() {
    // Scene & Camera
    scene = new THREE.Scene();
    scene.background = new THREE.Color('rgb(112, 0, 0)');

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 1.6, 5);

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    document.body.appendChild(renderer.domElement);

    // Pointer Lock Controls
    controls = new PointerLockControls(camera, document.body);
    scene.add(controls.getObject());


    document.body.addEventListener('click', () => {
        controls.lock();
    });

    //audio
    document.getElementById('playBtn').addEventListener('click', () => {
        const bgMusic = document.getElementById('bgMusic');
        bgMusic.volume = 0.5;

        bgMusic.play().then(() => {
            document.getElementById('playBtn').style.display = 'none';
        }).catch(() => {
        });
    });


    // Lighting
    scene.add(new THREE.AmbientLight('rgb(255, 168, 168)', 0.2));

    const dirLight = new THREE.DirectionalLight('rgb(255, 156, 156)', 0.8);
    dirLight.position.set(10, 20, 10);
    dirLight.castShadow = true;

    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    dirLight.shadow.camera.near = 1;
    dirLight.shadow.camera.far = 150;
    dirLight.shadow.camera.left = -80;
    dirLight.shadow.camera.right = 60;
    dirLight.shadow.camera.top = 80;
    dirLight.shadow.camera.bottom = -60;

    scene.add(dirLight);

    // Ground
    const groundGeo = new THREE.PlaneGeometry(100, 100);
    const groundMat = new THREE.MeshStandardMaterial({
        color: 'rgb(109, 109, 109)',
        metalness: 1.0,
        roughness: 0.8
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // // placeholders with collision 
    // const boxGeo = new THREE.BoxGeometry(1, 1, 1);
    // const boxMat = new THREE.MeshStandardMaterial({ color: 0x66ccff });

    // for (let i = 0; i < 10; i++) {
    //     const box = new THREE.Mesh(boxGeo, boxMat);
    //     box.position.set((Math.random() - 0.5) * 30, 0.5, (Math.random() - 0.5) * 30);
    //     scene.add(box);
    //     box.updateMatrixWorld();

    //     const boxBB = new THREE.Box3().setFromObject(box);
    //     collidableBoxes.push({ mesh: box, boundingBox: boxBB });
    // }

    // // placeholders in grid layout test
    // const boxGeo = new THREE.BoxGeometry(1, 1, 1);
    // const boxMat = new THREE.MeshStandardMaterial({ color: 0x66ccff });

    // const rows = 5;     
    // const cols = 5;       
    // const spacing = 4;     

    // for (let z = 0; z < rows; z++) {
    //     for (let x = 0; x < cols; x++) {
    //         const box = new THREE.Mesh(boxGeo, boxMat);
    //         box.position.set(
    //             (x - cols / 2) * spacing,
    //             0.5,
    //             (z - rows / 2) * spacing
    //         );
    //         scene.add(box);
    //         box.updateMatrixWorld();

    //         const boxBB = new THREE.Box3().setFromObject(box);
    //         collidableBoxes.push({ mesh: box, boundingBox: boxBB });
    //     }
    // }

    //server model in grid layout + collision boxes
    const loader = new GLTFLoader();
    loader.load('assets/server.glb', (gltf) => {
        const model = gltf.scene;

        const rows = 39;
        const cols = 40;
        const spacing = 2.5;

        for (let z = 0; z < rows; z++) {
            for (let x = 0; x < cols; x++) {
                if (x % 2 === 0) {
                    const clone = model.clone(true);
                    clone.position.set(
                        (x - cols / 2) * spacing,
                        0,
                        (z - rows / 2) * spacing
                    );
                    scene.add(clone);
                    clone.updateMatrixWorld(true);

                    //shadows for servers
                    clone.traverse(child => {
                        if (child.isMesh) {
                            child.castShadow = true;
                            child.receiveShadow = true;
                        }
                    });

                    //collision box
                    const boxBB = new THREE.Box3().setFromObject(clone);
                    collidableBoxes.push({ mesh: clone, boundingBox: boxBB });
                }
            }
        }
    });


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

    //boundary 
    const minX = -50;
    const maxX = 50;
    const minZ = -50;
    const maxZ = 50;

    const withinBounds = (
        newPosition.x > minX + 0.3 && newPosition.x < maxX - 0.3 &&
        newPosition.z > minZ + 0.3 && newPosition.z < maxZ - 0.3
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

    if (!collision && withinBounds) {
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