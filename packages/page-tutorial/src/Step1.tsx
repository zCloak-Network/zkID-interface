import styled from '@emotion/styled';
import { Container } from '@mui/material';
import React from 'react';

import InstallExtension from './components/InstallExtension';

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
  return (
    <Wrapper>
      <h2>Install extension</h2>
      <p>
        Your wallet is used to derive private keys, which are used to encrypt your data and sign
        private transactions.
      </p>
      <img src="/images/step_install.svg" />
      <InstallExtension />
    </Wrapper>
  );
};

export default React.memo(Step1);
