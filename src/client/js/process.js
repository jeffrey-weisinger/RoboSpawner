//import { forEach } from "lodash";

import { consoleLogTester } from "./menuLogic";
let infoArr = [];
/*
export function updateFromServer(info){
    //console.log("woof");
    //console.log(info);
    infoArr.push(info); //most recent at end.
    //console.log(infoArr);
}*/
const gameUpdates = [];
let gameStart = 0;
let firstServerTimestamp = 0;
let RENDER_DELAY = 100; 

document.serverTime
 
export function initState() {
    gameStart = 0;
    firstServerTimestamp = 0;
  }
export function getUpdate(){
    //console.log(infoArr);
    //console.log(infoArr[infoArr.length-1]);
    return infoArr[infoArr.length-1];
}
// we're going to implement linear interpolation here.


export function processGameUpdate(update) {
   // console.log("processing game update...");
    //console.log("*");
    //console.log(update.playerObj.x);
    //console.log("**"); 
    /*console.log("THIS IS THE UPDATE"); 
    console.log(update);*/
  //  console.log("processing update!");
    //console.log(update.playerObj.x);  

    if(!update.playerObj.unique_id){
     // console.log("NO Player UNIQUE ID"); 
    }
  
    if (!firstServerTimestamp) {
      firstServerTimestamp = update.t;
      gameStart = Date.now();
    }
    gameUpdates.push(update);
  
    //updateLeaderboard(update.leaderboard);
  
    // Keep only one game update before the current server time
    const base = getBaseUpdate();
    if (base > 0) {
      gameUpdates.splice(0, base);
    }
  }
  
function currentServerTime() {
  
    //we're getting the server time in our time.
    return firstServerTimestamp + (Date.now() - gameStart) - RENDER_DELAY;
}

export function getCurrentState() {
   


    if (!firstServerTimestamp) {
      //console.log("NO UPDATE");
      return {};
    }
    const base = getBaseUpdate();
    const serverTime = currentServerTime();

//Find a way to store all the updates -- then, at each call, find the most recent update that is at least 100 ms behind the server time. 
//if this is the most recent update OR this is the only update we have, then just use the most recent update.
//otherwise, use the most recent AND this update, and then you're good!

 
    if (base < 0 || base === gameUpdates.length - 1) {
      //console.log("returning an old base.");
      //console.log(gameUpdates[gameUpdates.length - 1].playerObj.x);
      //console.log("OLD UPDATE");

      return gameUpdates[gameUpdates.length - 1];
    } else {
      const baseUpdate = gameUpdates[base];
      const next = gameUpdates[base + 1]; 
      const ratio = (serverTime - baseUpdate.t) / (next.t - baseUpdate.t);
     /* console.log("PASSS--------------------------------------------");
      console.log(baseUpdate);  
      console.log(next);*/ 
      //console.log(gameUpdates); 
     /* console.log("Response to a Request: ")
      console.log(next.playerObj);
      console.log("unique ids of playerObj: " + next.playerObj.unique_id);
      console.log("Right before the interpolate object: ")*/
      /*next.othersArr.forEach(being=>{
          console.log("being unique id: " + being.unique_id);
      });*/
     // console.log("first, prev (baseUpdate):");

      if (baseUpdate.othersArr){
        baseUpdate.othersArr.forEach(being=>{
       //   console.log("For the being with the unique id: " + being.unique_id + ", the x and y values are: " + being.x + ", " + being.y);
        })
      }else{
       // console.log("there's no beings info....");
      }

      //console.log("second, next:");

      if (next.othersArr){
        next.othersArr.forEach(being=>{
        //  console.log("For the being with the unique id: " + being.unique_id + ", the x and y values are: " + being.x + ", " + being.y);
        })
      }else{
      //  console.log("there's no beings info....");
      }
     
      let returnObj = {
        playerObj: interpolateObject(baseUpdate.playerObj, next.playerObj, ratio),
        othersArr: interpolateObjectArray(baseUpdate.othersArr, next.othersArr, ratio),
      };

     // console.log("we just finished interpolate object. time to get some information on the beings:")
      if (returnObj.othersArr){
        returnObj.othersArr.forEach(being=>{
         // console.log("For the being with the unique id: " + being.unique_id + ", the x and y values are: " + being.x + ", " + being.y);
        })
      }else{
        //console.log("there's no beings info....");
      }
     /* 
      if (returnObj.playerObj){
        console.log(returnObj.playerObj.x + "<-");
      }else{
        console.log("x doesn't even exist here");
      }*/
      //console.log("WTf?");
      //console.log(returnObj);
      //console.log("x before return: " + returnObj.playerObj.x);
      return returnObj;
    }
  }
  
  
function getBaseUpdate() {
    const serverTime = currentServerTime();
    for (let i = gameUpdates.length - 1; i >= 0; i--) {
      if (gameUpdates[i].t <= serverTime) {
        return i;
      }
    }
    return -1;
}


function interpolateObject(prevObj, nextObj, timeRatio){
    let returnObj = {};



    //note how we're only interpolating these 3 objects. stuff like hp or esp. dmg does not get interpolated.
    //we should also pass back height so we know exactly where to place the health bars.. or maybe we can do it by robo-type?
    returnObj.x = prevObj.x + (nextObj.x - prevObj.x)*timeRatio;
    returnObj.y = prevObj.y + (nextObj.y - prevObj.y)*timeRatio;
    returnObj.type = nextObj.type;
    returnObj.unique_id = nextObj.unique_id;

    //all objects have some sort of rotation. for gear and projectile, it's always 0. maybe we could remove them? i'm just keeping it but it could be extra, unnecessary info.
      returnObj.rotation = interpolateDirection(prevObj.rotation, nextObj.rotation, timeRatio);

      //console.log(returnObj.x);
      if (prevObj.type != "gear" && prevObj.type != "chip" && prevObj.type != "tree" ){  //honestly, this doesn't really do anything because they'll just be undefined otherwise, which isn't an issue. 
     //   returnObj.unique_id = nextObj.unique_id;
        returnObj.dmg = nextObj.dmg;
        returnObj.hp = nextObj.hp;
        returnObj.animation = nextObj.animation;
  
      }
      returnObj.model = nextObj.model; //sort of like i said above, this won't happen in gear/player, but whatever.

     // returnObj.type = nextObj.type;
      

    if (prevObj.type == 'robot' || prevObj.type == 'projectile'){
      /*console.log("we got a robot");
      console.log("prevX" + prevObj.x);
      console.log("nextX" + nextObj.x);*/
      returnObj.side = nextObj.side;
    }  
    if (prevObj.type == "projectile"){
      returnObj.z = nextObj.z ;
      returnObj.projSize = nextObj.projSize;
    }

   
    return returnObj;
    //return(nextObj);
   // console.log("AFTER CHANGES");
    /*if (nextObj.type == 'player'){
        console.log(nextObj.x);
    }*/
}

function interpolateObjectArray(prevObjArr, nextObjArr, timeRatio){
    /*for (let i = 0; i < prevObjArr.length; i++){
        nextObjArr[i] = interpolateObject(prevObjArr[i], nextObjArr[i], timeRatio);
    }*/
    let newNextObjArr = [];
    nextObjArr.forEach(nextObj=>{
        let unique_id_next =  nextObj.unique_id;
        let matchingPrevObj = prevObjArr.find(prevObj => prevObj.unique_id === unique_id_next);
        if (matchingPrevObj){
            newNextObjArr.push(interpolateObject(matchingPrevObj, nextObj, timeRatio));
        }

    });
    return newNextObjArr;
    //console.log(newNext)
}


function interpolateDirection(d1, d2, ratio) {
    const absD = Math.abs(d2 - d1);
    if (absD >= Math.PI) {
      // The angle between the directions is large - we should rotate the other way
      if (d1 > d2) {
        return d1 + (d2 + 2 * Math.PI - d1) * ratio;
      } else {
        return d1 - (d2 - 2 * Math.PI - d1) * ratio;
      }
    } else {
      // Normal interp
      return d1 + (d2 - d1) * ratio;
    }
  }