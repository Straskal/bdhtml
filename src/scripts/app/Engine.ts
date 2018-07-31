import * as PIXI from "pixi.js";

export class Engine {
    public app: PIXI.Application;

    private sprite: PIXI.Sprite;

    constructor() {
        const canvas = document.getElementById("app-canvas") as HTMLCanvasElement;

        this.app = new PIXI.Application({
            width: 800,
            height: 600,
            backgroundColor: 0x061639,
            view: canvas
        });
        
    }

    public initialize(): void {
        this.app.loader.add("bro", "./assets/gfx/bunny.png").load(this.loaded.bind(this));
    }

    public run(): void {
        // _
    }

    private loaded(): void {
        let t = this.app.loader.resources["bro"];
        this.sprite = new PIXI.Sprite(t.texture);
        this.app.stage.addChild(this.sprite);
    }
}
