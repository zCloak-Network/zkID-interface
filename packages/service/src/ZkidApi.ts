import type { Config, MintPoap, Proof, ProofProcess, ServerResponse } from './types';

import { ZKIDHOSTPREFIX } from '@zkid/app-config/constants';

import { combineConfig, Request } from './request';

export class ZkidApi extends Request {
  constructor(config: Config = {}) {
    super(
      ZKIDHOSTPREFIX,
      combineConfig(config, {
        mode: 'cors'
      })
    );
  }

  getMintPoap(params: { who: string }) {
    return this.get<ServerResponse<MintPoap | null>>('/mint-poap', { params });
  }

  proofProcess(params: { dataOwner: string; requestHash: string }) {
    return this.get<ServerResponse<ProofProcess>>('/proof/process', { params });
  }

  userProof(params: { dataOwner: string }) {
    return this.get<ServerResponse<Proof[]>>('/user/proof', { params });
  }
}

export const zkidApi = new ZkidApi();
