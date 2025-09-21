export class Boss {
    constructor(bk) {
        this.x = bk.width * 0.5;
        this.y = 1000;
        this.tx = new Image();
        this.bcd = 90;
        this.mcd = 75;
        this.tx.src = "boss.png";
        this.hp = 58736110;
    }
    move(xx) {
        if (this.x < xx) {
            this.x += 5;
        } else if (this.x > xx) {
            this.x -= 5;
        }
    }
}
