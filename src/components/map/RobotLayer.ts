import { Container } from 'pixi.js'
import Robot from './Robot'
import { DEFAULT_SCALE } from './constants';
import { Pose } from '../../definitions';

export default class RobotLayer extends Container {
    private curRobots: { [id: string]: Robot } = {}
    constructor() {
        super()
        this.name = 'RobotLayer'
        this.scale = DEFAULT_SCALE
    }

    public load(robots: Object, deltaTime: number) {
        if (robots) {
            for (let robot of Object.values(robots)) {
                let pose: Pose = robot.pose
                if (!this.curRobots[robot.id]) {
                    const sprite = new Robot(pose)
                    this.addChild(sprite)
                    this.curRobots[robot.id] = sprite
                } else {
                    this.curRobots[robot.id].update(pose, deltaTime)
                }
            }
        }
    }
}