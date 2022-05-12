import type { AttestationStatus, Config, ServerResponse } from './types';

import { HOSTPREFIX } from '@zkid/app-config/constants';

import { combineConfig, Request } from './request';

export class CredentialApi extends Request {
  constructor(config: Config = {}) {
    super(
      HOSTPREFIX,
      combineConfig(config, {
        mode: 'cors'
      })
    );
  }

  submitClaim(body: {
    receivedAt?: number;
    ciphertext: string;
    nonce: string;
    senderKeyId: string;
    receiverKeyId: string;
  }) {
    // eslint-disable-next-line @typescript-eslint/ban-types
    return this.post<ServerResponse<{}>>('/admin-attester/submit-claim', {
      body: { ...body }
    });
  }

  getAttestationStatus(params: { senderKeyId: string }) {
    return this.get<ServerResponse<{ attestationStatus: AttestationStatus }>>(
      '/admin-attester/attestation-status',
      {
        params
      }
    );
  }

  getAttestation(params: { receiverKeyId: string }) {
    return this.get<
      ServerResponse<
        {
          ciphertext: string;
          nonce: string;
          receiverKeyId: string;
          senderKeyId: string;
          __v: number;
          _id: string;
        }[]
      >
    >('/attestation/one', { params });
  }

  faucet(params: { address: string }) {
    return this.get<ServerResponse<any>>('/user/faucet', { params });
  }

  faucetStatus(params: { address: string }) {
    return this.get<ServerResponse<{ status: number }>>('/user/faucet-status', { params });
  }
}

export const credentialApi = new CredentialApi();
