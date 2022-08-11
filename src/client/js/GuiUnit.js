/* the methods in this class are either trigged by player input OR by 
 player input ==> server ==> information that comes back from server. 

 1.) Direct input is when
    -  we might swap two items in the inventory.
    
2.) indirect input:
anything that might make a difference on things that the server side would need to know should go in server-side.

    - We might select an item.
    - amps/damps
    - adding a chip.
    - adding/subtracting from gui (this could happen (adding) on-drag. this could happen (subtracting) on death.)

    do we want to have select server-checked? yes, just so it's chronological. when we see selected, we can know that it's selected on the server.

    Maybe we can have a map where we use a uuid to access this. 
*/
class GuiUnit{

    constructor(model, inventoryArr, activeArr){
        this.dmg;
        this.hp;

        this.speed;
        this.atkSpd;
        this.range;
        this.aoe;


        this.inventoryArrPos -1;
        this.activeArrPos = -1;
        this.inventoryArr = inventoryArr;
        this.activeArr = activeArr;




        switch(model){
            case "1":
                this.dmg = 5;
                this.hp = 25;
    
                this.speed = 3;
                this.atkSpd = 2;
                this.range = 1;
                this.aoe = 1;

            break;

            case "2":
                this.dmg = 3;
                this.hp = 20;

                this.speed = 2.5;
                this.atkSpd = 1;
                this.range = 2;
                this.aoe = 1;

            break;

            case "3":
                this.dmg = 2;
                this.hp = 15;

                this.speed = 1.5;
                this.atkSpd = 1;
                this.range = 2;
                this.aoe = 2;

            break;

            case "4":
                this.dmg = 2;
                this.hp = 40;

                this.speed = 2;
                this.atkSpd = 2;
                this.range = 1;
                this.aoe = 1;

            break;

            case "5":
                this.dmg = 5;
                this.hp = 20;

                this.speed = 3;
                this.atkSpd = 1;
                this.range = 2;
                this.aoe = 2;

            break;
        }
  
    }

    addToInventory(){
        //just to be safe, we might want to check here that it's not more than 10, even though we really should be checking it on the server. 
        
        this.inventoryArr
    }
    removeFromInventory(){

    }

    addToActive(){

    }
    removeFromActive(){

    }
    shiftActive(newPos){

    }

    swapActive(){

    }

    selectInActive(){

    }

    deSelectInActive(){

    }

    /*Note that updates are only for those in the active!! */
    updateDmg(){

    }

    updateHp(){

    }

    updateRange(){

    }

    updateAoe(){

    }

    updateSpeed(){

    }

    updateAttackSpeed(){

    }
    /**/
    removeCheck(){

    }
}
