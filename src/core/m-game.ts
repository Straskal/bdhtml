import { Keyboard } from "../input/keyboard";
import { Level } from "./level";

export interface MGameStartOptions {
    startLevel: Level;
}

export class MGame {
    public canvas: HTMLCanvasElement;
    public context: CanvasRenderingContext2D | null;

    private now: number;
    private dt: number;
    private last: number;
    private step: number;

    private interval: number;

    private currentLevel: Level;

    constructor(startOpts: MGameStartOptions) {
        this.now = 0;
        this.dt = 0;
        this.last = this.timestamp();
        this.step = 1 / 60;

        this.currentLevel = startOpts.startLevel;
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

        this.currentLevel.start();

        this.update();
    }

    private update(): void {
        Keyboard.update();

        this.now = this.timestamp();
        this.dt = this.dt + Math.min(1, (this.now - this.last) / 1000);

        this.currentLevel.update(this.dt);
        
        if (this.context !== null) {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.context.fillStyle = "black";
            this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }

        this.last = this.now;
        requestAnimationFrame(this.update.bind(this));
    }

    private timestamp(): number {
        return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
    }
}
