import { MLPoint,Robot } from '../../definitions'

export const LOAD_POINTS = 'LOAD_POINTS'
export const LOAD_ROBOTS = 'LOAD_ROBOTS'
export const START_ROBOT_LOADING = 'START_ROBOT_LOADING'
export const STOP_ROBOT_LOADING = 'STOP_ROBOT_LOADING'
export const FAIL_ROBOT_LOADING = 'FAIL_ROBOT_LOADING'
export const CHANGE_INTERVAL = 'CHANGE_INTERVAL'
export const CLEAR_HEATMAP = 'CLEAR_HEATMAP'

type loadPoints = {
    type: typeof LOAD_POINTS
    points: MLPoint[]
}

type loadRobots = {
    type: typeof LOAD_ROBOTS
    robots: Robot[]
}

type startRobotLoading = {
    type: typeof START_ROBOT_LOADING
}

type stopRobotLoading = {
    type: typeof STOP_ROBOT_LOADING   
}

type failRobotLoading = {
    type: typeof FAIL_ROBOT_LOADING
    message: string
}

type changeInterval = {
    type: typeof CHANGE_INTERVAL
    interval: number
}

type clearHeatMap = {
    type: typeof CLEAR_HEATMAP
}


export type HeatMapAction = loadPoints |
        loadRobots | startRobotLoading |
        stopRobotLoading | failRobotLoading |
        changeInterval | clearHeatMap

export type HeatMapStoreState = {
    loading: boolean,
	error: string,
    points: MLPoint[],
	robots: Robot[],
	Interval: number,
}