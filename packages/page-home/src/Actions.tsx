import { Box, Button, LinearProgress } from '@mui/material';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { CredentialContext } from '@zkid/react-components';
import { useAccountPoap } from '@zkid/react-hooks';

import ChangeAccount from './ChangeAccount';
import Replay from './Replay';

const Actions: React.FC<{ account: string }> = ({ account }) => {
  const navigate = useNavigate();
  const { credential, ready } = useContext(CredentialContext);

  const nftId = useAccountPoap(account);

  return (
    <Box>
      {nftId ? (
        ready ? (
          credential ? (
            <>
              <Replay />
              <Button
                onClick={() => navigate('/dashboard')}
                size="large"
                sx={{ marginLeft: '28px' }}
                variant="rounded"
              >
                Go To Dashboard
              </Button>
            </>
          ) : (
            <ChangeAccount />
          )
        ) : (
          <LinearProgress />
        )
      ) : (
        <Button onClick={() => navigate('/tutorial')} size="large" variant="rounded">
          Get start
        </Button>
      )}
    </Box>
  );
};

export default React.memo(Actions);
