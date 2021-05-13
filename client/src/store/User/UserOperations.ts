import * as api from '../../api/Api';
import { Dispatch } from 'redux';
import { IError, IRootState, IUser } from '../Types';
import { updateUser, deleteUser as deleteUserFromStore } from './UserActionCreators';
import { updateError } from '../Error/ErrorActionCreators';
import { toggleLoadingIndicator } from '../Loading/LoadingActionCreators';
import authService from '../../services/AuthService';
import { deleteRoom } from '../Room/RoomActionCreators';

/*export const getUser = (): any => {
  return async (
    dispatch: Dispatch,
    getState: () => IRootState
  ): Promise<{ user: IUser | null; error: IError | null }> => {
    const response = await api.getUserRequest();
    if (response.user != null) dispatch(updateUser(response.user));
    if (response.error != null) dispatch(updateError(response.error));
    return response;
  };
};*/

export const getUser = (roomId: string): any => {
  return async (dispatch: Dispatch, getState: () => IRootState): Promise<IUser | null> => {
    const response = await api.getUserRequest(roomId);
    if (response != null) dispatch(updateUser(response));
    return response;
  };
};

export const createUser = (userName: string): any => {
  return async (dispatch: Dispatch, getState: () => IRootState): Promise<IUser | null> => {
    dispatch(toggleLoadingIndicator(true));
    try {
      const response = await api.createUserRequest(userName);
      if (response != null) {
        authService.set(response.token);
        dispatch(updateUser(response.user));
        return response.user;
      }
      return response;
    } finally {
      dispatch(toggleLoadingIndicator(false));
    }
  };
};

export const deleteUser = (): any => {
  return async (dispatch: Dispatch, getState: () => IRootState): Promise<void> => {
    dispatch(toggleLoadingIndicator(true));
    try {
      await api.deleteUserRequest();
      console.log(1);
      dispatch(deleteUserFromStore());
      dispatch(deleteRoom());
    } finally {
      dispatch(toggleLoadingIndicator(false));
    }
  };
};
