// Initialize Zappar WebAR
const camera = new Zappar.Camera();
const tracker = new Zappar.ImageTracker();


// Load your target image (.zpt)
tracker.loadTarget('assets/LamentZap.png.zpt');


// Three.js setup
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('ar-canvas'), alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
const scene = new THREE.Scene();
const camera3 = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera3.position.set(0,1,3);
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5,10,7.5);
scene.add(light);


// Load GLB from Cloudflare Worker
const loader = new THREE.GLTFLoader();
let model;
loader.load(
'https://frosty-union-c144.itskelpmusic.workers.dev/Lamesh.glb', // Worker URL
gltf => {
model = gltf.scene;
scene.add(model);
model.visible = false;
},
undefined,
err => console.error(err)
);


// Animation loop
function animate() {
requestAnimationFrame(animate);
if(model) model.visible = tracker.visible;
renderer.render(scene, camera3);
}
animate();


// Start camera
async function startCamera() {
await camera.start();
document.getElementById('camera').srcObject = camera.videoElement;
}
startCamera();