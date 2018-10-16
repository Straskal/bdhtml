import { Module } from "../core/module";
import { BoxCollider } from "../core/box-collider";
import { KeyedCollection } from "../utils/keyed-collection";
import { Entity } from "../core/entity";
import { Rect } from "../math/rect";

class Collision {
    public coll1: BoxCollider;
    public coll2: BoxCollider;

    constructor(coll1: BoxCollider, coll2: BoxCollider) {
        this.coll1 = coll1;
        this.coll2 = coll2;
    }
}

export class NaiveCollision extends Module {

    private bcByEntityId: KeyedCollection<BoxCollider> = new KeyedCollection<BoxCollider>();

    constructor() {
        super();

        this._needsUpdate = true;
    }

    public onEntityAdded(e: Entity): void {
        let s = e.getBehaviorOfType(BoxCollider);
        if (s !== null) {
            this.bcByEntityId.add(e.id, s);
        }
    }

    public onEntityRemoved(eId: number): void {
        this.bcByEntityId.remove(eId);
    }

    public update(dt: number): void {
        let collisions = new Array<Collision>();
        let colliders = this.bcByEntityId.values();

        for (let x = 0; x < colliders.length; x++) {
            for (let i = x + 1; i < colliders.length; i++) {
                if (this._collides(colliders[x].getRect(), colliders[i].getRect())) {
                    collisions.push(new Collision(colliders[x], colliders[i]));
                }
            }
        }

        for (let collision of collisions) {
            collision.coll1._owner.emit("collision", collision.coll2);
            collision.coll2._owner.emit("collision", collision.coll1);
        }
    }

    private _collides(rect1: Rect, rect2: Rect): boolean {
        return rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.y + rect1.height > rect2.y;
    }
}
