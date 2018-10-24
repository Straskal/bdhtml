import { Scene } from "./scene";
import { ILogicSystem } from "./iLogicSystem";
import { IRenderSystem } from "./iRenderSystem";

export class EngineConfiguration {

    entry: Scene;
    logicSystems: ILogicSystem[];
    renderSystems: IRenderSystem[];
}

export class Engine {

    private static readonly TIME_STEP: number = 1 / 60;

    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    private currentScene: Scene;
    private logicSystems: ILogicSystem[];
    private renderSystems: IRenderSystem[];

    private now: number;
    private dt: number;
    private last: number;

    constructor(params: EngineConfiguration) {
        const { entry, logicSystems, renderSystems } = params;

        this.currentScene = entry;
        this.logicSystems = logicSystems;
        this.renderSystems = renderSystems;

        this.last = this.timestamp();
    }

    public async start(): Promise<void> {
        // TODO: log error when not valid
        // TODO log error if no systems are provided
        if (this.validateConfiguration()) {
            this.canvas = document.createElement('canvas');
            this.canvas.width = 800;
            this.canvas.height = 600;
            this.canvas.id = 'game';
    
            // TODO: log error if context is null
            let c = this.canvas.getContext('2d');
            if (c != null) {
                this.ctx = c;
            }
    
            document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    
            // TODO: scene management
            // TODO: remove gross hack. \/
            this.processEntityEvents();

            await this.currentScene.load();

            this.mainLoop();
        }
    }

    private mainLoop(): void {
        this.now = this.timestamp();
        this.dt = this.dt + Math.min(1, (this.now - this.last) / 1000);
        this.last = this.now;
        
        while (this.dt >= Engine.TIME_STEP) {
            this.dt = this.dt - Engine.TIME_STEP;
            this.fixedTick();
        }

        this.tick(this.dt);
        this.processEntityEvents();

        this.render();

        requestAnimationFrame(() => this.mainLoop());
    }

    private timestamp(): number {
        return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
    }

    private tick(dt: number): void {
        for (let s of this.logicSystems) {
            s.tick(dt);
        }
    }

    private fixedTick(): void {
        for (let s of this.logicSystems) {
            s.fixedTick();
        }
    }

    private render(): void {
        for (let s of this.renderSystems) {
            s.draw(this.ctx);
        }
    }

    private processEntityEvents(): void {
        let ev = this.currentScene.postTickEntityEvents();
        
        for (let e of ev.added) {
            this.logicSystems.forEach(s => s.onEntityAdded(e));
            this.renderSystems.forEach(s => s.onEntityAdded(e));
        }

        for (let e of ev.removed) {
            this.logicSystems.forEach(s => s.onEntityRemoved(e));
            this.renderSystems.forEach(s => s.onEntityRemoved(e));
        }

        for (let e of ev.modified) {
            this.logicSystems.forEach(s => s.onEntityModified(e));
            this.renderSystems.forEach(s => s.onEntityModified(e));
        }
    }

    private validateConfiguration(): boolean {
        for (let i = 0; i < this.logicSystems.length - 1; i++) {
            let system = this.logicSystems[i];

            for (let j = i + 1; j < this.logicSystems.length - 1; j++) {
                let otherSystem = this.logicSystems[j];

                if ((<any>system.constructor).name === (<any>otherSystem.constructor).name) {
                    return false;
                }
            }
        }

        return true;
    }
}