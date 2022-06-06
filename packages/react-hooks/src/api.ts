import { CredentialApi, ZkidApi } from '@zcloak/service';

import { env } from '@zkid/app-config/constants/env';

export const zkidApi = new ZkidApi(env.ZKID_SERVICE);
export const credentialApi = new CredentialApi(env.CREDENTIAL_SERVICE);
