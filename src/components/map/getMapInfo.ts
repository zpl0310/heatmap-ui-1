import axios, { AxiosResponse } from 'axios'
import { MapInfo } from '../../definitions'
import { DEV_TOKEN, DEV_INSTANCE } from './constants';
import { getMapImage } from './getMapImage';

// TODO: Move to a Redux action and store in state
export async function getMapInfo(id: number) {
    return axios.get(`http://${DEV_INSTANCE}/api/v1/maps/${id}/`, {
        headers: { 'Authorization': DEV_TOKEN }
    }).then(async (res: AxiosResponse) => {
        let map: MapInfo = {
            ...res.data,
            image: await getMapImage(id)
        }
        return map
    }).catch((err: Error) => {
        // TODO: Proper error handling
        console.log(err)
        return {}
    })
}