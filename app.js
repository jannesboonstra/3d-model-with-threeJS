let container;
let camera;
let renderer;
let scene;
let house;

function init(){
    container = document.querySelector('.scene');
    scene = new THREE.Scene();

    const fov = 35;
    const aspect = container.clientWidth / container.clientHeight;
    const near = .1;
    const far = 500;
    camera = new THREE.PerspectiveCamera(fov, aspect,near,far);
    camera.position.set(0,10,60);

    const ambient = new THREE.AmbientLight(0x404040,2)
    scene.add(ambient);
    const point = new THREE.PointLight(0x404040,10);
    point.position.set(20,-10,20);
    scene.add(point);

    renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    container.appendChild(renderer.domElement);

    let loader = new THREE.GLTFLoader();
    loader.load('./3D/scene.gltf', function(gltf){
        scene.add(gltf.scene);
        house = gltf.scene.children[0];
        renderer.render(scene,camera);
        animate();
    })

}

function animate(){
    requestAnimationFrame(animate);
    house.rotation.z += 0.005;
    renderer.render(scene,camera);
}

init();