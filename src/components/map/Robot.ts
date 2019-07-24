import { Loader, Sprite, Circle, Graphics } from 'pixi.js'
import { CENTER_ANCHOR, ROBOT_SIZE, MAP_PIXEL_RATIO, STATUS_COLORS } from './constants';
import { Pose, RobotStatus } from '../../definitions'

export default class Robot extends Sprite {
    constructor(pose: Pose, status: RobotStatus) {
        super()

        if (pose.x === 0 && pose.y === 0 && pose.theta === 0) {
            return
        }

        this.anchor = CENTER_ANCHOR
        this.rotation = pose.theta
        this.position.set(
            pose.x / MAP_PIXEL_RATIO,
            pose.y / MAP_PIXEL_RATIO
        )

        this.renderStatus(status)
        this.renderRobot(status)
    }

    private renderRobot(status: RobotStatus) {
        const texture = Loader.shared.resources['robot'].texture
        let robot = new Sprite(texture)
        robot.anchor = CENTER_ANCHOR
        robot.width = ROBOT_SIZE
        robot.height = ROBOT_SIZE
        if (status === RobotStatus.Offline) {
            robot.alpha = 0.75
        }
        this.addChild(robot)

    }

    private renderStatus(status: RobotStatus) {
        let circle = new Graphics()
        circle.lineStyle(3, STATUS_COLORS[status], 0.75)
        circle.drawCircle(0, 0, ROBOT_SIZE * 0.5)
        circle.endFill()
        this.addChild(circle)
    }
}