import { Map } from '../../definitions'
import { LOAD_MAPS,
        CHANGE_MAP, 
        FAIL_MAP_LOADING,
        STOP_MAP_LOADING,
        START_MAP_LOADING,
        MapAction,
        CLEAR_CURMAP,
 } from '.'
import { AppState } from '../../store'

import { ThunkDispatch } from 'redux-thunk'
import axios, { AxiosResponse } from 'axios'

export const changeMap = (mapName: string): MapAction => ({
    type: CHANGE_MAP,
    mapName
}) 

export const clearCurMap = (): MapAction => ({
    type: CLEAR_CURMAP
})

// *** might need to change after api set up
// export const loadMaps = (id: string) => async (dispatch: ThunkDispatch<AppState, undefined, MapAction>) => {
//     dispatch({ type: START_MAP_LOADING })

//     try {
//         const res: AxiosResponse = await axios.get('api/instances/{id}/maps', {
//             // might need it later
//             // headers: {
//             //     'Token': token
//             // }
//         })
//          *** might need to change 
//         let maps = res.data.map((map: any): Map => ({
//             id: map.id,
//             name: map.name,
//             imgae: map.image || null
//         }))

//         dispatch({ type: LOAD_MAPS, maps })

//     } catch(err) {
//         dispatch({ type: FAIL_MAP_LOADING, message: 'Failed to fetch maps: ' + err })
//     }


//     dispatch({ type: STOP_Map_LOADING, })
// }

export const loadmaps = (maps: Map[]): MapAction => ({
    type: LOAD_MAPS,
    maps
})

