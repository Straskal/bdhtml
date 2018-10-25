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

    public overlaps(rect: Rect): boolean {
        return this.x < rect.x + rect.width 
        && this.x + this.width > rect.x 
        && this.y < rect.y + rect.height
        && this.y + this.height > rect.y
    }
}
