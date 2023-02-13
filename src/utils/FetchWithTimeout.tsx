export type OptionsType = {
  timeout: number;
  method: 'GET' | 'PUT' | 'POST' | 'OPTIONS';
  headers: Headers;
  credentials: RequestCredentials | undefined;
  body?: string | object | number | undefined;
};
export default async function fetchWithTimeout(resource: RequestInfo | URL, options: OptionsType): Promise<Response> {
  const { timeout = 4000 } = options;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  const response = await fetch(resource, {
    ...options,
    body: JSON.stringify(options.body),
    signal: controller.signal
  });
  clearTimeout(id);
  return response;
}
