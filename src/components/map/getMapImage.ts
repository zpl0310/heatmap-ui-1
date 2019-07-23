import axios, { AxiosResponse } from 'axios'
import { MapImage } from '../../definitions'

// TODO: Move to a Redux action and store in state
export async function getMapImage(id: number) {
    return axios.get(`http://localhost:8888/api/v1/maps/${id}/image`, {
        headers: { 'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik1UWkdSVVZEUmtNeVJUVTRSVGcwUlVNd05qQXpSalE0TlRRMU5URTVNakF4TlRWRVF6ZzFPQSJ9.eyJodHRwczovL2ZldGNoY29yZS1jbG91ZC5jb20vaW5zdGFuY2UiOlsiKiJdLCJodHRwczovL2ZldGNoY29yZS1jbG91ZC5jb20vdXNlcl90eXBlIjoiaHVtYW4iLCJodHRwczovL2ZldGNoY29yZS1jbG91ZC5jb20vZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJodHRwczovL2ZldGNoY29yZS1jbG91ZC5jb20vcm9sZXMiOlsiYWRtaW4iLCJnb2QiXSwiaXNzIjoiaHR0cHM6Ly9oZWxsby10aGVyZS5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NWM4MDNmZDg1MmJjNDMyYTdiMDk2MmI5IiwiYXVkIjpbImZldGNoY29yZSIsImh0dHBzOi8vaGVsbG8tdGhlcmUuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTU2MzMyMDk3MiwiZXhwIjoxNTY1OTEyOTcyLCJhenAiOiJlZlBqSXpacnNUcTJYRFpTQkFTOGtiYkVibzJwdFFaaiIsInNjb3BlIjoicHJvZmlsZSBlbWFpbCBvcGVuaWQgZmV0Y2hjb3JlOmFsbF9hY2Nlc3MiLCJndHkiOiJwYXNzd29yZCJ9.dC0gYaeHD4aRwrlm6NUZL9gctCj8CPG70FEas3cH4K_6_cjFVcrPyyCgpgwcfWvGYlJf8ZEIIMoXtF-p8bS4-eriV4OspFaIfCQSM_S3edymiJrzRmJne5wzM9Hiv9lHMfXTEo096PfiK7U4kZZhBB5VNzKUqoTlU9RHAvWi_YsfBaSHLo6W72GHYmba0vpoS1_yj4vsH3XybC-I5gbBiF27Yu5QbFRLUdKDts6fb59pzQBq6QiTff3JnbV0Labtc07sGa5rXcWjUP0F4yykxaGhvEKJFTdu7h3D-R4RwrgX0IxWsn40UP2EGBkWDyaMejVv3wE_CpbZu8srcw2LHw' },
        responseType: 'arraybuffer'
    }).then(async (res: AxiosResponse) => {
        let imgBase64 = 'data:image/png;base64,' + Buffer.from(res.data, 'binary').toString('base64')
        return await getDimensions(imgBase64)
    })
        .catch((err: Error) => {
            // TODO: Error handling
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