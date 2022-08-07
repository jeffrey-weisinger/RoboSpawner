const { Socket } = require('socket.io');
const Player = require('./Player.js')
const WGen = require('./WorldGeneratorTest.js')
const SpatialHashMap = require('./SpatialHashMap.js');
const { v4: uuidv4 } = require('uuid');
const Robot = require('./Robot.js');
 
class Arena{ 
    constructor(){
        this.type;
        this.sockets = {};
        this.players = {};
        this.myNum;
        this.robots = {}; 
        this.buildings = {};
        //this is for "looking things up" when we don't know exactly what we want to look up. 
        // the above are things that we look up when we want to filter by group, especially players.
        //when an object is added, it will ALWAYS be added t0o both 
        this.allObjects = {};
        setInterval(this.returnToSockets.bind(this), 1000/60); //oh damn, this is every 1/2 second only.
        //setInterval(this.printPlayers.bind(this), 500);
        this.sMap = new SpatialHashMap(0, 10000, 0, 10000, 20, 20);
        this.WGen = new WGen(this.sMap, this.players, this.robots, this.buildings, this.allObjects);
        this.WGen.wGen1(); //should generate the first world for TEST.
    }
 
    setType(type){
        this.type = type; 
    }
/*
    inputKey(soc, key){ 
        if (key == 'a' || key == 'A'){
            console.log("aight");
            this.players[soc].x += this.players[soc].speed;
        } else if (key == 'd' || key == 'D'){
            console.log("delight");

            this.players[soc].x -= this.players[soc].speed;

        }
    }*/
    
    addSocket(soc, username){
       // console.log("ooooh");
       // console.log(username);
        this.sockets[soc.id] = soc;
        //console.log(Object.keys(this.sockets).length);
        //console.log("^^");
       // console.log(Object.keys(this.sockets));
        //this.players[soc.id] = new Player(soc.id, 100, 30, 100, 100, playerType);
    }

    addPlayer(soc){
        console.log("PLAYER ADDED");
       // console.log("why we in here so goddamn often");
        const uuid = uuidv4();
        //we use socket to access, but note that some will NOT have socket.ids. FOR RETURN, we always use uuid.
        //uuids are ONLY for drawing -- and also to keep track for when in map. 
        let pl = new Player(500, 500, 0, "Run", soc.id, uuid);
        this.players[soc.id] =  pl;//id, playerNumber, playerType
        this.allObjects[soc.id] = pl;   
        console.log("logging all players");
        console.log(this.players);
        ///console.log(this.players);
        //playerNum might be good for keeping track of players.
    }
    gravity(){
        Object.keys(this.players).forEach(id=> {
                this.players[id].gravityFactor += 1;
                this.players[id].useGravity();
            }
        )
        
    }
    printPlayers(){
        console.log("////");
        console.log(Object.keys(this.players).length);
        console.log(this.myNum); //so we can keep track of the different arenas.
        console.log("////");

        //console.log(Object.keys(this.sockets).length);
        //console.log("those are the soket");
    }
    number(num ){
        this.myNum = num;
    }
    getPlayerReturnInfo(){
       return Object.values(this.players).map(pl => pl.infoPack()) //i guess it kind of array-ifies itself?
       //console.log(this.players) 
       //console.log("//////");
       //console.log(a);//MYSTERY OF ALTERNATION
       /*
       console.log("players"); 
       console.log(this.players);
       console.log("A +> ");
       console.log(a);*/
    } 
    
    returnToSocketsWhenPressed(){
        console.log("SOOPER BUTTON");
        this.returnToSockets();
    }

    returnToSockets(){
        
       // console.log("Ok");
        //Part 1: We have to find WHAT the player can see.
        //console.log(this.players);
       // console.log("^^ players");
      //  console.log(this.robots);
      //  console.log("^^ robots");

      //i see. this doesn't even return until the player joins.
        Object.values(this.players).map(pl => {
            if (pl.soc_id != null){//meaning it's a real player
                let x = pl.x;
                let y = pl.y;
                let objsToReturn = this.sMap.findView(x, y); 
                //console.log(objsToReturn);
                //console.log("obj^^");
               // if (pl.x < 10000 && pl.x > 0 ) pl.x = pl.x + 0.01;
                //we're just going to do a "raw return" for each player -- we're not going to check anything. 
                //as long as it's in the vision of the player, the player should be able to see it. 

                // however, we will return an extra field -- 
                let playerObj = pl.infoPack();

                let othersArr = [];
                objsToReturn.forEach(being => {
                    //console.log(being.unique_id);
                    //console.log("asdfsf");
                    if(this.allObjects[being.unique_id]){//it should exist, always. but this is like a safety net.
                        //we're going to use the socket_id which everyone has to see whether it's an ally/enemy before returning. 
                        let returnInfoObj = this.allObjects[being.unique_id].infoPack();
                        if (this.allObjects[being.unique_id].soc_id == pl.soc_id){
                            returnInfoObj.side = 'ally';
                        }else{
                            returnInfoObj.side = 'enemy';
                        }
                        othersArr.push(returnInfoObj); 
                    };
                })
                let t = Date.now();
                //console.log(playerObj);
                let returnObj = {t, playerObj, othersArr};
               // console.log("logging the return rotation for player");
               // console.log(returnObj.playerObj.rotation);
                //console.log(returnObj);
                //console.log(playerObj.unique_id);
               // console.log(othersArr[0].unique_id);
               // console.log(this.sockets[pl.soc_id]);
                // console.log("AFdf");
                //console.log("ro");
                //console.log(returnObj);
                this.sockets[pl.soc_id].emit('returnInfo', returnObj);


            } ;
        });
        //let objsToReturn = this.sMap.findView(); 
       // console.log(objsToReturn);
/*
        //Part 2: We have to find what actually gets returned for each of these items.
        let pI = this.getPlayerReturnInfo();
       // this.gravity();//it would be weird if gravity happened even before spawning in. By calling it ourselves, we can make sure gravity is happening at a constant rate.
        //console.log("PI BELOW");
        //console.log(this.players);
        //console.log("we're actually here.")
        //let returnObj = {pI} //we will store the entire obj. here 
        //console.log(pI);
        //console.log("pI^");
        //console.log(pI); 
       // console.log("bictorie")
        Object.values(this.sockets).forEach(soc=>{ 
            //console.log("ensdpessfs");
            soc.emit('returnInfo', pI);
        })*/
    } 

    handleKeyInput(socket, obj){
        let {key, type} = obj;
        console.log("this is the obj");
        //console.log(obj);
        if (type == "down"){
           // console.log(this.players[socket]);
           //console.log(key + "<- key");
           if (key){ //i don't know what it means for key to be undefined, but it can happen.
            this.players[socket.id].currentPress(key.toLowerCase());
           }
        } else{
            console.log(type);  
            if (key){ //i don't know what it means for key to be undefined, but it can happen.
                this.players[socket.id].currentUnPress(key.toLowerCase());
            }
        }
    }

    handleMouseInput(socket, obj){
        let {x, y, canvasX, canvasY, type} = obj;
        if (type == 'move'){
            this.players[socket.id].mouseMove(x, y, canvasX, canvasY);
        }
    }

}
module.exports = Arena;