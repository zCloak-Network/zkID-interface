import type { CTypeSchemaWithoutId, IClaim, ICTypeSchema } from '@kiltprotocol/sdk-js';

import { Claim, CType } from '@kiltprotocol/sdk-js';
import { useMemo } from 'react';

export function useClaim(
  ctype: CType | ICTypeSchema | CTypeSchemaWithoutId,
  contents?: IClaim['contents'] | null,
  claimOwner?: string
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
