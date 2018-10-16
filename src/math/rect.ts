export class Rect {
    public x: number;
    public y: number;
    public width: number;
    public height: number;

    constructor(x?: number, y?: number, w?: number, h?: number) {
        this.x = x || 0;
        this.y = y || 0;
        this.width = w || 0;
        this.height = h || 0;
    }
}
