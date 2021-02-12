
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { User, UserActions, UserActionsTypes } from './UserTypes';

export function saveUsername(user: User): UserActionsTypes {
    return {
        type: UserActions.SAVE_USERNAME,
        payload: user
    }
}

export function saveUserMessage(user: User): UserActionsTypes {
    return {
        type: UserActions.SAVE_USER_MESSAGE,
        payload: user
    }
}


export function getFriendList(url: string) {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
        return new Promise<void>(async (resolve) => {
            try {
                const response = await fetch(url, {
                    method: 'GET',
                });

                const friends = await response.json();
                if (!friends) {
                    throw new Error('Could not fetch friends');
                }

                const friendList = friends.map((f: any) => f.name);
                dispatch(saveFriends(friendList));
            } catch (error) {
                console.error(error);
            }
        });
    };
}


export function saveFriends(users: string[]): UserActionsTypes {
    return {
        type: UserActions.SAVE_FRIENDS,
        payload: users
    };
}