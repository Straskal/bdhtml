import { Vector2 } from "./vector2";

export class Transform {

    private _localPosition: Vector2;
    private _localRotation: number;
    private _localScale: number;

    constructor() {
        this._localPosition = Vector2.zero;
        this._localRotation = 0;
        this._localScale = 1;
    }

    get localPosition(): Vector2 {
        return this._localPosition;
    }

    set localPosition(value) {
        this._localPosition = value;
        
        // set dirty
    }
}