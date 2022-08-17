//Don't forget to update your spatial hashmap for robots, players, projectiles, and anything that can move!
const { times } = require("lodash");
const Projectile = require("./Projectile.js")
const { v4: uuidv4 } = require('uuid');

class Robot{
    constructor(x, y, rotation, animation, model, soc_id, uuid, parent, allObjs, projectiles, sMap){
        this.soc_id = soc_id;
        this.unique_id = uuid;
        this.rotation = rotation;
        this.animation = animation;
        this.model = model;
        this.x = x;
        this.y = y;
        this.parent = parent;
        if (model == 1){
            this.width = 1;
            this.height = 1; 
        }
        this.hp = 1;
        this.dmg = 20;
        this.phase = "seek";
        this.seekTarget;//must be enemy coords (which we will get) //note that we do this every turn, only for seek. no reason to store it in a global.
        this.commandTarget; //can be enemy, can be coords.
        this.type = "robot";
        this.atkDistance;
        this.roboToAtk;

        this.allObjs = allObjs;
        this.projectiles = projectiles;
       // console.log("this.projectiles");
       // console.log(this.projectiles);
        this.sMap = sMap;

        this.projSpeed;
        switch(this.model){
            case "1":
                this.atkDistance = 1;
                break;
            case "2":
                this.atkDistance = 3;
                this.range = 1.5;
                this.projSpeed = 1.5;
                break;
            case "3":
                this.atkDistance = 7;
                this.range = 3;
                this.projSpeed = 3;
                break;
            case "4":
                this.atkDistance = 1;
                break;
            case "5":
                this.atkDistance = 4;
                this.range = 3;
                this.projSpeed = 1;
                break;
        } 
        //note that this.projSpeed is only defined for those that have range. 
        //note that projSpeed is defined once above, because I don't want to run into the issue that there's a chance that projSpeed hasn't been defined.
        //same story at the end w/ atkDistance.


        //idea courtesy of stackOverflow 
        this.intervalId;
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
            console.log(this.unique_id);
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
                }else{
                   // console.log("AHHMM"); //we should go into full atk mode here.
                    this.phase = "attack";
                    this.animation = "Attack";
                    //this.rotation = Math.atan2(minObj.y - this.y, minObj.x - this.x); //we still want to rotate. this is mainly for bots that didn't get a chance to rotate since they were spawned so close to each other.
                    //console.log(this.unique_id);
                    this.rotation = Math.atan2(minObj.x - this.x, minObj.y - this.y);
                    console.log(this.x);
                    console.log(this.y);
                    this.roboToAtk = minObj;
                    this.attack(); //note that we only call this once per start of attack! because then we go into attack mode. (we already set phase to attack)

                }
            } else{ //a minObj doesn't exist.
                this.animation = "Idle"; //although, we're still in the seek phase. 
                //we will not atk.

            }
            //if we didn't find one, we still might have coords we can go closer to.
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
        this.attackDetails(); //i guess functions are also this.
        this.intervalId = setInterval(this.attackDetails.bind(this), 1650); //do this every three seconds.
        //do we still need .bind(this) if it's not in the constructor?
    }

    attackDetails(){
        if (Math.sqrt((this.roboToAtk.y - this.y)**2 + (this.roboToAtk.x - this.x)**2) <= this.atkDistance){
            this.rotation = Math.atan2(this.roboToAtk.x - this.x, this.roboToAtk.y - this.y);
            if (this.model == "2" || this.model == "3" || this.model == "5"){
                let projUuid = uuidv4();
                let projectile = new Projectile(this.x, this.y, this.roboToAtk.x, this.roboToAtk.y, this.dmg, this.projSpeed, this.soc_id,  projUuid, this.allObjs, this.projectiles, this.unique_id, this.sMap); //startX, startY, endX, endY -- note that each projectile won't necessarily hit the enemy., dmg for if/when we hit.
                console.log(this.projectiles);
                console.log("///")
                this.projectiles[projUuid] = projectile;
                this.allObjs[projUuid] = projectile;
                this.sMap.insert(this.x, this.y, 1, 1, projUuid); //now update.
            }else if (this.model == "1" || this.model == "4"){ //model must be 1 or 4.
                    this.roboToAtk.hp - this.dmg;
            }
        }else{
            this.phase = "seek";
            //will this be a problem doing this in the setInterval? I don't think so, it just means we won't have any interval anymore.
            clearInterval(this.intervalId); //also this should be fine (for existence) because the intervalId should exist no matter what at this point.
        }
    }

    infoPack(){
       // console.log("RETURNING MODEL");
       // console.log(this.model);
        return {
            type: 'robot',

            unique_id: this.unique_id,
            //playerType: this.playerType,
            animation: this.animation,
            rotation: this.rotation,
            model: this.model,
            hp: this.hp,
            dmg: this.dmg,
            x : this.x,
            y: this.y
        }
    }
}

module.exports = Robot;