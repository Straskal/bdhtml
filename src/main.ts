import { Engine } from "./core/engine";
import { Scene } from "./core/scene";
import { Entity } from "./core/entity";
import { Vector2 } from "./math/vector2";
import { Sprite } from "./core/components/sprite";
import { RenderSystem } from "./core/systems/renderSystem";
import { Movement } from "./core/components/movement";
import { MovementSystem } from "./core/systems/movementSystem";
import { Player } from "./core/components/player";
import { PlayerControllerSystem } from "./core/systems/playerControllerSystem";
import { BruteForceCollisionSystem } from "./core/systems/bruteForceCollisionSystem";
import { BoxCollider } from "./core/components/boxCollider";

window.onload = () => {
    let e = new Entity(
        "steve",
        Vector2.zero,
        [
            new Sprite("./assets/player.png"),
            new Movement(),
            new Player(3, 30),
            new BoxCollider(0, 0, 40, 50)
        ]
    );

    let e2 = new Entity(
        "poo",
        new Vector2(100, 100),
        [
            new Sprite("./assets/player.png"),
            new BoxCollider(0, 0, 40, 50)
        ]
    );

    let s = new Scene("level1");
    s.add(e);
    s.add(e2);

    let engine = new Engine({
        entry: s,
        logicSystems: [
            new PlayerControllerSystem(),
            new MovementSystem(),
            new BruteForceCollisionSystem()
        ],
        renderSystems: [
            new RenderSystem()
        ]
    });

    engine.start();
}