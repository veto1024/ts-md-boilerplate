import fetchWithTimeout from '../utils/FetchWithTimeout';

export const BASE_URL = `${process.env.REACT_APP_HTTP_PROTOCOL}://${process.env.REACT_APP_API_URL}`;

type optionsType= {
    timeout: number,
    method: string,
    headers: object,
    credentials?: string,
    body?:any
    'X-Csrf-Token'?:string
}
export function apiCall(CsrfToken:string, url:string, method = 'GET', body: null|string|object = null, credentials='include' ):Promise<any> {

    let options:optionsType = {
        timeout: 4000,
        method,
        headers: {
            Host: `${BASE_URL}`,
            'Access-Control-Allow-Origin': `${BASE_URL}`,
            Origin: `${BASE_URL}`,
            'Content-Type': 'application/json'
        },
        credentials
    }
    if (body) {
        options = {...options, body}
    }
    if (CsrfToken) {
        options = { ...options,
            'X-Csrf-Token': CsrfToken
        }
    }
    return fetchWithTimeout(url, options);
}