import {getPlayerUpdate} from './process.js'
import {handleUpdate} from './handleUpdate.js'

import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

import {pickupItem, reqRoboAdd, orbitUpdate} from './network.js';
 
//import {gltfPath} Ffrom './playerModelEmbedded.gltf';
import gltfPath_simpleRoboRed from '../../assets/models/SimpleRoboRed.gltf';

import gltfPath_playerBlue from '../../assets/models/playerModelBlueFixed.gltf';
import gltfPath_playerRed from '../../assets/models/playerModelRed.gltf';

import gltfPath_robo1Blue from '../../assets/models/robo1Blue.gltf';
import gltfPath_robo2Blue from '../../assets/models/robo2Blue.gltf';
import gltfPath_robo3Blue from '../../assets/models/robo3Blue.gltf';
import gltfPath_robo4Blue from '../../assets/models/robo4Blue.gltf';
import gltfPath_robo5Blue from '../../assets/models/robo5Blue.gltf';

import gltfPath_robo1Red from '../../assets/models/robo1Red.gltf';
import gltfPath_robo2Red from '../../assets/models/robo2Red.gltf';
import gltfPath_robo3Red from '../../assets/models/robo3Red.gltf';
import gltfPath_robo4Red from '../../assets/models/robo4RedFixed.gltf';
import gltfPath_robo5Red from '../../assets/models/robo5Red.gltf';

import gltfPath_chip1 from '../../assets/models/chip1.gltf';
import gltfPath_chip2 from '../../assets/models/chip2.gltf';
import gltfPath_chip3 from '../../assets/models/chip3.gltf';
import gltfPath_chip4 from '../../assets/models/chip4.gltf';
import gltfPath_chip5 from '../../assets/models/chip5.gltf';
import gltfPath_chip6 from '../../assets/models/chip6.gltf';
import gltfPath_chip7 from '../../assets/models/chip7.gltf';
import gltfPath_chip8 from '../../assets/models/chip8.gltf';
import gltfPath_chip9 from '../../assets/models/chip9.gltf';
import gltfPath_chip10 from '../../assets/models/chip10.gltf';
import gltfPath_chip11 from '../../assets/models/chip11.gltf';
import gltfPath_chip12 from '../../assets/models/chip12.gltf';


import gltfPath_gear from '../../assets/models/gameGear.gltf'

import gltfPath_projectileBlue  from '../../assets/models/projectileBlue.gltf'
import gltfPath_projectileRed  from '../../assets/models/projectileRed.gltf'


const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

//import gltfPath from '../../assets/models/playerModelRed_1.gltf';
 
import * as fs from 'fs';
import _, { map, now } from 'lodash';
//import { Camera, MixOperation } from 'three';
import ThreeObj from './ThreeObj.js'; //so it doesn't like the {} for the class. keep that in mind.
import { AmbientLight, MixOperation } from 'three';

import {CSS2DRenderer, CSS2DObject} from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { Mesh } from 'three';
/*const earthMassDiv = document.createElement( 'div' );
const earthMassLabel = new CSS2DObject( earthMassDiv );*/
/*
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();


let loader = new GLTFLoader();*/
//console.log = function() {}

/* courtesy of wael yasmina */


const scene = new THREE.Scene();
/*console.log("SCENE: ");
console.log(scene);*/

const loader = new GLTFLoader();
let fov = 60;
let aspect= 1920/1000;
const near = 1.0;
const far = 1000.0;
const perspectiveCamera = new THREE.PerspectiveCamera(fov, aspect, near, far);
//perspectiveCamera.position.set(0.084, 3.496, 7.923);    
//perspectiveCamera.rotation.set(-23.81, -0.56 , 0.25);
perspectiveCamera.position.set(0, 5, 13); 
perspectiveCamera.rotation.set(0, 0, 0); 

//perspectiveCamera.lookAt(new THREE.Vector3(0, 0, 0));
console.log("just initialized the perspective camera");
console.log(perspectiveCamera);

const clock = new THREE.Clock();
const directionalLight1 = new THREE.DirectionalLight( 0xffffff, 5 );
const directionalLight2 = new THREE.DirectionalLight( 0xffffff, 5);

directionalLight1.position.set(10, 10, 10);
directionalLight2.position.set(-10, -10, -10);

const ambLight = new AmbientLight(0x404040 );
scene.add(ambLight);
scene.add( directionalLight1 );
scene.add( directionalLight2 );
const size = 10;
const divisions = 10;

const gridHelper = new THREE.GridHelper( size, divisions );
scene.add( gridHelper );

const renderer = new THREE.WebGLRenderer({ antialias: true  });
renderer.setSize( window.innerWidth, window.innerHeight ); //this is HELLA important.
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor( 0xF8F0E3    );

let labelRenderer = new CSS2DRenderer();
labelRenderer.setSize( window.innerWidth, window.innerHeight );
labelRenderer.domElement.style.position = 'absolute';
labelRenderer.domElement.style.top = '0px';
labelRenderer.domElement.style.zIndex = "1";
labelRenderer.domElement.style.pointerEvents = 'none';
//.addClass("labelElement");
document.body.appendChild( renderer.domElement );
document.body.appendChild( labelRenderer.domElement )


const planeMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(100, 100), 
    new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide, 
        color:0xD2B48C,
         //has this been deprecated? idc it still works
    })
)
planeMesh.name = 'plane';

planeMesh.rotateX(-Math.PI/2);      
scene.add(planeMesh);
const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );

$('body').children().last().addClass("viewport"); //this just puts a class on the 2drenderer which is what we click on.
/*
const sphereGeo = new THREE.SphereGeometry( 1, 16, 16 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const sphere = new THREE.Mesh( sphereGeo, material );
scene.add( sphere );

const testDiv = document.createElement( 'div' );
testDiv.className = 'label';
testDiv.textContent = 'Earth';
testDiv.style.marginTop = '-1em';
const testLabel = new CSS2DObject( testDiv );
testLabel.position.set( 0, 1, 0 );
sphere.add( testLabel );
testLabel.layers.set( 0 );
*/
//perspectiveCamera.position.z = 2

const controls = new OrbitControls( perspectiveCamera, renderer.domElement );
controls.minDistance = 5;
controls.maxDistance = 100;




//controls.update();
let actionRun;
let actionAttack;
let aniMixer;
let passCount = 0;
//let loader = new GLTFLoader(); //pretty sure we can always just use the exact same loader.
let playerX;
let playerY;
let playerRot;
let playerMain;
let unique_id;
/*
export function drawBeings(mainPlayerInfo, beingsInfo){
    let playerMixer;
    console.log("test1");
    loader.load(gltfPath_playerRed, gltf => {
        playerMixer = new THREE.AnimationMixer(gltf.scene);
        console.log("test2");
        playerMain = new ThreeObj(mainPlayerInfo.x, mainPlayerInfo.y, mainPlayerInfo.rotation, playerMixer);
        console.log(playerMain);

    }); 
    console.log("test3");
}*/
let playerMixer;
let mixer;
let _mainPlayerInfo;
let _beingsInfo;
let mainPlayerIdle;
let mainPlayerRun;
let mainPlayerCurrentAnim;
let beingsMap = new Map();
let gltfPath;
let v = 1;


function test(){
    return new Promise(res=> {
        console.log("hello")
        res("hello");
    });
}
let mix;
/*
new Promise(resolve => {//gltfPath_playerRed gltfPath_robo1Blue
    loader.load(gltfPath_robo1Blue, gltf => {
        mix = new THREE.AnimationMixer(gltf.scene);
        gltf.scene.scale.set(0.2, 0.2, 0.2);

        scene.add(gltf.scene);

        let clips = gltf.animations;
        let actionArray = [];
        actionArray.push(mix.clipAction(THREE.AnimationClip.findByName( clips, 'Idle' )));
        actionArray.push(mix.clipAction(THREE.AnimationClip.findByName( clips, 'Run' )));
        actionArray.push(mix.clipAction(THREE.AnimationClip.findByName( clips, 'Attack' )));
        
        //actionArray[1].play();
       // let runAction = mix.clipAction(THREE.AnimationClip.findByName( clips, 'Run' ));
        //runAction.timeScale = 10;
        let testerObj = new ThreeObj("abc", 'robot', actionArray, 'Run', mix)
        //testerObj.updateAnimation('run');
        resolve();
    })
})*/

let clockDelta //defined globally.
controls.update();

export async function drawBeings(mainPlayerInfo, beingsInfo){

        /*! console.log("IN DRAW BEINGS");*/
        //console.log(mainPlayerInfo.x);
        //console.log(beingsInfo);
        //console.log("player^");
 
        
       /*! console.log("player rotation: " + mainPlayerInfo.rotation);
        beingsInfo.forEach(being => {
            console.log(being.x);
            console.log("being rotation: " + being.rotation);
        })
        console.log("beings^");*/
     //   await test();

        _mainPlayerInfo = mainPlayerInfo;
        _beingsInfo = beingsInfo;
        //await a;

        if (clock)[
            clockDelta = clock.getDelta()
        ]
      /*  console.log("starting");
        console.log("logging beings info");
        console.log(beingsInfo);*/
        await updatePlayer();
            await updateBeing();
        cleanup();

};



let playerContainer;

//three stages for each -- 1.) initializing 2.) updating position and animation and then actually updating using clock. 3.) (If in map) then delete extras.
//fourth stage after all - render! 
let times = 0;
let playerTwoDRenderer;
let roboContainer;
let roboMixer;
async function updatePlayer() {
            await new Promise (resolve => 
                {if (!playerContainer){
                    loader.load(gltfPath_playerBlue, gltf => {
                    gltf.scene.scale.set(1.1, 1.1, 1.1);
                    scene.add(gltf.scene); 
                    playerMixer = new THREE.AnimationMixer(gltf.scene);
                    let clips = gltf.animations;
                    let actionArray = [];
                    actionArray.push(playerMixer.clipAction(THREE.AnimationClip.findByName( clips, 'Idle' )));
                    actionArray.push(playerMixer.clipAction(THREE.AnimationClip.findByName( clips, 'Run' )));
                    actionArray.push(playerMixer.clipAction(THREE.AnimationClip.findByName( clips, 'Attack' )));

                    let testDiv = document.createElement( 'div' );
                    testDiv.className = 'label';
                    let testInnerDiv = document.createElement('div');
                    testInnerDiv.className = 'innerLabel';
                    testDiv.appendChild(testInnerDiv);
                   // testDiv.textContent = 'HEALTH';
                    let label = new CSS2DObject( testDiv ); 
                    label.position.copy(playerMixer._root.position);
                    label.position.y += 2.1;
                    playerMixer._root.add( label );
                    label.layers.set( 0 );  
                    playerContainer = new ThreeObj(_mainPlayerInfo.unique_id, _mainPlayerInfo.type, actionArray, _mainPlayerInfo.animation, playerMixer, testDiv)        
                    playerContainer.setHP(100);

                    //setting global uuid
                    console.log(playerMixer._root.userData);
                    playerMixer._root.userData.global_uuid = "ROBOROBO"///_mainPlayerInfo.unique_id;
                    playerMixer._root.position.y += 1.55   ;//this is actually z. we put it here so it only happens once.

                    resolve();
                    
                });

                } else{
                    resolve();
                }   
           
             }).then(()=>{
                playerX = _mainPlayerInfo.x;
                playerY = _mainPlayerInfo.y;
                playerRot = _mainPlayerInfo.rotation;

                playerContainer.updateX(playerX, playerX);
                playerContainer.updateY(playerY, playerY);
                //we also gotta update hp. 

                playerContainer.updateRot(playerRot); //rot must be manually updated!
                if(playerMixer) {               
                    playerMixer.update(clockDelta);
                }
                playerContainer.setHP(_mainPlayerInfo.hp); //assuming the hp comes back.

             }  );}
            /*! console.log("<3>");*//*
            await new Promise (resolve => 
                {if (!roboContainer){
                    loader.load(gltfPath_robo2Red, gltf => {
                    /*!console.log("print how many times." + times++);*/
                    //gltf.scene.rotateY(0.5); 
                    /*
                    gltf.scene.scale.set(0.7, 0.7, 0.7);
                    scene.add(gltf.scene); 
                    roboMixer = new THREE.AnimationMixer(gltf.scene);
                    let clips = gltf.animations;
                    let actionArray = [];
                    actionArray.push(roboMixer.clipAction(THREE.AnimationClip.findByName( clips, 'Idle' )));
                    actionArray.push(roboMixer.clipAction(THREE.AnimationClip.findByName( clips, 'Run' )));
                    actionArray.push(roboMixer.clipAction(THREE.AnimationClip.findByName( clips, 'Attack' )));
                    let testDiv = document.createElement( 'div' );
                    testDiv.className = 'label';
                    let testInnerDiv = document.createElement('div');
                    testInnerDiv.className = 'innerLabel';
                    testDiv.appendChild(testInnerDiv);
                   // testDiv.textContent = 'HEALTH';
                    let label = new CSS2DObject( testDiv );
                    label.position.copy(roboMixer._root.position);
                    label.position.y += 2.1;
                    roboMixer._root.add( label );
                    label.layers.set( 0 );  
                    roboContainer = new ThreeObj('test', 'robot', actionArray, 'Run', roboMixer, testDiv)       
                    roboContainer.setHP(95);

                    //setting global uuid

                    roboMixer._root.userData.global_uuid = 'test';


                    resolve();
                });
                } else{
                    resolve();
                }   
             }).then(()=>{
                roboContainer.updateX(505, playerX); //this works since playerX now exists!
                roboContainer.updateY(505, playerY);
                if(roboMixer) {
                    roboMixer.update(clockDelta); 
                }
             }  );
        }
*/
let zOffset = 0;

async function updateBeing(){
        /*!console.log("<4>");
        console.log(beingsMap);

        console.log("initial prints:")
        console.log(_mainPlayerInfo);
        console.log(_beingsInfo);
        console.log(scene);*/
        //For each uuid in the map, if the object doesn't exist, then we're going to do the big 3.
        //1.) load gltf, 2.) add to scene, 3.) create model. 
        for (const being of _beingsInfo) {
            
           /*! console.log("<5> should be x3" + passCount); //should be

            console.log("this is the being we're about to look at:")
            console.log(being);*/
            let unique_id = being.unique_id; //first get the unique_id
            let type = being.type;
            
            //if the unique_id doesn't exist, we're going to create a map to it, position, and animate!
            /*console.log(_beingsInfo);
            console.log(beingsMap);
            console.log(beingsMap.has(unique_id));*/
            if (!beingsMap.has(unique_id)){
                console.log("HERE, IN UNIQUE ID");
                console.log(being);
               /*! console.log("5.5 -- this should ONLY be called when the object isn't in the mapping.");*/
                //here, we're just figuring out the type so we can pass it on to the promise. this is like a setup type step!
                switch(being.type){
                    case 'player':
                        gltfPath = gltfPath_playerRed; //because it's not the user, it must be the enemy.
                        break;
                    case 'robot':
                        let model = being.model;
                        //we say this here because model doesn't exist unless we're dealing with a robot. 
                      /*  console.log("MODEL PRINTING");
                        console.log(model);
                        console.log(being);
                        console.log(being.side);*/
                        switch(model){
                            case "1":
                                zOffset = 0.26;
                                if (being.side == 'ally'){
                                    console.log("SHOULD COME HERE");
                                    gltfPath = gltfPath_robo1Blue;
                                }else{
                                    gltfPath = gltfPath_robo1Red;

                                }
                            break;
                            case "2":
                                zOffset = 0.55;

                                if (being.side == 'ally'){
                                    gltfPath = gltfPath_robo2Blue;
                                }else{
                                    gltfPath = gltfPath_robo2Red;

                                }
                            break;
                            case "3":
                                zOffset = 0.13;

                                if (being.side == 'ally'){
                                    gltfPath = gltfPath_robo3Blue;
                                }else{
                                    gltfPath = gltfPath_robo3Red;

                                }
                            break;
                            case "4":
                                zOffset = 0.76;

                                if (being.side == 'ally'){
                                    gltfPath = gltfPath_robo4Blue;
                                }else{
                                    gltfPath = gltfPath_robo4Red;

                                }
                            break;
                            case "5":
                                zOffset = 0.41;

                                if (being.side == 'ally'){
                                    gltfPath = gltfPath_robo5Blue;
                                }else{
                                    gltfPath = gltfPath_robo5Red;

                                }
                            break;
                        }
                        break;
                    case 'gear':
                        gltfPath = gltfPath_gear; 
                        zOffset = 0.1;
                        break;
                    case 'projectile':
                        console.log("PROJ");
                        if (being.side == 'ally')
                            gltfPath = gltfPath_projectileBlue;
                        else
                            gltfPath = gltfPath_projectileRed;
                        zOffset = 2.3;
                        //we will need x and y offsets, no?

                        break;
                    case 'chip':
                        zOffset = 2;
                        switch(being.model){ //this is always going to be valid (techinically it will be valid regardless of whether the model exists or not.)
                            case "1":
                                gltfPath = gltfPath_chip1;
                                break;
                            case "2":
                                gltfPath = gltfPath_chip2;
                                break;
                            case "3":
                                gltfPath = gltfPath_chip3;
                                break;
                            case "4":
                                gltfPath = gltfPath_chip4;
                                break;
                            case "5":
                                gltfPath = gltfPath_chip5
                                break;
                            case "6":
                                gltfPath = gltfPath_chip6;
                                break;
                            case "7":
                                gltfPath = gltfPath_chip7;
                                break;
                            case "8":
                                gltfPath = gltfPath_chip8;
                                break;
                            case "9":
                                gltfPath = gltfPath_chip9;
                                break;
                            case "10":
                                gltfPath = gltfPath_chip10;
                                break;
                            case "11":
                                gltfPath = gltfPath_chip11;
                                break;
                            case "12":
                                gltfPath = gltfPath_chip12;
                                break;
                        }
                    break;



                } 
               // gltfPath = gltfPath_simpleRoboRed;
                await new Promise(resolve=> { 
                    loader.load(gltfPath, gltf => {
                       /*! console.log('in other words, being with the id: ' + unique_id + " is not in the map, and we're adding it");*/
                        scene.add(gltf.scene);
                        if (being.type == 'robot'){
                            gltf.scene.scale.set(0.3, 0.3, 0.3);
                        }else if (being.type == 'player'){
                            gltf.scene.scale.set(0.7, 0.7, 0.7);
                        }else if (being.type == 'gear'){
                            gltf.scene.scale.set(0.8, 0.8, 0.8);
                        }else if(being.type == 'projectile'){
                            gltf.scene.scale.set(0.4, 0.4, 0.4);
                        }
                        mixer = new THREE.AnimationMixer(gltf.scene);
                        
                        let clips = gltf.animations;
                        let actionArray = [];
                        let label;
                        let testDiv
                        if (being.type != 'gear' && being.type != "projectile" && being.type != 'chip'){ //because none of these should have health bars or healthbars //note that we need to figure out the rotation situation for gears and chips.
                            actionArray.push(mixer.clipAction(THREE.AnimationClip.findByName( clips, 'Idle' )));
                            actionArray.push(mixer.clipAction(THREE.AnimationClip.findByName( clips, 'Run' )));
                            actionArray.push(mixer.clipAction(THREE.AnimationClip.findByName( clips, 'Attack' )));
                          /*  actionArray.forEach(action => {
                                action.timeScale = 50; //they seem to be reallly slow so we're speeding it up!
                            }) */
    
                            testDiv = document.createElement( 'div' );
                            testDiv.className = 'label';
                            let testInnerDiv = document.createElement('div');
                            testInnerDiv.className = 'innerLabel';
                            testDiv.appendChild(testInnerDiv);
                            label = new CSS2DObject( testDiv );
                            label.position.copy(mixer._root.position);
                            if (being.type == 'player'){
                                label.position.y += 2.1;
                            }else if (being.type == 'robot'){
                                label.position.y += 8.8;
                            }
                            mixer._root.add( label ); //this will be for each individual mixer.
                            label.layers.set( 0 );  
                        } 
                        
                        //we are adding the uuid!
                        //object.global_uuid
                        mixer._root.userData.global_uuid = unique_id;
                        mixer._root.userData.type = being.type; //this is for all mixers.

                        //note that the actionArray may be undefined.
                        beingsMap.set(unique_id, new ThreeObj(unique_id, being.type, actionArray, being.animation, mixer, testDiv));
                        mixer._root.position.y += zOffset;//this is actually z. we put it here so it only happens once.
                        //note how we don't need to reference the threeObj here because we're only doing this once.
                        resolve();
                    }); 
                }); 
            }
        
            //now, each being that should be in the map, exists. time to update position and animation.
            let beingContainer = beingsMap.get(unique_id); //this will always return with something.
            beingContainer.updateX(being.x, playerX); //this works since playerX now exists!
            beingContainer.updateY(being.y, playerY);
            //if (being.type != 'projectile'){. got rid of this if statement because i've decided that i'm going to give a rotation of 0 to projectile, and same logic for gear.
            beingContainer.updateRot(being.rotation); //note that when this is NAN, it fails.
            //}
            
           // console.log("<5>, about to update animation: " + being.animation);
           if (being.type != 'gear' || being.type != 'projectile'){
            //console.log("ABT TO PLAY");
            beingContainer.updateAnimation(being.animation);
           }
            beingContainer.checked = true; //so at this point, everything will have been checked!
           // if(beingContainer.mixer) (beingContainer.mixer).update(clock.getDelta());
            

            //console.log(beingsMap);
            //console.log("<6.5>  -- should ONLY be called if beings REGARDLESS OF whether being already exist, but only once.");

    
        
        };
        /*!console.log("FINISHED pass of beings");
        console.log(beingsMap);
        console.log("<6> -- is called 1 time, AFTER each beings have/have not been added" + passCount);*/


            //after we've made sure all beings have been updated.. clean up!
            //now, for the third step, we will clean our our map. 
    
            let ids_to_remove = [];
 
            //console.log("before delete");
            //console.log(beingsMap)
            beingsMap.forEach(beingContainer=> {//there's nothing here that is async, so we need no promise. thus, use a forEach!
                //console.log(beingContainer);
                if (beingContainer.checked){//we're using the same variable twice, even though this is fine. i hope it's not confusing.
                    beingContainer.checked = false;  
                } else{ 
                   /*! console.log("we're removing element w/ id: " + unique_id + " from the map");
                    console.log(beingContainer.unique_id);*/

                    //we're actually going to delete the object too. 
                    scene.remove(beingContainer.mixer._root); //this is an object
                    beingsMap.delete(beingContainer.unique_id);

                    //ids_to_remove.push(beingContainer.unique_id);
                     //i really hope this doesn't cause any issues because we're deleting inside of the map.
                }
            /*!    console.log("<7>");*/

            });
           /*! console.log(beingsMap);
            console.log("RESOLVING ALL FOR BEINGSMAP");
            console.log("<8>");

            console.log(playerContainer.mixer._root.position.x);*/

            //console.log("<9>");
            beingsMap.forEach(container=>{
                //console.log(container.currentAnimationName);
            });
            /*
            console.log("logging camera pos...")
            console.log(perspectiveCamera);
            console.log("logging player rotation...")
            console.log(playerContainer.mixer._root.rotation._z);*/
            



           // console.log("after delete");
          //  console.log(beingsMap);
           

};


let dir
let arrowHelper
function cleanup(){

   // renderer.setSize( window.innerWidth, window.innerHeight );
    if(mix) mix.update(clock.getDelta());

    beingsMap.forEach(beingContainer =>{
        if(beingContainer.mixer) (beingContainer.mixer).update(clockDelta);
    })
   // perspectiveCamera.updateProjectionMatrix();
    controls.update();
    //console.log(perspectiveCamera);
    //console.log(perspectiveCamera.rotation.x);
    //console.log(perspectiveCamera.rotation.z);
    orbitUpdate({x: perspectiveCamera.rotation.z, y:perspectiveCamera.rotation.z});

    let z = perspectiveCamera.rotation.z;
    if (arrowHelper){
        scene.remove(arrowHelper);
    }
    dir = new THREE.Vector3( Math.cos(-z - Math.PI/2), 0, Math.sin(-z - Math.PI/2) );
    dir.normalize();
    const origin = new THREE.Vector3( 0, 0, 0 );
    const length = 1;
    const hex = 0xffff00;
    arrowHelper = new THREE.ArrowHelper( dir, origin, length, hex );
    scene.add( arrowHelper );
    //console.log("updates in degrees");
    //console.log((z+ 3*Math.PI/2)*180/Math.PI);

    renderer.render(scene, perspectiveCamera);
    labelRenderer.render(scene, perspectiveCamera);

    //console.log(scene);
    //console.log("FINISHED RENDER + ONE PASS *******************************");
    passCount++;
}    
   

export function mouseDownCanvas(e){ // it doesn't matter the order that this is called so much. since, if it doesn't get anything, it just doesn't do anything. 
    pointer.x = ( e.clientX / window.innerWidth ) * 2 - 1; - 0.5495004541326067
	pointer.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
    console.log("POINTER X POINTER Y")
    console.log(pointer.x);
    console.log(pointer.y);
    raycaster.setFromCamera( pointer, perspectiveCamera );
    const intersects = raycaster.intersectObjects( scene.children ); 

    console.log(intersects);   
    let uuidsArr = [];
    
    intersects.forEach(index => {
        let objToCheck = index.object;
    
        if (objToCheck && objToCheck.parent){
            while (objToCheck.parent.parent != null){
                objToCheck = objToCheck.parent;
                //console.log(intersects[0].object.parent.parent.parent.userData.global_uuid);
            }
            let uuid = objToCheck.userData.global_uuid;
            let type = objToCheck.userData.type;
            //console.log(uuid);
           // console.log(type);
            //this should get us objToCheck where the parent of parent is null.
            if (type == "gear" || type == "chip" ){ //note that if we're clicking on a player that doens't have a type, it doesn't matter.
                if (!uuidsArr.includes(uuid)) uuidsArr.push(uuid) //basically, if we haven't yet pushed the globaluuid to the array, do so now. 
            }
            //now we're going to have the list of all things that you clicked on (unique)
        }
     
    });



    console.log("after all is said and done...");
    console.log(uuidsArr);
    if (uuidsArr.length > 0){
        pickupItem(uuidsArr);
    }

    console.log(playerMixer);
    beingsMap.forEach(being => {
        console.log(being.mixer);
    })
} 

/* silly, actual goofy ahh code */
export function rayCastForBattleField(e, uuid){
    pointer.x = ( e.clientX / window.innerWidth ) * 2 - 1; - 0.5495004541326067
	pointer.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
    raycaster.setFromCamera(pointer, perspectiveCamera);
    let intersected = raycaster.intersectObjects(scene.children)
    intersected.forEach(intersectedObj => {
        if (intersectedObj.object.name == 'plane'){
            console.log(intersectedObj.point);
            console.log("POINTT");
            //we only care about x and y.
            //technically, this is x and z. 
            reqRoboAdd({uuid, x:intersectedObj.point.x, y:intersectedObj.point.z});
        }
    })


}