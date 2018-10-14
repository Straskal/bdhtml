import { expect } from 'chai';
import 'mocha';
import { Behavior } from './behavior';
import { Entity } from './entity';

class TestBehavior extends Behavior { }

describe('Entity', () => {
    describe('#constructor()', () => {
        it('should set required fields', () => {
            // arrange
            let entityOptions = {
                name: "Steve",
                behaviors: [
                    new TestBehavior()
                ]
            };

            // act
            let entity = new Entity(entityOptions);


            // assert
            expect(entity.name).to.equal('Steve');
            expect(entity.behaviorCount).to.equal(1);
        });
    });
    describe('#getBehaviorById()', () => {
        it('should return correct behavior', () => {
            // arrange
            let expectedBehavior = new TestBehavior();

            let entityOptions = {
                name: "Steve",
                behaviors: [
                    expectedBehavior
                ]
            };

            let entity = new Entity(entityOptions);

            // act
            let behavior = entity.getBehaviorById(0);

            // assert
            expect(behavior).to.equal(expectedBehavior);
        });
    });
    describe('#getBehaviorByType()', () => {
        it('should return correct behavior', () => {
            // arrange
            let expectedBehavior = new TestBehavior();

            let entityOptions = {
                name: "Steve",
                behaviors: [
                    expectedBehavior
                ]
            };

            let entity = new Entity(entityOptions);

            // act
            let behavior = entity.getBehaviorOfType(TestBehavior);

            // assert
            expect(behavior).to.equal(expectedBehavior);
        });
    });
    describe('#start()', () => {
        it('should start all behaviors', () => {
            // arrange
            class TBehavior extends Behavior {
                public started: boolean = false;
                public start(): void {
                    this.started = true;
                }
            }

            let behavior = new TBehavior();
            let behavior2 = new TBehavior();
            let entityOptions = {
                name: "Steve",
                behaviors: [
                    behavior,
                    behavior2
                ]
            };

            let entity = new Entity(entityOptions);

            // act
            entity.start();

            // assert
            expect(behavior.started).to.be.true;
            expect(behavior2.started).to.be.true;
        });
    });
    describe('#update()', () => {
        it('should update all behavior that require being updated', () => {
            // arrange
            class TBehavior extends Behavior {
                public updated: boolean = false;
                constructor() {        
                    super();            
                    this._needsUpdate = true;
                }
                public update(dt: number): void {
                    this.updated = true;
                }
            }

            let behavior = new TBehavior();
            let behavior2 = new TBehavior();
            let entityOptions = {
                name: "Steve",
                behaviors: [
                    behavior,
                    behavior2
                ]
            };

            let entity = new Entity(entityOptions);

            // act
            entity.update(1);

            // assert
            expect(behavior.updated).to.be.true;
            expect(behavior2.updated).to.be.true;
        });
    });
});
