import * as api from '../../api/Api';
import { Dispatch } from 'redux';
import { IRootState, IUser } from '../Types';
import { updateUser, deleteUser as deleteUserFromStore } from './UserActionCreators';
import { toggleLoadingIndicator } from '../Loading/LoadingActionCreators';
import { deleteRoom } from '../Room/RoomActionCreators';

export const loadAndSaveUser = (): any => {
  return async (dispatch: Dispatch, getState: () => IRootState): Promise<IUser> => {
    dispatch(toggleLoadingIndicator(true));
    try {
      const response = await api.getUserRequest();
      dispatch(updateUser(response));
      return response;
    } catch (error: any) {
      console.log(error);
      throw error;
    } finally {
      dispatch(toggleLoadingIndicator(false));
    }
  };
};

export const createAndSaveUser = (userName: string): any => {
  return async (dispatch: Dispatch, getState: () => IRootState): Promise<IUser> => {
    dispatch(toggleLoadingIndicator(true));
    try {
      const response = await api.createUserRequest(userName);
      dispatch(updateUser(response));
      return response;
    } catch (error: any) {
      console.log(error);
      throw error;
    } finally {
      dispatch(toggleLoadingIndicator(false));
    }
  };
};

export const deleteUserAndClearStore = (): any => {
  return async (dispatch: Dispatch, getState: () => IRootState) => {
    dispatch(toggleLoadingIndicator(true));
    try {
      await api.deleteUserRequest();
      localStorage.clear();
      dispatch(deleteUserFromStore());
      dispatch(deleteRoom());
    } catch (error: any) {
      console.log(error);
      throw error;
    } finally {
      dispatch(toggleLoadingIndicator(false));
    }
  };
};
