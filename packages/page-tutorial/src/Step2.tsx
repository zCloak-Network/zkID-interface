import { Container, styled, Typography } from '@mui/material';
import React, { useContext } from 'react';

import { CredentialContext } from '@zkid/react-components';

import Contents from './components/Contents';
import Credential from './components/Credential';
import Readme from './components/Readme';

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
`;

const Step2: React.FC = () => {
  const { credential, verified } = useContext(CredentialContext);

  return (
    <Wrapper>
      <Readme />
      {credential && verified ? (
        <>
          <Typography variant="h3">Describe Yourself</Typography>
          <Typography variant="inherit">
            We have prepared a gift POAP for you. The POAP style varies by your age, class and
            equipment. To claim it, first describe yourself. Then submit.
          </Typography>
        </>
      ) : (
        <>
          <Typography variant="h3">Receive Your Credential</Typography>
          <Typography variant="inherit">
            Your data is good. Please download your credential and save it properly.
          </Typography>
        </>
      )}
      {credential && verified ? <Credential credential={credential} /> : <Contents />}
    </Wrapper>
  );
};

export default React.memo(Step2);
