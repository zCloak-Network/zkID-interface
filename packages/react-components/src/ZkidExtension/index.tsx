import React, { createContext, useEffect, useState } from 'react';

import { ZkidExtension } from '@zcloak/zkid-core';

import { CTYPE_HASH } from '@zkid/app-config/constants';

interface ZkidExtensionState {
  isReady: boolean;
  isInstall: boolean;
  hasPassword: boolean;
  isImport: boolean;
  zkidExtension: ZkidExtension;
}

export const ZkidExtensionContext = createContext<ZkidExtensionState>({} as ZkidExtensionState);

const zkidExtension = new ZkidExtension();

const ZkidExtensionProvider: React.FC = ({ children }) => {
  const [isReady, setIsReady] = useState(false);
  const [hasPassword, setHasPassword] = useState(false);
  const [isImport, setIsImport] = useState(false);
  const [isInstall, setIsInstall] = useState(false);

  useEffect(() => {
    zkidExtension.isReady.then(async () => {
      await zkidExtension.isInstall.then(setIsInstall);
      await zkidExtension.hasPassword.then(setHasPassword);
      await zkidExtension.getCredentialByCHash(CTYPE_HASH)?.then(setIsImport);
      setIsReady(true);
    });
  }, []);

  useEffect(() => {
    const handlePasswordEvent = () => {
      setHasPassword(true);
    };

    const handleImportEvent = () => {
      setIsImport(true);
    };

    zkidExtension.on('SEND_CREATE_PASSWORD_SUCCESS_TO_WEB', handlePasswordEvent);
    zkidExtension.on('SEND_IMPORT_CREDENTIAL_SUCCESS', handleImportEvent);

    return () => {
      zkidExtension.off('SEND_CREATE_PASSWORD_SUCCESS_TO_WEB', handlePasswordEvent);
      zkidExtension.off('SEND_IMPORT_CREDENTIAL_SUCCESS', handleImportEvent);
    };
  }, []);

  return (
    <ZkidExtensionContext.Provider
      value={{ isReady, isImport, hasPassword, isInstall, zkidExtension }}
    >
      {isReady && children}
    </ZkidExtensionContext.Provider>
  );
};

export default ZkidExtensionProvider;
