
class Projectile{

    constructor(startX, startY, endX, endY, dmg, projSpeed, soc_id, unique_id, allObjs, projectiles, parent_unique_id, spatialHashMap){//spatialHashMap
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
        this.dmg = dmg;
        this.projSpeed = projSpeed;
        this.soc_id = soc_id;
        this.unique_id = unique_id;
        this.allObjs = allObjs;
        this.projectiles = projectiles;
        this.sMap = spatialHashMap;
        this.parent_unique_id = parent_unique_id;

       // this.sMap = spatialHashMap;

       //these are the starting positions.
        this.currentX = startX;
        this.currentY = startY;
        this.rotation = 0;
        this.type = "projectile" //really weird, when it was "Projectile", we wouldn't actually be able to get the projectile gltf, and it would use the one from the previous pass!!! look into this.

        this.length = Math.sqrt((this.startX - this.endX)**2 + (this.startY - this.endY)**2);


    }
    calculate(){ //no input necessary
        
        this.currentX -= ((this.startX - this.endX)/this.length)*this.projSpeed/10;
        this.currentY -= ((this.startY - this.endY)/this.length)*this.projSpeed/10;
        //first, figure out if there was a collision
        let possCollisions =  this.sMap.get(this.currentX, this.currentY, 'collision');
        let collisionFound = false;
        possCollisions.forEach(possCollision => {
            let possCollisionObj = this.allObjs[possCollision.unique_id]
            
                if (possCollisionObj && possCollisionObj.type != 'projectile' && !collisionFound && possCollisionObj.unique_id != this.parent_unique_id){ // use pythagorean theorem to get distance. we will consider the first object that has a distance of less than 0.4 to it as a collision.
                    /*console.log(possCollisionObj);
                    console.log(possCollisionObj.unique_id);
                    console.log(this.parent_unique_id);
                    console.log(this.allObjs[this.parent_unique_id]);*/
                    //console.log("parent logged");
                    let dist = Math.sqrt((this.currentX - possCollisionObj.x)**2 + (this.currentY - possCollisionObj.y)**2); //make special pythagorean theorem method.
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
           let dist = Math.sqrt((this.startX - this.currentX)**2 + (this.startY - this.currentY)**2);
            if (dist >= 35){ //if we've gone 35 units without a collision, then destroy the projectile. 
                delete this.allObjs[this.unique_id]
                delete this.projectiles[this.unique_id];
                this.sMap.deleteBeing(this.unique_id)

            }
        }


    }

    infoPack(){
        return {
            x: this.currentX,
            y: this.currentY,
            type: this.type,
            unique_id: this.unique_id,
            rotation: this.rotation
            //I'm assuming that if in "process.js" there are any non-entered fields those will just be null.
        }

    }
}

module.exports = Projectile