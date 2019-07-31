import { AppActionTypes } from '../actions/types'
import * as hmActions from '../actions/heatMap/actions'
import * as instanceActions from '../actions/instances/actions'
import * as mapActions from '../actions/maps/actions'
//import { Instance, Map, MapImage, MLPoint} from '../definitions'
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '.';

export const dispatchActions = (dispatch: ThunkDispatch<AppState, undefined, AppActionTypes>) => {
    return {
        onLoadMaps: (name:string) => {
            dispatch(mapActions.loadMaps(name))
        },
        onLoadInstances: async() => {
            await dispatch(instanceActions.loadInstances())
        },
        onChangeInstance: (instanceName: string) => {
            dispatch(mapActions.loadMaps(instanceName))
            dispatch(instanceActions.changeInstance(instanceName))
        },
        onChangeMap: (mapName: string) => {
            dispatch(mapActions.changeMap(mapName))
            dispatch(hmActions.loadRobots('5'))
        },
        onClearCurMap: () => {
            dispatch(mapActions.clearCurMap())
        }
    }
}