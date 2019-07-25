import { MapInfo } from '../../definitions'
import { LOAD_MAPS,
        CHANGE_MAP, 
        FAIL_MAP_LOADING,
        STOP_MAP_LOADING,
        START_MAP_LOADING,
        MapAction,
        CLEAR_CURMAP,
        LOAD_CUR_MAP,
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
export const loadMaps = (id: string) => async (dispatch: ThunkDispatch<AppState, undefined, MapAction>) => {
    dispatch({ type: START_MAP_LOADING })

    try {
        const res: AxiosResponse = await axios.get('api/instances/{id}/maps', {
            // might need it later
            // headers: {
            //     'Token': token
            // }
        })
     
        let maps = res.data.map((map: MapInfo): MapInfo => ({
            id: map.id,
            name: map.name,
            x: map.x,
            y: map.y,
            image: {width: 0, height: 0, src: ''},
        }))

        dispatch({ type: LOAD_MAPS, maps })

    } catch(err) {
        dispatch({ type: FAIL_MAP_LOADING, message: 'Failed to fetch maps: ' + err })
    }
    dispatch({ type: STOP_MAP_LOADING, })
}

export const loadCurMap = (mapURL: string) => {
    //TODO
}

// export const loadMaps = (maps: Map[]): MapAction => ({
//     type: LOAD_MAPS,
//     maps
// })

