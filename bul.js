import { Mine } from "./mine.js";

export class Bul {
    static bs = 20;
    constructor(drct, x, y) {
        this.drct = drct;
        this.x = x;
        this.y = y;
        this.tx1 = new Image();
        this.tx1.src = "bul1.png";
        this.tx2 = new Image();
        this.tx2.src = "bul2.png";
        this.tx3 = new Image();
        this.tx3.src = "bul3.png";
    }
    move() {
        if (this.drct == 0) {
            this.y -= (Bul.bs - Mine.ms);
        } else if (this.drct == 1) {
            this.y += (Bul.bs + Mine.ms);
        }
    }
}
