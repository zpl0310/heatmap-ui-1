import { MLPoint } from '../../definitions'
import {
    LOAD_HEATMAP1,
    LOAD_HEATMAP2,
    CLEAR_HEATMAP1,
    CLEAR_HEATMAP2,
    // START_ML1_LOADIND,
    // START_ML2_LOADIND,
    // FAIL_ML1_LOADING,
    // FAIL_ML2_LOADING,
    // STOP_ML1_LOADING,
    // STOP_ML2_LOADING,
    CHANGE_INTERVAL,
    CHANGE_DATE1,
    CHANGE_DATE2,
    CmpMapAction,
    CmpMapStoreState,
}from '../../actions/cmpMap'

const initial: CmpMapStoreState = {
    loading: false,
    error: "",
    points1: [],
    points2: [],
    interval: "1",
    // some random initial date
    date1: new Date(2018,6,6),
    date2: new Date(2019,6,6),
}

export default function instances(state = initial, action: CmpMapAction): CmpMapStoreState {
    switch (action.type) {
        case LOAD_HEATMAP1:
            return Object.assign({},state,{
                points1: action.mlPoints1,
                error:"",
            })
        case LOAD_HEATMAP2:
            return Object.assign({},state,{
                points2: action.mlPoints2,
                error:"",
            })
        case CLEAR_HEATMAP1:
            return Object.assign({},state,{
                points1: [],
                error:"",
            })
        case CLEAR_HEATMAP2:
            return Object.assign({},state,{
                points2: [],
                error:"",
            })
        // case START_ML1_LOADIND:
        //     return Object.assign({},state,{
        //         loading: true,
        //         error:"",
        //     })
        // case START_ML2_LOADIND:
        //     return Object.assign({},state,{
        //         loading: true,
        //         error:"",
        //     })
        case CHANGE_INTERVAL:
            return Object.assign({},state,{
                Interval: action.interval,
            })
        case CHANGE_DATE1:
            return Object.assign({},state,{
                date1: action.date1
            })
        case CHANGE_DATE2:
            return Object.assign({},state,{
                date2: action.date2
            })
        default:
            return state
    }
}