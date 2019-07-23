import {Loader, Sprite } from 'pixi.js'
import { CENTER_ANCHOR, ROBOT_SIZE, MAP_PIXEL_RATIO, WORLD_OPTIONS } from './constants';

type RobotProps = {
    x: number
    y: number
    rotation: number
}

export default function Robot(props: RobotProps) {
    const texture = Loader.shared.resources['robot'].texture
    let sprite = new Sprite(texture)
    sprite.rotation = props.rotation
    sprite.anchor = CENTER_ANCHOR
    sprite.width = ROBOT_SIZE
    sprite.height = ROBOT_SIZE
    sprite.position.set(
        props.x / MAP_PIXEL_RATIO,
        -WORLD_OPTIONS.height + props.y / MAP_PIXEL_RATIO
    )
    return sprite
}