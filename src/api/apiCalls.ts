import fetchWithTimeout from '../utils/FetchWithTimeout';

export const BASE_URL = `${process.env.REACT_APP_API_HTTP_PROTOCOL}://${process.env.REACT_APP_API_URL}`;

type optionsType = {
  timeout: number;
  method: string;
  headers: Headers;
  credentials?: string;
  body?: string | number | object;
  'X-Csrf-Token'?: string;
};

export default function apiCall(
  CsrfToken: string,
  url: string,
  method = 'GET',
  body: null | string | object = null,
  credentials = 'include'
): Promise<Response> {
  const headers = new Headers({
    Host: `${BASE_URL}`,
    'Access-Control-Allow-Origin': `${BASE_URL}`,
    Origin: `${BASE_URL}`,
    'Content-Type': 'application/json'
  });
  if (CsrfToken) {
    headers.set('X-Csrf-Token', CsrfToken);
  }

  let options: optionsType = {
    timeout: parseInt(process.env.REACT_APP_FETCH_TIMEOUT || '4000', 10),
    method,
    headers,
    credentials
  };

  if (body) {
    if (typeof body === 'object') {
      options = { ...options, body: JSON.stringify(body) };
    } else {
      options = { ...options, body };
    }
  }
  return fetchWithTimeout(url, options);
}
