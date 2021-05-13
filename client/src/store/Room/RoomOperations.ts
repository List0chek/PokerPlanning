import { toggleLoadingIndicator } from '../Loading/LoadingActionCreators';
import * as api from '../../api/Api';
import { updateRoom } from './RoomActionCreators';
import { Dispatch } from 'redux';
import { IRoom, IRootState } from '../Types';

export const createRoom = (roomName: string, userId: string): any => {
  return async (dispatch: Dispatch, getState: () => IRootState): Promise<IRoom | null> => {
    dispatch(toggleLoadingIndicator(true));
    try {
      const response = await api.createRoomRequest(roomName, userId);
      if (response != null) {
        dispatch(updateRoom(response));
        return response;
      } else return response;
    } finally {
      dispatch(toggleLoadingIndicator(false));
    }
  };
};

export const setVote = (discussionId: string, userId: string, cardId: string): any => {
  return async (dispatch: Dispatch, getState: () => IRootState): Promise<IRoom | null> => {
    dispatch(toggleLoadingIndicator(true));
    try {
      const response = await api.setVoteRequest(discussionId, userId, cardId);
      if (response != null) {
        dispatch(updateRoom(response));
        return response;
      } else return response;
    } finally {
      dispatch(toggleLoadingIndicator(false));
    }
  };
};

export const getRoomInfo = (roomId: string, userId: string): any => {
  return async (dispatch: Dispatch, getState: () => IRootState): Promise<IRoom | null> => {
    const response = await api.getRoomInfoRequest(roomId, userId);
    if (response != null) dispatch(updateRoom(response));
    return response;
  };
};

export const closeDiscussion = (roomId: string, discussionId: string, userId: string): any => {
  return async (dispatch: Dispatch, getState: () => IRootState): Promise<IRoom | null> => {
    dispatch(toggleLoadingIndicator(true));
    try {
      const response = await api.closeDiscussionRequest(roomId, discussionId, userId);
      if (response != null) dispatch(updateRoom(response));
      return response;
    } finally {
      dispatch(toggleLoadingIndicator(false));
    }
  };
};

export const createDiscussion = (roomId: string, topicName: string, userId: string): any => {
  return async (dispatch: Dispatch, getState: () => IRootState): Promise<IRoom | null> => {
    dispatch(toggleLoadingIndicator(true));
    try {
      const response = await api.createDiscussionRequest(roomId, topicName, userId);
      if (response != null) dispatch(updateRoom(response));
      return response;
    } finally {
      dispatch(toggleLoadingIndicator(false));
    }
  };
};

export const deleteDiscussion = (roomId: string, discussionId: string, userId: string): any => {
  return async (dispatch: Dispatch, getState: () => IRootState): Promise<IRoom | null> => {
    dispatch(toggleLoadingIndicator(true));
    try {
      const response = await api.deleteDiscussionRequest(roomId, discussionId, userId);
      if (response != null) dispatch(updateRoom(response));
      return response;
    } finally {
      dispatch(toggleLoadingIndicator(false));
    }
  };
};

export const addMemberToRoom = (roomId: string, userId: string): any => {
  return async (dispatch: Dispatch, getState: () => IRootState): Promise<IRoom | null> => {
    const response = await api.addMemberToRoomRequest(roomId, userId);
    if (response != null) dispatch(updateRoom(response));
    return response;
  };
};
