import { Circle, Rect } from "./gameObjects.js";
import { WIDTH,HEIGHT,DOWN,UP,LEFT,RIGHT ,PACKMANRADUIS,RECTWIDTH} 
                from './actionsAndGameConstants.js'

export const rightLogic = (x,y,item) =>
        x + PACKMANRADUIS + 10 > item.x &&
        ((y  > item.y && y < item.y + RECTWIDTH) ||
        (y + PACKMANRADUIS > item.y && y + PACKMANRADUIS < item.y + RECTWIDTH) ||
        (y - PACKMANRADUIS > item.y && y - PACKMANRADUIS < item.y + RECTWIDTH)) ;

export const leftLogic = (x,y,item) => 
    x - PACKMANRADUIS - 10 < item.x + RECTWIDTH && 
    ((y > item.y && y < item.y + RECTWIDTH) || 
    (y + PACKMANRADUIS > item.y && y + PACKMANRADUIS < item.y + RECTWIDTH) ||
    (y - PACKMANRADUIS > item.y && y - PACKMANRADUIS < item.y + RECTWIDTH)) ;

export const upLogic = (x, y, item) => 
    y - PACKMANRADUIS - 10 < item.y + RECTWIDTH && 
    ((x > item.x && x < item.x + RECTWIDTH) || 
    (x + PACKMANRADUIS > item.x && x + PACKMANRADUIS < item.x + RECTWIDTH) ||
    (x - PACKMANRADUIS > item.x && x - PACKMANRADUIS < item.x + RECTWIDTH));

export const downLogic = (x, y, item) => 
    y + PACKMANRADUIS + 10 > item.y &&
    ((x > item.x && x < item.x + RECTWIDTH) ||
    (x + PACKMANRADUIS > item.x && x + PACKMANRADUIS < item.x + RECTWIDTH) ||
    (x - PACKMANRADUIS > item.x && x - PACKMANRADUIS < item.x + RECTWIDTH));

export const widthCheck = (x, y) => 
    x - PACKMANRADUIS < 0 || 
    x + PACKMANRADUIS > WIDTH ||
    y + PACKMANRADUIS > HEIGHT || 
    y - PACKMANRADUIS < 0 ;

export function eatingNodes(x_packman, y_packamn, staff, chomp){
    for(let i = 0; i < staff.length ; i++){
        const rect = staff[i];
        if(rect instanceof Circle){
            if((rect.x < x_packman + 14) && (rect.x > x_packman - 14)
                && (rect.y < y_packamn + 14) && (rect.y > y_packamn - 14)){
                // chomp.play();
                delete staff[i];
            }
            // chomp.pause();
        }
    }
}

export function checkWalls(x , y, move, staff){
    for(let item of staff){
        if(typeof item !== "undefined" && item instanceof Rect){
            switch (move){
                case RIGHT:
                    if (rightLogic(x,y,item) || widthCheck(x + 10 , y)){
                        return false;
                    }
                    continue;
                case LEFT:
                    if(leftLogic(x,y,item) || widthCheck(x - 10 , y)){
                        return false;
                    }
                    continue;
                case DOWN:
                    if(downLogic(x,y,item) || widthCheck(x , y + 10)){
                        return false;
                    }
                    continue;
                case UP:
                    if(upLogic(x,y,item) || widthCheck(x , y - 5)){
                        return false;
                    }
                    continue;
                default:
                    return false;
            }
        }
    }
    return true ;
}

