import { Container } from 'pixi.js'
import Robot from './Robot'
import { DEFAULT_SCALE } from './constants';

export default class RobotLayer extends Container {
    constructor() {
        super()

        this.name = 'RobotLayer'
        this.scale = DEFAULT_SCALE
    }

    public load(robots: Object) {
        this.removeChildren()

        if (robots) {
            for (let robot of Object.values(robots)) {
                let robotOptions = {
                    x: robot.x,
                    y: robot.y,
                    rotation: robot.theta
                }
                const sprite = Robot(robotOptions)
                this.addChild(sprite)
            }
        }
    }
}