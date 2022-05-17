import { BigNumber } from '@ethersproject/bignumber';
import { Provider } from '@ethersproject/providers';
import { useEffect, useMemo, useState } from 'react';

import { Web3Query } from '@zcloak/web3-query';

export const useNativeBalance = (
  accounts?: string[] | null,
  provider?: Provider
): BigNumber[] | undefined => {
  const [balances, setBalances] = useState<BigNumber[]>();

  const web3Query = useMemo(() => (provider ? new Web3Query(provider) : null), [provider]);

  useEffect(() => {
    let unsub: (() => void) | undefined;

    if (accounts && web3Query) {
      const calls = accounts.map(web3Query.getEthBalance.bind(web3Query));

      Promise.all(calls)
        .then((calls) => {
          return web3Query.all<BigNumber[]>(calls, setBalances);
        })
        .then((_unsub) => (unsub = _unsub))
        .catch(console.error);
    }

    return () => {
      unsub?.();
    };
  }, [accounts, web3Query]);

  return balances;
};
