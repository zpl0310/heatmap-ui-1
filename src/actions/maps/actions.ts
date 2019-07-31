import { MapInfo, MapImage,Map } from '../../definitions'
import {
    LOAD_MAPS,
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
import { DEV_INSTANCE, DEV_TOKEN } from '../../components/map/constants';
import axios, { AxiosResponse } from 'axios'
import { getMaps } from './getMaps';

export const changeMap = (id: string): MapAction => ({
    type: CHANGE_MAP,
    id
})

export const clearCurMap = (): MapAction => ({
    type: CLEAR_CURMAP
})

// *** might need to change after api set up
export const loadMaps = (name: string) => async (dispatch: ThunkDispatch<AppState, undefined, MapAction>) => {
    dispatch({ type: START_MAP_LOADING })
    //api.GET("/instances/:instance_name/maps", handler.NewInstanceMapListHandler())
    try {
        const res: AxiosResponse = await axios.get(`http://localhost:8080/api/instances/${name}/maps`)
        //let maps = await getMaps(DEV_INSTANCE, 1, [])
        let maps = res.data.map((map: any): Map => ({
            //id: instance.id,
            id: map,
        }))
        dispatch({ type: LOAD_MAPS, maps })
    } catch (err) {
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

