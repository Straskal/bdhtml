import { Component } from "../component";
import { ResourceLoader } from "../../utils/resource-loader";
import { Vector2 } from "../../math/vector2";

export class Movement extends Component {

    public velocity: Vector2;

    constructor(x?: number, y?: number) {
        super();

        this.velocity = new Vector2(x || 0, y || 0);
    }

    public loadResources(loader: ResourceLoader): void { }
}