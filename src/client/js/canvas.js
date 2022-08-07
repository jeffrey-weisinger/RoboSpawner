//import { ContextReplacementPlugin } from 'webpack'; WTF STOP IMPORTING
// import { ContextReplacementPlugin } from 'webpack';
// import { ContextReplacementPlugin } from 'webpack';
//  import {getPlayerUpdate} from './process.js'

const canvas = document.querySelector("canvas");
const context = canvas.getContext('2d');
let cw;
let ch;


export function setupCanvas(){
    canvas.width =1000;    cw = canvas.width;
    canvas.height= 750;    ch = canvas.height;
}

export function updateCanvas(){//more precisely, start updating canvas (and initializing/giving it its first value), in a sense.
    drawPlayer();
}

function flush(){
    context.fillStyle = 'white'
    context.fillRect(0, 0, canvas.width, canvas.height);
}
function drawPlayer(){
    flush();
    let info = getPlayerUpdate(); 
    if (typeof info != 'undefined'){
        for (let i = 0; i < info.length; i ++){
            let player = info[i]
            let t = player.playerType
            let num = player.playerNum;
            let x = player.x;
            let y = player.y;
            switch(t){
                case 'class1': 
                    context.fillStyle='red';
                    break;
                case 'class2':
                    context.fillStyle='blue';
                    break;
                case 'class3':
                    context.fillStyle = 'yellow';
        
            }
            //context.fillRect(100, 100, 120, 200 )
            console.log(player)
            context.fillRect(x, y, 20, 100);
            

    }
}
    /*
    
    }*/
    requestAnimationFrame(drawPlayer);

} 