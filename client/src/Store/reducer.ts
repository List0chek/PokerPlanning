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
};

export const reducer = combineReducers<IRootState>({
  room: roomReducer,
  user: userReducer,
  discussion: discussionReducer,
  loadingIndicator: loadingIndicatorReducer,
});
