//Don't forget to update your spatial hashmap for robots, players, projectiles, and anything that can move!
const { times, takeRightWhile } = require("lodash");
const Projectile = require("./Projectile.js")
const { v4: uuidv4 } = require('uuid');

class Robot{
    constructor(x, y, rotation, animation, model, soc_id, uuid, parent, allObjs, robots, projectiles, sMap){
        this.soc_id = soc_id;
        this.unique_id = uuid;
        this.rotation = rotation;
        this.animation = animation;
        this.model = model;
        this.robots = robots;
        this.x = x;
        this.y = y;
        this.regAtkedObj = {}; //everything we're being attacked by
        this.commandAtkedObj = {};
        this.parent = parent;
        if (model == 1){
            this.width = 1;
            this.height = 1; 
        }
        this.hp = 100;
        this.dmg = 20;
        this.phase = "seek";
        this.seekTarget;//must be enemy coords (which we will get) //note that we do this every turn, only for seek. no reason to store it in a global.
        this.commandTarget; //can be enemy, can be coords.
        this.type = "robot";
        this.atkDistance;
        this.roboToAtk;
        this.activeChip;

        this.allObjs = allObjs;
        this.projectiles = projectiles;
       // console.log("this.projectiles");
       // console.log(this.projectiles);
        this.sMap = sMap;
        this.leftAtk;

        
        this.projSpeed;
        switch(this.model){
            case "1":
                this.dmg = 15;
                this.hp = 100;
                
                this.atkDistance = 1;


                break;
            case "2":
                this.dmg = 30;
                this.hp = 100;
                this.atkDistance = 10;
                this.range = 1.5;
                this.projSpeed = 1.5;
                this.projSize = 0.4;


                break;
            case "3":
                this.dmg = 10;
                this.hp = 60;
                this.atkDistance = 2.5;
                this.range = 3;
                this.projSpeed = 3;
                this.projSize = 0.4;

                break;
            case "4":
                this.dmg = 40;
                this.hp = 120;
                this.atkDistance = 1;
                break;
            case "5":
                this.dmg = 30;
                this.hp = 70;
                this.atkDistance = 4;
                this.range = 3;
                this.projSpeed = 1;
                this.projSize = 0.4;

                break;
            case "6":
                this.dmg = 15;//35
                this.hp = 130;
                this.atkDistance = 12;
                this.range = 3;
                this.projSpeed = 2;
                this.projSize = 0.8;
                break;
            case "7":
                this.dmg = 10;//40
                this.hp = 180;
                this.atkDistance = 8;
                this.range = 3;
                this.projSpeed = 2;
                break;
            case "8":
                this.dmg = 10;//60
                this.hp = 250;
                this.atkDistance = 15;
                this.range = 3;
                this.hp = 300;
                this.projSpeed = 0.5;//2
                this.projSize = 1.2;
                break;
        } 
        //note that this.projSpeed is only defined for those that have range. 
        //note that projSpeed is defined once above, because I don't want to run into the issue that there's a chance that projSpeed hasn't been defined.
        //same story at the end w/ atkDistance.


        //idea courtesy of stackOverflow 
    }

    act(sMap, allObjs, peopleArr){
        let atkArr= sMap.get(this.x, this.y, 'seek');
        /*console.log("*");
        console.log(atkArr);
        console.log("==")
        console.log()
        console.log("!!");*/
        if (this.phase == "seek") {
            //console.log("A");
            let minDistance = Number.MAX_SAFE_INTEGER;
            let minObj;
           // console.log(atkArr);
            atkArr.forEach(being => {
                //console.log("BEING")
                //console.log(being);
/*
                console.log("NEW PASS");
                console.log("---a---")
                console.log(this.model);
                console.log(this.unique_id);     */
                let beingObj = allObjs[being.unique_id]; 
                   
               // console.log(beingObj.type);
               /* 
                console.log(being);
                console.log(being.unique_id);
                console.log("--A---");
                console.log(allObjs);
                //xconsole.log(beingObj);
                console.log("--B---");
                console.log(beingObj);*/
                /*console.log("######");
                console.log(being);
                console.log('****');
                console.log(allObjs);
                console.log('////')
                console.log(beingObj);*/
                
                if (beingObj.type == "robot" || beingObj.type == "player"){
                    if (beingObj.soc_id != this.soc_id){//enemy
                      //  setBreakpoint
                       // if(beingObj.type == "player")                 debugger;

                        let currentDistance = Math.sqrt((beingObj.y - this.y)**2 + (beingObj.x - this.x)**2);
                       /* console.log("not attacking.. yet");
                        console.log("calculating");
                        console.log(beingObj.y);;
                        console.log(beingObj.x);
                        console.log(this.x)
                        console.log(this.y);
                        console.log(currentDistance);
                        console.log(this.model);
                        console.log("calculated");*/
                        if(currentDistance <= minDistance){
                            minDistance = currentDistance;
                            minObj = beingObj;
                            
                        }
                    }
                }
            })
           // console.log(minObj);
            //by now, we should have a min object w/ min distance.
            //console.log(this.unique_id);
            if (minObj){ //we will either run to object or atk.
               /* console.log("ASDF");
                console.log(this.unique_id);
                //console.log(minDistance);
                console.log(minObj);
                console.log(minDistance)*/



                if (Math.abs(minDistance) >= this.atkDistance){ //then we're not in range. move closer. atkDistance will always be positive.
                   // console.log("YE");
                    this.x -= (this.x - minObj.x) / Math.sqrt((this.x - minObj.x)**2 + (this.y - minObj.y)**2)/10
                    this.y -= (this.y - minObj.y) / Math.sqrt((this.x - minObj.x)**2 + (this.y - minObj.y)**2)/10
                    this.rotation = Math.atan2(minObj.x - this.x, minObj.y - this.y);
                    this.animation = "Run";
                    this.sMap.update(this.x, this.y, this.unique_id, 'robot', this.model);
                    //one of two places where the robot could be moving. 

                }else{
                   // console.log("AHHMM"); //we should go into full atk mode here.
                   console.log(this.model);

                    this.phase = "attack";
                    this.animation = "Attack";
                    //this.rotation = Math.atan2(minObj.y - this.y, minObj.x - this.x); //we still want to rotate. this is mainly for bots that didn't get a chance to rotate since they were spawned so close to each other.
                    //console.log(this.unique_id);
                    this.rotation = Math.atan2(minObj.x - this.x, minObj.y - this.y);
                    //console.log(this.x);
                    //console.log(this.y);
                    //out of convenience, we're just using this whole process to see if there exists a minObj to begin with for model 8.
                    this.roboToAtk = minObj;
                    this.roboToAtk.regAtkedObj[this.unique_id] = this; //can we do THIS??;
                    this.attack(); //note that we only call this once per start of attack! because then we go into attack mode. (we already set phase to attack)

                }
            } else{ //a minObj doesn't exist.
                this.phase = "seek";
                this.animation = "Idle"; //although, we're still in the seek phase. 
                //we will not atk.

            }
            //if we didn't find one, we still might have coords we can go closer to.
        }else{
            if (this.roboToAtk){
                this.rotation = Math.atan2(this.roboToAtk.x - this.x, this.roboToAtk.y - this.y);
            }
        }
/*
        if (this.phase == "attack"){
            console.log("ATTACKING");
            console.log(this.unique_id);
            if (Math.sqrt((this.roboToAtk.y - this.y)**2 + (this.roboToAtk.x - this.x)**2) <= this.atkDistance){
                this.rotation = Math.atan2(this.roboToAtk.x - this.x, this.roboToAtk.y - this.y);
            }else{
                this.phase = "seek";
            }

        }*/ //we don't want this, because we only want to call the attack function once for every attack mode, and then the attack checking (actual attack at every interval

        //note that it's possible to go a phase without attacking. i think that's fine. maybe even a "stylistic choice".
    }

    attack(){
        if (this.model == "6") this.leftAtk = true;
        this.attackDetails(); //i guess functions are also this.    
        setTimeout(()=> {
            this.intervalId = setInterval(this.attackDetails.bind(this), 875);
        }, 380)
      
         //do this every three seconds.
        //do we still need .bind(this) if it's not in the constructor?
    }

    attackDetails(){
        //if we're in here and we're model 8, we have to do things differently. 
        //we're in here because we know that at least ONE robot exists that we should be attacking. instead of just attacking that individual robot, though
        //we have got to attack any robot in the nearby area that's an enemy. 
       //  this.rotation = Math.atan2(this.roboToAtk.x - this.x, this.roboToAtk.y - this.y);
/*
        if (this.model == "8"){
            let atkArr= this.sMap.get(this.x, this.y, 'seek'); //even though we're not in seek, this works.
            let enemyAtkArr = [];
            atkArr.forEach(possEnemy => {
                let possEnemyObj = this.allObjs[possEnemy.unique_id]
                if((  possEnemyObj.type == "robot" || possEnemyObj.type == "player") && (possEnemyObj.soc_id != this.soc_id) && (Math.sqrt((possEnemyObj.y - this.y)**2 + (possEnemyObj.x - this.x)**2) <= this.atkDistance)){//)
                    enemyAtkArr.push(possEnemyObj);
            }});
            
            if (enemyAtkArr.length == 0){
                console.log("zeero")

                this.phase == "seek";
            }else{
                console.log("NON-0")
                
                if (!this.roboToAtk){
                    //then, we must find the next smallest distance guy.
                }
                let pureRot = Math.atan2(this.roboToAtk.y - this.y, this.roboToAtk.x - this.x);
                let extraVertX = Math.cos((pureRot))*1.5//*0.85
                let extraVertY = Math.sin((pureRot))*1.5
                let extraHorizX = -Math.cos((pureRot-Math.PI/2))*2; 
                let extraHorizY = -Math.sin((pureRot-Math.PI/2))*2;
                let startZ = 15.5;
                enemyAtkArr.forEach(enemy => {
                    let projUuid = uuidv4();
                    let startX = this.x + extraVertX + extraHorizX;
                    let startY = this.y + extraVertY + extraHorizY;
                    let projectile = new Projectile(startX, startY, startZ, enemy.x, enemy.y, this.dmg, this.projSpeed, this.soc_id,  projUuid, this.allObjs, this.projectiles, this.model, this.unique_id, this.sMap); //startX, startY, endX, endY -- note that each projectile won't necessarily hit the enemy., dmg for if/when we hit.
                    //console.log(this.projectiles);
                    console.log("///")
                    this.projectiles[projUuid] = projectile;
                    this.allObjs[projUuid] = projectile;
                    this.sMap.insert(this.x, this.y, 1, 1, projUuid); //now update.
                })
            }

        }else{*/ 

            if (!this.roboToAtk || !this.allObjs[this.roboToAtk.unique_id]){ //meaning it was removed...        
                    //delete this.roboToAtk.regAtkedObj[this.unique_id];
                    this.phase = "seek";
                    this.animation = "Idle";
                    clearInterval(this.intervalId);
            }else{
                if (Math.sqrt((this.roboToAtk.y - this.y)**2 + (this.roboToAtk.x - this.x)**2) <= this.atkDistance){
                    this.rotation = Math.atan2(this.roboToAtk.x - this.x, this.roboToAtk.y - this.y);
                    if (this.model != "1" && this.model != "4" && this.model != "7" ){
                        let pureRot = Math.atan2(this.roboToAtk.y - this.y, this.roboToAtk.x - this.x);
                        let projUuid = uuidv4();
        
                        let extraVertX = 0;
                        let extraVertY = 0;
                        let extraHorizX = 0;
                        let extraHorizY = 0;
        
                        //they go together by 2 for vert and horiz respectively.
                        let vertXUnit = Math.cos((pureRot))//Math.sqrt((Math.cos(this.rotation)**2 + Math.sin(this.rotation)**2))// - Math.PI/2))
                        let vertYUnit = Math.sin((pureRot))//Math.sqrt((Math.cos(this.rotation)**2 + Math.sin(this.rotation)**2))// - Math.PI/2))
                        let horizXUnit = Math.cos((pureRot-Math.PI/2))//Math.sqrt((Math.cos(this.rotation-Math.PI/2)**2 + Math.sin(this.rotation-Math.PI/2)**2))// - Math.PI/2))
                        let horizYUnit = Math.sin((pureRot-Math.PI/2))//Math.sqrt((Math.cos(this.rotation-Math.PI/2)**2 + Math.sin(this.rotation-Math.PI/2    )**2))// - Math.PI/2))
                        /*console.log(this.rotation);
                        console.log(this.x);
                        console.log(this.y);
                        console.log(this.roboToAtk.x)
                        console.log(this.roboToAtk.y);
                        console.log("AA");
                        console.log(extraVertX);
                        console.log(extraVertY);*/
                        let startZ = 0;
                        switch(this.model){
                            case "2":
                                extraVertX = 2*vertXUnit//*0.85
                                extraVertY = 2*vertYUnit//*0.85;
                                extraHorizX = -horizXUnit*0.5; //scaled by 0.2 remember that pairs should always be scaled by the same amount for each. 
                                extraHorizY = -horizYUnit*0.5;
                                startZ = 3.9
                            /*
                               console.log("loggin");
                               console.log(extraVertX);
                               console.log(extraVertY);
                               console.log(this.rotation);
                               console.log(this.x);
                               console.log(this.y);
                               console.log(this.roboToAtk.x);
                               console.log(this.roboToAtk.y);
                                */
                                break;
                            case "3":
                                extraVertX = vertXUnit*1.69//*0.85
                                extraVertY = vertYUnit*1.69//*0.85;
                                extraHorizX = -horizXUnit*0.53; //scaled by 0.2 remember that pairs should always be scaled by the same amount for each. 
                                extraHorizY = -horizYUnit*0.53;
                                //extraVertX = vertXUnit*0.2
                                //extraVertY = vertYUnit*0.2;
                                //extraHorizX = horizXUnit*4; //scaled by 0.2 remember that pairs should always be scaled by the same amount for each. 
                                //extraHorizY = horizYUnit*4;
                                startZ = 2.75
        
                                break;
                            case "5":
                                extraVertX = vertXUnit//*0.85
                                extraVertY = vertYUnit
                                extraHorizX = -horizXUnit*0.52; 
                                extraHorizY = -horizYUnit*0.52;
                                startZ = 4.05;
        
                                break;
                            case "6":
                                if (this.leftAtk){
                                    extraVertX = vertXUnit*2.45//*0.85
                                    extraVertY = vertYUnit*2.45
                                    extraHorizX = -horizXUnit*1.21; 
                                    extraHorizY = -horizYUnit*1.21;
                                    startZ = 3.4;
                                    this.leftAtk = false;
                                }else if (!this.leftAtk){
                                    extraVertX = vertXUnit*2.45//*0.85
                                    extraVertY = vertYUnit*2.45
                                    extraHorizX = horizXUnit*1.21; 
                                    extraHorizY = horizYUnit*1.21;
                                    startZ = 3.4;
                                    this.leftAtk = true;
                                }
        
                                break;
                            case "8":
                                extraVertX = vertXUnit*1.5//*0.85
                                extraVertY = vertYUnit*1.5
                                extraHorizX = -horizXUnit*2; 
                                extraHorizY = -horizYUnit*2;
                                startZ = 15.5;
        
                                break;
        
                        }
                        let startX = this.x + extraVertX + extraHorizX;
                        let startY = this.y + extraVertY + extraHorizY;
        
                        let projectile = new Projectile(startX, startY, startZ, this.roboToAtk.x, this.roboToAtk.y, this.dmg, this.projSize, this.projSpeed, this.soc_id,  projUuid, this.allObjs, this.projectiles, this.model, this.unique_id, this.sMap); //startX, startY, endX, endY -- note that each projectile won't necessarily hit the enemy., dmg for if/when we hit.
                        //console.log(this.projectiles);
                        //console.log("///")
                        this.projectiles[projUuid] = projectile;
                        this.allObjs[projUuid] = projectile;
                        this.sMap.insert(this.x, this.y, 1, 1, projUuid); //now update.
                    }else{// if (this.model == "1" || this.model == "4" || this.model == "7"){ //model must be 1 or 4.
                            this.roboToAtk.hp -= this.dmg;
                    }
                }else{
                    delete this.roboToAtk.regAtkedObj[this.unique_id];
                    this.phase = "seek";
                    this.animation = "Idle";
                    //will this be a problem doing this in the setInterval? I don't think so, it just means we won't have any interval anymore.
                    clearInterval(this.intervalId); //also this should be fine (for existence) because the intervalId should exist no matter what at this point.
                }
          //  }
            }
        

    }

    infoPack(){
       // console.log("RETURNING MODEL");
      // // console.log(this.model);
      //c console.log(this.rotation)
        return {
            type: 'robot',

            unique_id: this.unique_id,
            //playerType: this.playerType,
            animation: this.animation,
            rotation: this.rotation,//-Math.PI/2,
            model: this.model,
            hp: this.hp,
            dmg: this.dmg,
            x : this.x,
            y: this.y
        }
    }

    regNullify(){
        this.roboToAtk = null;
    }

    onDeath(){
        this.sMap.deleteBeing(this.unique_id);
        delete this.allObjs[this.unique_id];
        delete this.robots[this.unique_id];      
        Object.values(this.regAtkedObj).forEach(robot=>robot.regNullify());
        this.regAtkedObj = {}; //this shouldn't be necessary.
        if(this.phase == "attack"){ //i'm worried that the function might still be running even if it no longer exists.. it's like a weird reference to itself situation.
            clearInterval(this.intervalId);
        }
    }

    addChip(chip){
        //dealing with the old active chip, and undoing whatever it did.
        switch(activeChip){
            case "1":
                break;
            case "2":
                break;
            case "3":
                break;
            case "4":
                break;
            case "5":
                break;
            case "6":
                break;
            case "7":
                break;
            case "8":
                break;
            case "9":
                break;
            case "10":
                break;
            case "11":
                break;
            case "12":
                break;
        }
        //dealing with the new active chip, and doing whatever it should do.
        this.activeChip = chip;
        switch(activeChip){
            case "1":
                break;
            case "2":
                break;
            case "3":
                break;
            case "4":
                break;
            case "5":
                break;
            case "6":
                break;
            case "7":
                break;
            case "8":
                break;
            case "9":
                break;
            case "10":
                break;
            case "11":
                break;
            case "12":
                break;
        }

    }
}

module.exports = Robot;