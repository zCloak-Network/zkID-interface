import { Button } from '@mui/material';
import React from 'react';

import { zkIDEXTENSION } from '@zkid/app-config/constants';

const InstallExtension: React.FC = () => {
  return (
    <Button
      onClick={() => {
        window.open(zkIDEXTENSION);
      }}
      variant="rounded"
    >
      Install
    </Button>
  );
};

export default React.memo(InstallExtension);
