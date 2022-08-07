import io from 'socket.io-client';
const socket = io("ws://localhost:4000");
import '../css/stylesheet.css'
//import { forEach } from 'lodash';
//import { formatValidationError } from 'webpack/lib/WebpackOptionsValidationError';
const axios = require('axios').default;
import {menuLogicSetup, fillButtons, handleErrors, consoleLogTester, menuComplete} from './menuLogic.js';
import {agentSelectComplete} from './agentSelectLogic.js'
import {setupCanvas, updateCanvas} from './canvas.js' //update canvas because that's where we're going to start listening ==> updating.
import {draw} from './draw.js';
import {startCapturingInput} from './input.js';
import {initState, processGameUpdate} from './process.js' //the center of where we get/process our updates from the server! 
let mode;
let playerClassType;
let multiStyle;
//let test = document.getElementById("test");
//test.addEventListener('click', ()=> console.log('chortle on my weiner'));
/*console.log(backButton.attributes);
setTimeout(()=>{hide(backButton); console.log(backButton.attributes);}, 5000);
function hide(element){
    element.setAttribute('status', 'hidden');
}*/
let room_arr;



export function connect(playerType){
    return new Promise((resolve, reject) =>{
        //any socket stuff goes here.
        socket.on('connect', ()=>{
         //   $('#myTestButton1')[0].onclick = () => console.log("OOMA POMA1");
         //   $('#myTestButton2')[0].onclick = () => console.log("OOMA POMA2");
            console.log("connected!");
           // document.getElementById("superButton").addEventListener('click', ()=> {console.log("SUPERE!"); socket.emit("gimmeInfo")});
           document.getElementById("bypassButton").addEventListener('click', ()=>{socket.emit('bypass')});
           //$("#store-icon-holder")[0].onclick = ()=>{console.log("DUMBASS WTF ARE YOU DOING")};

           //document.getElementById("testTime").onclick = () => {console.log("test time!!")};
           //$("#testTime")[0].onclick = () => {console.log("test time!!")};
            //addAllConstantListeners();
            //enterName();
            menuLogicSetup();
            //better earlier than later
            initState();
            //setupCanvas(); 
            //updateCanvas();
            //draw();
            socket.on('returnInfo', info => {
                //console.log("U P D A T E");
               /* console.log("received info. now logging player info:");
                console.log(info.playerObj.unique_id);
                console.log("should have logged^");*/
                 processGameUpdate(info)});
            socket.on('refillButtons', fillButtons);
            socket.on('error', (type, roomname) => {handleErrors(type, roomname); console.log(type + " is what was returned.")});
            socket.on('menuComplete', menuComplete);
            socket.on('agentSelectComplete', agentSelectComplete);
            socket.on('gameTime', configGame);
        }) 
        resolve()});
}


export function emitKey(key){
    socket.emit('emitKey', key);
}

export function emitCreateValidation(validateObj){
    socket.emit('createValidate', validateObj);
}
export function emitJoinValidation(validateObj){
    socket.emit('joinValidate', validateObj);
}

export function classSelect(selectedClass){
    socket.emit('classSelect', selectedClass);
}

export function mouseInput(x, y, canvasX, canvasY, type){
    let obj = {x, y, canvasX, canvasY, type}
    socket.emit('mouseInput', obj);
}

export function keyInput(key, type){
    let obj = {key, type}
    socket.emit('keyInput', obj);
}


function configGame(){
    startCapturingInput();
    draw();
}