import { IDiscussion, IRoom, IUser } from '../Store/types';
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

export const getUserRequest = async (): Promise<IUser> => {
  const response = await fetch(`${baseUrl}/user/get`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      token: authService.get(),
    },
  });
  return await response.json();
};

export const deleteUserRequest = async () => {
  const response = await fetch(`${baseUrl}/user/delete`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      token: authService.get(),
    },
  });
  authService.set('');
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

export const addMemberToRoomRequest = async (roomId: string, userId: string): Promise<IRoom> => {
  const response = await fetch(`${baseUrl}/room/addmember/?roomId=${roomId}&newUserId=${userId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await response.json();
};

export const getRoomInfoRequest = async (roomId: string, userId: string): Promise<IRoom> => {
  const response = await fetch(`${baseUrl}/room/getroominfo/?roomId=${roomId}&userId=${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await response.json();
};

export const createDiscussionRequest = async (
  roomId: string,
  topicName: string,
  hostId: string
): Promise<IDiscussion> => {
  const response = await fetch(`${baseUrl}/discussion/create/?roomId=${roomId}&topic=${topicName}&hostId=${hostId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      hostToken: authService.get(),
    },
  });
  return await response.json();
};

export const setVoteRequest = async (discussionId: string, userId: string, cardId: string) => {
  const response = await fetch(
    `${baseUrl}/discussion/setvote/?discussionId=${discussionId}&userId=${userId}&cardId=${cardId}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
};

export const closeDiscussionRequest = async (
  roomId: string,
  discussionId: string,
  hostId: string
): Promise<IDiscussion> => {
  const response = await fetch(
    `${baseUrl}/discussion/close/?roomId=${roomId}&discussionId=${discussionId}&hostId=${hostId}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return await response.json();
};

export const deleteDiscussionRequest = async (roomId: string, discussionId: string, hostId: string) => {
  const response = await fetch(
    `${baseUrl}/discussion/delete/?roomId=${roomId}&discussionId=${discussionId}&hostId=${hostId}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
};

export const getDiscussionInfoRequest = async (discussionId: string, userId: string): Promise<IDiscussion> => {
  const response = await fetch(`${baseUrl}/discussion/getresults/?discussionId=${discussionId}&userId=${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await response.json();
};
