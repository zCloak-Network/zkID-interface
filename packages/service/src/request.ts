import { Config, ServerResponse } from './types';
import { RequestInternetError, RequestTimeoutError } from './utils';

// sort keys
export const serializeParams = (obj?: Record<string, any>): string => {
  if (!obj) {
    return '';
  }

  const keys: string[] = [];

  for (const key in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(key) && obj[key] !== undefined) {
      keys.push(String(key));
    }
  }

  keys.sort((l, r) => (l > r ? 1 : -1));

  return keys
    .map(
      (key) =>
        key +
        '=' +
        encodeURIComponent(
          Array.isArray(obj[key])
            ? `[${(obj[key] as any[]).map((v) => `"${v.toString()}"`).join(',')}]`
            : obj[key].toString()
        )
    )
    .join('&');
};

export const combineURL = (baseURL: string, ...restURL: any[]): string => {
  return !!restURL && restURL.length > 0
    ? baseURL.replace(/\/+$/, '') + '/' + restURL.map((url) => url.replace(/^\/+/, '')).join('/')
    : baseURL;
};

export const checkStatus = async (response: Response): Promise<Response> => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const res = await response.json();

    throw new RequestInternetError(res?.errorMessage ?? res?.message);
  }
};

const parseJSON = (response: Response) => {
  return response.json().catch(() => null);
};

export const combineConfig = (target: Config, source: Config): Config => {
  return {
    method: source.method || target.method || 'GET',
    headers: {
      ...target.headers,
      ...source.headers
    },
    params: { ...target.params, ...source.params },
    body: source.body,
    timeout: source.timeout ?? target.timeout ?? 300000,
    cache: source.cache ?? target.cache ?? undefined,
    credentials: source.credentials ?? target.credentials ?? undefined,
    mode: source.mode ?? target.mode ?? undefined
  };
};

export const wrapHeaders = (config: Config): Config => {
  const headers = { ...config.headers };

  if (!(config.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  return {
    ...config,
    headers
  };
};

const warpBody = (config: Config): Config => {
  if (config.method === 'GET') {
    return {
      ...config,
      body: null
    };
  }

  let body;

  if (config.body instanceof FormData) {
    return {
      ...config
    };
  }

  for (const key in config.headers) {
    if (key.toLocaleLowerCase() === 'content-type') {
      if (/application\/json/gi.test(config.headers[key])) {
        body = config.body ? JSON.stringify(config.body) : null;
      } else if (/application\/x-www-form-urlencoded/gi.test(config.headers[key])) {
        body = config.body ? serializeParams(body) : '';
      } else {
        body = config.body || null;
      }
    }
  }

  return {
    ...config,
    body
  };
};

export class Request {
  public baseURL = '';
  public config: Config = {};

  constructor(baseURL: string, config: Config = {}) {
    this.baseURL = baseURL;
    this.config = combineConfig(this.config, config);
  }

  public setConfig(config: Config): void {
    this.config = combineConfig(this.config, config);
  }

  public async request<T = ServerResponse<any>>(url: string, config: Config = {}): Promise<T> {
    config = combineConfig(this.config, config);
    config = wrapHeaders(config);
    config = warpBody(config);

    const paramStr = serializeParams(config.params);

    return new Promise((resolve, reject) => {
      let timeout = false;
      const abortId = setTimeout(() => {
        timeout = true;
        reject(new RequestTimeoutError());
      }, config.timeout);

      fetch(combineURL(this.baseURL, paramStr ? url + '?' + paramStr : url), {
        body: config.body,
        cache: config.cache,
        credentials: config.credentials,
        headers: config.headers,
        method: config.method,
        mode: config.mode
      })
        .then((res: any) => {
          if (timeout) {
            reject(new RequestTimeoutError());
          }

          return res;
        })
        .then(checkStatus)
        .then(parseJSON)
        .then(resolve)
        .catch((error) => {
          clearTimeout(abortId);
          reject(error);
        });
    });
  }

  public get<T>(url: string, config?: Config): Promise<T> {
    return this.request<T>(url, { ...config, method: 'GET' });
  }

  public post<T>(url: string, config?: Config): Promise<T> {
    return this.request<T>(url, { ...config, method: 'POST' });
  }

  public delete<T>(url: string, config?: Config): Promise<T> {
    return this.request<T>(url, { ...config, method: 'DELETE' });
  }

  public patch<T>(url: string, config?: Config): Promise<T> {
    return this.request<T>(url, { ...config, method: 'PATCH' });
  }

  public put<T>(url: string, config?: Config): Promise<T> {
    return this.request<T>(url, { ...config, method: 'PUT' });
  }
}
