import { ResourceLoader } from "../utils/resource-loader";
import { Entity } from "./entity";
import { EventEmitter } from "events";

export abstract class Component extends EventEmitter {

    private _owner: Entity;

    get owner(): Entity {
        return this._owner;
    }

    public loadResources(loader: ResourceLoader): void { }
}