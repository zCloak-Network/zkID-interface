import { Box } from '@mui/material';
import React, { useCallback, useState } from 'react';

import { useWallet } from '@zcloak/react-wallet';

import { ButtonEnable } from '@zkid/react-components';
import { credentialApi } from '@zkid/service';

const Faucet: React.FC = () => {
  const { account } = useWallet();
  const [loading, setLoading] = useState(false);
  const getToken = useCallback(async () => {
    if (account) {
      setLoading(true);
      const { code } = await credentialApi.faucet({ address: account });

      if (code !== 200) {
        setLoading(false);
      }
    }
  }, [account]);

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
        <img src="/images/pic_fail.webp" />
        <span>Sorry, you don’t have token.</span>
      </Box>
      <ButtonEnable loading={loading} onClick={getToken} variant="rounded">
        Get token
      </ButtonEnable>
    </>
  );
};

export default React.memo(Faucet);
