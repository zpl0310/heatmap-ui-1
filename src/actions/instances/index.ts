import { Instance } from '../../definitions'

export const LOAD_INSTANCES = 'LOAD_INSTANCES'
export const START_INSTANCE_LOADING = 'START_INSTANCE_LOADING'
export const STOP_INSTANCE_LOADING = 'STOP_INSTANCE_LOADING'
export const FAIL_INSTANCE_LOADING = 'FAIL_INSTANCE_LOADING'
export const CHANGE_INSTANCE = 'CHANGE_INSTANCE'


type StartInstanceLoadingAction = {
    type: typeof START_INSTANCE_LOADING
}

type StopInstanceLoadingAction = {
    type: typeof STOP_INSTANCE_LOADING
}

type FailInstanceLoadingAction = {
    type: typeof FAIL_INSTANCE_LOADING
    message: string
}

type LoadInstancesAction = {
    type: typeof LOAD_INSTANCES
    instances: Instance[]
}

type ChangeInstanceAction = {
    type: typeof CHANGE_INSTANCE
    instance: Instance
}

export type InstanceAction = LoadInstancesAction |
    StartInstanceLoadingAction | 
    StopInstanceLoadingAction | 
    FailInstanceLoadingAction |
    ChangeInstanceAction

export type InstanceStoreState = {
    loading: boolean
    list: Instance[]
    current: Instance | null
    error: string
}