import { BigNumber } from 'ethers';
import React, { createContext } from 'react';

import { useWallet } from '@zcloak/react-wallet';

import { useAccountPoap, useNativeBalance } from '@zkid/react-hooks';

interface BalancesState {
  balance?: BigNumber | null;
  poapId?: string;
}

export const BalancesContext = createContext({} as BalancesState);

const BalancesProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const { account } = useWallet();

  const balance = useNativeBalance(account);
  const poapId = useAccountPoap(account);

  return (
    <BalancesContext.Provider value={{ balance, poapId }}>{children}</BalancesContext.Provider>
  );
};

export default React.memo<typeof BalancesProvider>(BalancesProvider);
