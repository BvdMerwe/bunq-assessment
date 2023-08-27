import Environment from './environment.ts';

interface JsonResponse {
  [key: string]: any;
}

interface ApiClientSettings {
  authenticated: boolean;
  baseUrl?: string;
  body?: JsonResponse;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: JsonResponse;
  path: string;
  queryParams?: JsonResponse;
}
export default function ApiClient(settings: ApiClientSettings) {
  const fetchOptions = {};
  const execute: () => Promise<JsonResponse> = async () =>
    fetch(`${settings.baseUrl ?? Environment.apiBaseUrl}${settings.path}`, {
      ...fetchOptions,
      method: settings.method ?? 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(settings.authenticated && { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }),
        ...settings.headers,
      },
      ...(settings.body && { body: JSON.stringify(settings.body) }),
    })
      .then((response) => (response.ok ? response.json() : Promise.reject(response)))
      .then((data) => data)
      .catch(async (err) => {
        const error = await err.json();
        console.error(error);
        if (err.status === 401 && settings.authenticated) {
          // try refresh token
          const result = await fetch(`${Environment.authApiBaseUrl}/api/auth/refresh`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refreshToken: localStorage.getItem('refreshToken') }),
          });

          if (result.ok) {
            const { accessToken, refreshToken } = await result.json();
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            return execute();
          }
          // refresh token expired
          window.location.href = '/logout';
        }
        // throw err;
        return Promise.reject(error);
      });

  return { execute };
}
