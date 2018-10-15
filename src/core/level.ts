import { KeyedCollection } from "../utils/keyed-collection";
import { Entity } from "./entity";
import { IdGenerator } from "../utils/id-generator";
import { Sprite } from "./sprite";
import { MGame } from "./m-game";

export class Level {

    private _entitiesById: KeyedCollection<Entity>;
    private _entitiesToAdd: Entity[];
    private _entitiesToRemove: number[];

    private _idGen: IdGenerator;

    public game: MGame;

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

    public preStart(): void {
        while (this._entitiesToAdd.length > 0) {
            let e = <Entity>this._entitiesToAdd.pop();
            e._setLevel(this);
            e._setId(this._idGen.getId());
            e.preStart();
            this._entitiesById.add(e.id, e);
            for (let m of this.game._modules) {
                m.onEntityAdded(e);
            }
        }
    }

    public start(): void {
        for (let e of this._entitiesById.values()) {
            e.start();
        }
    }

    public update(dt: number): void {
        this._updateEntityLists();

        for (let e of this._entitiesById.values()) {
            e.update(dt);
        }
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        for (let e of this._entitiesById.values()) {
            let s = e.getBehaviorOfType(Sprite);
            if (s != null) {
                ctx.drawImage(s.texture, e.position.x, e.position.y);
            }
        }
    }

    public end(): void {
        for (let e of this._entitiesById.values()) {
            e.end();
        }
    }

    private _updateEntityLists(): void {
        while (this._entitiesToRemove.length !== 0) {
            let eId = <number>this._entitiesToRemove.pop();
            let e = this.getEntityById(eId);
            e.end();
            for (let m of this.game._modules) {
                m.onEntityRemoved(e.id);
            }
            this._entitiesById.remove(eId);
        }

        for (let e of this._entitiesToAdd) {
            e._setLevel(this);
            e._setId(this._idGen.getId());
            e.preStart();
            this._entitiesById.add(e.id, e);
            for (let m of this.game._modules) {
                m.onEntityAdded(e);
            }
        }

        while (this._entitiesToAdd.length !== 0) {
            let e = <Entity>this._entitiesToAdd.pop();
            e.start();
        }
    }
}
