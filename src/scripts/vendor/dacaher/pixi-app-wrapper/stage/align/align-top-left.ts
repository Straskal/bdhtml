import {AlignStrategy} from "vendor/dacaher/pixi-app-wrapper/stage/align/align-strategy";

export class AlignTopLeft implements AlignStrategy {
    public align(width?: number, height?: number, containerWidth?: number, containerHeight?: number): { x: number, y: number } {
        return {x: 0, y: 0};
    }
}
