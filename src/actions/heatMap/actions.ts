import { MLPoint,Robot } from '../../definitions'

import {
    LOAD_POINTS,
    LOAD_ROBOTS,
    START_ROBOT_LOADING,
    STOP_ROBOT_LOADING,
    FAIL_ROBOT_LOADING,
    CHANGE_INTERVAL,
    CLEAR_HEATMAP,
    HeatMapAction,
} from '.'

//assume MLPoints are stream from Websocket
export const loadPoints = (points: MLPoint[]): HeatMapAction => ({
    type: LOAD_POINTS,
    points
})

export const loadRobots = (robots: Robot[]): HeatMapAction => ({
    type: LOAD_ROBOTS,
    robots
})

export const clearHeatMap = (): HeatMapAction => ({
    type: CLEAR_HEATMAP,
})

export const changeInterval = (interval: number): HeatMapAction => ({
    type: CHANGE_INTERVAL,
    interval
})

