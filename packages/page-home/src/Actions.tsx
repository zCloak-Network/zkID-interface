import { Box, Button } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAccountPoap } from '@zkid/react-hooks';

import ChangeAccount from './ChangeAccount';
import Replay from './Replay';

const Actions: React.FC<{ account: string }> = ({ account }) => {
  const navigate = useNavigate();
  const [flag, setFlag] = useState(false);

  const nftId = useAccountPoap(account);

  return (
    <Box>
      {nftId ? (
        !flag ? (
          <>
            <Replay onDone={() => setFlag(true)} />
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
        <Button onClick={() => navigate('/tutorial')} size="large" variant="rounded">
          Get start
        </Button>
      )}
    </Box>
  );
};

export default React.memo(Actions);
