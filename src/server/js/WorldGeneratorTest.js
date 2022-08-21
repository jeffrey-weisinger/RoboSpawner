const { v4: uuidv4 } = require('uuid');
const Player = require('./Player'); //remember that these are the classes, not the objects.
const Robot = require('./Robot');
const Gear = require('./Gear');
const Chip = require('./Chip');

class WorldGeneratorTest{
    constructor(spatialHashMap, playerObj, roboObj, buildObj, items, projectiles, allObjs){

        this.sMap = spatialHashMap;
        this.playerObj = playerObj;
        this.roboObj = roboObj;
        this.buildObj = buildObj; 
        this.allObjs = allObjs;
        this.projectiles = projectiles;

        this.items = items;
    }
    wGen1(){
        
        console.log("WORLD GEN");
        /*
        let uuid1 = uuidv4();
        let robo1_1 = new Robot(510, 510, 0, "Run", "2", null, uuid1, null);
        this.roboObj[uuid1] = robo1_1
        this.allObj[uuid1] = robo1_1
        //equivalent to a direct insertion.
        this.sMap.insert(505, 505, 1, 1, uuid1) ;
*/
 /*       
        let uuid2 = uuidv4();
        let robo2 = new Robot(505, 505, 0, "Run", "2", null, uuid2, null, this.allObjs, this.projectiles, this.sMap);
        this.roboObj[uuid2] = robo2;
        this.allObjs[uuid2] = robo2;
        this.sMap.insert(505, 505, 1, 1, uuid2);
*//*
        let uuid10 = uuidv4();
        let robo10 = new Robot(495, 495, 0, 'Run', "5", null, uuid10, null, this.allObjs, this.projectiles, this.sMap)
        this.roboObj[uuid10] = robo10;
        this.allObjs[uuid10] = robo10;
        this.sMap.insert(490, 490, 1, 1, uuid10 );
        */
       /*
        let uuid3 = uuidv4();
        let chip1 = new Chip(490, 490, 0, "10", uuid3);
        this.items[uuid3] = chip1;
        this.allObjs[uuid3] = chip1;
        this.sMap.insert(502, 502, 1, 1, uuid3);

        let uuid4 = uuidv4();
        let chip2 = new Chip(495, 490, 0, "1", uuid4);
        this.items[uuid4] = chip2;
        this.allObjs[uuid4] = chip2;
        this.sMap.insert(502, 502, 1, 1, uuid4);
 
        let uuid5 = uuidv4();
        let chip3 = new Chip(498, 490, 0, "5", uuid5);
        this.items[uuid5] = chip3;
        this.allObjs[uuid5] = chip3;
        this.sMap.insert(502, 502, 1, 1, uuid5);*/
/*
        let uuid11 = uuidv4();
        let robo11 = new Robot(495, 495, 0, 'Run', "6", null, uuid11, null, this.allObjs, this.projectiles, this.sMap)
        this.roboObj[uuid11] = robo11;
        this.allObjs[uuid11] = robo11;
        this.sMap.insert(490, 490, 1, 1, uuid11 );

*/
      /*  let uuid12 = uuidv4();
        let robo12 = new Robot(500, 495, 0, 'Attack', "7", null, uuid12, null, this.allObjs, this.projectiles, this.sMap)
        this.roboObj[uuid12] = robo12;
        this.allObjs[uuid12] = robo12;
        this.sMap.insert(490, 490, 1, 1, uuid12 );*/

        let uuid13 = uuidv4();
        let robo13 = new Robot(505, 495, 0, 'Run', "8", null, uuid13, null, this.allObjs, this.projectiles, this.sMap)
        this.roboObj[uuid13] = robo13;
        this.allObjs[uuid13] = robo13;
        this.sMap.insert(490, 490, 1, 1, uuid13 );
/*

        let uuid2 = uuidv4();
        let robo2 = new Robot(505, 505, 0, "Run", "2", null, uuid2, null);
        this.roboObj[uuid2] = robo2
        this.allObj[uuid2] = robo2
        this.sMap.insert(505, 505, 1, 1, uuid2);

        let uuid3 = uuidv4();
        let gear1 = new Gear(uuid3, 502, 502, 0);
        this.sMap.insert(505, 505, 1, 1, uuid3);
        this.items[uuid3] = gear1;
        this.allObj[uuid3] = gear1;

        let uuid4 = uuidv4();
        let gear2 = new Gear(uuid4, 502, 502, 0);
        this.sMap.insert(505, 505, 1, 1, uuid4);
        this.items[uuid4] = gear2;
        this.allObj[uuid4] = gear2;*/
 
        /*
        let uuid3 = uuidv4();
        let robo3 = new Robot(502, 502, 0, 'Run', "3", null, uuid3, null)
        this.playerObj[uuid3] = robo3;
        this.allObj[uuid3] = robo3;
        this.sMap.insert(502, 502, 1, 1, uuid3);

        let uuid4 = uuidv4();
        let robo4 = new Robot(510, 510, 0, 'Run', "4", null, uuid4, null)
        this.playerObj[uuid4] = robo4;
        this.allObj[uuid4] = robo4;
        this.sMap.insert(510, 510, 1, 1, uuid4);

        let uuid5 = uuidv4();
        let robo5 = new Robot(512, 505, 0, 'Run', "5", null, uuid5, null)
        this.playerObj[uuid5] = robo5;
        this.allObj[uuid5] = robo5;
        this.sMap.insert(512, 505, 1, 1, uuid5);
    
        let uuid6 = uuidv4();
        let robo6 = new Robot(495, 495, 0, 'Run', "1", null, uuid6, null)
        this.playerObj[uuid6] = robo6;
        this.allObj[uuid6] = robo6;
        this.sMap.insert(495, 495, 1, 1, uuid6);*/
      /*
        let uuid7 = uuidv4();
        let robo7 = new Robot(516, 505, 0, 'Run', "1", null, uuid7, null)
        this.playerObj[uuid7] = robo7;
        this.allObj[uuid7] = robo7;
        this.sMap.insert(515, 495, 1, 1, uuid7);
        
        let uuid8 = uuidv4();
        let robo8= new Robot(518, 505, 0, 'Run', "3", null, uuid8, null)
        this.playerObj[uuid8] = robo8;
        this.allObj[uuid8] = robo8;
        this.sMap.insert(515, 495, 1, 1, uuid8);
        
        let uuid9 = uuidv4();
        let robo9 = new Robot(520, 505, 0, 'Run', "1", null, uuid9, null)
        this.playerObj[uuid9] = robo9;
        this.allObj[uuid9] = robo9;
        this.sMap.insert(515, 495, 1, 1, uuid9);*/

     /*   
        let uuid11 = uuidv4();
        let robo11 = new Robot(522, 505, 0, 'Run', "2", null, uuid11, null)
        this.playerObj[uuid11] = robo11;
        this.allObj[uuid11] = robo11;
        this.sMap.insert(524, 495, 1, 1, uuid11 );
/*
        let uuid12 = uuidv4();
        let robo12 = new Robot(524, 505, 0, 'Run', "2", null, uuid12, null)
        this.playerObj[uuid12] = robo12;
        this.allObj[uuid12] = robo12;
        this.sMap.insert(524, 495, 1, 1, uuid12 );

        let uuid13 = uuidv4();
        let robo13 = new Robot(526, 505, 0, 'Run', "2", null, uuid13, null)
        this.playerObj[uuid13] = robo13;
        this.allObj[uuid13] = robo13;
        this.sMap.insert(524, 495, 1, 1, uuid13 );

        let uuid14 = uuidv4();
        let robo14 = new Robot(522, 503, 0, 'Run', "2", null, uuid14, null)
        this.playerObj[uuid14] = robo14;
        this.allObj[uuid14] = robo14;
        this.sMap.insert(524, 495, 1, 1, uuid14 );

        let uuid15 = uuidv4();
        let robo15 = new Robot(522, 501, 0, 'Run', "2", null, uuid15, null)
        this.playerObj[uuid15] = robo15;
        this.allObj[uuid15] = robo15;
        this.sMap.insert(524, 495, 1, 1, uuid15 );

        let uuid16 = uuidv4();
        let robo16 = new Robot(520, 493, 0, 'Run', "2", null, uuid16, null)
        this.playerObj[uuid16] = robo16;
        this.allObj[uuid16] = robo16;
        this.sMap.insert(524, 495, 1, 1, uuid16 );

        
        let uuid17 = uuidv4();
        let robo17 = new Robot(520, 493, 0, 'Run', "2", null, uuid17, null)
        this.playerObj[uuid17] = robo17;
        this.allObj[uuid17] = robo17;
        this.sMap.insert(524, 495, 1, 1, uuid17 );


        
        let uuid18 = uuidv4();
        let robo18 = new Robot(520, 493, 0, 'Run', "2", null, uuid18, null)
        this.playerObj[uuid18] = robo18;
        this.allObj[uuid18] = robo18;
        this.sMap.insert(524, 495, 1, 1, uuid18 );

        
        let uuid19 = uuidv4();
        let robo19 = new Robot(520, 493, 0, 'Run', "2", null, uuid19, null)
        this.playerObj[uuid19] = robo19;
        this.allObj[uuid19] = robo19;
        this.sMap.insert(524, 495, 1, 1, uuid19 );

        
        let uuid20 = uuidv4();
        let robo20 = new Robot(480, 480, 0, 'Run', "2", null, uuid20, null)
        this.playerObj[uuid20] = robo20;
        this.allObj[uuid20] = robo20;
        this.sMap.insert(524, 495, 1, 1, uuid20 );

        let uuid21 = uuidv4();
        let robo21 = new Robot(480, 482, 0, 'Run', "2", null, uuid21, null)
        this.playerObj[uuid21] = robo21;
        this.allObj[uuid21] = robo21;
        this.sMap.insert(524, 495, 1, 1, uuid21 );

        let uuid22 = uuidv4();
        let robo22 = new Robot(480, 486, 0, 'Run', "2", null, uuid22, null)
        this.playerObj[uuid22] = robo22;
        this.allObj[uuid22] = robo22;
        this.sMap.insert(524, 495, 1, 1, uuid22 );

        let uuid23 = uuidv4();
        let robo23 = new Robot(480, 489, 0, 'Run', "2", null, uuid23, null)
        this.playerObj[uuid23] = robo23;
        this.allObj[uuid23] = robo23;
        this.sMap.insert(524, 495, 1, 1, uuid23 );

        let uuid24 = uuidv4();
        let robo24 = new Robot(480, 491, 0, 'Run', "2", null, uuid24, null)
        this.playerObj[uuid24] = robo24;
        this.allObj[uuid24] = robo24;
        this.sMap.insert(524, 495, 1, 1, uuid24 );

        let uuid25 = uuidv4();
        let robo25 = new Robot(480, 493, 0, 'Run', "2", null, uuid25, null)
        this.playerObj[uuid25] = robo25;
        this.allObj[uuid25] = robo25;
        this.sMap.insert(524, 495, 1, 1, uuid25 );

        let uuid26 = uuidv4();
        let robo26 = new Robot(480, 495, 0, 'Run', "2", null, uuid26, null)
        this.playerObj[uuid26] = robo26;
        this.allObj[uuid26] = robo26;
        this.sMap.insert(524, 495, 1, 1, uuid26 );

        let uuid27 = uuidv4();
        let robo27 = new Robot(480, 497, 0, 'Run', "2", null, uuid27, null)
        this.playerObj[uuid27] = robo27;
        this.allObj[uuid27] = robo27;
        this.sMap.insert(524, 495, 1, 1, uuid27 );

        let uuid28 = uuidv4();
        let robo28 = new Robot(480, 502, 0, 'Run', "2", null, uuid28, null)
        this.playerObj[uuid28] = robo28;
        this.allObj[uuid28] = robo28;
        this.sMap.insert(524, 495, 1, 1, uuid28 );

        let uuid29 = uuidv4();
        let robo29 = new Robot(480, 503, 0, 'Run', "2", null, uuid29, null)
        this.playerObj[uuid29] = robo29;
        this.allObj[uuid29] = robo29;
        this.sMap.insert(524, 495, 1, 1, uuid29 );

        let uuid30 = uuidv4();
        let robo30 = new Robot(490, 475, 0, 'Run', "2", null, uuid30, null)
        this.playerObj[uuid30] = robo30;
        this.allObj[uuid30] = robo30;
        this.sMap.insert(524, 495, 1, 1, uuid30 );

        let uuid31 = uuidv4();
        let robo31 = new Robot(490, 477, 0, 'Run', "2", null, uuid31, null)
        this.playerObj[uuid31] = robo31;
        this.allObj[uuid31] = robo31;
        this.sMap.insert(524, 495, 1, 1, uuid31 );
        
        let uuid32 = uuidv4();
        let robo32 = new Robot(490, 479, 0, 'Run', "2", null, uuid32, null)
        this.playerObj[uuid32] = robo32;
        this.allObj[uuid32] = robo32;
        this.sMap.insert(524, 495, 1, 1, uuid32 );
        
        let uuid33 = uuidv4();
        let robo33 = new Robot(490, 481, 0, 'Run', "2", null, uuid33, null)
        this.playerObj[uuid33] = robo33;
        this.allObj[uuid33] = robo33;
        this.sMap.insert(524, 495, 1, 1, uuid33 );

        let uuid34 = uuidv4();
        let robo34 = new Robot(490, 483, 0, 'Run', "2", null, uuid34, null)
        this.playerObj[uuid34] = robo34;
        this.allObj[uuid34] = robo34;
        this.sMap.insert(524, 495, 1, 1, uuid34 );

        let uuid35 = uuidv4();
        let robo35 = new Robot(490, 485, 0, 'Run', "2", null, uuid35, null)
        this.playerObj[uuid35] = robo35;
        this.allObj[uuid35] = robo35;
        this.sMap.insert(524, 495, 1, 1, uuid35 );

        let uuid36 = uuidv4();
        let robo36 = new Robot(490, 487, 0, 'Run', "2", null, uuid36, null)
        this.playerObj[uuid36] = robo36;
        this.allObj[uuid36] = robo36;
        this.sMap.insert(524, 495, 1, 1, uuid36 );

        let uuid37 = uuidv4();
        let robo37 = new Robot(490, 489, 0, 'Run', "2", null, uuid37, null)
        this.playerObj[uuid37] = robo37;
        this.allObj[uuid37] = robo37;
        this.sMap.insert(524, 495, 1, 1, uuid37 );

        let uuid38 = uuidv4();
        let robo38 = new Robot(490, 491, 0, 'Run', "2", null, uuid38, null)
        this.playerObj[uuid38] = robo38;
        this.allObj[uuid38] = robo38;
        this.sMap.insert(524, 495, 1, 1, uuid38 );

        let uuid39 = uuidv4();
        let robo39 = new Robot(490, 493, 0, 'Run', "2", null, uuid39, null)
        this.playerObj[uuid39] = robo39;
        this.allObj[uuid39] = robo39;
        this.sMap.insert(524, 495, 1, 1, uuid39 );

        let uuid40 = uuidv4();
        let robo40 = new Robot(475, 480, 0, 'Run', "2", null, uuid40, null)
        this.playerObj[uuid40] = robo40;
        this.allObj[uuid40] = robo40;
        this.sMap.insert(524, 495, 1, 1, uuid40 );

        
        let uuid41 = uuidv4();
        let robo41 = new Robot(475, 482, 0, 'Run', "2", null, uuid41, null)
        this.playerObj[uuid41] = robo41;
        this.allObj[uuid41] = robo41;
        this.sMap.insert(524, 495, 1, 1, uuid41 );

        
        let uuid42 = uuidv4();
        let robo42 = new Robot(475, 484, 0, 'Run', "2", null, uuid42, null)
        this.playerObj[uuid42] = robo42;
        this.allObj[uuid42] = robo42;
        this.sMap.insert(524, 495, 1, 1, uuid42 );

        
        let uuid43 = uuidv4();
        let robo43 = new Robot(475, 486, 0, 'Run', "2", null, uuid43, null)
        this.playerObj[uuid43] = robo43;
        this.allObj[uuid43] = robo43;
        this.sMap.insert(524, 495, 1, 1, uuid43 );

        let uuid44 = uuidv4();
        let robo44 = new Robot(475, 488, 0, 'Run', "2", null, uuid44, null)
        this.playerObj[uuid44] = robo44;
        this.allObj[uuid44] = robo44;
        this.sMap.insert(524, 495, 1, 1, uuid44 );

        let uuid45 = uuidv4();
        let robo45 = new Robot(475, 490, 0, 'Run', "2", null, uuid45, null)
        this.playerObj[uuid45] = robo45;
        this.allObj[uuid45] = robo45;
        this.sMap.insert(524, 495, 1, 1, uuid45 );
        
        let uuid46 = uuidv4();
        let robo46 = new Robot(475, 492, 0, 'Run', "2", null, uuid46, null)
        this.playerObj[uuid46] = robo46;
        this.allObj[uuid46] = robo46;
        this.sMap.insert(524, 495, 1, 1, uuid46 );

        let uuid47 = uuidv4();
        let robo47 = new Robot(475, 494, 0, 'Run', "2", null, uuid47, null)
        this.playerObj[uuid47] = robo47;
        this.allObj[uuid47] = robo47;
        this.sMap.insert(524, 495, 1, 1, uuid47 );

        let uuid48 = uuidv4();
        let robo48 = new Robot(475, 496, 0, 'Run', "2", null, uuid48, null)
        this.playerObj[uuid48] = robo48;
        this.allObj[uuid48] = robo48;
        this.sMap.insert(524, 495, 1, 1, uuid48 );

        let uuid49 = uuidv4();
        let robo49 = new Robot(475, 498, 0, 'Run', "2", null, uuid49, null)
        this.playerObj[uuid49] = robo49;
        this.allObj[uuid49] = robo49;
        this.sMap.insert(524, 495, 1, 1, uuid49 );
*/

/*
        let uuid6 = uuidv4();
        let player1 = new Player(502, 502, 0, 'Attack', null, uuid6)
        this.playerObj[uuid6] = player1;
        this.allObj[uuid6] = player1;
        this.sMap.insert(508, 502, 1, 1, uuid6);
*/

        
    }


}
module.exports = WorldGeneratorTest;