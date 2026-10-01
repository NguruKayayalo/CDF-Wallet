// Animation d'arrière-plan "space"
document.addEventListener("DOMContentLoaded",()=>{
    const canvas = document.querySelector("#particles-js");
    if(!canvas)return;
    const ctx = canvas.getContext("2d");
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;
    const stars=[];
    for(let i=0;i<150;i++){
        stars.push({x:Math.random()*canvas.width,y:Math.random()*canvas.height,r:Math.random()*1.5+0.5});
    }
    function draw(){
        ctx.fillStyle="rgba(0,0,20,0.8)";
        ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.fillStyle="#fff";
        stars.forEach(s=>{
            ctx.beginPath();
            ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
            ctx.fill();
        });
        requestAnimationFrame(draw);
    }
    draw();
});
