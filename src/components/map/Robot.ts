import { Loader, Sprite } from 'pixi.js'
import { CENTER_ANCHOR, ROBOT_SIZE, MAP_PIXEL_RATIO, WORLD_OPTIONS } from './constants';
import { Pose } from '../../definitions'
import { Tween, Easing } from '@tweenjs/tween.js'

export default class Robot extends Sprite {
    private pose: Pose
    constructor(pose: Pose) {
        super(Loader.shared.resources['robot'].texture)
        this.anchor = CENTER_ANCHOR
        this.width = ROBOT_SIZE
        this.height = ROBOT_SIZE
        this.pose = pose
        this.setPositionByPose()
    }

    update(nextPose: Pose, deltaTime: number) {
        new Tween(this.pose)
            .to(nextPose, deltaTime)
            .easing(Easing.Linear.None)
            .onUpdate(() => this.setPositionByPose())
            .start()
    }

    setPositionByPose() {
        this.rotation = this.pose.theta
        this.position.set(
            this.pose.x / MAP_PIXEL_RATIO,
            -WORLD_OPTIONS.height + this.pose.y / MAP_PIXEL_RATIO
        )
    }
}