
import React from 'react';

import { WalletProvider } from '@zcloak/react-wallet/WalletProvider';

import { MOONBASE } from '@zkid/app-config/endpoints';

const Root: React.FC = () => {
  return <WalletProvider supportedChainIds={[MOONBASE.chainId]}>
    Root
  </WalletProvider>;
};

export default Root;
