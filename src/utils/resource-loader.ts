import { StrKeyedCollection } from "./keyed-collection";
import * as path from 'path';

const IMAGE_EXT = ['.jpg', '.png'];

export class ResourceLoader {

    private _cache: StrKeyedCollection<any>;
    private _queue: StrKeyedCollection<Function[]>;
    private _loadCount: number = 0;
    private _loadedCount: number = 0;
    private _loaded: boolean = false;

    constructor() {
        this._cache = new StrKeyedCollection<any>();
        this._queue = new StrKeyedCollection<Function[]>();
    }

    public getResource<T extends HTMLImageElement | HTMLAudioElement>(path: string): T {
        return this._cache.item(path) as T;
    }

    public queue(res: string, callback: (img: HTMLImageElement) => void): void {
        if (this._loaded) {
            callback(this._cache.item(res));
            return;
        }

        if (this._queue.containsKey(res)) {
            let resource = this._queue.item(res);
            resource.push(callback);
            return;
        }
        this._queue.add(res, [callback]);
    }

    public load(onComplete: Function) {
        let keys = this._queue.keys();

        this._loadCount = keys.length;

        for (let i = 0; i < keys.length; i++) {
            let key = keys[i];

            if (IMAGE_EXT.some(p => p === path.extname(key))) {
                let image = new Image();

                let that = this;
                image.onload = () => {
                    that._loadedCount += 1;
                    
                    let callbacks = this._queue.item(key);
                    for (let c of callbacks) {
                        c(image);
                    }

                    if (that._loadedCount === that._loadCount) {
                        onComplete();
                        that._loaded = true;
                    }
                }
                image.src = key;
                that._cache.add(key, image);
            }
        }
    }
}