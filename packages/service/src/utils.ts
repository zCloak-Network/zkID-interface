export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const toFormData = (data: Record<string, any>): FormData => {
  const formData = new FormData();

  Object.keys(data).forEach((key) => {
    formData.append(key, data[key]);
  });

  return formData;
};

export class RequestTimeoutError extends Error {
  constructor() {
    super('Request timeout, Please check your network');
  }
}

export class RequestInternetError extends Error {
  constructor(message?: string) {
    super(message ?? 'Internet error, Please check your network');
  }
}
