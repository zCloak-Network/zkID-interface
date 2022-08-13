import styled from '@emotion/styled';
import { Button, Container, Typography } from '@mui/material';
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

  > h3 {
    margin-bottom: 16px;
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
      <Typography variant="h3">Install extension</Typography>
      <Typography variant="inherit">
        Please install the zCloak ID Wallet to start your ZK adventure. The wallet performs some
        magic tricks — the STARK alchemy—to help you use your data and keep your secrets.
      </Typography>
      <img src="images/pic_install.webp" />
      {isInstall && hasPassword ? (
        <Button onClick={nextStep} variant="rounded">
          Next
        </Button>
      ) : !isInstall ? (
        <InstallExtension />
      ) : (
        !hasPassword && <Createpassword />
      )}
      <Typography mt={2}>
        tips: try refreshing the page if the extension already installed
      </Typography>
    </Wrapper>
  );
};

export default React.memo(Step1);
