/**
 * Bundle entry point.
 */

 // Required to bundle styles
import "styles/style.css";

import { Engine } from "./app/Engine";

const _ = new Engine();
_.initialize();
_.run();
