import type { JsonRpcProvider } from '@ethersproject/providers';
import type { Web3ReactContextInterface } from '@web3-react/core/dist/types';

import { useWeb3React, Web3ReactProvider } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import React, { createContext, useContext, useMemo } from 'react';

import getLibrary from './getLibrary';

interface State {
  injected: InjectedConnector;
  walletConnect: WalletConnectConnector;
}

interface Props {
  supportedChainIds: number[];
}

export const WalletContext = createContext<State>({} as State);

const WalletProvider: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  supportedChainIds
}) => {
  const injected = useMemo(
    () =>
      new InjectedConnector({
        supportedChainIds
      }),
    [supportedChainIds]
  );

  const walletConnect = useMemo(
    () =>
      new WalletConnectConnector({
        supportedChainIds
      }),
    [supportedChainIds]
  );

  return (
    <WalletContext.Provider value={{ injected, walletConnect }}>
      <Web3ReactProvider getLibrary={getLibrary}>{children}</Web3ReactProvider>
    </WalletContext.Provider>
  );
};

const useWallet = (): Web3ReactContextInterface<JsonRpcProvider> => {
  const wallet = useWeb3React();

  return wallet;
};

const useConnectors = () => {
  return useContext(WalletContext);
};

export { WalletProvider, useConnectors, useWallet };
