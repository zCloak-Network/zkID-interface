import { Alert, Button, Portal, Snackbar } from '@mui/material';
import React from 'react';

const ChangeAccount: React.FC = () => {
  return (
    <>
      <Portal>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          autoHideDuration={null}
          open
        >
          <Alert
            icon={<></>}
            severity="error"
            sx={{
              alignItems: 'center',
              padding: '0 16px',
              background: 'linear-gradient(221deg, #F92A40 0%, #F1609B 100%, #6C59E0 100%)',
              borderRadius: '16px'
            }}
            variant="filled"
          >
            You have already received POAP, please change account.
          </Alert>
        </Snackbar>
      </Portal>
      <Button size="large" variant="rounded">
        Change account in MetaMask
      </Button>
    </>
  );
};

export default React.memo(ChangeAccount);
