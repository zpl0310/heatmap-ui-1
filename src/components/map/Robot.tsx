import * as React from 'react'
//import { Sprite } from 'react-pixi-fiber'
import * as PIXI from 'pixi.js'
import robot from '../../assets/freight100.png'
import { CENTER_ANCHOR, DEFAULT_SCALE } from './constants';

type RobotProps = {
    x: number
    y: number
    size: number
    rotation: number
}

export default function Robot(props: RobotProps) {
    let sprite = new PIXI.Sprite(PIXI.Texture.from(robot))
    sprite.position = new PIXI.Point(props.x, props.y)
    sprite.anchor = CENTER_ANCHOR
    sprite.scale = DEFAULT_SCALE
    sprite.width = props.size
    sprite.height = props.size
    sprite.rotation = props.rotation
    return sprite
}