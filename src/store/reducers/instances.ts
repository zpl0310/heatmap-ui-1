import {
    SET_INSTANCES,
    CHANGE_INSTANCE, 
    FAIL_INSTANCE_LOADING,
    STOP_INSTANCE_LOADING,
    START_INSTANCE_LOADING,
    InstanceStoreState,
    InstanceAction
}from '../../actions/instances'

//import { Instance } from '../../definitions'

const initial: InstanceStoreState = {
    loading: false,
    list: [],
    current: "",
    error: "",
}

export default function instances(state = initial, action: InstanceAction): InstanceStoreState {
    switch (action.type) {
        case SET_INSTANCES:
            return Object.assign({},state,{
                list: action.instances,
                error:"",
            })
        case CHANGE_INSTANCE:
            return Object.assign({},state,{
                current: action.instanceName,
                error:"",
            })
        case FAIL_INSTANCE_LOADING:
            return Object.assign({}, state, {
                error: action.message
            })
        case STOP_INSTANCE_LOADING:
            return Object.assign({}, state, {
                loading: false
            })
        case START_INSTANCE_LOADING:
            return Object.assign({}, state, {
                loading: true
            })
        default:
            return state
    }
}

