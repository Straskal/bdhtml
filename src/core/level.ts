import { KeyedCollection } from "../utils/keyed-collection";
import { Entity } from "./entity";
import { IdGenerator } from "../utils/id-generator";

export class Level {

    private _entitiesById: KeyedCollection<Entity>;
    private _entitiesToAdd: Entity[];
    private _entitiesToRemove: number[];

    private _idGen: IdGenerator;

    constructor() {
        this._entitiesById = new KeyedCollection<Entity>();
        this._entitiesToAdd = [];
        this._entitiesToRemove = [];

        this._idGen = new IdGenerator();
    }

    public addEntity(e: Entity): void {
        this._entitiesToAdd.push(e);
    }

    public getEntityById(id: number): Entity {
        return this._entitiesById.item(id);
    }

    public start(): void {
        this._updateEntityLists();
    }

    public update(dt: number): void {
        this._updateEntityLists();

        for (let e of this._entitiesById.values()) {
            e.update(dt);
        }
    }

    public draw(): void {

    }

    public end(): void {
        
    }

    private _updateEntityLists(): void {
        while (this._entitiesToRemove.length !== 0) {
            let eId = <number>this._entitiesToRemove.pop();
            let e = this.getEntityById(eId);
            e.end();
            this._entitiesById.remove(eId);
        }

        for (let e of this._entitiesToAdd) {
            e._setLevel(this);
            e._setId(this._idGen.getId());
            e.preStart();
            this._entitiesById.add(e.id, e);
        }

        while (this._entitiesToAdd.length !== 0) {
            let e = <Entity>this._entitiesToAdd.pop();
            e.start();
        }
    }
}
