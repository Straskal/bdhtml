import { expect } from 'chai';
import 'mocha';
import { Vector2 } from './vector2';

describe("Vector2", () => {
    describe("#constructor()", () => {
        it("should set default properties if none are provided", () => {
            // arrange & act
            let v = new Vector2();

            // assert
            expect(v.x).to.equal(0);
            expect(v.y).to.equal(0);
        });
        it("should set properties", () => {
            // arrange & act
            let v = new Vector2(1, 2);

            // assert
            expect(v.x).to.equal(1);
            expect(v.y).to.equal(2);
        });
    });
    describe("#add(v1, v2)", () => {
        it("should add the two vectors", () => {
            // arrange
            let v1 = new Vector2(1, 2);
            let v2 = new Vector2(2, 1);

            // act
            let v3 = Vector2.add(v1, v2);

            // assert
            expect(v3.x).to.equal(3);
            expect(v3.y).to.equal(3);
        });
    });
    describe("#subtract(v1, v2)", () => {
        it("should subtract the two vectors", () => {
            // arrange
            let v1 = new Vector2(1, 2);
            let v2 = new Vector2(2, 1);

            // act
            let v3 = Vector2.subtract(v1, v2);

            // assert
            expect(v3.x).to.equal(-1);
            expect(v3.y).to.equal(1);
        });
    });
    describe("#multiply(v1, scalar)", () => {
        it("should multiply the vector by the scalar", () => {
            // arrange
            let v = new Vector2(1, 2);
            let scalar = 2;

            // act
            let scaledV = Vector2.multiply(v, scalar);

            // assert
            expect(scaledV.x).to.equal(2);
            expect(scaledV.y).to.equal(4);
        });
    });
    describe("#divide(v1, scalar)", () => {
        it("should divide the vector by the scalar", () => {
            // arrange
            let v = new Vector2(2, 4);
            let scalar = 2;

            // act
            let scaledV = Vector2.divide(v, scalar);

            // assert
            expect(scaledV.x).to.equal(1);
            expect(scaledV.y).to.equal(2);
        });
    });
    describe("#dot(v1, v2)", () => {
        it("should return the correct scalar", () => {
            // arrange
            let v1 = new Vector2(1, 2);
            let v2 = new Vector2(2, 1);

            let expectedResult = (v1.x * v2.x) + (v1.y * v2.y);

            // act
            let result = Vector2.dot(v1, v2);

            // assert
            expect(result).to.equal(expectedResult);
        });
    });
    describe("#length", () => {
        it("should return the correct length", () => {
            // arrange
            let v = new Vector2(1, 2);

            let expectedResult = Math.sqrt((v.x * v.x) + (v.y * v.y));

            // act
            let result = v.length;

            // assert
            expect(result).to.equal(expectedResult);
        });
    });
});
