import axios from 'axios'
import { MapInfo } from '../../definitions'
import { DEV_TOKEN, DEV_INSTANCE } from './constants';
import { getMapImage } from '../../actions/maps/getMaps';

// TODO: Move to a Redux action and store in state
export async function getMapInfo(id: string) {
    try {
        // TODO: Change url to actual API endpoint
        let res = await axios.get(`http://${DEV_INSTANCE}/api/v1/maps/${id}/`, {
            headers: { 'Authorization': DEV_TOKEN }
        })
        let map: MapInfo = {
            ...res.data,
            image: await getMapImage(id)
        }
        return map
    } catch(err) {
        // TODO: Proper error handling (redux)
        console.log(err)
        return {}
    }
}