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
    }

    infoPack(){
        console.log("RETURNING MODEL");
        console.log(this.model);
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