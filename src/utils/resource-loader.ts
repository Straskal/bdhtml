import { StrKeyedCollection } from "./keyed-collection";
import * as path from 'path';

export class ResourceLoader {

    private _cache: StrKeyedCollection<any> = new StrKeyedCollection<any>();
    private _queue: Array<string> = [];
    private _loadCount: number = 0;
    private _loadedCount: number = 0;

    private _imgExts: string[] = [
        ".jpg",
        ".png"
    ];
    private _audExts: string[] = [
        ".wav"
    ];

    get isDone(): boolean {
        return this._loadedCount === this._loadCount;
    }

    private static _instance: ResourceLoader;

    private constructor() { }

    public static getInstance(): ResourceLoader {
        return this._instance || (this._instance = new ResourceLoader());
    }

    public getResource<T extends HTMLImageElement | HTMLAudioElement>(path: string): T {
        return this._cache.item(path) as T;
    }

    public queue(res: string[]): void {
        for (let i of res) {
            if (this._imgExts.some(x => x === i)) {
                continue;
            }
            this._queue.push(i);
        }
    }

    public load(onComplete: Function) {
        this._loadCount = this._queue.length;
        for (let qd of this._queue) {
            console.log(path.extname(qd));
            if (this._imgExts.some(x => x === path.extname(qd))) {
                let image = new Image();
                let that = this;
                image.addEventListener("load", () => {
                    that._loadedCount++;
                    if (that._loadedCount === that._loadCount) {
                        onComplete();
                    }
                });
                image.src = qd;
                that._cache.add(qd, image);
            }
            if (this._audExts.some(x => x === path.extname(qd))) {
                let audio = new Audio();
                audio.addEventListener("load", () => {
                    this._loadedCount++;
                    if (this._loadedCount === this._loadCount) {
                        onComplete();
                    }
                });
                audio.src = qd;
                this._cache.add(qd, audio);
            }
        }
    }
}