import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {CSS2DRenderer, CSS2DObject} from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';

let camera, scene, renderer, labelRenderer, clock;
let EARTH_RADIUS = 1;
init();
function init(){
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 200 );
    camera.position.set( 10, 5, 20 );
    camera.layers.enableAll();
    camera.layers.toggle( 1 );


    scene = new THREE.Scene();
    clock = new THREE.Clock();

    const dirLight = new THREE.DirectionalLight( 0xffffff );
    dirLight.position.set( 0, 0, 1 );
    dirLight.layers.enableAll();
    scene.add( dirLight );

    

    const sphereGeo = new THREE.SphereGeometry( EARTH_RADIUS, 16, 16 );
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    const sphere = new THREE.Mesh( sphereGeo, material );
    scene.add( sphere );



    //

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setClearColor( 0xF8F0E3    );

    document.body.appendChild( renderer.domElement );

    labelRenderer = new CSS2DRenderer();
    labelRenderer.setSize( window.innerWidth, window.innerHeight );
    labelRenderer.domElement.style.position = 'absolute';
    labelRenderer.domElement.style.top = '10px';

    document.body.appendChild( labelRenderer.domElement );

    const testDiv = document.createElement( 'div' );
    testDiv.className = 'label';
    testDiv.textContent = 'Earth';
    testDiv.style.marginTop = '-1em';
    const testLabel = new CSS2DObject( testDiv );
    testLabel.position.set( 0, EARTH_RADIUS, 0 );
    sphere.add( testLabel );
    testLabel.layers.set( 0 );

    const controls = new OrbitControls( camera, labelRenderer.domElement );
    controls.minDistance = 5;
    controls.maxDistance = 100;


}

export function animate() {
    renderer.render( scene, camera );
    labelRenderer.render( scene, camera );

}