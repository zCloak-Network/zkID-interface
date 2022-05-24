import styled from '@emotion/styled';
import { Button, Container } from '@mui/material';
import React, { useCallback, useContext, useEffect, useState } from 'react';

import { ZkidExtensionContext } from '@zkid/react-components/ZkidExtension';

import { JudgeStepContext } from './JudgeStep';

const Wrapper = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 20px;

  color: #fff;
  text-align: center;

  > h2 {
    margin-bottom: 12px;
    font-size: 30px;
  }

  > p {
    opacity: 0.8;
  }

  > img {
    margin: 44px 0;
  }
`;

const Step3: React.FC = () => {
  const { nextStep } = useContext(JudgeStepContext);
  const { zkidExtension } = useContext(ZkidExtensionContext);
  const [isImport, setIsImport] = useState(false);
  const [isClick, setIsClick] = useState(false);

  const importCredential = useCallback(() => {
    zkidExtension.openzkIDPopup('OPEN_IMPORT_CREDENTIAL', undefined);
    setIsClick(true);
  }, [zkidExtension]);

  useEffect(() => {
    const handleImportEvent = () => {
      setIsImport(true);
    };

    zkidExtension.on('SEND_IMPORT_CREDENTIAL_SUCCESS', handleImportEvent);

    return () => {
      zkidExtension.off('SEND_IMPORT_CREDENTIAL_SUCCESS', handleImportEvent);
    };
  }, [zkidExtension]);

  return (
    <Wrapper>
      <h2>Import Your Credential</h2>
      <p>
        Import your credential into your zCloak ID Wallet. To protect your privacy, data in your
        credential never needs to leave your wallet.
      </p>
      <img src="/images/pic_import.webp" />

      {isClick && isImport ? (
        <Button onClick={nextStep} variant="rounded">
          Next
        </Button>
      ) : (
        <Button onClick={importCredential} variant="rounded">
          Import Credential
        </Button>
      )}
    </Wrapper>
  );
};

export default React.memo(Step3);
