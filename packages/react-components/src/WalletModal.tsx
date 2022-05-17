import { Button, Dialog, DialogContent, styled } from '@mui/material';
import React, { useCallback } from 'react';

import { useConnectors } from '@zcloak/react-wallet';
import useAuth from '@zcloak/react-wallet/useAuth';

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

const Metamask: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <Cell
      fullWidth
      onClick={onClick}
      size="large"
      startIcon={<img src={require('@zkid/app-config/assets/metamask.svg')} />}
    >
      MetaMask
    </Cell>
  );
};

const WalletModal: React.FC<Props> = ({ onClose, open }) => {
  const { login } = useAuth();
  const { injected } = useConnectors();

  const toggleMetamask = useCallback(() => {
    login(injected);
    onClose?.();
  }, [injected, login, onClose]);

  return (
    <Dialog maxWidth="sm" onClose={onClose} open={open}>
      <DialogHeader onClose={onClose}>Connect to a wallet</DialogHeader>
      <DialogContent sx={{ width: '424px', paddingX: '5px' }}>
        <Metamask onClick={toggleMetamask} />
      </DialogContent>
    </Dialog>
  );
};

export default React.memo(WalletModal);
