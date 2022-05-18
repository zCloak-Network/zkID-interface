import { Box, Stack } from '@mui/material';
import React from 'react';

import { useWallet } from '@zcloak/react-wallet';

import { ButtonEnable } from '@zkid/react-components';

import Actions from './Actions';

const Home: React.FC = () => {
  const { account } = useWallet();

  return (
    <Stack
      alignItems="center"
      direction="row"
      justifyContent="space-between"
      spacing={10}
      sx={{
        width: '1280px',
        margin: '64px auto'
      }}
    >
      <Box>
        <Box
          component="h1"
          sx={{
            fontSize: '55px',
            fontWeight: '500',
            lineHeight: '74px',
            color: '#ffffff'
          }}
        >
          A Privacy-Preserving <br />
          Passport to the <br />
          Web 3.0 World
          <Box
            component="span"
            sx={{
              position: 'relative',
              paddingLeft: '20px'
            }}
          >
            <img src={require('./star.svg')} />
            <img
              src={require('./star_1.svg')}
              style={{
                right: '-5px',
                position: 'absolute',
                top: '16px'
              }}
            />
          </Box>
        </Box>
        <Box
          component="p"
          sx={{
            fontSize: '20px',
            fontWeight: '400',
            marginTop: '16px',
            marginBottom: '48px',
            color: '#ffffff',
            opacity: '0.8',
            lineHeight: '1.5'
          }}
        >
          Prove who you are, without telling who you are.
          <br /> Data and computation, keep both in your own hands.
        </Box>
        {account ? (
          <Actions account={account} />
        ) : (
          <ButtonEnable enableText="Connect wallet and Get start" size="large" variant="rounded" />
        )}
      </Box>
      <Box component="img" src="/images/home.webp" width="395px" />
    </Stack>
  );
};

export default Home;
