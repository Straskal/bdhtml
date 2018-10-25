import { ILogicSystem } from "../iLogicSystem";
import { Entity } from "../entity";
import { Player } from "../components/player";
import { Keyboard, KeyCode } from "../../input/keyboard";
import { Movement } from "../components/movement";
import { Vector2 } from "../../math/vector2";
import { BoxCollider } from "../components/boxCollider";

export class PlayerControllerSystem implements ILogicSystem {

    private _player: Player;
    private _playerMovement: Movement;
    private _playerCollider: BoxCollider;

    public tick(dt: number): void {
        if (!this._player)
            return;

        let s = this._player.speed;
        let v = this._playerMovement.velocity;

        v.x = 0;
        v.y = 0;

        if (Keyboard.isKeyDown(KeyCode.KEY_W)) {
            v.y -= s;
        }
        if (Keyboard.isKeyDown(KeyCode.KEY_A)) {
            v.x -= s;
        }
        if (Keyboard.isKeyDown(KeyCode.KEY_S)) {
            v.y += s;
        }
        if (Keyboard.isKeyDown(KeyCode.KEY_D)) {
            v.x += s;
        }
    }   
    
    public fixedTick(): void { }

    public onEntityAdded(entity: Entity): void {
        if (this._player == null) {
            let p = entity.getBehaviorOfType(Player);

            if (p !== null) {
                this._player = p;
                this._playerMovement = <Movement>entity.getBehaviorOfType(Movement);
                this._playerCollider = <BoxCollider>entity.getBehaviorOfType(BoxCollider);

                this._playerCollider.on("collision", o => {
                    console.log("collision with " + o);
                })
            }
        }
    }

    public onEntityRemoved(entity: Entity): void {
        
    }

    public onEntityModified(entity: Entity): void {
        
    }
}