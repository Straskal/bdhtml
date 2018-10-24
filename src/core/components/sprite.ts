import { Component } from "../component";
import { ResourceLoader } from "../../utils/resource-loader";

export class Sprite extends Component {

    private _path: string;
    private _img: HTMLImageElement;

    constructor(path: string) {
        super();

        this._path = path;
    }

    get img(): HTMLImageElement {
        return this._img;
    }

    public loadResources(loader: ResourceLoader): void {
        loader.queue(this._path, img => this._img = img);
    }
}