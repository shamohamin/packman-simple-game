import {checkWalls ,eatingNodes} 
        from '../packman-simple-game/gameLogic.js';
import {Rect} from '../packman-simple-game/objects.js';
import * as constants from '../packman-simple-game/actionsAndGameConstants.js';
import { game } from './setup.js'

export var staff = new Array();
export var x_packman = 15 , y_packamn = 15 ;


function drawPackman(ctx,x, y){
    ctx.clearRect(0,0,400,400);
    ctx.beginPath()
    ctx.save();
    ctx.translate(x,y);
    ctx.fillStyle = "blue";
    const dis = (Math.sqrt(2) / 2) 
    ctx.arc(0,0, 12, Math.PI / 4 , (Math.PI / 4) * 7 ,false) ;
    ctx.lineTo(0 - dis, 0 + dis);
    ctx.lineTo(14 * dis , 14 * dis);
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
}


window.onload = function () {
    const ctx = document.getElementById('canvas').getContext('2d')
    const {HEIGHT, WIDTH} = constants;
    ctx.strokeStyle = "red"
    new Rect(0 ,0 , WIDTH, HEIGHT).draw(ctx)
    
    game(staff);

    draw();

    function draw(){    
        for(let rect of staff){
            if(typeof(rect) !== "undefined")
                rect.draw(ctx);
        }
    }

    drawPackman(ctx,x_packman,y_packamn);

    this.document.addEventListener('keyup', (event) => {
        if(event.preventDefault) event.preventDefault();
        const {RIGHT, DOWN, UP, LEFT} = constants;
        if (event.keyCode === 38){
            this.console.log("inside up");
            if(checkWalls(x_packman, y_packamn - 10 , UP, staff)){
                this.console.log("inside up");
                drawPackman(ctx,x_packman, y_packamn -= 10);
            }
        }else if(event.keyCode === 40){
            if(checkWalls(x_packman, y_packamn + 10 , DOWN, staff)){
                drawPackman(ctx,x_packman, y_packamn += 10);
            }
        }else if(event.keyCode === 39){
            if(checkWalls(x_packman + 10, y_packamn , RIGHT, staff)){
                drawPackman(ctx,x_packman += 10 , y_packamn);
            }
        }else if(event.keyCode === 37){
            if(checkWalls(x_packman - 10, y_packamn , LEFT, staff)){
                drawPackman(ctx,x_packman -= 10, y_packamn);
            }
        }
        eatingNodes(x_packman, y_packamn, staff);
        draw();
    });

}

