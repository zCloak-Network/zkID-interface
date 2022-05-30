import { Box, Button } from '@mui/material';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { BalancesContext } from '@zkid/react-components';

import ChangeAccount from './ChangeAccount';
import Replay from './Replay';

const Actions: React.FC<{ account: string }> = () => {
  const { getToken, poapId } = useContext(BalancesContext);
  const navigate = useNavigate();
  const [flag, setFlag] = useState(false);

  return (
    <Box>
      {poapId ? (
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
        <Button
          onClick={() => {
            getToken();
            navigate('/guide');
          }}
          size="large"
          variant="rounded"
        >
          Get Started
        </Button>
      )}
    </Box>
  );
};

export default React.memo(Actions);
