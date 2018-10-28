import { ILogicSystem } from "../iLogicSystem";
import { Entity } from "../entity";
import { Movement } from "../components/movement";
import { KeyedCollection } from "../../utils/keyed-collection";

import { Vector2 } from "../../math/vector2";
import { Keyboard, KeyCode } from "../../input/keyboard";

export class MovementSystem implements ILogicSystem {

    private _movementsById: KeyedCollection<Movement>;

    constructor() {
        this._movementsById = new KeyedCollection<Movement>();
    }

    public tick(dt: number) { }

    public fixedTick(): void {
        for (let m of this._movementsById.values()) {
            let transform = m.owner.transform;
            transform.localPosition= Vector2.add(transform.localPosition, m.velocity);
        }
    }

    public onEntityAdded(entity: Entity): void {
        let s = entity.getComponentOfType(Movement);
        if (s != null) {
            this._movementsById.add(s.owner.uid, s);
        }
    }

    public onEntityRemoved(entity: Entity): void {

    }

    public onEntityModified(entity: Entity): void {

    }
}
