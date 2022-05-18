import styled from '@emotion/styled';
import { Button, Container } from '@mui/material';
import React, { useCallback, useContext } from 'react';

import { ZkidExtensionContext } from '@zkid/react-components/ZkidExtension';

import { TutorialContext } from '.';

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
  const { nextStep } = useContext(TutorialContext);
  const { isImport, zkidExtension } = useContext(ZkidExtensionContext);

  const importCredential = useCallback(() => {
    zkidExtension.openzkIDPopup('OPEN_IMPORT_CREDENTIAL', undefined);
  }, [zkidExtension]);

  return (
    <Wrapper>
      <h2>Import Your Credential</h2>
      <p>
        Import your credential into your zCloak ID Wallet. To protect your privacy, data in your
        credential never needs to leave your wallet.
      </p>
      <img src="/images/pic_import.webp" />

      {isImport ? (
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
