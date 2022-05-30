import type { Activity, Config, MintPoap, Proof, ProofProcess, ServerResponse } from './types';

import { env } from '@zkid/app-config/constants/env';

import { combineConfig, Request } from './request';

export class ZkidApi extends Request {
  constructor(config: Config = {}) {
    super(
      env.ZKID_SERVICE,
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

  userActivities(params: { dataOwner: string }) {
    return this.get<ServerResponse<Activity[]>>('/user/activies', { params });
  }

  rootHashUser(rootHash: string) {
    return this.get<ServerResponse<{ address: string | null }>>(`/credential/${rootHash}/user`);
  }
}

export const zkidApi = new ZkidApi();
