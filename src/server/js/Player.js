class Player{
    constructor(x, y, rotation, animation, socket_id, uuid){
        this.soc_id = socket_id;
        this.uuid = uuid;
        //this.playerType = playerType;
        this.gravityFactor = 0;
        this.hp = 100;
        this.dmg = 10;
        this.x = x; // for starters.
        this.y = y; // for starters.
        this.animation = animation;
        this.rotation = rotation;
        this.speed = 5;
        this.currentMove = [];
    }
    infoPack(){
        //console.log("lahaasdff");
        //console.log("t --> " + this.currentMove);
        this.currentMove.forEach(key => {
            switch(key){
                case 'w':
                    this.y -= 0.3; //going w/ coords.
                    break;
                case 'a':
                    this.x -= 0.3;
                    break;
                case 's':
                    this.y += 0.3; 
                    break;
                        //i guess if it's not broken it'll also do what's below it??
                case 'd':
                    this.x += 0.3;
                    break;
            }
        }
        )
        //console.log("returning x :" + this.x);
        //console.log("returning y :" + this.y);
 
        return {
            type: 'player',

            unique_id: this.uuid,

            //playerType: this.playerType,
            animation: this.animation,
            rotation : this.rotation,
           // hp: this.hp,
            //dmg: this.dmg,
            x : this.x,
            y: this.y

      
        }
    }

       // console.log(this.x);
        //console.log(this.y);
       
    useGravity(){
        if (this.y < 500){
            this.y += this.gravityFactor;
        }else{
            this.gravityFactor = 0; //we're essentially performing a reset on gravity when it hits the ground.
            this.y = 500; //we don't want it running over.
        }
    }

    generateUnique(){
        this.unique_id;
    }

    currentPress(key){
        //key can't already be in there, because we'd remove it after it's been released. actually, they can if you tab out and then click in again.
        if (this.currentMove.indexOf(key) == -1) this.currentMove.push(key)
    }

    currentUnPress(key){
        let index = this.currentMove.indexOf(key)
        if (index != -1){
            this.currentMove.splice(index, 1);
        }
    }   

    mouseMove(x, y, canvasX, canvasY){
        //console.log(this.x + "x, " + this.y + "y ");
        //console.log(x + " - " + y);
        console.log("mouse_posX" + x);
        console.log("mouse_posY" + y);
        console.log("canvasX" + canvasX/2);
        console.log("canvasY" + canvasY/2       );

        x = x - canvasX/2;
        y = y - canvasY/2;
      //  console.log("MOVING MOUSE -- position before: x:" + x + " : y:" + y);

      console.log("new x: " + x);
      console.log("new y: " + y);
        this.rotation = Math.atan2(x, y)// + 180/Math.PI; //* (Math.PI/180) //- 90;
        console.log('new rotation!: ' + this.rotation);
        //cons  ole.log(this.degree);
    }

}
module.exports = Player;