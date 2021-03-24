class player 
{
    constructor(x, y, sizex, sizey, movSpeed, shootSpeed, maxShoots, life, image, fireImage) 
    {
        this.x=x;
        this.y=y;
        this.sizex=sizex;
        this.sizey=sizey;
        this.movSpeed=movSpeed;
        this.shotSpeed=shotSpeed;
        this.maxShoots=maxShoots;
        this.life=life;
        this.image=new Image();
        this.image.src=image;
        this.fireImage=new Image();
        this.fireImage.src=fireImage;
    }
    shoots=[];
    draw()
    {
        ctx.drawImage(this.image, this.x, this.y);
    }

    initialize()
    {
        for (let index = 0; index < maxShoots*4; index++) 
        {
            shoots[index]=-1;
        }
    }
    control()
    {
        if(leftPressed) this.x-=5;
        if(rightPressed) this.y+=5;
        
        if(upPressed && starspeed<50) starspeed++;
        else if(starspeed>5) starspeed--;
    
        if(this.x<0) this.x=0;
        if(this.x>c.width-this.image.width) this.x=c.width-this.image.width;

        document.onclick = newFF;
        if(spacePressed==true && disparando==false) 
        {
            //spacePressed=false;
            disparando=true;
            newFF();
        }
        if(spacePressed==false && disparando==true) disparando=false;
    }
}