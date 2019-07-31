import { combineReducers } from 'redux'
import instances from './reducers/instances'
import maps from './reducers/maps'
import heatMap from './reducers/heatMap'
import cmpMap from './reducers/cmpMap'

export const rootReducer = combineReducers({
    instances,
    maps,
    heatMap,
    cmpMap,
})

export type AppState = ReturnType<typeof rootReducer>