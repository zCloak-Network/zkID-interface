import type { BigNumberish } from '@ethersproject/bignumber';
import type { BytesLike } from '@ethersproject/bytes';
import type { JsonRpcProvider, TransactionResponse } from '@ethersproject/providers';

import * as abis from './abis';
import { BaseContract } from './base';
import { callMethod } from './utils';

class KiltProofs extends BaseContract {
  constructor(address: string, provider: JsonRpcProvider, account?: string | null) {
    super(address, provider, abis.KiltProofs, account);
  }

  public singleProofExists(who: string, requestHash: BytesLike): Promise<boolean>;
  public singleProofExists(
    who: string,
    requestHash: BytesLike,
    callback: (exists: boolean) => void
  ): Promise<() => void>;

  public singleProofExists(
    who: string,
    requestHash: BytesLike,
    callback?: (exists: boolean) => void
  ): Promise<boolean> | Promise<() => void> {
    if (callback) {
      return this.web3Query.one<boolean>(
        this.multicallContract.single_proof_exists(who, requestHash),
        callback
      );
    } else {
      return this.web3Query.one<boolean>(
        this.multicallContract.single_proof_exists(who, requestHash)
      );
    }
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
  ): Promise<TransactionResponse> {
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
