import type { BytesLike } from '@ethersproject/bytes';
import type { JsonRpcProvider } from '@ethersproject/providers';

import * as abis from './abis';
import { BaseContract } from './base';

class SimpleAggregator extends BaseContract {
  constructor(address: string, provider: JsonRpcProvider, account?: string | null) {
    super(address, provider, abis.SimpleAggregator, account);
  }

  public isFinished(cOwner: string, requestHash: BytesLike): Promise<boolean> {
    return this.contract.isFinished(cOwner, requestHash);
  }
}

export { SimpleAggregator };
