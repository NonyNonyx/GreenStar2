
let gameRunning=0;
let level=0;
let levelUp=0;


function drawHUD()
{
    for (let index = 0; index < player1.lives; index++) 
    {
        ctx.drawImage(player1.img, c.width-30-index*30, 25, 25, 25);
    }
    text(c.width-200, 35, c.width/80, 'LIVES:');
    text(c.width/2, 35, c.width/80, 'POINTS: '+ player1.points);
    text(200, 35, c.width/80, 'LEVEL: '+ level);
}

function main()
{
    
    
  ctx.clearRect(0,0,c.width,c.height);
  starBG.doShit();
  player1.doShit();
  enemy1.doShit();
  drawExps();
  checkCol();
  if(enemy1.defeated)
  {
      level++;
      levelUp++;
      enemy1.defeated=false;
      gameRunning=0;
      escPressed=true;
  }
  //enemy1.enemy[randomInt(0,40)*3+2]-=50;
  //player1.points+=5;
  drawHUD();
  if(player1.defeated) escPressed=true;
  stopT=Date.now();
  frameMult=60/(1000/(stopT-startT));
  startT=Date.now();
  //text(c.width/2, 135, c.width/80, 'frameMult: '+ frameMult);
  if(!escPressed) requestAnimationFrame(main);
  else 
  {
      gameRunning=0;
      menu();
  }
}

function menu()
{
    ctx.clearRect(0,0,c.width,c.height);
    starBG.doShit();
    if(levelUp>0)
    {
        text(c.width/2, c.height/2, ctx.canvas.width/24, 'LEVEL   '+level);
        button(c.width/2 - ctx.canvas.width/24, c.height/2 + ctx.canvas.width/18, ctx.canvas.width/12, ctx.canvas.width/48, 'GO!!!');
        if(starBG.ls<250) 
        {
            starBG.ls+=10;
            starBG.speed+=2;
        }
    }
    else if(!player1.defeated)
    {
        text(c.width/2, c.height/2, ctx.canvas.width/24, 'GREEN STAR');
        button(c.width/2 - ctx.canvas.width/24, c.height/2 + ctx.canvas.width/18, ctx.canvas.width/12, ctx.canvas.width/48, 'NEW GAME');
    }
    else
    {
        text(c.width/2, c.height/2, ctx.canvas.width/24, 'GAME OVER');
        button(c.width/2 - ctx.canvas.width/24, c.height/2 + ctx.canvas.width/18, ctx.canvas.width/12, ctx.canvas.width/48, 'RETRY');
    }
    mouse1.doShit();
    if((mouseL && mouseX>c.width/2 - ctx.canvas.width/24 && mouseX<c.width/2 + ctx.canvas.width/24 && mouseY>c.height/2 + ctx.canvas.width/18 && mouseY<c.height/2 + ctx.canvas.width/12) || enterPressed) 
    {   
        if(levelUp>0)
        {
            levelUp=0;
            if(player1.lives<3) player1.lives++;
            else player1.points+=1000;
            player1.life=player1.maxLife;
        }
        else
        {
            points=0;
            level=0;
            newPlayer();
        }
        newEnemy(4, 10, 5+(level*level), 20+level);
        player1.disparando=true;
        gameRunning=1;
        escPressed=false;
        startT=Date.now();
        main();
    }
    if(gameRunning==0) requestAnimationFrame(menu);
}
