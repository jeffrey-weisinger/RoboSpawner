import './../css/style.css';
import $ from "jquery";
import {emitCreateValidation, emitJoinValidation} from "./network.js"
//import { divide } from 'lodash';
//import { emit } from 'nodemon';
import { connect } from './network';
import {gameSetup} from './gameLogic.js';
import _ from 'lodash';
window.$ = $;
const axios = require('axios').default;




export function menuLogicSetup(){
    //$('#game').hide();
    $('#visuals').hide();
    $('#endScreen').hide();
    
    gameSetup(); //i see.
   // zoom(); //for menu.
//window.setInterval(1000, fillButtons);
$("#createRoom")
//gameSetup();

//$("#game").hide();

$("#createButton").on('click', e=>{
    refreshCreate();
    e.preventDefault();
    toggleVisible($("#createRoom")[0]);
});

$("#joinButton").on('click', e=>{
    e.preventDefault();
    toggleVisible($("#joinRoom")[0]);
});

$("#public").on('change', e=>{
    $("#optional").hide();
});
$("#unlisted").on('change', e=>{
    $("#optional").show();
});

$("#createPlay").on('click', createValidate);
//fillButtons();

}

/* From https://stackoverflow.com/questions/27592595/how-can-i-make-my-website-automatically-zoom-out-to-90 */
/*This is godly */  //j wait for the onbody zoom
function zoom() {
    //$(document).ready()
    $("body").on('load', $('body').css(zoom, "120%")) //is there a way to pass in as a param
   //W document.body.style.zoom = "90%" 

} 


//connect();
function toggleVisible(element){
    //console.log(getComputedStyle(element).visibility + "<- visibility");
    //note that getComputedStyle this will get all visibility -- whether we set it (inline) or not.
    //Also note that we pass in the element.
    if (getComputedStyle(element).visibility == 'hidden'){
        element.style.visibility='visible';
    }else{
        element.style.visibility='hidden';
    }
}

function refreshCreate(){
    $("#roomname").val('');
    $("#passcode").val('');
    $("#public").prop('checked', true);
    $("#unlisted").prop('checked', false);
    $("select").val('1'); //i'm so good 
    $("#optional").hide();

}


export function fillButtons(rooms){
    //first, we're going to get the positions of the elements in the button container.
   // $('#buttonContainer').empty(); //we first empty everything.
    console.log("in fillButtons");
    console.log(rooms);
    //console.log(rooms);
    let room_keys = Object.keys(rooms);
    //console.log(room_keys);
    //if (roo) = Object.keys(rooms);
   /* axios.get('http://localhost:4000/room').then(rooms_obj => 
        let rooms = rooms_obj.data
        let room_keys = Object.keys(rooms);

        console.log(rooms);*/
        //if (room_keys.length == 0){//there are no items
   
        if(room_keys.length == 0){//there are no items
        }else{
            room_keys.forEach(room_key => { //there are items!
                let this_room = rooms[room_key];
                if (this_room.access == 'public'){
                    console.log("public");
                    let roomname = this_room.roomname;
                    let roomhost = this_room.username;
                    let roomMaxPlayerCnt = this_room.maxPlayerCount;
                    let roomPlayerCnt = (this_room.currentPlayers).length;
                    let roomPassBool = this_room.isPass;

                    let result = this_room.result;
                    let errorMessage = this_room.errorMessage;

                    /*Possibilities: 
                        1.) A public room was created, with password. It might be full.
                    */
                    if (this_room.type == 'new'){
                        console.log("new");
                        let roomBtn = $(document.createElement('button')).prop({innerHTML: roomname}) 
                        //console.log($("#buttonContainer").children().length == 0);
                      //  if ($("#buttonContainer").children().length == 0) roomBtn.css('border-bottom','1px solid black'); //apparently this is inline css so it takes prio
    
                        $('#buttonContainer').append(roomBtn); //changed to prepend!
                        let popup = $(document.createElement('form'))
                            .append($(document.createElement('a')).prop({innerHTML: "Host: " + roomhost, id: "Host"}),
                                     $(document.createElement('a')).prop({innerHTML: roomPlayerCnt + "/" + roomMaxPlayerCnt + " Players", id: "PlayerCount" }),
                                     $("<br>"),
                                     $("<br id='2ndbr'>")
                                     ) 
                                     if (roomMaxPlayerCnt == roomPlayerCnt){
                                        popup.append(
                                            $(document.createElement('a')).prop({innerHTML: 'Full', id:"Full"})
                                        )
                                    }//now for the cases where you can join.
                                    else if(!roomPassBool){//passcode not required
                                        popup.append(
                                            $(document.createElement('input')).prop({id: "passSubmit", type: "submit", value:"Join!"}).on('click', e => {e.preventDefault(); joinValidate(e);})
                                        )
                                    }else{ //passcode required, this is the norm.
                                        popup.append(
                                            $(document.createElement('label')).prop({id: "passLabel", for:"passInput", innerHTML:"Password:"}).append($(document.createElement('input')).prop({id:"passInput"})),
                                            $(document.createElement('input')).prop({id: "passSubmit", type: "submit", value:"Join!"}).on('click', e => {e.preventDefault(); joinValidate(e);})
                                        )
                                    }
                                    /*if (!roomDisplayShowing){
                                        popup.css('display', 'none'); 
                                    }*/
                                    popup.css('display', 'none')//we always do this at the start! //this can be done because the default is to show.
                                    popup.prop('forRoomname', roomname);
                                    popup.insertAfter(roomBtn);
                                    console.log(popup.prop('display') + "<+_++---");
                                    roomBtn.on('click', ()=>popup.toggle());
            
            
                        let prev = roomBtn.prev()
                        if (prev.length == 0){ //this is basically saying that there's no element before it. 
                            roomBtn.addClass('odd');
                            roomBtn.next().addClass('odd');

                        }else if (prev.hasClass('odd')){
                            roomBtn.addClass('even');
                            roomBtn.next().addClass('even');


                        } else if (prev.hasClass('even')){
                            roomBtn.addClass('odd'); 
                            roomBtn.next().addClass('odd'); 
                        }else{
                            console.log("here!"); 
                            console.log(prev);
                            console.log(prev.length);
                        }
                        //console.log(prev.prev().prop('count') + '<- prev')
                        //console.log(roomBtn.prop('count') + '<- roomBtn');

                        

                        
                    /*Possibilities: 
                    1.) Someone has joined the room. (Increment) --> Extreme case -- room is full, so change it to full.
                    2.) Someone has left the room. (Decrement) --> Extreme case -- no one is in the room, so remove it.
                    */
                    }else if (this_room.type == 'update'){
                        //backToNormal();//making sure everything is gone, if it's updating your own stuff correctly.
                        //if the player is accepted into the game, we're calling the error thing again.
                        /*
                        let popupToUpdate = ($('#buttonContainer').children().filter((index, c)=> $(c).prop('forRoomname')==roomname));
                        backToNormal(popupToUpdate); //getting rid of all red borders, getting rid of all unnecessary text.
                        console.log($(popupToUpdate).children('#passLabel').children('#passInput'));
                        console.log("^^^");*/
                        if (result == 'success') {  
                            if (roomPlayerCnt == roomMaxPlayerCnt){
                                popupToUpdate().$(document.createElement('a')).prop({innerHTML: 'Full', id:"Full"});
                            }
                            //popupToUpdate.children('#PlayerCount').html(roomPlayerCnt + "/" + roomMaxPlayerCnt + " Players");
                     /*   }else if (result == 'infoFail'){
                            if (!$('#playerName').val()){
                                $('#playerName').css('border-color', 'red');//there's only one of these
                            }
                            if (!$(popupToUpdate).children('#passLabel #passInput')){
                                console.log("bet");
                                console.log($(popupToUpdate).children());
                                $(popupToUpdate).children('#passLabel #passInput').css('border-color', 'red').addClass('redBorder');
                            }
                           
                       
                        }else if (result == 'passcodeFail'){
                            $("<br class='errorMessage'>").insertAfter(($(document.createElement('a')).prop({class:'errorMessage', innerHTML:"wrong password, you silly fool"})).insertAfter(popupToUpdate.children("#2ndbr"))); //note that this

                        }

                            
                            } */
                        }

                    }
                };

                }
            )
        };
};

function backToNormal(){
    $('.errorMessage').remove();
    $('.errorBorder').css('border-color', 'black');//there's only one of these
    //$(popupToUpdate).children('#passInput').css('border-color', 'black');//but, there are multiple of these.
}

export function consoleLogTester(){
}
export function handleErrors(type, roomname){
    backToNormal();//first making sure that everything is normal.
    let roomJoinForm = $('#buttonContainer').children('form').filter((index, f)=> {return($(f).prop('forRoomname') == roomname)});
    let roomCreateForm = $('#createRoom');
        //if room taken, then add a message before the room name.
        if (type == 'roomTaken'){//say: The room has already been taken.
        $("<a class='errorMessage'>Roomname taken.</a>").insertBefore(roomCreateForm.children('#roomname').prev());
    //if it's a lack of info when creating, then check username input, if blank, turn red/add message. do this for all the input fields in the create.
    }else if (type == 'infoFailCreate'){ //find all the spots where info isn't entered. Then, make the borders red "This field is required"
        if (!$('#playerName').val()){
            $('#playerName').css('border-color', 'red').addClass('errorBorder'); //adding border color/class, then message. 
            $("<a id=playerWarning class='errorMessage'>The field below is required</a>").insertBefore($('#playerName'));
        }
        roomCreateForm.children('label').each((index, label)=>{
            if (!$(label).next().val()){
                $(label).next().css('border-color', 'red').addClass('errorBorder');
                $("<a class='errorMessage'>The field below is required.</a>").appendTo($(label));
            } 
        });
        //if it's a lack of info when joining, check username input. if it's blank, turn red/add message. same with the password.
    }else if (type == 'infoFailJoin'){
       
        if (!$('#playerName').val()){
            console.log("player name");
            $('#playerName').css('border-color', 'red').addClass('errorBorder'); //adding border color/class, then message. 
            $("<a id=playerWarning class='errorMessage'>The field below is required</a>").insertBefore($('#playerName'));
        }

        if (!roomJoinForm.find('#passInput').val()){
            console.log("pass input");
            console.log((roomJoinForm.find('#passInput')).prev());
            $("<br class='errorMessage'>").insertBefore($("<a class='errorMessage'>The field below is required</a>").insertBefore((roomJoinForm.find('#passInput')).parent().prev()));//find will look at all sublevels. SUPER useful function!
        }

    //if it's the wrong passcode, add an error message.

    }else if (type == 'passcodeFail'){
        $("<br class='errorMessage'>").insertBefore($("<a class='errorMessage'>Incorrect Passcode.</a>").insertBefore(roomJoinForm.find('#passInput').parent().prev()))//find will look at all sublevels. SUPER useful function!
        //roomJoinForm.find('#passInput').css('border-color', 'red').addClass('errorBorder');
    }
}




// function popUp(e){

//     console.log("in popup");
//     let room = e.target.room
//     let roomHTML = e.target;
//     $(roomHTML).off();
//     console.log("wtf??");
//     //roomPopUp.text("yo.");
//     /*    
   
//     //let d = $(document.createElement('a')).text());
//     $(room).append(roomName, "<br>", roomHost, roomPlayerCount, "<br><br>");//,$(document.createElement('a')).text(roomHost), $(document.createElement) );
//     $(room).append("<label for='password'>Password: <input type='text' id='password'></label")
// */
//     //roomPopUp.append("<input type='text'>")
//     //roomPopUp.append("<label for='text' id='roomLabel'>")
//     //let roomName = $(document.createElement('a')).prop({id:'roomBtn', innerHTML:room.roomname});
//     let roomHost = $(document.createElement('a')).prop({id:'roomHost', innerHTML:room.username}); //note that this is different from the "host" that we passed in! it's just the username.
//     let playerGrammar;
//     if (room.playerCount == 1)  playerGrammar = ''; else playerGrammar = 's';
//     let roomPlayerCount = $(document.createElement('a')).prop({id:'roomPlayerCount', innerHTML:room.playerCount + playerGrammar});  
//     let closeButton = $(document.createElement('input')).prop({type: 'button', innerHTML:"back"}).on('click', ()=>{$("#newInfo").hide();})
     
//      on('click', showContentsToggle);//if(e.originalEvent.path[0] == ) });
//     //$(roomHTML).append("<br>", roomHost, roomPlayerCount).append($('<label for="passInput">Password: <input type="text" id="passInput"></label>'))
//     $(roomHTML).append(closeButton);
//     console.log($(roomHTML));
//     $(roomHTML).click(e=> console.log(e));
//     //roomPopUp.insertAfter($(e.target));//insertAfter roombutton
 
// }

function createValidate(e){
    //console.log($(this));
    let a = $("#radio input").filter(function(index){
        return ($(this).prop('checked'))
    })[0].id
    console.log(a);

   // console.log($("#radio").find("checked", "true").val())
    //let access;
    //if($('#public').proYp("checked")) access= "public"; else access= "unlisted";
   console.log($("#radio input").filter(function(index){
    return ($(this).prop('checked'))
})[0].id);
    emitCreateValidation(
    {
        access: ($("#radio input").filter(function(index){
                    return ($(this).prop('checked'))
                }))[0].id,
        username: $("#playerName").val(),
        roomname: $("#roomname").val(),
        passcode: $("#passcode").val(),
        maxPlayerCount: $("select").val()
    });
    //menuFinished();
    console.log('created');
    //fillButtons();
}

function joinValidate(e){
    console.log('joinValidate');
    //let host = $(e.target).parent().children("#Host").html().substring(6);//note that substring is 0-indexed.
    let roomname = $(e.target).parent().prop('forRoomname');
    let username =  $("#playerName").val();
    let joinObj = {
        roomname: roomname,
        username: username,
    } //we're only going to emit a passcode if we created one. 
    //and there will be one IF we need one. 
    let passHolder = $(e.target).parent().children("#passLabel").children("#passInput");
    if (passHolder) Object.assign(joinObj, {passcode: passHolder.val() });
    emitJoinValidation(joinObj);
    //menuFinished();

}
/*
function validateJoin(){

}

function validateSingle(){

}*/

export function menuComplete(){ //called when we're completed -- through a socket connected using network to server.
    backToNormal();
    $("#bypassButton").hide();
    $("#menu").hide();
    $("#game").show();
    /////
    //gameSetup();

}

export function completionButton(){
    
}