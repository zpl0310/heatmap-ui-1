import { Instance } from '../../definitions'
import { SET_INSTANCES,
        CHANGE_INSTANCE, 
        FAIL_INSTANCE_LOADING,
        STOP_INSTANCE_LOADING,
        START_INSTANCE_LOADING,
        InstanceAction,
 } from '.'
import { AppState } from '../../store'

import { ThunkDispatch } from 'redux-thunk'
import axios, { AxiosResponse } from 'axios'

export const changeInstance = (instanceName: string): InstanceAction => ({
    type: CHANGE_INSTANCE,
    instanceName
}) 

// need to change after api set up
export const loadInstances = () => async (dispatch: ThunkDispatch<AppState, undefined, InstanceAction>) => {
    dispatch({ type: START_INSTANCE_LOADING })

    try {
        const res: AxiosResponse = await axios.get('http://localhost:8080/api/instances')
        //, {
            // might need it later
            // headers: {
            //     'Token': token
            // }
        //})
        console.log("data is" + res.data)
        //let instances = res.data
        let instances = res.data.map((instance: string): Instance => ({
            //id: instance.id,
            name: instance,
        }))

        dispatch({ type: SET_INSTANCES, instances })

    } catch(err) {
        dispatch({ type: FAIL_INSTANCE_LOADING, message: 'Failed to fetch instances: ' + err})
    }

    dispatch({ type: STOP_INSTANCE_LOADING, })
}

// export const loadInstances = (instances: Instance[]): InstanceAction => ({
//     type: LOAD_INSTANCES,
//     instances
// })

