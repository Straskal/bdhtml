import { Entity } from "./entity";

export abstract class Behavior {

    protected _needsUpdate: boolean = false;

    public _owner: Entity;

    get needsUpdate(): boolean {
        return this._needsUpdate;
    }

    public preStart(): void { }
    public start(): void { }
    public update(dt: number): void { }
    public end(): void { }
}
