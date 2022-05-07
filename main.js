import * as THREE from 'three'
import './style.css'

/*------------------------------
Scene
------------------------------*/
const scene = new THREE.Scene()


/*------------------------------
Camera
------------------------------*/
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )
camera.position.z = 5


/*------------------------------
Cubo
------------------------------*/
const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshBasicMaterial( { 
  color: '#ff0000',
  wireframe: true
 } )
const cube = new THREE.Mesh( geometry, material )
scene.add( cube )


/*------------------------------
Renderer
------------------------------*/
const renderer = new THREE.WebGLRenderer()
renderer.setSize( window.innerWidth, window.innerHeight )
document.body.appendChild( renderer.domElement )


/*------------------------------
Animate
------------------------------*/
function animate() {
  cube.rotation.x += 0.01
  cube.rotation.z += 0.01

  requestAnimationFrame( animate )
  renderer.render( scene, camera )
}
animate()