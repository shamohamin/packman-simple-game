import { Circle, Rect } from "./gameObjects.js";
import { WIDTH,HEIGHT,DOWN,UP,LEFT,RIGHT ,PACKMANRADUIS,RECTWIDTH} 
                from './actionsAndGameConstants.js'

export const rightLogic = (x,y,item) =>
        x + PACKMANRADUIS > item.x &&
        ((y  > item.y && y < item.y + RECTWIDTH) ||
        (y + PACKMANRADUIS > item.y && y + PACKMANRADUIS < item.y + RECTWIDTH) ||
        (y - PACKMANRADUIS > item.y && y - PACKMANRADUIS < item.y + RECTWIDTH)) ;

export const leftLogic = (x,y,item) => 
    x - PACKMANRADUIS < item.x + RECTWIDTH && 
    ((y > item.y && y < item.y + RECTWIDTH) || 
    (y + PACKMANRADUIS > item.y && y + PACKMANRADUIS < item.y + RECTWIDTH) ||
    (y - PACKMANRADUIS > item.y && y - PACKMANRADUIS < item.y + RECTWIDTH)) ;

export const upLogic = (x, y, item) => 
    y - PACKMANRADUIS/2 < item.y + RECTWIDTH && 
    ((x > item.x && x < item.x + RECTWIDTH) || 
    (x + PACKMANRADUIS > item.x && x + PACKMANRADUIS < item.x + RECTWIDTH) ||
    (x - PACKMANRADUIS > item.x && x - PACKMANRADUIS < item.x + RECTWIDTH));

export const downLogic = (x, y, item) => 
    y + PACKMANRADUIS > item.y &&
    ((x > item.x && x < item.x + RECTWIDTH) ||
    (x + PACKMANRADUIS > item.x && x + PACKMANRADUIS < item.x + RECTWIDTH) ||
    (x - PACKMANRADUIS > item.x && x - PACKMANRADUIS < item.x + RECTWIDTH));

export const widthCheck = (x, y) => 
    x - PACKMANRADUIS < 0 || 
    x + PACKMANRADUIS > WIDTH ||
    y + PACKMANRADUIS > HEIGHT || 
    y - PACKMANRADUIS < 0 ;

export function eatingNodes(x_packman, y_packamn, staff){
    for(let i = 0; i < staff.length ; i++){
        const rect = staff[i];
        if(rect instanceof Circle){
            if((rect.x < x_packman + 14) && (rect.x > x_packman - 14)
                && (rect.y < y_packamn + 14) && (rect.y > y_packamn - 14)){
                delete staff[i];
            }
        }
    }
}

export function checkWalls(x , y, move, staff){
    if(widthCheck(x,y)) return false ;
    for(let item of staff){
        if(typeof item !== "undefined" && item instanceof Rect){
            console.log(item)
            switch (move){
                case RIGHT:
                    if (rightLogic(x,y,item)){
                        return false;
                    }
                    continue;
                case LEFT:
                    if(leftLogic(x,y,item)){
                        return false;
                    }
                    continue;
                case DOWN:
                    if(downLogic(x,y,item)){
                        return false;
                    }
                    continue;
                case UP:
                    if(upLogic(x,y,item)){
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

