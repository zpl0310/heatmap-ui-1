import { ChartPoint } from '../../definitions'

export const SET_CHART = 'SET_CHART'
export const START_CHART_LOADING = 'START_CHART_LOADING'
export const STOP_CHART_LOADING = 'STOP_CHART_LOADING'
export const FAIL_CHART_LOADING = 'FAIL_CHART_LOADING'
export const CHANGE_STARTDATE = 'CHANGE_STARTDATE'
export const CHANGE_ENDDATE = 'CHANGE_ENDDATE'
export const CHANGE_CUR_SELECTION = 'CHANGE_CUR_SELECTION'
export const CHANGE_INTERVAL = 'CHANGE_INTERVAL'

type setChart = {
    type: typeof SET_CHART
    chartPoints: ChartPoint[]
}

type startChartLoading = {
    type: typeof START_CHART_LOADING
}

type stopChartLoading = {
    type: typeof STOP_CHART_LOADING
}

type failChartLoading = {
    type: typeof FAIL_CHART_LOADING
    message: string
}

type changeStartDate = {
    type: typeof CHANGE_STARTDATE
    startDate: Date
}

type changeEndDate = {
    type: typeof CHANGE_ENDDATE
    endDate: Date
}

type changeCurSelection = {
    type: typeof CHANGE_CUR_SELECTION
    curSel: string
}

type changeInterval = {
    type: typeof CHANGE_INTERVAL
    interval: number
}

export type chartAction = setChart|
        startChartLoading | 
        stopChartLoading |
        failChartLoading |
        changeStartDate |
        changeEndDate |
        changeCurSelection |
        changeInterval

export type chartStoreState = {
    loading: boolean
	error: string
	startDate: Date,
	endDate: Date,
    Interval: number,
    curSelection: string,
    points: ChartPoint[],    
}