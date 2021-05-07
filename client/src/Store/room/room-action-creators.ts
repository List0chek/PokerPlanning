import { IRoom } from '../types';
import { Action } from 'redux';
import { ActionType } from '../reducer';

export interface IUpdateRoomAction extends Action {
  room: IRoom;
}

export const updateRoom = (room: IRoom): IUpdateRoomAction => {
  return {
    type: ActionType.UPDATE_ROOM,
    room: room,
  };
};
