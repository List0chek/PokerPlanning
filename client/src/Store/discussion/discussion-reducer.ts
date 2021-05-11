import { IDiscussion } from '../types';
import { ActionType } from '../reducer';
import { IUpdateDiscussionAction } from './discussion-action-creators';

const initState = null;

export function discussionReducer(
  state: IDiscussion | null = initState,
  action: IUpdateDiscussionAction
): IDiscussion | null {
  switch (action.type) {
    case ActionType.UPDATE_DISCUSSION:
      return action.discussion;
    default:
      return state;
  }
}
