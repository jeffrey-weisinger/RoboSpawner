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
        let posList  = [];
        console.log('-----=');

        for (let x = minCell[0]; x <= maxCell[0]; x++){
            for (let y = minCell[1]; y <= maxCell[1]; y++){
                let l = this.world[x][y].length
                //console.log("should be an array//");
                posList.push(l); //be cause we're pushing to the end, the length IS the index for after we've pushed.
                (this.world[x][y]).push(being);
               // console.log(this.world[x][y]);

                //console.log(this.world[x][y]);
                //console.log("^^^^^^^^");
            }
        }
        being.posList = posList;
        this.beingMap.set(unique_id, being); 
        
    }

    deleteBeing(unique_id){
        let being = this.beingMap.get(unique_id);
        if (being){
            posList = being.posList
            let traverseNum = 0;
            for (let x = minCell[0]; x < maxCell[0]; x++){
                for (let y = minCell[1]; y < maxCell[1]; y++){
                    storage = this.world[x][y][this.world[x][y].length-1]
                    this.world[x][y][this.world[x][y].length-1] = null;
                    this.world[x][y][posList[traverseNum++]] = storage; //this gets rid of the being.
                }
            }
        }
        
    }

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

    findView(x, y){
        let viewReturnArr = [];
        let {minCell, maxCell} = this.cellFinder(x, y, 0, 0);
        //let clampXMin = (minCell[0]-3, this.xboundLow, this.xboundHigh);
        //let clampXMax = (maxCell[0]+3, this.xboundLow, this.xboundHigh);
        //let clampYMin = (minCell[0]-3, this.yboundLow, this.yboundHigh);
        //let clampYMax = (maxCell[0]+3, this.yboundLow, this.yboundHigh);

        let clampXMin = minCell[0]-3;
        let clampXMax = maxCell[0]+3;
        let clampYMin = minCell[0]-3;
        let clampYMax = maxCell[0]+3;
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
} 
module.exports = SpatialHashMap;

  