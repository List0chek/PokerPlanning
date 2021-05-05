import { IRootState } from './types';
import { combineReducers } from 'redux';
import { roomReducer } from './room/room-reducer';
import { userReducer } from './user/user-reducer';

export const ActionType = {
  VOTE: 'VOTE',
  REMOVE_DISCUSSION: 'REMOVE_DISCUSSION',
  CREATE_USER: 'CREATE_USER',
  DELETE_USER: 'DELETE_USER',
};

export const reducer = combineReducers<IRootState>({
  room: roomReducer,
  user: userReducer,
});
