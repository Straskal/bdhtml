import { MGame } from "./core/m-game";
import { Level } from "./core/level";
import { Entity } from "./core/entity";
import { Behavior } from "./core/behavior";
import { Keyboard, KeyCode } from "./input/keyboard";
import { Sprite } from "./core/sprite";
import { Renderer } from "./modules/renderer";
import { Vector2 } from "./math/vector2";
import { BoxCollider } from "./core/box-collider";
import { NaiveCollision } from "./modules/naive-collision";

class Player extends Behavior {

    protected _needsUpdate: boolean = true;

    public preStart(): void {
        this._owner.on("collision", o => {
            let other = o as Entity;
            console.log(other);
        })
    }

    public update(dt: number): void {
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
    let e = new Entity({
        name: "steve",
        behaviors: [
            new Player(),
            new Sprite("assets/player.png"),
            new BoxCollider(0, 0, 64, 64)
        ],
        position: new Vector2()
    });
    let e2 = new Entity({
        name: "marge",
        behaviors: [
            new Sprite("assets/player.png"),
            new BoxCollider(0, 0, 64, 64)
        ],
        position: new Vector2(100, 0)
    });
    
    let level = new Level();
    level.addEntity(e);
    level.addEntity(e2);

    let game = new MGame({
        startLevel: level,
        modules: [
            new NaiveCollision(),
            new Renderer()
        ]
    });
    game.initialize();
}
