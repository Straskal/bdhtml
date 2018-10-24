import { Entity } from "./entity";

export interface ISystem {

    onEntityAdded(entity: Entity): void;
    onEntityRemoved(entity: Entity): void;
    onEntityModified(entity: Entity): void;
}
