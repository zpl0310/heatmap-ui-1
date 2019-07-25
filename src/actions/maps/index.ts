import { MapInfo } from '../../definitions'

export const LOAD_MAPS = 'LOAD_MAPS'
export const START_MAP_LOADING = 'START_MAP_LOADING'
export const STOP_MAP_LOADING = 'STOP_MAP_LOADING'
export const FAIL_MAP_LOADING = 'FAIL_MAP_LOADING'
export const CHANGE_MAP = 'CHANGE_MAP'
export const CLEAR_CURMAP = 'CLEAR_CURMAP'
export const LOAD_CUR_MAP = 'LOAD_CUR_MAP'

//TODO: add single map
type StartMapLoadingAction = {
    type: typeof START_MAP_LOADING
}

type StopMapLoadingAction = {
    type: typeof STOP_MAP_LOADING
}

type FailMapLoadingAction = {
    type: typeof FAIL_MAP_LOADING
    message: string
}

type LoadMapsAction = {
    type: typeof LOAD_MAPS
    maps: MapInfo[]
}

type ChangeMapAction = {
    type: typeof CHANGE_MAP
    mapName: string
}

type ClearCurMap = {
    type: typeof CLEAR_CURMAP
}

type LoadCurMap = {
    type: typeof LOAD_CUR_MAP
    mapURL: string
}

export type MapAction = LoadMapsAction |
    StartMapLoadingAction | 
    StopMapLoadingAction | 
    FailMapLoadingAction |
    ChangeMapAction |
    ClearCurMap | 
    LoadCurMap

export type MapStoreState = {
    loading: boolean
    list: MapInfo[]
    current: string
    error: string
}