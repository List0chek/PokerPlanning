import authService from '../services/AuthService';
import history from '../services/HistoryService';
import { RoutePath } from '../components/Routes';

async function http(request: string, config: RequestInit, id?: string): Promise<any | null> {
  const response = await fetch(request, config);

  if (request.includes('/user/delete')) {
    localStorage.clear();
    return null;
  }
  if (request.includes('/user/create/')) {
    const token = response.headers.get('token');
    return {
      user: await response.json(),
      token: token === null ? '' : token,
    };
  }
  if (response.status === 500) {
    history.push(`${RoutePath.INVITE}/${id}`);
    return null;
  } else {
    return await response.json();
  }
}

export async function get(path: string, id?: string): Promise<any | null> {
  const initWithoutToken = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const initWithToken = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      token: authService.get(),
    },
  };
  if (path.includes('/user/get') || path.includes('/user/delete')) {
    return await http(path, initWithToken, id);
  } else return await http(path, initWithoutToken, id);
}

export async function post(path: string, id?: string): Promise<any | null> {
  const initWithoutToken = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const initWithToken = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      token: authService.get(),
    },
  };
  if (path.includes('/room/create/') || path.includes('/discussion/create/')) {
    return await http(path, initWithToken, id);
  } else return await http(path, initWithoutToken, id);
}
