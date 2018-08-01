import * as PIXI from "pixi.js";
import { Behavior } from "app/core/behavior";

export class Sprite extends Behavior {

    private texturePath: string;
    private sprite: PIXI.Sprite;

    constructor(texturePath: string) {
        super();

        this.type = "Sprite";
        this.texturePath = texturePath;
    }

    public start(): void {
        this.owner.scene.Loader.add(this.texturePath).load(this.loaded.bind(this));
    }

    private loaded(): void {
        let t = this.Scene.Loader.resources[this.texturePath];
        this.sprite = new PIXI.Sprite(t.texture);
        this.owner.scene.engine.app.stage.addChild(this.sprite);
    }
}
