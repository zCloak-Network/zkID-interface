import { Button, Stack } from '@mui/material';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { BalancesContext } from '@zkid/react-components';

import ChangeAccount from './ChangeAccount';
import Replay from './Replay';

const Actions: React.FC<{ account: string }> = () => {
  const { poapId } = useContext(BalancesContext);
  const navigate = useNavigate();
  const [flag, setFlag] = useState(false);

  return (
    <Stack direction="row" spacing={4}>
      {poapId ? (
        !flag ? (
          <>
            <Replay onDone={() => setFlag(true)} />
            <Button onClick={() => navigate('/dashboard')} size="large" variant="rounded">
              Go To Dashboard
            </Button>
          </>
        ) : (
          <ChangeAccount />
        )
      ) : (
        <Button onClick={() => navigate('/guide')} size="large" variant="rounded">
          Get Started
        </Button>
      )}
    </Stack>
  );
};

export default React.memo(Actions);
