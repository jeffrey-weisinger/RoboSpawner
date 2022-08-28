//code directly from SimonDev.

class SpatialHashMap{

    constructor(xboundLow, xboundHigh, yboundLow, yboundHigh, xCellSize, yCellSize){
        this.beingMap = new Map();//we're not going to access it that much, so who cares that we're using a map.
        this.xboundLow = xboundLow;
        this.xboundHigh = xboundHigh;
        this.yboundLow = yboundLow;
        this.yboundHigh = yboundHigh;

        this.xCellSize = xCellSize;
        this.yCellSize = yCellSize;
        this.horizCellCount = Math.ceil(xboundHigh/xCellSize); //starting at 1, how many are there horizontally?
        this.vertCellCount = Math.ceil(yboundHigh/yCellSize);
        this.world = [...Array(this.horizCellCount)].map(_ => [...Array(this.vertCellCount)].map(_ => [])); //taken almost directly from simondev
        //there is going to be NOTHING x = 0 or y =0.
    }

    insert(x, y, xSize, ySize, unique_id){
        
        let {minCell, maxCell} = this.cellFinder(x, y, xSize, ySize);
        //console.log(minCell);
        //console.log(maxCell);
        //console.log("^^");
        let being = {
            unique_id:unique_id,
            x:x,
            y:y,
            xSize:xSize,
            ySize:ySize, 
            minCell:minCell,
            maxCell:maxCell,
            returnNumber:-1,

        }
        let posArr = [...Array(this.horizCellCount)].map(_ => [...Array(this.vertCellCount)]);//.map(_ => [])); //taken almost directly from simondev
       // console.log('insertion');

        for (let x = minCell[0]; x <= maxCell[0]; x++){
            for (let y = minCell[1]; y <= maxCell[1]; y++){
                let l = this.world[x][y].length
                //console.log("should be an array//");
                posArr[x][y] = l; //be cause we're pushing to the end, the length IS the index for after we've pushed.
                /*console.log("increment poslist and also world arr")
                console.log(unique_id);
                //console.log(posList);
                console.log("B For");
                console.log(this.world[x][y]);*/
                
                (this.world[x][y]).push(being);
                //console.log("Af tear");

             //   console.log(this.world[x][y])
               // console.log("_*_");
               // console.log(this.world[x][y]);

                //console.log(this.world[x][y]);
                //console.log("^^^^^^^^");
               // console.log("insert world");
              //  console.log(this.world[x][y]);
            }
        }
        being.posArr = posArr;
        this.beingMap.set(unique_id, being);
        
    }

    deleteBeing(unique_id){
       // console.log("REMOVING");
       // console.log(unique_id);
        let being = this.beingMap.get(unique_id);
        if (being){
            let posArr = being.posArr
           // console.log(posList);

            let traverseNum = 0;
            let minCell = being.minCell;
            let maxCell = being.maxCell;
           // console.log(minCell);
           // console.log(maxCell);
            for (let x = minCell[0]; x <= maxCell[0]; x++){
                for (let y = minCell[1]; y <= maxCell[1]; y++){
                    if (this.world[x][y].length == 0){
                        this.world[x][y] = [];
                    }else{
                        /*
                        console.log("before world")
                        console.log(this.world[x][y].length)
                        console.log(this.world[x][y]);*/
                        let storage = this.world[x][y][this.world[x][y].length-1]    
                      /*  this.world[x][y][this.world[x][y].length-1] = null;
                        console.log("inbetween world")
                        console.log(this.world[x][y]);
                        */
                        let positionInWorldArr;
                        if (posArr){
                            positionInWorldArr = posArr[x][y];
                        } 
                      //  console.log("positionInWorldArr");
                     //   console.log(positionInWorldArr);
                        if (this.world[x][y][this.world[x][y].length-1]  != null){
                            this.world[x][y][positionInWorldArr] = storage; //this gets rid of the being.
                        }
                        //let diffX = x - storage.minCell[0] +1;
                        //let diffY = y - storage.minCell[1] +1;
                        storage.posArr[x][y]  = positionInWorldArr; //assigning a new position.
                     //   console.log("after world")
                     //   console.log(this.world[x][y]);
                        this.world[x][y].pop() //popping last element which is null.
                    }
                   
                }
            }
        }
        
    }
/*
    findPossCollisions(x, y, xSize, ySize){
        possCollisionsArr = [];
        let minCell, maxCell = this.cellFinder(x, y, xSize, ySize);
        for (let x = minCell[0]; x < maxCell[0]; x++){
            for (let y = minCell[1]; y < maxCell[1]; y++){
                this.world[x][y].forEach(client => {
                    if (client.returnNumber == -1){
                        possCollisionsArr.push(client);
                        client.returnNumber = 1;
                    }

                });
            }
        }
        possCollisionsArr.forEach(client => client.returnNumber = -1);
        return possCollisionsArr;
    }
*/
    
    get(x, y, searchType){ //previously findView
        let viewReturnArr = [];
        let {minCell, maxCell} = this.cellFinder(x, y, 0, 0);
        //let clampXMin = (minCell[0]-3, this.xboundLow, this.xboundHigh);
        //let clampXMax = (maxCell[0]+3, this.xboundLow, this.xboundHigh);
        //let clampYMin = (minCell[0]-3, this.yboundLow, this.yboundHigh);
        //let clampYMax = (maxCell[0]+3, this.yboundLow, this.yboundHigh);
        let searchAmt;
        switch(searchType){
            case "find":
                searchAmt = 3;
                break;
            case "collision":
                searchAmt = 1;
                break;
            case "seek":
                searchAmt = 3;
                break;
                
        }

        let clampXMin = minCell[0]-searchAmt;
        let clampXMax = maxCell[0]+searchAmt;
        let clampYMin = minCell[0]-searchAmt;
        let clampYMax = maxCell[0]+searchAmt;
        //console.log("&&&&");
        /*
        console.log(minCell);
        console.log(maxCell);
        console.log(x);
        console.log(y);
        console.log(clampXMin);
        console.log(clampXMax);
        console.log(clampYMin);
        console.log(clampYMax);*/
       // console.log("in get");
        for (let x = clampXMin; x <= clampXMax; x++){
            for (let y = clampYMin; y <= clampYMax; y++){
                let client_arr = this.world[x][y];
                //nconsole.log(client_arr); 
                if (client_arr){
                    client_arr.forEach(client => {
                        // console.log("1");
                         if (client.returnNumber == -1){ //means we haven't returned it yet.
                           //console.log(client_arr)
                           viewReturnArr.push(client); 
                           client_arr.returnNumber = 1; //means that we havve returned it
                         }
                       });
                }

                
            }
        }
        viewReturnArr.forEach(client => client.returnNumber = -1); //just getting everything! and then putting it back how we found it.
        //console.log(viewReturnArr);
        return viewReturnArr;
    }


    findSeek(x, y, width, height){
        let viewReturnArr = [];
        let {minCell, maxCell} = this.cellFinder(x, y, width, height);
        //let clampXMin = (minCell[0]-3, this.xboundLow, this.xboundHigh);
        //let clampXMax = (maxCell[0]+3, this.xboundLow, this.xboundHigh);
        //let clampYMin = (minCell[0]-3, this.yboundLow, this.yboundHigh);
        //let clampYMax = (maxCell[0]+3, this.yboundLow, this.yboundHigh);

        let clampXMin = minCell[0]-2;
        let clampXMax = maxCell[0]+2;
        let clampYMin = minCell[0]-2;
        let clampYMax = maxCell[0]+2;
        //console.log("&&&&");
        /*
        console.log(minCell);
        console.log(maxCell);
        console.log(x);
        console.log(y);
        console.log(clampXMin);
        console.log(clampXMax);
        console.log(clampYMin);
        console.log(clampYMax);*/
        
        for (let x = clampXMin; x <= clampXMax; x++){
            for (let y = clampYMin; y <= clampYMax; y++){
                let client_arr = this.world[x][y];
                //nconsole.log(client_arr); 
                if (client_arr){
                    client_arr.forEach(client => {
                        // console.log("1");
                         if (client.returnNumber == -1){
                           //console.log(client_arr)
                           viewReturnArr.push(client);
                           client_arr.returnNumber = 1;
                         }
                       });
                }

                
            }
        }
        viewReturnArr.forEach(client => client.returnNumber = -1); //just getting everything! and then putting it back how we found it.
        //console.log(viewReturnArr);
        return viewReturnArr;   
    }

    cellFinder(x, y, xSize, ySize){
       // console.log(x);
       // console.log(y);
      //  console.log(xSize);
      // console.log(ySize);
      //  console.log('&&&');

        let minXPos = x-xSize;
        let minYPos = y-ySize;
        let maxXPos = x +xSize;
        let maxYPos = y + ySize;
        //note how we round up. this is because if something is 0-1, it should be considered cell 1. Likewise, if something is last-1 to last, it should be last cell.
        //all we're saying is -- if it's between 2 cells, we'll go w/ the # of the upper edge. this way, we just keep a pattern. it honestly doesn't matter too much as long as 
            //1.) we never use 0. that's just confusing
            //2.) we can access unique cells from all coordinates, and all coordinates return respective same cell each time. 
       // console.log(x);
      //  console.log(y);
     //   console.log("x + y");
        
        let minCell = [Math.ceil(minXPos/this.xCellSize), Math.ceil(minYPos/this.yCellSize)]; 
        let maxCell = [Math.ceil(maxXPos/this.xCellSize), Math.ceil(maxYPos/this.yCellSize)];
       // console.log(minCell);
        //console.log(maxCell);
        //console.log("66ADSAFA")
        return {minCell, maxCell};
    }

    update(newX, newY, unique_id, type, model){

        let being = this.beingMap.get(unique_id)
      /*  if (type == "projectile"){
            console.log("PREV BEEN");
            console.log(being.minCell);
            console.log(being.maxCell);
            console.log(newX);
            console.log(newY);

        }*/
        let {newMinCell, newMaxCell} = this.cellFinder(newX, newY, 1, 1);
        if (newMinCell == being.minCell && newMaxCell == being.maxCell){
            return;
        }else{
            this.deleteBeing(unique_id);
            this.insert(newX, newY, 1, 1, unique_id);
        }
        if (type == "robot" && model == "2"){

       // console.log("POST BEEN");
        //console.log(this.beingMap.get(unique_id).minCell);
        //console.log(this.beingMap.get(unique_id).maxCell);
        }
    }
} 
module.exports = SpatialHashMap;

  