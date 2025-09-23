export class bul{
    static spd=10;
    constructor(drct,x,y){
        this.tex=new Image();
        this.tex2=new Image();
        this.tex3=new Image();
        this.tex.src="bul.png";
        this.drct=drct-0.5*Math.PI;
        this.x=x;
        this.y=y;
    }
    move(){
        this.x+=Math.cos(1*this.drct)*bul.spd;
        this.y+=Math.sin(1*this.drct)*bul.spd;
    }
}