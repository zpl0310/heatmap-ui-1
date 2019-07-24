
import * as PIXI from 'pixi.js'
import { RobotStatus } from '../../definitions'

export const CENTER_ANCHOR = new PIXI.Point(0.5, 0.5)
export const DEFAULT_SCALE = new PIXI.Point(1, -1)
export const MAP_PIXEL_RATIO = 0.05
export const ROBOT_SIZE = 10

export const MAX_FPS = 24

export const INTERPOLATION_DELAY = 200

export const STATUS_COLORS = {
    [RobotStatus.Working]: 0x66FF00,
    [RobotStatus.Idle]: 0x00AAFF,
    [RobotStatus.Mislocalized]: 0xFFAA00,
    [RobotStatus.Offline]: 0x666666,
    [RobotStatus.Error]: 0xFF0000
}