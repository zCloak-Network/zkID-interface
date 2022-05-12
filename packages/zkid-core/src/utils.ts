import { getAddress } from '@ethersproject/address';

export function shortenAddress(address?: string | null, chars = 4): string {
  if (!address) {
    return '';
  }

  const parsed = getAddress(address);

  return `${parsed.slice(0, chars + 2)}...${parsed.slice(-chars)}`;
}

export function shortenHash(hash?: string | null, chars = 8): string {
  if (!hash) {
    return '';
  }

  return `${hash.slice(0, chars + 2)}...${hash.slice(-chars)}`;
}

export function assert(condition: unknown, message: string | (() => Error)): asserts condition {
  if (!condition) {
    throw typeof message === 'string' ? new Error(message) : message();
  }
}

export function documentReadyPromise<T>(creator: () => Promise<T>): Promise<T> {
  return new Promise((resolve): void => {
    if (document.readyState === 'complete') {
      resolve(creator());
    } else {
      window.addEventListener('load', () => resolve(creator()));
    }
  });
}
