import { Behavior } from "./behavior";
import { Rect } from "../math/rect";

export class BoxCollider extends Behavior {

    private _rect: Rect;
    private _collisionTags: string[] = [];

    constructor(x?: number, y?: number, w?: number, h?: number) {
        super();
        this._rect = new Rect(x, y, w, h);
    }

    public getRect(): Rect {
        this._rect.x = this._owner.position.x;
        this._rect.y = this._owner.position.y;
        return this._rect;
    }

    public setWidth(w: number): void {
        this._rect.width = w;
    }

    public setHeight(h: number): void {
        this._rect.height = h;
    }
    
    // TODO: reimplement
    // public getCollisionTags(): string[] {
    //     return this._collisionTags;
    // }

    // public addCollisionTags(tags: string[]): void {
    //     this._collisionTags = new Array<string>(...this._collisionTags, ...tags);
    // }

    // public removeCollisionTags(tags: string[]): void {
    //     this._collisionTags = this._collisionTags.filter(tag => !tags.some(t => t === tag));
    // }
}
