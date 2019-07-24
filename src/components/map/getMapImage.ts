import axios, { AxiosResponse } from 'axios'
import { MapImage } from '../../definitions'
import { DEV_TOKEN, DEV_INSTANCE } from './constants';

// TODO: Move to a Redux action and store in state
export async function getMapImage(id: number) {
    return axios.get(`http://${DEV_INSTANCE}/api/v1/maps/${id}/image`, {
        headers: { 'Authorization': DEV_TOKEN },
        responseType: 'arraybuffer'
    }).then(async (res: AxiosResponse) => {
        let imgBase64 = 'data:image/png;base64,' + Buffer.from(res.data, 'binary').toString('base64')
        return await getDimensions(imgBase64)
    }).catch((err: Error) => {
        // TODO: Proper error handling
        console.log(err)
        return {
            width: 0,
            height: 0,
            image: ''
        }
    })
}

async function getDimensions(base64: string) {
    return new Promise((resolve) => {
        let img = new Image()
        img.addEventListener('load', () => {
            let mapImg: MapImage = {
                width: img.width,
                height: img.height,
                image: img.src
            }
            resolve(mapImg)
        })
        img.src = base64
    })
}