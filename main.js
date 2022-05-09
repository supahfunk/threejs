import * as THREE from 'three'
import gsap from 'gsap'
import GUI from 'lil-gui'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import './style.css'

/*------------------------------
Scene
------------------------------*/
const scene = new THREE.Scene()

/*------------------------------
Camera
------------------------------*/
const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 100)
camera.position.z = 5
camera.position.y = 2
camera.lookAt(0, 0, 0)

/*------------------------------
Options
------------------------------*/
const opts = {
	lightPosition: {
		x: 10,
		y: 40,
		z: 20,
	},
	planeMaterial: '#f5f5f5',
  sphereMaterial: '#ffc524',
}

/*------------------------------
Plane
------------------------------*/
const planeGeo = new THREE.PlaneGeometry(50, 50)
const planeMat = new THREE.MeshStandardMaterial({
	color: opts.planeMaterial,
	roughness: 0.1,
	side: THREE.DoubleSide
})
const plane = new THREE.Mesh(planeGeo, planeMat)
plane.receiveShadow = true
plane.rotation.x = -Math.PI * 0.5
scene.add(plane)

/*------------------------------
Composition
------------------------------*/
const composition = new THREE.Group()
scene.add(composition)
composition.position.y = 0.015

const cylinderGeo = new THREE.CylinderGeometry(1, 1, 0.02, 64, 1)
const cylinderMat = new THREE.MeshStandardMaterial({
	color: '#03a9f4',
	roughness: 0
	// side: THREE.DoubleSide
	// wireframe: true
})

const cylinder1 = new THREE.Mesh(cylinderGeo, cylinderMat)
cylinder1.castShadow = true
cylinder1.receiveShadow = true
composition.add(cylinder1)

const cylinder2 = new THREE.Mesh(cylinderGeo, cylinderMat)
cylinder2.castShadow = true
cylinder2.receiveShadow = true
cylinder2.scale.set(0.8, 8, 0.8)
cylinder2.position.y = 0.095
composition.add(cylinder2)


/*------------------------------
Sphere
------------------------------*/
const sphereGroup = new THREE.Group()
composition.add(sphereGroup)

const sphereGeo = new THREE.SphereGeometry(0.5, 48, 48, 0, Math.PI)
const sphereMat = new THREE.MeshStandardMaterial({
	color: '#ffffff',
	roughness: 0.1,
  side: THREE.DoubleSide,
})
const sphere = new THREE.Mesh(sphereGeo, sphereMat)
sphere.castShadow = true
sphere.receiveShadow = true
sphere.rotation.y = -Math.PI * 0.5
sphereGroup.add(sphere)

const sphere2 = new THREE.Mesh(sphereGeo, sphereMat)
sphere2.castShadow = true
sphere2.receiveShadow = true
sphere2.rotation.y = Math.PI * 0.5
// sphere2.material.color = new THREE.Color('#ff9800')
sphere2.material = new THREE.MeshStandardMaterial({
	color: opts.sphereMaterial,
	roughness: 0.2,
  side: THREE.DoubleSide,
  transparent: true,
  opacity: .9
})
sphereGroup.add(sphere2)
sphereGroup.position.y = 0.68


/*------------------------------
Cube
------------------------------*/
const cubeGeo = new THREE.BoxGeometry(1, 1, 1)
const cubeMat = new THREE.MeshStandardMaterial({
  color: '#4caf50',
})
const cube = new THREE.Mesh(cubeGeo, cubeMat)
cube.castShadow = true
cube.receiveShadow = true
cube.scale.setScalar(0.3)
cube.position.y = .7
composition.add(cube)

/*------------------------------
Environment Map
------------------------------*/
const loader = new THREE.CubeTextureLoader()
loader.setPath('images/')
const textureCube = loader.load( [ 'posx.jpg', 'negx.jpg', 'posy.jpg', 'negy.jpg', 'posz.jpg', 'negz.jpg' ] )
textureCube.encoding = THREE.sRGBEncoding
scene.environment = textureCube


/*------------------------------
Light
------------------------------*/
const light1 = new THREE.DirectionalLight(0xffffff, 0.1)
light1.castShadow = true
light1.shadow.mapSize.width = 2048
light1.shadow.mapSize.height = 2048
light1.shadow.camera.near = 1
light1.shadow.camera.far = 1000
light1.position.set(10, 40, 20)
scene.add(light1)

const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
scene.add(ambientLight)

/*------------------------------
Fog
------------------------------*/
scene.fog = new THREE.Fog('#eee', 3, 20)
scene.background = new THREE.Color('#eee')

/*------------------------------
Helpers
------------------------------*/
const gridHelper = new THREE.GridHelper(10, 10)
// scene.add( gridHelper )
const axesHelper = new THREE.AxesHelper(5)
// scene.add( axesHelper )
const lightHelper1 = new THREE.DirectionalLightHelper(light1, 1, '#ff0000')
// scene.add( lightHelper1 )

/*------------------------------
GUI
------------------------------*/
const gui = new GUI()
gui.add(opts.lightPosition, 'x', -40, 40).onChange((value) => {
	light1.position.x = value
})
gui.addColor(opts, 'planeMaterial').onChange((value) => {
	planeMat.color = new THREE.Color(value)
})
gui.addColor(opts, 'sphereMaterial').onChange((value) => {
	sphere2.material.color = new THREE.Color(value)
})

/*------------------------------
Renderer
------------------------------*/
const renderer = new THREE.WebGLRenderer({
	alpha: true
})
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

/*------------------------------
Shadows
------------------------------*/
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

/*------------------------------
Orbit Controls
------------------------------*/
// const controls = new OrbitControls(camera, renderer.domElement)
// controls.autoRotate = true
// controls.enableDamping = true
// controls.dampingFactor = 0.1

/*------------------------------
Click
------------------------------*/
let clicked = false
const handleClick = () => {
  clicked = !clicked
  gsap.to(sphere.position, {
    x: clicked ? -.2 : 0,
    ease: 'power3.inOut',
    duration: 1.5
  })
  gsap.to(sphere2.position, {
    x: clicked ? .2 : 0,
    ease: 'power3.inOut',
    duration: 1.5
  })
}
window.addEventListener('click', handleClick)

/*------------------------------
Animate
------------------------------*/
function animate(clock) {
	// cube.rotation.x += 0.01
	// cube.rotation.y += 0.01

	// controls.update()

  
  const time = clock  * 0.001
  // sphereGroup2.rotation.z = Math.sin(time) * 0.2
  // sphereGroup2.rotation.y = (time)

  // sphereGroup.rotation.z = -Math.sin(time) * 0.1
  sphereGroup.rotation.y = (time)

  cube.rotation.x = time
  cube.rotation.y = time

	requestAnimationFrame(animate)
	renderer.render(scene, camera)
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
