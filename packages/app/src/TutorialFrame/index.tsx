import styled from '@emotion/styled';
import { Box } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from './Header';

const Wrapper = styled(Box)`
  width: 100vw;
  min-height: 100vh;
  padding-bottom: 44px;
  background: url('/images/tutorial-bg.webp') no-repeat;
  background-size: cover;
  background-position: center;
`;

const TurorialFrame: React.FC = () => {
  return (
    <Wrapper>
      <Header />
      <Outlet />
    </Wrapper>
  );
};

export default React.memo(TurorialFrame);
