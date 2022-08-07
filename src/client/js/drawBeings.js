import {getPlayerUpdate} from './process.js'
import {handleUpdate} from './handleUpdate.js'

import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
 
//import {gltfPath} Ffrom './playerModelEmbedded.gltf';
import gltfPath_simpleRoboRed from '../../assets/models/SimpleRoboRed.gltf';

import gltfPath_playerBlue from '../../assets/models/playerModelBlue.gltf';
import gltfPath_playerRed from '../../assets/models/playerModelRed.gltf';

import gltfPath_robo1Blue from '../../assets/models/robo1Blue.gltf';
import gltfPath_robo2Blue from '../../assets/models/robo2Blue.gltf';
import gltfPath_robo3Blue from '../../assets/models/robo3Blue.gltf';
import gltfPath_robo4Blue from '../../assets/models/robo4Blue.gltf';
import gltfPath_robo5Blue from '../../assets/models/robo5Blue.gltf';

import gltfPath_robo1Red from '../../assets/models/robo1Red.gltf';
import gltfPath_robo2Red from '../../assets/models/robo2Red.gltf';
import gltfPath_robo3Red from '../../assets/models/robo3Red.gltf';
import gltfPath_robo4Red from '../../assets/models/robo4Red.gltf';
import gltfPath_robo5Red from '../../assets/models/robo5Red.gltf';




//import gltfPath from '../../assets/models/playerModelRed_1.gltf';
 
import * as fs from 'fs';
import _, { map, now } from 'lodash';
//import { Camera, MixOperation } from 'three';
import ThreeObj from './ThreeObj.js'; //so it doesn't like the {} for the class. keep that in mind.
import { AmbientLight, MixOperation } from 'three';

import {CSS2DRenderer, CSS2DObject} from 'three/examples/jsm/renderers/CSS2DRenderer.js';
/*const earthMassDiv = document.createElement( 'div' );
const earthMassLabel = new CSS2DObject( earthMassDiv );*/
/*
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();


let loader = new GLTFLoader();*/
//console.log = function() {}

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
perspectiveCamera.lookAt(new THREE.Vector3(0, 0, 0));
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


const renderer = new THREE.WebGLRenderer({ antialias: true  });
renderer.setSize( window.innerWidth, window.innerHeight ); //this is HELLA important.
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor( 0xF8F0E3    );
document.body.appendChild( renderer.domElement );

let labelRenderer = new CSS2DRenderer();
labelRenderer.setSize( window.innerWidth, window.innerHeight );
labelRenderer.domElement.style.position = 'absolute';
labelRenderer.domElement.style.top = '10px';
labelRenderer.domElement.style.zIndex = "1";

document.body.appendChild( labelRenderer.domElement );
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
/*
const controls = new OrbitControls( perspectiveCamera, renderer.domElement );
controls.minDistance = 5;
controls.maxDistance = 100;*/





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
                    loader.load(gltfPath_robo4Red, gltf => {
                    gltf.scene.scale.set(0.7, 0.7, 0.7);
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
                    playerContainer.setHP(95);
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
             }  );
            /*! console.log("<3>");*/
            await new Promise (resolve => 
                {if (!roboContainer){
                    loader.load(gltfPath_robo2Red, gltf => {
                    /*!console.log("print how many times." + times++);*/
                    //gltf.scene.rotateY(0.5); 
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
               /*! console.log("5.5 -- this should ONLY be called when the object isn't in the mapping.");*/
                //here, we're just figuring out the type so we can pass it on to the promise. this is like a setup type step!
                switch(being.type){
                    case 'player':
                        gltfPath = gltfPath_playerRed; //because it's not the user, it must be the enemy.
                        break;
                    case 'robot':
                        let model = being.model;
                        //we say this here because model doesn't exist unless we're dealing with a robot. 
                        console.log("MODEL PRINTING");
                        console.log(model);
                        switch(model){
                            case "1":
                                if (being.side == 'ally'){
                                    gltfPath = gltfPath_robo1Blue;
                                }else{
                                    gltfPath = gltfPath_robo1Red;

                                }
                            break;
                            case "2":
                                if (being.side == 'ally'){
                                    gltfPath = gltfPath_robo2Blue;
                                }else{
                                    gltfPath = gltfPath_robo2Red;

                                }
                            break;
                            case "3":
                                if (being.side == 'ally'){
                                    gltfPath = gltfPath_robo3Blue;
                                }else{
                                    gltfPath = gltfPath_robo3Red;

                                }
                            break;
                            case "4":
                                if (being.side == 'ally'){
                                    gltfPath = gltfPath_robo4Blue;
                                }else{
                                    gltfPath = gltfPath_robo4Red;

                                }
                            break;
                            case "5":
                                if (being.side == 'ally'){
                                    gltfPath = gltfPath_robo5Blue;
                                }else{
                                    gltfPath = gltfPath_robo5Red;

                                }
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
                            gltf.scene.scale.set(0.2, 0.2, 0.2);
                        }else if (being.type == 'player'){
                            gltf.scene.scale.set(0.7, 0.7, 0.7);
                        }
                        mixer = new THREE.AnimationMixer(gltf.scene);
                        
                        let clips = gltf.animations;
                        let actionArray = []; 
                        actionArray.push(mixer.clipAction(THREE.AnimationClip.findByName( clips, 'Idle' )));
                        actionArray.push(mixer.clipAction(THREE.AnimationClip.findByName( clips, 'Run' )));
                        actionArray.push(mixer.clipAction(THREE.AnimationClip.findByName( clips, 'Attack' )));
                      /*  actionArray.forEach(action => {
                            action.timeScale = 50; //they seem to be reallly slow so we're speeding it up!
                        }) */

                        let testDiv = document.createElement( 'div' );
                        testDiv.className = 'label';
                        let testInnerDiv = document.createElement('div');
                        testInnerDiv.className = 'innerLabel';
                        testDiv.appendChild(testInnerDiv);
                        let label = new CSS2DObject( testDiv );
                        label.position.copy(mixer._root.position);
                        if (being.type == 'player'){
                            label.position.y += 2.1;
                        }else if (being.type == 'robot'){
                            label.position.y += 8.8;
                        }
                        mixer._root.add( label ); //this will be for each individual mixer.
                        label.layers.set( 0 );  

                        beingsMap.set(unique_id, new ThreeObj(unique_id, being.type, actionArray, being.animation, mixer, testDiv));
                        resolve();
                    }); 
                }); 
            }
        
            //now, each being that should be in the map, exists. time to update position and animation.
            let beingContainer = beingsMap.get(unique_id); //this will always return with something.
            beingContainer.updateX(being.x, playerX); //this works since playerX now exists!
            beingContainer.updateY(being.y, playerY);
            beingContainer.updateRot(being.rotation);
           // console.log("<5>, about to update animation: " + being.animation);
            beingContainer.updateAnimation(being.animation);
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


 

    
function cleanup(){
   // renderer.setSize( window.innerWidth, window.innerHeight );
    if(mix) mix.update(clock.getDelta());
    beingsMap.forEach(beingContainer =>{
        if(beingContainer.mixer) (beingContainer.mixer).update(clockDelta);
    })
   // perspectiveCamera.updateProjectionMatrix();
    renderer.render(scene, perspectiveCamera);
    labelRenderer.render(scene, perspectiveCamera);

    //console.log(scene);
   //controls.update();
    //console.log("FINISHED RENDER + ONE PASS *******************************");
    passCount++;
}