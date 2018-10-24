import { ResourceLoader } from "../utils/resource-loader";
import { Entity } from "./entity";

export class Component {

    private _owner: Entity;

    get owner(): Entity {
        return this._owner;
    }

    set owner(value: Entity) {
        this._owner = value;
    }

    public loadResources(loader: ResourceLoader): void { }
}