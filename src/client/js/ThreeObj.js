class ThreeObj{   
    constructor(unique_id, type, actionArray, animation, mixer, label){//}, twoDRenderer){
        this.type = type;
        this.mixer = mixer;
        this.actionArray = actionArray;
        this.currentAnimationName;
        this.unique_id = unique_id;
        this.checked = true; //because we don't want it being deleted on the pass after creation.
        console.log("suspect");
        console.log(animation);
        console.log(type);
        console.log(actionArray);
        this.updateAnimation(animation); //this way, we can actually update the new animation to be this.currentAnimation;
      //  this.twoDRenderer = twoDRenderer;
        this.label = label;

        //we should first initialize the health bar here. it's literally going to be a div inside a div which has absolute positioning. 
        //note that we should have a "death" phase for each robot where you can see it losing all its health, because if we don't, then the robots 
        //will appear to just glitch and be removed from the game. 
        this.outerHealth = $("<div></div>").addClass("outerHealth");
        this.innerHealth = $("<div></div>").addClass("innerHealth");
        this.outerHealth.append(this.innerHealth)
        //$("body").append(this.outerHealth);
       // this.twoDRenderer
        //the outerHealth element is specific to this. i'm pretty sure that if we delete it, we will delete the entire health bar.
        
    }

    
    updateX(beingX, playerX){ //changes on playerX. Returns it for this specific screen.
       // return (this.x - playerX); //gets the distance to the right that the player is. (positive)
       this.x = beingX;
       this.mixer._root.position.x = beingX-playerX;
/*
       let canvasWidth = ($("canvas")[1].style.width)
       canvasWidth = (canvasWidth.substring(0, canvasWidth.length - 2)) //+ 8;
        console.log(parseInt(canvasWidth)/2 + beingX-playerX + "px");
       //this.outerHealth.css({"left":`${parseInt(canvasWidth)/2 + beingX-playerX}` + "px"}); //maybe.
       this.outerHealth.css({"left": parseInt(canvasWidth)/2 + beingX-playerX - 35 + "px  "});//subtract half the width;
      // this.outerHealth.css("top", "200"); //why is this css not working?
        console.log(this.outerHealth);
        console.log("^");*/

       //we can update the health bar's x here too.
    } 
    updateY(beingY, playerY){ //changes based on playerY
        //return (this.y - playerY) //gets the distance up the player is but it returns negative units, which is what we want.
        this.y = beingY;
        this.mixer._root.position.z = beingY-playerY; //i guess we have to make this z??
       /* console.log(this.mixer);
        console.log("^MIXER");
       // let zeroVec = new THREE.Vector3(0,0,0);
        let beingVec = (this.mixer._root.position);//yes, you can get x/y/z out of this like normal but this is a vector. 

        //beingVec.project(camera);
        //let distAB = zeroVec.sub(beingVec).length;
        //console.log(zeroVec);
       // console.log(beingVec);
        //console.log(distAB);
        //we can update the health bar's y here too.

        let canvasHeight = ($("canvas")[1].style.height)//.substring(0, canvasHeight.length - 2)
        canvasHeight = (canvasHeight.substring(0, canvasHeight.length - 2))///2;
        console.log(parseInt(canvasHeight)/2 -10 + "px");

        this.outerHealth.css({"top":parseInt(canvasHeight)/2 + beingY-playerY+ 75 + "px"});//the beingY - playerY is just for offsets from the player!
        //the first part is just to get it in the middle of the canvas. note that the player's actual position is probably nowhere near where he is on the screen.
        //the canvas height/width is more meta, and gets the screen in pixels.  */


    }

    updateHealth(hp){
        //this should update health directly by changing the css of the health object which is global.
    }

    updateRot(beingRot){
        this.rot = beingRot;
        /*console.log("LOGGING ROOT ROT");
        console.log(this.mixer._root.rotation);
        console.log(this.mixer);
        console.log("^mixer!!")*/
        //this.mixer._root.rotation._y = beingRot;
        //being rot conversion!
        beingRotRadians = beingRot * Math.PI / 180;

        this.mixer._root.rotation.set(0, beingRot, 0);
        //this.mixer._root.rotation._y = 1;
    }



    getRot(){ //changes based on playerRot.
        return this.rotation;
    }

    getObj(){
        console.log(this.mixer); 
        console.log("oompa lom[a dopaetadtaoo")
        return this.mixer._root;
    }

    setHP(newHP){
        console.log(newHP);
        console.log(newHP/100*70);
        this.label.children[0].style["width"] = (newHP/100*70)+ "px";
        console.log(this.label.children[0].style.width);
    }   
    updateAnimation(newAnimationName){
        //console.log("UPDATING");
        //console.log(newAnimationName)  ;
        //console.log(this.currentAnimationName);
        //console.log("are these different!")
        //console.log("<5.1>, " + newAnimationName)
        if (this.currentAnimationName != newAnimationName){ // if it doesn't exist or they don't match
            this.mixer.stopAllAction();
            console.log("CHANGE OF ANIMATION");   
            switch( newAnimationName){
                case "Idle":
                    this.actionArray[0].play();
                    this.currentAnimationName = "Idle";
                    break;
                case "Run":
                    this.actionArray[1].play();
                    this.currentAnimationName = "Run";
                    console.log("we are runnning?");
                    break; 
                case "Attack":
                    this.currentAnimationName = "Attack"
                    this.actionArray[2].play();
                    console.log("ATTAAAACK");
                    break;
                case "Super":
                    this.currentAnimationName = "Super";
                    this.actionArray[3].play();
                    break;
            }
        }
    }


}  
module.exports = ThreeObj;