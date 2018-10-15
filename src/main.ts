import { MGame } from "./core/m-game";
import { Level } from "./core/level";
import { Entity } from "./core/entity";
import { Behavior } from "./core/behavior";
import { Keyboard, KeyCode } from "./input/keyboard";
import { Sprite } from "./core/sprite";
import { Renderer } from "./modules/renderer";
import { Vector2 } from "./math/vector2";

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

        if (Keyboard.isKeyDown(KeyCode.KEY_D)) {
            this._owner.position.x++;
        }
        if (Keyboard.isKeyDown(KeyCode.KEY_A)) {
            this._owner.position.x--;
        }
        if (Keyboard.isKeyDown(KeyCode.SPACE)) {
            this._owner.getLevel().addEntity(new Entity({
                name: "steve",
                behaviors: [
                    new Sprite("assets/player.png")
                ],
                position: this._owner.position
            }));
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
        ],
        position: new Vector2()
    });
    level.addEntity(e);

    let game = new MGame({
        startLevel: level,
        modules: [
            new Renderer()
        ]
    });
    game.initialize();
}
