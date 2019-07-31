import { ChartPoint } from '../../definitions'

import {
    SET_CHART ,
    START_CHART_LOADING,
    STOP_CHART_LOADING,
    FAIL_CHART_LOADING,
    // CHANGE_STARTDATE,
    // CHANGE_ENDDATE,
    // CHANGE_CUR_SELECTION,
    // CHANGE_INTERVAL,
    chartAction,
    //chartStoreState
} from '.'

import { AppState } from '../../store'

import { ThunkDispatch } from 'redux-thunk'
import axios, { AxiosResponse } from 'axios'

//TODO: enable all control components once api is set up
export const loadChart = () => async (dispatch: ThunkDispatch<AppState, undefined, chartAction>) => {
    dispatch({ type: START_CHART_LOADING })

    try {
        // TODO: Change url to actual API endpoint
        const res: AxiosResponse = await axios.get('api/rooms', {
            params: {
                // timeFrame: ,
                // startTime:,
                // endTime: ,
            }
        })

        let chartPoints = res.data.map((point: any): ChartPoint => ({
            date: point.date,
            value: point.value,
        }))

        dispatch({ type: SET_CHART, chartPoints })

    } catch(err) {
        dispatch({ type: FAIL_CHART_LOADING, message: 'Failed to fetch rooms: ' + err })
    }


    dispatch({ type: STOP_CHART_LOADING })
}
