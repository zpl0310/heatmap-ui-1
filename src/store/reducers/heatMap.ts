import {
    LOAD_POINTS,
    LOAD_ROBOTS,
    //START_ROBOT_LOADING,
    //STOP_ROBOT_LOADING,
    //FAIL_ROBOT_LOADING,
    CHANGE_INTERVAL,
    CLEAR_HEATMAP,
    HeatMapStoreState,    
    HeatMapAction,
}from '../../actions/heatMap'

//import { Instance } from '../../definitions'

const initial: HeatMapStoreState = {
    loading: false,
	error: "",
    points: [],
	robots: [],
	Interval: 1,
}

export default function instances(state = initial, action: HeatMapAction): HeatMapStoreState {
    switch (action.type) {
        case LOAD_ROBOTS:
            return Object.assign({},state,{
                robots: action.robots,
                error:"",
            })
        case LOAD_POINTS:
            return Object.assign({},state,{
                points: action.points,
                error:"",
            })
        case CHANGE_INTERVAL:
            return Object.assign({},state,{
                Interval: action.interval,
            })
        case CLEAR_HEATMAP:
            return initial
        default:
            return state
    }
}

