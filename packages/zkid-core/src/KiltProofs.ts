import type { JsonRpcProvider } from '@ethersproject/providers';

import { BigNumberish } from '@ethersproject/bignumber';
import { BytesLike } from '@ethersproject/bytes';

import * as abis from './abis';
import { BaseContract } from './base';
import { callMethod } from './utils';

class KiltProofs extends BaseContract {
  constructor(address: string, provider: JsonRpcProvider, account?: string | null) {
    super(address, provider, abis.KiltProofs, account);
  }

  public addProof(
    kiltAccount: BytesLike,
    attester: BytesLike,
    cType: BytesLike,
    fieldNames: BigNumberish[],
    programHash: BytesLike,
    proofCid: string,
    rootHash: BytesLike,
    expResult: BigNumberish[]
  ) {
    return callMethod(this.contract, 'addProof', [
      kiltAccount,
      attester,
      cType,
      fieldNames,
      programHash,
      proofCid,
      rootHash,
      expResult
    ]);
  }
}

export { KiltProofs };
