var staff = new Array();
var x_packman = 15 , y_packamn = 15 ;


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


function Rect(x, y, w, h, c){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = c;
    this.draw = drawRect ;
}

function Circle(x, y, c){
    this.x = x ;
    this.y = y ;
    this.color = c;
    this.draw = drawCircle ;
}



window.onload = function () {
    const ctx = document.getElementById('canvas').getContext('2d')
    const WIDTH = 400 ;
    const HEIGHT = 400 ;
    ctx.strokeStyle = "red"
    new Rect(0 ,0 , WIDTH, HEIGHT).draw(ctx)

    
    game();
    // this.setInterval(game, 20);

    function game(){

        let x = 30 , y = 30;
        for(let j = 0 ; y < WIDTH; j++){
            for(let i = 0 ; x < HEIGHT; i++){
                staff.push(new Rect(x, y, 40 ,40 , 'red'));
                x += 70 ;
                let y_2 = y - 10 ;
                if(j == 0)
                    for(; y_2 < HEIGHT ;){
                        staff.push(new Circle(x - 15 , y_2, 'yellow'));
                        y_2 += 8 ;
                    }
            }
            let x_2 = 15 ;
            y += 70 ;
            for(; x_2 < WIDTH ; ){
                staff.push(new Circle(x_2 , y - 15, 'yellow'));
                x_2 += 8;
            }
            x = 30 ;
        }

        y = 20;
        x = 15;
        for(; y < HEIGHT; ){
            staff.push(new Circle(x , y , 'yellow')) ;
            y += 8 ;
        }

        y = 15 ;
        x = 15 ;
        for(; x < WIDTH ; ){
            staff.push(new Circle(x , y , 'yellow')) ;
            x += 8;
        }
    }
        
    check = () => {
        for(let i = 0; i < staff.length ; i++){
            rect = staff[i];
            if(rect instanceof Circle){
                if((rect.x < x_packman + 14) && (rect.x > x_packman - 14)
                    && (rect.y < y_packamn + 14) && (rect.y > y_packamn - 14)){
                    delete staff[i] ;
                }
            }
        }
    }

    draw();

    function draw(){    
        for(let rect of staff){
            if(typeof(rect) !== "undefined")
                rect.draw(ctx);
        }
    }

    drawPackman(ctx,x_packman,y_packamn);

    this.document.addEventListener('keyup', (event) => {
        if (event.keyCode === 38){
            drawPackman(ctx,x_packman, y_packamn -= 10);
        }else if(event.keyCode === 40){
            drawPackman(ctx,x_packman, y_packamn += 10);
        }else if(event.keyCode === 39){
            drawPackman(ctx,x_packman += 20 , y_packamn);
        }else if(event.keyCode === 37){
            drawPackman(ctx,x_packman -= 10, y_packamn);
        }
        check();
        draw();
    });

}

