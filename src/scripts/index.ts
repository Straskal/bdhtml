/**
 * Bundle entry point.
 */

 // Required to bundle styles
import "styles/style.css";

import { Engine } from "app/core/engine";
import { Actor } from "app/core/actor";
import { Sprite } from "app/behaviors/sprite-component";

let player = new Actor("player", 50, 50);
player.addComponent(new Sprite("./assets/player.png"))
console.log(player.getComponent<Sprite>("Sprite"));

const _ = new Engine();
_.initialize();
_.run();
