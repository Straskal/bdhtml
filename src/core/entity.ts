import { Behavior } from "./behavior";
import { IdGenerator } from "../utils/id-generator";
import { KeyedCollection } from "../utils/keyed-collection";
import { Vector2 } from "../math/vector2";
import { Level } from "./level";

export interface IEntityOptions {
    name: string;
    behaviors: Behavior[];
}

export class Entity {

    private _id: number = -1;
    private _name: string = "";
    private _position: Vector2 = new Vector2(0, 0);

    private _behaviorsById: KeyedCollection<Behavior> = new KeyedCollection<Behavior>();
    private _behaviorsToUpdate: Behavior[] = [];

    private _idGen: IdGenerator = new IdGenerator();

    private _level: Level;

    get id(): number {
        return this._id;
    }
    get name(): string {
        return this._name;
    }
    get position(): Vector2 {
        return this._position;
    }
    get behaviorCount(): number {
        return this._behaviorsById.count();
    }

    constructor(opt: IEntityOptions) {
        this._name = opt.name;

        for (let b of opt.behaviors) {
            b._owner = this;
            this._behaviorsById.add(this._idGen.getId(), b);

            if (b.needsUpdate) {
                this._behaviorsToUpdate.push(b);
            }
        }
    }

    public _setId(id: number): void {
        this._id = id;
    }

    public _setLevel(level: Level): void {
        this._level = level;
    }

    public getLevel(): Level {
        return this._level;
    }

    public getBehaviorById(id: number): Behavior | null {
        if (this._behaviorsById.item(id)) {
            return this._behaviorsById.item(id);
        }
        return null;
    }

    public getBehaviorOfType<T extends Behavior>(tctor: new (...args: any[]) => T): T | null {
        for (let b of this._behaviorsById.values()) {
            if (b instanceof tctor) {
                return b as T;
            }
        }
        return null;
    }

    public preStart(): void {
        for (let b of this._behaviorsById.values()) {
            b.preStart();
        }
    }

    public start(): void {
        for (let b of this._behaviorsById.values()) {
            b.start();
        }
    }

    public update(dt: number): void {
        for (let b of this._behaviorsToUpdate) {
            b.update(dt);
        }
    }

    public end(): void {
        for (let b of this._behaviorsById.values()) {
            b.end();
        }
    }
}
