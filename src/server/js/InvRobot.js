//the idea is for InvRobot to represent robots in the inventory. this is so we can keep the uuid/model 
//to make sure the robot really does exist when the player pings back that they've placed it.
class InvRobot{
    constructor(uuid, model){
        this.uuid = uuid;
        this.model = model;
    }
}
module.exports = InvRobot;