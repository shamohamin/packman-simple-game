import {checkWalls ,eatingNodes} 
        from '../packman-simple-game/gameLogic.js';
import {Rect, Packman, Ghost} from './gameObjects.js';
import * as constants from '../packman-simple-game/actionsAndGameConstants.js';
import { setupGame } from './setup.js';

export var staff = new Array();
const packman = new Packman(15,15);
const ghost1 = new Ghost(15,15);

window.onload = function () {
    const ctx = document.getElementById('canvas').getContext('2d')
    const {HEIGHT, WIDTH} = constants;
    ctx.strokeStyle = "red"
    new Rect(0 ,0 , WIDTH, HEIGHT).draw(ctx)
    
    setupGame(staff);

    draw();

    function draw(){ 
        for(let rect of staff){
            if(typeof(rect) !== "undefined")
                rect.draw(ctx);
        }
    }

    // packman.draw(ctx, constants.RIGHT);
    ghost1.draw(ctx);

    this.document.addEventListener('keyup', (event) => {
        if(event.preventDefault) event.preventDefault();
        const {RIGHT, DOWN, UP, LEFT} = constants;
        if (event.keyCode === 38){
            this.console.log("inside up");
            if(checkWalls(packman.x, packman.y - 10 , UP, staff)){
                this.console.log("inside up");
                packman.setAtr(packman.x, packman.y - 10);
                packman.draw(ctx, UP);
            }
        }else if(event.keyCode === 40){
            if(checkWalls(packman.x, packman.y + 10 , DOWN, staff)){
                packman.setAtr(packman.x, packman.y + 10);
                packman.draw(ctx, DOWN);
            }
        }else if(event.keyCode === 39){
            if(checkWalls(packman.x + 10, packman.y , RIGHT, staff)){
                packman.setAtr(packman.x += 10, packman.y );
                packman.draw(ctx, RIGHT);
            }
        }else if(event.keyCode === 37){
            if(checkWalls(packman.x - 10, packman.y , LEFT, staff)){
                packman.setAtr(packman.x - 10, packman.y);
                packman.draw(ctx, LEFT);
            }
        }
        eatingNodes(packman.x, packman.y, staff) ;
        draw() ;
    }) ;

}

