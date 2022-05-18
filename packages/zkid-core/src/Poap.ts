import type { BigNumber, BigNumberish } from '@ethersproject/bignumber';
import type {
  JsonRpcProvider,
  TransactionReceipt,
  TransactionResponse
} from '@ethersproject/providers';

import * as abis from './abis';
import { ERC1155 } from './ERC1155';
import { callMethod } from './utils';

class Poap extends ERC1155 {
  constructor(address: string, provider: JsonRpcProvider, account?: string | null) {
    super(address, provider, abis.Poap, account);
  }

  public getNftId(poapId: BigNumberish): Promise<BigNumber> {
    return this.contract.getNftId(poapId);
  }

  public totalBalanceOf(poapId: BigNumberish, owner: string): Promise<BigNumber> {
    return this.contract.totalBalanceOf(poapId, owner);
  }

  public async getMintLog(txIdOrReceipt: string | TransactionReceipt) {
    if (typeof txIdOrReceipt === 'string') {
      txIdOrReceipt = await this.provider.getTransactionReceipt(txIdOrReceipt);
    }

    const mintLog = txIdOrReceipt.logs
      .map(this.contract.interface.parseLog.bind(this.contract.interface))
      .find(({ name }) => name === 'MintPoap');

    return mintLog
      ? {
          poapId: mintLog.args.poapId as BigNumber,
          who: mintLog.args.who as string,
          nftId: mintLog.args.nftId as BigNumber
        }
      : null;
  }

  public claim(): Promise<TransactionResponse> {
    return callMethod(this.contract, 'claim');
  }
}

export { Poap };
