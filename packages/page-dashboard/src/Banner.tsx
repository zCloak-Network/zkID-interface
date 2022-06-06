import { Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Replay from '@zkid/page-home/Replay';
import { BalancesContext } from '@zkid/react-components';

const Banner: React.FC = () => {
  const theme = useTheme();
  const upSm = useMediaQuery(theme.breakpoints.up('sm'));
  const { poapId } = useContext(BalancesContext);
  const navigate = useNavigate();
  const [flag, setFlag] = useState(false);

  return (
    <Box
      id="dashboard"
      sx={{
        position: 'relative',
        background: 'url(/images/pic_banner.webp) no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        borderRadius: '20px',
        height: '230px',
        marginTop: 3
      }}
    >
      <Box sx={{ position: 'absolute', left: upSm ? '100px' : '44px', top: '50px' }}>
        <Typography
          sx={{
            marginBottom: upSm ? '24px' : '12px',
            color: '#fff'
          }}
          variant="h3"
        >
          Wanna try the guide again ?
        </Typography>
        {poapId ? (
          !flag ? (
            <>
              <Replay
                onDone={() => setFlag(true)}
                sx={() => ({
                  background: 'linear-gradient(221deg, #BA60F2 0%, #3434E6 100%, #6C59E0 100%)',
                  color: '#fff',
                  ':hover': {
                    background: 'linear-gradient(221deg, #BA60F2 0%, #3434E6 100%, #6C59E0 100%)'
                  }
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
          <Button onClick={() => navigate('/')} size="large" variant="contained">
            Get Started
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default Banner;
