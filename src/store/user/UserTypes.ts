export interface User {
    username: string | undefined;
    userMessage: string | undefined;
    friendList?: string[] | undefined;
}

export const UserActions = {
    SAVE_USERNAME: 'SAVE_USERNAME',
    SAVE_USER_MESSAGE: 'SAVE_USER_MESSAGE',
    SAVE_FRIENDS: 'SAVE_FRIENDS'
}

interface SaveUsernameAction {
    type: typeof UserActions.SAVE_USERNAME,
    payload: User
}

interface SaveUserMessageAction {
    type: typeof UserActions.SAVE_USER_MESSAGE,
    payload: User
}

interface SaveFriendsAction {
    type: typeof UserActions.SAVE_FRIENDS,
    payload: string[]
}

export type UserActionsTypes = SaveUsernameAction | SaveUserMessageAction | SaveFriendsAction;