export class IdGenerator {
    
    private _nextId: number = 0;
    private _availableIds: number[] = [];

    public popId(): number {
        if (this._availableIds.length === 0) {
            let id = this._nextId;
            this._nextId++;
            return id;
        }
        let id = <number>this._availableIds.pop();
        return id;
    }

    public pushId(id: number): void {
        if (!this._availableIds.some(i => i === id)) {
            this._availableIds.push(id);
        }
    }
}