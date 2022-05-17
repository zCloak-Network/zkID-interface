import { LoadingButton, LoadingButtonProps } from '@mui/lab';
import { UnsupportedChainIdError } from '@web3-react/core';
import React, { useCallback } from 'react';

import { switchNetwork, useWallet } from '@zcloak/react-wallet';

import { MOONBASE } from '@zkid/app-config/endpoints';
import { useToggle } from '@zkid/react-hooks';

import WalletModal from './WalletModal';

const ButtonEnable: React.FC<LoadingButtonProps> = ({ children, ...props }) => {
  const { active, error } = useWallet();
  const [open, toggle] = useToggle();
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
        <LoadingButton {...props} onClick={toggle}>
          {'Connect wallet'}
        </LoadingButton>
      )}
      <WalletModal onClose={toggle} open={open} />
    </>
  );
};

export default React.memo<typeof ButtonEnable>(ButtonEnable);
