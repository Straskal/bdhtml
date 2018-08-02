import * as PIXI from "pixi.js";
import { IdGenerator } from "app/utils/id-generator";

import { Behavior } from "app/core/behavior";
import { Vector2 } from "../../basic-types/vector2";
import { Scene } from "app/core/scene";

export class Actor {
    private readonly idGen: IdGenerator;

    public id: number;
    public name: string;
    public pos: Vector2;

    public scene: Scene;

    private components: Behavior[];
    private componentsById: Map<number, Behavior>;
    private componentsToAdd: Behavior[];
    private componentsToRemove: Behavior[];

    constructor(name: string, x: number, y: number) {
        this.idGen = new IdGenerator();
        this.name = name;
        this.pos = new Vector2(x, y);

        this.components = new Behavior[0];
    }

    public addComponent(component: Behavior): void {
        component.owner = this;
        component.id = this.idGen.popId();
        component.added();
        this.componentsToAdd.push(component);
    }

    public removeComponent(component: Behavior): void {
        // TODO
    }

    public getComponent<T extends Behavior>(compType: string): T {
        let c = this.components.filter(item => item.type === compType)[0] as T;
        if (!c) {
            let co = this.componentsToAdd.filter(item => item.type === compType)[0] as T;
            return co;
        }
        return c;
    }

    public update(dt: number): void {
        this.components.forEach(c => {
            c.update(dt);
        });
    }

    private updateComponentLists(): void {
        while (this.componentsToAdd.length > 0) {
            let c = this.componentsToAdd.pop();
            c.start();
        }

        while (this.componentsToRemove.length > 0) {
            let c = this.componentsToRemove.pop();
            c.removed();
        }
    }
}
