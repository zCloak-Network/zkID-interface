import { BigNumber } from 'ethers';
import React, { createContext, useEffect, useState } from 'react';

import { useWallet } from '@zcloak/react-wallet';

import { useAccountPoap, useNativeBalance } from '@zkid/react-hooks';

interface BalancesState {
  balance?: BigNumber | null;
  poapId?: string;
  setPoapId: (poapId: string) => void;
}

export const BalancesContext = createContext({} as BalancesState);

const BalancesProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const { account } = useWallet();
  const [poapId, setPoapId] = useState<string>();

  const balance = useNativeBalance(account);
  const _poapId = useAccountPoap(account);

  useEffect(() => {
    setPoapId(_poapId);
  }, [_poapId]);

  return (
    <BalancesContext.Provider value={{ balance, poapId, setPoapId }}>
      {children}
    </BalancesContext.Provider>
  );
};

export default React.memo<typeof BalancesProvider>(BalancesProvider);
