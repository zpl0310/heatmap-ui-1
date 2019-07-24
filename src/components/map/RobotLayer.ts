import { Container } from 'pixi.js'
import RobotSprite from './Robot'
import { DEFAULT_SCALE, INTERPOLATION_DELAY } from './constants';
import { Pose, PoseAtTime, RobotMap } from '../../definitions';
import DequeChangeBuffer from './changeBuffer';
import { RobotStatePositionCache } from './robotStreamCache';


export default class RobotLayer extends Container {
    constructor() {
        super()
        this.name = 'RobotLayer'
        this.scale = DEFAULT_SCALE
    }

    public update(robots: RobotMap) {
        const delayedTimestamp = performance.now() - INTERPOLATION_DELAY
        this.removeChildren()
        if (robots) {
            for (let robot of Object.values(robots)) {
                const pose = RobotStatePositionCache.getPositionForRobot(robot.id, delayedTimestamp)

                if (pose.x !== 0 && pose.y !== 0 && pose.theta !== 0) {
                    const sprite = new RobotSprite(pose, robot.status)
                    this.addChild(sprite)
                }
            }
        }
    }
}