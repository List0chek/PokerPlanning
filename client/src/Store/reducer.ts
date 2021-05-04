import { IRootState } from './types';
import { combineReducers } from 'redux';
import { roomReducer } from './room/room-reducer';
import { userReducer } from './user/user-reducer';

export const ActionType = {
  VOTE: 'VOTE',
  REMOVE_DISCUSSION: 'REMOVE_DISCUSSION',
};

/*export const reducer = (state: IRootState = initState, action: IVoteAction): IRootState => {
  switch (action.type) {
    case ActionType.VOTE:
      const voteAction = action as IVoteAction;
      return {
        ...state,
        rooms: state.rooms.map((r) => {
          if (voteAction.roomId === r.id) {
            return {
              ...r,
              card: voteAction.card,
            };
          }
          return r;
        }),
      };
  }
  return state;
};*/

export const reducer = combineReducers<IRootState>({
  rooms: roomReducer,
  user: userReducer,
});
