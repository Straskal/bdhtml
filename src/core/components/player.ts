import { Component } from "../component";

export class Player extends Component {
    
    public speed: number;
    public maxSpeed: number;

    constructor(speed: number, maxSpeed: number) {
        super();

        this.speed = speed;
        this.maxSpeed = maxSpeed;
    }
}