const express = require('express');
//const { fstat } = require('fs');
const app = express();
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('../../../webpack/webpack.dev.js');
const socketio = require('socket.io');
const port = 4000;
const compiler = webpack(webpackConfig); //creating the compiler
const Arena = require('./arena.js');
const bodyParser = require('body-parser');
const { Socket } = require('socket.io-client');
let i = 1;
let rooms = {};
let arenas = {};
let passcodes = {};
//let roomNames = {room_arr: ['joseph room', 'bing bong room', 'king kong room']};

app.use(webpackDevMiddleware(compiler));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const server = app.listen(port, () => {
    console.log("now listening!");
})//making the server listen 

app.get('/room', (req, res)=>{
    res.setHeader('Content-Type', 'application/json');
    //console.log(Object.keys(rooms));
    res.end(JSON.stringify(rooms));
    
});

app.post('/room', (req, res)=>{
    console.log("yesssssir");
    //console.log(req.body);
    res.end("req.")
})

app.post('/validation/multi', (req, res)=>{
   // console.log(req.body);
    res.end(JSON.stringify(req.body));
})


const io = socketio(server)
//const arena = new Arena(); We were creating a new arena!
io.on('connection', (socket)=>{
    //socket.on('addPlayer', playerType => {console.log("we're adding a player."); arena.addPlayer(socket, playerType)});
    socket.on("gimmeInfo", ()=>  {if (arenas[socket.id]){console.log("SUPPER BOTUON"); arenas[socket.id].returnToSocketsWhenPressed();}});
    socket.on('emitKey', key => console.log(key));
    socket.on('createValidate', validationObj => handleCreateValidation(socket, validationObj));
    socket.on('joinValidate', validationObj => handleJoinValidation(socket, validationObj));
    socket.emit('refillButtons', rooms);//we only need to do it for this socket.
    socket.on('classSelect', selectedClass => classSelectToArena(socket, selectedClass));
    socket.on('keyInput', obj => handleKeyInput(socket, obj));
    socket.on('mouseInput', obj => handleMouseInput(socket, obj));
    socket.on('bypass', ()=> newBypassArena(socket));
    socket.on('pickupItem', (uuidsArr) => pickupItem(socket, uuidsArr));
    socket.on('buyRobot', model => buyRobot(socket, model));
    socket.on('reqRoboAdd', obj =>addToBattleField(socket, obj) );
    socket.on('orbitUpdate', obj =>updateDirection(socket, obj) );
    socket.on('moveChipToActive', obj => moveChipToActive(socket, obj));
    socket.on('moveChipToInv', obj => moveChipToInv(socket, obj));
    socket.on('disconnect', ()=>disconnect(socket) );
    socket.on('createSinglePlayer', ()=>handleCreateValidationSinglePlayer(socket));


});


function newBypassArena(socket){
   /* arenasKeys = arenas.keys();
    while(arenaKeys.hasNext()){
        arenaKeys.next.remove(); //stack overflow solution! we'll prob remove this eventually though.
    }*/ 
    //basically faking our way through the main menu.

    let arena = new Arena('multiplayer'); //should be only arena.
    arena.setType("multi");
    Object.assign(arenas, {[socket.id] : arena});
    console.log(arenas);
    arena.addSocket(socket, "joe");
    socket.emit('menuComplete');
    arenaAdd(socket);


}

function handleCreateValidation(socket, validationObj){
    
    //console.log("in create validate");
    let {access, username, roomname, passcode, maxPlayerCount} = validationObj;
   /* console.log(access + "<- access");
    console.log(username + "<- username");
    console.log(passcode + "<- passcode");
    console.log(passcode + "<- passcode");*/


    if (!( access && username && roomname && maxPlayerCount) || (access!='unlisted' && passcode=='')){ //we only care about passcode checking in the case where it's not unlisted. 
        //we catch here if it's public and there's no passcode. notice how we checked for the existence of public first.
        //socket.emit('validation_result', "failure");
        socket.emit('error', 'infoFailCreate', roomname);

        console.log("Not enough info!")
    }else if(Object.keys(rooms).includes(roomname)){
        console.log("This roomname has been taken already.")
       // socket.emit('validation_result', "failure");
       socket.emit('error', 'roomTaken', roomname);

    }else{
        //at this point, we know for sure that an empty passcode is valid
        let isPass;
        if (passcode == '') isPass = false; else isPass = true;//no need to pass this back! the only things we will display are with pass, for now. 

        validationObj.host = socket.id;
        validationObj.currentPlayers = [username]; 
        validationObj.isPass = isPass;
        validationObj.type = 'new';
        Object.assign(passcodes, {[roomname] : passcode});
        delete validationObj.passcode;

        validationObj.type = "multi";
        Object.assign(rooms, {[roomname] : validationObj}) ;
        //console.log(rooms); 
        
        let arena = new Arena('multiplayer');
        arena.setType("multi");
        Object.assign(arenas, {[socket.id] : arena});
        console.log(arenas);
        arena.addSocket(socket, username);
        arena.number(i);
        //console.log(arenas);
        //console.log("refill for create:");

        //console.log(rooms);


        io.emit('refillButtons', Object.assign({}, {[roomname]:validationObj}));
        socket.emit('menuComplete');
        //console.log(arenas);
        //console.log("arenasCreate");
     //   console.log(rooms);
      //  console.log("Rooms^");
        arenaAdd(socket);

    }
    //console.log(socket);
    //console.log(validationObj);
    //if (validationObj.gameT)
    console.log()
    
    //arenaSetup("", "room")
}

function handleCreateValidationSinglePlayer(socket){
    /*let newDemoArena = new Arena('demo');
    newDemoArena.addSocket(socket, "DEMO")
    newDemoArena.addPlayer(socket);
    socket.emit('menuComplete');
    socket.emit('gameTime');*/
    let newDemoArena = new Arena('demo'); //should be only arena.
    newDemoArena.setType("multi");
    Object.assign(arenas, {[socket.id] : newDemoArena});
    //console.log(arenas);
    newDemoArena.addSocket(socket, "DEMO");
    socket.emit('menuComplete');
    arenaAdd(socket);
    console.log("menuCasdfsasfaomplete");

}

function handleJoinValidation(socket, validationObj){
    //console.log(validationObj); 
    let {roomname, username} = validationObj;
    let passcode = validationObj.passcode
    if (Object.keys(rooms).includes(roomname)){
        let correct_room = rooms[roomname];
        if (!(roomname && username)){
           // console.log("incomplete info... try again.");
            correct_room.type = "update";
            correct_room.result = "infoFail";
            //correct_room.failtype = "info";
            correct_room.errorMessage = "Incomplete information.";
            //socket.emit('refillButtons', Object.assign({}, {[roomname]:correct_room}));
            socket.emit('error', 'infoFailJoin', roomname);

        }/*else if (correct_room.maxPlayerCount == (correct_room.currentPlayers).length){
            console.log("too many players!"); 
            //not even an error message here.
        }*///this is unnecessary because if the room was filled, we wouldn't be able to join to begin with.
       // else if (correct_room.maxPlayerCount == (correct_room.currentPlayers).length){
          //  console.log("Max Player Count Exceeded! Yea, we're not letting ya in.");{
        else if(!(typeof passcode == 'undefined') && passcode != passcodes[roomname]){ //if undefined, we can bypass this. 
            //actually, i'm OK with an empty passcode being "incorrect."

            //if it doesn't exist, we bypass the password step
            //it will only NOT exist when we don't need to enter it. 
            //in other words, we'll only have the password when we need it. Could this be tricked with a ''? Nope, fixed.
            //correct_room.result = "failure";
            correct_room.type = 'update';
            correct_room.result = "passcodeFail";
            //correct_room.errorMessage = "Wrong password, try again!";
            socket.emit('error', 'passcodeFail', roomname);
            //socket.emit('refillButtons', Object.assign({}, {[roomname]:correct_room}));
            

            console.log("Wrong password, fool! The server cannot be tricked so easily.")
        } else{
            console.log("Right Password!");
            //console.log(rooms[roomname]);
            
            correct_room.currentPlayers.push(username); //incrementing players. (USERNAME)
            arenaToAddTo = arenas[correct_room.host];
            arenaToAddTo.addSocket(socket, username); //this works because the host itself is the id.
            Object.assign(arenas, {[socket.id] : arenaToAddTo});

            //console.log(arenas);
            //correct_room.type = 'update';
            correct_room.type = 'update';
            correct_room.result = "success";
 
 
            io.emit('refillButtons', Object.assign({}, {[roomname]:correct_room}));
            socket.emit('menuComplete');
            arenaAdd(socket);

            //console.log(arenas);
            //console.log("arenasJOIN");
        }
    }
}


function arenaAdd(socket){
    arenas[socket.id].addPlayer(socket); //because we need to have the class to add the player. duh.
    socket.emit('gameTime');

}

function handleKeyInput(socket, obj){
    //console.log(arenas);
    if (arenas[socket.id]){
        arenas[socket.id].handleKeyInput(socket, obj);

    }
}
function handleMouseInput(socket, obj){
    if (arenas[socket.id]){
        arenas[socket.id].handleMouseInput(socket, obj);
    }
}


function pickupItem(socket, uuidsArr){
    console.log("PICKING UP, SERVER");
   // console.log(arenas);
   // console.log(socket.id);
    if (arenas[socket.id]){
        arenas[socket.id].pickupItem(socket, uuidsArr);
    }else{
        console.log("no sockets?");
    }
    console.log("AQAAH");
}

function buyRobot(socket, model){
    console.log("OOHGA DOOGA")
    console.log(socket.id);
    if (arenas[socket.id]){ 
        arenas[socket.id].buyRequest(socket, model);
        console.log("BUY REQ");
    }
    console.log("BUY REQ2");

}

function addToBattleField(socket, obj){
    //console.log("WE WEWEWE");
    if (arenas[socket.id]){ 
        arenas[socket.id].addToBattleField(socket, obj);
        //console.log("BUY REQa");
    }
}

function updateDirection(socket, obj){
    if (arenas[socket.id]){ 
        arenas[socket.id].updateDirection(socket, obj);
    }
}

function moveChipToActive(socket, obj){
    if (arenas[socket.id]){ 
        console.log("WE A MOVING"); 
        arenas[socket.id].moveChipToActive(socket, obj);
    }
}

function moveChipToInv(socket, obj){
    if (arenas[socket.id]){
        arenas[socket.id].moveChipToInv(socket, obj);
    }
}

function disconnect(socket){
    socket.disconnect();
}