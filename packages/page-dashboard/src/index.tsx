import { Box, Button, CircularProgress, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { useWallet } from '@zcloak/react-wallet';

import Replay from '@zkid/page-home/Replay';
import { CredentialContext } from '@zkid/react-components';
import { useAccountPoap } from '@zkid/react-hooks';

import Activities from './Activities';
import Poaps from './Poaps';
import Proof from './Proof';

const Dashboard: React.FC = () => {
  const { account } = useWallet();
  const navigate = useNavigate();
  const { credential, ready } = useContext(CredentialContext);

  const nftId = useAccountPoap(account);

  return (
    <>
      <Box sx={{ position: 'relative' }}>
        <Box component="img" src="/images/pic_banner.webp" sx={{ width: '100%' }} />
        <Box sx={{ position: 'absolute', left: '100px', top: '50px' }}>
          <Typography
            component="h1"
            fontSize="large"
            sx={{
              marginBottom: '24px',
              fontSize: '32px',
              fontWeight: '500',
              color: '#FFFFFF'
            }}
          >
            Wanna try the guide again ?
          </Typography>
          {nftId ? (
            ready ? (
              credential ? (
                <>
                  <Replay
                    onDone={() => navigate('/')}
                    sx={() => ({
                      background: 'linear-gradient(221deg, #BA60F2 0%, #3434E6 100%, #6C59E0 100%)'
                    })}
                    variant="contained"
                  />
                </>
              ) : (
                <Button size="large" variant="contained">
                  Change account in MetaMask
                </Button>
              )
            ) : (
              <CircularProgress />
            )
          ) : (
            <Button onClick={() => navigate('/tutorial')} size="large" variant="contained">
              Get start
            </Button>
          )}
        </Box>
      </Box>
      <Poaps />
      <Proof />
      <Activities />
    </>
  );
};

export default Dashboard;
