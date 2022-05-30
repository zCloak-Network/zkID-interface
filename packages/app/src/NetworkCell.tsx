import { Button } from '@mui/material';
import React from 'react';

import { useEndpoint } from '@zkid/react-hooks';

const NetworkCell: React.FC = () => {
  const endpoint = useEndpoint();

  return endpoint ? (
    <Button
      className="ZkidNetworkCell"
      sx={{
        display: 'flex',
        alignItems: 'center',
        px: '20px',
        background: 'rgba(255, 255, 255, 0.5)',
        color: '#6768AC',
        cursor: 'pointer',
        ':hover': {
          background: 'rgba(255, 255, 255, 0.5)',
          color: '#000'
        }
      }}
      variant="rounded"
    >
      {endpoint.name}
    </Button>
  ) : (
    <></>
  );
};

export default React.memo(NetworkCell);
