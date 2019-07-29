import { MLPoint,Robot, RobotMap } from '../../definitions'

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
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../store';
import { getRobotStates } from './getRobots';

//assume MLPoints are stream from Websocket
export const loadPoints = (points: MLPoint[]): HeatMapAction => ({
    type: LOAD_POINTS,
    points
})

// *** might need to change after api set up
export const loadRobots = (id: string) => async (dispatch: ThunkDispatch<AppState, undefined, HeatMapAction>) => {
    dispatch({ type: START_ROBOT_LOADING })

    try {
        let robots = await getRobotStates(id, 1, {})
        dispatch({ type: LOAD_ROBOTS, robots })
    } catch (err) {
        dispatch({ type: FAIL_ROBOT_LOADING, message: 'Failed to fetch robots: ' + err })
    }
    dispatch({ type: STOP_ROBOT_LOADING, })
}

export const clearHeatMap = (): HeatMapAction => ({
    type: CLEAR_HEATMAP,
})

export const changeInterval = (interval: number): HeatMapAction => ({
    type: CHANGE_INTERVAL,
    interval
})

