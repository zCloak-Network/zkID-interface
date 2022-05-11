import styled from '@emotion/styled';
import { Button, Container } from '@mui/material';
import React, { useContext } from 'react';

import { ZkidExtensionContext } from '@zkid/react-components';

import Createpassword from './components/Createpassword';
import InstallExtension from './components/InstallExtension';
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
    margin-bottom: 44px;
  }
`;

const Step1: React.FC = () => {
  const { hasPassword, isInstall } = useContext(ZkidExtensionContext);
  const { nextStep } = useContext(TutorialContext);

  return (
    <Wrapper>
      <h2>Install extension</h2>
      <p>
        Your wallet is used to derive private keys, which are used to encrypt your data and sign
        private transactions.
      </p>
      <img src="/images/step_install.svg" />
      {isInstall && hasPassword ? (
        <Button onClick={nextStep} variant="rounded">
          Next
        </Button>
      ) : !isInstall ? (
        <InstallExtension />
      ) : (
        !hasPassword && <Createpassword />
      )}
    </Wrapper>
  );
};

export default React.memo(Step1);
