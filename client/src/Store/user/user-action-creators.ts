import { Action } from 'redux';
import { ActionType } from '../reducer';

export interface ICreateUserAction extends Action {
  userName: string;
}

export const createUser = (userName: string): ICreateUserAction => {
  return {
    type: ActionType.CREATE_USER,
    userName: userName,
  };
};

export const deleteUser = (): Action => {
  return {
    type: ActionType.DELETE_USER,
  };
};
