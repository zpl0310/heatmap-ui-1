import {
    LOAD_MAPS,
    CHANGE_MAP, 
    FAIL_MAP_LOADING,
    STOP_MAP_LOADING,
    START_MAP_LOADING,
    CLEAR_CURMAP,
    LOAD_CUR_MAP,
    MapAction,
    MapStoreState,
}from '../../actions/maps'

//import { map } from '../../definitions'

const initial: MapStoreState = {
    loading: false,
    list: [],
    current: "",
    error: "",
}

export default function maps(state = initial, action: MapAction): MapStoreState {
    switch (action.type) {
        case LOAD_MAPS:
            return Object.assign({},state,{
                list: action.maps,
                error:"",
            })
        case CHANGE_MAP:
            return Object.assign({},state,{
                current: action.mapName,
                error:"",
            })
        case FAIL_MAP_LOADING:
            return Object.assign({}, state, {
                error: action.message
            })
        case STOP_MAP_LOADING:
            return Object.assign({}, state, {
                loading: false
            })
        case START_MAP_LOADING:
            return Object.assign({}, state, {
                loading: true
            })
        case CLEAR_CURMAP:
            return Object.assign({},state,{
                current:""
            })
        default:
            return state
    }
}

