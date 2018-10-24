import { ISystem } from "./iSystem";

export interface ILogicSystem extends ISystem {

    tick(dt: number): void;
    fixedTick(): void;
}
