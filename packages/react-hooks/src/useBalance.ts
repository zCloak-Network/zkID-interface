import { BigNumber } from '@ethersproject/bignumber';
import { Provider } from '@ethersproject/providers';
import { useEffect, useMemo, useState } from 'react';

import { useWallet } from '@zcloak/react-wallet';
import { Web3Query } from '@zcloak/web3-query';

export const useNativeBalances = (
  accounts?: string[] | null,
  _provider?: Provider
): BigNumber[] | undefined => {
  const { provider } = useWallet();
  const [balances, setBalances] = useState<BigNumber[]>();

  const theProvider = useMemo(() => provider || _provider, [provider, _provider]);

  const web3Query = useMemo(() => (theProvider ? new Web3Query(theProvider) : null), [theProvider]);

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

export const useNativeBalance = (account?: string | null, provider?: Provider) => {
  const accounts = useMemo(() => (account ? [account] : null), [account]);
  const balances = useNativeBalances(accounts, provider);

  return useMemo(() => {
    if (balances && balances.length > 0) {
      return balances[0];
    } else {
      return null;
    }
  }, [balances]);
};
