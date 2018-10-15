import { Entity } from "./entity";

export abstract class Module {

    protected _needsUpdate: boolean;
    protected _needsDraw: boolean;

    get needsUpdate(): boolean {
        return this._needsUpdate;
    }
    get needsDraw(): boolean {
        return this._needsDraw;
    }

    public update(dt: number): void { }
    public draw(ctx: CanvasRenderingContext2D): void { }

    public onEntityAdded(e: Entity): void { }
    public onEntityRemoved(eId: number): void { }
}
