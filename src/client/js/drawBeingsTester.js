import gltfPath_robo2Blue from '../../assets/models/robo4Blue.gltf';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

import * as THREE from 'three';

let perspectiveCamera, loader, scene, renderer, clock, controls;
let mixer, run;
init();
function init(){

    

    perspectiveCamera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 200 );
    perspectiveCamera.position.set( 10, 5, 20 );
    perspectiveCamera.layers.enableAll();
    perspectiveCamera.layers.toggle( 1 );
    
    
    clock = new THREE.Clock();

    renderer = new THREE.WebGLRenderer({ antialias: true  });

    renderer.setSize( window.innerWidth, window.innerHeight ); //this is HELLA important.
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor( 0xff0000    );
    document.body.appendChild( renderer.domElement );
    scene = new THREE.Scene();
    loader = new GLTFLoader();
    loader.load(gltfPath_robo2Blue, gltf=>{
        scene.add(gltf.scene);
        mixer = new THREE.AnimationMixer(gltf.scene);
        run = mixer.clipAction(THREE.AnimationClip.findByName( gltf.animations, 'Attack' ));
        run.play();
       console.log("..testing?");

    const directionalLight1 = new THREE.DirectionalLight( 0xffffff, 5 );
    const directionalLight2 = new THREE.DirectionalLight( 0xffffff, 5);

    directionalLight1.position.set(10, 10, 10);
    directionalLight2.position.set(-10, -10, -10);

   // const ambLight = new AmbientLight(0x404040 );
    //scene.add(ambLight);
    scene.add( directionalLight1 );
    scene.add( directionalLight2 );

    controls = new OrbitControls( perspectiveCamera, renderer.domElement );
    controls.minDistance = 5;
    controls.maxDistance = 100;

    });
}
export function animate(){
    if (renderer){
        console.log("rendering...")
        renderer.render(scene, perspectiveCamera);

    }else{
        console.log("else.. renderer:");
        console.log(renderer);

    }
    if (mixer && clock){
        console.log("mixin...")

        mixer.update(clock.getDelta()); //updating the player Animation. //we need to do this every second. 

    }
    if (controls){
        controls.update();

    }


}