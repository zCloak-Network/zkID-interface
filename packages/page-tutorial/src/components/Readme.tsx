import { Box, Button, Modal, useMediaQuery, useTheme } from '@mui/material';
import React, { useCallback, useMemo, useState } from 'react';

import { useInterval, useToggle } from '@zkid/react-hooks';

const TOTAL_TIME = 6000;
const INTERVAL_TIME = 1000;

const Readme: React.FC = () => {
  const [open, toggle] = useToggle(true);
  const [countdown, setCountdown] = useState<number>(TOTAL_TIME);
  const theme = useTheme();
  const downSm = useMediaQuery(theme.breakpoints.down('sm'));

  const update = useCallback(() => {
    setCountdown((countdown) => Math.max(0, countdown - INTERVAL_TIME));
  }, []);

  useInterval(update, 1000);
  const disabled = useMemo(() => countdown !== 0, [countdown]);

  return (
    <Modal open={open}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '700px',
          maxWidth: '92%'
        }}
      >
        <Box
          sx={{
            maxHeight: '75vh',
            borderRadius: '20px',
            padding: downSm ? '25px' : '50px',
            background: 'url("images/background_email.webp") no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            fontSize: '16px',
            lineHeight: 1.5,
            marginBottom: 0,
            overflowY: downSm ? 'scroll' : 'auto',
            ':focus-visible': {
              outline: 'none'
            },

            '& p': {
              marginBottom: '16px',
              paddingLeft: '38px'
            },
            '.email-title': {
              marginBottom: '24px',
              paddingLeft: 0
            },
            '.email-footer': {
              marginTop: '16px',
              marginBottom: 0,
              paddingLeft: 0,
              textAlign: 'right',
              fontFamily: 'Papyrus'
            }
          }}
        >
          <p className="email-title">Dear Adventurer, </p>
          <p>
            Welcome to the zCloak Kingdom! Here you can team up with people to explore a dungeon. Of
            course, it would be easier if you know each other in advance—such as your experience,
            damage type or equipment level.
          </p>
          <p>
            In zCloak Kingdom, we treat your privacy as the first priority. Thus we have introduced
            a POAP system to represent you without giving away your detailed information. Here is
            how it works.
          </p>
          <p>
            First, you need to fill in some basic information. Our secrecy agency will check it,
            attest to it and issue an identity credential to you.
          </p>
          <p>
            Second, use the zCloak ID Wallet to generate a STARK proof based on your credential. Our
            scholars will verify the validity of your proof. If the proof is correct, a POAP will be
            offered to you.
          </p>
          <p>Use it with your teammates and have an awesome journey!</p>
          <p className="email-footer">zCloak Kingdom</p>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            marginTop: '20px'
          }}
        >
          {disabled ? (
            <Button disabled={true} variant="rounded">
              Please read {countdown / INTERVAL_TIME}s
            </Button>
          ) : (
            <Button onClick={toggle} variant="rounded">
              Understand
            </Button>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default Readme;
