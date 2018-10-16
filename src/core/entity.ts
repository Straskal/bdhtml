import { Behavior } from "./behavior";
import { IdGenerator } from "../utils/id-generator";
import { KeyedCollection } from "../utils/keyed-collection";
import { Vector2 } from "../math/vector2";
import { Level } from "./level";
import { SceneNode } from "./scene-node";
import { EventEmitter } from "events";

export interface IEntityOptions {
    name: string;
    behaviors: Behavior[];
    position: Vector2;
}

export class Entity extends SceneNode {

    private _id: number = -1;
    private _name: string = "";
    private _position: Vector2;

    private _behaviorsById: KeyedCollection<Behavior> = new KeyedCollection<Behavior>();
    private _behaviorsToUpdate: Behavior[] = [];

    private _idGen: IdGenerator = new IdGenerator();
    private _eventEmitter: EventEmitter = new EventEmitter();

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
        super();
        this._name = opt.name;

        for (let b of opt.behaviors) {
            b._owner = this;
            this._behaviorsById.add(this._idGen.getId(), b);
        }

        this._position = opt.position;
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
        // NOTICE: Calling .values() multiple times per frame
        for (let b of this._behaviorsById.values()) {
            if (b.needsUpdate) {
                this._behaviorsToUpdate.push(b);
            }
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

    public on(event: string, func: (...args: any[]) => void): void {
        this._eventEmitter.on(event, func);
    }

    public emit(event: string, ...args: any[]): void {
        this._eventEmitter.emit(event, args);
    }

    public off(event: string, func: (...args: any[]) => void): void {
        this._eventEmitter.off(event, func);
    }
}
