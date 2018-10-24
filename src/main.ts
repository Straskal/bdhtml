import { Engine } from "./core/engine";
import { Scene } from "./core/scene";
import { Entity } from "./core/entity";
import { Vector2 } from "./math/vector2";
import { Sprite } from "./core/components/sprite";
import { Renderer } from "./core/systems/renderer";

window.onload = () => {
    let e = new Entity("steve", Vector2.zero, [new Sprite("./assets/player.png")])
    let s = new Scene("level1");
    s.add(e);

    let engine = new Engine({
        entry: s,
        logicSystems: [],
        renderSystems: [new Renderer()]
    });

    engine.start();
}