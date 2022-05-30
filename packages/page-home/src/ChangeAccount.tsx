import { Button } from '@mui/material';
import React from 'react';

import { StayAlert } from '@zkid/react-components';

const ChangeAccount: React.FC = () => {
  return (
    <>
      <StayAlert
        message="You have already received POAP, please change account."
        open
        severity="error"
      />
      <Button size="large" variant="rounded">
        Change account in MetaMask
      </Button>
    </>
  );
};

export default React.memo(ChangeAccount);
