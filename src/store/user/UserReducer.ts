import {User, UserActions, UserActionsTypes} from './UserTypes';

const INITIAL_STATE: User = {
    username: undefined,
    userMessage: undefined,
    friendList: undefined,
}

export function userReducer(prevState: User = INITIAL_STATE, action: UserActionsTypes){
    switch(action.type){
        case UserActions.SAVE_USERNAME:
            return {
                ...prevState,
                username: (action.payload as User).username
            }
        case UserActions.SAVE_USER_MESSAGE  :
            return {
                ...prevState,
                userMessage: (<User>action.payload).userMessage
            }
        case UserActions.SAVE_FRIENDS  :
        return {
            ...prevState,
            friendList: action.payload as string[]
        }
        default:
            return prevState;
    }
}