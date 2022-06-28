import { CredentialApi } from '@zcloak/service';

import { env } from '@zkid/app-config/constants/env';

export const credentialApi = new CredentialApi(env.CREDENTIAL_SERVICE);
