export type MethodType = 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT';

export interface Config {
  method?: MethodType;
  headers?: Record<string, string>;
  params?: Record<string, any>;
  body?: any;
  timeout?: number;
  cache?: 'default' | 'no-store' | 'reload' | 'no-cache' | 'force-cache' | 'only-if-cached';
  credentials?: 'omit' | 'same-origin' | 'include';
  mode?: 'navigate' | 'same-origin' | 'no-cors' | 'cors';
}

// Api response
export type ServerResponse<T> = {
  code: number;
  data: T;
};

export enum AttestationStatus {
  notAttested = 1,
  attesting = 2,
  attested = 3
}
