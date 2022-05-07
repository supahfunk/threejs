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
camera.position.y = 2



/*------------------------------
Cubo
------------------------------*/
const geometry = new THREE.TorusGeometry(1, .3, 32, 32)
const material = new THREE.MeshStandardMaterial( { 
  color: '#48a1bd',
  roughness: 0.3,
  // wireframe: true
 } )
const cube = new THREE.Mesh( geometry, material )
scene.add( cube )


/*------------------------------
Light
------------------------------*/
const light1 = new THREE.DirectionalLight( 0xffffff, 0.7 )
light1.position.set( 1, 1, 1 )
scene.add( light1 )

const light2 = new THREE.DirectionalLight( 0xffffff, 0.9 )
light2.position.set( -1, 1, 1 )
scene.add( light2 )

const light3 = new THREE.DirectionalLight( 0xffffff, 0.2 )
light3.position.set( 0, -1, -1 )
scene.add( light3 )

const ambientLight = new THREE.AmbientLight( 0xffffff, .3 )
scene.add( ambientLight )



/*------------------------------
Helpers
------------------------------*/
const gridHelper = new THREE.GridHelper( 10, 10 )
scene.add( gridHelper )
const axesHelper = new THREE.AxesHelper( 5 )
scene.add( axesHelper )
const lightHelper1 = new THREE.DirectionalLightHelper( light1, 1, '#ff0000' )
// scene.add( lightHelper1 )
const lightHelper2 = new THREE.DirectionalLightHelper( light2, 1, '#ff00ff' )
// scene.add( lightHelper2 )
const lightHelper3 = new THREE.DirectionalLightHelper( light3, 1, '#ffff00' )
// scene.add( lightHelper3 )


/*------------------------------
Renderer
------------------------------*/
const renderer = new THREE.WebGLRenderer({
  alpha: true
})
renderer.setPixelRatio( window.devicePixelRatio )
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
  cube.rotation.x += 0.01
  cube.rotation.z += 0.01

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