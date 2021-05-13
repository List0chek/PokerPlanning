import { IError, IRoom, IUser } from '../store/Types';
import { post, get } from './FetchWrapper';

const baseUrl = 'http://localhost:52106/api';

export const createUserRequest = async (userName: string): Promise<{ user: IUser; token: string } | null> => {
  return await post(`${baseUrl}/user/create/?name=${userName}`);
};

/*export const getUserRequest = async (): Promise<{ user: IUser | null; error: IError | null }> => {
  const response = await fetch(`${baseUrl}/user/get`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      token: authService.get(),
    },
  });
  return {
    user: response.ok ? await response.json() : null,
    error: response.ok ? null : await response.json(),
  };
};*/

export const getUserRequest = async (roomId: string): Promise<IUser | null> => {
  return await get(`${baseUrl}/user/get`, roomId);
};

export const deleteUserRequest = async (): Promise<null> => {
  return await get(`${baseUrl}/user/delete`);
};

export const createRoomRequest = async (roomName: string, userId: string): Promise<IRoom | null> => {
  return await post(`${baseUrl}/room/create/?name=${roomName}&ownerId=${userId}`);
};

export const addMemberToRoomRequest = async (roomId: string, userId: string): Promise<IRoom | null> => {
  return await post(`${baseUrl}/room/addmember/?roomId=${roomId}&newUserId=${userId}`);
};

export const getRoomInfoRequest = async (roomId: string, userId: string): Promise<IRoom | null> => {
  return await get(`${baseUrl}/room/getroominfo/?roomId=${roomId}&userId=${userId}`);
};

export const createDiscussionRequest = async (
  roomId: string,
  topicName: string,
  hostId: string
): Promise<IRoom | null> => {
  return await post(`${baseUrl}/discussion/create/?roomId=${roomId}&topic=${topicName}&hostId=${hostId}`);
};

export const setVoteRequest = async (discussionId: string, userId: string, cardId: string): Promise<IRoom | null> => {
  return await post(`${baseUrl}/discussion/setvote/?discussionId=${discussionId}&userId=${userId}&cardId=${cardId}`);
};

export const closeDiscussionRequest = async (
  roomId: string,
  discussionId: string,
  hostId: string
): Promise<IRoom | null> => {
  return await post(`${baseUrl}/discussion/close/?roomId=${roomId}&discussionId=${discussionId}&hostId=${hostId}`);
};

export const deleteDiscussionRequest = async (
  roomId: string,
  discussionId: string,
  hostId: string
): Promise<IRoom | null> => {
  return await post(`${baseUrl}/discussion/delete/?roomId=${roomId}&discussionId=${discussionId}&hostId=${hostId}`);
};
