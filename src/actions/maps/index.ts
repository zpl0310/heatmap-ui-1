import { Map } from '../../definitions'

export const LOAD_MAPS = 'LOAD_MAPS'
export const START_MAP_LOADING = 'START_MAP_LOADING'
export const STOP_MAP_LOADING = 'STOP_MAP_LOADING'
export const FAIL_MAP_LOADING = 'FAIL_MAP_LOADING'
export const CHANGE_MAP = 'CHANGE_MAP'

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
    maps: Map[]
}

type ChangeMapAction = {
    type: typeof CHANGE_MAP
    map: Map
}

export type MapAction = LoadMapsAction |
    StartMapLoadingAction | 
    StopMapLoadingAction | 
    FailMapLoadingAction |
    ChangeMapAction

export type MapStoreState = {
    loading: boolean
    list: Map[]
    current: Map | null
    error: string
}