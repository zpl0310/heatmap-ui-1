import { AppActionTypes } from '../actions/types'
//import * as hmActions from '../actions/heatMap/actions'
import * as instanceActions from '../actions/instances/actions'
//import * as mapActions from '../actions/maps/actions'
//import { Instance, Map, MapImage, MLPoint} from '../definitions'
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '.';

export const dispatchActions = (dispatch: ThunkDispatch<AppState, undefined, AppActionTypes>) => {
    return {
        onChangeInstance: (instanceName: string) => {
            dispatch(instanceActions.changeInstance(instanceName))
        }
        // onLogIn: async (username: string, password: string) => {
        //     await dispatch(authActions.logIn(username, password))
        // },
        // onLogOut: () => {
        //     dispatch(authActions.logOut())
        // },
        // authenticate: async (token: string) => {
        //     await dispatch(authActions.getCurrentUser(token))
        // },

        // onLoadMessages: (messages: Message[]) => {
        //     dispatch(msgActions.loadMessages(messages))
        // },
        // onLoadRooms: async (token: string) => {
        //     await dispatch(roomActions.loadRooms(token))
        // },
        // onLoadUsers: async (token: string) => {
        //     await dispatch(userActions.loadUsers(token))
        // },
    }
}