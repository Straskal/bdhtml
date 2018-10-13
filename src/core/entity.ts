import { Behavior } from "./behavior";
import { IdGenerator } from "../utils/id-generator";
import { KeyedCollection } from "../utils/keyed-collection";

interface IEntityOptions {
    name: string;
    behaviors: Behavior[];
}

export class Entity {

    private _id: number = -1;
    private _name: string;

    private _behaviorsById: KeyedCollection<Behavior>;

    private _idGen: IdGenerator;

    get id(): number {
        return this._id;
    }
    get name(): string {
        return this._name;
    }
    get behaviorCount() : number {
        return this._behaviorsById.count();
    }

    constructor(opt: IEntityOptions) {
        this._behaviorsById = new KeyedCollection<Behavior>();
        this._idGen = new IdGenerator();

        this._name = opt.name;

        for (let b of opt.behaviors) {
            b._owner = this;
            this._behaviorsById.add(this._idGen.getId(), b);
        }
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
}
