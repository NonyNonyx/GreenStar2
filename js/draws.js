//let nave1=new Image(); nave1.src='img/nave1.png';
/*L1 4,36
L2 105,36*/
//let nave2=new Image(); nave2.src='img/nave2.png';
/*
let malo1=new Image();
malo1.src='img/malo1.png';

let help1=new Image();
help1.src='img/help1.png';

//let ff1=new Image(); ff1.src='img/ff1.png';

let ef1=new Image();
ef1.src='img/ef1.png';

let exp=new Image();
exp.src='img/xplodeSprite.png';

//let nave=nave1;

let starcount=200;
let starspeed=5;
let stars=[];
//let FF=[];
let EF=[];
let maxShoot=20;
let shootSpeed=10;
let maloMovSpeed=1;
//let vida=100;
let vidaMalos=100;
let expFrame=50;
let expX=0;
let expY=0;
let expBFrame=50;
let expBX=0;
let expBY=0;


let malos=[];



function createEF()
{
    for (let index = 0; index < maxShoot*2; index++) 
    {
        EF[index]=c.height;
    }
}

function randomInt(min, max) 
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function drawPixel(x, y, c) {
    // to decrease smoothing for numbers with decimal part
  var roundedX = Math.round(x);
  var roundedY = Math.round(y);

  ctx.beginPath();
  ctx.fillStyle = '#'+c+c+c;
    ctx.fillRect(roundedX, roundedY, 3, 3);
  ctx.fill();
  ctx.closePath();
}

function drawNave()
{
    ctx.drawImage(nave, navx, navy);
    if(vida>0 && vida<<1000) drawBar(navx, navy+nave.height, nave.width, 4, vida);
}

function createStars()
{
    for (let index = 0; index < starcount; index++) 
    {
        stars[index]=randomInt(0,c.width);
        stars[index+starcount]=randomInt(0,c.height);
        stars[index+starcount*2]=randomInt(1,9);
    }
}

function drawStars()
{
    for (let index = 0; index < starcount; index++) 
    {
        drawPixel(stars[index], stars[index+starcount], stars[index+starcount*2]);
    }
}

function moveStars()
{
    for (let index = 0; index < starcount; index++) 
    {
        stars[index+starcount]+=stars[index+starcount*2]/10*starspeed;
        if(stars[index+starcount]>c.height)
        {
            stars[index]=randomInt(0,c.width);
            stars[index+starcount]=randomInt(0,5);
            stars[index+starcount*2]=randomInt(1,9);
        }
    }
}


function createMalos()
{
    for (let index = 0; index < 8; index++)
    {
        malos[index*3]=index*100;   //x
        malos[index*3+1]=100;       //y
        malos[index*3+2]=vidaMalos;       //vida
    }
    for (let index = 8; index < 16; index++)
    {
        malos[index*3]=(index-8)*100;   //x
        malos[index*3+1]=180;           //y
        malos[index*3+2]=vidaMalos;           //vida
    }
    for (let index = 16; index < 24; index++)
    {
        malos[index*3]=(index-16)*100;   //x
        malos[index*3+1]=260;           //y
        malos[index*3+2]=vidaMalos;           //vida
    }
    for (let index = 24; index < 32; index++)
    {
        malos[index*3]=(index-24)*100;   //x
        malos[index*3+1]=340;           //y
        malos[index*3+2]=vidaMalos;           //vida
    }
}

function drawMalos()
{
    for (let index = 0; index < malos.length/3; index++) 
    {
        if(malos[index*3+2]>0) ctx.drawImage(malo1, malos[index*3], malos[index*3+1]) //Solo pinta los que estan vivos
        if(malos[index*3+2]>0 && malos[index*3+2]<100) drawBar(malos[index*3]+15, malos[index*3+1]+5, malo1.width-30, 4, malos[index*3+2]);
    }
}

function moveMalos()
{
    let tope=0;
    for (let index = 0; index < malos.length/3; index++) 
    {
        if(malos[index*3+2]>0)
        { //+31+40
            malos[index*3]+=maloMovSpeed;
            if((malos[index*3]+malo1.width>c.width-50 && maloMovSpeed>0) || (malos[index*3]<50 && maloMovSpeed<0)) tope=1; //Llega al borde
            if(randomInt(0,10)==1) newEF(malos[index*3]+23, malos[index*3+1]+40); //disparo random;
        }
    }
    if(tope==1) // si llega al borde invertimos dirección
    {
        for (let index = 0; index < malos.length/3; index++) 
        {
            malos[index*3+1]+=10;
        }
        maloMovSpeed=maloMovSpeed*-1;
        tope=0;
    }
}

function newEF(x,y)
{
    for (let index = 0; index < EF.length/2; index++) 
    {
        if(EF[index*2+1]>c.height) 
        {
            EF[index*2]=x;
            EF[index*2+1]=y;
            index=EF.length+1;
        }
    }
}

function drawEF()
{
    for (let index = 0; index < EF.length/2; index++) 
    {
        if(EF[index*2+1]<c.height) ctx.drawImage(ef1, EF[index*2], EF[index*2+1]);
    }
}

function moveEF()
{
    for (let index = 0; index < EF.length/2; index++) 
    {
        if(EF[index*2+1]<=c.height) EF[index*2+1]+=shootSpeed;
    }
}

function detectCol()
{
    for (let index = 0; index < EF.length/2; index++) 
    {   
        //Enemy fire
        if((EF[index*2+1]<=894 && EF[index*2+1]>800 && EF[index*2]>navx+25 && EF[index*2]<navx+75) || (EF[index*2+1]<=894 && EF[index*2+1]>825 && EF[index*2]>navx && EF[index*2]<navx+25))
        {
            expFrame=0;
            expX=EF[index*2]-ef1.width/2;
            expY=EF[index*2+1]+ef1.height;
            EF[index*2+1]=1000;
            if(nave==nave1) nave=nave2;
            else nave=nave1;
            vida-=10;
        }
        if((EF[index*2+1]<=894 && EF[index*2+1]>825 && EF[index*2]>navx+75 && EF[index*2]<navx+100))
        {
            expFrame=0;
            expX=EF[index*2]-ef1.width/2;
            expY=EF[index*2+1]+ef1.height;
            EF[index*2+1]=1000;
            if(nave==nave1) nave=nave2;
            else nave=nave1;
            vida-=5;
        }
        if(vida<0) vida=100;
    }
    //Fuego amigo
    for (let indexFF = 0; indexFF < FF.length/2; indexFF++) 
    {   
        for (let indexM = 0; indexM < malos.length/3; indexM++) 
        {   
            if(malos[indexM*3+2]>0)
            {
                //x+20+44 y+11+39
                if(FF[indexFF*2]>malos[indexM*3]+20 && FF[indexFF*2]<malos[indexM*3]+44 && FF[indexFF*2+1]>malos[indexM*3+1]+10 && FF[indexFF*2+1]<malos[indexM*3+1]+40)
                {
                    FF[indexFF*2+1]=-1;
                    malos[indexM*3+2]=malos[indexM*3+2]-20;
                }
                if(FF[indexFF*2]>malos[indexM*3] && FF[indexFF*2]<malos[indexM*3]+10 && FF[indexFF*2+1]>malos[indexM*3+1] && FF[indexFF*2+1]<malos[indexM*3+1]+54)
                {
                    FF[indexFF*2+1]=-1;
                    malos[indexM*3+2]=malos[indexM*3+2]-10;
                }
                if(FF[indexFF*2]>malos[indexM*3]+54 && FF[indexFF*2]<malos[indexM*3]+64 && FF[indexFF*2+1]>malos[indexM*3+1] && FF[indexFF*2+1]<malos[indexM*3+1]+54)
                {
                    FF[indexFF*2+1]=-1;
                    malos[indexM*3+2]=malos[indexM*3+2]-10;
                }
                if(malos[indexM*3+2]<=0)
                {
                    expBX=malos[indexM*3]+malo1.width/2;
                    expBY=malos[indexM*3+1]+malo1.height/2;
                    expBFrame=0;
                }
            }
        }
    }
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

function drawBar(x,y,w,h,v)
{
    ctx.fillStyle='#'+(10-v/10)+(v/10-1)+'0';
    ctx.fillRect(x,y,w/100*v,h);
    ctx.strokeStyle='white';
    ctx.strokeRect(x-1,y-1,w+2,h+2);
    //ctx.fill();
}*/


let c=document.getElementById("myCanvas");
let ctx=c.getContext("2d");
ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;

function text(x, y, size, text)
{
    ctx.font = 'bold '+ size + 'pt Faster One';
    ctx.fillStyle = 'green';
    ctx.fillText(text, x - ctx.measureText(text).width/2, y + size/2);
}

function randomInt(min, max) 
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
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
            this.count[index*3+1]+=this.count[index*3+2]+this.speed;
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