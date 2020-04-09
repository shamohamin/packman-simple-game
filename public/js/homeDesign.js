window.onload = function () {
    const ctx = this.document.getElementById('canvas').getContext('2d');
    drawHome(ctx);
    const audio = new this.Audio('../public/sounds/pacman_beginning.wav');

    this.document.body.appendChild(audio);
    // this.body.appendChild(audio);
    audio.style.display = 'none';


}

const drawHome = (ctx) => {
    ctx.strokeStyle = 'red';
    ctx.beginPath();

    ctx.moveTo(200, 20);
    ctx.lineTo(20, 150);
    ctx.stroke();
    setTimeout(() => {
        ctx.moveTo(20, 150);
        ctx.lineTo(20, 380);
        ctx.stroke();
    }, 1000);
    setTimeout(() => {
        ctx.lineTo(380, 380);
        ctx.stroke();
    }, 2000)
    
    // ctx.lineTo(380, 150);
    // ctx.lineTo(200,20);
    
    // ctx.stroke();

    ctx.closePath();
}