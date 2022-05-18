import { ReplaySharp as ReplayIcon } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogContent } from '@mui/material';
import React, { useCallback, useContext } from 'react';

import { CredentialContext, DialogHeader } from '@zkid/react-components';
import { useToggle } from '@zkid/react-hooks';

const Replay: React.FC = () => {
  const [open, toggle] = useToggle();
  const { reset } = useContext(CredentialContext);

  const toggleClick = useCallback(() => {
    reset();
    toggle();
  }, [reset, toggle]);

  return (
    <>
      <Dialog onClose={toggle} open={open}>
        <DialogHeader>Be careful !</DialogHeader>
        <DialogContent>
          Replay will clear your local storage, this means you may lose some important data,
          including your credentials and proofs.
        </DialogContent>
        <DialogActions>
          <Button
            onClick={toggleClick}
            size="large"
            sx={{
              width: '100%',
              height: '60px',
              borderRadius: '20px',
              padding: 4,
              background: '#D56386'
            }}
            variant="contained"
          >
            Clear storage and repaly
          </Button>
        </DialogActions>
      </Dialog>
      <Button
        endIcon={<ReplayIcon sx={{ width: '14px' }} />}
        onClick={toggle}
        size="large"
        variant="rounded"
      >
        Replay
      </Button>
    </>
  );
};

export default React.memo<typeof Replay>(Replay);
