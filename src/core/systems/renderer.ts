import { IRenderSystem } from "../iRenderSystem";
import { Entity } from "../entity";
import { KeyedCollection } from "../../utils/keyed-collection";
import { Sprite } from "../components/sprite";

export class Renderer implements IRenderSystem {

    private _spritesById: KeyedCollection<Sprite>;

    constructor() {
        this._spritesById = new KeyedCollection<Sprite>();
    }

    draw(ctx: CanvasRenderingContext2D): void {
        for (let s of this._spritesById.values()) {
            let pos = s.owner.transform.localPosition;

            ctx.drawImage(s.img, pos.x, pos.y);
        }
    }

    onEntityAdded(entity: Entity): void {
        let s = entity.getBehaviorOfType(Sprite);
        if (s != null) {
            this._spritesById.add(s.owner.id, s);
        }
    }

    onEntityRemoved(entity: Entity): void {
        
    }

    onEntityModified(entity: Entity): void {
        
    }
}
