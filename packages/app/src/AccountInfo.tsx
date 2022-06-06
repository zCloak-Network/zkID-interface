import { Box, Button, Stack, useMediaQuery, useTheme } from '@mui/material';
import React, { useContext } from 'react';

import { FaucetStatus } from '@zcloak/service/types';

import {
  Address,
  AddressIcon,
  BalancesContext,
  CoinAnimation,
  FormatBalance
} from '@zkid/react-components';
import { useEndpoint } from '@zkid/react-hooks';

import AccountDetails from './AccountDetails';

interface Props {
  account: string;
}

const AccountInfo: React.FC<Props> = ({ account }) => {
  const { balance, faucetStatus } = useContext(BalancesContext);
  const endpoint = useEndpoint();
  const theme = useTheme();
  const upSm = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Box
      className="ZkidAccountInfo"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(255, 255, 255, 0.5)',
        border: '1px solid rgba(255, 255, 255, 0.6)',
        borderRadius: '40px',
        color: '#333'
      }}
    >
      {upSm && (
        <Box
          sx={{
            padding: '0 10px 0 24px',
            cursor: 'default',
            fontSize: '0.9375rem'
          }}
        >
          {faucetStatus === FaucetStatus.Fauceting ? (
            <Stack alignItems="center" direction="row" spacing={1}>
              <CoinAnimation size="28px" />
              Getting token
            </Stack>
          ) : (
            <FormatBalance symbol={endpoint?.currencySymbol} value={balance} />
          )}
        </Box>
      )}
      <AccountDetails
        ChildrenComponent={
          <Button
            className="ZkidAccountInfo-address"
            endIcon={<AddressIcon value={account} />}
            size="large"
            sx={{
              background: 'rgba(255, 255, 255, 0.5)',
              ':hover': {
                background: 'rgba(255, 255, 255, 0.5)',
                color: '#000'
              }
            }}
            variant="rounded"
          >
            <Address value={account} />
          </Button>
        }
      />
    </Box>
  );
};

export default React.memo(AccountInfo);
