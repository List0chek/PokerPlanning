import { IRootState } from './types';
import { combineReducers } from 'redux';
import { roomReducer } from './room/room-reducer';
import { userReducer } from './user/user-reducer';

export const ActionType = {
  UPDATE_USER: 'UPDATE_USER',
  UPDATE_ROOM: 'UPDATE_ROOM',
};

export const reducer = combineReducers<IRootState>({
  room: roomReducer,
  user: userReducer,
});
