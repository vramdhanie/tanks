import Phaser from 'phaser'
import {addComponent, addEntity, createWorld, IWorld, System} from 'bitecs'

import Position from '../components/Position'
import Velocity from '../components/Velocity'
import Sprite from '../components/Sprite'
import createSpriteSystem from "~/systems/Sprite"
import createMovementSystem from "~/systems/Movement"

export default class Game extends Phaser.Scene {
    private spriteSystem?: System
    private movementSystem?;
    System
    private world?: IWorld

    constructor() {
        super('Tank')
    }

    preload() {
        this.load.image('tank-blue', 'assets/tank_blue.png')
        this.load.image('tank-green', 'assets/tank_green.png')
        this.load.image('tank-red', 'assets/tank_red.png')
    }

    create() {
        this.world = createWorld()
        const tank = addEntity(this.world)
        addComponent(this.world, Position, tank)
        Position.x[tank] = 100
        Position.y[tank] = 100

        addComponent(this.world, Velocity, tank)
        Velocity.x[tank] = 6
        Velocity.y[tank] = 4

        addComponent(this.world, Sprite, tank)
        Sprite.texture[tank] = 0

        this.spriteSystem = createSpriteSystem(this, ['tank-blue', 'tank-green', 'tank-red'])
        this.movementSystem = createMovementSystem()
    }

    update(t: number, dt: number) {
        if (!this.world || !this.spriteSystem || !this.movementSystem) {
            return
        }
        this.movementSystem(this.world)
        this.spriteSystem(this.world)
    }
}
