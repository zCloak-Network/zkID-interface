import { Alert, Portal, Snackbar } from '@mui/material';
import React from 'react';

interface Props {
  open?: boolean;
  severity?: 'success' | 'info' | 'warning' | 'error';
  message?: string;
}

const StayAlert: React.FC<Props> = ({ message, open, severity }) => {
  return (
    <Portal>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        autoHideDuration={null}
        open={open}
      >
        <Alert
          icon={<></>}
          severity={severity}
          sx={{
            alignItems: 'center',
            padding: '0 16px',
            background:
              severity === 'error'
                ? 'linear-gradient(221deg, #F92A40 0%, #F1609B 100%, #6C59E0 100%)'
                : severity === 'warning'
                ? 'linear-gradient(221deg, #E2702A 0%, #EBAD58 100%, #6C59E0 100%)'
                : undefined,
            borderRadius: '30px'
          }}
          variant="filled"
        >
          {message}
        </Alert>
      </Snackbar>
    </Portal>
  );
};

export default React.memo(StayAlert);
