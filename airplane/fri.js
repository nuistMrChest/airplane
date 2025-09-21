export class Fri {
    static fs = 10;
    constructor(x) {
        this.x = x;
        this.y = 1000;
        let txr = Math.random();
        this.tx = new Image();
        if (txr < 0.25) {
            this.tx.src = "f1.png";
            this.tp = 1;
        } else if (txr < 0.5) {
            this.tx.src = "f2.png";
            this.tp = 2;
        } else if (txr < 0.75) {
            this.tx.src = "f3.png";
            this.tp = 3;
        } else {
            this.tx.src = "f4.png";
            this.tp = 4;
        }
        this.cd = 20;
    }
    move() {
        this.y -= Fri.fs;
    }
}
