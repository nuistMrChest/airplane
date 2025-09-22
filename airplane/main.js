import { Mine } from "./mine.js";
import { Bul } from "./bul.js";
import { Ene } from "./ene.js";
import { Boss } from "./boss.js";
import { Fri } from "./fri.js";

let planet = new Image();
planet.src = "plane.png";
let x = 960 - 55;
let y = 1000 - 53;
let s = 10;
let fcd = 10;
let bk = document.querySelector("#bk");
let pen = bk.getContext("2d");
let keys = {};
let prob;
let pm = 0.03;
let pe = 0.005;
let mines = [];
let buls = [];
let enes = [];
let fris = [];
let ctrl = 0;
let bc = 60;
let boss1 = new Boss(bk);
let bscnt = 0;
let pha = 0;
document.addEventListener("keydown", (e) => {
  keys[e.key.toLowerCase()] = true;
});
document.addEventListener("keyup", (e) => {
  keys[e.key.toLowerCase()] = false;
});

let mrs=false;
let mr=document.querySelector("#mr");
mr.addEventListener("touchstart",()=>{
  mrs=true;
})
mr.addEventListener("touchend",()=>{
  mrs=false;
})

let mls=false;
let ml=document.querySelector("#ml");
ml.addEventListener("touchstart",()=>{
  mls=true;
})
ml.addEventListener("touchend",()=>{
  mls=false;
})

let sts=false;
let st=document.querySelector("#st");
st.addEventListener("touchstart",()=>{
  sts=true;
})
st.addEventListener("touchend",()=>{
  sts=false;
})

let score = document.querySelector("#score");
let sn = 1;

let hb = document.querySelector("#bhp");

let ss = 60;

function resetGame() {
  x = 960 - 55;
  y = 1000 - 53;
  s = 10;
  pm = 0.03;
  pe = 0.005;
  mines = [];
  buls = [];
  enes = [];
  fris = [];
  ctrl = 0;
  bc = 60;
  boss1 = new Boss(bk);
  bscnt = 0;
  pha = 0;
  sn = 1;
  score.innerText = sn;
  hb.innerText = boss1.hp;
  keys["d"] = false;
  keys["a"] = false;
  keys["h"] = false;
  keys[" "] = false;
  mrs=false;
  mls=false;
  sts=false;
}

function mainloop() {
  if (pha == 0 && sn >= 500) {
    pm = 0.04;
    pe = 0.01;
    ss = 70;
    pha = 1;
  }
  if (pha == 1 && sn >= 1200) {
    pm = 0.06;
    pe = 0.015;
    pha = 2;
    ss = 80;
  }

  pen.clearRect(0, 0, bk.width, bk.height);
  prob = Math.random();

  fcd++;
  if (keys["h"] && fcd > 10) {
    fcd = 0;
    for (let i = 0; i < 8; i++) {
      let nf = new Fri(bk.width * Math.random());
      fris.push(nf);
    }
  }
  for (let i = 0; i < fris.length; i++) {
    fris[i].cd++;
  }
  for (let i = fris.length - 1; i >= 0; i--) {
    if (fris[i].y < 0) {
      fris.splice(i, 1);
    }
  }
  for (let i = 0; i < fris.length; i++) {
    fris[i].move();
    let xx, yy;
    if (fris[i].tp == 1) {
      xx = fris[i].x - 55;
      yy = fris[i].y - 50.5;
    } else if (fris[i].tp == 2) {
      xx = fris[i].x - 63;
      yy = fris[i].y - 63;
    } else if (fris[i].tp == 3) {
      xx = fris[i].x - 55;
      yy = fris[i].y - 85.5;
    } else if (fris[i].tp == 4) {
      xx = fris[i].x - 55;
      yy = fris[i].y - 47.5;
    }
    pen.drawImage(fris[i].tx, xx, yy, fris[i].tx.width, fris[i].tx.height);
    if (fris[i].cd >= 20) {
      fris[i].cd = 0;
      let nb = new Bul(0, fris[i].x, fris[i].y - 90);
      buls.push(nb);
    }
  }

  if (boss1.hp <= 0) {
    alert("你赢了！");
    resetGame();
  }
  if (sn >= 1000 && bscnt <= 60 * 60) {
    pm = 0;
    pe = 0;
    if (y != 150 - 53) {
      y -= 10;
    }
    if (y == 150 - 53) {
      bscnt++;
      boss1.bcd++;
      if (boss1.bcd > 90) {
        boss1.bcd = 0;
        let nb = new Bul(0, boss1.x, boss1.y);
        buls.push(nb);
      }
      boss1.move(x + 55);
      pen.drawImage(boss1.tx, boss1.x - 55, boss1.y - 45, 110, 90);
    }
  } else if (bscnt > 60 * 60) {
    if (ctrl == 0 && pe == 0) {
      pe = 0.005;
      ctrl = 1;
    }
    if (y != 1000 - 53) {
      y += 10;
    }
    if (boss1.y > 150) {
      boss1.y -= 10;
      if (boss1.y < 150) boss1.y = 150;
    }
    if (y == 1000 - 53 && boss1.y == 150) {
      boss1.mcd++;
      if (boss1.mcd++ > 75) {
        boss1.mcd = 0;
        let nm = new Mine(boss1.x, boss1.y);
        mines.push(nm);
      }

      for (let i = buls.length - 1; i >= 0; i--) {
        if (
          buls[i].drct == 0 &&
          Math.abs(boss1.x - buls[i].x) < 60 &&
          Math.abs(boss1.y - buls[i].y) < 60
        ) {
          buls.splice(i, 1);
          boss1.hp -= 2500000;
        }
      }

      let fb;
      if (buls.length > 0) {
        for (fb = 0; fb < buls.length; fb++) {
          if (buls[fb].drct == 0) {
            break;
          }
        }
        if (
          fb != buls.length &&
          buls[fb].x > boss1.x &&
          buls[fb].x - boss1.x < 60 &&
          buls[fb].drct == 0
        ) {
          boss1.x -= 5;
        } else if (
          fb != buls.length &&
          buls[fb].x < boss1.x &&
          buls[fb].x - boss1.x > -60 &&
          buls[fb].drct == 0
        ) {
          boss1.x += 5;
        }
      }
      boss1.move(x + 55);
    }
    pen.drawImage(boss1.tx, boss1.x - 55, boss1.y - 45, 110, 90);
  }

  if (prob < pe) {
    let ne = new Ene(bk);
    enes.push(ne);
  }
  for (let i = 0; i < enes.length; i++) {
    enes[i].cd++;
  }
  for (let i = 0; i < enes.length; i++) {
    enes[i].move();
    let xx, yy;
    if (enes[i].tp == 1) {
      xx = enes[i].x - 55;
      yy = enes[i].y - 50.5;
    } else if (enes[i].tp == 2) {
      xx = enes[i].x - 63;
      yy = enes[i].y - 63;
    } else if (enes[i].tp == 3) {
      xx = enes[i].x - 55;
      yy = enes[i].y - 85.5;
    } else if (enes[i].tp == 4) {
      xx = enes[i].x - 55;
      yy = enes[i].y - 47.5;
    }
    pen.drawImage(enes[i].tx, xx, yy, enes[i].tx.width, enes[i].tx.height);
    if (enes[i].cd >= 70) {
      enes[i].cd = 0;
      let nb = new Bul(1, enes[i].x, enes[i].y + 90);
      buls.push(nb);
    }
  }
  while (enes.length > 0 && enes[0].y > 1000) {
    enes.shift();
  }

  bc++;
  if ((keys[" "]||sts) && bc >= ss) {
    bc = 0;
    let nb = new Bul(0, x + 55, y + 10);
    buls.push(nb);
  }
  for (let i = 0; i < buls.length; i++) {
    buls[i].move();
  }
  while (buls.length > 0 && (buls[0].y < 0 || buls[0].y > 1000)) {
    buls.shift();
  }
  for (let i = 0; i < buls.length; i++) {
    let way;
    if (buls[i].drct == 0) {
      way = -17;
    } else if (buls[i].drct == 1) {
      way = 17;
    }
    pen.drawImage(buls[i].tx1, buls[i].x - 10.5, buls[i].y - 10.5, 21, 21);
    pen.drawImage(buls[i].tx2, buls[i].x - 8, buls[i].y - 8 + way, 16, 16);
    pen.drawImage(buls[i].tx3, buls[i].x - 6.5, buls[i].y - 6.5 + way * 2, 13, 13);
  }

  if (prob < pm) {
    let nm = new Mine(Math.random() * bk.width, 0);
    mines.push(nm);
  }
  for (let i = 0; i < mines.length; i++) {
    mines[i].move();
  }
  while (mines.length > 0 && mines[0].y > 1000) {
    mines.shift();
  }
  if ((keys["d"]||mrs) && x + 111 < bk.width) x += s;
  if ((keys["a"]||mls) && x > 0) x -= s;
  pen.drawImage(planet, x, y, 111, 106);
  for (let i = 0; i < mines.length; i++) {
    pen.drawImage(mines[i].tx, mines[i].x - 22, mines[i].y - 22, 44, 44);
  }

  for (let i = mines.length - 1; i >= 0; i--) {
    for (let j = buls.length - 1; j >= 0; j--) {
      if (
        mines[i].x + 22 - buls[j].x < 40 &&
        mines[i].y + 22 - buls[j].y < 40 &&
        mines[i].x + 22 - buls[j].x > -40 &&
        mines[i].y + 22 - buls[j].y > -40
      ) {
        if (buls[j].drct == 0) {
          sn++;
        }
        mines.splice(i, 1);
        buls.splice(j, 1);
        break;
      }
    }
  }
  for (let i = 0; i < buls.length; i++) {
    if (
      x + 55 - buls[i].x < 40 &&
      y + 53 - buls[i].y < 40 &&
      x + 55 - buls[i].x > -40 &&
      y + 53 - buls[i].y > -40
    ) {
      alert("你寄了！！！");
      resetGame();
    }
  }
  for (let i = enes.length - 1; i >= 0; i--) {
    for (let j = buls.length - 1; j >= 0; j--) {
      let ex = enes[i].x;
      let ey = enes[i].y;
      let bx = buls[j].x;
      let by = buls[j].y;
      if (Math.abs(ex - bx) < 60 && Math.abs(ey - by) < 60) {
        if (buls[j].drct == 0) {
          sn += 50;
        }
        enes.splice(i, 1);
        buls.splice(j, 1);
        break;
      }
    }
  }

  for (let i = fris.length - 1; i >= 0; i--) {
    for (let j = buls.length - 1; j >= 0; j--) {
      let ex = fris[i].x;
      let ey = fris[i].y;
      let bx = buls[j].x;
      let by = buls[j].y;
      if (
        Math.abs(ex - bx) < 60 &&
        Math.abs(ey - by) < 60 &&
        buls[j].drct == 1
      ) {
        fris.splice(i, 1);
        buls.splice(j, 1);
        break;
      }
    }
  }

  for (let i = 0; i < mines.length; i++) {
    if (
      x + 55 - (mines[i].x + 22) < 50 &&
      y + 53 - (mines[i].y + 22) < 50 &&
      x + 55 - (mines[i].x + 22) > -50 &&
      y + 53 - (mines[i].y + 22) > -50
    ) {
      alert("你寄了！！！");
      resetGame();
    }
  }

  score.innerText = sn;
  hb.innerText = boss1.hp;

  requestAnimationFrame(mainloop);
}

planet.onload = () => {
  mainloop();
};
