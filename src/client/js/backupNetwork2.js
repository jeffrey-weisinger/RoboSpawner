
/*
let userName;
let userNameForm = document.querySelector("form.userName");
let userNameSubmitButton = document.querySelector("button.userName");
let backToUserName = document.getElementById("backToUserName");


let modeArray =  document.querySelectorAll(".mode")
let backToMode =document.getElementById("backToMode");

let multiType;
let multiTypeArray = document.querySelectorAll(".multiType");
let backToMulti = document.getElementById("backToMulti");

let playerCount;
let roomType;
let roomName;
let password;
let roomName_form = document.getElementById('roomName_form')
let password_join = document.getElementById('password_join');
let password_create = document.getElementById('password_create');
let joinMenu = document.getElementById("joinMenu");
let createMenu = document.getElementById("createMenu");
let roomButtons = document.getElementById('roomButtons')
let result;



let gameTypeClassArray = document.querySelectorAll(".playerClass")
let enterPass = document.getElementById('enter-multi-pass');
let playerCountDiv = document.getElementById('playerCount');
//these are the listeners that never change.
function addAllConstantListeners(){
    userNameSubmitButton.addEventListener('click', enterNameHandler);
    modeArray.forEach(m => {
        m.addEventListener('click', selectModeHandler);
    });
    multiTypeArray.forEach(m => {
        m.addEventListener('click', selectChoiceHandler)
    });
    joinSubmit.addEventListener('click', menuHandler);
    createSubmit.addEventListener('click', menuHandler);

    backToUserName.addEventListener('click', selectModeHandler)//if going back to username, we're in mode.
    backToMode.addEventListener('click', selectChoiceHandler);//if going back to mode, we're in choice
    backToMulti.addEventListener('click', menuHandler);//if going back to choice, we're in menu.

    let showingChoices=false;
    let dropDownDiv = document.getElementById('dropDownDiv')
    let dropChoices = document.querySelectorAll('#dropDownDiv .child');
    let startBox = document.getElementById('startBox')
    dropDownDiv.addEventListener('click', () => {
        if (showingChoices){
            dropChoices.forEach(b => {
                b.style.display='none';
            })
            showingChoices=false;
        }else{
            dropChoices.forEach(b => {
                b.style.display='inline';
            })
            showingChoices='true';
        }
    })
    dropChoices.forEach(b => { //this is the array of buttons.
        b.addEventListener('click', e => {startBox.innerHTML = e.target.outerText;});
    });

}

*/
/*Goal: Show input, activate submit button+call handler*/
function enterName(){
    show(userNameForm);
    show(userNameSubmitButton);
}
/*Goal: Hide Username Form, Hide Submit Button, Store username, move onto select mode. */
function enterNameHandler(){
    if (userNameForm.children[0].value){//aka if at least something is there.
        hide(userNameForm);
        hide(userNameSubmitButton);
        userName = userNameForm.children[0].value
        userNameForm.children[0].value = null;
        selectMode();
    }
}
//===
/*Goal: Show modes, show backButton, activate handlers.*/
function selectMode(){
    show(modeArray);
    show(backToUserName);
}
/*Goal: Save mode, hide modes, rid back button handler, go to next. */
function selectModeHandler(e){
    hide(modeArray);
    hide(backToUserName);
    //If we're going back
    if (e.target.outerText === 'Back') {
        enterName();
    //otherwise, store and go to next.
    }else{
        mode=e.target.outerText; //research on target.
        if (mode === 'SinglePlayer') {selectSingleChoice();}
        else if(mode ==='MultiPlayer') {selectMultiChoice();}
    }
}
//===
/*Goal: Show Types, add listeners, change back button */
function selectSingleChoice(){
    //show(multiTypeArray);
    show(backToMode);
};
function selectMultiChoice(){
    show(multiTypeArray);
    show(backToMode);
} 

function selectChoiceHandler(e){
    hide(multiTypeArray); 
    hide(backToMode);

    if (e.target.outerText === 'Back') {
        selectMode();
    }else{
        multiType = e.target.outerText;
        if (multiType === 'Join Room'){
            roomType = 'join'
            joinRoomMenu();
        }else if (multiType === 'Create Room'){
            roomType = 'create'
            createRoomMenu();
        }
    }
}


function joinRoomMenu(){
    show(joinMenu);
    let room_arr;
    let test = document.getElementById('testtest')
    test.addEventListener('click', ()=> console.log("hello"));
    axios.get('http://localhost:4000/room').then(room => {
        room_arr = room.data.room_arr
        room_arr.forEach(room => {
            let roomBtn = document.createElement('button')
            roomBtn.innerHTML = room;
            roomButtons.appendChild(roomBtn);
            roomBtn.addEventListener('click', popUp)
        })
    
    });
    //let room_arr = room.data.room_arr

    show(backToMulti);

}
function popUp(e){
    let div = document.createElement("div")
    let form = document.createElement("form");
    let input = document.createElement("input");
    let button = document.createElement("button")
    let buttonText = document.createTextNode("Text TExt Texttt");

    button.appendChild(buttonText);
    form.appendChild(input);
    div.appendChild(form);
    div.appendChild(button);

    roomButtons.appendChild(div);
    joinMenu.suspendEvents();
   // e.target.outerText
}

function createRoomMenu(){
    show(createMenu);
    show(backToMulti); 
}

function menuHandler(e){ 

    //we're hiding everything, except for the case of when input is invalid.

    if (e.target.outerText === 'Back') {
        //refresh the screen that we're on!
        hide(backToMulti);
        hide(joinMenu);
        hide(createMenu);    
        refreshMenu();
        selectMultiChoice();
    }else{
        if (roomType === 'join') {
            roomName = 'hiasdgad';
            password =  password_join.children[0].value;
            playerCount = 'NA'
        }else {
            roomName = roomName_form.children[0].value  
            password = password_create.children[0].value
            playerCount = startBox.innerText;
        }

        let result 
        let returnStatus;
        axios.post('http://localhost:4000/validation/multi',
        {
            roomType: roomType,
            roomName: roomName,
            password: password,
            playerCount: playerCount,
            userName: userName
            
        }).then(feedback => {
            console.log(feedback);
            result = feedback.data;
            returnStatus = feedback.status;
        });
        console.log(result);
        console.log(returnStatus);

            //if result is bad, also refresh menu. If it's good, then we want to refresh, and hidex all the buttons except for back, as it goes into the game for us.
            refreshMenu();
        }

        //console.log(result.data);
            //if the result is 200, then it's already in the system, and we proceed.
            //else, we will refresh the menu and up password count.
        }
function refreshMenu(){
    password_join.children[0].value = '';
    password_create.children[0].value = '';
    roomName_form.children[0].value = '';
    startBox.innerText = 'Player Count';
}

//=======================
function show(element){
    if (element.length > 1){
        element.forEach(subelement => subelement.setAttribute('status', 'visible'));
    }else{
        element.setAttribute('status', 'visible');
    }
}

function hide(element){
    if (element.length > 1){
        element.forEach(subelement => subelement.setAttribute('status', 'hidden'));
    }else{
        element.setAttribute('status', 'hidden');
    }
}

function validation(){
    console.log("validate time.");
}
