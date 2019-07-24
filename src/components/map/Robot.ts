import { Loader, Sprite } from 'pixi.js'
import { CENTER_ANCHOR, ROBOT_SIZE, MAP_PIXEL_RATIO } from './constants';
import { Pose } from '../../definitions'

export default class Robot extends Sprite {
    constructor(pose: Pose) {
        const texture = Loader.shared.resources['robot'].texture
        super(texture)
        this.anchor = CENTER_ANCHOR
        this.width = ROBOT_SIZE
        this.height = ROBOT_SIZE
        this.rotation = pose.theta
        this.position.set(
            pose.x / MAP_PIXEL_RATIO,
            pose.y / MAP_PIXEL_RATIO
        )
    }
}