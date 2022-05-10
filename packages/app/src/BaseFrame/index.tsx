import { Button } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';

const BaseFrame: React.FC = () => {
  return (
    <>
      <Button variant="contained">BaseFrame</Button>
      <Outlet />
    </>
  );
};

export default React.memo(BaseFrame);
