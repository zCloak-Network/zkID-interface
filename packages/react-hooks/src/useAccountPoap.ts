import { useEffect, useState } from 'react';

import { zkidApi } from '@zkid/react-hooks/api';

export function useAccountPoap(account?: string | null) {
  const [nftId, setNftId] = useState<string>();

  useEffect(() => {
    if (account) {
      zkidApi.getMintPoap({ who: account }).then(({ data }) => {
        if (data) {
          setNftId(data.nftId);
        } else {
          setNftId(undefined);
        }
      });
    }
  }, [account]);

  return nftId;
}
