import { Box } from '@mui/material';
import React, { useCallback, useContext, useState } from 'react';

import { useWallet } from '@zcloak/react-wallet';
import { FaucetStatus } from '@zcloak/service/types';

import { BalancesContext, ButtonEnable } from '@zkid/react-components';

const Faucet: React.FC = () => {
  const { account } = useWallet();
  const { faucetStatus, getToken } = useContext(BalancesContext);
  const [loading, setLoading] = useState(false);

  const _getToken = useCallback(() => {
    if (account) {
      getToken(true).finally(() => setLoading(false));
    }
  }, [account, getToken]);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '90%',
          height: '149px',
          margin: '0 auto',
          marginY: '72px',
          border: '1px solid rgba(255, 255, 255, 0.6)',
          boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.2)',
          borderRadius: '13px',
          '>img': {
            marginTop: '5px'
          }
        }}
      >
        <img src="images/pic_fail.webp" />
        <span>Sorry, you don’t have token.</span>
      </Box>
      <ButtonEnable
        loading={loading || faucetStatus === FaucetStatus.Fauceting}
        onClick={_getToken}
        variant="rounded"
      >
        Get token
      </ButtonEnable>
    </>
  );
};

export default React.memo(Faucet);
