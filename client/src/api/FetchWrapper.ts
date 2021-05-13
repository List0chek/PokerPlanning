async function http(method: string, url: string, headers?: HeadersInit): Promise<any> {
  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  });
  try {
    const responseJSON = await response.json();
    if (response.status === 200) {
      return responseJSON;
    } else {
      throw new Error(responseJSON);
    }
  } catch (error: any) {
    console.log(error);
    return;
  }
}

export async function get(url: string, headers?: HeadersInit): Promise<any> {
  return await http('GET', url, headers);
}

export async function post(url: string, headers?: HeadersInit): Promise<any> {
  return await http('POST', url, headers);
}
