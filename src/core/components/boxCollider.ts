import { Component } from "../component";
import { Rect } from "../../math/rect";

export class BoxCollider extends Component {

    public readonly rect: Rect;

    constructor(x?: number, y?: number, w?: number, h?: number) {
        super();

        this.rect = new Rect(x || 0, y || 0, w || 0, h || 0);
    }
}