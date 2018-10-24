import { Component } from "../component";
import { ResourceLoader } from "../../utils/resource-loader";
import { Vector2 } from "../../math/vector2";

export class Movement extends Component {

    public velocity: Vector2;

    constructor() {
        super();

        this.velocity = Vector2.zero;
    }

    public loadResources(loader: ResourceLoader): void { }
}