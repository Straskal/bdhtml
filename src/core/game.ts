import { Actor } from "./actor";
import { Keyboard, KeyCode } from "../input/keyboard";

export class Game {
    public canvas: HTMLCanvasElement;
    public context: CanvasRenderingContext2D | null;

    private now: number;
    private dt: number;
    private last: number;
    private step: number;

    private interval: number;

    private actor: Actor;

    constructor() {
        this.now = 0;
        this.dt = 0;
        this.last = this.timestamp();
        this.step = 1 / 60;
    }

    public initialize(): void {
        this.canvas = document.createElement("canvas");
        this.canvas.width = 800;
        this.canvas.height = 600;
        this.canvas.id = "game";
        this.context = this.canvas.getContext("2d");

        Keyboard.initialize();

        document.body.insertBefore(this.canvas, document.body.childNodes[0]);  

        let resDiv = document.createElement("div");
        resDiv.id = "resources";
        
        document.body.insertBefore(resDiv, document.body.childNodes[0]);

        if (this.context !== null) {
            this.context.fillStyle = "red";
            this.context.fillRect(10, 10, 32, 32);
        }

        this.actor = new Actor();
        this.actor.width = 32;
        this.actor.height = 32;
        this.actor.color = "red";

        this.update();
    }

    private update(): void {
        Keyboard.update();

        this.now = this.timestamp();
        this.dt = this.dt + Math.min(1, (this.now - this.last) / 1000);

        if (Keyboard.isKeyDown(KeyCode.KEY_D)) {
            this.actor.pos.x += 1 * 50 * this.dt;
        }        
        if (Keyboard.isKeyDown(KeyCode.KEY_A)) {
            this.actor.pos.x -= 1 * 50 * this.dt;
        }    
        
        if (this.context !== null) {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.context.fillStyle = "black";
            this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }
        if (this.context !== null) {
            this.actor.draw(this.context);
        }

        this.last = this.now;
        requestAnimationFrame(this.update.bind(this));
    }

    private timestamp(): number {
        return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
    }
}
