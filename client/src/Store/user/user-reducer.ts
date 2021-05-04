import { IUser } from '../types';
import { Action } from 'redux';

const initState = {
  id: '3520061f-3ade-43a0-9c21-4b62088ccdbc',
  name: 'userName 1',
  token: 'HwYgNd46oEOcIUtiCIzNvA==',
};

export const userReducer = (state: IUser | null = initState, action: Action): IUser | null => {
  return state;
};
