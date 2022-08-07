import $ from "jquery";
import projStoreIcon from '../../assets/icons/myProjStoreIcon.png';
import projOrbInvIcon from '../../assets/icons/myCroppedOrbIcon.png';
import projRoboInvIcon from '../../assets/icons/myRoboInventoryIcon.png';
import gearImg from '../../assets/icons/projCroppedGears.png'
import lightningBolt from '../../assets/icons/projCroppedLightningBolt.png';


import { consoleLogTester } from "./menuLogic";

let currentExpanded;

export function gameSetup(){
    $("#store-icon-holder")[0].addEventListener('click', () => {console.log("test1");});
    iconSetup();
    guiSetup();

}

function iconSetup(){
    //first we're actually going to just insert..
    console.log("helo!");
    $("#testButton")[0].onclick = () => {console.log("woohoo");}
    $("#testTime")[0].onclick = () => {console.log("test time!!")};
    //$("#store-icon-holder")[0].onclick = () => {console.log("test time!!")};

    console.log("helo! + " + $("#store-icon-holder")[0]);
    console.log($("#store-icon-holder")[0]);
    //$("#store-icon-holder")[0].addEventListener('click', () => {console.log("ONG (and for eraal)")});
    $("#store-icon-holder").prepend(`<img src = ${projStoreIcon} width=35 height=35>`)
    $("#orbsInv-icon-holder").prepend(`<img src = ${projOrbInvIcon} width=35 height=35>`)
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


export function guiSetup(){
    $("#gears").append(`<img src = ${gearImg} width=90 height=80>`);
    $("#energy").append(`<img src = ${lightningBolt} width=42 height=70>`);

}