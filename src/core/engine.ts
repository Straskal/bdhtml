import { Scene } from "./scene";
import { ILogicSystem } from "./iLogicSystem";
import { IRenderSystem } from "./iRenderSystem";

export class EngineConfiguration {

    public entry: Scene;
    public logicSystems: ILogicSystem[];
    public renderSystems: IRenderSystem[];
}

export class Engine {

    private static readonly TIME_STEP: number = 1 / 60;

    private _canvas: HTMLCanvasElement;
    private _ctx: CanvasRenderingContext2D;

    private _currentScene: Scene;
    private _logicSystems: ILogicSystem[];
    private _renderSystems: IRenderSystem[];

    private _now: number;
    private _dt: number;
    private _last: number;

    constructor(params: EngineConfiguration) {
        const { entry, logicSystems, renderSystems } = params;

        this._currentScene = entry;
        this._logicSystems = logicSystems;
        this._renderSystems = renderSystems;

        this._last = this.timestamp();
    }

    public async start(): Promise<void> {
        // TODO: log error when not valid
        // TODO log error if no systems are provided
        if (this.validateConfiguration()) {
            this._canvas = document.createElement('canvas');
            this._canvas.width = 800;
            this._canvas.height = 600;
            this._canvas.id = 'game';
    
            // TODO: log error if context is null
            let c = this._canvas.getContext('2d');
            if (c != null) {
                this._ctx = c;
            }
    
            document.body.insertBefore(this._canvas, document.body.childNodes[0]);
    
            // TODO: scene management
            // TODO: remove gross hack. \/
            this.processEntityEvents();

            await this._currentScene.load();

            this.mainLoop();
        }
    }

    private mainLoop(): void {
        this._now = this.timestamp();
        this._dt = this._dt + Math.min(1, (this._now - this._last) / 1000);
        this._last = this._now;
        
        while (this._dt >= Engine.TIME_STEP) {
            this._dt = this._dt - Engine.TIME_STEP;
            this.fixedTick();
        }

        this.tick(this._dt);
        this.processEntityEvents();

        this.render();

        requestAnimationFrame(() => this.mainLoop());
    }

    private timestamp(): number {
        return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
    }

    private tick(dt: number): void {
        for (let s of this._logicSystems) {
            s.tick(dt);
        }
    }

    private fixedTick(): void {
        for (let s of this._logicSystems) {
            s.fixedTick();
        }
    }

    private render(): void {
        for (let s of this._renderSystems) {
            s.draw(this._ctx);
        }
    }

    private processEntityEvents(): void {
        let ev = this._currentScene.postTickEntityEvents();
        
        for (let e of ev.added) {
            this._logicSystems.forEach(s => s.onEntityAdded(e));
            this._renderSystems.forEach(s => s.onEntityAdded(e));
        }

        for (let e of ev.removed) {
            this._logicSystems.forEach(s => s.onEntityRemoved(e));
            this._renderSystems.forEach(s => s.onEntityRemoved(e));
        }

        for (let e of ev.modified) {
            this._logicSystems.forEach(s => s.onEntityModified(e));
            this._renderSystems.forEach(s => s.onEntityModified(e));
        }
    }

    private validateConfiguration(): boolean {
        for (let i = 0; i < this._logicSystems.length - 1; i++) {
            let system = this._logicSystems[i];

            for (let j = i + 1; j < this._logicSystems.length - 1; j++) {
                let otherSystem = this._logicSystems[j];

                if ((<any>system.constructor).name === (<any>otherSystem.constructor).name) {
                    return false;
                }
            }
        }

        return true;
    }
}