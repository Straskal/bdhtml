import { Vector2 } from "./vector2";

export class Transform {

    private _localPosition: Vector2;
    private _localRotation: number;
    private _localScale: number;

    get localPosition(): Vector2 {
        return this._localPosition;
    }

    set localPosition(value) {
        this._localPosition = value;
        
        // set dirty
    }
}