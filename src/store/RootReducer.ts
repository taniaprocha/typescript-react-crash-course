import { combineReducers, Reducer } from 'redux';
import { User } from "./user/UserTypes";
import { userReducer } from './user/UserReducer';

export interface AppState {
    user: User,
    friendList: string[]
}

export const rootReducer: Reducer<AppState> = combineReducers<AppState>({
    user: userReducer
} as any);