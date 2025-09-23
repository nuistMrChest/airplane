import { bul } from "./bul.js";

let tex=new Image();
tex.src="skin.png";
const spd=5;
const rsp=0.5* Math.PI / 180;
let drct=0;

let buls=[];

let bk=document.querySelector("#bk");
let pen = bk.getContext("2d");
let grd= new Image();
grd.src="ground.png";
let gx=960;
let gy=540;
const cx=960;
const cy=540;
const gl=128;
let ax=960;
let ay=540;
let keys={};
document.addEventListener("keydown", (e) => {
  keys[e.key.toLowerCase()] = true;
});
document.addEventListener("keyup", (e) => {
  keys[e.key.toLowerCase()] = false;
});

function mainloop(){
    pen.clearRect(0, 0, bk.width, bk.height);//print
    for(let i=-100;i<100;i++){
        for(let j=-100;j<100;j++){
            let tx=i*gl;
            let ty=j*gl;
            if(gx+tx>-200&&gx+tx<1930&&gy+ty>-200&&gy+ty<1090){
                pen.drawImage(grd,gx+tx,gy+ty,gl,gl);
            }
        }
    }
    pen.save();
    pen.translate(cx, cy);
    pen.rotate(drct);
    pen.drawImage(tex, -0.5 * tex.width, -0.5 * tex.height, tex.width, tex.height);
    pen.restore();
    for(let i=0;i<buls.length;i++){
        if(gx+buls[i].x+cx>-200&&gx+buls[i].x+cx<2000&&gy+buls[i].y+cy>-200&&gy+buls[i].y+cy<2000){
            pen.drawImage(buls[i].tex,gx+buls[i].x-0.5*buls[i].tex.width+cx,gy+buls[i].y-0.5*buls[i].tex.height+cy,buls[i].tex.width,buls[i].tex.height);
        }
    }


    gy+=Math.cos(-1*drct)*spd;//move
    gx+=Math.sin(-1*drct)*spd;
    if(gy>90*gl){
        gy-=gl
    }
    if(gx>90){
        gx-=gl
    }
    if(gy<-90*gl){
        gy+=gl;
    }
    if(gx<-90*gl){
        gx+=gl;
    }
    ax=-gx;
    ay=-gy;
    if(keys["d"]){
        drct+=rsp;
    }
    if(keys["a"]){
        drct-=rsp;
    }
    if(keys[" "]){
        let tmp=new bul(drct,ax,ay);
        buls.push(tmp);
    }
    for(let i=0;i<buls.length;i++){
        buls[i].move();
    }
    console.log(gx,gy);
    requestAnimationFrame(mainloop);
}
mainloop();