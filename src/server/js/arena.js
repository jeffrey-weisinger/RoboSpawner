const { Socket } = require('socket.io');
const Player = require('./Player.js')
const WGen = require('./WorldGeneratorTest.js')
const SpatialHashMap = require('./SpatialHashMap.js');
const { v4: uuidv4 } = require('uuid');
const Robot = require('./Robot.js');
const InvRobot = require('./InvRobot.js');
const Projectile = require('./Projectile.js');
const Chip = require('./Chip.js');
const GuiChip = require('./GuiChip.js')

class Arena{ 
    constructor(){
        this.type;
        this.sockets = {};
        this.players = {};
        this.myNum;
        this.robots = {}; 
        this.projectiles = {};
        this.buildings = {};
        this.items = {};
        this.invRobots = {}; //these won't go into all objects, because inventory items haven't spawned yet -- we don't count them as objects.
        //this is for "looking things up" when we don't know exactly what we want to look up. 
        // the above are things that we look up when we want to filter by group, especially players.
        //when an object is added, it will ALWAYS be added t0o both 
        this.allObjects = {};
        this.chips = {};

        setInterval(this.returnToSockets.bind(this), 1000/60); //oh damn, this is every 1/2 second only.
        //setInterval(this.printPlayers.bind(this), 500);
        this.level = 1;
        this.enemyRobotsCount = 0;
        this.sMap = new SpatialHashMap(0, 10000, 0, 10000, 20, 20);
        this.WGen = new WGen(this.sMap, this.players, this.robots, this.buildings, this.items, this.projectiles, this.allObjects, this);
        this.WGen.wGenLvl(this.level.toString());
        //this.WGen.wGen1(); //should generate the first world for TEST.
        setInterval(this.logRoboPositions.bind(this), 10000); 
    }

    updateEnemyCount(enemyCount){
        this.enemyRobotsCount = enemyCount;
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
        let pl = new Player(500, 500, 0, "Run", soc.id, soc.id, this.sMap);
        this.players[soc.id] =  pl;//id, playerNumber, playerType
        this.allObjects[soc.id] = pl;   
        console.log("logging all players");
        console.log(this.players);
        this.sMap.insert(500, 500, 1, 1, soc.id);
        this.sockets[soc.id].emit('updateLevel', this.level.toString());//so, whenever you join, it's updated accordingly.  

/*

        let roboUuid = uuidv4()
        let robo = new Robot(500, 500, 0, "Idle", "1", soc.id, roboUuid, pl); //goofy aah
        this.robots[roboUuid] = robo;
        this.allObjects[roboUuid] = robo;
        this.sMap.insert(502, 502, 1, 1, roboUuid);
        console.log("logging robos");
        console.log(this.robots);*/
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

    pickupItem(socket, uuidsArr){

        console.log("we're gettin in");
        //we're assuming that such a uuid will always exist.. but in the case that isn't the case..
        uuidsArr.forEach(uuid => {
            console.log("THIS IS THE UUID:")
            console.log(uuid);
            if (this.allObjects[uuid]){
                let type = this.allObjects[uuid].type;
                if (type == 'gear'){
                    this.players[socket.id].gears++
                    socket.emit('gearUpdate', this.players[socket.id].gears); //this is a gui thing, so it doesn't matter that it comes before we delete it on the canvas.
                }else if (type == 'chip'){
                    let model = this.allObjects[uuid].model;
                    //personalized inventory object, which i think is better because it's more intuitive, more so compared to the global one. however, both work.
                    //note that this is only really used 
                    this.players[socket.id].invChips[uuid] = new GuiChip(model, uuid); //this is what the chip will remain as. -- same logi here as above, since an invchip info when returned is for the canvas.
                    socket.emit('chipUpdateInv', {model, uuid});
                }
                console.log(Object.keys(this.allObjects).length);
                delete this.allObjects[uuid]
                console.log(Object.keys(this.allObjects).length);
            }
            if (this.items[uuid]){
                console.log(Object.keys(this.items).length);
                delete this.items[uuid]
                console.log(Object.keys(this.items).length);
            }

            this.sMap.deleteBeing(uuid);
        })
        console.log(this.players[socket.id].gears + "<- gear count ");
      
    }
    buyRequest(socket, model){
        let player = this.players[socket.id];
        let gearsNeeded;
        switch(model){
            case "1":
                gearsNeeded = 2;
                break;
            case "2":
                gearsNeeded = 3;
                break;

            case "3":
                gearsNeeded = 4;
                break;

            case "4":
                gearsNeeded = 3;
                break;

            case "5":
                gearsNeeded = 5;
                break;

        }
        if (player.gears >= gearsNeeded){
            player.gears -= gearsNeeded;
            console.log("OOH");
            console.log({model:model, playerGears:player.gears});
            let newRoboUuid = uuidv4();
            let newInvRobot = new InvRobot(newRoboUuid, model);
            this.invRobots[newRoboUuid] = newInvRobot;
            player.invRobots[newRoboUuid] = newInvRobot; 
            socket.emit("buyConfirmation", {uuid:newRoboUuid, model:model, playerGears:player.gears}); 
            
            //the player need only worry about the uuid for when it's dragging the model onto the battlefield.
            //in other words, as long as it just drags the right thing onto the battlefield, we'll confirm that, turn it into a model, 
            //and then return the necessary information.

            //yet, we still pass the model back so it can get the correct div.
        }else{
            console.log("ya need more geers");
            console.log(player.gears);
            console.log(gearsNeeded);
            //don't do anything :
        }


    }

    moveChipToActive(socket, obj){
        let {uuid, robouuid} = obj;
        console.log("MOVE TO ACTIVE");
        console.log(uuid);
        console.log(robouuid)
        console.log(obj);
        let pl = this.players[socket.id]
        console.log(pl)
        console.log("PLAYER LOGGED")
        console.log(pl.invChips[uuid]);
        if (pl.invChips[uuid]){
            pl.activeChips[uuid] = pl.invChips[uuid]
            if (this.robots[robouuid].activeChip != null){
                pl.invChips[this.robots[robouuid].activeChip.uuid] = this.robots[robouuid].activeChip; //we're assigning it to invChips.
            }
            this.robots[robouuid].activeChip = pl.invChips[uuid];
            delete pl.invChips[uuid];
            console.log("IN ACTIVE");
            console.log(pl)
            socket.emit('chipMovedActive', uuid);
            
        }else{

        }

    }

    
    moveChipToInv(socket, obj){
       let {uuid, robouuid} = obj;
        let pl = this.players[socket.id]
        if (pl.activeChips[uuid]){
            this.robots[robouuid].activeChip = null
            pl.invChips[uuid] = pl.activeChips[uuid]
            delete pl.activeChips[uuid];
            socket.emit('chipMovedInv', uuid);
        }else{

        }
    }
    addToBattleField(socket, obj){
        console.log("WE IN AND WE UP");
        let {uuid, x, y} = obj;
        let player = this.players[socket.id]
        console.log(this.invRobots);
        console.log(uuid);
        if (this.invRobots[uuid]){//let us assume this means that it exists.
            console.log("INININ");
           /* let zOffset;
            switch(model){

                case "1":
                    zOffset = 10;
                    break;
                
            }
*/
            let model = this.invRobots[uuid].model;

            let robotToAdd = new Robot(player.x + x, player.y + y, 0, "Run", model, socket.id, uuid, player, this.allObjects, this.robots, this.projectiles, this.sMap) //x, y, rotation, animation, model, soc_id, uuid, parent(id)
        
            delete this.invRobots[uuid]
            delete player.invRobots[uuid]//do we need more confirmation??? not really, because the id must be of this player by virtue of this player referencing the id-- so we don't need to attach a socket to it.
            //Is this an OK assumption to make??
    
            this.allObjects[uuid] = robotToAdd;
            this.robots[uuid] = robotToAdd;

            console.log(this.robots);
            this.sMap.insert(player.x + x, player.y + y, 1, 1, uuid);
            socket.emit('updateDiv', {update:"remove", uuid:uuid})
        }else{
            socket.emit('updateDiv', {update:"reset", uuid:uuid});
        }

    }
    updateDirection(socket, obj){
        let {x, y} = obj;
        let player = this.players[socket.id];
        player.updateDirection(x, y);
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
        ///we must first perform a robot update before the return. even though this isn't part of the return itself, we'll put it here.
       /// console.log("loggin all objs")
        //console.log(this.allObjects);
        //console.log("asdfsadfadsfa");

      //  console.log("THESE ARE ROBOS");
        Object.values(this.robots).forEach(robot=>{
         //   console.log(robot.unique_id);
         //   console.log(robot.model);

            robot.act(this.sMap, this.allObjects);
        }) 

        //after we decide the actions of each robot, we should then update the projectiles.
        Object.values(this.projectiles).forEach(projectile => {
            projectile.calculate(); //updates the projectile distances.
        })

       // console.log("Ok");
        //Part 1: We have to find WHAT the player can see.
        //console.log(this.players);
       // console.log("^^ players");
      //  console.log(this.robots);
      //  console.log("^^ robots");

      //i see. this doesn't even return until the player joins.
      /*if (this.enemyRobotsCount == 0){
        this.level++;
      }*/
        Object.values(this.players).map(pl => {
            if (pl.soc_id != null){//meaning it's a real player
                let x = pl.x;
                let y = pl.y;
                let objsToReturn = this.sMap.get(x, y, 'find'); 
                //console.log(objsToReturn);
                //console.log("obj^^");
               // if (pl.x < 10000 && pl.x > 0 ) pl.x = pl.x + 0.01;
                //we're just going to do a "raw return" for each player -- we're not going to check anything. 
                //as long as it's in the vision of the player, the player should be able to see it. 

                // however, we will return an extra field -- 
                let playerObj = pl.infoPack();

                let othersArr = [];
               // console.log(objsToReturn);
               // console.log(this.robots);
               /* console.log("TEST 0");
                console.log(this.robots);

                console.log("TEST 0.5");
                console.log(objsToReturn);

               console.log("TEST 1");
                Object.values(this.robots).forEach(robo=> {
                    console.log(robo);
                })
                console.log("TEST 2");
                objsToReturn.forEach(being=>{
                    console.log(being.unique_id);
                })*/
                //console.log("---");
                //console.log(pl.soc_id);
                objsToReturn.forEach(being => { 
                    
                    //console.log(being.unique_id);
                    //console.log("asdfsf");
                  //  console.log("yo");
                    if(this.allObjects[being.unique_id]){//it should exist, always. but this is like a safety net. 
                        //we're going to use the socket_id which everyone has to see whether it's an ally/enemy before returning. 
                        let returnInfoObj = this.allObjects[being.unique_id].infoPack();
                        /*console.log("WE FOUND ONE");
                        console.log(returnInfoObj);
                        console.log()
                        //console.log("ABT TO RETURN AHHHHAHFUGASPGBI");
                       // console.log(being.type);*/
                       //console.log(being);
                       //console.log(this.allObjects[being.unique_id].soc_id);
                        if (returnInfoObj.type == 'robot' || 'projectile'){ //we don't want to do this if it's just a gear;  //chnaged... hope that's right.
                           // console.log("do we get here??");
                            if (this.allObjects[being.unique_id].soc_id == pl.soc_id){ //note that for projectile, it should just be passed in from the robot.
                                returnInfoObj.side = 'ally';
                              //  console.log("ALLY") 
                            }else{
                                returnInfoObj.side = 'enemy';
                                //console.log("ENEMY")

                            }   
                        }
                        if (returnInfoObj.unique_id != playerObj.unique_id){

                            othersArr.push(returnInfoObj); 

                        }

                    };
                })

                //death
                Object.values(this.robots).forEach(robot => {
                if (robot.hp <= 0){
                   /* if (robot.parent == null){
                        this.enemyRobotsCount--;
                    }*/
                    robot.onDeath();
              //can we even do this?


                    //note that we have to do this last, because we need to keep the player object around as a reference to remove it from the two places where it gets referenced.
                    //robot = null;
                    //wait, note that we don't even need to do that bc it'll get garbage collected.
 

                }
            });


          /*  if (this.level <= 7){
                this.WGen.wGenLvl(this.level.toString());
                this.sockets[pl.soc_id].emit('updateLevel', this.level.toString());
            }*/
           
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
               // console.log(returnObj);
                //console.log(returnObj);y
                
                //console.log("RO");
               // console.log(returnObj);
           //     console.log(returnObj.othersArr.forEach(other => console.log(other)));
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
    
    logRoboPositions(){    
        console.log("///");
        Object.values(this.robots).forEach(robot => {
           // console.log("WE UP");
            //console.log(robot.unique_id);
            //console.log(robot.x);
            //console.log(robot.y);
        });
        
    }
    
     
    

    handleKeyInput(socket, obj){
        let {key, type} = obj;
       // console.log("this is the obj");
        //console.log(obj);
        if (type == "down"){
           // console.log(this.players[socket]);
           //console.log(key + "<- key");
           if (key){ //i don't know what it means for key to be undefined, but it can happen.
            this.players[socket.id].currentPress(key.toLowerCase());
           }
        } else{
            //console.log(type);  
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