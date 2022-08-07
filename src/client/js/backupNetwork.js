
function enterName(){
    //show
    console.log("hafhsdva");
    show(userNameForm)
    show(submitButton)
    submitButton.addEventListener('click', nameHandler)
}

function nameHandler(){
    if (userNameForm.children[0].value){
        userName = userNameForm.children[0].value; //store
        hide(userNameForm) //clean-up, note that this hides the input as well!
        submitButton.removeEventListener('click', nameHandler) //clean-up
        hide(submitButton)
        turnOnModeButtons(); //next 
    }
}

//from here, we need to start configuring the "back"
function turnOnModeButtons(){
    console.log('aight.');
    modeArray.forEach(b => {
        show(b); //show
        if (b.textContent === 'SinglePlayer') //event handlers
            b.addEventListener('click', storeModeInfo.bind(null, b)); //binding to storeMode if SinglePlayer
        else
            b.addEventListener('click', configureMultiPlayer.bind(null, b));//binding to configMulti if MultiPlayer
    });
    
    //show back
    show(backButton);

    backButton.addEventListener('click', backToEnterUserName);
    
}

function backToEnterUserName(){
    //hide (cleanup)
    hide(backButton);
    //getting rid of event listeners (cleanup)
    modeArray.forEach(b => { //note that it goes for local here.
        hide(b)
    });
    backButton.removeEventListener('click', backToEnterUserName);
    enterName();
}

//helper for mode - singleplayer
function storeModeInfo(b){
    //hide all previous (mode, singleplayer, NOT back).
    modeArray.forEach(b => { //note that it goes for local here.
        hide(b);
    });
    //turning it off. (cleanup)
    b.removeEventListener('click', storeModeInfo.bind(null, b)); 

    //storage (it still exists!)
    mode = b.textContent;

    //turning off backButton from previous. Note that we aren't hiding it! Not everything needs to be hidden -- if it stays the same. 
    backButton.removeEventListener('click', backToEnterUserName);
    //SEND VALIDATION FIRST
    turnOnClassButtons();
}
function turnOnClassButtons(){
    backButton.addEventListener('click', backToModeButtons); 
}

//helper function for multi.
function configureMultiPlayer(b){
    //first thing is turning it off + hiding it. 
    //  console.log(b);
    b.removeEventListener('click', configureMultiPlayer.bind(null, b));
    backButton.removeEventListener('click', backToEnterUserName);

    modeArray.forEach(b => hide(b));    

    //storage
    mode = b.textContent;

    //turning off buttons from previous.

    //turn on create room/join existing room
    

    createOrJoin();
}

//main func
function createOrJoin(){
    console.log('finally');
    multiStyleArray.forEach(b =>{
        show(b) //show
        if (b.textContent === 'Create Room')
            b.addEventListener('click', configCreateMenu); //add listeners
        else
            b.addEventListener('click', configJoinMenu); 
    })

    backButton.addEventListener('click', backToModeButtons);  //essentially making event listeners that delete themselves. so smart!
}


function storeCreateRoom(){
    multiStyleArray.forEach(b =>{
        hide(b)
    })
    backButton.removeEventListener('click', backToModeButtons); 
    create_enterPass();
}

function storeJoinRoom(){
    console.log("hello")
    multiStyleArray.forEach(b =>{
        hide(b)
    })
    backButton.removeEventListener('click', backToModeButtons); 
    //join_enterPass();
    /*fetch('localhost:4000/rooms').then(arr => {
        arr.forEach(document.createElement('p'))
    })*/
    selectRoom();
}

function selectRoom(){
    console.log("uh oh");
    fetch('http://localhost:4000/room')
    .then(response => response.json())//from stack overflow
    .then(json_obj => {
        room_arr = json_obj.room_arr
        room_arr.forEach(room => {
            console.log(room);
            let btn = document.createElement("button");
            btn.innerText = room;
            document.getElementById("rooms").appendChild(btn);
        })    
    });
}

function backToModeButtons(){
    multiStyleArray.forEach(b =>{
        hide(b);
    });
    backButton.removeEventListener('click', backToModeButtons);
    
    turnOnModeButtons();
}

/*
function join_enterPass(){
    backButton.addEventListener('click', backToCreateOrJoin); 
}

function create_enterPass(){
    backButton.addEventListener('click', backToCreateOrJoin); 
}

function backToCreateOrJoin(){
    backButton.removeEventListener('click', backToCreateOrJoin); 
    createOrJoin();
}

//back function:
function backToModeButtons(){
    multiStyleArray.forEach(b =>{
        hide(b);
    });
    backButton.removeEventListener('click', backToModeButtons);
    
    turnOnModeButtons();
}


//main func
function joinRoom(){
    show(enterPass);
    backButton.addEventListener('click', createOrJoin); 
}

function createRoom(b){
    show(enterPass);
    backButton.addEventListener('click', createOrJoin); 
}


//back func
function backToStoreModeInfo(b, event){
    multiStyleArray.forEach(b => hide(b));//hide
    b.removeEventListener('click', backToStoreModeInfo(event, b)) //remove
    storeModeInfo(); //go back
}
*/

//=======================================================================================


let playerChoiceArr = document.querySelectorAll(".playerCount .child");
let b = document.getElementById('b')
let playerCountDiv = document.querySelector('.playerCount')
let display = document.getElementById('display')
let submit = document.getElementById('submit')

let create_menu = document.getElementById('create_menu')
let join_menu = document.getElementById('join_menu')

let roomName = document.getElementById('room_name');
let password_create = document.getElementById('password_create');
let password_join = document.getElementById('password_join');



function configCreateMenu(){let showingChoices=false;
let dropDownDiv = selectElementById('dropDownDiv')
let dropChoices = querySelectorAll('.dropDownDiv .child');
    show(create_menu);
    submit.addEventListener('click', submitForValidation)
    dropDownDiv.addEventListener('click', () => { //these is the outer div itself. 
        if (showingChoices){
            playerChoiceArr.forEach(b => {
                b.style.display='none';
            })
            showingChoices=false;
        }else{
            playerChoiceArr.forEach(b => {
                b.style.display='inline';
            })
            showingChoices='true';
        }
    })
    playerChoiceArr.forEach(b => { //this is the array of buttons.
        b.addEventListener('click', choose);
    });
}

function choose(e){
    display.innerHTML =  e.target.outerText; //accessing from the event.
}

function submitForValidation(e){
    if (playerCountDiv.innerText.length === 1 && roomName.children[0].value.length > 0 && password.children[0].value.length > 0){
    }
}


function configJoinMenu(){

}

function show(element){
    element.setAttribute('status', 'visible');
}

function hide(element){
    element.setAttribute('status', 'hidden');
}

//=======================================================================================


/*
function show(element){
    element.setAttribute('status', 'visible');
}
function hide(element){
    //console.log(element.attributes.status);
    console.log(element.setAttribute('pizzaria', 'delicious!'));
    console.log(element.attributes);
    console.log("------");
    console.log(element.getAttribute('status'))
    element.setAttribute('status', 'hidden');
    console.log(element.getAttribute('status'))
    console.log("======")
    console.log(element.attributes);
    //console.log(element.attributes.status);

}*/
/*
function createRoom(){
    
}

function joinRoom(){

}
*/





/*
function turnOnClassButtons(){
    console.log("in turnOnClassButtons");
    gameTypeClassArray.forEach(b => {
    //console.log(b.textContent);
        b.setAttribute('status', 'visible');
        console.log("been in here once...")
        b.addEventListener('click', storeClassInfo.bind(event, b));
    })
    backButton.setAttribute('status', 'visible');

    backButton.replaceWith(backButton.cloneNode(true));
    backButton.addEventListener('click', () => {
        gameTypeClassArray.forEach(b => {
            b.setAttribute('status', 'hidden');
        });
        turnOnModeButtons()});
    };

function storeClassInfo(b, event){
    console.log("in storeClassInfo");

    playerClassType = b.textContent;
    console.log(playerClassType);
    gameTypeClassArray.forEach(b => {
        //console.log(b.textContent);
        b.setAttribute('status', 'hidden');
    })
    //making it so that we go and execute turn on classButtons again.
    backButton.replaceWith(backButton.cloneNode(true));
    backButton.addEventListener('click', () => {
        turnOnClassButtons()});
}
*/

/*
function backToStoreModeInfo(b, event){
    multiStyleArray.forEach(b =>{
        b.setAttribute('status', 'hidden');    
    })
    b.removeEventListener('click', storeModeInfo); //making sure the 'back' doesn't leave any trace.
    storeModeInfo();
}
*/
function backToMulti(b, event){
    b.removeEventListener('click', storeModeInfo); //making sure the 'back' doesn't leave any trace.
    storeModeInfo();
}

function backToClass(){

}



function scanPlayer({mode, multiType, roomNumber}){
    socket.emit('addPlayer', {mode, multiType, roomNumber});
}

//info about how to proceed!
function handleScan(){

}

function getPlayerClass(){

}


//===
//=====

/*
let playerChoiceArr = document.querySelectorAll(".playerCount .child");
let b = document.getElementById('b')
let playerCountDiv = document.querySelector('.playerCount')
let display = document.getElementById('display')
let join_submit = document.getElementById('join_submit')

let roomName = document.getElementById('room_name');
let password_create = document.getElementById('password_create');
let password_join = document.getElementById('password_join');

configCreateMenu();
let showingChoices=false;
function configCreateMenu(){
    submit.addEventListener('click', submitForValidation)
    playerCountDiv.addEventListener('click', () => {
        if (showingChoices){
            playerChoiceArr.forEach(b => {
                b.style.display='none';
            })
            showingChoices=false;
        }else{
            playerChoiceArr.forEach(b => {
                b.style.display='inline';
            })
            showingChoices='true';
        }
    })
    playerChoiceArr.forEach(b => {
        b.addEventListener('click', choose);
    });
}

function choose(e){
    display.innerHTML =  e.target.outerText; //accessing from the event.
}

function submitForValidation(e){
    if (playerCountDiv.innerText.length === 1 && roomName.children[0].value.length > 0 && password.children[0].value.length > 0){
    }
}

*/
/*
function a(){
    //currycurry = curry(add, 1, 2, 3)
    b.addEventListener('click', add, false);
    b.x = 2;
    b.y = 3;
}

function handle(c){
    display.innerHTML = c.innerHTML;
    children.forEach(c=>{
        c.removeEventListener('click', handle.bind(null, c))
    });
}

function curry(original){
    var args = [].slice.call(arguments, 1);//gets all args but the first, in an array. This is because "this" is the argument.
    original.apply( this, [].slice.call( arguments ).concat( args ) );
    return function curried_func(){
        return original.apply( this, [].slice.call( arguments ).concat( args ) );
    }
}*/

//start();
/*





start = () => {
    console.log("awww yeahh");
    selectGameType();
    connect("gremlin").then(() => {
    captureInput();
    setupCanvas();
    updateCanvas();
})}; */
