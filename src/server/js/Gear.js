class Gear{
    constructor(unique_id, x, y, rotation){
        this.unique_id = unique_id;
        this.x = x;
        this.y = y;
        this.type = "gear";
        this.rotation = rotation;
        this.animation = "Idle";
    }

    infoPack(){
        return {
            type : this.type,
            unique_id : this.unique_id,
            x : this.x,
            y : this.y,
            rotation : this.rotation
        }

    }

}

module.exports = Gear;