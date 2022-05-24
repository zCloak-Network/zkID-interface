import styled from '@emotion/styled';
import { Box, Container } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from './Header';

const Wrapper = styled(Box)`
  width: 100vw;
  min-height: 100vh;
  padding-top: 80px;
  background: linear-gradient(180deg, #f4f5fc 0%, #fbfcfd 76%, #ffffff 100%);
`;

const DashboardFrame: React.FC = () => {
  return (
    <Wrapper>
      <Header />
      <Container maxWidth="lg" sx={{ mx: 'auto' }}>
        <Outlet />
      </Container>
    </Wrapper>
  );
};

export default React.memo(DashboardFrame);
