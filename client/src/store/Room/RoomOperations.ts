import { toggleLoadingIndicator } from '../Loading/LoadingActionCreators';
import * as api from '../../api/Api';
import { updateRoom } from './RoomActionCreators';
import { Dispatch } from 'redux';
import { IRoom, IRootState } from '../Types';

export const createAndSaveRoom = (roomName: string, userId: string): any => {
  return async (dispatch: Dispatch, getState: () => IRootState): Promise<IRoom> => {
    dispatch(toggleLoadingIndicator(true));
    try {
      const response = await api.createRoomRequest(roomName, userId);
      dispatch(updateRoom(response));
      return response;
    } catch (error: any) {
      console.log(error);
      throw error;
    } finally {
      dispatch(toggleLoadingIndicator(false));
    }
  };
};

export const setAndSaveVote = (discussionId: string, userId: string, cardId: string): any => {
  return async (dispatch: Dispatch, getState: () => IRootState): Promise<IRoom> => {
    dispatch(toggleLoadingIndicator(true));
    try {
      const response = await api.setVoteRequest(discussionId, userId, cardId);
      dispatch(updateRoom(response));
      return response;
    } catch (error: any) {
      console.log(error);
      throw error;
    } finally {
      dispatch(toggleLoadingIndicator(false));
    }
  };
};

export const loadAndSaveRoomInfo = (roomId: string, userId: string): any => {
  return async (dispatch: Dispatch, getState: () => IRootState): Promise<IRoom> => {
    try {
      const response = await api.getRoomInfoRequest(roomId, userId);
      dispatch(updateRoom(response));
      return response;
    } catch (error: any) {
      console.log(error);
      throw error;
    }
  };
};

export const closeAndSaveDiscussion = (roomId: string, discussionId: string, userId: string): any => {
  return async (dispatch: Dispatch, getState: () => IRootState): Promise<IRoom> => {
    dispatch(toggleLoadingIndicator(true));
    try {
      const response = await api.closeDiscussionRequest(roomId, discussionId, userId);
      dispatch(updateRoom(response));
      return response;
    } catch (error: any) {
      console.log(error);
      throw error;
    } finally {
      dispatch(toggleLoadingIndicator(false));
    }
  };
};

export const createAndSaveDiscussion = (roomId: string, topicName: string, userId: string): any => {
  return async (dispatch: Dispatch, getState: () => IRootState): Promise<IRoom> => {
    dispatch(toggleLoadingIndicator(true));
    try {
      const response = await api.createDiscussionRequest(roomId, topicName, userId);
      dispatch(updateRoom(response));
      return response;
    } catch (error: any) {
      console.log(error);
      throw error;
    } finally {
      dispatch(toggleLoadingIndicator(false));
    }
  };
};

export const deleteAndSaveDiscussion = (roomId: string, discussionId: string, userId: string): any => {
  return async (dispatch: Dispatch, getState: () => IRootState): Promise<IRoom> => {
    dispatch(toggleLoadingIndicator(true));
    try {
      const response = await api.deleteDiscussionRequest(roomId, discussionId, userId);
      dispatch(updateRoom(response));
      return response;
    } catch (error: any) {
      console.log(error);
      throw error;
    } finally {
      dispatch(toggleLoadingIndicator(false));
    }
  };
};

export const addAndSaveMemberToRoom = (roomId: string, userId: string): any => {
  return async (dispatch: Dispatch, getState: () => IRootState): Promise<IRoom> => {
    dispatch(toggleLoadingIndicator(true));
    try {
      const response = await api.addMemberToRoomRequest(roomId, userId);
      dispatch(updateRoom(response));
      return response;
    } catch (error: any) {
      console.log(error);
      throw error;
    } finally {
      dispatch(toggleLoadingIndicator(false));
    }
  };
};
