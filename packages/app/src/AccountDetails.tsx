import LaunchIcon from '@mui/icons-material/Launch';
import { Box, Button, Dialog, DialogContent, Link, Stack, Typography } from '@mui/material';
import React, { useMemo } from 'react';

import { useWallet, WalletConnectWallet } from '@zcloak/react-wallet';

import { ExplorerDataType, getExplorerLink } from '@zkid/app-config/getExplorerLink';
import { Address, AddressIcon, Copy, DialogHeader } from '@zkid/react-components';
import { useEndpoint, useToggle } from '@zkid/react-hooks';

interface Props {
  ChildrenComponent: React.ReactElement<{ onClick: () => void }>;
}

const AccountDetails: React.FC<Props> = ({ ChildrenComponent }) => {
  const { account, disconnect, wallet } = useWallet();
  const endpoint = useEndpoint();
  const [open, toggle] = useToggle();

  const connectText = useMemo(() => {
    return wallet instanceof WalletConnectWallet
      ? 'Connect with WalletConnect'
      : 'Connect with MetaMask';
  }, [wallet]);

  return (
    <>
      <Dialog maxWidth="md" onClose={toggle} open={open}>
        <DialogHeader onClose={toggle}>Account</DialogHeader>
        <DialogContent sx={{ width: '400px', maxWidth: '100%' }}>
          <Stack spacing={1}>
            <Stack alignItems="center" direction="row" justifyContent="space-between">
              <Typography>{connectText}</Typography>
              <Button onClick={disconnect}>Disconnect</Button>
            </Stack>
            <Stack alignItems="center" direction="row" spacing={1}>
              <Box component={AddressIcon} value={account} />
              <Box sx={{ fontSize: '18px' }}>
                <Address value={account} />
              </Box>
            </Stack>
            <div className="account-details-btns">
              {account && <Copy toCopy={account}>Copy address</Copy>}
              {endpoint && account && (
                <Button
                  LinkComponent={Link}
                  href={getExplorerLink(endpoint.explorer, account, ExplorerDataType.ADDRESS)}
                  startIcon={<LaunchIcon />}
                  target="_blank"
                >
                  View on Explorer
                </Button>
              )}
            </div>
          </Stack>
        </DialogContent>
      </Dialog>
      {React.cloneElement(ChildrenComponent, {
        onClick: toggle
      })}
    </>
  );
};

export default React.memo<typeof AccountDetails>(AccountDetails);
