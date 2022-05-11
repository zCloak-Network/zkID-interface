import React, { createContext, useEffect, useState } from 'react';

import { ZkidExtension } from '@zcloak/zkid-core';

interface ZkidExtensionState {
  isReady: boolean;
  isInstall: boolean;
  hasPassword: boolean;
  zkidExtension: ZkidExtension;
}

export const ZkidExtensionContext = createContext<ZkidExtensionState>({} as ZkidExtensionState);

const zkidExtension = new ZkidExtension();

const ZkidExtensionProvider: React.FC = ({ children }) => {
  const [isReady, setIsReady] = useState(false);
  const [hasPassword, setHasPassword] = useState(false);
  const [isInstall, setIsInstall] = useState(false);

  useEffect(() => {
    zkidExtension.isReady.then(async () => {
      await zkidExtension.isInstall.then(setIsInstall);
      await zkidExtension.hasPassword.then(setHasPassword);
      setIsReady(true);
    });
  }, []);

  useEffect(() => {
    const handleEvent = () => {
      setHasPassword(true);
    };

    zkidExtension.on('SEND_CREATE_PASSWORD_SUCCESS_TO_WEB', handleEvent);

    return () => {
      zkidExtension.off('SEND_CREATE_PASSWORD_SUCCESS_TO_WEB', handleEvent);
    };
  }, []);

  return (
    <ZkidExtensionContext.Provider value={{ isReady, hasPassword, isInstall, zkidExtension }}>
      {isReady && children}
    </ZkidExtensionContext.Provider>
  );
};

export default ZkidExtensionProvider;
