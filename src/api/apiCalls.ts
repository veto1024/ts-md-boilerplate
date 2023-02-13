import fetchWithTimeout, { OptionsType } from '../utils/FetchWithTimeout';
import { useEffect, useState } from 'react';

export interface APICallType extends Omit<OptionsType, 'headers'> {
  url: string;
  CsrfToken?: string;
  baseURL: string;
  contentType: string;
}

export function apiCallBase({ CsrfToken, url, method, body, credentials, baseURL, contentType, timeout }: APICallType): Promise<Response> {
  const headers = new Headers({
    Host: baseURL,
    'Access-Control-Allow-Origin': baseURL,
    Origin: baseURL,
    'Content-Type': contentType || 'application/json'
  });
  if (CsrfToken) {
    headers.set('X-Csrf-Token', CsrfToken);
  }

  let options: OptionsType = {
    timeout: timeout,
    method,
    headers,
    credentials,
    body
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

export const useAPIBase = <T, _>(CsrfToken: string, baseURL: string, url: string, body = null, method = 'GET', errMsg = null) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<T | undefined>(undefined);
  const [errorStatus, setErrorStatus] = useState<number | undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const fetchAPI = () =>
    apiCallBase({
      CsrfToken,
      url,
      method: 'GET',
      body: {},
      credentials: 'include',
      contentType: 'application/json',
      timeout: 4000,
      baseURL
    })
      .then((res: Response) => {
        if (res.status === 200 || res.status === 201) {
          return res.json();
        }
        setErrorMessage(errMsg || 'An error has occurred');
        setErrorStatus(res.status);
      })
      .then((json: T) => {
        setData(json);
      })
      .finally(() => setLoading(false));

  useEffect(() => {
    fetchAPI();
  }, []);

  return [loading, data, errorStatus, errorMessage];
};
