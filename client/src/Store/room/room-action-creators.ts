import { ICard } from '../types';
import { Action } from 'redux';
import { ActionType } from '../reducer';

export interface IVoteAction extends Action {
  roomId: string;
  discussionId: string;
  userId: string;
  card: ICard;
}

export const vote = (roomId: string, discussionId: string, userId: string, card: ICard): IVoteAction => {
  return {
    type: ActionType.VOTE,
    roomId: roomId,
    discussionId: discussionId,
    userId: userId,
    card: card,
  };
};

export interface IRemoveDiscussionAction extends Action {
  id: string;
}

export const removeStory = (id: string): IRemoveDiscussionAction => {
  return {
    type: ActionType.REMOVE_DISCUSSION,
    id: id,
  };
};
