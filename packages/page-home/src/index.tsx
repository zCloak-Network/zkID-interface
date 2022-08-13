import { Box, Container, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';

import { useWallet } from '@zcloak/react-wallet';

import { ButtonEnable } from '@zkid/react-components';

import Actions from './Actions';

const Home: React.FC = () => {
  const { account } = useWallet();
  const theme = useTheme();
  const upMd = useMediaQuery(theme.breakpoints.up('md'));
  const upSm = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <>
      <Stack
        alignItems="center"
        component={Container}
        direction={upMd ? 'row' : 'column-reverse'}
        justifyContent="space-between"
        spacing={upMd ? 10 : 5}
        sx={{
          marginTop: upMd ? '64px' : '20px'
        }}
      >
        <Box>
          <Typography
            sx={{
              marginTop: 0,
              fontSize: upMd ? '3.5rem' : '2.5rem',
              fontWeight: '500',
              marginBottom: '24px',
              color: '#fff'
            }}
            variant="h1"
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
          </Typography>
          <Typography
            sx={{
              fontSize: '1.25rem',
              fontWeight: '400',
              marginBottom: '48px',
              color: '#fff',
              opacity: '0.8'
            }}
            variant="inherit"
          >
            Prove who you are, without telling who you are.
            <br /> Data and computation, keep both in your own hands.
          </Typography>
          {account ? (
            <Actions account={account} />
          ) : (
            <ButtonEnable
              enableText="Connect Wallet and Get Started"
              size="large"
              variant="rounded"
            />
          )}
        </Box>
        <Box component="img" src="images/home.webp" width={upSm ? '395px' : '200px'} />
      </Stack>
    </>
  );
};

export default Home;
