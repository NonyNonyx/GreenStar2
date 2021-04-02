/*
class enemy 
{
    constructor(x, y, sizex, sizey, movSpeed, shootSpeed, maxShoots, maxLife, image, fireImage, cannons, shoots) 
    {
        this.x=x;
        this.y=y;
        this.sizex=sizex;
        this.sizey=sizey;
        this.movSpeed=movSpeed;
        this.shootSpeed=shootSpeed;
        this.maxShoots=maxShoots;
        this.maxLife=maxLife;
        this.life= maxLife;
        this.img=new Image();
        this.img.src=image;
        this.fImg=new Image();
        this.fImg.src=fireImage;
        this.cannons=cannons;
        this.shoots=shoots;
    }
}*/

class Nave
{
    constructor(x, y, sx, sy, speed, fSpeed, maxF, cannons, life, maxLife, image, fImage, lives)
    {
        this.x=x;
        this.y=y;
        this.sx=sx;
        this.sy=sy;
        this.speed=speed;
        this.fSpeed=fSpeed;
        this.maxF=maxF;
        this.cannons=cannons;
        this.life=life;
        this.maxLife=maxLife;
        this.shoots=[];
        for (let index = 0; index < maxF; index++) 
        {
            this.shoots[index*2]=0;
            this.shoots[index*2+1]=-1;
        }
        this.img=new Image();
        this.img.src=image;
        this.fImg=new Image();
        this.fImg.src=fImage;
        this.disparando=false;
        this.lives=lives;
        this.points=0;
        this.defeated=false;
    }
    
    nlives()
    {
        return this.lives;
    }

    draw()
    {
        ctx.drawImage(this.img, this.x-this.sx/2, this.y-this.sy/2, this.sx, this.sy);
        if(this.life<this.maxLife)
        {
            ctx.fillStyle='#'+parseInt(10-(10/this.maxLife*this.life))+parseInt(10/this.maxLife*this.life)+'0';
            ctx.fillRect(this.x-this.sx/2,this.y+this.sy/2+2,this.img.width/this.maxLife*this.life,5);
            ctx.strokeStyle='white';
            ctx.strokeRect(this.x-this.sx/2-1,this.y+this.sy/2+1,this.sy+2,7);
        }
    }

    newFire()
    {
        if(this.disparando==false)
        {
            if(cannons==1)
            {
                for (let index = 0; index < this.shoots.length/2; index++)
                {
                    if(this.shoots[index*2+1]<0)
                    {
                        this.disparando=true;
                        console.log("fire!");
                        this.shoots[index*2]=this.x - this.fImg.width/2;
                        this.shoots[index*2+1]=this.y-this.sy/2 - this.fImg.height;
                        index=this.shoots.lenght+1;
                    }
                }
            }
            if(cannons==2)
            {
                for (let index = 0; index < this.shoots.length/4; index++)
                {
                    if(this.shoots[index*4+1]<0 && this.shoots[index*4+3]<0)
                    {
                        this.disparando=true;
                        console.log("fire!");
                        this.shoots[index*4]=this.x+3-this.sx/2;
                        this.shoots[index*4+1]=this.y+30-this.sy/2;
                        this.shoots[index*4+2]=this.x-3+this.sx/2-this.fImg.width;
                        this.shoots[index*4+3]=this.y+30-this.sy/2;
                        index=this.shoots.lenght+1;
                    }
                }
            }
        }
    }

    drawFire()
    {
        for (let index = 0; index < this.shoots.length/2; index++)
        {
            if(this.shoots[index*2+1]<c.height)
            {
                ctx.drawImage(this.fImg,this.shoots[index*2],this.shoots[index*2+1]);
            }
        }
    }

    moveFire()
    {
        for (let index = 0; index < this.shoots.length/2; index++)
        {
            if(this.shoots[index*2+1]<=c.height)
            {
                this.shoots[index*2+1]-=this.fSpeed;
            }
        }
    }
    
    move()
    {
            if(leftPressed) this.x-=5;
            if(rightPressed) this.x+=5;
        
            if(this.x<this.sx/2) this.x=this.sx/2;
            if(this.x>c.width-this.sx/2) this.x=c.width-this.sx/2;
            this.x=mouseX;
            this.y=mouseY;
            if(this.y<c.height/4*3) this.y=c.height/4*3;
            if((spacePressed==true || mouseL==true) && this.disparando==false) 
            {
                this.newFire();
            }
            if(spacePressed==false && mouseL==false && this.disparando==true) this.disparando=false;
    }

    doShit()
    {
        this.draw();
        this.move();
        this.moveFire();
        this.drawFire();
    }
}

function newPlayer()
{
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
        lives=3
    )
}

newPlayer();



        
class Enemy
{
    constructor(speed, fSpeed, maxF, life, maxLife, image, fImage, rows, cols)
    {
        this.speed=speed;
        this.fSpeed=fSpeed;
        this.maxF=maxF;
        this.life=life;
        this.maxLife=maxLife;
        this.shoots=[];
        this.quant=rows*cols;
        for (let index = 0; index < maxF; index++) 
        {
            this.shoots[index*2]=0;
            this.shoots[index*2+1]=c.height+100;
        }
        this.img=new Image();
        this.img.src=image;
        this.fImg=new Image();
        this.fImg.src=fImage;
        this.disparando=false;
        this.enemy=[];
        this.direction=1;
        for (let index = 0; index < rows*cols; index++) 
        {
            let col=0;
            let row=0;
            row=parseInt(index/cols);
            col=index-(row*cols);
            this.enemy[index*3]=col*70+50;
            this.enemy[index*3+1]=row*70+100;
            this.enemy[index*3+2]=life;
        }
        this.defeated=false;
    }
    
    draw()
    {
        for (let index = 0; index < this.quant; index++) 
        {
            if(this.enemy[index*3+2]>0)
            {
                ctx.drawImage(this.img, this.enemy[index*3], this.enemy[index*3+1], 60, 50);
                if(this.enemy[index*3+2]<this.maxLife)
                {
                    ctx.fillStyle='#'+parseInt(10-(10/this.maxLife*this.enemy[index*3+2]))+parseInt(10/this.maxLife*this.enemy[index*3+2])+'0';
                    ctx.fillRect(this.enemy[index*3],this.enemy[index*3+1]+55,60/this.maxLife*this.enemy[index*3+2],5);
                    ctx.strokeStyle='white';
                    ctx.strokeRect(this.enemy[index*3]-1,this.enemy[index*3+1]+54,62,7);
                }
            }
        }
    }

    newFire(x,y)
    {
        for (let index = 0; index < this.maxF; index++)
        {
            if(this.shoots[index*2+1]>c.height)
            {
                console.log("fire!");
                this.shoots[index*2]=x;
                this.shoots[index*2+1]=y;
                index=this.shoots.lenght+1;
            }
        }
    }

    drawFire()
    {
        for (let index = 0; index < this.shoots.length/2; index++)
        {
            if(this.shoots[index*2+1]<c.height)
            {
                ctx.drawImage(this.fImg,this.shoots[index*2],this.shoots[index*2+1]);
            }
        }
    }

    moveFire()
    {
        for (let index = 0; index < this.shoots.length/2; index++)
        {
            if(this.shoots[index*2+1]<=c.height)
            {
                this.shoots[index*2+1]+=this.fSpeed;
            }
        }
    }
    
    move()
    {
        let borde=0;
        let areEnemies=0;
        for (let index = 0; index < this.quant; index++) 
        {
            if(this.enemy[index*3+2]>0)
            {
                this.enemy[index*3]+=this.speed*this.direction;
                if(randomInt(1,50)==20) this.newFire(this.enemy[index*3]+30, this.enemy[index*3+1]+40);
                if(this.enemy[index*3] > ctx.canvas.width - 100) borde++;
                if(this.enemy[index*3] < 40) borde++;
                if(this.enemy[index*3+2]>0) areEnemies++;
            }
        }

        if(borde>0)
        {
            this.direction=this.direction*-1;
            borde=0;
            for (let index = 0; index < this.quant; index++) 
            {
                if(this.enemy[index*3+2]>0)
                {
                    this.enemy[index*3+1]+=20;
                    if(this.enemy[index*3+1] > ctx.canvas.height - 50) borde++;
                }
            }
        }

        if(borde>0) //enemy wins
        {
            player1.lives=0;
            player1.life=0;
            escPressed=true;
        }

        if(areEnemies==0) this.defeated=true; //player wins, next level
    }

    doShit()
    {
        this.draw();
        this.move();
        this.moveFire();
        this.drawFire();
    }
}


function newEnemy(w, h , sp, fsp)
{
    enemy1=new Enemy
    (
        speed=sp,
        fSpeed=fsp,
        maxF=200,
        life=100,
        maxLife=100,
        image='img/malo1.png',
        fImage='img/ef1.png',
        rows=w,
        cols=h
    )
}

newEnemy(4,10);

function checkCol()
{
    for (let index = 0; index < enemy1.shoots.length/2; index++) 
    {
        if(between(enemy1.shoots[index*2], player1.x-player1.sx/4, player1.x+player1.sx/4) && between(enemy1.shoots[index*2+1], player1.y-player1.sy/2, player1.y+player1.sy/2)) //enemy hits player cockpit
        {
            player1.life-=10;
            enemy1.shoots[index*2+1]=c.height+100;
        }
        if(between(enemy1.shoots[index*2], player1.x-player1.sx/2, player1.x-player1.sx/4) && between(enemy1.shoots[index*2+1], player1.y, player1.y+player1.sy/2)) //enemy hits player left wing
        {
            player1.life-=5;
            enemy1.shoots[index*2+1]=c.height+100;
        }
        if(between(enemy1.shoots[index*2], player1.x+player1.sx/4, player1.x+player1.sx/2) && between(enemy1.shoots[index*2+1], player1.y, player1.y+player1.sy/2)) //enemy hits player right wing
        {
            player1.life-=5;
            enemy1.shoots[index*2+1]=c.height+100;
        }
    }


    if(player1.life<=0)
    {
        player1.lives--;
        player1.life=player1.maxLife;
    }
    if(player1.lives<0) player1.defeated=true;
    for (let indexf = 0; indexf < player1.maxF; indexf++) 
    {
        for (let indexe = 0; indexe < enemy1.quant; indexe++) 
        {
            if(between(player1.shoots[indexf*2], enemy1.enemy[indexe*3]+15, enemy1.enemy[indexe*3]+45) && between(player1.shoots[indexf*2+1], enemy1.enemy[indexe*3+1], enemy1.enemy[indexe*3+1]+50) && enemy1.enemy[indexe*3+2]>0) //player hits enemy cockpit
            {
                player1.points+=20;
                enemy1.enemy[indexe*3+2]-=20;
                player1.shoots[indexf*2+1]=-100;
            }
        }
    }
}