import { Vector2 } from "../math/vector2";
import { Rectf } from "../math/rect";

export class Actor {
    public pos: Vector2;
    public height: number;
    public width: number;
    public color: string;
    public image: HTMLImageElement;

    constructor() {
        this.pos = new Vector2(0, 0);
        this.color = "red";

        let resDiv = document.getElementById("resources") as HTMLDivElement;
        this.image = document.createElement("img");
        this.image.src = "../assets/player.png";
        this.image.style.display = "none";
        this.image.width = 64;
        this.image.height = 64;
        resDiv.appendChild(this.image);
    }

    public draw(context: CanvasRenderingContext2D): void {
        context.fillStyle = this.color;
        context.drawImage(this.image, this.pos.x, this.pos.y, this.width, this.height);
    }
}