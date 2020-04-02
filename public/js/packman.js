import {checkWalls ,eatingNodes} 
        from './gameLogic.js';
import {Rect, Packman, Ghost} from './gameObjects.js';
import * as constants from './actionsAndGameConstants.js';
import { setupGame } from './setup.js';

export var staff = new Array();
const packman = new Packman(15,15);
const ghost1 = new Ghost(15,295);
const ghost2 = new Ghost(295, 295);
const ghost3 = new Ghost(225, 200);
staff.push(ghost1, packman, ghost2, ghost3);
let Action = constants.RIGHT;

window.onload = startGame();

function startGame(){

    const ctx = document.getElementById('canvas').getContext('2d')
    const {HEIGHT, WIDTH} = constants;
    ctx.strokeStyle = "red"
    new Rect(0 ,0 , WIDTH, HEIGHT).draw(ctx)
    
    setupGame(staff);

    draw();

    const drawInterval = 
        setInterval(() => draw(), 100);
    const ghost1Interval = 
        setInterval(() => ghost1.move(staff, packman, exit) , 150);
    const ghost2Interval = 
        setInterval(() => ghost2.move(staff, packman, exit), 200);
    const ghost3Interval = 
        setInterval(() => ghost3.move(staff, packman, exit), 300);
    
    function draw(){
        ctx.clearRect(0,0,400,400);
        for(let objects of staff){
            if(typeof(objects) !== "undefined")
                objects.draw(ctx);
            if(objects instanceof Packman)
                objects.draw(ctx, Action);
        }
    }

    document.addEventListener('keydown', packmanEventHandller) ;
    
    function packmanEventHandller(event){
        if(event.preventDefault) event.preventDefault();
        
        const {RIGHT, DOWN, UP, LEFT} = constants;
        if (event.keyCode === 38){
            if(checkWalls(packman.x, packman.y , UP, staff)){
                packman.setAtr(packman.x, packman.y - 10);
                Action = UP;
            }
        }else if(event.keyCode === 40){
            if(checkWalls(packman.x, packman.y , DOWN, staff)){
                packman.setAtr(packman.x, packman.y + 10);
                Action = DOWN ;
            }
        }else if(event.keyCode === 39){
            if(checkWalls(packman.x , packman.y , RIGHT, staff)){
                packman.setAtr(packman.x + 10, packman.y );
                Action = RIGHT ;
            }
        }else if(event.keyCode === 37){
            if(checkWalls(packman.x, packman.y , LEFT, staff)){
                packman.setAtr(packman.x - 10, packman.y);
                Action = LEFT ;
            }
        }
        eatingNodes(packman.x, packman.y, staff) ;
        draw() ;
    }

    function exit(){
        clearInterval(drawInterval);
        clearInterval(ghost1Interval);
        document.removeEventListener('keydown' , packmanEventHandller);
        clearInterval(ghost2Interval);
        clearInterval(ghost3Interval);
        const exitElement = document.getElementById('exit');
        exitElement.innerHTML = "GAMEOVER";
        exitElement.className = 'exit';
    }
}
