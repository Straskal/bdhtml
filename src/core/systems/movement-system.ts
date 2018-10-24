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

    tick(dt: number): void {
        this._movementsById.item(0).velocity = new Vector2(0, 0);
        if (Keyboard.isKeyDown(KeyCode.KEY_D)) {
            this._movementsById.item(0).velocity = new Vector2(0, 1);
        }
        if (Keyboard.isKeyDown(KeyCode.KEY_A)) {
            this._movementsById.item(0).velocity = new Vector2(0, -1);
        }
    }

    fixedTick(): void {
        let m = this._movementsById.item(0)
        let velocity = this._movementsById.item(0).velocity;
        m.owner.transform.localPosition = Vector2.add(m.owner.transform.localPosition, velocity);
    }

    onEntityAdded(entity: Entity): void {
        let s = entity.getBehaviorOfType(Movement);
        if (s != null) {
            this._movementsById.add(s.owner.id, s);
        }
    }

    onEntityRemoved(entity: Entity): void {

    }

    onEntityModified(entity: Entity): void {

    }
}
