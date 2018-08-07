import { Actor } from "./actor";

export class Game {
    public canvas: HTMLCanvasElement;
    public context: CanvasRenderingContext2D | null;

    private interval: number;

    private actor: Actor;

    public initialize(): void {
        this.canvas = document.createElement("canvas");
        this.canvas.id = "game";

        this.context = this.canvas.getContext("2d");

        document.body.insertBefore(this.canvas, document.body.childNodes[0]);  

        if (this.context !== null) {
            this.context.fillStyle = "red";
            this.context.fillRect(10, 10, 32, 32);
        }
        
        this.interval = setInterval(this.update, 20);
        this.actor = new Actor();
        this.actor.width = 32;
        this.actor.height = 32;
        this.actor.color = "red";
    }

    private update(): void {
        if (this.context !== null) {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }

        if (this.context !== null) {
            this.actor.draw(this.context);
        }
    }
}
