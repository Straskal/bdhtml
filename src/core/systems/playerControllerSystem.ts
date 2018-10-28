import { ILogicSystem } from "../iLogicSystem";
import { Entity } from "../entity";
import { Player } from "../components/player";
import { Keyboard, KeyCode } from "../../input/keyboard";
import { Movement } from "../components/movement";
import { Vector2 } from "../../math/vector2";
import { BoxCollider } from "../components/boxCollider";
import { Sprite } from "../components/sprite";

export class PlayerControllerSystem implements ILogicSystem {

    private _player: Player;
    private _playerMovement: Movement;
    private _playerCollider: BoxCollider;

    private _lastFrameShooting = false;

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

        if (!this._lastFrameShooting && Keyboard.isKeyDown(KeyCode.SPACE)) {
            let scene = this._player.owner.scene;
            let e = new Entity(
                "bullet",
                Vector2.add(this._player.owner.transform.localPosition, new Vector2(0, -64)),
                [
                    new Sprite("./assets/player.png"),
                    new Movement(0, -10),
                    new BoxCollider(0, 0, 40, 50)
                ]);

            scene.add(e);
            scene.tagEntity(e, "bullet");

            this._lastFrameShooting = true;
        }
        else if (Keyboard.isKeyUp(KeyCode.SPACE)) {
            this._lastFrameShooting = false;
        }
    }

    public fixedTick(): void { }

    public onEntityAdded(entity: Entity): void {
        if (this._player == null) {
            let p = entity.getComponentOfType(Player);

            if (p !== null) {
                this._player = p;
                this._playerMovement = <Movement>entity.getComponentOfType(Movement);
                this._playerCollider = <BoxCollider>entity.getComponentOfType(BoxCollider);

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