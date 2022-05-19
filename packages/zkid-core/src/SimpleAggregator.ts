import type { BytesLike } from '@ethersproject/bytes';
import type { JsonRpcProvider } from '@ethersproject/providers';

import * as abis from './abis';
import { BaseContract } from './base';

class SimpleAggregator extends BaseContract {
  constructor(address: string, provider: JsonRpcProvider, account?: string | null) {
    super(address, provider, abis.SimpleAggregator, account);
  }

  public isFinished(cOwner: string, requestHash: BytesLike): Promise<boolean>;
  public isFinished(
    cOwner: string,
    requestHash: BytesLike,
    callback: (exists: boolean) => void
  ): Promise<() => void>;

  public isFinished(
    cOwner: string,
    requestHash: BytesLike,
    callback?: (exists: boolean) => void
  ): Promise<boolean> | Promise<() => void> {
    if (callback) {
      return this.web3Query.one<boolean>(
        this.multicallContract.isFinished(cOwner, requestHash),
        callback
      );
    } else {
      return this.web3Query.one<boolean>(this.multicallContract.isFinished(cOwner, requestHash));
    }
  }
}

export { SimpleAggregator };
