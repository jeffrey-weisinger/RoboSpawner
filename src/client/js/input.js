import {mouseInput, keyInput} from './network.js';
import $ from "jquery";


export function startCapturingInput(){
    window.addEventListener('keydown', callKeyInput);
    window.addEventListener('keyup', callKeyInput);
    window.addEventListener('mousemove', callMouseInput);    
    window.addEventListener('mousedown', callMouseInput);
}
function callKeyInput(e){
   // console.log(e.type);
    let type;
    if (e.type == 'keydown'){
        type = 'down';
    }else if (e.type == 'keyup'){
        type = 'up';
    }
    let key = e.key;
    keyInput(key, type);
}

function callMouseInput(e){
    //console.log(e);   s
    //mouseInput();
    let type;
    if (e.type == 'mousedown'){
        type = 'down';
    }else if (e.type == 'mousemove'){
        type = 'move';
    }
    //console.log(type); 

    let x = e.clientX;
    let y = e.clientY;

    let canvasWidth = ($("canvas")[1].style.width)
    canvasWidth = (canvasWidth.substring(0, canvasWidth.length - 2)) //+ 8;
    let canvasHeight = ($("canvas")[1].style.height)//.substring(0, canvasHeight.length - 2)
    canvasHeight = (canvasHeight.substring(0, canvasHeight.length - 2))///2;
    //console.log(canvasWidth.);    
    //console.log(canvasHeight); 
    //console.log("AAA");
    //console.log("^^^");
    //console.log(e.clientX + " <- e.clientX");
   // console.log(e.clientY + " <- e.clientY");
  // if ($("canvas")){  
    //console.log("clientussy");  
    //console.log($("canvas"));     
    /*console.log("clientWidth + " + document.documentElement.clientWidth);
    console.log("clientBody + " + document.width());//.clientWidth);
    console.log("clientHeight + " + document.body.clientHeight); 
    ///stack overflow! 
    console.log("clientttt " + ($(window).scrollTop() + $(window).height()/2)); */
   // x = e.clientX + $(document).scrollLeft(); //innerWidth/2 
    //y = y - canvasHeight//innerHeight/2    
   /*
    console.log("client x" + canvasWidth);
    console.log("client y " + canvasHeight);
    console.log("e.clientX" + e.clientX);
    console.log("e.clientY" + e.clientY);*/
    x = e.clientX + $(document).scrollLeft();
    y = e.clientY //+ $(document)//.scrollUp();
    mouseInput(x, y, canvasWidth, canvasHeight, type);  

} 
