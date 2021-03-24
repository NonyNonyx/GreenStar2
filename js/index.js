let c=document.getElementById("myCanvas");
let ctx=c.getContext("2d");
let navx=(c.width/2) - (nave1.width/2);
let navy=800;
let disparando=false;

createStars();
createFF();
createEF();
createMalos();
//ctx.globalAlpha=0.5;
function main()
{
  ctx.clearRect(0,0,c.width,c.height);
  drawStars();
  moveStars();
  detectCol();
  drawFF();
  moveFF();
  drawEF();
  moveEF();
  drawNave();
  drawMalos();
  moveMalos();
  controlNave();
  drawExp();
  drawExpB();
  

  requestAnimationFrame(main);
}
main();


