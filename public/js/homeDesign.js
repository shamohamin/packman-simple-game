import { Packman, Circle } from "./gameObjects.js";
import { RIGHT, LEFT } from "./actionsAndGameConstants.js";
import { eatingNodes } from "./gameLogic.js";


window.onload = function () {
    const ctx = this.document.getElementById('canvas').getContext('2d');
    drawHome(ctx);
    ctx.fillStyle="yellow";
    
    let staff = [];
    for(let i = 170 ; i <= 260 ; i += 10)
        staff.push(new Circle(i, 150))
    
    let packman_move = RIGHT;
    const packman = new Packman(150,150);
    staff.push(packman);
    
    let direction_right = 10; 
    let staff_cop = this.Object.assign([], staff) ;
    setInterval(() => {
        
        if(packman.x > 250){
            direction_right = -10 ;
            packman_move = LEFT;
            staff_cop = Object.assign([] , staff);
        }else if(packman.x < 150){
            direction_right = 10 ;
            packman_move = RIGHT;
            staff_cop = Object.assign([] , staff);
        }

        packman.setAtr(packman.x + direction_right, packman.y);
        animated(ctx,staff_cop,packman,packman_move);
    }, 500);

    const audio = new this.Audio('../sounds/pacman_beginning.wav');

    this.document.body.appendChild(audio);
    // this.body.appendChild(audio);
    audio.style.display = 'none';


}

const drawHome = (ctx) => {
    ctx.strokeStyle = 'red';
    ctx.beginPath();

    ctx.moveTo(200, 20);
    ctx.lineTo(20, 150);
    ctx.lineTo(20, 380);
    ctx.lineTo(180, 380);
    ctx.lineTo(180, 330);
    ctx.lineTo(220, 330);
    ctx.lineTo(220, 380);
    ctx.lineTo(380, 380);
    ctx.lineTo(380, 150);
    ctx.lineTo(200,20);
    
    ctx.stroke();
    ctx.closePath();
}

const animated = (ctx, staff, packman, packman_move) => {
    eatingNodes(packman.x, packman.y, staff);
    draw_objects(ctx,staff, packman_move);
}

const draw_objects = (ctx,staff, packman_move) => {

    ctx.clearRect(130, 130, 150 , 150);
    for(let item of staff){
        if(item != undefined)
            item.draw(ctx)
        if(item instanceof Packman)
            item.draw(ctx, packman_move)
    }
}
