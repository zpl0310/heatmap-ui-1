import { Instance } from '../../definitions'
import { LOAD_INSTANCES,
        CHANGE_INSTANCE, 
        //FAIL_INSTANCE_LOADING,
        //STOP_INSTANCE_LOADING,
        //START_INSTANCE_LOADING,
        InstanceAction,
 } from '.'
//import { AppState } from '../../store'

//import { ThunkDispatch } from 'redux-thunk'
//import axios, { AxiosResponse } from 'axios'

export const changeInstance = (instanceName: string): InstanceAction => ({
    type: CHANGE_INSTANCE,
    instanceName
}) 

// need to change after api set up
// export const loadInstances = (token: string) => async (dispatch: ThunkDispatch<AppState, undefined, InstanceAction>) => {
//     dispatch({ type: START_INSTANCE_LOADING })

//     try {
//         const res: AxiosResponse = await axios.get('api/instances', {
//             // might need it later
//             // headers: {
//             //     'Token': token
//             // }
//         })

//         let instances = res.data.map((instance: any): Instance => ({
//             id: instance.id,
//             name: instance.name,
//         }))

//         dispatch({ type: LOAD_INSTANCES, instances })

//     } catch(err) {
//         dispatch({ type: FAIL_INSTANCE_LOADING, message: 'Failed to fetch instances: ' + err })
//     }


//     dispatch({ type: STOP_INSTANCE_LOADING, })
// }

export const loadInstances = (instances: Instance[]): InstanceAction => ({
    type: LOAD_INSTANCES,
    instances
})

