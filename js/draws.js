let c=document.getElementById("myCanvas");
let ctx=c.getContext("2d");
ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;
let expFrame=50;
let expX=0;
let expY=0;
let expBFrame=50;
let expBX=0;
let expBY=0;
let expHFrame=50;
let expHX=0;
let expHY=0;
let exp=new Image();
exp.src='img/xplodeSprite.png';

function text(x, y, size, text)
{
    ctx.font = 'bold '+ size + 'pt Faster One';
    ctx.fillStyle = 'green';
    ctx.fillText(text, x - ctx.measureText(text).width/2, y + size/2);
}

function drawExp()
{//48 240x240
    if(expFrame<48)
    {
        fx=expFrame - Math.trunc(expFrame/8);
        fy=Math.trunc(expFrame/8);
        ctx.drawImage(exp, fx*240, fy*240, 240, 240, expX-30, expY-30, 60, 60);
        expFrame++;
    }
}

function drawExpH()
{//48 240x240
    if(expHFrame<48)
    {
        fx=expHFrame - Math.trunc(expHFrame/8);
        fy=Math.trunc(expHFrame/8);
        ctx.drawImage(exp, fx*240, fy*240, 240, 240, expHX-15, expHY-15, 30, 30);
        expHFrame++;
    }
}

function drawExpB()
{//48 240x240
    if(expBFrame<48)
    {
        fx=expBFrame - Math.trunc(expBFrame/8);
        fy=Math.trunc(expBFrame/8);
        ctx.drawImage(exp, fx*240, fy*240, 240, 240, expBX-60, expBY-60, 120, 120);
        expBFrame++;
    }
}

function drawPixel(x, y, c) 
{
    let roundedX = Math.round(x);
    let roundedY = Math.round(y);
    ctx.beginPath();
    ctx.fillStyle = '#'+c+c+c;
    ctx.fillRect(roundedX, roundedY, 3, 3);
    ctx.fill();
    ctx.closePath();
}

function drawBar(x,y,w,h,v)
{
    ctx.fillStyle='#'+(10-v/10)+(v/10-1)+'0';
    ctx.fillRect(x,y,w/100*v,h);
    ctx.strokeStyle='white';
    ctx.strokeRect(x-1,y-1,w+2,h+2);
    //ctx.fill();
}

class stars
{
    constructor(count, speed, ls)
    {
        this.count=[];
        this.speed=speed;
        this.ls=ls;
        for (let index = 0; index < count; index++) 
        {
            this.count[index*3]=randomInt(0,c.width);
            this.count[index*3+1]=randomInt(0,c.height);
            this.count[index*3+2]=randomInt(1,15);
        }
    }

    _draw()
    {
        for (let index = 0; index < this.count.length/3; index++) 
        {
            let color=this.count[index*3+2];
            color=color.toString(16);
            ctx.beginPath();
            ctx.fillStyle = '#'+color+color+color;
            ctx.fillRect(this.count[index*3], this.count[index*3+1], 3, 2+(this.count[index*3+2]/15)*this.ls);
            ctx.fill();
            ctx.closePath();
            //drawBar(this.count[index*3],this.count[index*3+1],100,5,this.count[index*3+2]*10)
        }
    }

    _move()
    {
        for (let index = 0; index < this.count.length/3; index++) 
        {
            this.count[index*3+1]+=this.count[index*3+2]+this.speed*frameMult;
            if(this.count[index*3+1]>c.height)
            {
                this.count[index*3]=randomInt(0,c.width);
                this.count[index*3+1]=randomInt(0,5);
                this.count[index*3+2]=randomInt(1,15);
            }
        }
        if(upPressed && this.ls<500) 
        {
            this.ls+=5;
            this.speed++;
        }
        if(!upPressed && this.ls>1) 
        {
            this.ls-=5;
            this.speed--;
        }
    }

    doShit()
    {
        this._draw();
        this._move();
    }
}

function button(x, y, w, h, txt)
{
    ctx.beginPath();
    ctx.fillStyle = 'darkblue';
    ctx.fillRect(x, y, w, h);
    ctx.fill();
    ctx.fillStyle = 'blue';
    ctx.fillRect(x+5, y+5, w-10, h-10);
    ctx.fill();
    ctx.closePath();
    let size=parseInt((w/txt.length/3)*2);
    ctx.font = size + 'pt Permanent Marker';
    ctx.fillStyle = 'black';
    ctx.fillText(txt, x + (w/2) - ctx.measureText(txt).width/2, y + (h/2) + size/2);
}

class mouse
{
    constructor(x, y, image)
    {
        this.x=x;
        this.y=y;
        this.img=new Image();
        this.img.src=image;
    }

    doShit()
    {
        this.x=mouseX;
        this.y=mouseY;
        ctx.drawImage(this.img, this.x - 45, this.y - 30, 200, 250);
    }
}

mouse1=new mouse(x=0, y=0, image='img/mouse2.png');

starBG=new stars(250, 1, 1);

function drawExps()
{
    drawExp();
    drawExpB();
    drawExpH();
}