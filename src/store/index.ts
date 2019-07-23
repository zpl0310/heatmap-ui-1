import { combineReducers } from 'redux'
import instances from './reducers/instances'
import maps from './reducers/maps'
import heatMap from './reducers/heatMap'

//import rooms from './reducers/rooms'


export const rootReducer = combineReducers({
    instances,
    maps,
    heatMap,
})

export type AppState = ReturnType<typeof rootReducer>