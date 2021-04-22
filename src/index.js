import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import gsap from 'gsap'
import Model from './models.js';
/*------------------------------
Renderer
------------------------------*/
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true
});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


/*------------------------------
Scene & Camera
------------------------------*/
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 
  50, 
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.z = 5;
camera.position.y = 1;


/*------------------------------
Mesh
------------------------------*/
const geometry = new THREE.BoxGeometry(2, 2, 2);
const material = new THREE.MeshBasicMaterial( { 
  color: 0x00ff00,
} );
const cube = new THREE.Mesh( geometry, material );
//scene.add( cube );


/*------------------------------
OrbitControls
------------------------------*/
const controls = new OrbitControls( camera, renderer.domElement );
//controls.enabled = false;


/*------------------------------
Helpers 
------------------------------*/
// const gridHelper = new THREE.GridHelper( 10, 10 );
// scene.add( gridHelper );
// const axesHelper = new THREE.AxesHelper( 5 );
// scene.add( axesHelper );
 

/*------------------------------
Models
------------------------------*/
const skull = new Model({
  name: 'uruz',
  color1: 'red',
  color2: 'yellow',
  background: '#47001b',
  file: './models/uruz.glb',
  scene: scene,
  placeOnLoad: true,
  positionMoved: -1
});

const horse = new Model({
  name: 'fehu',
  color1: 'blue',
  color2: 'pink',
  background: '#110047',
  file: './models/fehu.glb',
  scene: scene,
  positionMoved: 0
});

const thorn = new Model({
  name: 'thorn',
  color1: 'blue',
  color2: 'pink',
  background: '#110047',
  file: './models/ythorno.glb',
  scene: scene,
  positionMoved: 1
});



/*------------------------------
Controller
------------------------------*/
const buttons = document.querySelectorAll('.button')
buttons[0].addEventListener('click', () =>{
  skull.add()
  horse.remove()
  thorn.remove()
})

buttons[1].addEventListener('click', () =>{
  horse.add()
  skull.remove()
  thorn.remove()
})

buttons[2].addEventListener('click', () =>{
  thorn.add()
  skull.remove()
  horse.remove()
})

buttons[3].addEventListener('click', () =>{
  thorn.add()
  skull.add()
  horse.add()
})


/*------------------------------
Clock
------------------------------*/
const clock = new THREE.Clock();

/*------------------------------
Loop
------------------------------*/
const animate = function () {
  requestAnimationFrame( animate );
  renderer.render( scene, camera );

  if(skull.isActive){
    skull.particlesMaterial.uniforms.uTime.value = clock.getElapsedTime();
  }
  if(horse.isActive){
    horse.particlesMaterial.uniforms.uTime.value = clock.getElapsedTime();
  }
  if(thorn.isActive){
    thorn.particlesMaterial.uniforms.uTime.value = clock.getElapsedTime();
  }
  
};
animate();


/*------------------------------
Resize
------------------------------*/
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}
window.addEventListener( 'resize', onWindowResize, false );

/*------------------------------
MouseMove
------------------------------*/
function onMouseMove(e){
  const x = e.clientX
  const y = e.clientY

  gsap.to(scene.rotation, {
    y: gsap.utils.mapRange(0, window.innerWidth, .2, -.2, x),
    x: gsap.utils.mapRange(0, window.innerHeight, .2, -.2, y)
  })
}
window.addEventListener('mousemove', onMouseMove) 