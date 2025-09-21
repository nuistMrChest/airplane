import { Mine } from "./mine.js";

export class Ene {
    constructor(bk) {
        this.x = Math.random() * bk.width;
        this.y = 0;
        this.tx = new Image();
        let txr = Math.random();
        if (txr < 0.25) {
            this.tx.src = "ene1.png";
            this.tp = 1;
        } else if (txr < 0.5) {
            this.tx.src = "ene2.png";
            this.tp = 2;
        } else if (txr < 0.75) {
            this.tx.src = "ene3.png";
            this.tp = 3;
        } else {
            this.tx.src = "ene4.png";
            this.tp = 4;
        }
        this.cd = 70;
    }
    move() {
        this.y += Mine.ms * 2;
    }
}
