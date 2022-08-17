//import {drawGUI} from './drawGUI';
import {getCurrentState} from './process.js';
import {drawBeings} from './drawBeings.js';
//import {animate} from './drawBeings4.js'
//import {test} from './asyncTesting.js';
let num = 1 ;

export async function draw(){   
    //if (num )
    let update = getCurrentState();
   // console.log("state gotten");
    if (update.playerObj && update.othersArr){
        //console.log(update.playerObj.x);
       /* console.log("logging player rotation")
        console.log(update.playerObj.rotation);*/
       // console.log(update.othersArr);
        update.othersArr.forEach(being=>{
           // console.log(being.x);
           /* console.log("logging others rotation");
            console.log(being.rotation);*/
        })
      //  console.log("^being");
    }else{
       // console.log("no playerObj.")
    }
    //console.log(update); 
    //console.log(update);
    if (Object.keys(update).length > 0 && update.playerObj && update.othersArr ){ //if there's anything at all there... 
       /* console.log("IN ");
        console.log("============================================");
        console.log("============================================");
        console.log("============================================");

        console.log("THIS is the update:");

        console.log()
        console.log(update);*/
        num++;
        //console.log
        //console.log(update);
        //console.log("***");
        //console.log("new info");
        //console.log(update);
        await drawBeings(update.playerObj, update.othersArr); //2 json objects
       /* console.log("THIS. should be the point where we finish drawBeings");
            s
        console.log(update);
        console.log(num);*/
        num++;
        //console.log("--------------");
        //test();
        //test();
        
        ///setupBasic();
        //setTimeout(20000, draw());
        requestAnimationFrame(draw);
    }else{
        //console.log("NOT IN");
        //it does this until render.
        requestAnimationFrame(draw); 
    }
   //test();
    //drawGUI(update[2]); //1 json object.

    if (num == 0){

    }

}