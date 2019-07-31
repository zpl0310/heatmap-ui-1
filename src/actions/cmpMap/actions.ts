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
    CmpMapAction
}from '.'

// TODO: if calculation is all done in the backend, campare heat map can 
// be rendered just like normal heat map
export const loadHeatmap1 = (mlPoints1: MLPoint[]): CmpMapAction => ({
    type: LOAD_HEATMAP1,
    mlPoints1
})
export const loadHeatmap2 = (mlPoints2: MLPoint[]): CmpMapAction => ({
    type: LOAD_HEATMAP2,
    mlPoints2
})
export const clearHeatmap1 = (): CmpMapAction => ({
    type: CLEAR_HEATMAP1
})
export const clearHeatmap2 = (): CmpMapAction => ({
    type: CLEAR_HEATMAP2
})

// export const startMl1Loading = (): CmpMapAction => ({
//     type: START_ML1_LOADIND
// })
// export const startMl2Loading = (): CmpMapAction => ({
//     type: START_ML2_LOADIND
// })
// export const failMl1Loading = (message: string): CmpMapAction => ({
//     type: FAIL_ML1_LOADING,
//     message
// })
// export const failMl2Loading = (message: string): CmpMapAction => ({
//     type: FAIL_ML2_LOADING,
//     message
// })
// export const stopMl1Loading = () => ({
//     type: STOP_ML1_LOADING
// })
// export const stopMl2Loading = () => ({
//     type: STOP_ML2_LOADING
// })
export const changeInterval = (interval:string) => ({
    type: CHANGE_INTERVAL,
    interval
})
export const changeDate1 = (date1: Date) => ({
    type: CHANGE_DATE1,
    date1
})
export const changeDate2 = (date2: Date) => ({
    type: CHANGE_DATE2,
    date2
})

