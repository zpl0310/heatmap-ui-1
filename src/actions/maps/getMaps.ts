import axios from 'axios'
import { MapImage, MapInfo } from '../../definitions'
import { DEV_TOKEN, DEV_INSTANCE } from '../../components/map/constants';

export async function getMaps(instance: string, page: number = 1, results: MapInfo[] = []): Promise<MapInfo[]> {
    try {
        let res = await axios.get(`http://${instance}/api/v1/maps/?page=${page}`, {
            headers: { 'Authorization': DEV_TOKEN },
        })
        
        res.data.results.forEach(async (map: MapInfo) => {
            const info: MapInfo = {
                id: map.id,
                name: map.name,
                x: map.x,
                y: map.y,
                image: await getMapImage(map.id) as MapImage
            }
            results.push(info)
        })

        if (res.data.next) {
            return getMaps(instance, page + 1, results)
        }

        return results
    } catch(err) {
        throw err
    }
}

export async function getMapImage(id: string) {
    try {
        let res = await axios.get(`http://${DEV_INSTANCE}/api/v1/maps/${id}/image`, {
            headers: { 'Authorization': DEV_TOKEN },
            responseType: 'arraybuffer'
        })
        let imgBase64 = 'data:image/png;base64,' + Buffer.from(res.data, 'binary').toString('base64')
        return await getDimensions(imgBase64)
    } catch (err) {
        throw err
    }
}

async function getDimensions(base64: string) {
    return new Promise((resolve) => {
        let img = new Image()
        img.addEventListener('load', () => {
            let mapImg: MapImage = {
                width: img.width,
                height: img.height,
                src: img.src
            }
            resolve(mapImg)
        })
        img.src = base64
    })
}