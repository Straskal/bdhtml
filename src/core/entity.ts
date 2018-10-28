import { ResourceLoader } from "../utils/resource-loader";
import { Component } from "./component";
import { Vector2 } from "../math/vector2";
import { Transform } from "../math/transform";
import { Scene } from "./scene";

export class Entity {

    private _scene: Scene;

    // set by scene
    private _id: number;

    private readonly _name: string;
    private readonly _transform: Transform;
    private _components: Component[];

    get uid(): number {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get transform(): Transform {
        return this._transform;
    }

    get scene(): Scene {
        return this._scene;
    }

    constructor(
        name: string,
        position: Vector2,
        components: Component[]) {
            
        this._name = name;

        this._transform = new Transform();
        this._transform.localPosition = position;

        this._components = components;

        this._components.forEach(c => (<any>c)._owner = this);
    }

    public loadResources(loader: ResourceLoader): void {
        this._components.forEach(c => c.loadResources(loader));
    }

    public getComponentOfType<T extends Component>(TCtor: new (...args: any[]) => T): T | null {
        for (let b of this._components) {
            if (b instanceof TCtor) {
                return b as T;
            }
        }
        return null;
    }
}
