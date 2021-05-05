import { IUser } from '../types';
import { ActionType } from '../reducer';
import { ICreateUserAction } from './user-action-creators';

const initState = null;

export const userReducer = (state: IUser | null = initState, action: ICreateUserAction): IUser | null => {
  switch (action.type) {
    case ActionType.CREATE_USER: {
      const userId = Math.round(Math.random() * (100 - 1) + 1);
      return {
        id: userId.toString(),
        name: action.userName,
        token: 'token',
      };
    }
    default:
      return state;
  }
};
