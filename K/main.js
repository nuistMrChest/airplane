



let bk=document.querySelector("#bk");
let pen = bk.getContext("2d");
let grd= new Image();
grd.src="ground.png";
let gx=960;
let gy=540;
const cs=960;
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
    if(keys["w"]&&gy<90*gl){
        gy+=5;
    }
    if(keys["a"]&&gx<90*gl){
        gx+=5;
    }
    if(keys["s"]&&gy>-90*gl){
        gy-=5;
    }
    if(keys["d"]&&gx>-90*gl){
        gx-=5;
    }
    for(let i=-100;i<100;i++){
        for(let j=-100;j<100;j++){
            let tx=gx+i*gl;
            let ty=gy+j*gl;
            if(tx>-100&&tx<1930&&ty>-100&&ty<1090){
                pen.drawImage(grd,tx,ty,gl,gl);
            }
        }
    }
    // console.log(gx,gy);
    requestAnimationFrame(mainloop);
}
mainloop();