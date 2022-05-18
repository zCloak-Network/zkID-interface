import type { Config, MintPoap, ServerResponse } from './types';

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
}

export const zkidApi = new ZkidApi();
