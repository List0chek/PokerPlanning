import { IRootState } from './types';
import { combineReducers } from 'redux';
import { roomReducer } from './room/room-reducer';
import { userReducer } from './user/user-reducer';
import { discussionReducer } from './discussion/discussion-reducer';
import { loadingIndicatorReducer } from './loading/loading-reducer';

export const ActionType = {
  UPDATE_USER: 'UPDATE_USER',
  UPDATE_ROOM: 'UPDATE_ROOM',
  UPDATE_DISCUSSION: 'UPDATE_DISCUSSION',
  TOGGLE_LOADING_INDICATOR: 'TOGGLE_LOADING_INDICATOR',
  DELETE_USER: 'DELETE_USER',
  DELETE_ROOM: 'DELETE_ROOM',
  DELETE_DISCUSSION: 'DELETE_DISCUSSION',
};

export const reducer = combineReducers<IRootState>({
  room: roomReducer,
  user: userReducer,
  discussion: discussionReducer,
  loadingIndicator: loadingIndicatorReducer,
});
