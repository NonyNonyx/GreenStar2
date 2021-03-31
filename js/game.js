
let gameRunning=0;

function main()
{
  ctx.clearRect(0,0,c.width,c.height);
  starBG.doShit();
  player1.doShit();
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
    if(player1.life>0)
    {
        text(c.width/2, c.height/2, 100, 'NEW GAME');
        button(c.width/2 - 100, c.height/2 + 150, 200, 50, 'START');
    }
    else
    {
        text(c.width/2, c.height/2, 100, 'GAME OVER');
        button(c.width/2 - 100, c.height/2 + 150, 200, 50, 'RETRY');
    }
    mouse1.doShit();
    if(mouseL && mouseX>c.width/2 - 100 && mouseX<c.width/2 + 100 && mouseY>c.height/2 + 150 && mouseY<c.height/2 + 200) 
    {   
        gameRunning=1;
        main();
    }
    if(gameRunning==0) requestAnimationFrame(menu);
}