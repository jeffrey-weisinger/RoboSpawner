class Chip{
    constructor(x, y, rotation, model, unique_id){
        this.x = x;
        this.y = y;
        this.rotation = rotation;
        this.model = model;
        this.unique_id = unique_id;
        this.type = "chip";
    }
    infoPack(){
        return {
            x: this.x,
            y: this.y,
            rotation: this.rotation,   
            model: this.model,
            unique_id: this.unique_id,
            type: this.type
        }
    }
}

module.exports = Chip