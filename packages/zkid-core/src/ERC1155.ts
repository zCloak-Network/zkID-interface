import type { BigNumber, BigNumberish } from '@ethersproject/bignumber';
import type { JsonRpcProvider, TransactionResponse } from '@ethersproject/providers';

import { BytesLike, hexValue } from '@ethersproject/bytes';

import * as abis from './abis';
import { BaseContract } from './base';
import { callMethod } from './utils';

class ERC1155 extends BaseContract {
  constructor(
    address: string,
    provider: JsonRpcProvider,
    abi = abis.ERC1155,
    account?: string | null
  ) {
    super(address, provider, abi, account);
  }

  uri(tokenId: BigNumberish): Promise<string> {
    return this.contract.uri(tokenId);
  }

  balanceOf(account: string, id: BigNumberish): Promise<BigNumber> {
    return this.contract.balanceOf(account, id);
  }

  isApprovedForAll(account: string, operator: string): Promise<boolean> {
    return this.contract.isApprovedForAll(account, operator);
  }

  setApprovalForAll(operator: string, approved: boolean): Promise<TransactionResponse> {
    return callMethod(this.contract, 'setApprovalForAll', [operator, approved]);
  }

  safeTransferFrom(
    from: string,
    to: string,
    id: BigNumberish,
    amount: BigNumberish,
    data: BytesLike = hexValue([])
  ): Promise<TransactionResponse> {
    return callMethod(this.contract, 'safeTransferFrom', [from, to, id, amount, data]);
  }
}

export { ERC1155 };
