import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import React from 'react';

import { WalletProvider } from '@zcloak/react-wallet/WalletProvider';

import { MOONBASE } from '@zkid/app-config/endpoints';
import {
  CredentialProvider,
  NotificationProvider,
  ThemeProvider,
  ZkidExtensionProvider
} from '@zkid/react-components';

import App from './App';

const Root: React.FC = () => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <NotificationProvider>
            <WalletProvider supportedChainIds={[MOONBASE.chainId]}>
              <ZkidExtensionProvider>
                <CredentialProvider>
                  <CssBaseline />
                  <App />
                </CredentialProvider>
              </ZkidExtensionProvider>
            </WalletProvider>
          </NotificationProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default Root;
