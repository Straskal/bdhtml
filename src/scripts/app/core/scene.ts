import * as PIXI from "pixi.js";
import { IdGenerator } from "app/utils/id-generator";
import { Actor } from "app/core/actor";
import { Engine } from "app/core/engine";

export class Scene {
    private readonly idGen: IdGenerator;

    public engine: Engine;

    private actors: Actor[];
    private actorsById: Map<number, Actor>;
    private actorsToAdd: Actor[];
    private actorsToRemove: Actor[];

    constructor() {
        this.idGen = new IdGenerator();
    }

    get Loader(): PIXI.loaders.Loader {
        return this.engine.app.loader;
    }
}
