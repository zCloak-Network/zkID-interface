import { AbstractConnector } from '@web3-react/abstract-connector';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { useCallback } from 'react';

const useAuth = () => {
  const { activate, deactivate } = useWeb3React();

  const login = useCallback(
    (connector: AbstractConnector) => {
      activate(connector, undefined, true).catch((error) => {
        if (error instanceof UnsupportedChainIdError) {
          activate(connector);
        }
      });
    },
    [activate]
  );

  const logout = useCallback(() => {
    deactivate();
  }, [deactivate]);

  return { login, logout };
};

export default useAuth;
