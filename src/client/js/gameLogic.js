import $ from "jquery";
import projStoreIcon from '../../assets/icons/myProjStoreIcon.png';
import projOrbInvIcon from '../../assets/icons/myCroppedOrbIcon.png';
import projRoboInvIcon from '../../assets/icons/myRoboInventoryIcon.png';
import gearImg from '../../assets/icons/projCroppedGears.png'
import lightningBolt from '../../assets/icons/projCroppedLightningBolt.png';

import {buyRobot} from './network.js'

import robo1Mug from '../../assets/icons/robo1Mug.png';
import robo2Mug from '../../assets/icons/robo2Mug.png';
import robo3Mug from '../../assets/icons/robo3Mug.png';
import robo4Mug from '../../assets/icons/robo4Mug.png';
import robo5Mug from '../../assets/icons/robo5Mug.png';


import dmgImg from '../../assets/icons/dmg.png';
import hpImg from '../../assets/icons/hp.png';
import atkSpeedImg from '../../assets/icons/atkSpeed.png';
import speedImg from '../../assets/icons/speedFlipped.png';
import rangeImg from '../../assets/icons/range.png';
import aoeImg from '../../assets/icons/aoe.png'

import chip1Img from '../../assets/icons/chip1ImgClipped.png'
import chip2Img from '../../assets/icons/chip2ImgClipped.png'
import chip3Img from '../../assets/icons/chip3ImgClipped.png'
import chip4Img from '../../assets/icons/chip4ImgClipped.png'
import chip5Img from '../../assets/icons/chip5ImgClipped.png'
import chip6Img from '../../assets/icons/chip6ImgClipped.png'
import chip7Img from '../../assets/icons/chip7ImgClipped.png'
import chip8Img from '../../assets/icons/chip8ImgClipped.png'
import chip9Img from '../../assets/icons/chip9ImgClipped.png'
import chip10Img from '../../assets/icons/chip10ImgClipped.png'
import chip11Img from '../../assets/icons/chip11ImgClipped.png'
import chip12Img from '../../assets/icons/chip12ImgClipped.png'


let gears = 0;


import { consoleLogTester } from "./menuLogic";
import { DiscreteInterpolant } from "three";
import { BufferGeometry } from "three";
import _ from "lodash";

let currentExpanded;
let store = $("#store");
let inventory = $("#robosInv");


let energy;
let invBubble;
let invBubbleCounter;
let chipsBubble;
let chipsBubbleCounter;
export function gameSetup(){
    $("#store-icon-holder")[0].addEventListener('click', () => {console.log("test1");});
    iconSetup();

    initializeStore();
    guiSetup();
    updateGears(gears);//just so we can initialize w/ any value. 
    invBubble = $('<div><span></span></div>').addClass("inventoryBubble")
    invBubbleCounter = 0;
    updateInventoryBubble(0);
    $("#robosInv-icon-holder").append(invBubble);
    chipsBubble = $('<div><span></span></div>').addClass("chipsBubble");

}
function iconSetup(){
    //first we're actually going to just insert..
    console.log("helo!");
    $("#testButton")[0].onclick = () => {console.log("woohoo");}
   // $("#testTime")[0].onclick = () => {console.log("test time!!")};
    //$("#store-icon-holder")[0].onclick = () => {console.log("test time!!")};

    console.log("helo! + " + $("#store-icon-holder")[0]);
    console.log($("#store-icon-holder")[0]);
    //$("#store-icon-holder")[0].addEventListener('click', () => {console.log("ONG (and for eraal)")});
    $("#store-icon-holder").prepend(`<img src = ${projStoreIcon} width=35 height=35>`)
    $("#chipsInv-icon-holder").prepend(`<img src = ${projOrbInvIcon} width=35 height=35>`)
    $("#robosInv-icon-holder").prepend(`<img src = ${projRoboInvIcon} width=35 height=35>`)


    console.log("in icons.");
    let icons = $("#game .icon")
    console.log(icons);

    let expandAnimation;
    let shrunkAnimation;
    console.log("**");
    console.log(document.styleSheets);
    console.log(document.styleSheets[0].cssRules);

    for (const rule of document.styleSheets[0].cssRules){
        console.log(rule);
        if (rule.name == 'expandAnimation'){
            expandAnimation = rule; /* test to see if we could directly put the cssText here*/
        }else if (rule.name == 'shrunkAnimation'){
            shrunkAnimation = rule;
        }
    }

    
    console.log("***");
    console.log(expandAnimation);
    console.log(shrunkAnimation);
    let showcaseRefClass;
    let currentShowcaseJQuery;

    //at the very beginning, when the website comes up, we should have everything in the showcase hidden!
    $('.showcase').hide();

    $.each(icons, function(index, val) {
       // val.classList('')
       console.log(val.id);
       let valJquery = $("#" + val.id);
       valJquery.attr("isExpanded", false);
       console.log(valJquery);
       console.log('!!');
       valJquery.css("color: purple");
       let isExpanded = valJquery.attr("isExpanded");


       valJquery.on('click', e=> { 
            //console.log("!!!.")
            //console.log(e);
             //this is just for us to check.

             //if we've expanded and it's the robo, then we're going to eliminate the button.
            if(valJquery[0].id == 'robosInv-icon-holder'){
                updateInventoryBubble(invBubbleCounter*-1);//effectively making it 0.
            }

             //this is the valJquery, basically
            let clickObj = e.currentTarget; //tinker about whether valJquery as a variable works.
            let clickObjJQuery = $("#" + clickObj.id);
            console.log(clickObjJQuery.css('max-width'));
            console.log(clickObjJQuery.css('min-width'));

            //this will change every time!
            console.log(expandAnimation);
            console.log(expandAnimation[1].style.cssText);
            expandAnimation[1].style.width = clickObjJQuery.css('max-width');//"90px"; //.replace("100%", expandAnimation[1].cssText.substring(0, 8) + "90px;");
            shrunkAnimation[0].style.width = clickObjJQuery.css('max-width');// expandAnimation[1].style.width = clickObjJQuery.css('max-width');
            console.log(expandAnimation[1].style.width);
            console.log("^^^");
            //console.log(clickObjJQuery.css());
            console.log(clickObj);
            console.log("click obj isExpanded: " + clickObjJQuery.attr("isExpanded"));
            if(clickObjJQuery.attr("isExpanded") === 'true'){
                console.log("it's already expanded");
                clickObjJQuery.attr("isExpanded", false); //make it unexpanded
                clickObjJQuery.addClass("shrunk");
                clickObjJQuery.removeClass("expanded");
                currentExpanded.css({"background-color": "#adadad"});

                currentExpanded = null;
                isExpanded = false;

                //now make sure to change the showcase:
                //it definitely does exist.


                //note that we never need to change the currentShowcaseJQuery's color.
                currentShowcaseJQuery
                console.log(currentShowcaseJQuery);
                currentShowcaseJQuery.hide();
                currentShowcaseJQuery = null;
                //we should also do a closing animation here.

                console.log("should be classes^");
                // /clickObjJQuery.show();

                //we're effectively making total classes 0. so, we should say: 
                //(we'll just do a for loop to make things easy.)
                $('.icon').each((i, obj)=>{
                    $("#" + obj.id).css({"border-bottom": '1px solid black'}); //there's no showcase, so might as well keep the border.
                });
            }else{
                console.log("it's not expanded");
                clickObjJQuery.attr("isExpanded", true); //make it expanded.
                console.log(clickObjJQuery);
                console.log(clickObj);
                clickObjJQuery.addClass("expanded"); //this is what actually expands it.
                clickObjJQuery.removeClass("shrunk"); 
                //this means that something else could have been expanded. let's shrink it. 
                if (currentExpanded){
                    //this is for the old current expanded
                    currentExpanded.attr("isExpanded", false);
                    currentExpanded.removeClass("expanded");
                    currentExpanded.addClass("shrunk");
                    //make the old current expanded grey.
                    currentExpanded.css({"background-color": "#adadad"});
                    //currentExpanded = val;
                }

                currentExpanded = clickObjJQuery; //this is the currently expanded icon. (newly)
                currentExpanded.css({"background-color": "#bf974d"});
                isExpanded = true;

                if (currentShowcaseJQuery){ //it might not exist. this is for when it does.
                    console.log(currentShowcaseJQuery);
                    currentShowcaseJQuery.hide();
                }else{ //this is for when it doesn't exist. let's do an opening up animation.

                }
                
                showcaseRefClass = clickObjJQuery.attr("class").split(' ')[1]; //assuming it's 0-indexed. //this is just to get the currentShowcaseJQuery.
               // console.log($("." + showcaseRefClass));
               currentShowcaseJQuery = $("#" + $("." + showcaseRefClass)[1].id)//.show();
               currentShowcaseJQuery.show();
               // console.log($("." + showcaseRefClass)[1]);

               $('.icon').each((i, obj)=>{
                 $("#" + obj.id).css({"border-bottom": '0px'}); //there is a showcase, so might as well get rid of the border.
                });

            }
       })
    })
}

//this is basically all manual setup :(
let storeArr;
function initializeStore(){
    let div1 = getDiv("1", 2);
    let div2 = getDiv("2", 3);
    let div3 = getDiv("3", 4);
    let div4 = getDiv("4", 3);
    let div5 = getDiv("5", 5);
    storeArr = [div1, div2, div3, div4, div5];

    //we're going to hook up to the buy functionality on-click.
    storeArr.forEach(div=>{
        let button = div.children('.buyButton');
        console.log(button[0].classList[1]);
        //console.log(button[0].classList[1]);//already in string form
        //console.log("GNAGNAOGNAPG");
        button.on('click', () => buyRobot(button[0].classList[1])); //passing model num. they already have gears.
        //button.on('click', buyConfirmation(button.parent.children('unitImgHolder').id);//parseInt(button.children('span').html())

        //also, we should append it to the store
        store.append(div);
    })
    updateStore();
    //updateGears();

}


/*
A function that will take the gears and use it to update the store.
*/
export function updateGears(newGearCount){
    console.log("Do we even get in here??");
    gears = newGearCount;
    console.log(gears + "<- new gear count");
    $("#gears span").html(gears); //getting gear gui (in resources), then taking+altering its span element.
    console.log($("#gears span").html())
    console.log("   we'll see")
    updateStore();

}
 
/*
A function that updates the store as need be using the newly updated gears.
(Specifically, the icons of the robots).
 
*/
function updateStore(){


    storeArr.forEach(div => {
        let roboGears = div.find('.roboGears');
        let divImg = div.find('.unitImg');
        console.log(div);
        console.log(roboGears.html());
        console.log(divImg);
        console.log(")))")

        if (parseInt(roboGears.html()) > gears){ //total gears, aka we can't afford it.
            console.log("HERE1")
            console.log(parseInt(roboGears.html()));
            divImg.css({"opacity": "0.4", "filter":"alpha(opacity=40)"}) //stacky overflow https://stackoverflow.com/questions/286275/gray-out-image-with-css
            roboGears.css('color', 'red');
        }else{ //greater than or equal to 
            console.log("HERE2")
            console.log(parseInt(roboGears.html()));

            divImg.css({"opacity": "1", "filter":"alpha(opacity=100)"})
            roboGears.css('color', 'black');

        }
    })
    //getDiv2();

    /*let arr = [div1, div2, div3, div4, div5];
    arr.forEach(div => {
        div.append($("<button>Buy</button>").addClass("buyButton"));
    });*/


}



export function guiSetup(){
    $("#gears").append(`<img src = ${gearImg} width=90 height=80>`).append('<span>0</span>');
    $("#energy").append(`<img src = ${lightningBolt} width=42 height=70>`).append('<span>0</span>');;

}


function getDiv(model, cost){
    let dmg;
    let hp;
    let speed;
    let atkSpd;
    let range;
    let aoe;
    let title;
    let roboImg;

    

    switch(model){
        case "1":
            dmg = 5;
            hp = 25;

            speed = 3;
            atkSpd = 2;
            range = 1;
            aoe = 1;

            title = $("<div>Fighter Bot</div>")
            roboImg = robo1Mug;
            console.log("IN 1");


        break;

        case "2":
            dmg = 3;
            hp = 20;

            speed = 2.5;
            atkSpd = 1;
            range = 2;
            aoe = 1;

            title = $("<div>Archer Bot</div>");
            roboImg = robo2Mug;


        break;

        case "3":
            dmg = 2;
            hp = 15;

            speed = 1.5;
            atkSpd = 1;
            range = 2;
            aoe = 2;

            title = $("<div>Sniper Bot</div>");
            roboImg = robo3Mug;


        break;

        case "4":
            dmg = 2;
            hp = 40;

            speed = 2;
            atkSpd = 2;
            range = 1;
            aoe = 1;

            title = $("<div>Executioner Bot</div>");
            roboImg = robo4Mug;


        break;

        case "5":
            dmg = 5;
            hp = 20;

            speed = 3;
            atkSpd = 1;
            range = 2;
            aoe = 2;

            title = $("<div>Enhancer Bot</div>");
            roboImg = robo5Mug;

        break;
    }


    let roboUnit1 = $("<div></div>").addClass(`roboUnit ${model}`);
    console.log("MODEL");
    console.log(`${model}`);
    console.log("COST");
    console.log(`${cost}`);
    console.log("ROBOIMG");
    console.log(roboImg);

    let img = $(`<img src=${roboImg} id="roboImage${model}" width=50 height=50 ></img>`).addClass("unitImg");
    //disables NORMAL drag.
    img.on('dragstart', e=>e.preventDefault()); //courtesy of stackOverflow https://stackoverflow.com/questions/4211909/disable-dragging-an-image-from-an-html-page
    roboUnit1.append($("<div></div>").addClass("unitImgHolder").append(img));//.css('object-fit','fill'));
    //let infoHolder1 = $("<div></div>").addClass("roboI");
    let roboInfoDiv = $("<div></div>").addClass("unitInfo");
    roboInfoDiv.append($(`<img src=${dmgImg} width=20 height=20></img>`).addClass("img1"))
    roboInfoDiv.append($(`<div>${dmg}</div>`).addClass("text text1"));
    roboInfoDiv.append($(`<img src=${hpImg} width=20 height=20></img>`).addClass("img2"));
    roboInfoDiv.append($(`<div>${hp}</div>`).addClass("text text2"));
    roboInfoDiv.append($(`<img src=${speedImg} width=20 height=20></img>`).addClass("img3"));
    roboInfoDiv.append($(`<div>${speed}</div>`).addClass("text text3"));
    roboInfoDiv.append($(`<img src=${atkSpeedImg} width=20 height=20></img>`).addClass("img4"));
    roboInfoDiv.append($(`<div>${atkSpd}</div>`).addClass("text text4"));
    roboInfoDiv.append($(`<img src=${rangeImg} width=20 height=20></img>`).addClass("img5"));
    roboInfoDiv.append($(`<div>${range}</div>`).addClass("text text5"));
    roboInfoDiv.append($(`<img src=${aoeImg} width=20 height=20></img>`).addClass("img6"));
    roboInfoDiv.append($(`<div>${aoe}</div>`).addClass("text text6"));
    roboUnit1.append(roboInfoDiv);
   // let title = $("<div>Archer Bot</div>").addClass("title");
   title = title.addClass("title")
    roboUnit1.append(title);
    if (cost >= 0){ //i think i can do this with model..
        roboUnit1.append($(`<button>Buy For <span class="roboGears">${cost}</span> <img src=${gearImg} class=gearCost></img></button>`).addClass(`buyButton ${model.toString()}`)); //can i add two????
    }

   // store.append(roboUnit1);


    return roboUnit1;

}


export function addToInventory(returnObj){
    console.log("WE BACK");
    let {uuid, model, playerGears}  = returnObj;
    updateGears(playerGears);
    let div = getDiv(model, -1); //-1 bc we're not putting it in the store anymore.
    div[0].id = uuid; //this should go to the roboUnit. alternatively we could use attr..
    inventory.append(div);//this is VERY important. it identifies it when dragging, and on the server.

    updateInventoryBubble(1);
}


function updateInventoryBubble(update){
    
    invBubbleCounter += update
    if (invBubbleCounter == -1){
        invBubbleCounter = 0;
    }else if (invBubbleCounter == 0){
        invBubble.hide();
    }else if(invBubbleCounter == 1){
        invBubble.show();
    }
    //if more than 1, then we've already shown.

    //most efficient if we just update span either way. 
    invBubble.children('span').html(invBubbleCounter); 
}


export function updateActiveRobos(div){


    let roboUI = $("#roboUI");

    let upperHolder = ($("<div></div>").addClass("upperActiveRoboHolder"))
    let holder = ($("<div></div>").addClass("activeRoboHolder"))
    holder.append(div);
    upperHolder.prepend($("<button>Select</button>").addClass("roboSelect"))
    let extras = $("<div></div>").addClass("extras")
    extras.append($("<div></div>").addClass("chipHolder"));
    extras.append($("<button></button>").addClass("superButton"));
    upperHolder.append(holder.append(extras));
    roboUI.append(upperHolder);
    $("#" + div.id).css({"margin-top" : "0px", "margin-right": "0px", "margin-bottom": '0px'});
    //holder.css("margin-right", "13px");
    console.log(div.id);
    
/*
    if( roboUI.children().length == 1) {    //meaning this is the first addition
    }
    just added flex!
    */
}

export function updateChipsIntoInv(obj){
    let {model, uuid} = obj
    let chipImg;
    let chipTitle = "Default Chip Title";
    switch(model){
        case "1":
            chipImg = chip1Img;
            chipTitle = "Chip of Damage"
            break;
        case "2":
            chipImg = chip2Img;
            break;
        case "3":
            chipImg = chip3Img;
            break;
        case "4":
            chipImg = chip4Img;
            break;
        case "5":
            chipTitle = "Shield Chip"
            chipImg = chip5Img;
            break;
        case "6":
            chipImg = chip6Img;
            break;
        case "7":
            chipImg = chip7Img;
            break;
        case "8":
            chipImg = chip8Img;
            break;
        case "9":
            chipImg = chip9Img;
            break;
        case "10":
            chipImg = chip10Img;
            chipTitle = "Dragon Chip"
            break;
        case "11":
            chipImg = chip11Img;
            break;
        case "12":
            chipImg = chip12Img;
            break;

    }
    let chipDiv = $(`<div id=${uuid}></div>`).addClass("chipDiv");
    let chipImgDiv = $(`<div></div>`).addClass("chipImgDiv");
    let chipImgjQuery = $(`<img src=${chipImg}></img>`).addClass("chipImg")
    chipImgjQuery.on('dragstart', e=>e.preventDefault());
    chipDiv.append(chipImgDiv.append(chipImgjQuery));
    chipDiv.prepend($(`<div>${chipTitle}</div>`).addClass('chipTitle'));
    $("#chipsInv").append(chipDiv);
}