import { IRenderSystem } from "../iRenderSystem";
import { Entity } from "../entity";
import { KeyedCollection } from "../../utils/keyed-collection";
import { Sprite } from "../components/sprite";

export class RenderSystem implements IRenderSystem {

    private _spritesById: KeyedCollection<Sprite>;

    constructor() {
        this._spritesById = new KeyedCollection<Sprite>();
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        
        for (let s of this._spritesById.values()) {
            let pos = s.owner.transform.localPosition;

            ctx.drawImage(s.img, Math.floor(pos.x), Math.floor(pos.y));
        }
    }

    onEntityAdded(entity: Entity): void {
        let s = entity.getBehaviorOfType(Sprite);
        if (s != null) {
            this._spritesById.add(s.owner.uid, s);
        }
    }

    onEntityRemoved(entity: Entity): void {
        
    }

    onEntityModified(entity: Entity): void {
        
    }
}
