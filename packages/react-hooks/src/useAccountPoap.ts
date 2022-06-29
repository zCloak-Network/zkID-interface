import { useEffect, useState } from 'react';

import { useZkidApi } from '.';

export function useAccountPoap(account?: string | null) {
  const [nftId, setNftId] = useState<string>();

  const zkidApi = useZkidApi();

  useEffect(() => {
    if (account) {
      zkidApi?.getMintPoap({ who: account }).then(({ data }) => {
        if (data) {
          setNftId(data.nftId);
        } else {
          setNftId(undefined);
        }
      });
    }
  }, [account, zkidApi]);

  return nftId;
}
