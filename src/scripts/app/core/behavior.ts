import { Actor } from "app/core/actor";
import { Scene } from "app/core/scene";

export class Behavior {

    public owner: Actor;
    public type: string;
    public id: number;

    get Scene(): Scene {
        return this.owner.scene;
    }

    public added(): void { }
    public start(): void { }
    public update(dt: number): void { }
    public removed(): void { }
}
