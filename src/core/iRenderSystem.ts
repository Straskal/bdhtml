import { ISystem } from "./iSystem";

export interface IRenderSystem extends ISystem {

    draw(ctx: CanvasRenderingContext2D): void;
}