import { MGame } from "./core/m-game";
import { Level } from "./core/level";
import { Entity } from "./core/entity";
import { Behavior } from "./core/behavior";
import { Keyboard, KeyCode } from "./input/keyboard";
import { Sprite } from "./core/sprite";

class TestBehavior extends Behavior {

    protected _needsUpdate: boolean = true;

    public preStart(): void {
        console.log("behavior pre started!");
    }

    public start(): void {
        console.log("behavior started!");
    }

    public update(dt: number): void {
        if (Keyboard.isKeyDown(KeyCode.KEY_W)) {
            console.log("W pressed!");
        }
    }
}

window.onload = () => {
    let level = new Level();
    let e = new Entity({
        name: "steve",
        behaviors: [
            new TestBehavior(),
            new Sprite("assets/player.png")
        ]
    });
    level.addEntity(e);

    let game = new MGame({
        startLevel: level
    });
    game.initialize();
}
