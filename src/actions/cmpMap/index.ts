import { MLPoint } from '../../definitions'

export const LOAD_HEATMAP1 = 'LOAD_HEATMAP1'
export const LOAD_HEATMAP2 = 'LOAD_HEATMAP2'
export const CLEAR_HEATMAP1 = 'CLEAR_HEATMAP1'
export const CLEAR_HEATMAP2 = 'CLEAR_HEATMAP2'
export const START_ML1_LOADIND = 'START_ML1_LOADIND'
export const START_ML2_LOADIND = 'START_ML2_LOADIND'
export const FAIL_ML1_LOADING = 'FAIL_ML1_LOADING'
export const FAIL_ML2_LOADING = 'FAIL_ML2_LOADING'
export const STOP_ML1_LOADING = 'STOP_ML1_LOADING'
export const STOP_ML2_LOADING = 'STOP_ML2_LOADING'
export const CHANGE_INTERVAL = 'CHANGE_INTERVAL'
export const CHANGE_DATE1 = 'CHANGE_DATE1'
export const CHANGE_DATE2 = 'CHANGE_DATE2'

type LoadHeatmap1Action = {
    type: typeof LOAD_HEATMAP1
    mlPoints1: MLPoint[]
}

type LoadHeatmap2Action = {
    type: typeof LOAD_HEATMAP2
    mlPoints2: MLPoint[]
}

type ClearHeatmap1Action = {
    type: typeof CLEAR_HEATMAP1
}

type ClearHeatmap2Action = {
    type: typeof CLEAR_HEATMAP2
}

type StartML1LoadingAction = {
    type: typeof START_ML1_LOADIND
}

type StartML2LoadingAction = {
    type: typeof START_ML2_LOADIND
}

type FailML1LoadingAction = {
    type: typeof FAIL_ML1_LOADING
    message:string
}

type FailML2LoadingAction = {
    type: typeof FAIL_ML2_LOADING
    message:string
}

type StopML1LoadingAction = {
    type: typeof STOP_ML1_LOADING
}

type StopML2LoadingAction = {
    type: typeof STOP_ML2_LOADING
}

type ChangeInterval = {
    type: typeof CHANGE_INTERVAL
    interval: string
}

type ChangeDate1 = {
    type: typeof CHANGE_DATE1
    date1: Date
}

type ChangeDate2 = {
    type: typeof CHANGE_DATE2
    date2: Date
}

export type CmpMapAction = LoadHeatmap1Action |
    LoadHeatmap2Action | ClearHeatmap1Action |
    ClearHeatmap2Action | StartML1LoadingAction |
    StartML2LoadingAction | FailML1LoadingAction |
    FailML2LoadingAction | StopML1LoadingAction |
    StopML2LoadingAction | ChangeInterval |
    ChangeDate1 | ChangeDate2

export type CmpMapStoreState = {
    loading: boolean
    error: string
    points1: MLPoint[]
    points2: MLPoint[]
    interval: string
    date1: Date | null
    date2: Date | null
}