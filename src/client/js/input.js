import {mouseMove, keyInput, moveChipToActive, moveChipToInv} from './network.js';
import $ from "jquery";
import {mouseDownCanvas} from './drawBeings.js';
import { some } from 'lodash';

import robo1Full from '../../assets/icons/robo1FullCrop.png';
import robo2Full from '../../assets/icons/robo2FullCrop.png';
import robo3Full from '../../assets/icons/robo3FullCrop.png';
import robo4Full from '../../assets/icons/robo4FullCrop.png';
import robo5Full from '../../assets/icons/robo5FullCrop.png';

import {rayCastForBattleField} from './drawBeings.js';
import { updateActiveRobos } from './gameLogic.js';
import { consoleLogTester } from './menuLogic.js';


let isDragging = false;
let draggingUuid = null;
let startedDragging = false;
let leftAdjust = $('.showcase').css('left');
leftAdjust = leftAdjust.substring(0, leftAdjust.length-2);
let topAdjust = $('.showcase').css('top');
topAdjust = topAdjust.substring(0, topAdjust.length-2);
let leftOffset;
let topOffset;
let model;
let type;
let newSrcImg;
let originalDivs = {};
let chipHolderDiv;
let firstOver360 = true;
let startPlace;
console.log(document.styleSheets[0].cssRules);

let halfRoboHeight;// = $('.roboUnit').css('height');//we can just say this since all the robo units are effectively the same.
let halfRoboWidth;
let halfChipHeight;
let halfChipWidth;
Object.values(document.styleSheets[0].cssRules).forEach(rule => {
    if (rule.selectorText == '.roboUnit'){
        console.log("RULE");
        console.log(rule.style);
        halfRoboHeight = rule.style.height;
        halfRoboHeight = halfRoboHeight.substring(0, halfRoboHeight.length-2)/2

        halfRoboWidth = rule.style.width;
        halfRoboWidth = halfRoboWidth.substring(0, halfRoboWidth.length-2)/2    }
    if (rule.selectorText == '.chipDiv'){
        console.log("RULE");
        console.log(rule.style);
        halfChipHeight = rule.style.height;
        halfChipHeight = halfChipHeight.substring(0, halfChipHeight.length-3)/2*16-39

        halfChipWidth = rule.style.width;
        halfChipWidth = halfChipWidth.substring(0, halfChipWidth.length-3)/2*16-27    }      
})
console.log('halfHeight' + halfChipHeight);
console.log('halfWidth' + halfChipWidth );




let divToMove;


export function startCapturingInput(){
    window.addEventListener('keydown', callKeyInput);
    window.addEventListener('keyup', callKeyInput);
    window.addEventListener('mousemove', handleMouseMove);    
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);


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
/*
function handleMouseInput(e){
    //console.log(e);   
    //mouseInput();
    let type;
    if (e.type == 'mousedown'){
        type = 'down';
        handleMouseClicked(e);
    }else if (e.type == 'mousemove'){
        type = 'move';
        handleMouseMove(e);
    }
    //console.log(type); 

   
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
 
/*
} */

function handleMouseDown(e){ 
    
    console.log(e);
    console.log("in mouse down");
    console.log(e.composedPath());
    let comp = e.composedPath();
    if (comp[0].localName == "canvas"){ //in other words we clicked on something in the scene. this could be a gear. (NOTE that we changed it to canvas from viewport)
        console.log('goin into canvas');
        mouseDownCanvas(e);

    }else {
        comp.forEach(div => {
            console.log("DIV ID ")
            console.log(div.id);
            console.log(div);
            if (div.id == "robosInv" || div.id == "chipsInv"){//it has a jquery element??? weird.
                isDragging = true;
                comp.forEach(div => {
                    console.log(div.classList);
                    if (div.classList){
                        if (div.classList[0] == 'roboUnit'){
                            type = 'robot';
                            draggingUuid = div.id //already string.
                            console.log("draggingUUID in mousedown: " + draggingUuid);
                            model = div.classList[1];
                        }
                        if (div.classList[0] == 'chipDiv'){
                            type = 'chip';
                            startPlace = "inv"
                            draggingUuid = div.id //already string.
                            console.log("draggingUUID in mousedown: " + draggingUuid);
                            //model = div.classList[1]
                        }
                    }

                })
            }else if (div.id == "roboUI"){
                isDragging = true;
                console.log("DD");
                console.log(div);
                comp.forEach(div => {
                    console.log("DIV");
                    console.log(div);
                    console.log(div.classList);
                    if (div.classList &&div.classList[0] == "chipDiv"){
                        type = 'chip';
                        startPlace = "active";
                        draggingUuid = div.id;
                    }
                
                    
                });
            }
        })
    }


}


function handleMouseMove(e){
    console.log("L")
    console.log(draggingUuid)
    if (!isDragging){
        let x = e.clientX;
        let y = e.clientY;
    
        let canvasWidth = ($("canvas")[1].style.width)
        canvasWidth = (canvasWidth.substring(0, canvasWidth.length - 2)) //+ 8;
        let canvasHeight = ($("canvas")[1].style.height)//.substring(0, canvasHeight.length - 2)
        canvasHeight = (canvasHeight.substring(0, canvasHeight.length - 2))///2;
    
        x = e.clientX + $(document).scrollLeft();
        y = e.clientY //+ $(document)//.scrollUp();
        mouseMove(x, y, canvasWidth, canvasHeight, 'move');  
    }else{ //now, we're supposed to be dragging something.. let's reference draggingModel
        //just to be sure, we'll make sure draggingObject exists and also log it. 
        if (draggingUuid){
            if (!startedDragging){           //means this is our first pass-through -- getting all the id-specific things we'll need for moving (and for a possible reposition at the end).
                divToMove = $(`#${draggingUuid}`); //the indexing is important later, as otherwise we'll just get the jquery version. 
                // i'm so fucking smart like DAMN 
                if (type == 'chip')divToMove.css({"pointerEvents": "none"});
                console.log(divToMove.id);
                originalDivs[draggingUuid] = ($(`#${draggingUuid}`)[0]).cloneNode(true);
                //originalLeftPos = 
                let offset = divToMove.offset();

                //remember, these are the OG offsets that we're going to use to calculate.
                leftOffset = offset.left; 
                topOffset = offset.top;
                startedDragging = true;
                //ALL we need to do after this if this doesn't work out is to set it back to static.
            }
                //console.log("DRAGGING UUID");
                //console.log(draggingUuid);
                console.log("DRAGGING");
                console.log(divToMove.id);
                //let  //rememeber, the dollar sign gets variables.
                divToMove.css('position','fixed');
                console.log(leftAdjust);
                console.log(topAdjust);

                console.log(divToMove.offset());
                console.log("WE UP");
                let halfHeight;
                let halfWidth;
                if (type == "robot"){
                    halfHeight = halfRoboHeight;
                    halfWidth = halfRoboWidth
                }else if (type == "chip"){
                    halfHeight = halfChipHeight +85
                    halfWidth = halfChipWidth
                }
                console.log(halfWidth);
                console.log(halfHeight);
                divToMove.css('left', ( -halfWidth + e.clientX) + 'px');
                divToMove.css('top', ( -halfHeight + e.clientY) + 'px'); //splitting jquery css into 2 parts for readability.

                if (e.clientX > 360){
                    console.log('abt to hide');
                    console.log(divToMove.children())
                    let chipImg;
                    console.log(divToMove);
                    console.log(divToMove.find(".chipImg"));
                    if (type == "chip"){
                    }
                    if (!divToMove[0].classList.contains("added")){
                        divToMove.children().hide();
                    }
                        /*each((index, div) => {
                            console.log(div);
                            div.style.visiblity = 'hidden'; //we're going convert it into another robo image, so we can't have previous content existing.
                        })*/
                        console.log('now we add some more stuff here');
                        divToMove.css('background-color', 'transparent'); //aha this is the default value.
                        let fadedId;
                        console.log("type");  
                        console.log(type);  
                        console.log(model);
                        if (type == "robot"){
                            fadedId = `faded${model}`
                            switch(model){
                                case "1":
                                    console.log('why are you not here dumnbesass');
                                    newSrcImg = robo1Full;  
                                    break;
                                case "2":
                                    newSrcImg = robo2Full;
                                    break;
                                case "3":
                                    newSrcImg = robo3Full;
                                    break;
                                case "4":
                                    newSrcImg = robo4Full;
                                    break;
                                case "5":
                                    newSrcImg = robo5Full;
                                    break;
                            }
                        }else if (type == "chip"){
                            console.log("WTF");
                            newSrcImg = divToMove.find(".chipImg")[0].src;
                        }/*
                        console.log("NEW SRC IMG");
                        console.log(newSrcImg);
                        console.log(divToMove);
                        console.log(divToMove.find(".chipImg")[0]);
                        console.log(divToMove.find(".chipImg")[0].src);*/
                       // console.log(newSrcImg);
                        
                        if(!divToMove[0].classList.contains("added")){ //we only want to do this once.
                            let imgToAppendjQuery = $(`<image src=${newSrcImg} id=${fadedId}></image>`).css({'pointerEvents': 'none'});
                            if (type == 'chip') divToMove.css('width', "6rem").addClass("added");
                            console.log("AHHHHHHH");
                            divToMove.append(imgToAppendjQuery);//remember, it's important that this is a variable name here.
                            console.log(divToMove);
                         }else{
                            console.log("WTF???A?");
                        }
                       
                    }
                   
               // }
            

        }
        
    }
 

}

function handleMouseUp(e){
    //let dragDiv = $(`#${uuid}`);
    isDragging = false;
  //  divToMove.css('position', 'static');
    startedDragging = false;
     
    if (draggingUuid){
        console.log("UUPUPP")
        //we need to figure out where it was dropped.
        if (type == "chip"){
            if(e.composedPath()[0].classList[0] == 'chipHolder' && startPlace == 'inv'){
                console.log("MOVING");
                //note: i'm pretty sure that auto pointerevents allow me to click the chipDiv.
                chipHolderDiv = $("#" + e.composedPath()[0].parentElement.parentElement.children[0].id).parent().find(".chipHolder") //we want the specific one.
                moveChipToActive(draggingUuid);
            }else if (e.target.id == 'chipsInv' && startPlace == 'active'){
                moveChipToInv(draggingUuid);
            }
        }
        rayCastForBattleField(e, draggingUuid);
        draggingUuid = null;
        firstOver360 = true;
    }
}

/*
 $("#" + e.composedPath()[0].parentElement.parentElement.children[0].id).parent().find(".chipHolder").append($(`#${draggingUuid}`).css({'pointerEvents': 'auto'}));
                console.log( $("#" + e.composedPath()[0].parentElement.parentElement.children[0].id).parent());
                console.log('^there');
*/

export function resetDiv(uuid){
    //if it doesn't exist in the original divs, we will have a problem... that doesn't seem possible unless we mess something else up, though. 
    //so, perhaps it's safe to say that we are going to disregard such a case.
    $(`#${uuid}`)[0] = originalDivs[uuid]
}

export function removeDiv(uuid){
    console.log("REMOVE DIV");
    console.log(uuid);
    console.log(`#${uuid}`);
    console.log($(`#${uuid}`));
    let divToRemove =  $(`#${uuid}`);
    divToRemove.remove();
   // $(`#${uuid}`).remove();
    //now we add it to the activeRobos
    //restoration.
    let ogDiv = originalDivs[uuid]

    updateActiveRobos(ogDiv); //passing the div that we deleted.
}

export function chipMovedActiveResult(uuid){
    console.log("GETTING REALLY CHIPPY");
    //$("#" + e.composedPath()[0].parentElement.parentElement.children[0].id)
    chipHolderDiv.append($(`#${uuid}`).css({'pointerEvents': 'auto', 'position': 'static', "margin": '0px', 'width': '6rem', 'height': 'auto', 'zoom': '80%'}));
    //chipHolderDiv.find('.chipImgDiv').show();
    console.log(uuid);
    console.log($(`#${uuid}`));
    console.log(chipHolderDiv);
    //chipHolderDiv = null;
}


export function chipMovedInvResult(uuid){
    let divToShow =  $("#"+uuid).children().show()
    divToShow.children().hide();
    divToShow.css( 'width', '9.775rem');
    $("#chipsInv").append(divToShow);
}