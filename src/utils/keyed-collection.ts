export interface IKeyedCollection<T> {
    add(key: number | string, value: T): void;
    containsKey(key: number | string): boolean;
    count(): number;
    item(key: number | string): T;
    remove(key: number | string): T;
    values(): T[];
}

export class KeyedCollection<T> implements IKeyedCollection<T> {
    private _items: { [index: number]: T } = {};
 
    private _count: number = 0;
 
    public containsKey(key: number): boolean {
        return this._items.hasOwnProperty(key);
    }
 
    public count(): number {
        return this._count;
    }
 
    public add(key: number, value: T) {
        if(!this._items.hasOwnProperty(key))
             this._count++;
 
        this._items[key] = value;
    }
 
    public remove(key: number): T {
        var val = this._items[key];
        delete this._items[key];
        this._count--;
        return val;
    }
 
    public item(key: number): T {
        return this._items[key];
    }
 
    public values(): T[] {
        var values: T[] = [];
 
        for (var prop in this._items) {
            if (this._items.hasOwnProperty(prop)) {
                values.push(this._items[prop]);
            }
        }
 
        return values;
    }

    public clear(): void {
        this._items = [];
    }
}

export class StrKeyedCollection<T> implements IKeyedCollection<T> {
    private _items: { [index: string]: T } = {};
 
    private _count: number = 0;
 
    public containsKey(key: string): boolean {
        return this._items.hasOwnProperty(key);
    }
 
    public count(): number {
        return this._count;
    }
 
    public add(key: string, value: T) {
        if(!this._items.hasOwnProperty(key))
             this._count++;
 
        this._items[key] = value;
    }
 
    public remove(key: string): T {
        var val = this._items[key];
        delete this._items[key];
        this._count--;
        return val;
    }
 
    public item(key: string): T {
        return this._items[key];
    }
 
    public keys(): string[] {
        var keySet: string[] = [];
 
        for (var prop in this._items) {
            if (this._items.hasOwnProperty(prop)) {
                keySet.push(prop);
            }
        }
 
        return keySet;
    }
 
    public values(): T[] {
        var values: T[] = [];
 
        for (var prop in this._items) {
            if (this._items.hasOwnProperty(prop)) {
                values.push(this._items[prop]);
            }
        }
 
        return values;
    }
}
