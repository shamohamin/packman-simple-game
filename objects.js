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