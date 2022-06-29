import type { CTypeSchemaWithoutId, IClaim, ICTypeSchema } from '@kiltprotocol/sdk-js';
import type { DidUri } from '@kiltprotocol/types';

import { Claim, CType } from '@kiltprotocol/sdk-js';
import { useMemo } from 'react';

export function useClaim(
  ctype: CType | ICTypeSchema | CTypeSchemaWithoutId,
  contents?: IClaim['contents'] | null,
  claimOwner?: DidUri
) {
  return useMemo(() => {
    return contents && claimOwner
      ? Claim.fromCTypeAndClaimContents(
          ctype instanceof CType ? ctype : CType.fromSchema(ctype),
          contents,
          claimOwner
        )
      : undefined;
  }, [claimOwner, contents, ctype]);
}
