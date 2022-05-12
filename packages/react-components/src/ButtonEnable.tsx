import { LoadingButton, LoadingButtonProps } from '@mui/lab';
import { UnsupportedChainIdError } from '@web3-react/core';
import React, { useCallback } from 'react';

import { switchNetwork, useConnectors, useWallet } from '@zcloak/react-wallet';
import useAuth from '@zcloak/react-wallet/useAuth';

import { MOONBASE } from '@zkid/app-config/endpoints';

const ButtonEnable: React.FC<LoadingButtonProps> = ({ children, ...props }) => {
  const { login } = useAuth();
  const { injected } = useConnectors();
  const { active, error } = useWallet();

  const onClick = useCallback(() => {
    login(injected);
  }, [injected, login]);

  const onSwitchNetwork = useCallback(() => {
    switchNetwork(MOONBASE.chainId, {
      chainId: MOONBASE.chainId,
      chainName: MOONBASE.name,
      nativeCurrency: {
        name: MOONBASE.currencySymbol,
        symbol: MOONBASE.currencySymbol,
        decimals: MOONBASE.decimals
      },
      rpcUrls: MOONBASE.rpcs,
      blockExplorerUrls: [MOONBASE.explorer]
    });
  }, []);

  return (
    <>
      {active ? (
        <LoadingButton {...props}>{children}</LoadingButton>
      ) : error instanceof UnsupportedChainIdError ? (
        <LoadingButton {...props} onClick={onSwitchNetwork}>
          Switch network
        </LoadingButton>
      ) : (
        <LoadingButton {...props} onClick={onClick}>
          {'Connect wallet'}
        </LoadingButton>
      )}
    </>
  );
};

export default React.memo<typeof ButtonEnable>(ButtonEnable);
