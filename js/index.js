/*let c=document.getElementById("myCanvas");
let ctx=c.getContext("2d");
ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;
let disparando=false;

let player1 = new player
(
  x=(c.width/2) - 50, 
  y=c.height - 150, 
  sizex=100, 
  sizey=100, 
  movSpeed=5, 
  shootSpeed=10, 
  maxShoots=10, 
  life=100, 
  image='img/nave1.png', 
  fireImage='img/ff1.png',
  cannons=2,
  shoots=[]
);

player1.initialize();

createStars();
//createFF();
createEF();
createMalos();
//ctx.globalAlpha=0.5;
function main()
{
  ctx.clearRect(0,0,c.width,c.height);
  
  drawStars();
  moveStars();
  drawEF();
  moveEF();
  player1.doShit();
  drawMalos();
  moveMalos();
  drawExp();
  drawExpB();
  
  requestAnimationFrame(main);
}
main();*/

starBG=new stars(200, 1, 1);

player1=new Nave
(
  x=c.width/2,
  y=c.height-150,
  sx=100,
  sy=100,
  speed=10,
  fSpeed=10,
  maxF=20,
  cannons=2,
  life=100,
  maxLife=100,
  image='img/nave1.png',
  fImage='img/ff1.png',
  shoots=[],
  pc=true
)

/*
let enemy=[32];
for (let index = 0; index < enemy.length; index++) 
{
  enemy[index]=new Nave
  (
    x=0,
    y=0,
    sx=50,
    sy=50,
    speed=20,
    fSpeed=20,
    maxF=20,
    cannons=1,
    life=100,
    maxLife=100,
    image='img/malo1.png',
    fImage='img/ff1.png',
    shoots=[],
    pc=false
  );
}*/


function main()
{
  ctx.clearRect(0,0,c.width,c.height);
  starBG.doShit();
  player1.doShit();
  text(c.width/2, c.height/2, 100, 'GAME OVER');
  requestAnimationFrame(main);
}
main();