import { IDiscussion } from '../types';
import { Action } from 'redux';
import { ActionType } from '../reducer';

export interface IUpdateDiscussionAction extends Action {
  discussion: IDiscussion;
}

export const updateDiscussion = (discussion: IDiscussion): IUpdateDiscussionAction => {
  return {
    type: ActionType.UPDATE_DISCUSSION,
    discussion: discussion,
  };
};
