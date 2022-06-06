import { Button, Dialog, DialogContent, styled } from '@mui/material';
import React, { useCallback, useMemo } from 'react';

import { AbstractWallet, MetaMaskWallet, useWallet } from '@zcloak/react-wallet';

import { metaMaskWallet, walletConnectWallet } from '@zkid/app-config/wallets';

import DialogHeader from './DialogHeader';

interface Props {
  open: boolean;
  onClose?: () => void;
}

const Cell = styled(Button)`
  padding: 10px 0 !important;
  color: #333333;

  img {
    width: 32px;
    margin-right: 16px;
  }
`;

const WalletCell: React.FC<{ wallet: AbstractWallet; onClose?: () => void }> = ({
  onClose,
  wallet
}) => {
  const { connect } = useWallet();

  const handleConnect = useCallback(() => {
    connect(wallet);
    onClose?.();
  }, [connect, onClose, wallet]);

  return wallet instanceof MetaMaskWallet ? (
    <Cell
      fullWidth
      onClick={handleConnect}
      size="large"
      startIcon={<img src={require('@zkid/app-config/assets/metamask.svg')} />}
    >
      MetaMask
    </Cell>
  ) : (
    <Cell
      fullWidth
      onClick={handleConnect}
      size="large"
      startIcon={<img src={require('@zkid/app-config/assets/walletconnect.svg')} />}
    >
      WalletConnect
    </Cell>
  );
};

const WalletModal: React.FC<Props> = ({ onClose, open }) => {
  const hasEthereum = useMemo(() => typeof window.ethereum !== 'undefined', []);

  return (
    <Dialog maxWidth="md" onClose={onClose} open={open}>
      <DialogHeader onClose={onClose}>Connect to a wallet</DialogHeader>
      <DialogContent sx={{ width: '424px', maxWidth: '100%' }}>
        {(hasEthereum ? [metaMaskWallet, walletConnectWallet] : [walletConnectWallet]).map(
          (wallet, index) => (
            <WalletCell key={index} onClose={onClose} wallet={wallet} />
          )
        )}
      </DialogContent>
    </Dialog>
  );
};

export default React.memo(WalletModal);
