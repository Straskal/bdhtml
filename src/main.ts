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

window.onload = () => {
    let e = new Entity("steve", Vector2.zero, [new Sprite("./assets/player.png"), new Movement(), new Player(10, 30)])
    let s = new Scene("level1");
    s.add(e);

    let engine = new Engine({
        entry: s,
        logicSystems: [
            new PlayerControllerSystem(), 
            new MovementSystem()],
        renderSystems: [
            new RenderSystem()
        ]
    });

    engine.start();
}