import * as constants from './actionsAndGameConstants.js';

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
        // ctx.clearRect(0,0,400,400);
        ctx.beginPath()
        ctx.save();
        ctx.translate(this.x,this.y);
        if(move === constants.DOWN){
            ctx.rotate(Math.PI * 0.5);
        }else if(move === constants.UP){
            ctx.rotate(Math.PI * 1.5);
        }else if(move === constants.LEFT){
            ctx.rotate(Math.PI);
        }
        ctx.strokeStyle = "red";
        const dis = (Math.sqrt(2) / 2) 
        ctx.arc(0,0, 12, Math.PI / 4 , (Math.PI / 4) * 7 ,false) ;
        ctx.lineTo(0 - dis, 0 + dis);
        ctx.lineTo(14 * dis , 14 * dis);
        ctx.stroke();
        ctx.closePath() ;
        ctx.restore() ;
    }

}

export function Ghost(x,y){
    this.x = x;
    this.y = y;

    this.setAtr = function (x,y){
        this.x = x;
        this.y = y;
    }
    this.drawCircle = drawCircle;

    this.draw = function(ctx){
        
        ctx.save();
        ctx.beginPath();
        ctx.translate(this.x, this.y);

        ctx.strokeStyle = "blue";
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

}