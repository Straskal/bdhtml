import { expect } from 'chai';
import 'mocha';
import { Behavior } from '../src/core/behavior';
import { Entity } from '../src/core/entity';

class TestBehavior extends Behavior { }

describe('Constructor', () => {
    it('should set required properties', () => {
        let objectOpts = {
            name: "Steve",
            behaviors: [
                new TestBehavior()
            ]
        };

        let object = new Entity(objectOpts);

        expect(object.name).to.equal('Steve');
        expect(object.behaviorCount).to.equal(1);
    });
});

describe('Get behavior by id', () => {
    it('should return correct behavior', () => {
        let expectedBehavior = new TestBehavior();

        let objectOpts = {
            name: "Steve",
            behaviors: [
                expectedBehavior
            ]
        };

        let entity = new Entity(objectOpts);
        let behavior = entity.getBehaviorById(0);

        expect(behavior).to.equal(expectedBehavior);
    });
});

describe('Get behavior by type', () => {
    it('should return correct behavior', () => {
        let expectedBehavior = new TestBehavior();

        let objectOpts = {
            name: "Steve",
            behaviors: [
                expectedBehavior
            ]
        };

        let entity = new Entity(objectOpts);
        let behavior = entity.getBehaviorOfType(TestBehavior);

        expect(behavior).to.equal(expectedBehavior);
    });
});
