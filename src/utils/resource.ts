export interface IResource {
    path: string;
    load(): void;
}

export class Resource<T> implements IResource {
    public path: string;

    constructor(path: string) {
        this.path = path;
    }

    load(): void { }
}
