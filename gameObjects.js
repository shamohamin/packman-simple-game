import * as constants from './actionsAndGameConstants.js';
import { checkWalls } from "./gameLogic.js";

export function Rect(x, y, w, h, c){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = c;
    this.draw = drawRect ;
}

export function Circle(x, y, c){
    this.x = x ;
    this.y = y ;
    this.color = c;
    this.draw = drawCircle ;
}

function drawCircle(ctx){
    ctx.beginPath();
    ctx.fillStyle = this.color ;
    ctx.arc(this.x, this.y , 2, 0 , Math.PI * 2);
    ctx.fill();
}

function drawRect(ctx){
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.w, this.h);
    ctx.stroke();
}

export function Packman(x, y){
    this.x = x;
    this.y = y;

    this.setAtr = function(x, y){
        this.x = x;
        this.y = y;
    }

    this.draw = function (ctx, move){
        
        console.log(move)
        ctx.beginPath()
        ctx.save();
        ctx.translate(this.x,this.y);
        ctx.clearRect(-14,-14,28,28);
        if(move === constants.DOWN){
            ctx.rotate(Math.PI * 0.5);
        }else if(move === constants.UP){
            ctx.rotate(Math.PI * 1.5);
        }else if(move === constants.LEFT){
            ctx.rotate(Math.PI);
        }
        ctx.fillStyle = constants.PACKMANCOLOR ;
        const dis = (Math.sqrt(2) / 2) 
        ctx.arc(0,0, 12, Math.PI / 4 , (Math.PI / 4) * 7 ,false) ;
        ctx.lineTo(0 - dis, 0 + dis);
        ctx.lineTo(14 * dis , 14 * dis);
        ctx.fill();
        ctx.closePath() ;
        ctx.restore() ;
    }

}

export function Ghost(x,y){
    this.x = x;
    this.y = y;
    this.movePossibilities = 
            [constants.RIGHT , constants.LEFT, constants.UP, constants.DOWN];
    this.setAtr = function (x,y){
        this.x = x;
        this.y = y;
    }
    this.drawCircle = drawCircle;

    this.draw = function(ctx){
        
        ctx.save();
        ctx.beginPath();
        ctx.translate(this.x, this.y);

        ctx.strokeStyle = constants.GHOSTCOLOR;
        ctx.arc(0 , 0, 14, 0 , Math.PI,true );
        ctx.lineTo(-14 , +14);
        ctx.lineTo(-7, 7);
        ctx.lineTo(-7 , 14);
        ctx.lineTo(0, 7);
        ctx.lineTo(0 , 14);
        ctx.lineTo(7, 7);
        ctx.lineTo(7,14);
        ctx.lineTo(14, 7);
        ctx.lineTo(14, 0);
        ctx.save();
        ctx.translate(7, -7);
        ctx.arc(0,0,4, 0 , Math.PI * 2 );
        ctx.restore();

        ctx.moveTo(-7,-7);
        ctx.save();
        ctx.moveTo(-3,-7);
        ctx.arc(-7,-7,4, 0 , Math.PI * 2 );
        ctx.restore();
        ctx.stroke();
        
        ctx.closePath();
        ctx.restore();
    }

    this.move = function(staff){
        let posibles = [];
        for(let option of this.movePossibilities){
            if(checkWalls(x, y, option, staff)){
                posibles.push(option);
            }
        }
        
    }

    this.makeMov = function(moves){
        for(let move in moves){
            // switch(option){
            //     case constants.RIGHT :
            //         if(checkWalls(x + 10 , y, option , staff)){
            //             posibles.push(constants.RIGHT);
            //         }
            //         break;
            //     case constants.LEFT :
            //         if(checkWalls(x - 10 , y , option, staff)){
            //             posibles.push(constants.LEFT);
            //         }
            //         break;
            //     case constants.DOWN:
            //         if(checkWalls(x, y+10 , option , staff)){
            //             posibles.push(constants.DOWN);
            //         }
            //         break;
            //     case constants.UP:
            //         if(checkWalls(x, y-10, option , staff)){
            //             posibles.push(constants.UP);
            //         }
            //         break;
            //     default:
            //         break;
            // }
        }
    }

}