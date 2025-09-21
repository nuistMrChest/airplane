export class Mine {
    static ms = 5;
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.tx = new Image();
        this.tx.src = "mine.png";
    }
    move() {
        this.y += Mine.ms;
    }
}
