import { ILogicSystem } from "../iLogicSystem";
import { KeyedCollection, StrKeyedCollection } from "../../utils/keyed-collection";
import { BoxCollider } from "../components/boxCollider";
import { Movement } from "../components/movement";

class CollisionPair {
    public coll1: BoxCollider;
    public coll2: BoxCollider;
}

export class BruteForceCollisionSystem implements ILogicSystem {

    private _colliders: BoxCollider[]
    private _pairs: StrKeyedCollection<CollisionPair>;

    constructor() {
        this._colliders = [];
        this._pairs = new StrKeyedCollection<CollisionPair>();
    }

    tick(dt: number): void {

    }

    fixedTick(): void {
        this.detect();
        this.resolve();
    }

    private detect(): void {
        let cs = this._colliders;

        for (let i = 0; i <= cs.length - 1; i++) {
            let coll = cs[i];
            let pos = coll.owner.transform.localPosition;
            coll.rect.x = pos.x;
            coll.rect.y = pos.y;

            for (let j = i + 1; j <= cs.length - 1; j++) {
                let oColl = cs[j];
                let oPos = oColl.owner.transform.localPosition;
                oColl.rect.x = oPos.x;
                oColl.rect.y = oPos.y;

                let rect1 = coll.rect;
                let rect2 = oColl.rect;

                let pair = <any>`${coll.owner.id}:${oColl.owner.id}`;

                if (rect1.overlaps(rect2)) {
                    if (this._pairs.containsKey(pair)) {

                    }
                    else {
                        coll.emit("collision", oColl);
                        oColl.emit("collision", coll);
                        let p = new CollisionPair();
                        p.coll1 = coll;
                        p.coll2 = oColl;
                        this._pairs.add(pair, p);
                    }
                }
                else if (this._pairs.containsKey(pair)) {
                    this._pairs.remove(pair);
                }
            }
        }
    }

    private resolve() {
        for (let p of this._pairs.values()) {
            let m = p.coll1.owner.getBehaviorOfType(Movement);
            if (m) {
                let rect1 = p.coll1.rect;
                let rect2 = p.coll2.rect;

                p.coll1.owner.transform.localPosition.x -= m.velocity.x;
                p.coll1.rect.x -= m.velocity.x;

                if (rect1.overlaps(rect2)) {
                    p.coll1.owner.transform.localPosition.y -= m.velocity.y;
                    p.coll1.rect.y -= m.velocity.y;

                    p.coll1.owner.transform.localPosition.x += m.velocity.x;
                    p.coll1.rect.x += m.velocity.x;
                }
            }
        }
    }

    onEntityAdded(entity: import("c:/Users/Stras/Documents/GitHub/bdhtml/src/core/entity").Entity): void {
        let c = entity.getBehaviorOfType(BoxCollider);
        if (c != null) {
            this._colliders[entity.id] = c;
        }
    }

    onEntityRemoved(entity: import("c:/Users/Stras/Documents/GitHub/bdhtml/src/core/entity").Entity): void {
        if (this._colliders[entity.id]) {
            this._colliders.splice(entity.id, 1);
        }
    }

    onEntityModified(entity: import("c:/Users/Stras/Documents/GitHub/bdhtml/src/core/entity").Entity): void {

    }
}