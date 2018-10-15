import { Module } from "../core/module";
import { Entity } from "../core/entity";
import { Sprite } from "../core/sprite";
import { KeyedCollection } from "../utils/keyed-collection";

export class Renderer extends Module {

    private spritesByEntityId: KeyedCollection<Sprite> = new KeyedCollection<Sprite>();

    constructor() {
        super();

        this._needsDraw = true;
    }

    public onEntityAdded(e: Entity): void {
        let s = e.getBehaviorOfType(Sprite);
        if (s !== null) {
            this.spritesByEntityId.add(e.id, s);
        }
    }

    public onEntityRemoved(eId: number): void {
        this.spritesByEntityId.remove(eId);
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        for (let s of this.spritesByEntityId.values()) {
            let pos = s._owner.position;
            ctx.drawImage(s.texture, pos.x, pos.y);
        }
    }
}
