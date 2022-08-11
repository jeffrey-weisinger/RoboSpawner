class Player{
    constructor(x, y, rotation, animation, socket_id, unique_id){
        this.gears = 25; //this is the starting value.
        this.soc_id = socket_id;
        this.unique_id = unique_id;
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
        this.invRobots = {};
        this.orbRot = 0;
        this.orbitXVert = 0;//idk what these two start at..
        this.orbitYVert = 0;
        this.orbitXHoriz =0;
        this.orbitYHoriz = 0;

        setInterval(this.printOrbits.bind(this), 2000);

    }
    infoPack(){
        //console.log("lahaasdff");
        //console.log("t --> " + this.currentMove);
        //first, we need the unit vector
        let vertLength;
        let horizLength;

        let newOrbitXVert;
        let newOrbitYVert;
        let newOrbitXHoriz;
        let newOrbitYHoriz;
        //console.log(vertLength);
        vertLength = (this.orbitXVert)**2 + (this.orbitYVert)**2
        horizLength = (this.orbitXHoriz)**2 + (this.orbitYHoriz)**2
        if (vertLength != 0){
            newOrbitXVert = this.orbitXVert/vertLength/3
            newOrbitYVert = this.orbitYVert/vertLength/3
        }
        if (horizLength != 0){
            newOrbitXHoriz = this.orbitXHoriz/horizLength/3
            newOrbitYHoriz = this.orbitYHoriz/horizLength/3
            //console.log(newOrbitX);
           // console.log(newOrbitY);
 
        }
        if (newOrbitXVert == undefined || newOrbitYVert == undefined){
            /*console.log('susss');
            console.log(this.orbitX);
            console.log(this.orbitY);
            console.log(length);
            console.log(this.orbitX/length);
            console.log(this.orbitY/length);*/
            newOrbitXVert = 0;
            newOrbitYVert = 0;
        }
        if (newOrbitXHoriz == undefined || newOrbitYHoriz == undefined){
            /*console.log('susss');
            console.log(this.orbitX);
            console.log(this.orbitY);
            console.log(length);
            console.log(this.orbitX/length);
            console.log(this.orbitY/length);*/
            newOrbitXHoriz = 0;
            newOrbitYHoriz = 0;
        }

        this.currentMove.forEach(key => {
            switch(key){
                case 'w':
                    console.log("LENGTHS");
                    console.log(vertLength);
                    console.log(horizLength);
                    console.log("HORIZ X AND Y");
                    console.log(this.orbitXHoriz);
                    console.log(this.orbitYHoriz);
                    console.log("VERT X AND Y");

                    console.log(this.orbitXVert);
                    console.log(this.orbitYVert);


                    console.log("NEW VERTS");
                    console.log(newOrbitXVert);
                    console.log(newOrbitYVert)
                   //this.x -= newOrbitX;
                    this.y -= newOrbitYVert;
                    this.x -= newOrbitXVert;

                  //  this.y -= 0.3; //going w/ coords.
                    break;
                case 'a': 
                    this.y += newOrbitYHoriz;
                    this.x += newOrbitXHoriz;
                    break;
                case 's':
                    this.y += newOrbitYVert;
                    this.x += newOrbitXVert; 
 


                  // this.x += newOrbitX;
                 //  this.y += newOrbitY;
                    break;
                        //i guess if it's not broken it'll also do what's below it??
                case 'd':
                    this.y -= newOrbitYHoriz;
                    this.x -= newOrbitXHoriz; 
                    break;
            }
        }
        )
        //console.log("returning x :" + this.x);
        //console.log("returning y :" + this.y);
 
        return {
            type: 'player',

            unique_id: this.unique_id,

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
        this.rotation = this.orbRot + Math.atan2(x, y)// + 180/Math.PI; //* (Math.PI/180) //- 90;
        console.log('new rotation!: ' + this.rotation);
        //cons  ole.log(this.degree);
    }

    updateDirection(z, other){ 
        this.orbRot = z;
        this.orbitXVert = Math.cos(-z+Math.PI/2);// -0.5;
        this.orbitYVert = Math.sin(-z+Math.PI/2); //-0.5;
        this.orbitXHoriz = Math.cos(-z -Math.PI);
        this.orbitYHoriz = Math.sin(-z - Math.PI);
        /*if (y >= -Math.PI/2 && y <= Math.PI/2){
            this.orbitY = Math.asin(y); //-0.5;
        }else if (y <= Math.PI){
            this.orbitY = Math.asin(y - Math.PI/2); 
        }else{
            this.orbitY = Math.asin(y + Math.PI/2); 

        }*/

    }
    printOrbits(){/*
        console.log("rot:");
        console.log(this.orbRot);
        console.log("orbits in radians:");
        console.log(this.orbitXVert);
        console.log(this.orbitYVert);
        console.log(this.orbitXHoriz);
        console.log(this.orbitYHoriz);
        console.log("orbits in degrees:"); 
        console.log(this.orbitXVert * 180/Math.PI);
        console.log(this.orbitYVert * 180/Math.PI);
        console.log(this.orbitXHoriz * 180/Math.PI);
        console.log(this.orbitYHoriz * 180/Math.PI);*/

       // console.log(this.x);
       // console.log(this.y);
       // console.log("-----")
    }

}
module.exports = Player;