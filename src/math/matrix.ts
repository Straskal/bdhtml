import { Vector2 } from "./vector2";

// under construction
export class Matrix {

    private _m: number[][];

    constructor(
        m00: number, m01: number, m02: number,
        m10: number, m11: number, m12: number,
        m20: number, m21: number, m22: number) {

        this._m[0][0] = m00; this._m[0][1] = m01; this._m[0][2] = m02;
        this._m[1][0] = m10; this._m[1][1] = m11; this._m[1][2] = m12;
        this._m[2][0] = m20; this._m[2][1] = m21; this._m[2][2] = m22;
    }

    public get entries(): number[][] {
        return this._m;
    }

    public get(i: number, j: number): number {
        return (this._m[i][j]);
    }

    static multiplyMM(a: Matrix, b: Matrix): Matrix {
        let aM = a.entries;
        let bM = b.entries;

        return new Matrix(
            aM[0][0] * bM[0][0] + aM[0][1] * bM[1][0] + aM[0][2] * bM[2][0],
            aM[0][0] * bM[0][1] + aM[0][1] * bM[1][1] + aM[0][2] * bM[2][1],
            aM[0][0] * bM[0][2] + aM[0][1] * bM[1][2] + aM[0][2] * bM[2][2],
            aM[1][0] * bM[0][0] + aM[1][1] * bM[1][0] + aM[1][2] * bM[2][0],
            aM[1][0] * bM[0][1] + aM[1][1] * bM[1][1] + aM[1][2] * bM[2][1],
            aM[1][0] * bM[0][2] + aM[1][1] * bM[1][2] + aM[1][2] * bM[2][2],
            aM[2][0] * bM[0][0] + aM[2][1] * bM[1][0] + aM[2][2] * bM[2][0],
            aM[2][0] * bM[0][1] + aM[2][1] * bM[1][1] + aM[2][2] * bM[2][1],
            aM[2][0] * bM[0][2] + aM[2][1] * bM[1][2] + aM[2][2] * bM[2][2]);
    }

    static multiplyMV(m: Matrix, v: Vector2): Vector2 {
        let mEntries = m.entries;

        return new Vector2(
            mEntries[0][0] * v.x + mEntries[0][1] * v.y,
            mEntries[1][0] * v.x + mEntries[1][1] * v.y);
    }
}
