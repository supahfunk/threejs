import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import './style.css'

/*------------------------------
Scene
------------------------------*/
const scene = new THREE.Scene()


/*------------------------------
Camera
------------------------------*/
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 100 )
camera.position.z = 5


/*------------------------------
Cubo
------------------------------*/
const geometry = new THREE.BoxGeometry(10, 1, 1)
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
Orbit Controls
------------------------------*/
const controls = new OrbitControls( camera, renderer.domElement )
// controls.autoRotate = true
controls.enableDamping = true
controls.dampingFactor = 0.1


/*------------------------------
Animate
------------------------------*/
function animate() {
  // cube.rotation.x += 0.01
  // cube.rotation.z += 0.01

  controls.update()

  requestAnimationFrame( animate )
  renderer.render( scene, camera )
}
animate()


/*------------------------------
Resize
------------------------------*/
function handleResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}
window.addEventListener('resize', handleResize)