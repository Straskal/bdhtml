import {ScaleStrategy} from "vendor/dacaher/pixi-app-wrapper/stage/scale/scale-strategy";

export class ScaleFullSize implements ScaleStrategy {
    public scale(initialWidth: number, initialHeight: number, finalWidth: number, finalHeight: number): { scaleX: number; scaleY: number; } {
        return {
            scaleX: finalWidth / initialWidth,
            scaleY: finalHeight / initialHeight,
        };
    }
}
