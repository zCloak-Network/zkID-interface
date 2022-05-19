import { Box, CircularProgress, CircularProgressProps, Typography } from '@mui/material';
import React from 'react';

interface Props extends CircularProgressProps {
  value: number;
}

const CircularProgressWithLabel: React.FC<Props> = ({ value, ...props }) => {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props} value={value} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Typography color="text.secondary" component="div" variant="caption">{`${Math.round(
          value
        )}%`}</Typography>
      </Box>
    </Box>
  );
};

export default React.memo(CircularProgressWithLabel);
