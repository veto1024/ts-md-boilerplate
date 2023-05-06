import { fetchWithTimeout, OptionsType } from '../utils';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export interface APICallType extends Omit<OptionsType, 'headers'> {
  /** The CsrfToken to send with this request. */
  CsrfToken?: string;
  /**he base URL (including protocol) to which to send this request */
  baseURL: string;
  /** Custom header object */
  customHeaders?: object;
  /** The URL slug to send to. */
  url: string;
}

export function apiCallBase({
  CsrfToken,
  url,
  method,
  body,
  credentials,
  baseURL,
  timeout,
  customHeaders
}: APICallType): Promise<Response> {
  const headers = new Headers({
    Host: baseURL,
    'Access-Control-Allow-Origin': baseURL,
    Origin: baseURL,
    'Content-Type': 'application/json',
    ...customHeaders
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

export type HTTPVerbs = 'POST' | 'GET' | 'PATCH' | 'PUT' | 'DELETE';

export type useAPIBaseType = {
  CsrfToken: string;
  baseURL: string;
  url: string;
  method?: HTTPVerbs;
  body?: number | string | object;
  errMsg?: string;
};

export type APIReturnType<T> = {
  /**
   * Indicates whether the API is currently still loading
   */
  loading: boolean;
  /**
   * Data returned by a successful Promise.json() call
   */
  data: T;
  /**
   * Error status HTTP code
   */
  errorStatus: number;
  /**
   * Error message to be returned. Given by user.
   */
  errorMessage: string;
  /**
   * Whether a status 204 has been returned
   */
  noContent: boolean;
  /**
   * Allows the API to be re-loaded
   */
  setLoading: Dispatch<SetStateAction<boolean>>;
};

export const useAPIBase = <T>({ CsrfToken, baseURL, url, method, body, errMsg }: useAPIBaseType) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<T | undefined>(undefined);
  const [errorStatus, setErrorStatus] = useState<number | undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [noContent, setNoContent] = useState<boolean | undefined>(undefined);

  const fetchAPI = () =>
    apiCallBase({
      CsrfToken,
      url,
      method: method || 'GET',
      body,
      credentials: 'include',
      timeout: 4000,
      baseURL
    })
      .then((res: Response) => {
        if (res.status === 200 || res.status === 201) {
          return res.json();
        }
        if (res.status === 204) {
          setNoContent(true);
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

  return { loading, data, errorStatus, errorMessage, noContent, setLoading } as APIReturnType<T>;
};
