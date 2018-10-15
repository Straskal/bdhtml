import { Behavior } from "./behavior";
import { ResourceLoader } from "../utils/resource-loader";

export class Sprite extends Behavior {

    private _texture: HTMLImageElement;
    private _path: string;

    constructor(path: string) {
        super();

        this._path = path;
    }

    get texture(): HTMLImageElement {
        return this._texture;
    }

    public preStart(): void {
        ResourceLoader.getInstance().queue([this._path]);
    }

    public start() {
        this._texture = ResourceLoader.getInstance().getResource<HTMLImageElement>(this._path);
    }
}
