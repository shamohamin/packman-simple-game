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
    // this.drawCircle = drawCircle;

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

    this.move = function(staff , packman , exit){
        let possibles = [];
        for(let option of this.movePossibilities){
            if(checkWalls(this.x, this.y, option, staff)){
                possibles.push(option);
            }
        }
        // console.log(possibles);

        this.makeDecision(possibles, packman , exit) ;
    }

    this.makeDecision = function(moves, packman, exit){
        let direction;
        let min = 20000000 ;
        for(let option of moves){
            let dis ;
            switch(option){
                case constants.RIGHT :
                    dis = this.dist(this.x + 10, this.y ,packman) ;
                    if(min > dis){
                        min = dis ;
                        direction = constants.RIGHT;
                    }
                    break;
                case constants.LEFT :
                    dis = this.dist(this.x - 10, this.y ,packman)
                    if(min > dis){
                        min = dis ;
                        direction = (constants.LEFT);
                    }
                    break;
                case constants.DOWN:
                    dis = this.dist(this.x, this.y + 10 ,packman)
                    if(min > dis){
                        min = dis ;
                        direction = constants.DOWN;
                    }
                    break;
                case constants.UP:
                    dis = this.dist(this.x, this.y - 10 ,packman)
                    if(min > dis){
                        min = dis ;
                        direction = (constants.UP);
                    }
                    break;
                default:
                    break;
            }
        }
        // console.log(direction);
        this.makeMove(direction, packman,exit);

    }

    this.makeMove = (direction, packman,exit) => {
        // console.log(direction);
        switch(direction){
            case constants.RIGHT :
                this.setAtr(this.x + 10, this.y);
                break;
            case constants.LEFT :
                this.setAtr(this.x - 10, this.y);
                break;
            case constants.UP :
                this.setAtr(this.x , this.y - 10);
                break;
            case constants.DOWN :
                this.setAtr(this.x , this.y + 10);
                break;
            default:
                break;
        }
        if(this.collide(packman)){
            exit();
        }
    }

    this.dist = (moved_x , moved_y , packman) => 
        (moved_x - packman.x) * (moved_x - packman.x) + 
            (moved_y - packman.y) * (moved_y - packman.y) ;

    this.collide = function(packman){
        if(this.x > packman.x - 14 && this.x < packman.x + 14 &&
            this.y > packman.y - 14 && this.y < packman.y + 14 ){
                return true;
            }
        return false ;
    }

}