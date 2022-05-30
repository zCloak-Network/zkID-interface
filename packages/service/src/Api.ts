import type { AttestationStatus, Config, FaucetStatus, ServerResponse } from './types';

import { env } from '@zkid/app-config/constants/env';

import { combineConfig, Request } from './request';

export class CredentialApi extends Request {
  constructor(config: Config = {}) {
    super(
      env.CREDENTIAL_SERVICE,
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

  getAttestation(params: { senderKeyId: string; receiverKeyId: string }) {
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
    return this.get<ServerResponse<{ status: FaucetStatus }>>('/user/faucet-status', { params });
  }
}

export const credentialApi = new CredentialApi();
