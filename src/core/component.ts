import { ResourceLoader } from "../utils/resource-loader";
import { Entity } from "./entity";
import { EventEmitter } from "events";

export class Component extends EventEmitter {

    private _owner: Entity;

    get owner(): Entity {
        return this._owner;
    }

    set owner(value: Entity) {
        this._owner = value;
    }

    public loadResources(loader: ResourceLoader): void { }
}