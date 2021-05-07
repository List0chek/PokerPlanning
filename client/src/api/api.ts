import { IRoom, IUser } from '../Store/types';
import authService from '../services/auth-service';

const baseUrl = 'http://localhost:52106/api';

export const createUserRequest = async (userName: string): Promise<{ user: IUser; token: string }> => {
  const response = await fetch(`${baseUrl}/user/create/?name=${userName}`, {
    mode: 'cors',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const token = response.headers.get('token');
  return {
    user: await response.json(),
    token: token === null ? '' : token,
  };
};

export const createRoomRequest = async (roomName: string, userId: string): Promise<IRoom> => {
  const response = await fetch(`${baseUrl}/room/create/?name=${roomName}&ownerId=${userId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      token: authService.get(),
    },
  });
  return await response.json();
};

export const addMemberToRoomRequest = async (
  roomId: string,
  userId: string,
  ownerId: string
): Promise<{ room: IRoom }> => {
  const response = await fetch(`${baseUrl}/room/addmember/?roomId=${roomId}&newUserId=${userId}&ownerId=${userId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      roomId,
      userId,
      ownerId,
    }),
  });
  return await response.json();
};
