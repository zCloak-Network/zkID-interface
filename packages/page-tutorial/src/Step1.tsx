import styled from '@emotion/styled';
import { Button, Container } from '@mui/material';
import React, { useContext } from 'react';

import { ZkidExtensionContext } from '@zkid/react-components';

import Createpassword from './components/Createpassword';
import InstallExtension from './components/InstallExtension';
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
    font-weight: 500;
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
  const { nextStep } = useContext(JudgeStepContext);

  return (
    <Wrapper>
      <h2>Install extension</h2>
      <p>
        Please install the zCloak ID Wallet to start your ZK adventure. The wallet performs some
        magic tricks — the STARK alchemy—to help you use your data and keep your secrets.
      </p>
      <img src="/images/pic_install.webp" />
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
