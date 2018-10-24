import { ResourceLoader } from "../utils/resource-loader";
import { KeyedCollection } from "../utils/keyed-collection";
import { Entity } from "./entity";
import { IdGenerator } from "../utils/id-generator";

export class EntityEvents {

    public added: Entity[] = [];
    public removed: Entity[] = [];
    public modified: Entity[] = [];
}

export class Scene {

    private readonly _name: string;

    private _entitiesById: KeyedCollection<Entity>;
    private _entitiesToAdd: Entity[];
    private _entitiesToRemove: Entity[];
    private _entitiesModified: KeyedCollection<Entity>;
    
    private _resourceLoader: ResourceLoader;
    private _idGenerator: IdGenerator;
    
    constructor(name: string) {
        this._name = name;

        this._entitiesById = new KeyedCollection<Entity>();
        this._entitiesToAdd = [];
        this._entitiesToRemove = [];
        this._entitiesModified = new KeyedCollection<Entity>();

        this._resourceLoader = new ResourceLoader();
        this._idGenerator = new IdGenerator();
    }

    // TODO: error handling
    public load(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this._entitiesById.values().forEach(e => e.loadResources(this._resourceLoader));

            this._resourceLoader.load(() => resolve());
        });
    }

    public add(entity: Entity): void {
        this._entitiesToAdd.push(entity);
    }

    // TODO: fix. this wont work as expected. entities that are removed lose their id before events are processed.
    public postTickEntityEvents(): EntityEvents {
        for (let e of this._entitiesToRemove) {
            this._entitiesById.remove(e.id);
            this._idGenerator.pushId(e.id);
        }

        for (let e of this._entitiesToAdd) {
            e.id = this._idGenerator.popId();
            this._entitiesById.add(e.id, e);
        }

        let results = {
            added: this._entitiesToAdd.length > 0 ? [...this._entitiesToAdd] : [],
            removed: this._entitiesToRemove.length > 0 ? [...this._entitiesToRemove] : [],
            modified: this._entitiesModified.count() > 0 ? [...this._entitiesModified.values()] : []
        };

        this._entitiesToAdd = [];
        this._entitiesToRemove = [];
        this._entitiesModified.clear();

        return results;
    }
}