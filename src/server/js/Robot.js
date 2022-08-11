class Robot{
    constructor(x, y, rotation, animation, model, soc_id, uuid, parent){
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
        this.dmg = 2;
        this.phase = "seek";
        this.seekTarget;//must be enemy coords (which we will get)
        this.commandTarget; //can be enemy, can be coords.
        this.type = "robot";

    }

    act(sMap, allObjs){
        let atkArr= sMap.findSeek(this.x, this.y, 1, 1);
        if (this.phase == "seek") {
            //console.log("A");
            let minDistance = Number.MAX_SAFE_INTEGER;
            let minObj;
            atkArr.forEach(being => {
                //console.log("BEING")
                //console.log(being);
                let beingObj = allObjs[being.unique_id];
                //xconsole.log(beingObj);
                if (beingObj.type == "robot" || beingObj.type == "player"){
                    //console.log("B")
                    if (beingObj.soc_id != this.soc_id){//enemy
                        let currentDistance = (beingObj.y - this.y) - (beingObj.x - this.x);
                        if(currentDistance <= minDistance){
                            minDistance = currentDistance;
                            minObj = beingObj;
                            
                        }
                    }
                }
            })
           // console.log(minObj);
            //by now, we should have a min object w/ min distance.
            if (minObj){ 
                    this.x -= (this.x - minObj.x) / Math.sqrt((this.x - minObj.x)**2 + (this.y - minObj.y)**2)/30
                    this.y -= (this.y - minObj.y) / Math.sqrt((this.x - minObj.x)**2 + (this.y - minObj.y)**2)/30
            } 
            //if we didn't find one, we still might have coords we can go closer to.
        }

        if (this.phase == "attack"){

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