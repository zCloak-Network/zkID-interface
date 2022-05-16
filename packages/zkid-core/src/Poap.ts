import type { BigNumber, BigNumberish } from '@ethersproject/bignumber';
import type { JsonRpcProvider, TransactionResponse } from '@ethersproject/providers';

import * as abis from './abis';
import { BaseContract } from './base';
import { callMethod } from './utils';

class Poap extends BaseContract {
  constructor(address: string, provider: JsonRpcProvider, account?: string | null) {
    super(address, provider, abis.Poap, account);
  }

  public getNftId(poapId: BigNumberish): Promise<BigNumber> {
    return this.contract.getNftId(poapId);
  }

  public totalBalanceOf(poapId: BigNumberish, owner: string): Promise<BigNumber> {
    return this.contract.totalBalanceOf(poapId, owner);
  }

  public claim(): Promise<TransactionResponse> {
    return callMethod(this.contract, 'claim');
  }
}

export { Poap };
