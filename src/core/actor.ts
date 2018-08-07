import { Vector2 } from "../math/vector2";
import { Rectf } from "../math/rect";

export class Actor {
    public pos: Vector2;
    public height: number;
    public width: number;
    public color: string;

    constructor() {
        this.pos = new Vector2(0, 0);
        this.color = "red";
    }

    public draw(context: CanvasRenderingContext2D): void {
        context.fillStyle = this.color;
        context.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    }
}