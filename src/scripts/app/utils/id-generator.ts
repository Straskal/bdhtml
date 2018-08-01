
export class IdGenerator {

    private nextId: number = 0;
    private availableIds: number[] = [];

    public popId(): number {
        if (this.availableIds.length > 0) {
            return this.availableIds.shift();
        }
        const id = this.nextId;
        this.nextId += 1;
        return id;
    }

    public pushId(id: number): void {
        let contains = false;
        this.availableIds.forEach(aId => {
            if (aId === id) {
                contains = true;
            }
        });
        if (contains) {
            return;
        }

        this.availableIds.push(id);
    }
}
