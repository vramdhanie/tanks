import Phaser from 'phaser'
import {addComponent, addEntity, createWorld, IWorld, System} from 'bitecs'

import Position from '../components/Position'
import Velocity from '../components/Velocity'
import Sprite from '../components/Sprite'
import Player from '../components/Player'
import Rotation from '../components/Rotation'
import createSpriteSystem from "~/systems/Sprite"
import createMovementSystem from "~/systems/Movement"
import createPlayerSystem from "~/systems/Player";

export default class Game extends Phaser.Scene {
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
    private spriteSystem?: System
    private movementSystem?: System
    private playerSystem?: System
    private world?: IWorld

    constructor() {
        super('Tank')
    }

    init() {
        this.cursors = this.input.keyboard.createCursorKeys()
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

        addComponent(this.world, Rotation, tank)
        addComponent(this.world, Velocity, tank)

        addComponent(this.world, Sprite, tank)
        Sprite.texture[tank] = 0

        addComponent(this.world, Player, tank)

        this.spriteSystem = createSpriteSystem(this, ['tank-blue', 'tank-green', 'tank-red'])
        this.movementSystem = createMovementSystem()
        this.playerSystem = createPlayerSystem(this.cursors)
    }

    update(t: number, dt: number) {
        if (!this.world || !this.spriteSystem || !this.movementSystem || !this.playerSystem) {
            return
        }
        this.playerSystem(this.world)
        this.movementSystem(this.world)
        this.spriteSystem(this.world)
    }
}
