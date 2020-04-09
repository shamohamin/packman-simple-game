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