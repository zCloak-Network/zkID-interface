import styled from '@emotion/styled';
import { Box } from '@mui/material';
import React from 'react';
import { Outlet, useMatch, useResolvedPath } from 'react-router-dom';

import Header from './Header';

const Wrapper = styled(Box)<{ inTutorial: boolean }>(
  ({ inTutorial }) => `
width: 100vw;
min-height: 100vh;
padding-bottom: 44px;
background: url('${
    inTutorial ? '/images/tutorial-bg2.webp' : '/images/tutorial-bg.webp'
  }') no-repeat;
background-size: cover;
background-position: center;
`
);

const TurorialFrame: React.FC = () => {
  const tutorialResolved = useResolvedPath('/guide');
  const match = useMatch({ path: tutorialResolved.pathname, end: true });

  return (
    <Wrapper inTutorial={!!match}>
      <Header />
      <Outlet />
    </Wrapper>
  );
};

export default React.memo(TurorialFrame);
