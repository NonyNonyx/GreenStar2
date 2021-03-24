let rightPressed=false;
let leftPressed=false;
let upPressed=false;
let downPressed=false;
let spacePressed=false;
let enterPressed=false;
let escPressed=false;

function keyDownHandler(e) 
{
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    if(e.keyCode == 37) {
        leftPressed = true;
    }
    if(e.keyCode == 38) {
        upPressed = true;
    }
    if(e.keyCode == 40) {
        downPressed = true;
    }
    if(e.keyCode == 32) {
        spacePressed = true;
    }
    if(e.keyCode == 13) {
        enterPressed = true;
    }
    if(e.keyCode == 27) {
        escPressed = true;
    }
}
  
function keyUpHandler(e) 
{
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    if(e.keyCode == 37) {
        leftPressed = false;
    }
    if(e.keyCode == 38) {
        upPressed = false;
    }
    if(e.keyCode == 40) {
        downPressed = false;
    }
    if(e.keyCode == 32) {
        spacePressed = false;
    }
    if(e.keyCode == 13) {
        enterPressed = false;
    }
    if(e.keyCode == 27) {
        escPressed = false;
    }
}
  
function mouseMoveHandler(e)
{
    let relativeX = e.clientX - c.offsetLeft;
    if(relativeX > 0 && relativeX < c.width) 
    {
        navx = relativeX - nave1.width/2;
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function controlNave()
{
    if(leftPressed) navx-=5;
    if(rightPressed) navx+=5;
    
    if(upPressed && starspeed<50) starspeed++;
    else if(starspeed>5) starspeed--;
  
    if(navx<0) navx=0;
    if(navx>c.width-nave1.width) navx=c.width-nave1.width;

    document.onclick = newFF;
  if(spacePressed==true && disparando==false) 
  {
    //spacePressed=false;
    disparando=true;
    newFF();
  }
  if(spacePressed==false && disparando==true) disparando=false;
}