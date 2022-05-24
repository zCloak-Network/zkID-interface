import { UnsupportedChainIdError } from '@web3-react/core';
import React, { useCallback } from 'react';

import { switchNetwork, useWallet } from '@zcloak/react-wallet';

import { MOONBASE } from '@zkid/app-config/endpoints';
import { useToggle } from '@zkid/react-hooks';

import ButtonWithError, { Props as ButtonWithErrorProps } from './ButtonWithError';
import WalletModal from './WalletModal';

interface Props extends ButtonWithErrorProps {
  enableText?: string;
}

const ButtonEnable: React.FC<Props> = ({ children, enableText, ...props }) => {
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
        <ButtonWithError {...props}>{children}</ButtonWithError>
      ) : error instanceof UnsupportedChainIdError ? (
        <ButtonWithError {...props} onClick={onSwitchNetwork}>
          Switch network
        </ButtonWithError>
      ) : (
        <ButtonWithError {...props} onClick={toggle}>
          {enableText ?? 'Connect wallet'}
        </ButtonWithError>
      )}
      <WalletModal onClose={toggle} open={open} />
    </>
  );
};

export default React.memo<typeof ButtonEnable>(ButtonEnable);
