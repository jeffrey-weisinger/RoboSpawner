
class Projectile{

    constructor(startX, startY, startZ, endX, endY, dmg, projSize, projSpeed, soc_id, unique_id, allObjs, projectiles, parentModel, parent_unique_id, spatialHashMap){//spatialHashMap
        //we need to determine what startX, startY, and startZ are for all 5 robots. (3 are pure melee)
        //ending coordinates should always just be the x and y coordinates. for z, it should be higher. 
        this.startX = startX; 
        this.startY = startY;
        this.startZ = startZ;

        this.endX = endX;
        this.endY = endY;
        this.endZ = 2;
        this.dmg = dmg;
        this.projSpeed = projSpeed;
        this.soc_id = soc_id;
        this.unique_id = unique_id;
        this.allObjs = allObjs;
        this.projectiles = projectiles;
        this.sMap = spatialHashMap;
        this.parent_unique_id = parent_unique_id;
        this.projSize = projSize;
        this.parentModel = parentModel;

       // this.sMap = spatialHashMap;

       //these are the starting positions.
        this.currentX = startX;
        this.currentY = startY;
        this.currentZ = startZ;
        this.rotation = 0;
        this.type = "projectile" //really weird, when it was "Projectile", we wouldn't actually be able to get the projectile gltf, and it would use the one from the previous pass!!! look into this.

        this.length = Math.sqrt((this.startX - this.endX)**2 + (this.startY - this.endY)**2 + (this.startZ - this.endZ)**2);


    }
    calculate(){ //no input necessary
        
        this.currentX -= ((this.startX - this.endX)/this.length)*this.projSpeed/10;
        this.currentY -= ((this.startY - this.endY)/this.length)*this.projSpeed/10;
        this.currentZ -= ((this.startZ - this.endZ)/this.length)*this.projSpeed/10;
        this.sMap.update(this.currentX, this.currentY, this.unique_id, 'projectile');
        if (this.currentZ <= 0){
            
            delete this.allObjs[this.unique_id]
            delete this.projectiles[this.unique_id];        
            this.sMap.deleteBeing(this.unique_id);

        }
        //first, figure out if there was a collision
        let possCollisions =  this.sMap.get(this.currentX, this.currentY, 'seek');
        let collisionFound = false;

       // console.log(possCollisions);
        //console.log("!!");
       // console.log(this.unique_id);
        //console.log(this.parent_unique_id);
      //  console.log
      
      //  console.log("nathaneil b");
        
        if(this.parentModel == "8"){
            possCollisions.forEach(col => {
              //  let type = this.allObjs[col.unique_id].type;//prints type of coll.
              //  console.log(type);
                if (this.allObjs[col.unique_id].type == 'robot' && this.allObjs[col.unique_id].model == "2"){
                    console.log("TWO");
                }
               // console.log(this.allObjs[col.unique_id].unique_id);

            })
        }
        possCollisions.forEach(possCollision => {
            let possCollisionObj = this.allObjs[possCollision.unique_id]
                //console.log("nathaniel b");
                /*if(this.parentModel == "8"){
                    console.log("nathatniel b");
                    console.log(possCollisionObj.unique_id);
                    console.log(this.allObjs[possCollisionObj.unique_id].type);
                    console.log(this.parent_unique_id);
                }*/
                if (possCollisionObj && possCollisionObj.type != 'projectile' && !collisionFound && possCollisionObj.unique_id != this.parent_unique_id){ // use pythagorean theorem to get distance. we will consider the first object that has a distance of less than 0.4 to it as a collision.
                    

                    /*console.log(possCollisionObj);
                    console.log(possCollisionObj.unique_id);
                    console.log(this.parent_unique_id);
                    console.log(this.allObjs[this.parent_unique_id]);*/
                    //console.log("parent logged");
                    let dist = Math.sqrt((this.currentX - possCollisionObj.x)**2 + (this.currentY - possCollisionObj.y)**2 ); //make special pythagorean theorem method.
                    /*if(this.parentModel == "8"){
                        console.log("======");
                       // console.log(this.unique_id);
                        console.log(possCollisionObj.unique_id);
                        console.log(this.allObjs[possCollisionObj.unique_id].type);
                        console.log(dist);
                        console.log("-------");
    
                    }*/

                  /*  console.log("DIST")
                    console.log(dist);
                    console.log(this.currentX);
                    console.log(this.currentY);
                    console.log(possCollisionObj.x);
                    console.log(possCollisionObj.y);
                    console.log(possCollisionObj);
                    console.log("NAN SHIT")
*/
                    if (dist == 'NaN'){
    

                    }
                    if (dist <= 0.6){//this means that it collided with the hitbox.
                        delete this.allObjs[this.unique_id]
                        delete this.projectiles[this.unique_id];
                        this.sMap.deleteBeing(this.unique_id)
                        //console.log("IN RANGE")
                        if (possCollisionObj.type == 'robot' || possCollisionObj.type == 'player'){ //otherwise, it just disappears on collision. and nothing happens.
                            //console.log(possCollisionObj.hp);
                            possCollisionObj.hp -= this.dmg;
                           // console.log(possCollisionObj.hp);
                            //console.log("-COLLISION-");
                           // console.log(possCollisionObj.hp);
                            //console.log("COLLIDED");
                            collisionFound = true;
                           // console.log(possCollisionObj.hp);
                        }
                    }
                }
            }
           
        )
        //second, distance check.
        if (!collisionFound){
           let dist = Math.sqrt((this.startX - this.currentX)**2 + (this.startY - this.currentY)**2 + (this.startZ - this.currentZ)**2);
            if (dist >= 35){ //if we've gone 35 units without a collision, then destroy the projectile. 
                delete this.allObjs[this.unique_id]
                delete this.projectiles[this.unique_id];
                this.sMap.deleteBeing(this.unique_id)

            }
        }


    }

    infoPack(){
        //console.log(this.currentZ);
        return {
            x: this.currentX,
            y: this.currentY,
            z: this.currentZ,
            type: this.type,
            unique_id: this.unique_id,
            rotation: this.rotation,
            projSize: this.projSize
            //I'm assuming that if in "process.js" there are any non-entered fields those will just be null.
        }

    }
}

module.exports = Projectile