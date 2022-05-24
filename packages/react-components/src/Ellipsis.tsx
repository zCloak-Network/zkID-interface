import { Box } from '@mui/material';
import React from 'react';

const Ellipsis: React.FC<React.PropsWithChildren<{ width?: string | number }>> = ({
  children,
  width
}) => {
  return (
    <Box
      className="ZkidEllipsis"
      sx={{
        whiteSpace: 'nowrap',
        width,
        textOverflow: 'ellipsis',
        overflow: 'hidden'
      }}
    >
      {children}
    </Box>
  );
};

export default React.memo<typeof Ellipsis>(Ellipsis);
