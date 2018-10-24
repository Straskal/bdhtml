export class Vector2 {

    // components
    public x: number;
    public y: number;

    constructor(x?: number, y?: number) {
        this.x = x || 0;
        this.y = y || 0;
    }

    get length(): number {
        return Math.sqrt(Vector2.dot(this, this));
    }

    static get zero(): Vector2 {
        return new Vector2(0, 0);
    }

    static add(v1: Vector2, v2: Vector2): Vector2 {
        return new Vector2(v1.x + v2.x, v1.y + v2.y);
    }

    static subtract(v1: Vector2, v2: Vector2): Vector2 {
        return new Vector2(v1.x - v2.x, v1.y - v2.y);
    }

    static multiply(v: Vector2, scalar: number): Vector2 {
        return new Vector2(v.x * scalar, v.y * scalar);
    }

    static divide(v: Vector2, scalar: number): Vector2 {
        return new Vector2(v.x / scalar, v.y / scalar);
    }

    static dot(v1: Vector2, v2: Vector2): number {
        return (v1.x * v2.x) + (v1.y * v2.y);
    }
}
