import { ResourceLoader } from "../utils/resource-loader";
import { KeyedCollection, StrKeyedCollection } from "../utils/keyed-collection";
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
    private _entitiesByTag: StrKeyedCollection<number[]>;
    private _entitiesToAdd: Entity[];
    private _entitiesToRemove: Entity[];
    private _entitiesModified: KeyedCollection<Entity>;

    private _resourceLoader: ResourceLoader;
    private _idGenerator: IdGenerator;

    constructor(name: string) {
        this._name = name;

        this._entitiesById = new KeyedCollection<Entity>();
        this._entitiesByTag = new StrKeyedCollection<number[]>();
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
        (<any>entity)._scene = this;
        (<any>entity)._uid = this._idGenerator.popId();
        entity.loadResources(this._resourceLoader);
        this._entitiesToAdd.push(entity);
    }

    public tagEntity(e: Entity, tag: string): void {
        if (this._entitiesByTag.containsKey(tag)) {
            let taggedIds = this._entitiesByTag.item(tag);
            taggedIds.push(e.uid);
        }
        else {
            this._entitiesByTag.add(tag, [e.uid])
        }
    }

    // public isEntityTagged(entity: Entity, tag: string): boolean {

    // }

    // TODO: fix. this wont work as expected. entities that are removed lose their id before events are processed.
    public postTickEntityEvents(): EntityEvents {
        for (let e of this._entitiesToRemove) {
            this._entitiesById.remove(e.uid);
            this._idGenerator.pushId(e.uid);
        }

        for (let e of this._entitiesToAdd) {
            
            this._entitiesById.add(e.uid, e);
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