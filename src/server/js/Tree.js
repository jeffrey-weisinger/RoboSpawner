class Tree{
    constructor(x, y, rotation, unique_id){
        this.type = 'tree';
        this.x = x;
        this.y = y;
        this.rotation = rotation;
        this.unique_id = unique_id;
    }
    infoPack(){
        return{
            x:this.x,
            y:this.y,
            rotation: this.rotation,
            type: this.type,
            unique_id: this.unique_id
        }
    }
}
module.exports = Tree;