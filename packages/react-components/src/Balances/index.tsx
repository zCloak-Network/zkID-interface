import { BigNumber } from 'ethers';
import { parseEther } from 'ethers/lib/utils';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

import { useWallet } from '@zcloak/react-wallet';

import { useAccountPoap, useInterval, useNativeBalance } from '@zkid/react-hooks';
import { credentialApi } from '@zkid/service';
import { FaucetStatus } from '@zkid/service/types';

import { NotificationContext } from '../Notification';

interface BalancesState {
  balance?: BigNumber | null;
  poapId?: string;
  faucetStatus?: FaucetStatus;
  setPoapId: (poapId: string) => void;
  getToken: (throwError?: boolean) => Promise<void>;
}

export const BalancesContext = createContext({} as BalancesState);

const BalancesProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const { notifyError } = useContext(NotificationContext);
  const { account } = useWallet();
  const [poapId, setPoapId] = useState<string>();
  const [faucetStatus, setFaucetStatus] = useState<FaucetStatus>();

  const balance = useNativeBalance(account);
  const _poapId = useAccountPoap(account);

  const listenFaucetStatus = useCallback(() => {
    if (account && (faucetStatus === FaucetStatus.Fauceting || faucetStatus === undefined)) {
      credentialApi.faucetStatus({ address: account }).then(({ data: { status } }) => {
        if (status === FaucetStatus.Fauceted) {
          balance?.gt('0') && setFaucetStatus(FaucetStatus.Fauceted);
        } else {
          setFaucetStatus(status);
        }
      });
    }
  }, [account, balance, faucetStatus]);

  useEffect(() => {
    setFaucetStatus(undefined);
  }, [account]);

  useInterval(listenFaucetStatus, 6000);

  const getToken = useCallback(
    async (throwError = false) => {
      if (account && faucetStatus === FaucetStatus.NotFaucet && balance?.lt(parseEther('0.001'))) {
        const { code } = await credentialApi.faucet({ address: account });

        if (code !== 200) {
          throwError && notifyError(new Error('Faucet failed'));
        } else {
          setFaucetStatus(FaucetStatus.Fauceting);
        }
      }
    },
    [account, balance, faucetStatus, notifyError]
  );

  useEffect(() => {
    setPoapId(_poapId);
  }, [_poapId]);

  return (
    <BalancesContext.Provider value={{ balance, faucetStatus, poapId, setPoapId, getToken }}>
      {children}
    </BalancesContext.Provider>
  );
};

export default React.memo<typeof BalancesProvider>(BalancesProvider);
