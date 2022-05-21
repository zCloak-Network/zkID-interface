import { Box, Button } from '@mui/material';
import React from 'react';

import { Address, AddressIcon, FormatBalance } from '@zkid/react-components';
import { useEndpoint, useNativeBalance } from '@zkid/react-hooks';

interface Props {
  account: string;
}

const AccountInfo: React.FC<Props> = ({ account }) => {
  const balance = useNativeBalance(account);
  const endpoint = useEndpoint();

  return (
    <Box
      className="ZkidAccountInfo"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(255, 255, 255, 0.5)',
        border: '1px solid rgba(255, 255, 255, 0.6)',
        borderRadius: '20px',
        color: '#333'
      }}
    >
      <Box
        sx={{
          padding: '0 10px 0 24px',
          cursor: 'default'
        }}
      >
        <FormatBalance symbol={endpoint?.currencySymbol} value={balance} />
      </Box>
      <Button
        className="ZkidAccountInfo-address"
        endIcon={<AddressIcon value={account} />}
        size="large"
        sx={{
          background: 'rgba(255, 255, 255, 0.5)',
          ':hover': {
            background: 'rgba(255, 255, 255, 0.5)'
          }
        }}
        variant="rounded"
      >
        <Address value={account} />
      </Button>
    </Box>
  );
};

export default React.memo(AccountInfo);
