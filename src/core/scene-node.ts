export class SceneNode {
    
    protected _parent: SceneNode | null;
    protected _children: SceneNode[];

    get parent(): SceneNode | null{
        return this._parent;
    }
    set parent(value: SceneNode | null) {
        this._parent = value;
    }
    get children(): SceneNode[] {
        return this._children;
    }

    public addChild(child: SceneNode): void {
        this._children.push(child);
    }
}