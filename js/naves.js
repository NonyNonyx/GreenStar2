/*class player 
{
    constructor(x, y, sizex, sizey, movSpeed, shootSpeed, maxShoots, life, image, fireImage, cannons, shoots) 
    {
        this.x=x;
        this.y=y;
        this.sizex=sizex;
        this.sizey=sizey;
        this.movSpeed=movSpeed;
        this.shootSpeed=shootSpeed;
        this.maxShoots=maxShoots;
        this.life=life;
        this.img=new Image();
        this.img.src=image;
        this.fImg=new Image();
        this.fImg.src=fireImage;
        this.cannons=cannons;
        this.shoots=shoots;
    }

    

    draw()
    {
        ctx.drawImage(this.img, this.x, this.y);
        if(this.life>0 && this.life<1000) drawBar(this.x, this.y+this.img.height, this.img.width, 4, this.life);
    }

    initialize()
    {
        this.shoots=[];
        for (let index = 0; index < this.maxShoots*4; index++) 
        {
            this.shoots[index]=-1;
        }
    }
    control()
    {
        if(leftPressed) this.x-=5;
        if(rightPressed) this.x+=5;
        
        if(upPressed && starspeed<50) starspeed++;
        else if(starspeed>5) starspeed--;
    
        if(this.x<0) this.x=0;
        if(this.x>c.width-this.img.width) this.x=c.width-this.img.width;

        document.onclick = this.newFire();
        if(spacePressed==true && disparando==false) 
        {
            //spacePressed=false;
            disparando=true;
            this.newFire();
        }
        if(spacePressed==false && disparando==true) disparando=false;
    }

    moveFire()
    {
        for (let index = 0; index < this.shoots.length/cannons; index++) 
        {
            if(this.shoots[index*cannons+1]>0) this.shoots[index*cannons+1]-=this.shootSpeed;
        } 
    }

    drawFire()
    {
        for (let index = 0; index < this.shoots.length/cannons; index++) 
        {
            if(this.shoots[index*cannons+1]>0) ctx.drawImage(this.fImg, this.shoots[index*cannons], this.shoots[index*cannons+1]);
        }
    }

    newFire()
    {
        for (let index = 0; index < this.shoots.length/(cannons*2); index++) 
        {
            if(this.shoots[index*2+1]<=0) 
            {
                this.shoots[index*this.cannons]=this.x+3-this.fImg.width/2;
                this.shoots[index*this.cannons+1]=this.y+30-this.fImg.height;
                this.shoots[index*this.cannons+2]=this.x+95-this.fImg.width/2;
                this.shoots[index*this.cannons+3]=this.y+30-this.fImg.height;
                index=this.shoots.length+1;
            }
        }
    }

    doShit()
    {
        this.draw();
        this.control();
        this.moveFire();
        this.drawFire();
    }
}

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
    constructor(x, y, sx, sy, speed, fSpeed, maxF, cannons, life, maxLife, image, fImage, pc)
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
        this.fImage=fImage;
        this.image=image;
        this.shoots=[];
        for (let index = 0; index < maxF; index++) 
        {
            this.shoots[index*2]=0;
            if(pc)this.shoots[index*2+1]=-1;
            else this.shoots[index*2+1]=c.height+100;
        }
        this.img=new Image();
        this.img.src=this.image;
        this.fImg=new Image();
        this.fImg.src=this.fImage;
        this.pc=pc;
        this.disparando=false;
    }
    
    draw()
    {
        ctx.drawImage(this.img, this.x-this.sx/2, this.y-this.sy/2, this.sx, this.sy);
    }

    newFire()
    {
        if(pc && this.disparando==false)
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
            if(this.y<c.height/3*2) this.y=c.height/3*2;
            //ctx.onclick = this.newFire;
            if((spacePressed==true || mouseL==true) && this.disparando==false) 
            {
                this.newFire();
                //spacePressed=false;
                
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