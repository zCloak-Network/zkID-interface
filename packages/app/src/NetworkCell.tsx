import { Box } from '@mui/material';
import React from 'react';

import { useEndpoint } from '@zkid/react-hooks';

const NetworkCell: React.FC = () => {
  const endpoint = useEndpoint();

  return endpoint ? (
    <Box
      className="ZkidNetworkCell"
      sx={{
        display: 'flex',
        alignItems: 'center',
        padding: '0 24px',
        height: '40px',
        background: 'rgba(255, 255, 255, 0.5)',
        border: '1px solid rgba(255, 255, 255, 0.6)',
        borderRadius: '20px',
        color: '#6768AC',
        cursor: 'pointer'
      }}
    >
      {endpoint.name}
    </Box>
  ) : (
    <></>
  );
};

export default React.memo(NetworkCell);
